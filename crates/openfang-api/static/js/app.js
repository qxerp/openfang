// OpenFang App — Alpine.js init, hash router, global store
'use strict';

// Marked.js configuration
if (typeof marked !== 'undefined') {
  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function(code, lang) {
      if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
        try { return hljs.highlight(code, { language: lang }).value; } catch(e) {}
      }
      return code;
    }
  });
}

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function renderMarkdown(text) {
  if (!text) return '';
  if (typeof marked !== 'undefined') {
    var html = marked.parse(text);
    // Add copy buttons to code blocks
    html = html.replace(/<pre><code/g, '<pre><button class="copy-btn" onclick="copyCode(this)">Copy</button><code');
    return html;
  }
  return escapeHtml(text);
}

function copyCode(btn) {
  var code = btn.nextElementSibling;
  if (code) {
    navigator.clipboard.writeText(code.textContent).then(function() {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
    });
  }
}

// Tool category icon SVGs — returns inline SVG for each tool category
function toolIcon(toolName) {
  if (!toolName) return '';
  var n = toolName.toLowerCase();
  var s = 'width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  // File/directory operations
  if (n.indexOf('file_') === 0 || n.indexOf('directory_') === 0)
    return '<svg ' + s + '><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>';
  // Web/fetch
  if (n.indexOf('web_') === 0 || n.indexOf('link_') === 0)
    return '<svg ' + s + '><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>';
  // Shell/exec
  if (n.indexOf('shell') === 0 || n.indexOf('exec_') === 0)
    return '<svg ' + s + '><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>';
  // Agent operations
  if (n.indexOf('agent_') === 0)
    return '<svg ' + s + '><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
  // Memory/knowledge
  if (n.indexOf('memory_') === 0 || n.indexOf('knowledge_') === 0)
    return '<svg ' + s + '><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
  // Cron/schedule
  if (n.indexOf('cron_') === 0 || n.indexOf('schedule_') === 0)
    return '<svg ' + s + '><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  // Browser/playwright
  if (n.indexOf('browser_') === 0 || n.indexOf('playwright_') === 0)
    return '<svg ' + s + '><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>';
  // Container/docker
  if (n.indexOf('container_') === 0 || n.indexOf('docker_') === 0)
    return '<svg ' + s + '><path d="M22 12H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>';
  // Image/media
  if (n.indexOf('image_') === 0 || n.indexOf('tts_') === 0)
    return '<svg ' + s + '><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  // Hand tools
  if (n.indexOf('hand_') === 0)
    return '<svg ' + s + '><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.7-2.4L3.4 16a2 2 0 0 1 3.2-2.4L8 15"/></svg>';
  // Task/collab
  if (n.indexOf('task_') === 0)
    return '<svg ' + s + '><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>';
  // Default — wrench
  return '<svg ' + s + '><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>';
}

// Alpine.js global store
document.addEventListener('alpine:init', function() {
  // Restore saved API key on load
  var savedKey = localStorage.getItem('openfang-api-key');
  if (savedKey) OpenFangAPI.setAuthToken(savedKey);

  Alpine.store('app', {
    agents: [],
    connected: false,
    booting: true,
    wsConnected: false,
    connectionState: 'connected',
    lastError: '',
    version: '0.1.0',
    agentCount: 0,
    pendingAgent: null,
    focusMode: localStorage.getItem('openfang-focus') === 'true',
    showOnboarding: false,
    showAuthPrompt: false,

    toggleFocusMode() {
      this.focusMode = !this.focusMode;
      localStorage.setItem('openfang-focus', this.focusMode);
    },

    async refreshAgents() {
      try {
        var agents = await OpenFangAPI.get('/api/agents');
        this.agents = Array.isArray(agents) ? agents : [];
        this.agentCount = this.agents.length;
      } catch(e) { /* silent */ }
    },

    async checkStatus() {
      try {
        var s = await OpenFangAPI.get('/api/status');
        this.connected = true;
        this.booting = false;
        this.lastError = '';
        this.version = s.version || '0.1.0';
        this.agentCount = s.agent_count || 0;
      } catch(e) {
        this.connected = false;
        this.lastError = e.message || 'Unknown error';
        console.warn('[OpenFang] Status check failed:', e.message);
      }
    },

    async checkOnboarding() {
      if (localStorage.getItem('openfang-onboarded')) return;
      try {
        var config = await OpenFangAPI.get('/api/config');
        var apiKey = config && config.api_key;
        var noKey = !apiKey || apiKey === 'not set' || apiKey === '';
        if (noKey && this.agentCount === 0) {
          this.showOnboarding = true;
        }
      } catch(e) {
        // If config endpoint fails, still show onboarding if no agents
        if (this.agentCount === 0) this.showOnboarding = true;
      }
    },

    dismissOnboarding() {
      this.showOnboarding = false;
      localStorage.setItem('openfang-onboarded', 'true');
    },

    async checkAuth() {
      try {
        await OpenFangAPI.get('/api/providers');
        this.showAuthPrompt = false;
      } catch(e) {
        if (e.message && (e.message.indexOf('Not authorized') >= 0 || e.message.indexOf('401') >= 0 || e.message.indexOf('Missing Authorization') >= 0)) {
          this.showAuthPrompt = true;
        }
      }
    },

    submitApiKey(key) {
      if (!key || !key.trim()) return;
      OpenFangAPI.setAuthToken(key.trim());
      localStorage.setItem('openfang-api-key', key.trim());
      this.showAuthPrompt = false;
      this.refreshAgents();
    },

    clearApiKey() {
      OpenFangAPI.setAuthToken('');
      localStorage.removeItem('openfang-api-key');
    }
  });
});

