# OpenFang 开发指南

本文档为 Agent 开发者提供代码规范、构建测试命令和架构说明。

## 项目概览

- **配置**: `~/.openfang/config.toml`
- **默认 API**: `http://127.0.0.1:4200`
- **CLI 二进制**: `target/release/openfang.exe` (或 `target/debug/openfang.exe`)
- **Rust 版本**: 1.75+
- **工作空间**: 14 个 crates

## 构建与测试命令

### 完整构建
```bash
cargo build --workspace
cargo build --workspace --lib    # 仅构建库 (当 exe 被锁定时使用)
```

### 运行测试
```bash
cargo test --workspace                    # 运行全部测试 (1744+)
cargo test -p openfang-kernel             # 单个 crate 测试
cargo test --package openfang-runtime tool_runner::tests::xxx  # 单个测试
```

### 代码检查
```bash
cargo fmt --all                           # 格式化代码
cargo fmt --all --check                   # 检查格式 (CI 用)
cargo clippy --workspace --all-targets -- -D warnings  # 零警告
```

### 启动与集成测试

```bash
# 构建 release 版本
cargo build --release -p openfang-cli

# 启动守护进程 (需要 API key)
GROQ_API_KEY=<your_key> target/release/openfang.exe start &
sleep 6
curl -s http://127.0.0.1:4200/api/health

# 验证新端点
curl -s http://127.0.0.1:4200/api/agents

# 停止守护进程
taskkill //PID <pid> //F
```

## 代码风格

### 格式化与 lint
- 使用 `rustfmt` 默认配置，运行 `cargo fmt --all`
- `cargo clippy --workspace --all-targets -- -D warnings` 必须零警告

### 命名规范
| 类型 | 规范 | 示例 |
|------|------|------|
| 类型/结构体 | PascalCase | `OpenFangKernel`, `AgentManifest` |
| 函数/方法 | snake_case | `spawn_agent`, `get_config` |
| 常量 | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_TIMEOUT` |
| Crate 名称 | kebab-case | `openfang-kernel`, `openfang-runtime` |
| 模块文件 | snake_case | `error.rs`, `config_reload.rs` |

### 导入组织
```rust
// 标准库
use std::sync::Arc;

// 外部 crate (按字母顺序)
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use tokio::sync::RwLock;

// 内部 crate
use openfang_kernel::config::KernelConfig;
use openfang_types::error::OpenFangError;
```

### 错误处理
- 使用 `thiserror` 定义错误类型
- 避免在库代码中使用 `unwrap()`，使用 `?` 传播错误
- 为错误类型实现 `std::error::Error`

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum MyError {
    #[error("配置无效: {0}")]
    ConfigInvalid(String),
    
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

pub type Result<T> = std::result::Result<T, MyError>;
```

### Serde 配置
- 配置结构体必须使用 `#[serde(default)]` 实现前向兼容
- 同时实现 `Default` trait

```rust
#[derive(Serialize, Deserialize)]
pub struct KernelConfig {
    #[serde(default)]
    pub log_level: String,
    
    #[serde(default = "default_timeout")]
    pub timeout_secs: u64,
}

fn default_timeout() -> u64 { 30 }
```

### 文档注释
- 公共类型和函数必须添加 `///` 文档注释
- 模块级别使用 `//!`

```rust
/// Agent 运行时上下文，包含配置和状态。
pub struct AgentRuntime {
    /// Agent 唯一标识
    pub agent_id: Uuid,
}

/// 内核模块
//!
pub mod kernel { ... }
```

### 测试规范
- 每个新功能必须包含测试
- 使用 `tokio::test` 进行异步测试
- 使用 `tempfile::TempDir` 隔离文件系统
- 使用随机端口避免网络测试冲突

```rust
#[tokio::test]
async fn test_agent_spawn() {
    let temp_dir = tempfile::tempdir().unwrap();
    // 测试逻辑
}
```

## 架构要点

### Crate 职责
| Crate | 职责 |
|-------|------|
| openfang-types | 共享类型、taint 跟踪、Ed25519 签名 |
| openfang-memory | SQLite 内存存储、向量化、JSONL 镜像 |
| openfang-runtime | Agent 循环、LLM 驱动、38 个内置工具 |
| openfang-kernel | 工作流引擎、RBAC、调度器、热重载 |
| openfang-api | REST/WS API (Axum 0.8)、76 个端点 |
| openfang-channels | 40 个通道适配器 |
| openfang-wire | OFP P2P 网络协议 |

### 关键设计模式
- **`KernelHandle` trait**: 在 `openfang-runtime` 定义，`openfang-kernel` 实现，避免循环依赖
- **Daemon 检测**: CLI 检查 `~/.openfang/daemon.json`，存在则使用 HTTP，否则进程内启动
- **能力安全**: 每个 Agent 操作前检查其授权能力

### 配置字段变更
添加新配置字段需要:
1. 在结构体中添加字段 + `#[serde(default)]`
2. 在 `Default` impl 中添加默认值
3. 确保 `Serialize` + `Deserialize` derives

### 新增 API 端点
1. 在 `server.rs` 注册路由
2. 在 `routes.rs` 实现处理函数
3. 更新 `static/index_body.html` (如果是 UI 端点)

### 常见问题
- `openfang.exe` 被锁定时使用 `--lib` 标志或先停止守护进程
- `PeerRegistry` 在 kernel 是 `Option<PeerRegistry>`，在 `AppState` 是 `Option<Arc<PeerRegistry>>`
- `AgentLoopResult` 字段是 `.response` 不是 `.response_text`
- 启动守护进程命令是 `start` 不是 `daemon`

## 提交规范

### 提交信息
```
Add Matrix channel adapter with E2EE support
Fix session restore crash on kernel reboot
Refactor capability manager to use DashMap
```

### PR 要求
- 所有测试通过 (`cargo test --workspace`)
- 零 clippy 警告
- 格式化检查通过 (`cargo fmt --all --check`)
- 一个 PR 专注一个问题

## 常用 API 端点
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/agents` | GET | 列出所有 Agent |
| `/api/agents/{id}/message` | POST | 发送消息 (触发 LLM) |
| `/api/budget` | GET/PUT | 全局预算 |
| `/api/network/status` | GET | OFP 网络状态 |
| `/api/peers` | GET | 已连接 peers |
| `/api/a2a/agents` | GET | 外部 A2A agents |

## 国际化 (i18n)

OpenFang 支持多语言 CLI 输出。可用语言: `en` (英语), `zh-CN` (简体中文)。

### 设置语言

```bash
# 通过 CLI 参数
openfang --lang zh-CN agent list

# 通过环境变量
OPENFANG_LANG=zh-CN openfang agent list

# 在 config.toml 中设置
[openfang]
language = "zh-CN"
```

### 在代码中使用翻译

```rust
use openfang_types::i18n::{t, t1, tn, set_language};

// 基本翻译
let msg = t("cli.no_agents");  // "No agents running." 或 "没有正在运行的 Agent。"

// 带参数的翻译
let msg = t1("cli.agent_killed", "abc");  // "Agent abc killed." 或 "Agent abc 已终止。"

// 多参数翻译
let msg = tn("cli.provider_ready", &[("name", "Groq"), ("env", "groq")]);
```

### 添加新翻译

1. 在 `crates/openfang-types/src/i18n.rs` 中找到对应的语言哈希表
2. 添加 key-value 对，格式为 `"category.key": "翻译内容"`
3. 使用 `{}` 作为占位符，例如 `"cli.agent_killed": "Agent {} 已终止。"`

### 支持的语言代码

- `en` - English (默认)
- `zh-CN` - 简体中文
