//! Internationalization (i18n) support for OpenFang.
//!
//! This module provides translation functions for CLI messages, errors,
//! and user-facing text in multiple languages.

use std::collections::HashMap;
use std::sync::LazyLock;

static TRANSLATIONS: LazyLock<HashMap<&'static str, HashMap<&'static str, &'static str>>> =
    LazyLock::new(|| {
        let mut m = HashMap::new();

        let mut en = HashMap::new();
        en.insert("cli.starting_daemon", "Starting daemon...");
        en.insert("cli.daemon_stopped", "OpenFang daemon stopped.");
        en.insert("cli.agent_spawned", "Agent spawned successfully!");
        en.insert("cli.agent_id", "ID:");
        en.insert("cli.agent_name", "Name:");
        en.insert("cli.no_agents", "No agents running.");
        en.insert("cli.agent_killed", "Agent {id} killed.");
        en.insert("cli.error", "Error:");
        en.insert("cli.success", "Success");
        en.insert("cli.failed", "Failed");
        en.insert("cli.hint", "hint:");
        en.insert("cli.try", "try:");
        en.insert("cli.fix", "fix:");
        en.insert("cli.next_steps", "Next steps");
        en.insert("cli.setup_cancelled", "Setup cancelled.");
        en.insert("cli.in_process_mode", "Agent spawned (in-process mode).");
        en.insert("cli.will_be_lost", "Note: Agent will be lost when this process exits.");
        en.insert("cli.use_daemon", "For persistent agents, use `openfang start` first.");
        en.insert("cli.health_check", "Daemon Health:");
        en.insert("cli.config_validation", "Config Validation:");
        en.insert("cli.llm_providers", "LLM Providers:");
        en.insert("cli.channel_integrations", "Channel Integrations:");
        en.insert("cli.skills", "Skills:");
        en.insert("cli.extensions", "Extensions:");
        en.insert("cli.workflows", "Workflows:");
        en.insert("cli.no_workflows", "No workflows registered.");
        en.insert("cli.workflow_created", "Workflow created successfully!");
        en.insert("cli.workflow_completed", "Workflow completed!");
        en.insert("cli.run_id", "Run ID:");
        en.insert("cli.output", "Output:");
        en.insert("cli.invalid_agent_id", "Invalid agent ID: {id}");
        en.insert("cli.kill_failed", "Failed to kill agent: {error}");
        en.insert("cli.parse_error", "Error parsing manifest: {error}");
        en.insert("cli.read_error", "Error reading manifest: {error}");
        en.insert("cli.spawn_error", "Failed to spawn agent: {error}");
        en.insert("cli.workflow_file_not_found", "Workflow file not found: {path}");
        en.insert("cli.workflow_read_error", "Error reading workflow file: {error}");
        en.insert("cli.invalid_json", "Invalid JSON: {error}");
        en.insert("cli.provider_ready", "{name} ({env}) -- Ready");
        en.insert("cli.provider_not_configured", "{name} -- Not configured");
        en.insert("cli.provider_error", "{name} -- Error: {error}");
        en.insert("cli.channel_configured", "{name} -- Configured");
        en.insert("cli.channel_not_configured", "{name} -- Not configured");
        en.insert("cli.skill_count", "{count} skills available");
        en.insert("cli.extension_count", "{count} extensions available");
        en.insert("cli.agent_count", "{count} agents running");
        en.insert("cli.workflow_count", "{count} workflows registered");
        en.insert("cli.id", "ID");
        en.insert("cli.name", "NAME");
        en.insert("cli.state", "STATE");
        en.insert("cli.status", "STATUS");
        en.insert("cli.created", "CREATED");
        en.insert("cli.steps", "STEPS");
        en.insert("cli.version", "Version");
        en.insert("cli.author", "Author");
        en.insert("cli.description", "Description");
        en.insert("cli.model", "Model");
        en.insert("cli.provider", "Provider");
        en.insert("cli.tools", "Tools");
        en.insert("cli.capabilities", "Capabilities");
        en.insert("cli.config", "Config");
        en.insert("cli.help", "Help");
        en.insert("cli.usage", "Usage");
        en.insert("cli.options", "Options");
        en.insert("cli.arguments", "Arguments");
        en.insert("cli.examples", "Examples");
        en.insert("cli.see_help", "See '{cmd} --help' for more information");
        en.insert("cli.confirm", "Confirm");
        en.insert("cli.cancel", "Cancel");
        en.insert("cli.yes", "Yes");
        en.insert("cli.no", "No");
        en.insert("cli.loading", "Loading...");
        en.insert("cli.saving", "Saving...");
        en.insert("cli.done", "Done");
        en.insert("cli.warning", "Warning");
        en.insert("cli.info", "Info");
        en.insert("cli.debug", "Debug");
        m.insert("en", en);

        let mut zh_cn = HashMap::new();
        zh_cn.insert("cli.starting_daemon", "正在启动守护进程...");
        zh_cn.insert("cli.daemon_stopped", "OpenFang 守护进程已停止。");
        zh_cn.insert("cli.agent_spawned", "Agent 启动成功！");
        zh_cn.insert("cli.agent_id", "ID:");
        zh_cn.insert("cli.agent_name", "名称:");
        zh_cn.insert("cli.no_agents", "没有正在运行的 Agent。");
        zh_cn.insert("cli.agent_killed", "Agent {id} 已终止。");
        zh_cn.insert("cli.error", "错误：");
        zh_cn.insert("cli.success", "成功");
        zh_cn.insert("cli.failed", "失败");
        zh_cn.insert("cli.hint", "提示：");
        zh_cn.insert("cli.try", "尝试：");
        zh_cn.insert("cli.fix", "修复：");
        zh_cn.insert("cli.next_steps", "下一步");
        zh_cn.insert("cli.setup_cancelled", "设置已取消。");
        zh_cn.insert("cli.in_process_mode", "Agent 已启动（进程内模式）。");
        zh_cn.insert("cli.will_be_lost", "注意：此进程退出时 Agent 将丢失。");
        zh_cn.insert("cli.use_daemon", "如需持久化 Agent，请先使用 `openfang start`。");
        zh_cn.insert("cli.health_check", "守护进程健康状态：");
        zh_cn.insert("cli.config_validation", "配置验证：");
        zh_cn.insert("cli.llm_providers", "LLM 提供商：");
        zh_cn.insert("cli.channel_integrations", "通道集成：");
        zh_cn.insert("cli.skills", "技能：");
        zh_cn.insert("cli.extensions", "扩展：");
        zh_cn.insert("cli.workflows", "工作流：");
        zh_cn.insert("cli.no_workflows", "没有注册的工作流。");
        zh_cn.insert("cli.workflow_created", "工作流创建成功！");
        zh_cn.insert("cli.workflow_completed", "工作流已完成！");
        zh_cn.insert("cli.run_id", "运行 ID：");
        zh_cn.insert("cli.output", "输出：");
        zh_cn.insert("cli.invalid_agent_id", "无效的 Agent ID：{id}");
        zh_cn.insert("cli.kill_failed", "终止 Agent 失败：{error}");
        zh_cn.insert("cli.parse_error", "解析清单错误：{error}");
        zh_cn.insert("cli.read_error", "读取清单错误：{error}");
        zh_cn.insert("cli.spawn_error", "启动 Agent 失败：{error}");
        zh_cn.insert("cli.workflow_file_not_found", "未找到工作流文件：{path}");
        zh_cn.insert("cli.workflow_read_error", "读取工作流文件错误：{error}");
        zh_cn.insert("cli.invalid_json", "无效的 JSON：{error}");
        zh_cn.insert("cli.provider_ready", "{name} ({env}) -- 就绪");
        zh_cn.insert("cli.provider_not_configured", "{name} -- 未配置");
        zh_cn.insert("cli.provider_error", "{name} -- 错误：{error}");
        zh_cn.insert("cli.channel_configured", "{name} -- 已配置");
        zh_cn.insert("cli.channel_not_configured", "{name} -- 未配置");
        zh_cn.insert("cli.skill_count", "{count} 个技能可用");
        zh_cn.insert("cli.extension_count", "{count} 个扩展可用");
        zh_cn.insert("cli.agent_count", "{count} 个 Agent 正在运行");
        zh_cn.insert("cli.workflow_count", "{count} 个工作流已注册");
        zh_cn.insert("cli.id", "ID");
        zh_cn.insert("cli.name", "名称");
        zh_cn.insert("cli.state", "状态");
        zh_cn.insert("cli.status", "状态");
        zh_cn.insert("cli.created", "创建时间");
        zh_cn.insert("cli.steps", "步骤");
        zh_cn.insert("cli.version", "版本");
        zh_cn.insert("cli.author", "作者");
        zh_cn.insert("cli.description", "描述");
        zh_cn.insert("cli.model", "模型");
        zh_cn.insert("cli.provider", "提供商");
        zh_cn.insert("cli.tools", "工具");
        zh_cn.insert("cli.capabilities", "能力");
        zh_cn.insert("cli.config", "配置");
        zh_cn.insert("cli.help", "帮助");
        zh_cn.insert("cli.usage", "用法");
        zh_cn.insert("cli.options", "选项");
        zh_cn.insert("cli.arguments", "参数");
        zh_cn.insert("cli.examples", "示例");
        zh_cn.insert("cli.see_help", "查看 '{cmd} --help' 获取更多信息");
        zh_cn.insert("cli.confirm", "确认");
        zh_cn.insert("cli.cancel", "取消");
        zh_cn.insert("cli.yes", "是");
        zh_cn.insert("cli.no", "否");
        zh_cn.insert("cli.loading", "加载中...");
        zh_cn.insert("cli.saving", "保存中...");
        zh_cn.insert("cli.done", "完成");
        zh_cn.insert("cli.warning", "警告");
        zh_cn.insert("cli.info", "信息");
        zh_cn.insert("cli.debug", "调试");
        m.insert("zh-CN", zh_cn);

        m
    });