// Main app component
function app() {
  return {
    page: 'agents',
    themeMode: localStorage.getItem('openfang-theme-mode') || 'system',
    theme: (() => {
      var mode = localStorage.getItem('openfang-theme-mode') || 'system';
      if (mode === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return mode;
    })(),
    language: localStorage.getItem('openfang-language') || 'en',
    sidebarCollapsed: localStorage.getItem('openfang-sidebar') === 'collapsed',
    mobileMenuOpen: false,
    connected: false,
    wsConnected: false,
    version: '0.1.0',
    agentCount: 0,

    get agents() { return Alpine.store('app').agents; },

    init() {
      var self = this;

      // Listen for OS theme changes (only matters when mode is 'system')
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (self.themeMode === 'system') {
          self.theme = e.matches ? 'dark' : 'light';
        }
      });

      // Hash routing
      var validPages = ['overview','agents','sessions','approvals','workflows','scheduler','channels','skills','hands','analytics','logs','settings','wizard'];
      var pageRedirects = {
        'chat': 'agents',
        'templates': 'agents',
        'triggers': 'workflows',
        'cron': 'scheduler',
        'schedules': 'scheduler',
        'memory': 'sessions',
        'audit': 'logs',
        'security': 'settings',
        'peers': 'settings',
        'migration': 'settings',
        'usage': 'analytics',
        'approval': 'approvals'
      };
      function handleHash() {
        var hash = window.location.hash.replace('#', '') || 'agents';
        if (pageRedirects[hash]) {
          hash = pageRedirects[hash];
          window.location.hash = hash;
        }
        if (validPages.indexOf(hash) >= 0) self.page = hash;
      }
      window.addEventListener('hashchange', handleHash);
      handleHash();

      // Keyboard shortcuts
      document.addEventListener('keydown', function(e) {
        // Ctrl+K — focus agent switch / go to agents
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          self.navigate('agents');
        }
        // Ctrl+N — new agent
        if ((e.ctrlKey || e.metaKey) && e.key === 'n' && !e.shiftKey) {
          e.preventDefault();
          self.navigate('agents');
        }
        // Ctrl+Shift+F — toggle focus mode
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
          e.preventDefault();
          Alpine.store('app').toggleFocusMode();
        }
        // Escape — close mobile menu
        if (e.key === 'Escape') {
          self.mobileMenuOpen = false;
        }
      });

      // Connection state listener
      OpenFangAPI.onConnectionChange(function(state) {
        Alpine.store('app').connectionState = state;
      });

      // Initial data load
      this.pollStatus();
      Alpine.store('app').checkOnboarding();
      Alpine.store('app').checkAuth();
      setInterval(function() { self.pollStatus(); }, 5000);
    },

    navigate(p) {
      this.page = p;
      window.location.hash = p;
      this.mobileMenuOpen = false;
    },

    setTheme(mode) {
      this.themeMode = mode;
      localStorage.setItem('openfang-theme-mode', mode);
      if (mode === 'system') {
        this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        this.theme = mode;
      }
    },

    toggleTheme() {
      var modes = ['light', 'system', 'dark'];
      var next = modes[(modes.indexOf(this.themeMode) + 1) % modes.length];
      this.setTheme(next);
    },

    setLanguage(lang) {
      this.language = lang;
      localStorage.setItem('openfang-language', lang);
    },

    t(key) {
      var translations = {
        'en': {
          'nav.chat': 'Chat', 'nav.monitor': 'Monitor', 'nav.overview': 'Overview', 'nav.analytics': 'Analytics',
          'nav.logs': 'Logs', 'nav.agents': 'Agents', 'nav.sessions': 'Sessions', 'nav.approvals': 'Approvals',
          'nav.workflows': 'Workflows', 'nav.scheduler': 'Scheduler', 'nav.channels': 'Channels',
          'nav.skills': 'Skills', 'nav.hands': 'Hands', 'nav.settings': 'Settings',
          'nav.automation': 'Automation', 'nav.extensions': 'Extensions', 'nav.system': 'System',
          'status.connected': 'agent(s) running', 'status.disconnected': 'disconnected', 'status.connecting': 'Connecting...',
          'page.overview': 'Overview', 'page.agents': 'Agents', 'page.sessions': 'Sessions', 'page.analytics': 'Analytics',
          'page.logs': 'Logs', 'page.workflows': 'Workflows', 'page.scheduler': 'Scheduler', 'page.channels': 'Channels',
          'page.skills': 'Skills', 'page.hands': 'Hands', 'page.settings': 'Settings', 'page.approvals': 'Approvals',
          'overview.agents_running': 'Agents Running', 'overview.your_agents': 'Your Agents', 'overview.or_new': 'Or Start a New Agent',
          'overview.start_chatting': 'Start Chatting', 'overview.no_agents': 'No agents running', 'overview.spawn_one': 'Spawn one first.',
          'overview.new_agent': 'New Agent', 'overview.stop_all': 'Stop All',
          'agents.title': 'Agents', 'agents.your_agents': 'Your Agents', 'agents.new_agent': '+ New Agent',
          'agents.stop_all': 'Stop All', 'agents.no_agents': 'No agents running.', 'agents.spawn_first': 'Spawn one first.',
          'sessions.title': 'Sessions', 'sessions.conversation': 'Conversation Sessions', 'sessions.resume': 'Each conversation with an agent creates a session. Sessions store the full message history so you can resume conversations later, or review past interactions.',
          'sessions.no_sessions': 'Sessions are created when you chat with agents. Start a conversation to see session history here.',
          'sessions.no_match': 'No sessions match your filter.', 'sessions.memory': 'Agent Memory', 'sessions.memory_desc': 'Each agent has its own key-value memory store. Agents use memory to persist preferences, notes, and context between conversations.',
          'sessions.no_memory': 'This agent has no memory entries yet.',
          'settings.title': 'Settings', 'settings.language': 'Language', 'settings.theme': 'Theme',
          'settings.light': 'Light', 'settings.dark': 'Dark', 'settings.system': 'System',
          'btn.save': 'Save', 'btn.cancel': 'Cancel', 'btn.delete': 'Delete', 'btn.create': 'Create',
          'btn.back': 'Back', 'btn.close': 'Close', 'btn.confirm': 'Confirm', 'btn.retry': 'Retry',
          'msg.saved': 'Saved successfully', 'msg.deleted': 'Deleted successfully', 'msg.error': 'Error',
          'wizard.title': 'Create Agent', 'wizard.skip': 'You can skip this step.', 'wizard.pick_template': 'Pick a template to get started quickly.',
          'wizard.open_agents': 'Open Agents to start talking to your agent', 'wizard.go_agents': 'Go to Agents to create your first agent',
          'channels.title': 'Channels', 'channels.skip': 'You can skip this step. The built-in web chat is always available from the Agents page.',
          'network.title': 'Network Status', 'network.node': 'Node', 'network.address': 'Address', 'network.state': 'State',
          'network.agents': 'Agents', 'network.protocol': 'Protocol', 'network.a2a_agents': 'A2A External Agents',
          'network.no_agents': 'No external agents discovered yet.',
          'analytics.title': 'Analytics', 'analytics.total_agents': 'Total Agents',
          'overview.healthy': 'Healthy', 'overview.unreachable': 'Unreachable',
          'channels.configured': 'configured',
        },
        'zh-CN': {
          'nav.chat': '对话', 'nav.monitor': '监控', 'nav.overview': '概览', 'nav.analytics': '分析',
          'nav.logs': '日志', 'nav.agents': '代理', 'nav.sessions': '会话', 'nav.approvals': '审批',
          'nav.workflows': '工作流', 'nav.scheduler': '调度器', 'nav.channels': '通道',
          'nav.skills': '技能', 'nav.hands': '工具', 'nav.settings': '设置',
          'nav.automation': '自动化', 'nav.extensions': '扩展', 'nav.system': '系统',
          'status.connected': '个代理运行中', 'status.disconnected': '未连接', 'status.connecting': '连接中...',
          'page.overview': '概览', 'page.agents': '代理', 'page.sessions': '会话', 'page.analytics': '分析',
          'page.logs': '日志', 'page.workflows': '工作流', 'page.scheduler': '调度器', 'page.channels': '通道',
          'page.skills': '技能', 'page.hands': '工具', 'page.settings': '设置', 'page.approvals': '审批',
          'overview.agents_running': '运行中的代理', 'overview.your_agents': '您的代理', 'overview.or_new': '或创建新代理',
          'overview.start_chatting': '开始对话', 'overview.no_agents': '没有正在运行的代理', 'overview.spawn_one': '先创建一个。',
          'overview.new_agent': '新建代理', 'overview.stop_all': '停止全部',
          'agents.title': '代理', 'agents.your_agents': '您的代理', 'agents.new_agent': '+ 新建代理',
          'agents.stop_all': '停止全部', 'agents.no_agents': '没有正在运行的代理。', 'agents.spawn_first': '先创建一个。',
          'sessions.title': '会话', 'sessions.conversation': '对话会话', 'sessions.resume': '每次与代理对话都会创建一个会话。会话保存完整的消息历史，让您可以在以后恢复对话或回顾过去的互动。',
          'sessions.no_sessions': '与代理对话时会创建会话。在此开始对话以查看会话历史。',
          'sessions.no_match': '没有符合筛选条件的会话。', 'sessions.memory': '代理记忆', 'sessions.memory_desc': '每个代理都有自己的键值记忆存储。代理使用记忆来保存偏好、笔记和对话之间的上下文。',
          'sessions.no_memory': '此代理还没有记忆条目。',
          'settings.title': '设置', 'settings.language': '语言', 'settings.theme': '主题',
          'settings.light': '浅色', 'settings.dark': '深色', 'settings.system': '跟随系统',
          'btn.save': '保存', 'btn.cancel': '取消', 'btn.delete': '删除', 'btn.create': '创建',
          'btn.back': '返回', 'btn.close': '关闭', 'btn.confirm': '确认', 'btn.retry': '重试',
          'msg.saved': '保存成功', 'msg.deleted': '删除成功', 'msg.error': '错误',
          'wizard.title': '创建代理', 'wizard.skip': '您可以跳过此步骤。', 'wizard.pick_template': '选择一个模板快速开始。',
          'wizard.open_agents': '打开代理页面开始与您的代理对话', 'wizard.go_agents': '转到代理页面创建您的第一个代理',
          'channels.title': '通道', 'channels.skip': '您可以跳过此步骤。内置网页聊天始终可以从代理页面访问。',
          'network.title': '网络状态', 'network.node': '节点', 'network.address': '地址',
          'network.state': '状态', 'network.agents': '代理', 'network.protocol': '协议',
          'network.a2a_agents': 'A2A 外部代理', 'network.no_agents': '尚未发现外部代理。',
          'analytics.title': '分析', 'analytics.total_agents': '代理总数',
          'overview.healthy': '健康', 'overview.unreachable': '不可达',
          'channels.configured': '已配置',
        }
      };
      var lang = translations[this.language] || translations['en'];
      return lang[key] || key;
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      localStorage.setItem('openfang-sidebar', this.sidebarCollapsed ? 'collapsed' : 'expanded');
    },

    async pollStatus() {
      var store = Alpine.store('app');
      await store.checkStatus();
      await store.refreshAgents();
      this.connected = store.connected;
      this.version = store.version;
      this.agentCount = store.agentCount;
      this.wsConnected = OpenFangAPI.isWsConnected();
    }
  };
}