static CURRENT_LANG: LazyLock<std::sync::RwLock<String>> =
    LazyLock::new(|| std::sync::RwLock::new("en".to_string()));

/// Get the current language code.
pub fn get_language() -> String {
    CURRENT_LANG.read().unwrap().clone()
}

/// Set the current language code.
/// 
/// Supported: "en" (English), "zh-CN" (Simplified Chinese)
pub fn set_language(lang: &str) {
    if TRANSLATIONS.contains_key(lang) {
        *CURRENT_LANG.write().unwrap() = lang.to_string();
    }
}

/// Translate a key to the current language.
/// 
/// Keys are in the format "category.key", e.g., "cli.starting_daemon"
/// 
/// # Arguments
/// * `key` - The translation key
/// * `args` - Optional placeholder replacements (e.g., `{"id": "123"}`)
/// 
/// # Returns
/// The translated string, or the key itself if not found.
pub fn t(key: &str) -> String {
    t_with_args(key, &[])
}

pub fn t_with_args(key: &str, args: &[(&str, &str)]) -> String {
    let lang = get_language();
    let lang_map = TRANSLATIONS.get(lang.as_str()).or_else(|| TRANSLATIONS.get("en"));
    
    if let Some(map) = lang_map {
        if let Some(translation) = map.get(key) {
            let mut result = translation.to_string();
            for (k, v) in args {
                result = result.replace(&format!("{{{}}}", k), v);
            }
            return result;
        }
    }
    
    key.to_string()
}

/// Get a translation with a single argument.
pub fn t1(key: &str, arg: &str) -> String {
    t_with_args(key, &[("arg", arg)])
}

/// Get a translation with named arguments.
pub fn tn(key: &str, args: &[(&str, &str)]) -> String {
    t_with_args(key, args)
}

/// Check if a translation key exists.
pub fn exists(key: &str) -> bool {
    let lang = get_language();
    let lang_map = TRANSLATIONS.get(lang.as_str()).or_else(|| TRANSLATIONS.get("en"));
    lang_map.map(|m| m.contains_key(key)).unwrap_or(false)
}

/// Get all available language codes.
pub fn available_languages() -> Vec<&'static str> {
    TRANSLATIONS.keys().copied().collect()
}

/// Initialize i18n from a language code string (e.g., "en", "zh-CN", "zh_CN").
pub fn init_from_string(lang: &str) {
    let lang = lang.replace('_', "-");
    if TRANSLATIONS.contains_key(lang.as_str()) {
        set_language(&lang);
    } else if lang.starts_with("zh") {
        set_language("zh-CN");
    } else {
        set_language("en");
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_english() {
        assert_eq!(get_language(), "en");
        assert_eq!(t("cli.error"), "Error:");
    }

    #[test]
    fn test_chinese() {
        set_language("zh-CN");
        assert_eq!(t("cli.error"), "错误：");
    }

    #[test]
    fn test_args() {
        assert_eq!(t1("cli.agent_killed", "abc"), "Agent abc killed.");
    }

    #[test]
    fn test_args_zh() {
        set_language("zh-CN");
        assert_eq!(t1("cli.agent_killed", "abc"), "Agent abc 已终止。");
    }

    #[test]
    fn test_available_langs() {
        let langs = available_languages();
        assert!(langs.contains(&"en"));
        assert!(langs.contains(&"zh-CN"));
    }
}
