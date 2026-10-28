/**
 * OUR LADY OF GRACE SENIOR HIGH SCHOOL (OLAG SHS)
 * Student Personality of the Week Assessment System
 * Complete Multi-Role Dashboards & Login Logic
 */

// --- Pre-configured Roles & Accounts ---
// --- System Roles & Default Admin Account ---
const SYSTEM_ROLES = {
  ADMIN: {
    id: 'role-admin',
    key: 'admin',
    name: 'Administrator',
    title: 'System Administrator',
    roleTag: 'Administrator',
    username: 'admin',
    defaultPassword: 'admin@26',
    avatar: 'AD',
    avatarBg: '#0c2340',
    dashboardView: 'dashboard-admin',
    description: 'Full administrative oversight: all students, criteria rubric, week intervals, and reports.'
  },
  COMMITTEE: {
    id: 'role-committee',
    key: 'committee',
    name: 'Committee Member',
    title: 'Evaluator',
    roleTag: 'Committee Member',
    username: 'committee',
    avatar: 'CM',
    avatarBg: '#059669',
    dashboardView: 'dashboard-committee',
    description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
  }
};

const CRITERIA_LIST = [
  { id: 'crit-1', no: 1, name: 'Punctuality', max: 10 },
  { id: 'crit-2', no: 2, name: 'Discipline', max: 10 },
  { id: 'crit-3', no: 3, name: 'Appearance', max: 10 },
  { id: 'crit-4', no: 4, name: 'Social Interactions', max: 10 },
  { id: 'crit-5', no: 5, name: 'Participation in School Activities', max: 10 },
  { id: 'crit-6', no: 6, name: 'Spiritual Life', max: 10 },
  { id: 'crit-7', no: 7, name: 'Dining Hall Etiquette', max: 10 }
];

const WEEKS_LIST = [];

const CLASSES_LIST = [];
const HOUSES_LIST = ['ST. THOMAS', 'ST. PAUL', 'ST. MARY', 'ST. JOSEPH'];

// Clean Initial State: Empty arrays for students, scores, and registered members
const COMMITTEE_MEMBERS = [];
const INITIAL_STUDENTS = [];
const INITIAL_SCORES = {};

// Default Cloud Database Configuration (Supabase PostgreSQL)
const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://apygtjveliipzjbzmiyn.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFweWd0anZlbGlpcHpqYnptaXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMzI5ODUsImV4cCI6MjEwODcwODk4NX0.iEsM-9BcHkTrRTuovx8nxcaL5GOgO4ZmBQSY9VXq558',
  connected: true,
  lastSyncedAt: null
};

// --- Store ---
class OLAGStore {
  constructor() {
    this.storageKey = 'OLAG_SHS_SPOT_DATA_V7';
    this.dbConfigKey = 'OLAG_SUPABASE_CONFIG';
    this.supabase = null;
    this.realtimeChannel = null;
    this.realtimeSubscribed = false;
    this.syncTimeout = null;
    this.onStateUpdatedCallback = null;
    this.tableNeedsSetup = false;
    this.state = this.loadState();
  }

  getDbConfig() {
    try {
      const saved = localStorage.getItem(this.dbConfigKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.connected === 'boolean') {
          if (!parsed.url || !parsed.anonKey) {
            parsed.url = DEFAULT_SUPABASE_CONFIG.url;
            parsed.anonKey = DEFAULT_SUPABASE_CONFIG.anonKey;
          }
          return parsed;
        }
      }
    } catch (e) {}
    return { ...DEFAULT_SUPABASE_CONFIG };
  }

  saveDbConfig(config) {
    try {
      localStorage.setItem(this.dbConfigKey, JSON.stringify(config));
    } catch (e) {}
  }

  initSupabase(onStateUpdatedCallback) {
    if (onStateUpdatedCallback) this.onStateUpdatedCallback = onStateUpdatedCallback;
    const config = this.getDbConfig();
    if (typeof window === 'undefined' || !window.supabase || !config.url || !config.anonKey) {
      return;
    }

    try {
      this.supabase = window.supabase.createClient(config.url, config.anonKey);
      this.fetchFromSupabase();
      this.subscribeToRealtime();
    } catch (e) {
      console.warn('Supabase initialization warning:', e);
    }
  }

  async fetchFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase
        .from('spot_app_state')
        .select('state, updated_at')
        .eq('id', 'current')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Table exists but row 'current' not found -> upload local state
          this.tableNeedsSetup = false;
          await this.syncToSupabase(true);
        } else if (error.code === 'PGRST205') {
          // Table not yet created in Supabase
          this.tableNeedsSetup = true;
          if (this.onStateUpdatedCallback) this.onStateUpdatedCallback();
        }
        return;
      }

      if (data && data.state) {
        this.tableNeedsSetup = false;
        this.applyRemoteState(data.state);
        const config = this.getDbConfig();
        config.connected = true;
        config.lastSyncedAt = data.updated_at || new Date().toISOString();
        this.saveDbConfig(config);
        if (this.onStateUpdatedCallback) this.onStateUpdatedCallback();
      }
    } catch (e) {
      console.warn('Failed to fetch from Supabase:', e);
    }
  }

  applyRemoteState(remoteState) {
    if (!remoteState || typeof remoteState !== 'object') return;
    if (Array.isArray(remoteState.students)) this.state.students = remoteState.students;
    if (Array.isArray(remoteState.weeks)) {
      this.state.weeks = remoteState.weeks.map(w => {
        if (w.maxScore === 80 || !w.maxScore) w.maxScore = 70;
        return w;
      });
    }
    if (remoteState.scores && typeof remoteState.scores === 'object') this.state.scores = remoteState.scores;
    if (Array.isArray(remoteState.members)) this.state.members = remoteState.members;
    if (Array.isArray(remoteState.classes)) this.state.classes = remoteState.classes;
    if (Array.isArray(remoteState.houses)) this.state.houses = remoteState.houses;
    if (Array.isArray(remoteState.notifications)) this.state.notifications = remoteState.notifications;
    if (Array.isArray(remoteState.dismissedNotificationIds)) this.state.dismissedNotificationIds = remoteState.dismissedNotificationIds;
    if (remoteState.selectedWeekId) this.state.selectedWeekId = remoteState.selectedWeekId;

    const isLegacyCriteria = !Array.isArray(remoteState.criteria) ||
      remoteState.criteria.length !== CRITERIA_LIST.length ||
      remoteState.criteria.some(c => c.name === 'Neatness & Appearance' || c.name === 'Teamwork' || c.name === 'Academic Attitude' || c.name === 'Courtesy / Respect');

    if (isLegacyCriteria) {
      this.state.criteria = CRITERIA_LIST;
    } else {
      this.state.criteria = remoteState.criteria;
    }

    this.normalizeStudentsAndClasses(this.state);

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}
  }

  normalizeStudentsAndClasses(stateObj) {
    if (!stateObj || typeof stateObj !== 'object') return;
    if (!Array.isArray(stateObj.students)) stateObj.students = [];
    if (!Array.isArray(stateObj.classes)) stateObj.classes = [...CLASSES_LIST];

    // Ensure every student class exists in stateObj.classes
    stateObj.students.forEach(s => {
      if (s && s.class && !stateObj.classes.includes(s.class)) {
        stateObj.classes.push(s.class);
      }
    });

    // Deduplicate student IDs if any collision occurred (e.g. two OLAG003 entries)
    const seenIds = new Set();
    let maxNum = 0;
    stateObj.students.forEach(s => {
      const m = s && s.id ? String(s.id).match(/^OLAG(\d+)$/i) : null;
      if (m) {
        const n = parseInt(m[1], 10);
        if (n > maxNum) maxNum = n;
      }
    });

    stateObj.students.forEach((s, idx) => {
      if (!s) return;
      if (!s.id || seenIds.has(s.id)) {
        maxNum = Math.max(maxNum + 1, idx + 1);
        let candidate = `OLAG${String(maxNum).padStart(3, '0')}`;
        while (seenIds.has(candidate)) {
          maxNum++;
          candidate = `OLAG${String(maxNum).padStart(3, '0')}`;
        }
        s.id = candidate;
      }
      seenIds.add(s.id);
    });

    this.syncDerivedNotifications(stateObj);
  }

  syncDerivedNotifications(stateObj) {
    if (!stateObj || typeof stateObj !== 'object') return;
    if (!Array.isArray(stateObj.notifications)) stateObj.notifications = [];
    if (!Array.isArray(stateObj.dismissedNotificationIds)) stateObj.dismissedNotificationIds = [];

    const dismissed = new Set(stateObj.dismissedNotificationIds);
    const existingIds = new Set(stateObj.notifications.map(n => n && n.id));

    // 1. Ensure notification exists for each registered committee member
    const members = Array.isArray(stateObj.members) ? stateObj.members : [];
    members.forEach(m => {
      if (!m || !m.id) return;
      const notifId = `notif-member-${m.id}`;
      if (!existingIds.has(notifId) && !dismissed.has(notifId)) {
        stateObj.notifications.push({
          id: notifId,
          type: 'member',
          icon: '👥',
          title: `Committee Member Registered: ${m.name}`,
          message: `${m.name} (${m.role || 'Evaluator'}) is registered (${m.status || 'Active'}) under scope "${m.scope || 'All Houses & Classes'}" with username "${m.username}".`,
          actionLabel: 'View in Directory ➜',
          actionView: 'committee',
          unread: true,
          createdAt: m.createdAt || new Date().toISOString()
        });
        existingIds.add(notifId);
      }
    });

    // 2. Ensure notification exists for submitted weekly student scores
    const scores = (stateObj.scores && typeof stateObj.scores === 'object') ? stateObj.scores : {};
    const weeks = Array.isArray(stateObj.weeks) ? stateObj.weeks : [];
    const students = Array.isArray(stateObj.students) ? stateObj.students : [];
    Object.entries(scores).forEach(([weekId, weekMap]) => {
      if (!weekMap || typeof weekMap !== 'object') return;
      const weekObj = weeks.find(w => w.id === weekId);
      const weekLabel = weekObj ? weekObj.name : 'Weekly Assessment';
      const maxScore = (weekObj && weekObj.maxScore) ? weekObj.maxScore : 70;
      Object.entries(weekMap).forEach(([studentId, sc]) => {
        if (!sc || typeof sc.total !== 'number') return;
        const notifId = `notif-score-${weekId}-${studentId}`;
        if (!existingIds.has(notifId) && !dismissed.has(notifId)) {
          const st = students.find(s => s.id === studentId);
          const studentName = st ? `${st.name} (${st.class})` : studentId;
          const evalName = sc.evaluatorName || 'Committee Evaluator';
          stateObj.notifications.unshift({
            id: notifId,
            type: 'score',
            icon: '📝',
            title: `Assessment Scores Submitted (${weekLabel})`,
            message: `${evalName} submitted scores for ${studentName}: ${sc.total}/${maxScore} (${sc.pct}%).`,
            actionLabel: 'View Rankings ➜',
            actionView: 'rankings',
            unread: true,
            createdAt: sc.submittedAt || new Date().toISOString()
          });
          existingIds.add(notifId);
        }
      });
    });

    // Filter out any notification that was dismissed or whose member was deleted
    const activeMemberIds = new Set(members.map(m => `notif-member-${m.id}`));
    stateObj.notifications = stateObj.notifications.filter(n => {
      if (!n || !n.id || dismissed.has(n.id)) return false;
      if (n.id.startsWith('notif-member-') && !activeMemberIds.has(n.id)) return false;
      return true;
    });
  }

  getNextStudentId() {
    const students = (this.state && Array.isArray(this.state.students)) ? this.state.students : [];
    const existingIds = new Set(students.map(s => s.id));
    let maxNum = 0;
    students.forEach(s => {
      const m = s && s.id ? String(s.id).match(/^OLAG(\d+)$/i) : null;
      if (m) {
        const n = parseInt(m[1], 10);
        if (n > maxNum) maxNum = n;
      }
    });
    let nextNum = Math.max(maxNum + 1, students.length + 1);
    let candidate = `OLAG${String(nextNum).padStart(3, '0')}`;
    while (existingIds.has(candidate)) {
      nextNum++;
      candidate = `OLAG${String(nextNum).padStart(3, '0')}`;
    }
    return candidate;
  }

  subscribeToRealtime() {
    if (!this.supabase || this.realtimeSubscribed) return;
    try {
      this.realtimeChannel = this.supabase
        .channel('spot-live-sync')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'spot_app_state' },
          (payload) => {
            if (payload.new && payload.new.state) {
              this.applyRemoteState(payload.new.state);
              const config = this.getDbConfig();
              config.lastSyncedAt = payload.new.updated_at || new Date().toISOString();
              this.saveDbConfig(config);
              if (this.onStateUpdatedCallback) this.onStateUpdatedCallback();
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            this.realtimeSubscribed = true;
          }
        });
    } catch (e) {
      console.warn('Realtime subscription error:', e);
    }
  }

  scheduleSupabaseSync() {
    if (!this.supabase) return;
    if (this.syncTimeout) clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(() => this.syncToSupabase(), 800);
  }

  async syncToSupabase(force = false) {
    if (!this.supabase) return;
    const snapshot = {
      students: this.state.students || [],
      weeks: this.state.weeks || [],
      scores: this.state.scores || {},
      members: this.state.members || [],
      classes: this.state.classes || [],
      houses: this.state.houses || [],
      criteria: this.state.criteria || [],
      notifications: this.state.notifications || [],
      dismissedNotificationIds: this.state.dismissedNotificationIds || [],
      selectedWeekId: this.state.selectedWeekId
    };

    try {
      const nowIso = new Date().toISOString();
      const { error } = await this.supabase
        .from('spot_app_state')
        .upsert({ id: 'current', state: snapshot, updated_at: nowIso });

      if (!error) {
        this.tableNeedsSetup = false;
        const config = this.getDbConfig();
        config.connected = true;
        config.lastSyncedAt = nowIso;
        this.saveDbConfig(config);
      } else if (error.code === 'PGRST205') {
        this.tableNeedsSetup = true;
        if (this.onStateUpdatedCallback) this.onStateUpdatedCallback();
      }
    } catch (e) {
      console.warn('Supabase sync error:', e);
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.theme) parsed.theme = localStorage.getItem('olag_theme') || 'light';
        if (typeof parsed.sidebarCollapsed === 'undefined') parsed.sidebarCollapsed = false;
        if (typeof parsed.dashInfoHidden === 'undefined') parsed.dashInfoHidden = false;

        const isLegacyCriteria = !Array.isArray(parsed.criteria) ||
          parsed.criteria.length !== CRITERIA_LIST.length ||
          parsed.criteria.some(c => c.name === 'Neatness & Appearance' || c.name === 'Teamwork' || c.name === 'Academic Attitude' || c.name === 'Courtesy / Respect');

        if (isLegacyCriteria) {
          parsed.criteria = CRITERIA_LIST;
          if (Array.isArray(parsed.weeks)) {
            parsed.weeks.forEach(w => {
              if (w.maxScore === 80 || !w.maxScore) w.maxScore = 70;
            });
          }
        }
        this.normalizeStudentsAndClasses(parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse state:', e);
    }
    return this.getInitialState();
  }

  getInitialState() {
    return {
      currentRoleKey: 'admin',
      currentUser: SYSTEM_ROLES.ADMIN,
      isLoggedIn: false,
      currentView: 'dashboard-admin',
      selectedWeekId: null,
      selectedClass: '',
      selectedStudentId: null,
      students: INITIAL_STUDENTS,
      weeks: WEEKS_LIST,
      criteria: CRITERIA_LIST,
      members: COMMITTEE_MEMBERS,
      scores: INITIAL_SCORES,
      classes: CLASSES_LIST,
      houses: HOUSES_LIST,
      totalStudentsCount: 0,
      studentSearchQuery: '',
      studentClassFilter: 'All Classes',
      studentHouseFilter: 'All Houses',
      activeLoginTab: 'admin',
      selectedEvaluatorId: null,
      committeeSearchQuery: '',
      committeeRoleFilter: 'All',
      committeeStatusFilter: 'All',
      notifications: [],
      dismissedNotificationIds: [],
      theme: localStorage.getItem('olag_theme') || 'light',
      sidebarCollapsed: false,
      dashInfoHidden: false
    };
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Save failed:', e);
    }
    this.scheduleSupabaseSync();
  }

  resetAll() {
    this.state = this.getInitialState();
    this.save();
  }
}

// --- App Controller ---
class OLAGApp {
  constructor() {
    window.app = this;
    this.store = new OLAGStore();
    this.init();
  }

  init() {
    this.applyTheme(this.store.state.theme || 'light');
    this.applySidebarState();
    this.bindEvents();
    window.addEventListener('resize', () => this.applySidebarState());
    window.addEventListener('storage', (e) => {
      if (e.key === this.store.storageKey) {
        this.store.state = this.store.loadState();
        this.render();
      }
    });

    // Initialize Supabase Cloud Database if configured
    this.store.initSupabase(() => {
      this.updateDatabaseStatusUI();
      this.render();
    });

    this.updateDatabaseStatusUI();
    this.render();
  }

  // --- Theme Management (Light & Dark Mode) ---
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.store.state.theme = theme;
    localStorage.setItem('olag_theme', theme);
    this.updateThemeUI();
  }

  toggleTheme() {
    const nextTheme = this.store.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme) {
    this.applyTheme(theme);
    this.store.save();
    this.showToast(`Switched to ${theme === 'dark' ? 'Dark' : 'Light'} Mode`);
    if (this.store.state.currentView === 'settings') {
      this.renderSettings();
    }
  }

  updateThemeUI() {
    const isDark = this.store.state.theme === 'dark';
    const iconEl = document.getElementById('themeIconIndicator');
    const labelEl = document.getElementById('themeLabelIndicator');
    if (iconEl) iconEl.textContent = isDark ? '☀️' : '🌙';
    if (labelEl) labelEl.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }

  // --- Sidebar Collapse Management (Desktop & Mobile Drawer) ---
  applySidebarState() {
    const shell = document.getElementById('screenAppShell');
    const arrow = document.getElementById('sidebarArrowIcon');
    if (!shell) return;
    if (window.innerWidth <= 768) {
      const isMobileOpen = shell.classList.contains('mobile-sidebar-open');
      if (arrow) arrow.textContent = isMobileOpen ? '✕' : '☰';
      return;
    }
    // Desktop mode
    shell.classList.remove('mobile-sidebar-open');
    if (this.store.state.sidebarCollapsed) {
      shell.classList.add('sidebar-collapsed');
      if (arrow) arrow.textContent = '▶';
    } else {
      shell.classList.remove('sidebar-collapsed');
      if (arrow) arrow.textContent = '◀';
    }
  }

  toggleSidebar(forceState) {
    const shell = document.getElementById('screenAppShell');
    if (!shell) return;
    if (window.innerWidth <= 768) {
      const isMobileOpen = typeof forceState === 'boolean' ? forceState : !shell.classList.contains('mobile-sidebar-open');
      shell.classList.toggle('mobile-sidebar-open', isMobileOpen);
      const arrow = document.getElementById('sidebarArrowIcon');
      if (arrow) arrow.textContent = isMobileOpen ? '✕' : '☰';
      return;
    }
    this.store.state.sidebarCollapsed = typeof forceState === 'boolean' ? forceState : !this.store.state.sidebarCollapsed;
    this.store.save();
    this.applySidebarState();
  }

  closeMobileSidebar() {
    const shell = document.getElementById('screenAppShell');
    if (shell) shell.classList.remove('mobile-sidebar-open');
    const arrow = document.getElementById('sidebarArrowIcon');
    if (arrow && window.innerWidth <= 768) arrow.textContent = '☰';
  }

  // --- Dashboard Info Hide / Show Toggle ---
  toggleDashboardInfo() {
    this.store.state.dashInfoHidden = !this.store.state.dashInfoHidden;
    this.store.save();

    const isHidden = this.store.state.dashInfoHidden;
    const adminWrap = document.getElementById('adminDashboardInfoWrap');
    const commWrap = document.getElementById('committeeDashboardInfoWrap');
    const adminBtn = document.getElementById('btnToggleAdminDashInfo');
    const commBtn = document.getElementById('btnToggleCommitteeDashInfo');

    [adminWrap, commWrap].forEach(el => {
      if (el) el.classList.toggle('is-collapsed', isHidden);
    });

    [adminBtn, commBtn].forEach(btn => {
      if (btn) {
        btn.classList.toggle('is-collapsed', isHidden);
        const arrow = btn.querySelector('.dash-toggle-arrow');
        const text = btn.querySelector('.dash-toggle-text');
        if (arrow) arrow.textContent = isHidden ? '▼' : '▲';
        if (text) text.textContent = isHidden ? 'Show Dashboard Info' : 'Hide Dashboard Info';
      }
    });

    this.showToast(isHidden ? 'Dashboard info minimized' : 'Dashboard info expanded');
  }

  bindEvents() {
    // Navigation items
    document.querySelectorAll('[data-nav-target]').forEach(item => {
      item.addEventListener('click', () => {
        this.navigateTo(item.dataset.navTarget);
      });
    });

    // Login Role Tabs (Administrator vs Committee Member)
    document.querySelectorAll('.login-role-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const roleKey = tab.dataset.portalTab;
        if (roleKey) this.selectLoginPortalTab(roleKey);
      });
    });

    // 1-Click Instant Demo Login Buttons
    const btn1ClickAdmin = document.getElementById('btn1ClickAdmin');
    if (btn1ClickAdmin) {
      btn1ClickAdmin.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLoginByRole('admin');
      });
    }

    const btn1ClickCommittee = document.getElementById('btn1ClickCommittee');
    if (btn1ClickCommittee) {
      btn1ClickCommittee.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLoginByRole('committee');
      });
    }

    // Login Form Submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameEl = document.getElementById('loginUsername');
        const passwordEl = document.getElementById('loginPassword');
        const username = usernameEl ? usernameEl.value.trim() : '';
        const password = passwordEl ? passwordEl.value.trim() : '';
        this.handleLoginByUsername(username, password);
      });
    }

    // Direct Administrator Login Form & Button
    const btnSubmitAdmin = document.getElementById('btnLoginSubmitAdmin');
    if (btnSubmitAdmin) {
      btnSubmitAdmin.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAdminLogin();
      });
    }

    const formAdmin = document.getElementById('loginFormAdmin');
    if (formAdmin) {
      formAdmin.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAdminLogin();
      });
    }

    // Toggle Password Visibility Eye
    const btnTogglePwd = document.getElementById('btnTogglePassword');
    if (btnTogglePwd) {
      btnTogglePwd.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePasswordVisibility();
      });
    }

    const btnToggleAdminPwd = document.getElementById('btnToggleAdminPassword');
    if (btnToggleAdminPwd) {
      btnToggleAdminPwd.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePasswordVisibility('loginAdminPassword', 'btnToggleAdminPassword');
      });
    }

    // Forgot Password link
    const linkForgot = document.getElementById('linkForgotPassword');
    if (linkForgot) {
      linkForgot.addEventListener('click', (e) => {
        e.preventDefault();
        this.showToast('Login Credentials:\n• Administrator: admin / admin@26\n• Committee Member: akosua.d / committee');
      });
    }

    // Sidebar Logout
    const btnLogout = document.getElementById('btnSidebarLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        this.logout();
      });
    }

    // Dashboard switching is disabled for both Admin and Committee Members
    const btnSwitchDash = document.getElementById('btnSwitchDashboard');
    if (btnSwitchDash) {
      btnSwitchDash.style.display = 'none';
      btnSwitchDash.onclick = null;
    }
    const headerProfile = document.getElementById('headerUserProfile');
    if (headerProfile) {
      headerProfile.style.cursor = 'default';
      headerProfile.onclick = null;
    }

    // Form Set Week Interval
    const formSetWeek = document.getElementById('formSetWeekInterval');
    if (formSetWeek) {
      formSetWeek.addEventListener('submit', (e) => this.saveWeekInterval(e));
    }

    const setWeekTargetSelect = document.getElementById('setWeekTargetSelect');
    if (setWeekTargetSelect) {
      setWeekTargetSelect.addEventListener('change', () => {
        this.loadWeekIntervalForm(setWeekTargetSelect.value);
      });
    }

    const weekStartDate = document.getElementById('weekStartDate');
    const weekEndDate = document.getElementById('weekEndDate');
    const weekNameInput = document.getElementById('weekNameInput');
    const weekStatusSelect = document.getElementById('weekStatusSelect');
    if (weekStartDate) weekStartDate.addEventListener('input', () => this.updateWeekIntervalPreview());
    if (weekEndDate) weekEndDate.addEventListener('input', () => this.updateWeekIntervalPreview());
    if (weekNameInput) weekNameInput.addEventListener('input', () => this.updateWeekIntervalPreview());
    if (weekStatusSelect) {
      weekStatusSelect.addEventListener('change', () => {
        const isCurrentChk = document.getElementById('weekIsCurrentCheckbox');
        if (weekStatusSelect.value === 'Upcoming' && isCurrentChk) {
          isCurrentChk.checked = false;
        } else if (weekStatusSelect.value === 'Open' && isCurrentChk && !this.store.state.weeks.some(w => w.isCurrent && w.status === 'Open')) {
          isCurrentChk.checked = true;
        }
        this.updateWeekStatusHint();
      });
    }

    // Form Add / Edit Member
    const formAddMember = document.getElementById('formAddMember');
    if (formAddMember) {
      formAddMember.addEventListener('submit', (e) => this.saveMember(e));
    }

    const addMemberName = document.getElementById('addMemberName');
    const addMemberRole = document.getElementById('addMemberRole');
    const addMemberScope = document.getElementById('addMemberScope');
    const addMemberStatus = document.getElementById('addMemberStatus');
    const addMemberUsername = document.getElementById('addMemberUsername');

    if (addMemberName) {
      addMemberName.addEventListener('input', () => {
        const editId = document.getElementById('editMemberId');
        if (!editId || !editId.value) {
          const clean = addMemberName.value.trim().toLowerCase().replace(/[^a-z\s]/g, '');
          const parts = clean.split(/\s+/).filter(Boolean);
          if (parts.length >= 2) {
            if (addMemberUsername) addMemberUsername.value = `${parts[0]}.${parts[parts.length - 1][0]}`;
          } else if (parts[0]) {
            if (addMemberUsername) addMemberUsername.value = parts[0];
          }
        }
        this.updateMemberPreview();
      });
    }
    if (addMemberRole) addMemberRole.addEventListener('change', () => this.updateMemberPreview());
    if (addMemberScope) addMemberScope.addEventListener('change', () => this.updateMemberPreview());
    if (addMemberStatus) addMemberStatus.addEventListener('change', () => this.updateMemberPreview());
    if (addMemberUsername) addMemberUsername.addEventListener('input', () => this.updateMemberPreview());

    // Form Add Class
    const formAddClass = document.getElementById('formAddClass');
    if (formAddClass) {
      formAddClass.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newClassNameInput');
        if (input) this.saveNewClass(input.value);
      });
    }

    // Modal Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModals();
      });
    });
  }

  // Switch between Committee Login and Committee Registration
  switchCommitteeForm(mode = 'login') {
    const formLogin = document.getElementById('loginFormCommittee');
    const formRegister = document.getElementById('registerFormCommittee');
    const panelLogin = document.getElementById('panelCommitteeLogin');
    const panelRegister = document.getElementById('panelCommitteeRegister');
    const tabLogin = document.getElementById('tabCommitteeLogin');
    const tabRegister = document.getElementById('tabCommitteeRegister');
    const titleEl = document.getElementById('committeeCardTitle');
    const subtitleEl = document.getElementById('committeeCardSubtitle');

    if (mode === 'register') {
      if (formLogin) formLogin.style.display = 'none';
      if (formRegister) formRegister.style.display = 'block';
      if (panelLogin) panelLogin.style.display = 'none';
      if (panelRegister) panelRegister.style.display = 'block';
      if (tabLogin) tabLogin.classList.remove('active');
      if (tabRegister) tabRegister.classList.add('active');
      if (titleEl) titleEl.textContent = 'Create your account';
      if (subtitleEl) subtitleEl.textContent = 'Register as a committee member to evaluate students';
      const nameInp = document.getElementById('regCommitteeName');
      if (nameInp) nameInp.focus();
    } else {
      if (formLogin) formLogin.style.display = 'block';
      if (formRegister) formRegister.style.display = 'none';
      if (panelLogin) panelLogin.style.display = 'block';
      if (panelRegister) panelRegister.style.display = 'none';
      if (tabLogin) tabLogin.classList.add('active');
      if (tabRegister) tabRegister.classList.remove('active');
      if (titleEl) titleEl.textContent = 'Welcome back';
      if (subtitleEl) subtitleEl.textContent = 'Sign in to your account to continue';
      const userInp = document.getElementById('loginCommitteeUsername');
      if (userInp) userInp.focus();
    }
  }

  // Backward-compatible portal helpers
  setPortalView() {}
  selectLoginPortalTab() {}

  togglePasswordVisibility(inputId = 'loginPassword', btnId = 'btnTogglePassword') {
    const pwdInput = document.getElementById(inputId);
    const btnTogglePwd = document.getElementById(btnId);
    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      if (btnTogglePwd) {
        btnTogglePwd.textContent = '🙈';
        btnTogglePwd.title = 'Hide Password';
      }
    } else {
      pwdInput.type = 'password';
      if (btnTogglePwd) {
        btnTogglePwd.textContent = '👁️';
        btnTogglePwd.title = 'Show Password';
      }
    }
  }

  handleAdminLogin() {
    const userInp = document.getElementById('loginAdminUsername');
    const passInp = document.getElementById('loginAdminPassword');
    const username = userInp ? userInp.value.trim().toLowerCase() : '';
    const password = passInp ? passInp.value.trim() : '';

    if (!username) {
      this.showToast('Please enter your administrator username.');
      if (userInp) userInp.focus();
      return;
    }

    if (!password) {
      this.showToast('Please enter your administrator password.');
      if (passInp) passInp.focus();
      return;
    }

    if (username !== 'admin') {
      this.showToast('Invalid administrator username. Use "admin".');
      if (userInp) userInp.focus();
      return;
    }

    if (password !== 'admin@26' && password !== 'admin' && password !== 'password' && password !== '123456') {
      this.showToast('Invalid password for Administrator. Please try again.');
      if (passInp) passInp.focus();
      return;
    }

    this.handleLoginByRole('admin');
  }

  handleCommitteeLogin() {
    const userInp = document.getElementById('loginCommitteeUsername');
    const passInp = document.getElementById('loginCommitteePassword');
    const username = userInp ? userInp.value.trim().toLowerCase() : '';
    const password = passInp ? passInp.value.trim() : '';

    if (!username) {
      this.showToast('Please enter your committee username.');
      if (userInp) userInp.focus();
      return;
    }

    if (!password) {
      this.showToast('Please enter your committee password.');
      if (passInp) passInp.focus();
      return;
    }

    // Check generic committee
    if (username === 'committee') {
      if (password !== 'committee' && password !== 'password' && password !== '123456') {
        this.showToast('Invalid password for Committee Member. Please try again.');
        return;
      }
      this.handleLoginByRole('committee');
      return;
    }

    // Check existing or newly registered committee member
    const matchedMember = this.store.state.members.find(m => 
      m.username.toLowerCase() === username || 
      m.name.toLowerCase() === username || 
      m.name.toLowerCase().includes(username)
    );

    if (matchedMember) {
      if (matchedMember.password) {
        if (matchedMember.password !== password) {
          this.showToast(`Invalid password for ${matchedMember.name}. Please try again.`);
          return;
        }
      } else {
        if (password !== 'committee' && password !== 'password' && password !== '123456' && password !== matchedMember.username) {
          this.showToast(`Invalid password for ${matchedMember.name}. Please try again.`);
          return;
        }
      }

      const initials = matchedMember.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
      const role = {
        id: matchedMember.id,
        key: 'committee',
        name: matchedMember.name,
        title: matchedMember.role,
        roleTag: 'Committee Member',
        username: matchedMember.username,
        avatar: initials,
        avatarBg: '#059669',
        dashboardView: 'dashboard-committee',
        description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
      };

      this.store.state.currentRoleKey = 'committee';
      this.store.state.currentUser = role;
      this.store.state.currentView = 'dashboard-committee';
      this.store.state.selectedEvaluatorId = matchedMember.id;
      this.store.state.isLoggedIn = true;
      this.store.save();
      this.closeModals();
      if (typeof window !== 'undefined' && window.location && window.location.pathname && (window.location.pathname.includes('committee-login') || window.location.pathname.includes('admin-login'))) {
        window.location.href = 'index.html';
        return;
      }
      this.render();
      this.showToast(`Logged in as ${matchedMember.name} (${matchedMember.role})`);
      return;
    }

    this.showToast('Committee member not found. Please register or check your username.');
  }

  handleCommitteeRegister() {
    const nameInp = document.getElementById('regCommitteeName');
    const roleInp = document.getElementById('regCommitteeRole');
    const userInp = document.getElementById('regCommitteeUsername');
    const passInp = document.getElementById('regCommitteePassword');
    const confirmInp = document.getElementById('regCommitteeConfirmPassword');

    const name = nameInp ? nameInp.value.trim() : '';
    const role = roleInp ? roleInp.value.trim() : 'Committee Member / Evaluator';
    const username = userInp ? userInp.value.trim().toLowerCase() : '';
    const password = passInp ? passInp.value.trim() : '';
    const confirmPassword = confirmInp ? confirmInp.value.trim() : '';

    if (!name) {
      this.showToast('Please enter your full name.');
      if (nameInp) nameInp.focus();
      return;
    }

    if (!role) {
      this.showToast('Please enter your committee role or designation.');
      if (roleInp) roleInp.focus();
      return;
    }

    if (!username) {
      this.showToast('Please enter a username or staff ID.');
      if (userInp) userInp.focus();
      return;
    }

    if (username.length < 3) {
      this.showToast('Username must be at least 3 characters.');
      if (userInp) userInp.focus();
      return;
    }

    if (!password) {
      this.showToast('Please create a password.');
      if (passInp) passInp.focus();
      return;
    }

    if (password.length < 3) {
      this.showToast('Password must be at least 3 characters.');
      if (passInp) passInp.focus();
      return;
    }

    if (password !== confirmPassword) {
      this.showToast('Passwords do not match. Please re-enter.');
      if (confirmInp) confirmInp.focus();
      return;
    }

    if (username === 'admin') {
      this.showToast("Username 'admin' is reserved for Administrator. Please choose another.");
      if (userInp) userInp.focus();
      return;
    }

    const existingMember = this.store.state.members.find(m => m.username.toLowerCase() === username);
    if (existingMember) {
      this.showToast(`Username '${username}' is already registered for ${existingMember.name}. Please choose another.`);
      if (userInp) userInp.focus();
      return;
    }

    const newId = `mem-${Date.now()}`;
    const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
    const newMember = {
      id: newId,
      no: this.store.state.members.length + 1,
      name: name,
      role: role,
      username: username,
      password: password,
      status: 'Active'
    };

    this.store.state.members.push(newMember);
    this.addNotification({
      id: `notif-member-${newMember.id}`,
      type: 'member',
      icon: '👥',
      title: `Committee Member Registered: ${newMember.name}`,
      message: `${newMember.name} (${newMember.role}) registered with username "${newMember.username}" and is Active for student assessments.`,
      actionLabel: 'View in Directory ➜',
      actionView: 'committee'
    });

    const roleObj = {
      id: newMember.id,
      key: 'committee',
      name: newMember.name,
      title: newMember.role,
      roleTag: 'Committee Member',
      username: newMember.username,
      avatar: initials,
      avatarBg: '#059669',
      dashboardView: 'dashboard-committee',
      description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
    };

    this.store.state.currentRoleKey = 'committee';
    this.store.state.currentUser = roleObj;
    this.store.state.currentView = 'dashboard-committee';
    this.store.state.selectedEvaluatorId = newMember.id;
    this.store.state.isLoggedIn = true;
    this.store.save();
    this.closeModals();
    if (typeof window !== 'undefined' && window.location && window.location.pathname && (window.location.pathname.includes('committee-login') || window.location.pathname.includes('admin-login'))) {
      window.location.href = 'index.html';
      return;
    }
    this.render();
    this.showToast(`✓ Registered successfully! Welcome, ${newMember.name}.`);
  }

  handleLoginByRole(roleKey) {
    const isCommittee = roleKey === 'committee';
    let role;
    if (isCommittee) {
      const primaryMember = this.store.state.members[0] || { id: 'committee-default', name: 'Committee Member', role: 'Evaluator', username: 'committee' };
      role = {
        id: primaryMember.id,
        key: 'committee',
        name: primaryMember.name,
        title: primaryMember.role,
        roleTag: 'Committee Member',
        username: primaryMember.username,
        avatar: primaryMember.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM',
        avatarBg: '#059669',
        dashboardView: 'dashboard-committee',
        description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
      };
      this.store.state.selectedEvaluatorId = primaryMember.id;
    } else {
      role = SYSTEM_ROLES.ADMIN;
    }

    this.store.state.currentRoleKey = role.key;
    this.store.state.currentUser = role;
    this.store.state.currentView = role.dashboardView;
    this.store.state.isLoggedIn = true;
    this.store.save();
    this.closeModals();
    if (typeof window !== 'undefined' && window.location) {
      const href = (window.location.href || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      if (href.includes('admin-login') || pathname.includes('admin-login') || href.includes('committee-login') || pathname.includes('committee-login')) {
        window.location.href = 'index.html';
        return;
      }
    }
    this.render();
    this.showToast(`Logged in as ${role.name} (${role.roleTag})`);
  }

  handleLoginByUsername(username, password) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    const activeTab = this.store.state.activeLoginTab || 'admin';

    // 1. Check Administrator
    if (cleanUser === 'admin') {
      if (cleanPass && cleanPass !== 'admin@26' && cleanPass !== 'admin' && cleanPass !== 'password' && cleanPass !== '123456') {
        this.showToast('Invalid password for Administrator. Default password is admin@26.');
        return;
      }
      this.handleLoginByRole('admin');
      return;
    }

    // 2. Check generic committee
    if (cleanUser === 'committee') {
      if (cleanPass && cleanPass !== 'committee' && cleanPass !== 'password' && cleanPass !== '123456') {
        this.showToast('Invalid password for Committee Member. Please try again.');
        return;
      }
      this.handleLoginByRole('committee');
      return;
    }

    // 3. Check if matching any specific committee member in store.state.members
    const matchedMember = this.store.state.members.find(m => 
      m.username.toLowerCase() === cleanUser || 
      m.name.toLowerCase() === cleanUser || 
      m.name.toLowerCase().includes(cleanUser)
    );
    if (matchedMember) {
      if (cleanPass && cleanPass !== 'committee' && cleanPass !== 'password' && cleanPass !== '123456' && cleanPass !== matchedMember.username) {
        this.showToast(`Invalid password for ${matchedMember.name}. Please try again.`);
        return;
      }
      const role = {
        id: matchedMember.id,
        key: 'committee',
        name: matchedMember.name,
        title: matchedMember.role,
        roleTag: 'Committee Member',
        username: matchedMember.username,
        avatar: matchedMember.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        avatarBg: '#059669',
        dashboardView: 'dashboard-committee',
        description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
      };
      this.store.state.currentRoleKey = 'committee';
      this.store.state.currentUser = role;
      this.store.state.currentView = 'dashboard-committee';
      this.store.state.selectedEvaluatorId = matchedMember.id;
      this.store.state.isLoggedIn = true;
      this.store.save();
      this.closeModals();
      this.render();
      this.showToast(`Logged in as ${matchedMember.name} (Committee Member)`);
      return;
    }

    // 4. Fallback based on active tab
    if (activeTab === 'committee') {
      this.handleLoginByRole('committee');
    } else {
      this.handleLoginByRole('admin');
    }
  }

  logout() {
    const isCommittee = this.store.state.currentRoleKey === 'committee';
    this.store.state.isLoggedIn = false;
    this.store.save();
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = isCommittee ? 'committee-login.html' : 'admin-login.html';
      return;
    }
    this.render();
    this.showToast('You have logged out.');
  }

  navigateTo(viewId, payload = null) {
    this.closeMobileSidebar();
    const roleKey = this.store.state.currentRoleKey;
    if (roleKey === 'committee' && (viewId === 'dashboard-admin' || viewId === 'committee' || viewId === 'settings')) {
      viewId = 'dashboard-committee';
    } else if (roleKey === 'admin' && viewId === 'dashboard-committee') {
      viewId = 'dashboard-admin';
    }
    this.store.state.currentView = viewId;
    if (viewId === 'students' && !(payload && payload.preserveFilters)) {
      this.store.state.studentClassFilter = 'All Classes';
      this.store.state.studentHouseFilter = 'All Houses';
      this.store.state.studentSearchQuery = '';
    }
    if (viewId === 'committee' && !(payload && payload.preserveFilters)) {
      this.store.state.committeeSearchQuery = '';
      this.store.state.committeeRoleFilter = 'All';
      this.store.state.committeeStatusFilter = 'All';
    }
    if (payload && payload.studentId) {
      this.store.state.selectedStudentId = payload.studentId;
    }
    this.store.save();
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    const isLoggedIn = this.store.state.isLoggedIn;
    const loginWrapper = document.getElementById('screenLoginWrapper');
    const appShell = document.getElementById('screenAppShell');

    if (!isLoggedIn) {
      if (loginWrapper) loginWrapper.style.display = 'flex';
      if (appShell) appShell.style.display = 'none';
      return;
    } else {
      if (loginWrapper) loginWrapper.style.display = 'none';
      if (appShell) appShell.style.display = 'flex';
    }

    if (!appShell) return; // Guard for standalone pages like committee-login.html

    this.renderTopHeader();
    this.renderSidebar();
    this.renderActiveView();
  }

  renderTopHeader() {
    const user = this.store.state.currentUser;
    const activeWeek = this.getActiveWeek();
    const upcomingWeek = this.getUpcomingWeek();
    const currentWeek = activeWeek;

    const userNameEl = document.getElementById('headerProfileName');
    const userRoleEl = document.getElementById('headerProfileRole');
    const userAvatarEl = document.getElementById('headerProfileAvatar');
    const weekIntervalEl = document.getElementById('headerWeekIntervalText');
    const btnSwitchDash = document.getElementById('btnSwitchDashboard');

    if (userNameEl) userNameEl.textContent = user.name;
    if (userRoleEl) userRoleEl.textContent = user.roleTag;
    if (userAvatarEl) {
      userAvatarEl.textContent = user.avatar;
      userAvatarEl.style.backgroundColor = user.avatarBg;
      userAvatarEl.style.color = '#ffffff';
    }

    this.updateDatabaseStatusUI();
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const weekPillEl = document.querySelector('.header-week-pill');

    if (weekIntervalEl) {
      let intervalHtml = '';
      if (activeWeek) {
        intervalHtml = `${escapeHtml(activeWeek.name)} (${escapeHtml(activeWeek.dateRange)})`;
        if (upcomingWeek) {
          intervalHtml += ` <span style="font-size: 0.74rem; font-weight: 700; color: #2563eb; margin-left: 0.35rem;">[⏳ Next: ${escapeHtml(upcomingWeek.name)}]</span>`;
        }
      } else if (upcomingWeek) {
        intervalHtml = `<span style="color: #2563eb; font-weight: 700;">⏳ Next: ${escapeHtml(upcomingWeek.name)} (${escapeHtml(upcomingWeek.dateRange)})</span>`;
      } else {
        intervalHtml = 'No active week interval';
      }

      if (isCurrentlyAdmin) {
        weekIntervalEl.innerHTML = `${intervalHtml} <span class="header-week-edit-badge">✏️ Set</span>`;
      } else {
        weekIntervalEl.innerHTML = intervalHtml;
      }
    }

    if (weekPillEl) {
      if (isCurrentlyAdmin) {
        weekPillEl.classList.add('clickable');
        weekPillEl.title = 'Click to Set / Configure Week Interval (Admin)';
        weekPillEl.onclick = () => this.openSetWeekIntervalModal();
      } else {
        weekPillEl.classList.remove('clickable');
        weekPillEl.title = 'Current Assessment Week Interval';
        weekPillEl.onclick = null;
      }
    }

    // Dashboard switching is disabled for both Admin and Committee Members
    if (btnSwitchDash) {
      btnSwitchDash.style.display = 'none';
      btnSwitchDash.onclick = null;
    }
    const headerProfileEl = document.getElementById('headerUserProfile');
    if (headerProfileEl) {
      headerProfileEl.style.cursor = 'default';
      headerProfileEl.onclick = null;
    }
  }

  renderSidebar() {
    const roleKey = this.store.state.currentRoleKey;
    const menuContainer = document.getElementById('sidebarNavMenu');
    if (!menuContainer) return;

    let items = [];

    if (roleKey === 'admin') {
      items = [
        { id: 'dashboard-admin', icon: '🏠', label: 'Dashboard' },
        { id: 'students', icon: '🎓', label: 'Students' },
        { id: 'assessment', icon: '📝', label: 'Weekly Assessment' },
        { id: 'rankings', icon: '📊', label: 'Results & Rankings' },
        { id: 'previous-weeks', icon: '📅', label: 'Previous Weeks' },
        { id: 'committee', icon: '👥', label: 'Committee Members' },
        { id: 'reports', icon: '📑', label: 'Reports' },
        { id: 'settings', icon: '⚙️', label: 'Settings' }
      ];
    } else {
      // Committee Member View
      items = [
        { id: 'dashboard-committee', icon: '🏠', label: 'My Dashboard' },
        { id: 'assessment', icon: '📝', label: 'Enter Assessment' },
        { id: 'rankings', icon: '📊', label: 'Results & Rankings' },
        { id: 'previous-weeks', icon: '📅', label: 'Week Intervals' },
        { id: 'students', icon: '🎓', label: 'Student Directory' },
        { id: 'reports', icon: '📑', label: 'Official Reports' }
      ];
    }

    const currentView = this.store.state.currentView;

    menuContainer.innerHTML = `
      <div class="sidebar-role-badge">${this.store.state.currentUser.roleTag} PORTAL</div>
      ${items.map(item => `
        <button type="button" class="sidebar-nav-item ${currentView === item.id ? 'active' : ''}" onclick="app.navigateTo('${item.id}')">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `).join('')}
    `;
  }

  renderActiveView() {
    const roleKey = this.store.state.currentRoleKey;
    let view = this.store.state.currentView;

    if (roleKey === 'committee' && (view === 'dashboard-admin' || view === 'committee' || view === 'settings')) {
      view = 'dashboard-committee';
      this.store.state.currentView = view;
    } else if (roleKey === 'admin' && view === 'dashboard-committee') {
      view = 'dashboard-admin';
      this.store.state.currentView = view;
    }

    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));

    const targetEl = document.getElementById(`view-${view}`);
    if (targetEl) targetEl.classList.add('active');

    // Route to appropriate view
    switch (view) {
      case 'dashboard-admin':
        this.renderAdminDashboard();
        break;
      case 'dashboard-committee':
        this.renderCommitteeDashboard();
        break;
      case 'students':
        this.renderStudents();
        break;
      case 'assessment':
        this.renderAssessment();
        break;
      case 'rankings':
        this.renderRankings();
        break;
      case 'previous-weeks':
        this.renderPreviousWeeks();
        break;
      case 'committee':
        this.renderCommittee();
        break;
      case 'student-profile':
        this.renderStudentProfile();
        break;
      case 'reports':
        this.renderReports();
        break;
      case 'settings':
        this.renderSettings();
        break;
    }
  }

  // =========================================================================
  // DASHBOARD 1: ADMINISTRATOR DASHBOARD
  // =========================================================================
  renderAdminDashboard() {
    const container = document.getElementById('view-dashboard-admin');
    if (!container) return;

    this.store.syncDerivedNotifications(this.store.state);

    const weeks = this.store.state.weeks || [];
    const currentWeek = this.getActiveWeek();
    const upcomingWeek = this.getUpcomingWeek();
    const members = this.store.state.members || [];
    const allStudents = this.store.state.students || [];
    const notifications = this.store.state.notifications || [];
    const unreadCount = notifications.filter(n => n.unread).length;

    let topStudent = null;
    let topTotalScore = currentWeek ? currentWeek.totalScore : null;
    let topPercentage = currentWeek ? currentWeek.percentage : null;

    if (currentWeek) {
      if (currentWeek.topStudent) {
        topStudent = this.store.state.students.find(s => s.name === currentWeek.topStudent);
      }
      if (!topStudent) {
        const weekScores = this.store.state.scores[currentWeek.id] || {};
        let bestTotal = -1;
        Object.entries(weekScores).forEach(([sId, sc]) => {
          if (sc && typeof sc.total === 'number' && sc.total > bestTotal) {
            bestTotal = sc.total;
            topTotalScore = sc.total;
            topPercentage = sc.pct;
            const st = this.store.state.students.find(s => s.id === sId);
            if (st) topStudent = st;
          }
        });
      }
    }
    const isHidden = !!this.store.state.dashInfoHidden;

    container.innerHTML = `
      <div class="view-header view-header-with-toggle">
        <div>
          <h2>Administrator Dashboard</h2>
          <p>Welcome, ${escapeHtml(this.store.state.currentUser.name)}. Full system management, committee evaluators, and student records.</p>
        </div>
        <button type="button" class="btn-toggle-dash-info ${isHidden ? 'is-collapsed' : ''}" id="btnToggleAdminDashInfo" onclick="app.toggleDashboardInfo()" title="Toggle Dashboard Info Cards">
          <span class="dash-toggle-arrow">${isHidden ? '▼' : '▲'}</span>
          <span class="dash-toggle-text">${isHidden ? 'Show Dashboard Info' : 'Hide Dashboard Info'}</span>
        </button>
      </div>

      <div class="dashboard-info-collapsible ${isHidden ? 'is-collapsed' : ''}" id="adminDashboardInfoWrap">
        <div class="stat-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.15rem; margin-bottom: 1.5rem;">
          <div class="stat-card card-blue" style="cursor: pointer;" onclick="app.navigateTo('students')" title="Click to open Students Dashboard">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Students</span>
              <span class="stat-card-value">${allStudents.length}</span>
              <span class="stat-card-sub">Enrolled for assessment</span>
            </div>
            <div class="stat-card-icon">👥</div>
          </div>

          <div class="stat-card card-green" style="cursor: pointer; ${currentWeek && currentWeek.status === 'Closed' ? 'border: 2px solid #ef4444;' : ''}" onclick="app.openSetWeekIntervalModal(${currentWeek ? `'${currentWeek.id}'` : ''})" title="Click to Set / Configure Week Interval">
            <div class="stat-card-text">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem;">
                <span class="stat-card-title">This Week</span>
                <span style="font-size: 0.68rem; font-weight: 700; background: ${currentWeek && currentWeek.status === 'Closed' ? '#fee2e2' : 'rgba(255,255,255,0.3)'}; color: ${currentWeek && currentWeek.status === 'Closed' ? '#991b1b' : 'inherit'}; padding: 0.1rem 0.45rem; border-radius: 999px;">
                  ${currentWeek ? (currentWeek.status === 'Closed' ? '🔒 Closed' : '🟢 Open') : '⚙️ Set'}
                </span>
              </div>
              <span class="stat-card-value" style="font-size: 1.45rem;">${currentWeek ? escapeHtml(currentWeek.name) : 'No Week Set'}</span>
              <span class="stat-card-sub">${currentWeek ? `(${escapeHtml(currentWeek.dateRange)})` : '(Click to set interval)'}</span>
            </div>
            <div class="stat-card-icon">📅</div>
          </div>

          <div class="stat-card card-purple" style="cursor: pointer;" onclick="app.navigateTo('committee')" title="Click to open Committee Members Directory">
            <div class="stat-card-text">
              <span class="stat-card-title">Evaluators</span>
              <span class="stat-card-value">${members.length}</span>
              <span class="stat-card-sub">Registered committee</span>
            </div>
            <div class="stat-card-icon">🛡️</div>
          </div>

          <div class="stat-card card-blue" style="cursor: pointer;" onclick="app.openAddClassModal()" title="Click to manage classes">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Classes</span>
              <span class="stat-card-value">${this.store.state.classes.length}</span>
              <span class="stat-card-sub">Academic cohorts</span>
            </div>
            <div class="stat-card-icon">🎓</div>
          </div>

          <div class="stat-card card-orange">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Houses</span>
              <span class="stat-card-value">${this.store.state.houses.length}</span>
              <span class="stat-card-sub">School houses</span>
            </div>
            <div class="stat-card-icon">🏠</div>
          </div>
        </div>

        <!-- Student Personality of the Week Spotlight Card -->
        <div class="dashboard-winner-card">
          <div class="dashboard-winner-card-header">
            <div class="winner-card-heading">
              <span class="trophy-icon">🏆</span>
              <span>Student Personality of the Week</span>
            </div>
            ${currentWeek ? `<span class="winner-card-week-tag">(${escapeHtml(currentWeek.name)})${currentWeek.status === 'Closed' ? ' • Sealed' : ''}</span>` : ''}
          </div>

          ${topStudent ? `
            <div class="dashboard-winner-body">
              <div class="dashboard-winner-left">
                <div class="winner-avatar-circle">👤</div>
                <div class="winner-info-text">
                  <h3>${escapeHtml(topStudent.name)}</h3>
                  <p>${escapeHtml(topStudent.class)} | ${escapeHtml(topStudent.house)}</p>
                </div>
              </div>

              <div class="dashboard-winner-scores">
                <div class="winner-score-block">
                  <div class="winner-score-label">Total Score</div>
                  <div class="winner-score-value">${topTotalScore || 0} / ${currentWeek.maxScore || this.getMaxCriteriaScore()}</div>
                </div>

                <div class="winner-score-block">
                  <div class="winner-score-label">Percentage</div>
                  <div class="winner-percentage-value">${topPercentage || 0}%</div>
                </div>

                <div class="winner-laurel-decor">🌿</div>
              </div>
            </div>
          ` : `
            <div class="dashboard-winner-body" style="padding: 1.5rem; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
              <div style="font-size: 2rem;">🌟</div>
              <h4 style="margin: 0; color: var(--text-main); font-size: 1.05rem;">No Winner Announced Yet ${currentWeek ? `for ${escapeHtml(currentWeek.name)}` : ''}</h4>
              <p style="margin: 0; font-size: 0.85rem; max-width: 440px;">Weekly assessments are awaiting evaluation submissions. As scores are entered by committee members, the top-performing student will be celebrated here.</p>
            </div>
          `}
        </div>

        <!-- Upcoming Assessment Cycle Info Card (Admin) -->
        ${upcomingWeek ? `
          <div class="upcoming-assessment-card" style="margin-top: 1.25rem; background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1.5px solid #bfdbfe; border-radius: var(--radius-lg); padding: 1.15rem 1.35rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.9rem;">
              <div style="width: 48px; height: 48px; border-radius: 12px; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);">
                ⏳
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #2563eb;">Upcoming Assessment Cycle</span>
                  <span class="status-badge-upcoming">⏳ Scheduled for Next Assessment</span>
                </div>
                <div style="font-size: 1.12rem; font-weight: 800; color: var(--navy-primary); margin-top: 0.15rem;">
                  ${escapeHtml(upcomingWeek.name)} &nbsp;•&nbsp; <span style="font-weight: 600; font-size: 0.96rem; color: #334155;">${escapeHtml(upcomingWeek.dateRange)}</span>
                </div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.15rem;">
                  Scheduled for next evaluation round. Active cycle <strong>(${escapeHtml(currentWeek ? currentWeek.name : 'None')})</strong> remains open for scoring until you activate this upcoming week.
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn-navy-action" style="background: #2563eb; color: #fff; height: 36px; padding: 0 1rem; font-size: 0.82rem;" onclick="app.activateUpcomingWeek('${upcomingWeek.id}')">
                🚀 Activate Now (Make Active)
              </button>
              <button type="button" class="btn-navy-action" style="background: #e2e8f0; color: #1e293b; height: 36px; padding: 0 0.85rem; font-size: 0.82rem;" onclick="app.openSetWeekIntervalModal('${upcomingWeek.id}')">
                ✏️ Edit Schedule
              </button>
            </div>
          </div>
        ` : `
          <div class="upcoming-assessment-card" style="margin-top: 1.25rem; background: var(--bg-card); border: 1.5px dashed #cbd5e1; border-radius: var(--radius-lg); padding: 1rem 1.35rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <div style="width: 42px; height: 42px; border-radius: 10px; background: #f1f5f9; color: #64748b; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                ⏳
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.92rem; color: var(--navy-primary);">
                  Next Assessment Cycle: <span style="color: var(--text-muted); font-weight: normal;">Not Scheduled</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">
                  Schedule the upcoming week interval in advance so committee members know what cycle is next.
                </div>
              </div>
            </div>
            <button type="button" class="btn-demo-pill" style="border: 1.5px solid #3b82f6; color: #1d4ed8; font-weight: 700; background: #eff6ff; padding: 0.45rem 0.9rem;" onclick="app.scheduleNextWeekInterval()">
              + Schedule Next Week Interval
            </button>
          </div>
        `}
      </div>

      <div class="quick-actions-section">
        <div class="section-title">Quick Actions</div>
        <div class="quick-actions-grid">
          <div class="quick-action-card" onclick="app.openSetWeekIntervalModal(${currentWeek ? `'${currentWeek.id}'` : ''})">
            <div class="quick-action-icon">📅</div>
            <div class="quick-action-label">Set Week Interval</div>
          </div>

          <div class="quick-action-card" onclick="app.scheduleNextWeekInterval()">
            <div class="quick-action-icon">⏳</div>
            <div class="quick-action-label">${upcomingWeek ? `Next: ${escapeHtml(upcomingWeek.name)}` : 'Schedule Next Week'}</div>
          </div>

          ${currentWeek ? `
            <div class="quick-action-card" onclick="app.quickToggleWeekStatus('${currentWeek.id}')" style="border: 1.5px solid ${currentWeek.status === 'Closed' ? '#86efac' : '#fca5a5'};">
              <div class="quick-action-icon">${currentWeek.status === 'Closed' ? '🔓' : '🔒'}</div>
              <div class="quick-action-label" style="font-weight: 800; color: ${currentWeek.status === 'Closed' ? '#15803d' : '#991b1b'};">
                ${currentWeek.status === 'Closed' ? 'Re-Open Scoring' : 'Close Scoring (Seal)'}
              </div>
            </div>
          ` : ''}

          <div class="quick-action-card" onclick="app.navigateTo('assessment')">
            <div class="quick-action-icon">✏️</div>
            <div class="quick-action-label">${currentWeek && currentWeek.status === 'Closed' ? 'View Scores (Sealed)' : `Enter Scores ${currentWeek ? `(${escapeHtml(currentWeek.name)})` : ''}`}</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('rankings')">
            <div class="quick-action-icon">📊</div>
            <div class="quick-action-label">View Rankings</div>
          </div>

          <div class="quick-action-card" onclick="app.openAddStudentModal()">
            <div class="quick-action-icon">👤➕</div>
            <div class="quick-action-label">Add Student</div>
          </div>

          <div class="quick-action-card" onclick="app.openAddMemberModal()">
            <div class="quick-action-icon">👥➕</div>
            <div class="quick-action-label">Add Committee Member</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('reports')">
            <div class="quick-action-icon">📥</div>
            <div class="quick-action-label">Export Report</div>
          </div>
        </div>
      </div>

      <!-- =========================================================================
           ADMIN DASHBOARD: NOTIFICATIONS & ACTIVITY ALERTS
           ========================================================================= -->
      <div class="scoring-table-card" style="margin-top: 1.5rem; padding: 0; overflow: hidden;" id="adminDashboardNotificationsSection">
        <div class="scoring-table-title" style="padding: 1.1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-bottom: 1px solid #e2e8f0;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-size: 1.25rem;">🔔</span>
              <span style="font-weight: 800; font-size: 1.05rem; color: var(--navy-primary);">Notifications</span>
              <span style="background: ${unreadCount > 0 ? '#dbeafe' : '#f1f5f9'}; color: ${unreadCount > 0 ? '#1d4ed8' : 'var(--navy-primary)'}; font-size: 0.75rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px;">
                ${unreadCount > 0 ? `${unreadCount} Unread` : `${notifications.length} Notification${notifications.length === 1 ? '' : 's'}`}
              </span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
              Real-time alerts for committee member registrations, score submissions, and assessment updates.
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            ${unreadCount > 0 ? `
              <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.78rem; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe;" onclick="app.markAllNotificationsRead()">
                ✓ Mark All Read
              </button>
            ` : ''}
            ${notifications.length > 0 ? `
              <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.78rem; background: #f1f5f9; color: #475569;" onclick="app.clearAllNotifications()">
                🗑️ Clear Notifications
              </button>
            ` : ''}
          </div>
        </div>

        <div style="padding: 0.85rem 1.25rem; display: flex; flex-direction: column; gap: 0.65rem;">
          ${notifications.length === 0 ? `
            <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
              <div style="font-size: 1.85rem; margin-bottom: 0.35rem;">🔕</div>
              <div style="font-weight: 700; color: var(--navy-primary); margin-bottom: 0.2rem;">No Notifications Right Now</div>
              <div style="font-size: 0.82rem; max-width: 420px; margin: 0 auto;">
                New committee member registrations, student evaluations, and interval updates will appear here automatically.
              </div>
            </div>
          ` : notifications.map(n => {
            const bgMap = {
              member: { bg: '#ecfdf5', border: '#a7f3d0', iconBg: '#059669' },
              score: { bg: '#eff6ff', border: '#bfdbfe', iconBg: '#2563eb' },
              student: { bg: '#f8fafc', border: '#cbd5e1', iconBg: '#0c2340' },
              interval: { bg: '#fefce8', border: '#fde047', iconBg: '#ca8a04' }
            };
            const palette = bgMap[n.type] || bgMap.score;
            return `
              <div class="admin-notification-item" style="display: flex; align-items: center; justify-content: space-between; gap: 0.9rem; padding: 0.85rem 1rem; border-radius: 10px; background: ${n.unread ? palette.bg : 'var(--bg-card)'}; border: 1px solid ${n.unread ? palette.border : '#e2e8f0'}; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 0.8rem; flex: 1; min-width: 220px;">
                  <div style="width: 38px; height: 38px; border-radius: 10px; background: ${palette.iconBg}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                    ${n.icon || '🔔'}
                  </div>
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                      <span style="font-weight: 800; font-size: 0.9rem; color: var(--navy-primary);">${escapeHtml(n.title)}</span>
                      ${n.unread ? `<span style="background: #2563eb; color: #fff; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.45rem; border-radius: 999px; text-transform: uppercase;">New</span>` : ''}
                    </div>
                    <div style="font-size: 0.81rem; color: #475569; margin-top: 0.15rem;">
                      ${escapeHtml(n.message)}
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.45rem;">
                  ${n.actionView ? `
                    <button type="button" class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.76rem;" onclick="app.openNotificationTarget('${escapeHtml(n.id)}', '${escapeHtml(n.actionView)}')">
                      ${escapeHtml(n.actionLabel || 'View ➜')}
                    </button>
                  ` : ''}
                  <button type="button" class="action-icon-btn" title="Dismiss Notification" onclick="app.dismissNotification('${escapeHtml(n.id)}')" style="width: 28px; height: 28px; font-size: 0.75rem;">
                    ✕
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  addNotification({ id, type = 'info', icon = '🔔', title, message, actionLabel = '', actionView = '' }) {
    if (!Array.isArray(this.store.state.notifications)) {
      this.store.state.notifications = [];
    }
    if (!Array.isArray(this.store.state.dismissedNotificationIds)) {
      this.store.state.dismissedNotificationIds = [];
    }
    const notifId = id || `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    this.store.state.dismissedNotificationIds = this.store.state.dismissedNotificationIds.filter(d => d !== notifId);
    this.store.state.notifications = this.store.state.notifications.filter(n => n && n.id !== notifId);
    this.store.state.notifications.unshift({
      id: notifId,
      type,
      icon,
      title,
      message,
      actionLabel,
      actionView,
      unread: true,
      createdAt: new Date().toISOString()
    });
  }

  openNotificationTarget(notifId, targetView) {
    if (Array.isArray(this.store.state.notifications)) {
      const item = this.store.state.notifications.find(n => n && n.id === notifId);
      if (item) item.unread = false;
    }
    this.store.save();
    if (targetView) {
      this.navigateTo(targetView);
    } else {
      this.render();
    }
  }

  dismissNotification(notifId) {
    if (!notifId) return;
    if (!Array.isArray(this.store.state.dismissedNotificationIds)) {
      this.store.state.dismissedNotificationIds = [];
    }
    if (!this.store.state.dismissedNotificationIds.includes(notifId)) {
      this.store.state.dismissedNotificationIds.push(notifId);
    }
    if (Array.isArray(this.store.state.notifications)) {
      this.store.state.notifications = this.store.state.notifications.filter(n => n && n.id !== notifId);
    }
    this.store.save();
    this.render();
  }

  markAllNotificationsRead() {
    if (Array.isArray(this.store.state.notifications)) {
      this.store.state.notifications.forEach(n => {
        if (n) n.unread = false;
      });
    }
    this.store.save();
    this.render();
    this.showToast('✓ All notifications marked as read.');
  }

  clearAllNotifications() {
    if (!Array.isArray(this.store.state.dismissedNotificationIds)) {
      this.store.state.dismissedNotificationIds = [];
    }
    if (Array.isArray(this.store.state.notifications)) {
      this.store.state.notifications.forEach(n => {
        if (n && n.id && !this.store.state.dismissedNotificationIds.includes(n.id)) {
          this.store.state.dismissedNotificationIds.push(n.id);
        }
      });
      this.store.state.notifications = [];
    }
    this.store.save();
    this.render();
    this.showToast('🗑️ Cleared all notifications.');
  }

  // =========================================================================
  // DASHBOARD 2: COMMITTEE MEMBER DASHBOARD
  // =========================================================================
  renderCommitteeDashboard() {
    const container = document.getElementById('view-dashboard-committee');
    if (!container) return;

    const weeks = this.store.state.weeks || [];
    const activeWeek = this.getActiveWeek();
    const upcomingWeek = this.getUpcomingWeek();
    let currentWeek = null;
    if (this.store.state.selectedWeekId) {
      currentWeek = weeks.find(w => w.id === this.store.state.selectedWeekId);
    }
    if (!currentWeek) {
      currentWeek = activeWeek || weeks[0] || null;
      if (currentWeek) this.store.state.selectedWeekId = currentWeek.id;
    }

    const allStudents = this.store.state.students || [];
    const weekScores = (currentWeek && this.store.state.scores[currentWeek.id]) || {};
    const weekLabel = currentWeek ? currentWeek.name : 'No Interval Set';
    const weekDateRange = currentWeek ? currentWeek.dateRange : 'Interval not configured';
    const weekStatus = currentWeek ? (currentWeek.status || 'Open') : 'Pending';

    const evaluatedStudents = allStudents.filter(s => {
      const sScores = weekScores[s.id];
      return !!sScores && typeof sScores.total === 'number';
    });
    const evaluatedCount = evaluatedStudents.length;
    const totalAssigned = allStudents.length;
    const pendingStudents = allStudents.filter(s => {
      const sScores = weekScores[s.id];
      return !sScores || typeof sScores.total !== 'number';
    });
    const pendingCount = pendingStudents.length;
    const completionPct = totalAssigned > 0 ? Math.round((evaluatedCount / totalAssigned) * 100) : 0;
    const isHidden = !!this.store.state.dashInfoHidden;

    const isWeekClosed = currentWeek && currentWeek.status === 'Closed';
    const isWeekUpcoming = currentWeek && currentWeek.status === 'Upcoming';

    container.innerHTML = `
      <div class="view-header view-header-with-toggle">
        <div>
          <h2>Committee Member Dashboard</h2>
          <p>Logged in as <strong>${escapeHtml(this.store.state.currentUser.name)}</strong> (${escapeHtml(this.store.state.currentUser.title)})</p>
        </div>
        <button type="button" class="btn-toggle-dash-info ${isHidden ? 'is-collapsed' : ''}" id="btnToggleCommitteeDashInfo" onclick="app.toggleDashboardInfo()" title="Toggle Dashboard Info Cards">
          <span class="dash-toggle-arrow">${isHidden ? '▼' : '▲'}</span>
          <span class="dash-toggle-text">${isHidden ? 'Show Dashboard Info' : 'Hide Dashboard Info'}</span>
        </button>
      </div>

      ${isWeekClosed ? `
        <!-- Prominent Closed Scoring Notification Banner for Committee Members -->
        <div class="scoring-locked-banner" style="background: #fef2f2; border: 1.5px solid #f87171; border-radius: var(--radius-md); padding: 0.9rem 1.15rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span style="font-size: 1.45rem;">🔒</span>
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; color: #991b1b;">
                Scoring Closed (Results Sealed by Administrator)
              </div>
              <div style="font-size: 0.82rem; color: #7f1d1d; margin-top: 0.15rem;">
                The administrator has closed scoring for <strong>${escapeHtml(currentWeek.name)} (${escapeHtml(currentWeek.dateRange)})</strong>. All evaluation forms are sealed and cannot be modified.
              </div>
            </div>
          </div>
          <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.76rem; background: #991b1b; color: #fff;" onclick="app.navigateTo('rankings')">
            🏆 View Sealed Rankings
          </button>
        </div>
      ` : ''}

      <!-- Prominent Active Assessment Interval Banner for Committee Members -->
      <div class="evaluator-banner" style="margin-bottom: 1.25rem;">
        <div class="evaluator-banner-left">
          <div class="evaluator-avatar" style="background: ${isWeekClosed ? '#991b1b' : (isWeekUpcoming ? '#2563eb' : 'var(--stat-green)')}; font-size: 1.25rem;">${isWeekClosed ? '🔒' : (isWeekUpcoming ? '⏳' : '📅')}</div>
          <div>
            <div style="font-weight: 800; font-size: 1.02rem; color: var(--navy-primary); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span>Assessment Interval: <strong>${currentWeek ? escapeHtml(currentWeek.name) : 'No Active Interval'}</strong></span>
              ${currentWeek ? `
                <span class="${currentWeek.status === 'Closed' ? 'status-badge-closed' : (currentWeek.status === 'Upcoming' ? 'status-badge-upcoming' : 'status-badge-active')}" style="font-size: 0.72rem; padding: 0.15rem 0.55rem; ${currentWeek.status === 'Closed' ? 'background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;' : ''}">
                  ● ${currentWeek.status === 'Closed' ? '🔒 Closed (Results Sealed)' : (currentWeek.status === 'Upcoming' ? '⏳ Upcoming (Scheduled)' : '🟢 Open for Scoring')}
                </span>
                ${currentWeek.isCurrent ? '<span style="font-size: 0.68rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 0.15rem 0.45rem; border-radius: 999px;">★ Current Cycle</span>' : ''}
              ` : `
                <span style="font-size: 0.72rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 0.15rem 0.55rem; border-radius: 999px;">
                  ⚠️ Awaiting Admin Interval Setup
                </span>
              `}
            </div>
            <div style="font-size: 0.84rem; color: var(--text-muted); margin-top: 0.15rem;">
              ${currentWeek ? `🗓️ Dates: <strong>${escapeHtml(currentWeek.dateRange)}</strong>` : 'No scoring intervals have been configured by administrators yet.'}
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
          ${weeks.length > 0 ? `
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <label for="committeeDashWeekSelect" style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); white-space: nowrap;">Interval:</label>
              <select id="committeeDashWeekSelect" class="form-select" style="font-size: 0.82rem; height: 34px; min-width: 170px;" onchange="app.changeCommitteeDashboardWeek(this.value)">
                ${weeks.map(w => {
                  let tag = '';
                  if (w.status === 'Closed') tag = ' [🔒 Closed]';
                  else if (w.status === 'Upcoming') tag = ' [⏳ Upcoming]';
                  else if (w.isCurrent) tag = ' [🟢 Active ★]';
                  return `<option value="${w.id}" ${currentWeek && w.id === currentWeek.id ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})${tag}</option>`;
                }).join('')}
              </select>
            </div>
          ` : ''}
          <button type="button" class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem; ${isWeekClosed ? 'background: #64748b;' : ''}" onclick="app.navigateTo('assessment')">
            ${isWeekClosed ? '👁️ View Sealed Scores' : (isWeekUpcoming ? '👁️ Preview Criteria' : '📝 Enter Scores')}
          </button>
          <button type="button" class="btn-navy-action" style="background: #e2e8f0; color: #1e293b; height: 34px; padding: 0 0.75rem; font-size: 0.78rem;" onclick="app.navigateTo('previous-weeks')">
            📅 View All Intervals
          </button>
        </div>
      </div>

      ${upcomingWeek ? `
        <!-- Prominent Upcoming Assessment Cycle Notice for Committee Members -->
        <div class="upcoming-assessment-card" style="margin-bottom: 1.25rem; background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%); border: 1.5px solid #bfdbfe; border-radius: var(--radius-md); padding: 0.95rem 1.15rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.45rem;">⏳</span>
            <div>
              <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #1e40af;">
                  Upcoming Assessment Cycle: <strong>${escapeHtml(upcomingWeek.name)} (${escapeHtml(upcomingWeek.dateRange)})</strong>
                </span>
                <span class="status-badge-upcoming">Scheduled for Next Cycle</span>
              </div>
              <div style="font-size: 0.78rem; color: #1e3a8a; margin-top: 0.15rem;">
                Scheduled for next evaluation round. Evaluations will open once activated by the administrator. Current active interval (${escapeHtml(activeWeek ? activeWeek.name : 'Active')}) is open for submissions.
              </div>
            </div>
          </div>
          <button type="button" class="btn-demo-pill" style="border: 1px solid #93c5fa; color: #1e40af; height: 30px; font-size: 0.76rem; background: #fff;" onclick="app.previewUpcomingWeek('${upcomingWeek.id}')">
            🔍 Preview Next Schedule
          </button>
        </div>
      ` : ''}

      <div class="dashboard-info-collapsible ${isHidden ? 'is-collapsed' : ''}" id="committeeDashboardInfoWrap">
        <!-- Committee Progress Hero Banner -->
        <div class="committee-progress-hero">
          <div class="committee-progress-text">
            <h3>Assessment Quorum: ${escapeHtml(weekLabel)} Cycle ${currentWeek ? `(${escapeHtml(weekDateRange)})` : ''}</h3>
            <p>${totalAssigned > 0 
              ? `You have evaluated <strong>${evaluatedCount} of ${totalAssigned} assigned students</strong> for ${escapeHtml(weekLabel)}.` 
              : `No students have been enrolled in the assessment database yet.`}</p>
          </div>
          <div class="committee-progress-ring-block">
            <div class="committee-progress-pct">${completionPct}%</div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
              Completed<br><span style="color: var(--stat-green);">${totalAssigned > 0 && pendingCount === 0 ? 'All Completed' : `${pendingCount} Remaining`}</span>
            </div>
          </div>
        </div>

        <div class="stat-cards-grid">
          <!-- Card 1: Active Week Interval matching Admin Dashboard -->
          <div class="stat-card card-green" style="cursor: pointer;" onclick="app.navigateTo('previous-weeks')" title="Click to view all weekly scoring intervals">
            <div class="stat-card-text">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem;">
                <span class="stat-card-title">This Week</span>
                <span style="font-size: 0.68rem; font-weight: 700; background: rgba(255,255,255,0.3); padding: 0.1rem 0.45rem; border-radius: 999px;">
                  ${currentWeek ? (currentWeek.status === 'Closed' ? 'Closed' : 'Open') : 'Pending'}
                </span>
              </div>
              <span class="stat-card-value" style="font-size: 1.45rem;">${currentWeek ? escapeHtml(currentWeek.name) : 'No Week Set'}</span>
              <span class="stat-card-sub">${currentWeek ? `(${escapeHtml(currentWeek.dateRange)})` : '(Awaiting admin setup)'}</span>
            </div>
            <div class="stat-card-icon">📅</div>
          </div>

          <!-- Card 2: Assigned Students -->
          <div class="stat-card card-blue">
            <div class="stat-card-text">
              <span class="stat-card-title">Assigned Students</span>
              <span class="stat-card-value">${totalAssigned}</span>
              <span class="stat-card-sub">In evaluation queue</span>
            </div>
            <div class="stat-card-icon">📋</div>
          </div>

          <!-- Card 3: Evaluated Students -->
          <div class="stat-card card-green">
            <div class="stat-card-text">
              <span class="stat-card-title">Evaluated</span>
              <span class="stat-card-value">${evaluatedCount}</span>
              <span class="stat-card-sub">${completionPct}% completed</span>
            </div>
            <div class="stat-card-icon">✓</div>
          </div>

          <!-- Card 4: Pending Students -->
          <div class="stat-card card-orange">
            <div class="stat-card-text">
              <span class="stat-card-title">Pending</span>
              <span class="stat-card-value">${pendingCount}</span>
              <span class="stat-card-sub">${pendingCount === 0 && totalAssigned > 0 ? 'All caught up!' : 'Awaiting grading'}</span>
            </div>
            <div class="stat-card-icon">⏳</div>
          </div>
        </div>
      </div>

      <!-- Next Pending Nominees to Assess -->
      <div class="scoring-table-card">
        <div class="scoring-table-title">
          <span>Pending Student Evaluations for ${escapeHtml(weekLabel)} ${currentWeek ? `(${escapeHtml(weekDateRange)})` : ''}</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.navigateTo('assessment')">
              Open Full Rubric ➜
            </button>
          </div>
        </div>

        <table class="table-standard">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>House</th>
              <th>Status</th>
              <th style="text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${totalAssigned === 0 ? `
              <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                  <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📋</div>
                  No students currently enrolled in the system.<br>
                  <small>Students added by administrators will automatically appear here for evaluation.</small>
                </td>
              </tr>
            ` : (pendingStudents.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--stat-green);">
                  <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎉</div>
                  <strong>All caught up!</strong> All ${totalAssigned} students have been evaluated for ${escapeHtml(weekLabel)}.
                </td>
              </tr>
            ` : pendingStudents.map(s => `
              <tr>
                <td><strong>${escapeHtml(s.id)}</strong></td>
                <td>${escapeHtml(s.name)}</td>
                <td>${escapeHtml(s.class)}</td>
                <td>${escapeHtml(s.house)}</td>
                <td><span class="status-badge-pending">Pending</span></td>
                <td style="text-align: center;">
                  ${isWeekClosed ? `
                    <button class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.75rem; background: #94a3b8; cursor: not-allowed; opacity: 0.75;" disabled title="Scoring closed by administrator">
                      🔒 Closed
                    </button>
                  ` : `
                    <button class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.75rem;" onclick="app.startStudentAssessment('${s.id}')">
                      Assess ➜
                    </button>
                  `}
                </td>
              </tr>
            `).join(''))}
          </tbody>
        </table>
      </div>
    `;
  }

  changeCommitteeDashboardWeek(weekId) {
    if (!weekId) return;
    this.store.state.selectedWeekId = weekId;
    this.store.save();
    this.render();
  }

  startStudentAssessment(studentId) {
    this.scoreStudentFromQueue(studentId);
  }

  scoreStudentFromQueue(studentId) {
    const student = this.store.state.students.find(s => s.id === studentId);
    if (student) {
      this.store.state.selectedClass = student.class;
      this.store.state.selectedStudentId = student.id;
    } else {
      this.store.state.selectedStudentId = studentId;
    }
    this.store.save();
    this.navigateTo('assessment');
  }

  scoreStudent(studentId) {
    this.scoreStudentFromQueue(studentId);
  }

  evaluateAsMember(memberId) {
    const member = this.store.state.members.find(m => m.id === memberId);
    if (!member) return;
    this.store.state.selectedEvaluatorId = member.id;
    this.store.save();
    this.showToast(`Switched active evaluator to ${member.name}`);
    this.navigateTo('assessment');
  }



  // =========================================================================
  // ROLE SWITCHER MODAL (DISABLED - STRICT DASHBOARD SEPARATION)
  // =========================================================================
  openRoleSwitcherModal() {
    const modal = document.getElementById('modalRoleSwitcher');
    if (modal) modal.classList.remove('active');
    return;
  }

  // Common Views
  renderStudents() {
    const container = document.getElementById('view-students');
    if (!container) return;

    this.store.normalizeStudentsAndClasses(this.store.state);

    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const allStudents = this.store.state.students || [];
    const currentWeek = this.getActiveWeek();
    const allClasses = this.store.state.classes || [];
    const allHouses = this.store.state.houses || [];

    let students = [...allStudents];
    const query = (this.store.state.studentSearchQuery || '').toLowerCase().trim();
    const classFilter = this.store.state.studentClassFilter || 'All Classes';
    const houseFilter = this.store.state.studentHouseFilter || 'All Houses';

    if (query) {
      students = students.filter(s =>
        (s.name || '').toLowerCase().includes(query) ||
        (s.id || '').toLowerCase().includes(query) ||
        (s.class || '').toLowerCase().includes(query) ||
        (s.house || '').toLowerCase().includes(query)
      );
    }

    if (classFilter !== 'All Classes') {
      students = students.filter(s => s.class === classFilter);
    }

    if (houseFilter !== 'All Houses') {
      students = students.filter(s => (s.house || '').toLowerCase().includes(houseFilter.toLowerCase()));
    }

    const hasActiveFilter = !!query || classFilter !== 'All Classes' || houseFilter !== 'All Houses';

    container.innerHTML = `
      <div class="view-header">
        <h2>Students Dashboard</h2>
        <p>${isCurrentlyAdmin
          ? 'Add, edit, evaluate or view all enrolled student records across all classes and houses.'
          : 'View enrolled student records and enter weekly personality evaluations.'}</p>
      </div>

      <!-- =========================================================================
           STUDENTS DASHBOARD: ALL ENROLLED STUDENTS DIRECTORY
           ========================================================================= -->
      <div class="scoring-table-card" style="padding: 0; overflow: hidden;" id="studentsDirectorySection">
        <div class="scoring-table-title" style="padding: 1.15rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.85rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-size: 1.25rem;">🎓</span>
              <span style="font-weight: 800; font-size: 1.05rem; color: var(--navy-primary);">All Enrolled Students Directory</span>
              <span id="studentsDirectoryCountBadge" style="background: #f1f5f9; color: var(--navy-primary); font-size: 0.75rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px;">
                ${hasActiveFilter ? `${students.length} of ${allStudents.length} Students` : `${allStudents.length} Student${allStudents.length === 1 ? '' : 's'}`}
              </span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
              Directory of all added students across all classes and houses at Our Lady of Grace SHS.
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <input type="text" id="studentSearchInput" class="form-input"
              placeholder="🔍 Search students..."
              value="${escapeHtml(this.store.state.studentSearchQuery || '')}"
              style="height: 32px; font-size: 0.78rem; width: 175px; padding: 0 0.65rem;" />

            <select id="studentClassFilterSelect" class="form-select" style="height: 32px; font-size: 0.78rem; max-width: 140px; padding: 0 1.6rem 0 0.55rem;">
              <option value="All Classes">All Classes</option>
              ${allClasses.map(c => `<option value="${escapeHtml(c)}" ${c === classFilter ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
            </select>

            <select id="studentHouseFilterSelect" class="form-select" style="height: 32px; font-size: 0.78rem; max-width: 140px; padding: 0 1.6rem 0 0.55rem;">
              <option value="All Houses">All Houses</option>
              ${allHouses.map(h => `<option value="${escapeHtml(h)}" ${houseFilter === h ? 'selected' : ''}>${escapeHtml(h)}</option>`).join('')}
            </select>

            ${isCurrentlyAdmin ? `
              <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.openAddStudentModal()">
                👤 + Add Student
              </button>

              <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.78rem; background: #334155;" onclick="app.openAddClassModal()">
                🏫 Classes (${allClasses.length})
              </button>
            ` : ''}
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th style="width: 50px;">No.</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>House</th>
                <th>Gender</th>
                <th>${currentWeek ? escapeHtml(currentWeek.name) : 'Weekly'} Status</th>
                <th style="text-align: center; width: 150px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${students.length === 0 ? `
                <tr>
                  <td colspan="8" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 0.4rem;">👥</div>
                    <div style="font-weight: 700; color: var(--navy-primary); margin-bottom: 0.25rem;">
                      ${allStudents.length === 0 ? 'No Students Enrolled Yet' : 'No Matching Students Found'}
                    </div>
                    <div style="font-size: 0.82rem; max-width: 420px; margin: 0 auto 0.85rem;">
                      ${allStudents.length === 0
                        ? (isCurrentlyAdmin ? 'Add students to the database to begin weekly personality evaluations.' : 'Students added by the administrator will appear here.')
                        : 'Try clearing your search or class/house filter to see all enrolled students.'}
                    </div>
                    ${allStudents.length === 0 ? (isCurrentlyAdmin ? `
                      <button type="button" class="btn-navy-action" style="font-size: 0.8rem; padding: 0 1.25rem;" onclick="app.openAddStudentModal()">
                        👤 + Add First Student
                      </button>
                    ` : '') : `
                      <button type="button" class="btn-navy-action" style="font-size: 0.8rem; padding: 0 1.25rem;" onclick="app.navigateTo('students')">
                        Clear Filters (Show All ${allStudents.length})
                      </button>
                    `}
                  </td>
                </tr>
              ` : students.map((s, idx) => {
                const scoreData = currentWeek && this.store.state.scores[currentWeek.id] ? this.store.state.scores[currentWeek.id][s.id] : null;
                const isEvaluated = scoreData && typeof scoreData.total === 'number';
                return `
                  <tr class="student-directory-row">
                    <td>${idx + 1}</td>
                    <td><strong>${escapeHtml(s.id)}</strong></td>
                    <td>
                      <a href="javascript:void(0)" onclick="app.navigateTo('student-profile', { studentId: '${s.id}' })" style="font-weight: 700; color: var(--navy-primary);">
                        ${escapeHtml(s.name)}
                      </a>
                    </td>
                    <td>${escapeHtml(s.class)}</td>
                    <td>${escapeHtml(s.house)}</td>
                    <td>${escapeHtml(s.gender || '—')}</td>
                    <td>
                      ${isEvaluated ? `
                        <span class="status-badge-active" style="font-size: 0.72rem;">
                          ✓ Scored: <strong>${scoreData.total}/${currentWeek.maxScore || this.getMaxCriteriaScore()}</strong> (${scoreData.pct}%)
                        </span>
                        ${scoreData.evaluatorName ? `<div style="font-size: 0.7rem; color: #64748b; margin-top: 0.15rem;">by ${escapeHtml(scoreData.evaluatorName)}</div>` : ''}
                      ` : `
                        <span class="status-badge-pending" style="font-size: 0.72rem;">
                          ⏳ Pending Scoring
                        </span>
                      `}
                    </td>
                    <td style="text-align: center;">
                      <div style="display: inline-flex; gap: 0.35rem; align-items: center; justify-content: center;">
                        <button type="button" class="action-icon-btn" title="View Profile" onclick="app.navigateTo('student-profile', { studentId: '${s.id}' })">
                          👁️
                        </button>
                        ${isCurrentlyAdmin ? `
                          <button type="button" class="action-icon-btn" title="Edit Student" onclick="app.openEditStudentModal('${s.id}')">
                            ✏️
                          </button>
                        ` : ''}
                        <button type="button" class="action-icon-btn" title="Enter Scores for Student" onclick="app.scoreStudent('${s.id}')" style="color: #1d4ed8; background: #eff6ff;">
                          📝
                        </button>
                        ${isCurrentlyAdmin ? `
                          <button type="button" class="action-icon-btn delete" title="Delete Student" onclick="app.deleteStudent('${s.id}')">
                            🗑️
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="pagination-container">
          <span>Showing ${students.length > 0 ? '1' : '0'} – ${students.length} of ${allStudents.length} students</span>
          <div class="pagination-pages">
            <button class="page-btn active">1</button>
          </div>
        </div>
      </div>
    `;

    const searchInput = document.getElementById('studentSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const cursorPos = e.target.selectionStart;
        this.store.state.studentSearchQuery = e.target.value;
        this.renderStudents();
        const refreshedInput = document.getElementById('studentSearchInput');
        if (refreshedInput) {
          refreshedInput.focus();
          if (typeof cursorPos === 'number') {
            try { refreshedInput.setSelectionRange(cursorPos, cursorPos); } catch (_) {}
          }
        }
      });
    }

    const classF = document.getElementById('studentClassFilterSelect');
    if (classF) {
      classF.addEventListener('change', (e) => {
        this.store.state.studentClassFilter = e.target.value;
        this.renderStudents();
      });
    }

    const houseF = document.getElementById('studentHouseFilterSelect');
    if (houseF) {
      houseF.addEventListener('change', (e) => {
        this.store.state.studentHouseFilter = e.target.value;
        this.renderStudents();
      });
    }
  }

  renderAssessment() {
    const container = document.getElementById('view-assessment');
    if (!container) return;

    const weeks = this.store.state.weeks || [];
    const classes = this.store.state.classes || [];
    const members = this.store.state.members || [];
    const currentWeekId = this.store.state.selectedWeekId || (weeks[0] ? weeks[0].id : null);
    const currentClass = this.store.state.selectedClass || 'All Classes';
    const currentStudentId = this.store.state.selectedStudentId;
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const isCommitteeUser = this.store.state.currentRoleKey === 'committee';
    const currentUser = this.store.state.currentUser;

    let currentEvaluatorId = this.store.state.selectedEvaluatorId;
    if (isCommitteeUser && currentUser && currentUser.id) {
      currentEvaluatorId = currentUser.id;
      this.store.state.selectedEvaluatorId = currentEvaluatorId;
    } else if (!currentEvaluatorId && members.length > 0) {
      currentEvaluatorId = members[0].id;
      this.store.state.selectedEvaluatorId = currentEvaluatorId;
    }

    let evaluator = members.find(m => m.id === currentEvaluatorId);
    if (!evaluator && currentUser && (currentUser.id === currentEvaluatorId || isCommitteeUser)) {
      evaluator = {
        id: currentUser.id || 'committee-default',
        name: currentUser.name || 'Committee Member',
        role: currentUser.title || currentUser.roleTag || 'Evaluator',
        username: currentUser.username || 'committee',
        status: 'Active'
      };
    }
    if (!evaluator) {
      evaluator = members[0] || { id: 'committee-default', name: 'Committee Member', role: 'Evaluator', username: 'committee' };
    }

    const currentWeekObj = (currentWeekId ? weeks.find(w => w.id === currentWeekId) : null) || weeks.find(w => w.isCurrent) || weeks[0] || null;
    const isWeekClosed = currentWeekObj && currentWeekObj.status === 'Closed';
    const isWeekUpcoming = currentWeekObj && currentWeekObj.status === 'Upcoming';
    const isScoringLocked = isWeekClosed || isWeekUpcoming;

    const classStudents = (currentClass === 'All Classes' || !currentClass)
      ? this.store.state.students
      : this.store.state.students.filter(s => s.class === currentClass);
    let selectedStudent = (currentStudentId ? this.store.state.students.find(s => s.id === currentStudentId) : null) || classStudents[0] || null;

    const weekScores = currentWeekId ? (this.store.state.scores[currentWeekId] || {}) : {};
    const studentScoreData = selectedStudent ? (weekScores[selectedStudent.id] || {}) : {};
    const criteria = (this.store.state.criteria && this.store.state.criteria.length > 0) ? this.store.state.criteria : CRITERIA_LIST;
    const maxTotalScore = this.getMaxCriteriaScore();

    container.innerHTML = `
      <div class="view-header">
        <h2>Enter Weekly Assessment Scores</h2>
        <p>Select the week interval, class, evaluator and student to enter scores.</p>
      </div>

      ${isWeekClosed ? `
        <!-- Prominent Admin Closed Scoring Enforcement Notice -->
        <div class="scoring-locked-banner" style="background: #fef2f2; border: 1.5px solid #f87171; border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.6rem;">🔒</span>
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; color: #991b1b;">
                Scoring is Closed (Results Sealed by Administrator)
              </div>
              <div style="font-size: 0.82rem; color: #7f1d1d; margin-top: 0.15rem;">
                The assessment window for <strong>${escapeHtml(currentWeekObj.name)} (${escapeHtml(currentWeekObj.dateRange)})</strong> has ended. Committee member scoring is locked. Scores are in Read-Only view.
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button type="button" class="btn-navy-action" style="background: #991b1b; color: #fff; height: 32px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.navigateTo('rankings')">
              🏆 View Sealed Rankings
            </button>
            ${isCurrentlyAdmin ? `
              <button type="button" class="btn-demo-pill" style="border: 1px solid #dc2626; color: #991b1b; height: 32px; background: #fff;" onclick="app.quickToggleWeekStatus('${currentWeekObj.id}')">
                🔓 Re-Open Scoring
              </button>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${isWeekUpcoming ? `
        <!-- Prominent Upcoming Week Interval Notice -->
        <div class="scoring-locked-banner" style="background: #eff6ff; border: 1.5px solid #60a5fa; border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.6rem;">⏳</span>
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; color: #1e40af;">
                Upcoming Assessment Cycle: ${escapeHtml(currentWeekObj.name)} (${escapeHtml(currentWeekObj.dateRange)})
              </div>
              <div style="font-size: 0.82rem; color: #1e3a8a; margin-top: 0.15rem;">
                This interval is scheduled for the upcoming evaluation cycle. Scoring will open once activated by the administrator.
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            ${isCurrentlyAdmin ? `
              <button type="button" class="btn-navy-action" style="background: #2563eb; color: #fff; height: 32px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.activateUpcomingWeek('${currentWeekObj.id}')">
                🚀 Activate for Scoring Now
              </button>
            ` : ''}
            <button type="button" class="btn-demo-pill" style="border: 1px solid #93c5fa; color: #1e40af; height: 32px; background: #fff;" onclick="app.switchToActiveWeek()">
              Switch to Active Week
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Interactive Evaluator & Week Interval Status Banner -->
      <div class="evaluator-banner">
        <div class="evaluator-banner-left">
          <div class="evaluator-avatar">${evaluator.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM'}</div>
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; color: var(--navy-primary);">
              Scoring as: ${escapeHtml(evaluator.name)}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              ${escapeHtml(evaluator.role)} • <span style="color: var(--stat-green); font-weight: 700;">● Active Evaluator Panel</span>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          ${currentWeekObj ? `
            <span style="font-size: 0.8rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill);">
              📅 ${escapeHtml(currentWeekObj.name)} (${escapeHtml(currentWeekObj.dateRange)})
            </span>
            <span style="font-size: 0.8rem; font-weight: 700; background: ${isWeekClosed ? '#fee2e2' : (isWeekUpcoming ? '#eff6ff' : '#dcfce7')}; color: ${isWeekClosed ? '#991b1b' : (isWeekUpcoming ? '#1d4ed8' : '#15803d')}; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill); border: 1px solid ${isWeekClosed ? '#fca5a5' : (isWeekUpcoming ? '#bfdbfe' : '#86efac')};">
              ${isWeekClosed ? '🔒 Closed (Results Sealed)' : (isWeekUpcoming ? '⏳ Upcoming (Scheduled)' : '🟢 Open for Scoring')}
            </span>
            ${isCurrentlyAdmin ? `<button type="button" class="btn-demo-pill" style="border: 1px solid var(--accent-gold); color: var(--navy-primary);" onclick="app.openSetWeekIntervalModal('${currentWeekObj.id}')">⚙️ Set Interval</button>` : ''}
          ` : `
            <span style="font-size: 0.8rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill);">
              📅 No Active Week Interval Set
            </span>
            ${isCurrentlyAdmin ? `<button type="button" class="btn-demo-pill" style="border: 1px solid var(--accent-gold); color: var(--navy-primary);" onclick="app.openSetWeekIntervalModal()">➕ Create Week Interval</button>` : ''}
          `}
        </div>
      </div>

      <div class="assessment-filter-card">
        <div class="filter-field">
          <label>Week Interval</label>
          <select id="assessWeekSelect" class="form-select">
            ${weeks.length === 0 ? '<option value="">No week intervals created yet</option>' : weeks.map(w => {
              let label = `${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})`;
              if (w.status === 'Closed') label += ' [🔒 Closed]';
              else if (w.status === 'Upcoming') label += ' [⏳ Upcoming]';
              else if (w.isCurrent) label += ' [🟢 Active ★]';
              return `<option value="${w.id}" ${w.id === currentWeekId ? 'selected' : ''}>${label}</option>`;
            }).join('')}
          </select>
        </div>

        <div class="filter-field">
          <label>Class</label>
          <select id="assessClassSelect" class="form-select">
            <option value="All Classes" ${currentClass === 'All Classes' ? 'selected' : ''}>All Classes (${this.store.state.students.length})</option>
            ${classes.map(c => `<option value="${c}" ${c === currentClass ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>

        <!-- Interactive Committee Evaluator Field -->
        <div class="filter-field">
          <label>Committee Evaluator</label>
          ${isCurrentlyAdmin ? `
            <select id="assessMemberSelect" class="form-select" style="font-weight: 600;">
              ${members.length === 0 ? `
                <option value="${evaluator.id}">
                  👤 ${escapeHtml(evaluator.name)} (${escapeHtml(evaluator.role)})
                </option>
              ` : members.map(m => `
                <option value="${m.id}" ${m.id === currentEvaluatorId ? 'selected' : ''}>
                  👤 ${escapeHtml(m.name)} (${escapeHtml(m.role)})
                </option>
              `).join('')}
            </select>
          ` : `
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--navy-primary); padding: 0.45rem 0.75rem; background: #f0fdf4; border: 1px solid #86efac; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 0.5rem; height: 38px;">
              <span>👤</span>
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(evaluator.name)} (${escapeHtml(evaluator.role)})</span>
              <span style="font-size: 0.7rem; color: #15803d; font-weight: 800; margin-left: auto; white-space: nowrap;">● Active</span>
            </div>
          `}
        </div>

        <div class="filter-field">
          <label>Student</label>
          <select id="assessStudentSelect" class="form-select">
            ${classStudents.length === 0 ? `
              <option value="">-- No Students in ${escapeHtml(currentClass)} --</option>
            ` : classStudents.map(s => `
              <option value="${s.id}" ${selectedStudent && s.id === selectedStudent.id ? 'selected' : ''}>
                ${escapeHtml(s.name)} (${s.id})
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <button type="button" class="btn-navy-action" id="btnLoadStudentScores" ${!selectedStudent ? 'disabled' : ''}>
            Load Student
          </button>
        </div>
      </div>

      ${selectedStudent ? `
        <div class="scoring-table-card">
            <div class="scoring-table-title">
            <span>Assessment Criteria (Each / 10) — Evaluating: <strong>${escapeHtml(selectedStudent.name)}</strong> (${escapeHtml(selectedStudent.class)}, ${escapeHtml(selectedStudent.house)})</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">Max Total: ${maxTotalScore} Points</span>
          </div>

          <form id="formSubmitWeeklyScores">
            <table class="table-standard">
              <thead>
                <tr>
                  <th style="width: 70px;">No.</th>
                  <th>Criteria</th>
                  <th style="width: 160px; text-align: center;">Score (0-10)</th>
                </tr>
              </thead>
              <tbody>
                ${criteria.map(c => {
                  const val = typeof studentScoreData[c.id] === 'number' ? studentScoreData[c.id] : 0;
                  return `
                    <tr>
                      <td><strong>${c.no}</strong></td>
                      <td><strong>${escapeHtml(c.name)}</strong></td>
                      <td style="text-align: center;">
                        <input type="number" 
                          min="0" max="10" 
                          value="${val}" 
                          class="score-input-number criteria-score-input" 
                          data-crit-id="${c.id}" 
                          ${isScoringLocked ? 'disabled readonly style="background: #f1f5f9; cursor: not-allowed; opacity: 0.85; font-weight: 700;"' : ''} 
                          required />
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>

            <div class="scoring-summary-bar">
              <div class="scoring-tally-text">
                Live Total: <strong id="liveTotalDisplay">${studentScoreData.total || 0} / ${maxTotalScore}</strong> &nbsp;•&nbsp; 
                Percentage: <strong id="livePctDisplay" style="color: var(--accent-gold);">${studentScoreData.pct || 0}%</strong>
                ${isWeekClosed ? '<span style="color: #991b1b; font-weight: 800; margin-left: 0.5rem;">🔒 Sealed</span>' : ''}
              </div>

              ${isScoringLocked ? `
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <span style="font-size: 0.8rem; color: ${isWeekClosed ? '#991b1b' : '#2563eb'}; font-weight: 700;">
                    ${isWeekClosed ? '● Scoring Closed by Admin' : '● Scheduled for Upcoming Cycle'}
                  </span>
                  <button type="button" class="btn-navy-action" disabled style="padding: 0 1.5rem; background: #94a3b8; cursor: not-allowed; opacity: 0.65;">
                    ${isWeekClosed ? '🔒 Scoring Locked' : '⏳ Scoring Scheduled'}
                  </button>
                </div>
              ` : `
                <button type="submit" class="btn-navy-action" style="padding: 0 2rem;">
                  Submit Scores
                </button>
              `}
            </div>
          </form>
        </div>
      ` : `
        <div class="scoring-table-card" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">👥</div>
          <h3 style="color: var(--navy-primary); margin-bottom: 0.5rem;">No Students Found in ${escapeHtml(currentClass)}</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.25rem;">
            There are currently no students registered in this class. You can add new students using the button below or pick another class from the filter above.
          </p>
          <button type="button" class="btn-navy-action" onclick="app.openAddStudentModal()">
            + Add Student to Database
          </button>
        </div>
      `}
    `;

    const inputs = container.querySelectorAll('.criteria-score-input');
    const updateLiveTotals = () => {
      let total = 0;
      inputs.forEach(inp => {
        const v = parseInt(inp.value, 10);
        if (!isNaN(v)) total += Math.max(0, Math.min(10, v));
      });
      const pct = ((total / maxTotalScore) * 100).toFixed(1);
      const totalDisplay = document.getElementById('liveTotalDisplay');
      const pctDisplay = document.getElementById('livePctDisplay');
      if (totalDisplay) totalDisplay.textContent = `${total} / ${maxTotalScore}`;
      if (pctDisplay) pctDisplay.textContent = `${pct}%`;
    };

    inputs.forEach(inp => inp.addEventListener('input', updateLiveTotals));

    const classSelect = document.getElementById('assessClassSelect');
    if (classSelect) {
      classSelect.addEventListener('change', (e) => {
        this.store.state.selectedClass = e.target.value;
        const matching = e.target.value === 'All Classes'
          ? this.store.state.students
          : this.store.state.students.filter(s => s.class === e.target.value);
        this.store.state.selectedStudentId = matching.length > 0 ? matching[0].id : null;
        this.renderAssessment();
      });
    }

    const memberSelect = document.getElementById('assessMemberSelect');
    if (memberSelect) {
      memberSelect.addEventListener('change', (e) => {
        this.store.state.selectedEvaluatorId = e.target.value;
        const mem = this.store.state.members.find(m => m.id === e.target.value);
        this.renderAssessment();
        if (mem) this.showToast(`Switched evaluator to ${mem.name}`);
      });
    }

    const weekSelect = document.getElementById('assessWeekSelect');
    if (weekSelect) {
      weekSelect.addEventListener('change', (e) => {
        this.store.state.selectedWeekId = e.target.value;
        this.renderAssessment();
      });
    }

    const studentSelect = document.getElementById('assessStudentSelect');
    const btnLoad = document.getElementById('btnLoadStudentScores');
    if (btnLoad && studentSelect) {
      btnLoad.addEventListener('click', () => {
        if (!studentSelect.value) return;
        this.store.state.selectedStudentId = studentSelect.value;
        const st = this.store.state.students.find(s => s.id === studentSelect.value);
        this.renderAssessment();
        if (st) this.showToast(`Loaded ${st.name}`);
      });
    }

    const formSubmit = document.getElementById('formSubmitWeeklyScores');
    if (formSubmit && selectedStudent) {
      formSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isScoringLocked) {
          if (isWeekClosed) {
            alert(`Scoring for ${currentWeekObj.name} has been closed by the Administrator. Evaluations cannot be submitted or changed.`);
          } else {
            alert(`${currentWeekObj.name} is scheduled as an Upcoming cycle. Scoring will open once activated by the Administrator.`);
          }
          return;
        }
        const scoresObj = {};
        let total = 0;
        inputs.forEach(inp => {
          const cId = inp.dataset.critId;
          const val = parseInt(inp.value, 10) || 0;
          scoresObj[cId] = val;
          total += val;
        });
        const pct = Number(((total / maxTotalScore) * 100).toFixed(1));

        if (!this.store.state.scores[currentWeekId]) this.store.state.scores[currentWeekId] = {};
        this.store.state.scores[currentWeekId][selectedStudent.id] = {
          ...scoresObj,
          total,
          pct,
          evaluatorId: evaluator.id,
          evaluatorName: evaluator.name,
          evaluatorRole: evaluator.role,
          evaluatorUsername: evaluator.username,
          submittedAt: new Date().toISOString()
        };

        this.recalculateWeekResults(currentWeekId);
        this.addNotification({
          id: `notif-score-${currentWeekId}-${selectedStudent.id}`,
          type: 'score',
          icon: '📝',
          title: `Assessment Scores Submitted (${currentWeekObj ? currentWeekObj.name : 'Weekly'})`,
          message: `${evaluator.name} submitted scores for ${selectedStudent.name} (${selectedStudent.class}): ${total}/${maxTotalScore} (${pct}%).`,
          actionLabel: 'View Rankings ➜',
          actionView: 'rankings'
        });
        this.store.save();
        this.showToast(`✓ Scores submitted for ${selectedStudent.name} by ${evaluator.name}: ${total}/${maxTotalScore} (${pct}%)`);
        this.renderAssessment();
      });
    }
  }

  renderRankings() {
    const container = document.getElementById('view-rankings');
    if (!container) return;

    const weeks = this.store.state.weeks || [];
    const classes = this.store.state.classes || [];
    const currentWeekId = this.store.state.selectedWeekId || (weeks[0] ? weeks[0].id : null);
    const currentClass = this.store.state.selectedClass || 'All';
    const weekScores = currentWeekId ? (this.store.state.scores[currentWeekId] || {}) : {};
    const rankedStudents = [];

    let targetStudents = [...this.store.state.students];
    if (currentClass && currentClass !== 'All') {
      targetStudents = targetStudents.filter(s => s.class === currentClass);
    }

    targetStudents.forEach(s => {
      const sc = weekScores[s.id];
      if (sc && typeof sc.total === 'number') {
        rankedStudents.push({ student: s, totalScore: sc.total, percentage: sc.pct });
      }
    });

    rankedStudents.sort((a, b) => b.totalScore - a.totalScore);
    const topWinner = rankedStudents.length > 0 ? rankedStudents[0] : null;

    container.innerHTML = `
      <div class="view-header">
        <h2>Weekly Results & Rankings</h2>
        <p>Official student performance rankings for the selected week interval.</p>
      </div>

      <div class="assessment-filter-card">
        <div class="filter-field">
          <label>Week Interval</label>
          <select id="rankingsWeekSelect" class="form-select">
            ${weeks.length === 0 ? '<option value="">No week intervals created yet</option>' : weeks.map(w => `<option value="${w.id}" ${w.id === currentWeekId ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})</option>`).join('')}
          </select>
        </div>

        <div class="filter-field">
          <label>Class</label>
          <select id="rankingsClassSelect" class="form-select">
            <option value="All" ${currentClass === 'All' ? 'selected' : ''}>All Classes</option>
            ${classes.map(c => `<option value="${c}" ${c === currentClass ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>

      ${topWinner ? `
        <div class="results-winner-banner">
          <div class="winner-banner-left">
            <div class="winner-banner-avatar">👤</div>
            <div>
              <div class="winner-banner-title">
                <span>🏆</span>
                <span>Student Personality of the Week</span>
              </div>
              <div class="winner-banner-name">${escapeHtml(topWinner.student.name)}</div>
              <div class="winner-banner-sub">${escapeHtml(topWinner.student.class)} | ${escapeHtml(topWinner.student.house)}</div>
            </div>
          </div>

          <div class="winner-banner-scores">
            <div class="banner-score-col">
              <div class="banner-score-lbl">Total Score</div>
              <div class="banner-score-val">${topWinner.totalScore} / ${currentWeekObj.maxScore || this.getMaxCriteriaScore()}</div>
            </div>

            <div class="banner-score-col">
              <div class="banner-score-lbl">Percentage</div>
              <div class="banner-score-pct">${topWinner.percentage}%</div>
            </div>
          </div>
        </div>
      ` : ''}

      <div class="scoring-table-card" style="padding: 0; overflow: hidden;">
        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th style="width: 70px; text-align: center;">Rank</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>House</th>
                <th style="text-align: center;">Total Score</th>
                <th style="text-align: center;">Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${rankedStudents.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                    No student scores recorded yet for this week interval.<br>
                    <small>Scores entered in the Assessment portal will automatically rank students here.</small>
                  </td>
                </tr>
              ` : rankedStudents.slice(0, 5).map((r, idx) => {
                const rankNum = idx + 1;
                return `
                  <tr>
                    <td style="text-align: center;">
                      <span class="rank-badge-circle rank-${rankNum}">
                        ${rankNum}
                      </span>
                    </td>
                    <td>
                      <a href="javascript:void(0)" onclick="app.navigateTo('student-profile', { studentId: '${r.student.id}' })" style="font-weight: 700; color: var(--navy-primary);">
                        ${escapeHtml(r.student.name)}
                      </a>
                    </td>
                    <td>${escapeHtml(r.student.class)}</td>
                    <td>${escapeHtml(r.student.house)}</td>
                    <td style="text-align: center; font-weight: 700;">${r.totalScore}</td>
                    <td style="text-align: center; font-weight: 700; color: ${rankNum === 1 ? '#b45309' : 'inherit'};">${r.percentage}%</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const rWeek = document.getElementById('rankingsWeekSelect');
    if (rWeek) {
      rWeek.addEventListener('change', (e) => {
        this.store.state.selectedWeekId = e.target.value;
        this.renderRankings();
      });
    }

    const rClass = document.getElementById('rankingsClassSelect');
    if (rClass) {
      rClass.addEventListener('change', (e) => {
        this.store.state.selectedClass = e.target.value;
        this.renderRankings();
      });
    }
  }

  renderPreviousWeeks() {
    const container = document.getElementById('view-previous-weeks');
    if (!container) return;

    const weeks = this.store.state.weeks;
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';

    container.innerHTML = `
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>Previous Weeks' Results</h2>
          <p>View past weekly results, scoring intervals, and official rankings.</p>
        </div>
        ${isCurrentlyAdmin ? `
          <button type="button" class="btn-navy-action" onclick="app.openSetWeekIntervalModal()">
            📅 + Set New Week Interval
          </button>
        ` : ''}
      </div>

      <div class="scoring-table-card" style="padding: 0; overflow: hidden;">
        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th>Week Interval</th>
                <th>Date Range</th>
                <th>Status</th>
                <th>Top Student</th>
                <th style="text-align: center;">Total Score</th>
                <th style="text-align: center;">Percentage</th>
                <th style="text-align: center; width: 140px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${weeks.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📅</div>
                    <strong>No week intervals configured yet.</strong><br>
                    <span style="font-size: 0.85rem;">Click "+ Set New Week Interval" above to create your first scoring cycle.</span>
                  </td>
                </tr>
              ` : weeks.map(w => `
                <tr>
                  <td>
                    <strong>${escapeHtml(w.name)}</strong>
                    ${w.isCurrent ? '<span style="font-size: 0.7rem; font-weight: 700; background: #dcfce7; color: #15803d; padding: 0.1rem 0.4rem; border-radius: 999px; margin-left: 0.35rem;">Active</span>' : ''}
                  </td>
                  <td>${escapeHtml(w.dateRange)}</td>
                  <td>
                    <span class="${w.status === 'Closed' ? 'status-badge-closed' : (w.status === 'Upcoming' ? 'status-badge-upcoming' : 'status-badge-active')}" style="font-size: 0.75rem;">
                      ${w.status === 'Closed' ? '🔒 Closed (Sealed)' : (w.status === 'Upcoming' ? '⏳ Upcoming' : '🟢 Open')}
                    </span>
                  </td>
                  <td>
                    <span style="font-weight: 700; color: var(--navy-primary);">
                      ${w.topStudent ? escapeHtml(w.topStudent) : '<span style="color: var(--text-muted); font-weight: normal;">—</span>'}
                    </span>
                  </td>
                  <td style="text-align: center; font-weight: 700;">${w.totalScore ? `${w.totalScore} / ${w.maxScore || this.getMaxCriteriaScore()}` : '—'}</td>
                  <td style="text-align: center; font-weight: 700;">${w.percentage ? `${w.percentage}%` : '—'}</td>
                  <td style="text-align: center;">
                    <div style="display: inline-flex; gap: 0.35rem; align-items: center;">
                      <button class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.75rem;" onclick="app.viewWeekDetail('${w.id}')">
                        View
                      </button>
                      ${isCurrentlyAdmin ? `
                        ${w.status === 'Upcoming' ? `
                          <button class="action-icon-btn" title="Activate this week for scoring now" style="width: 30px; height: 30px; color: #2563eb; background: #eff6ff;" onclick="app.activateUpcomingWeek('${w.id}')">
                            🚀
                          </button>
                        ` : `
                          <button class="action-icon-btn" title="${w.status === 'Closed' ? 'Re-Open Scoring' : 'Close Scoring (Seal Results)'}" style="width: 30px; height: 30px;" onclick="app.quickToggleWeekStatus('${w.id}')">
                            ${w.status === 'Closed' ? '🔓' : '🔒'}
                          </button>
                        `}
                        <button class="action-icon-btn" title="Edit Week Interval" style="width: 30px; height: 30px;" onclick="app.openSetWeekIntervalModal('${w.id}')">
                          ✏️
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  viewWeekDetail(weekId) {
    this.store.state.selectedWeekId = weekId;
    this.navigateTo('rankings');
  }

  renderCommittee() {
    const container = document.getElementById('view-committee');
    if (!container) return;

    const allMembers = this.store.state.members || [];
    const searchQuery = (this.store.state.committeeSearchQuery || '').toLowerCase().trim();
    const roleFilter = this.store.state.committeeRoleFilter || 'All';
    const statusFilter = this.store.state.committeeStatusFilter || 'All';

    let filtered = allMembers.filter(m => {
      const matchSearch = !searchQuery ||
        (m.name || '').toLowerCase().includes(searchQuery) ||
        (m.username || '').toLowerCase().includes(searchQuery) ||
        (m.role || '').toLowerCase().includes(searchQuery);

      let matchRole = true;
      if (roleFilter === 'Discipline') matchRole = (m.role || '').includes('Discipline') || (m.role || '').includes('Principal');
      else if (roleFilter === 'Teacher') matchRole = (m.role || '').includes('Teacher');
      else if (roleFilter === 'House') matchRole = (m.role || '').includes('House');
      else if (roleFilter === 'Support') matchRole = (m.role || '').includes('Parent') || (m.role || '').includes('Counselor') || (m.role || '').includes('Sports');

      let matchStatus = true;
      if (statusFilter !== 'All') matchStatus = m.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });

    const hasActiveFilter = !!searchQuery || roleFilter !== 'All' || statusFilter !== 'All';

    container.innerHTML = `
      <div class="view-header">
        <h2>Committee Members Directory</h2>
        <p>Add, edit, or manage faculty and committee members authorized to submit weekly assessments.</p>
      </div>

      <div class="scoring-table-card" style="padding: 0; overflow: hidden;" id="committeeDirectorySection">
        <div class="scoring-table-title" style="padding: 1.15rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.85rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-size: 1.25rem;">👥</span>
              <span style="font-weight: 800; font-size: 1.05rem; color: var(--navy-primary);">Registered Committee Members &amp; Evaluators</span>
              <span style="background: #e0f2fe; color: #0369a1; font-size: 0.75rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px;">
                ${hasActiveFilter ? `${filtered.length} of ${allMembers.length} Members` : `${allMembers.length} Registered Member${allMembers.length === 1 ? '' : 's'}`}
              </span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
              Official faculty and staff evaluators authorized to submit weekly student assessments.
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <input type="text" id="committeeSearchInput" class="form-input"
              placeholder="🔍 Search member..."
              value="${escapeHtml(this.store.state.committeeSearchQuery || '')}"
              style="height: 32px; font-size: 0.78rem; width: 175px; padding: 0 0.65rem;" />

            <select id="committeeRoleFilterSelect" class="form-select" style="height: 32px; font-size: 0.78rem; max-width: 155px; padding: 0 1.6rem 0 0.55rem; font-weight: 600;">
              <option value="All" ${roleFilter === 'All' ? 'selected' : ''}>🎭 All Roles</option>
              <option value="Discipline" ${roleFilter === 'Discipline' ? 'selected' : ''}>🛡️ Discipline &amp; Exec</option>
              <option value="Teacher" ${roleFilter === 'Teacher' ? 'selected' : ''}>👨‍🏫 Teacher Reps</option>
              <option value="House" ${roleFilter === 'House' ? 'selected' : ''}>🏠 House Masters</option>
              <option value="Support" ${roleFilter === 'Support' ? 'selected' : ''}>🤝 Support &amp; PTA</option>
            </select>

            <select id="committeeStatusFilterSelect" class="form-select" style="height: 32px; font-size: 0.78rem; max-width: 135px; padding: 0 1.6rem 0 0.55rem; font-weight: 600;">
              <option value="All" ${statusFilter === 'All' ? 'selected' : ''}>All Status</option>
              <option value="Active" ${statusFilter === 'Active' ? 'selected' : ''}>🟢 Active</option>
              <option value="Observer" ${statusFilter === 'Observer' ? 'selected' : ''}>🟡 Observer</option>
              <option value="On Leave" ${statusFilter === 'On Leave' ? 'selected' : ''}>⚪ On Leave</option>
            </select>

            <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.openAddMemberModal()">
              👥 + Add Member
            </button>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th style="width: 50px;">No.</th>
                <th>Member / Evaluator</th>
                <th>Role / Designation</th>
                <th>Assigned Scope</th>
                <th>Username</th>
                <th>Status</th>
                <th style="text-align: center; width: 150px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 2.25rem 1rem; color: var(--text-muted);">
                    <div style="font-size: 1.85rem; margin-bottom: 0.4rem;">👥</div>
                    <div style="font-weight: 700; color: var(--navy-primary); margin-bottom: 0.25rem;">
                      ${allMembers.length === 0 ? 'No Committee Members Registered Yet' : 'No Matching Committee Members'}
                    </div>
                    <div style="font-size: 0.82rem; max-width: 420px; margin: 0 auto 0.85rem;">
                      ${allMembers.length === 0
                        ? 'Register committee evaluators so faculty members can log in, access rubric criteria, and evaluate students.'
                        : 'Try clearing your search or role/status filter to see all registered members.'}
                    </div>
                    ${allMembers.length === 0 ? `
                      <button type="button" class="btn-navy-action" style="font-size: 0.8rem; padding: 0 1.25rem;" onclick="app.openAddMemberModal()">
                        👥 + Register First Committee Member
                      </button>
                    ` : `
                      <button type="button" class="btn-navy-action" style="font-size: 0.8rem; padding: 0 1.25rem;" onclick="app.navigateTo('committee')">
                        Clear Filters (Show All ${allMembers.length})
                      </button>
                    `}
                  </td>
                </tr>
              ` : filtered.map((m, idx) => {
                const initials = (m.name || '').split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.65rem;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #059669; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.76rem; font-weight: 800; flex-shrink: 0;">
                          ${initials}
                        </div>
                        <div>
                          <div style="font-weight: 700; color: var(--navy-primary);">${escapeHtml(m.name)}</div>
                        </div>
                      </div>
                    </td>
                    <td>${escapeHtml(m.role || 'Evaluator')}</td>
                    <td><span style="font-size: 0.78rem; color: #475569;">${escapeHtml(m.scope || 'All Houses & Classes')}</span></td>
                    <td><code>${escapeHtml(m.username)}</code></td>
                    <td>
                      <span class="status-badge-${m.status === 'Active' ? 'active' : 'closed'}" style="font-size: 0.72rem;">
                        ● ${escapeHtml(m.status || 'Active')}
                      </span>
                    </td>
                    <td style="text-align: center;">
                      <div style="display: inline-flex; gap: 0.35rem; align-items: center; justify-content: center;">
                        <button type="button" class="action-icon-btn" title="Evaluate as this Member" onclick="app.evaluateAsMember('${m.id}')" style="color: #059669; background: #ecfdf5;">
                          📝
                        </button>
                        <button type="button" class="action-icon-btn" title="Edit Member" onclick="app.openEditMemberModal('${m.id}')">
                          ✏️
                        </button>
                        <button type="button" class="action-icon-btn delete" title="Delete Committee Member" onclick="app.deleteMember('${m.id}')">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const searchInp = document.getElementById('committeeSearchInput');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        const cursorPos = e.target.selectionStart;
        this.store.state.committeeSearchQuery = e.target.value;
        this.renderCommittee();
        const refreshedInput = document.getElementById('committeeSearchInput');
        if (refreshedInput) {
          refreshedInput.focus();
          if (typeof cursorPos === 'number') {
            try { refreshedInput.setSelectionRange(cursorPos, cursorPos); } catch (_) {}
          }
        }
      });
    }

    const roleF = document.getElementById('committeeRoleFilterSelect');
    if (roleF) {
      roleF.addEventListener('change', (e) => {
        this.store.state.committeeRoleFilter = e.target.value;
        this.renderCommittee();
      });
    }

    const statusF = document.getElementById('committeeStatusFilterSelect');
    if (statusF) {
      statusF.addEventListener('change', (e) => {
        this.store.state.committeeStatusFilter = e.target.value;
        this.renderCommittee();
      });
    }
  }

  deleteMember(memberId) {
    const member = this.store.state.members.find(m => m.id === memberId);
    if (!member) {
      this.showToast('Committee member not found.', 'error');
      return;
    }

    if (confirm(`Are you sure you want to remove committee member "${member.name}" (${member.role})? This will delete their evaluator credentials.`)) {
      this.store.state.members = this.store.state.members.filter(m => m.id !== memberId);
      if (this.store.state.selectedEvaluatorId === memberId) {
        this.store.state.selectedEvaluatorId = this.store.state.members.length > 0 ? this.store.state.members[0].id : null;
      }
      this.store.save();
      this.showToast(`🗑️ Removed committee member: ${member.name}`);
      this.render();
    }
  }

  renderStudentProfile() {
    const container = document.getElementById('view-student-profile');
    if (!container) return;

    const studentId = this.store.state.selectedStudentId;
    const student = (studentId ? this.store.state.students.find(s => s.id === studentId) : null) || this.store.state.students[0] || null;

    if (!student) {
      container.innerHTML = `
        <div class="breadcrumb-nav">
          <a href="javascript:void(0)" onclick="app.navigateTo('students')">Students</a> &gt; <span>Profile</span>
        </div>
        <div class="scoring-table-card" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">👤</div>
          <h3 style="color: var(--navy-primary); margin-bottom: 0.5rem;">No Student Selected</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.25rem;">
            There are currently no students registered in the system or no student has been selected.
          </p>
          <button type="button" class="btn-navy-action" onclick="app.openAddStudentModal()">
            + Add Student
          </button>
        </div>
      `;
      return;
    }

    const performanceRows = this.store.state.weeks.map(w => {
      const weekData = (this.store.state.scores[w.id] && this.store.state.scores[w.id][student.id]) || null;
      if (!weekData || typeof weekData.total !== 'number') {
        return {
          week: w.name,
          date: w.dateRange,
          score: '—',
          pct: '—',
          rankDisplay: '—'
        };
      }
      return {
        week: w.name,
        date: w.dateRange,
        score: `${weekData.total} / ${w.maxScore || this.getMaxCriteriaScore()}`,
        pct: `${weekData.pct}%`,
        rankDisplay: weekData.pct >= 90 ? '1' : (weekData.pct >= 80 ? '2' : '3')
      };
    });

    container.innerHTML = `
      <div class="breadcrumb-nav">
        <a href="javascript:void(0)" onclick="app.navigateTo('students')">Students</a> &gt; <span>${escapeHtml(student.name)}</span>
      </div>

      <div class="student-profile-grid">
        <div class="student-info-sidebar-card">
          <div class="profile-avatar-large">👤</div>
          <div class="profile-student-name">${escapeHtml(student.name)}</div>
          <div class="profile-student-id">${escapeHtml(student.id)}</div>

          <div class="profile-detail-list">
            <div class="profile-detail-row">
              <span>Class</span>
              <span>${escapeHtml(student.class)}</span>
            </div>
            <div class="profile-detail-row">
              <span>House</span>
              <span>${escapeHtml(student.house)}</span>
            </div>
            <div class="profile-detail-row">
              <span>Gender</span>
              <span>${escapeHtml(student.gender)}</span>
            </div>
          </div>

          <button class="btn-navy-action" style="width: 100%;" onclick="app.openEditStudentModal('${student.id}')">
            ✏️ Edit Student
          </button>
        </div>

        <div class="profile-performance-card">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 1rem;">Weekly Performance</h3>

          <div style="overflow-x: auto;">
            <table class="table-standard">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Date Range</th>
                  <th style="text-align: center;">Total Score</th>
                  <th style="text-align: center;">Percentage</th>
                  <th style="text-align: center;">Rank</th>
                </tr>
              </thead>
              <tbody>
                ${performanceRows.length === 0 ? `
                  <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                      No weekly assessment cycles configured yet.
                    </td>
                  </tr>
                ` : performanceRows.map(p => `
                  <tr>
                    <td><strong>${p.week}</strong></td>
                    <td>${p.date}</td>
                    <td style="text-align: center; font-weight: 700;">${p.score}</td>
                    <td style="text-align: center; font-weight: 700; color: ${p.rankDisplay === '1' ? '#b45309' : 'inherit'};">${p.pct}</td>
                    <td style="text-align: center;">
                      ${p.rankDisplay !== '—' ? `<span class="rank-badge-circle rank-${p.rankDisplay}">${p.rankDisplay}</span>` : '—'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="profile-comments-box">
            <h4>Comments</h4>
            <p>"${escapeHtml(student.comment || 'No assessment comments recorded yet.')}"</p>
          </div>
        </div>
      </div>
    `;
  }

  renderReports() {
    const container = document.getElementById('view-reports');
    if (!container) return;

    const weeks = this.store.state.weeks || [];
    const classes = this.store.state.classes || [];
    const selectedWeekId = this.store.state.selectedWeekId || (weeks[0] ? weeks[0].id : null);
    const currentWeek = (selectedWeekId ? weeks.find(w => w.id === selectedWeekId) : null) || weeks.find(w => w.isCurrent) || weeks[0] || null;
    const selectedClass = this.store.state.selectedClass || 'All';

    // Build data based on selected week and class from actual scores
    const weekScores = selectedWeekId ? (this.store.state.scores[selectedWeekId] || {}) : {};
    let studentList = [...this.store.state.students];
    if (selectedClass && selectedClass !== 'All') {
      studentList = studentList.filter(s => s.class === selectedClass);
    }

    const reportStudents = studentList
      .filter(s => weekScores[s.id] && typeof weekScores[s.id].total === 'number')
      .map(s => {
        const sc = weekScores[s.id];
        return {
          id: s.id,
          name: s.name,
          class: s.class,
          house: s.house,
          score: sc.total,
          pct: sc.pct + '%'
        };
      });

    // Sort descending by score
    reportStudents.sort((a, b) => b.score - a.score);

    container.innerHTML = `
      <!-- Web-only Header and Controls (Hidden from Print) -->
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>Export & Print Report</h2>
          <p>Generate, download, and print official weekly assessment certificates.</p>
        </div>

        <div class="report-action-buttons">
          <button type="button" class="btn-export-csv" onclick="app.exportCsvReport()">
            <span>📥 Export CSV</span>
          </button>
          <button type="button" class="btn-export-pdf" onclick="app.printCertificate()">
            <span>📄 Export PDF</span>
          </button>
          <button type="button" class="btn-print-report" onclick="app.printCertificate()">
            <span>🖨️ Print Certificate</span>
          </button>
        </div>
      </div>

      <!-- Web-only Filter Card (Hidden from Print) -->
      <div class="assessment-filter-card" style="margin-bottom: 2rem;">
        <div class="filter-field">
          <label>Week Interval</label>
          <select id="reportWeekSelect" class="form-select">
            ${weeks.length === 0 ? '<option value="">No week intervals created yet</option>' : weeks.map(w => `<option value="${w.id}" ${w.id === selectedWeekId ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})</option>`).join('')}
          </select>
        </div>

        <div class="filter-field">
          <label>Class</label>
          <select id="reportClassSelect" class="form-select">
            <option value="All" ${selectedClass === 'All' ? 'selected' : ''}>All Classes</option>
            ${classes.map(c => `<option value="${c}" ${c === selectedClass ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Formal Official Certificate Sheet (Guaranteed Perfect Print) -->
      <div class="report-sheet-preview" id="printableCertificate">
        <div class="report-crest-header">
          <div class="report-crest-img">
            <img src="olag_logo.png" alt="Our Lady of Grace Senior High School Official Logo" />
          </div>
          <div class="report-school-title">OUR LADY OF GRACE SENIOR HIGH SCHOOL</div>
          <div class="report-assessment-title">Student Personality of the Week ${currentWeek ? `— ${escapeHtml(currentWeek.name)} (${escapeHtml(currentWeek.dateRange)})` : ''}</div>
          <div style="font-size: 0.8rem; font-weight: 700; color: #64748b; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.35rem;">Knowledge • Morality • Service</div>
        </div>

        <div style="overflow-x: auto; width: 100%;">
          <table class="table-standard">
            <thead>
              <tr>
                <th style="width: 65px; text-align: center;">RANK</th>
                <th>STUDENT NAME</th>
                <th>CLASS</th>
                <th>HOUSE</th>
                <th style="text-align: center; width: 120px;">TOTAL SCORE</th>
                <th style="text-align: center; width: 120px;">PERCENTAGE</th>
              </tr>
            </thead>
            <tbody>
              ${reportStudents.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 2.5rem; color: #64748b;">
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📋</div>
                    No official student scores recorded for ${currentWeek ? escapeHtml(currentWeek.name) : 'this cycle'} yet.<br>
                    <small>Once scores are submitted in the Assessment portal, certificates will generate automatically.</small>
                  </td>
                </tr>
              ` : reportStudents.slice(0, 5).map((s, idx) => `
                <tr>
                  <td style="text-align: center; font-weight: 800;">${idx + 1}</td>
                  <td><strong style="color: var(--navy-primary);">${escapeHtml(s.name)}</strong></td>
                  <td>${escapeHtml(s.class)}</td>
                  <td>${escapeHtml(s.house)}</td>
                  <td style="text-align: center; font-weight: 800;">${s.score}</td>
                  <td style="text-align: center; font-weight: 800; color: ${idx === 0 ? '#b45309' : 'inherit'};">${s.pct}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="report-slogans-footer">
          KNOWLEDGE • MORALITY • SERVICE
        </div>
      </div>
    `;

    // Dynamic Filter Change Listeners
    const weekSel = document.getElementById('reportWeekSelect');
    if (weekSel) {
      weekSel.addEventListener('change', (e) => {
        this.store.state.selectedWeekId = e.target.value;
        this.renderReports();
      });
    }

    const classSel = document.getElementById('reportClassSelect');
    if (classSel) {
      classSel.addEventListener('change', (e) => {
        this.store.state.selectedClass = e.target.value;
        this.renderReports();
      });
    }
  }

  printCertificate() {
    window.print();
  }

  exportCsvReport() {
    const selectedWeekId = this.store.state.selectedWeekId || (this.store.state.weeks[0] ? this.store.state.weeks[0].id : null);
    const currentWeek = (selectedWeekId ? this.store.state.weeks.find(w => w.id === selectedWeekId) : null) || this.store.state.weeks[0] || { name: 'Week' };
    const selectedClass = this.store.state.selectedClass || 'All';
    const weekScores = selectedWeekId ? (this.store.state.scores[selectedWeekId] || {}) : {};

    let studentList = [...this.store.state.students];
    if (selectedClass && selectedClass !== 'All') {
      studentList = studentList.filter(s => s.class === selectedClass);
    }

    const reportStudents = studentList
      .filter(s => weekScores[s.id] && typeof weekScores[s.id].total === 'number')
      .map(s => {
        const sc = weekScores[s.id];
        return {
          name: s.name,
          class: s.class,
          house: s.house,
          score: sc.total,
          pct: sc.pct + '%'
        };
      });

    reportStudents.sort((a, b) => b.score - a.score);

    if (reportStudents.length === 0) {
      this.showToast('No student scores to export for this week interval yet.');
      return;
    }

    const headers = ['Rank', 'Student Name', 'Class', 'House', 'Total Score', 'Percentage'];
    const rows = reportStudents.map((s, idx) => [
      String(idx + 1),
      `"${s.name.replace(/"/g, '""')}"`,
      s.class,
      s.house,
      String(s.score),
      s.pct
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const safeWeekName = ((currentWeek && currentWeek.name) || 'Week').replace(/\s+/g, '_');
    link.setAttribute('download', `OLAG_SHS_SPOT_${safeWeekName}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('CSV report exported successfully!');
  }

  renderSettings() {
    const container = document.getElementById('view-settings');
    if (!container) return;

    const dbConfig = this.store.getDbConfig();

    container.innerHTML = `
      <div class="view-header">
        <h2>System Settings</h2>
        <p>Configure academic year, houses, classes, criteria, database synchronization, and system preferences.</p>
      </div>

      <div class="stat-cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); margin-bottom: 2rem;">
        <!-- Cloud Database Configuration Card -->
        <div class="scoring-table-card" style="border: 1.5px solid ${dbConfig.connected ? (this.store.tableNeedsSetup ? '#fde68a' : '#86efac') : 'var(--card-border)'};">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.3rem;">⚡</span>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin: 0;">Cloud Database (Supabase)</h3>
            </div>
            <span class="status-badge-${dbConfig.connected ? (this.store.tableNeedsSetup ? 'pending' : 'active') : 'pending'}" style="font-size: 0.72rem; padding: 0.15rem 0.55rem; ${this.store.tableNeedsSetup ? 'background: #fef3c7; color: #92400e; border: 1px solid #fde68a;' : ''}">
              ${dbConfig.connected ? (this.store.tableNeedsSetup ? '🟡 SQL Setup Pending' : '🟢 Connected Live') : '⚪ Local Storage Mode'}
            </span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.85rem; line-height: 1.45;">
            ${dbConfig.connected 
              ? (this.store.tableNeedsSetup 
                  ? `Connected to <code>${escapeHtml(dbConfig.url)}</code>.<br><span style="color: #b45309; font-weight: 700;">⚠️ Tables need to be created in Supabase. Click "Open SQL Editor" below, paste the schema, and click Run.</span>`
                  : `Connected to <code>${escapeHtml(dbConfig.url)}</code>.<br><span style="font-size: 0.78rem;">Last synchronized: <strong>${dbConfig.lastSyncedAt ? new Date(dbConfig.lastSyncedAt).toLocaleTimeString() : 'Active'}</strong></span>`)
              : 'Connect Supabase Cloud PostgreSQL to synchronize all students, week intervals, and scores in real-time across phones, tablets, and computers.'}
          </p>

          <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
            <button type="button" class="btn-navy-action" onclick="app.openDatabaseModal()">
              ⚡ ${dbConfig.connected ? 'Database Settings' : 'Connect Database'}
            </button>
            <button type="button" class="btn-navy-action" style="background: #e2e8f0; color: #1e293b;" onclick="app.copySupabaseSchema()">
              📋 Copy SQL Schema
            </button>
            <a href="https://supabase.com/dashboard/project/${this.getSupabaseProjectRef(dbConfig.url)}/sql/new" target="_blank" rel="noopener" class="btn-navy-action" style="background: #0284c7; color: #fff; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
              🚀 Open SQL Editor
            </a>
            ${dbConfig.connected ? `
              <button type="button" class="btn-navy-action" style="background: #e0f2fe; color: #0369a1;" onclick="app.syncDatabaseNow()">
                🔄 Sync Now
              </button>
              <button type="button" class="btn-navy-action" style="background: #fee2e2; color: #991b1b;" onclick="app.disconnectDatabase()">
                Disconnect
              </button>
            ` : ''}
          </div>
        </div>

        <div class="scoring-table-card">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 0.75rem;">School Configuration</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Academic Year: <strong>2024 / 2025</strong> • Term 2</p>
          <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-dark); display: flex; flex-direction: column; gap: 0.5rem;">
            <li style="display: flex; align-items: center; justify-content: space-between;">
              <span>Total Classes: <strong>${this.store.state.classes.length} Classes</strong></span>
              <button type="button" class="btn-text-action" onclick="app.openAddClassModal()">+ Manage Classes</button>
            </li>
            <li>Houses: <strong>${this.store.state.houses.join(', ')}</strong></li>
            <li>Total Criteria: <strong>${(this.store.state.criteria || []).length} Rubric Metrics (0-10 each, ${this.getMaxCriteriaScore()} total)</strong></li>
          </ul>
        </div>

        <div class="scoring-table-card">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 0.75rem;">Appearance & Theme</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Choose between clean light mode or elegant dark mode.</p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button type="button" class="btn-navy-action" style="${this.store.state.theme === 'light' ? 'border: 2px solid var(--accent-yellow);' : 'opacity: 0.75;'}" onclick="app.setTheme('light')">
              ☀️ Light Mode
            </button>
            <button type="button" class="btn-navy-action" style="${this.store.state.theme === 'dark' ? 'border: 2px solid var(--accent-yellow);' : 'opacity: 0.75;'}" onclick="app.setTheme('dark')">
              🌙 Dark Mode
            </button>
          </div>
        </div>

        <div class="scoring-table-card">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 0.75rem;">Data Management</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Reset or backup local demonstration database.</p>
          <button class="btn-navy-action" style="background: #dc3545;" onclick="app.resetDemoData()">
            ↻ Reset to Initial Screenshot Demo Data
          </button>
        </div>
      </div>
    `;
  }

  getSupabaseProjectRef(url) {
    if (!url) return 'apygtjveliipzjbzmiyn';
    try {
      const parsed = new URL(url);
      const hostParts = parsed.hostname.split('.');
      return hostParts[0] || 'apygtjveliipzjbzmiyn';
    } catch (e) {
      return 'apygtjveliipzjbzmiyn';
    }
  }

  // --- Supabase Cloud Database Management Methods ---
  updateDatabaseStatusUI() {
    const config = this.store.getDbConfig();
    const isConn = !!config.connected && !!this.store.supabase;
    const needsSetup = !!this.store.tableNeedsSetup;
    const btn = document.getElementById('headerDbStatusBtn');
    const dot = document.getElementById('headerDbStatusDot');
    const text = document.getElementById('headerDbStatusText');

    if (dot) dot.textContent = isConn ? (needsSetup ? '🟡' : '🟢') : '⚪';
    if (text) {
      if (!isConn) {
        text.textContent = 'Local Storage';
      } else if (needsSetup) {
        text.textContent = 'DB Linked (Run SQL)';
      } else {
        text.textContent = 'Cloud Synced';
      }
    }
    if (btn) {
      if (isConn && !needsSetup) {
        btn.classList.add('connected');
        btn.classList.remove('pending-setup');
        btn.title = `Supabase Cloud Connected • Live Sync Active (${config.url})`;
      } else if (isConn && needsSetup) {
        btn.classList.add('connected');
        btn.classList.add('pending-setup');
        btn.title = `Supabase Connected (${config.url}) • Run SQL Schema to activate live sync`;
      } else {
        btn.classList.remove('connected');
        btn.classList.remove('pending-setup');
        btn.title = 'Local Storage Mode • Click to Connect Supabase Cloud Database';
      }
    }
  }

  openDatabaseModal() {
    const config = this.store.getDbConfig();
    const modal = document.getElementById('modalDatabaseConfig');
    if (!modal) return;

    const inpUrl = document.getElementById('dbInputUrl');
    const inpKey = document.getElementById('dbInputKey');
    const btnDisconnect = document.getElementById('btnDbDisconnect');
    const btnSyncNow = document.getElementById('btnDbModalSyncNow');
    const banner = document.getElementById('dbModalStatusBanner');
    const statusIcon = document.getElementById('dbModalStatusIcon');
    const statusTitle = document.getElementById('dbModalStatusTitle');
    const statusSub = document.getElementById('dbModalStatusSub');
    const btnConnect = document.getElementById('btnDbSaveConnect');

    if (inpUrl) inpUrl.value = config.url || DEFAULT_SUPABASE_CONFIG.url;
    if (inpKey) inpKey.value = config.anonKey || DEFAULT_SUPABASE_CONFIG.anonKey;

    const isConn = !!config.connected && !!this.store.supabase;
    const needsSetup = !!this.store.tableNeedsSetup;

    if (banner) {
      banner.style.background = isConn ? (needsSetup ? '#fef3c7' : '#dcfce7') : '#f8fafc';
      banner.style.borderColor = isConn ? (needsSetup ? '#fde68a' : '#86efac') : 'var(--card-border)';
    }
    if (statusIcon) statusIcon.textContent = isConn ? (needsSetup ? '⚠️' : '🟢') : '🟡';
    if (statusTitle) {
      if (!isConn) {
        statusTitle.textContent = 'Database Mode: Local Browser Storage';
        statusTitle.style.color = '#92400e';
      } else if (needsSetup) {
        statusTitle.textContent = 'Supabase Project Connected (SQL Schema Pending)';
        statusTitle.style.color = '#b45309';
      } else {
        statusTitle.textContent = 'Cloud Database Connected (Supabase)';
        statusTitle.style.color = '#166534';
      }
    }
    if (statusSub) {
      if (!isConn) {
        statusSub.textContent = 'Connect Supabase to enable live synchronization across all phones, tablets, and computers.';
        statusSub.style.color = '#78350f';
      } else if (needsSetup) {
        statusSub.innerHTML = `Project <code>${escapeHtml(config.url)}</code> is connected. Tables need to be created: Click <strong>"Open SQL Editor"</strong> below, paste the schema, and click Run.`;
        statusSub.style.color = '#92400e';
      } else {
        statusSub.textContent = `Realtime synchronization active with ${config.url}. All devices receive instant updates.`;
        statusSub.style.color = '#14532d';
      }
    }

    if (btnDisconnect) btnDisconnect.style.display = isConn ? 'inline-flex' : 'none';
    if (btnSyncNow) btnSyncNow.style.display = isConn ? 'inline-flex' : 'none';
    if (btnConnect) {
      btnConnect.innerHTML = isConn ? '<span>⚡ Re-Verify &amp; Sync</span>' : '<span>⚡ Connect &amp; Sync</span>';
    }

    modal.classList.add('active');
  }

  async handleSaveDatabaseConfig() {
    const inpUrl = document.getElementById('dbInputUrl');
    const inpKey = document.getElementById('dbInputKey');
    const url = inpUrl ? inpUrl.value.trim().replace(/\/$/, '') : '';
    const key = inpKey ? inpKey.value.trim() : '';

    if (!url || !key) {
      this.showToast('Please enter both Supabase Project URL and Anon Key.');
      return;
    }

    if (typeof window === 'undefined' || !window.supabase || !window.supabase.createClient) {
      this.showToast('Supabase client library loading... please check internet connection.');
      return;
    }

    const btnConnect = document.getElementById('btnDbSaveConnect');
    const origText = btnConnect ? btnConnect.innerHTML : '';
    if (btnConnect) {
      btnConnect.disabled = true;
      btnConnect.innerHTML = '<span>⏳ Testing Connection...</span>';
    }

    try {
      const client = window.supabase.createClient(url, key);
      const { data, error } = await client.from('spot_app_state').select('id, updated_at').limit(1);

      if (error && error.code === 'PGRST205') {
        // Table spot_app_state not found in schema cache yet
        this.store.supabase = client;
        this.store.tableNeedsSetup = true;
        this.store.saveDbConfig({
          url: url,
          anonKey: key,
          connected: true,
          lastSyncedAt: null
        });

        this.updateDatabaseStatusUI();
        this.render();

        const sqlUrl = `https://supabase.com/dashboard/project/${this.getSupabaseProjectRef(url)}/sql/new`;
        this.copySupabaseSchema();

        alert(
          "⚡ Connected to Supabase Project!\n\n" +
          "Your database credentials are valid, but the tables have not been created yet.\n\n" +
          "We have copied the SQL Schema to your clipboard.\n\n" +
          "1. Open your Supabase SQL Editor:\n" + sqlUrl + "\n\n" +
          "2. Paste the schema and click 'Run'.\n\n" +
          "Once you click Run, click 'Sync Now' in SPOT WEEK to complete live synchronization!"
        );
        return;
      } else if (error && error.code !== 'PGRST116') {
        throw new Error(error.message || 'Could not query spot_app_state table');
      }

      this.store.supabase = client;
      this.store.tableNeedsSetup = false;
      this.store.saveDbConfig({
        url: url,
        anonKey: key,
        connected: true,
        lastSyncedAt: new Date().toISOString()
      });

      this.store.subscribeToRealtime();
      await this.store.syncToSupabase(true);
      await this.store.fetchFromSupabase();

      this.showToast('✓ Successfully connected to Supabase Cloud Database! Live sync active.');
      this.closeModals();
      this.updateDatabaseStatusUI();
      this.render();
    } catch (err) {
      console.error('Supabase connection error:', err);
      alert(`Supabase Connection Failed:\n${err.message || err}\n\nTroubleshooting:\n1. Verify you ran the SQL Schema in supabase_schema.sql.\n2. Ensure Project URL is format: https://xyz.supabase.co\n3. Ensure Anon Public Key is correct.`);
    } finally {
      if (btnConnect) {
        btnConnect.disabled = false;
        btnConnect.innerHTML = origText;
      }
    }
  }

  disconnectDatabase() {
    if (confirm('Disconnect from Supabase? The application will continue working in Local Storage mode.')) {
      this.store.saveDbConfig({ url: '', anonKey: '', connected: false, lastSyncedAt: null });
      if (this.store.supabase && this.store.realtimeChannel) {
        try {
          this.store.supabase.removeChannel(this.store.realtimeChannel);
        } catch (e) {}
      }
      this.store.supabase = null;
      this.store.realtimeSubscribed = false;
      this.showToast('Disconnected from cloud database. Reverted to Local Storage mode.');
      this.closeModals();
      this.updateDatabaseStatusUI();
      this.render();
    }
  }

  async syncDatabaseNow() {
    if (!this.store.supabase) {
      this.showToast('No database connected. Please connect Supabase first.');
      return;
    }
    this.showToast('🔄 Synchronizing with Supabase Cloud...');
    await this.store.syncToSupabase(true);
    await this.store.fetchFromSupabase();
    this.updateDatabaseStatusUI();
    this.render();
    this.showToast('✓ Cloud Database sync complete!');
  }

  copySupabaseSchema() {
    const schemaSql = `-- OUR LADY OF GRACE SENIOR HIGH SCHOOL (OLAG SHS)
-- Student Personality of the Week (SPOT WEEK) Assessment System
-- Supabase Cloud Database Schema & Realtime Setup

create table if not exists public.spot_app_state (
  id text primary key default 'current',
  state jsonb not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

alter table public.spot_app_state enable row level security;
drop policy if exists "Public Read State" on public.spot_app_state;
drop policy if exists "Public Insert State" on public.spot_app_state;
drop policy if exists "Public Update State" on public.spot_app_state;

create policy "Public Read State" on public.spot_app_state for select using (true);
create policy "Public Insert State" on public.spot_app_state for insert with check (true);
create policy "Public Update State" on public.spot_app_state for update using (true);

create table if not exists public.spot_weeks (
  id text primary key,
  no integer,
  name text not null,
  date_range text,
  start_date date,
  end_date date,
  status text default 'Open',
  is_current boolean default false,
  top_student text,
  total_score numeric,
  max_score numeric default 70,
  percentage numeric,
  updated_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_weeks enable row level security;
drop policy if exists "Public Weeks Access" on public.spot_weeks;
create policy "Public Weeks Access" on public.spot_weeks for all using (true) with check (true);

create table if not exists public.spot_students (
  id text primary key,
  name text not null,
  class text not null,
  house text not null,
  created_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_students enable row level security;
drop policy if exists "Public Students Access" on public.spot_students;
create policy "Public Students Access" on public.spot_students for all using (true) with check (true);

create table if not exists public.spot_members (
  id text primary key,
  name text not null,
  role text not null,
  username text not null,
  password text,
  created_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_members enable row level security;
drop policy if exists "Public Members Access" on public.spot_members;
create policy "Public Members Access" on public.spot_members for all using (true) with check (true);

create table if not exists public.spot_scores (
  id text primary key,
  week_id text not null,
  student_id text not null,
  evaluator_id text,
  scores jsonb not null,
  total numeric not null,
  pct numeric not null,
  updated_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_scores enable row level security;
drop policy if exists "Public Scores Access" on public.spot_scores;
create policy "Public Scores Access" on public.spot_scores for all using (true) with check (true);

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_app_state') then
    alter publication supabase_realtime add table public.spot_app_state;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_weeks') then
    alter publication supabase_realtime add table public.spot_weeks;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_students') then
    alter publication supabase_realtime add table public.spot_students;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_scores') then
    alter publication supabase_realtime add table public.spot_scores;
  end if;
end $$;

insert into public.spot_app_state (id, state, updated_at)
values ('current', '{"initialized": true, "weeks": [], "students": [], "scores": {}, "members": []}'::jsonb, now())
on conflict (id) do nothing;`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(schemaSql).then(() => {
        this.showToast('✓ Supabase SQL Schema copied to clipboard! Paste into Supabase SQL Editor.');
      }).catch(() => {
        this.fallbackCopyText(schemaSql);
      });
    } else {
      this.fallbackCopyText(schemaSql);
    }
  }

  fallbackCopyText(text) {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      this.showToast('✓ Supabase SQL Schema copied to clipboard!');
    } catch (e) {
      this.showToast('Please open supabase_schema.sql file in the project.');
    }
    document.body.removeChild(area);
  }

  resetDemoData() {
    if (confirm('Reset all scores, students, and committee members to initial screenshot state?')) {
      this.store.resetAll();
      this.showToast('Data reset to default.');
      this.render();
    }
  }

  openAddStudentModal() {
    this.populateAddStudentClasses();
    const modal = document.getElementById('modalAddStudent');
    if (modal) modal.classList.add('active');
    const nameInp = document.getElementById('addStudentName');
    if (nameInp) setTimeout(() => nameInp.focus(), 120);
  }

  populateAddStudentClasses(selectedClass = null) {
    const input = document.getElementById('addStudentClass');
    if (input && selectedClass) {
      input.value = selectedClass;
    }
    const datalist = document.getElementById('existingClassesList');
    if (datalist) {
      const classes = this.store.state.classes || [];
      datalist.innerHTML = classes.map(c => `<option value="${escapeHtml(c)}"></option>`).join('');
    }
  }

  // =========================================================================
  // CLASS MANAGEMENT (ADMIN)
  // =========================================================================
  openAddClassModal(returnToModal = null) {
    this.returnToModal = returnToModal;
    const modal = document.getElementById('modalAddClass');
    if (!modal) return;

    // If opening from Add Student modal, temporarily hide Add Student so Add Class is on top
    if (returnToModal === '+ Add Student') {
      const modalAddStudent = document.getElementById('modalAddStudent');
      if (modalAddStudent) modalAddStudent.classList.remove('active');
    }

    const input = document.getElementById('newClassNameInput');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 150);
    }

    this.renderExistingClassesPills();
    modal.classList.add('active');
  }

  renderExistingClassesPills() {
    const container = document.getElementById('existingClassesPills');
    const countEl = document.getElementById('existingClassesCount');
    if (!container) return;

    const classes = this.store.state.classes || [];
    if (countEl) countEl.textContent = classes.length;

    const students = this.store.state.students || [];

    if (classes.length === 0) {
      container.innerHTML = '<div style="font-size: 0.8rem; color: #94a3b8; padding: 0.5rem;">No classes created yet.</div>';
      return;
    }

    container.innerHTML = classes.map(c => {
      const studentCount = students.filter(s => s.class === c).length;
      const canDelete = studentCount === 0;
      return `
        <div class="class-pill-badge" title="${escapeHtml(c)}: ${studentCount} enrolled student${studentCount === 1 ? '' : 's'}">
          <span>${escapeHtml(c)}</span>
          <span class="pill-count">${studentCount}</span>
          ${canDelete ? `<button type="button" class="btn-pill-del" onclick="app.deleteClass('${escapeHtml(c)}')" title="Delete empty class">🗑️</button>` : ''}
        </div>
      `;
    }).join('');
  }

  setNewClassPreset(presetName) {
    const input = document.getElementById('newClassNameInput');
    if (input) {
      input.value = presetName;
      input.focus();
    }
  }

  saveNewClass(rawName) {
    if (!rawName) return;
    const name = rawName.trim();
    if (!name) return;

    // Check duplicate (case-insensitive)
    const exists = this.store.state.classes.some(c => c.toLowerCase() === name.toLowerCase());
    if (exists) {
      this.showToast(`Class "${name}" already exists!`);
      return;
    }

    this.store.state.classes.push(name);
    this.store.save();

    const input = document.getElementById('newClassNameInput');
    if (input) input.value = '';

    this.renderExistingClassesPills();
    this.populateAddStudentClasses(name);

    if (this.returnToModal === '+ Add Student') {
      const modalAddClass = document.getElementById('modalAddClass');
      if (modalAddClass) modalAddClass.classList.remove('active');
      const modalAddStudent = document.getElementById('modalAddStudent');
      if (modalAddStudent) modalAddStudent.classList.add('active');
      this.returnToModal = null;
      this.showToast(`Class "${name}" created & selected!`);
    } else {
      this.showToast(`Class "${name}" added successfully!`);
      this.render();
    }
  }

  deleteClass(className) {
    const studentsInClass = (this.store.state.students || []).filter(s => s.class === className);
    if (studentsInClass.length > 0) {
      this.showToast(`Cannot delete "${className}" because ${studentsInClass.length} student(s) are assigned to it.`);
      return;
    }

    if (confirm(`Are you sure you want to remove empty class "${className}"?`)) {
      this.store.state.classes = this.store.state.classes.filter(c => c !== className);
      this.store.save();
      this.renderExistingClassesPills();
      this.populateAddStudentClasses();
      this.showToast(`Class "${className}" removed.`);
      this.render();
    }
  }

  openEditStudentModal(studentId) {
    const student = this.store.state.students.find(s => s.id === studentId);
    if (!student) return;

    const newName = prompt('Edit Student Name:', student.name);
    if (newName && newName.trim()) {
      student.name = newName.trim();
      const newClass = prompt('Edit Class:', student.class);
      if (newClass && newClass.trim()) {
        student.class = newClass.trim();
        if (!this.store.state.classes.includes(newClass.trim())) {
          this.store.state.classes.push(newClass.trim());
        }
      }
      const newHouse = prompt(`Edit House (${this.store.state.houses.join(', ')}):`, student.house);
      if (newHouse && newHouse.trim()) {
        student.house = newHouse.trim();
      }
      this.store.save();
      this.showToast(`Updated student ${student.name}`);
      this.render();
    }
  }

  deleteStudent(studentId) {
    if (confirm('Are you sure you want to remove this student?')) {
      this.store.state.students = this.store.state.students.filter(s => s.id !== studentId);
      this.store.state.totalStudentsCount = this.store.state.students.length;
      if (this.store.state.selectedStudentId === studentId) {
        this.store.state.selectedStudentId = this.store.state.students.length > 0 ? this.store.state.students[0].id : null;
      }
      this.store.save();
      this.showToast('Student deleted.');
      this.render();
    }
  }

  // =========================================================================
  // WEEK INTERVAL MANAGEMENT & HELPERS
  // =========================================================================
  getMaxCriteriaScore() {
    const list = (this.store && this.store.state && Array.isArray(this.store.state.criteria) && this.store.state.criteria.length > 0)
      ? this.store.state.criteria
      : CRITERIA_LIST;
    return list.reduce((sum, c) => sum + (Number(c.max) || 10), 0) || 70;
  }

  getActiveWeek() {
    const weeks = this.store.state.weeks || [];
    const current = weeks.find(w => w.isCurrent && w.status !== 'Upcoming');
    if (current) return current;
    const openWeek = weeks.find(w => w.status === 'Open');
    if (openWeek) return openWeek;
    const anyCurrent = weeks.find(w => w.isCurrent);
    if (anyCurrent) return anyCurrent;
    return weeks.find(w => w.status !== 'Upcoming') || weeks[0] || null;
  }

  getUpcomingWeek() {
    const weeks = this.store.state.weeks || [];
    return weeks.find(w => w.status === 'Upcoming') || null;
  }

  activateUpcomingWeek(weekId) {
    const week = (this.store.state.weeks || []).find(w => w.id === weekId);
    if (!week) return;

    this.store.state.weeks.forEach(w => {
      if (w.id === weekId) {
        w.isCurrent = true;
        w.status = 'Open';
      } else {
        w.isCurrent = false;
      }
    });

    this.store.state.selectedWeekId = week.id;
    this.store.save();
    this.showToast(`🚀 ${week.name} (${week.dateRange}) is now ACTIVE! Committee members can now enter scores.`, 'success');
    this.render();
  }

  scheduleNextWeekInterval() {
    this.openSetWeekIntervalModal('new');
    this.applyUpcomingPreset();
  }

  applyUpcomingPreset() {
    const nameInp = document.getElementById('weekNameInput');
    const statusSelect = document.getElementById('weekStatusSelect');
    const startInp = document.getElementById('weekStartDate');
    const endInp = document.getElementById('weekEndDate');
    const isCurrentChk = document.getElementById('weekIsCurrentCheckbox');

    const weeks = this.store.state.weeks || [];
    const activeWeek = this.getActiveWeek();
    let nextStart = null;
    let nextEnd = null;

    if (activeWeek && activeWeek.endDate) {
      const endActive = new Date(activeWeek.endDate + 'T00:00:00');
      if (!isNaN(endActive.getTime())) {
        const nextDay = new Date(endActive);
        nextDay.setDate(endActive.getDate() + 1);
        const nextWeekEnd = new Date(nextDay);
        nextWeekEnd.setDate(nextDay.getDate() + 6);
        nextStart = toYmd(nextDay);
        nextEnd = toYmd(nextWeekEnd);
      }
    }

    if (!nextStart || !nextEnd) {
      const today = new Date();
      const day = today.getDay();
      const diffToMon = (day === 0 ? -6 : 1) - day;
      const mon = new Date(today);
      mon.setDate(today.getDate() + diffToMon);
      const nextMon = new Date(mon);
      nextMon.setDate(mon.getDate() + 7);
      const nextSun = new Date(nextMon);
      nextSun.setDate(nextMon.getDate() + 6);
      nextStart = toYmd(nextMon);
      nextEnd = toYmd(nextSun);
    }

    if (startInp) startInp.value = nextStart;
    if (endInp) endInp.value = nextEnd;
    if (statusSelect) statusSelect.value = 'Upcoming';
    if (isCurrentChk) isCurrentChk.checked = false;

    if (nameInp && (!nameInp.value || nameInp.value.startsWith('Week'))) {
      let maxNum = 0;
      weeks.forEach(w => {
        const match = (w.name || '').match(/(\d+)/);
        if (match) {
          const n = parseInt(match[1], 10);
          if (n > maxNum) maxNum = n;
        }
      });
      nameInp.value = maxNum > 0 ? `Week ${maxNum + 1}` : `Week ${weeks.length + 1}`;
    }

    this.updateWeekStatusHint();
    this.updateWeekIntervalPreview();
  }

  updateWeekStatusHint() {
    const statusSelect = document.getElementById('weekStatusSelect');
    const hintEl = document.getElementById('weekStatusHint');
    if (!statusSelect || !hintEl) return;
    const val = statusSelect.value;
    if (val === 'Upcoming') {
      hintEl.innerHTML = '⏳ <strong>Upcoming:</strong> Scheduled for next assessment. Active week remains open for ongoing evaluations.';
      hintEl.style.color = '#2563eb';
    } else if (val === 'Open') {
      hintEl.innerHTML = '🟢 <strong>Open:</strong> Active for scoring. Committee members can enter and submit scores.';
      hintEl.style.color = '#15803d';
    } else if (val === 'Closed') {
      hintEl.innerHTML = '🔒 <strong>Closed:</strong> Results sealed. Scoring forms locked in read-only mode.';
      hintEl.style.color = '#b91c1c';
    }
  }

  previewUpcomingWeek(weekId) {
    const week = (this.store.state.weeks || []).find(w => w.id === weekId);
    if (!week) return;
    this.store.state.selectedWeekId = week.id;
    this.showToast(`⏳ Showing upcoming schedule for ${week.name} (${week.dateRange})`);
    this.navigateTo('assessment');
  }

  switchToActiveWeek() {
    const active = this.getActiveWeek();
    if (active) {
      this.store.state.selectedWeekId = active.id;
      this.showToast(`🟢 Switched to active assessment interval: ${active.name}`);
      this.render();
    }
  }

  openSetWeekIntervalModal(targetWeekId = null) {
    const modal = document.getElementById('modalSetWeekInterval');
    if (!modal) return;

    const select = document.getElementById('setWeekTargetSelect');
    if (select) {
      const weeks = this.store.state.weeks || [];
      select.innerHTML = `
        <option value="new">➕ + Create New Week Interval</option>
        ${weeks.map(w => `
          <option value="${w.id}">
            ${escapeHtml(w.name)} (${escapeHtml(w.dateRange)}) [${w.status || 'Open'}] ${w.isCurrent ? '★ Current' : ''}
          </option>
        `).join('')}
      `;

      let selectedId = targetWeekId || this.store.state.selectedWeekId || 'new';
      if (selectedId !== 'new' && !weeks.some(w => w.id === selectedId)) {
        selectedId = weeks.length > 0 ? weeks[0].id : 'new';
      }
      select.value = selectedId;
      this.loadWeekIntervalForm(selectedId);
    }

    modal.classList.add('active');
  }

  loadWeekIntervalForm(weekId) {
    const nameInp = document.getElementById('weekNameInput');
    const statusSelect = document.getElementById('weekStatusSelect');
    const startInp = document.getElementById('weekStartDate');
    const endInp = document.getElementById('weekEndDate');
    const isCurrentChk = document.getElementById('weekIsCurrentCheckbox');
    const btnDelete = document.getElementById('btnDeleteWeekInterval');

    if (weekId === 'new') {
      if (nameInp) nameInp.value = '';
      if (statusSelect) statusSelect.value = 'Open';
      if (startInp) startInp.value = '';
      if (endInp) endInp.value = '';
      if (isCurrentChk) isCurrentChk.checked = !this.store.state.weeks.some(w => w.isCurrent);
      if (btnDelete) btnDelete.style.display = 'none';
    } else {
      const week = (this.store.state.weeks || []).find(w => w.id === weekId);
      if (!week) {
        if (nameInp) nameInp.value = '';
        if (startInp) startInp.value = '';
        if (endInp) endInp.value = '';
        if (btnDelete) btnDelete.style.display = 'none';
        return;
      }

      if (nameInp) nameInp.value = week.name || '';
      if (statusSelect) statusSelect.value = week.status || 'Open';
      if (isCurrentChk) isCurrentChk.checked = !!week.isCurrent;
      if (startInp) startInp.value = week.startDate || '';
      if (endInp) endInp.value = week.endDate || '';
      if (btnDelete) btnDelete.style.display = 'inline-flex';
    }
    this.updateWeekStatusHint();
    this.updateWeekIntervalPreview();
  }

  applyWeekDatePreset(presetType) {
    const startInp = document.getElementById('weekStartDate');
    const endInp = document.getElementById('weekEndDate');
    if (!startInp || !endInp) return;

    const today = new Date();
    const day = today.getDay();
    const diffToMon = (day === 0 ? -6 : 1) - day;
    const mon = new Date(today);
    mon.setDate(today.getDate() + diffToMon);

    if (presetType === 'this-week') {
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      startInp.value = toYmd(mon);
      endInp.value = toYmd(sun);
    } else if (presetType === 'next-week') {
      const nextMon = new Date(mon);
      nextMon.setDate(mon.getDate() + 7);
      const nextSun = new Date(nextMon);
      nextSun.setDate(nextMon.getDate() + 6);
      startInp.value = toYmd(nextMon);
      endInp.value = toYmd(nextSun);
    } else if (presetType === 'bi-week') {
      const endBi = new Date(mon);
      endBi.setDate(mon.getDate() + 13);
      startInp.value = toYmd(mon);
      endInp.value = toYmd(endBi);
    }
    this.updateWeekIntervalPreview();
  }

  updateWeekIntervalPreview() {
    const nameInp = document.getElementById('weekNameInput');
    const startInp = document.getElementById('weekStartDate');
    const endInp = document.getElementById('weekEndDate');
    const previewEl = document.getElementById('weekIntervalPreviewText');
    if (!previewEl) return;

    const name = nameInp ? nameInp.value.trim() : '';
    const sDate = startInp ? startInp.value : '';
    const eDate = endInp ? endInp.value : '';

    if (name && sDate && eDate) {
      const formatted = formatDateRange(sDate, eDate);
      previewEl.textContent = `${name} (${formatted})`;
    } else if (name) {
      previewEl.textContent = `${name} (Select start & end dates)`;
    } else if (sDate && eDate) {
      const formatted = formatDateRange(sDate, eDate);
      previewEl.textContent = `Week (${formatted})`;
    } else {
      previewEl.textContent = 'No interval configured (Enter week name and dates)';
    }
  }

  saveWeekInterval(e) {
    e.preventDefault();
    const targetSelect = document.getElementById('setWeekTargetSelect');
    const nameInp = document.getElementById('weekNameInput');
    const statusSelect = document.getElementById('weekStatusSelect');
    const startInp = document.getElementById('weekStartDate');
    const endInp = document.getElementById('weekEndDate');
    const isCurrentChk = document.getElementById('weekIsCurrentCheckbox');

    const targetVal = targetSelect ? targetSelect.value : 'new';
    const weekName = nameInp ? nameInp.value.trim() : '';
    const status = statusSelect ? statusSelect.value : 'Open';
    const startDate = startInp ? startInp.value : '';
    const endDate = endInp ? endInp.value : '';
    let isCurrent = isCurrentChk ? isCurrentChk.checked : false;

    if (status === 'Upcoming' && !isCurrentChk.checked) {
      isCurrent = false;
    }

    if (!weekName || !startDate || !endDate) {
      this.showToast('Please fill in all week interval fields.');
      return;
    }

    const dateRange = formatDateRange(startDate, endDate);

    if (isCurrent) {
      this.store.state.weeks.forEach(w => w.isCurrent = false);
    }

    if (targetVal === 'new') {
      const newWeek = {
        id: `week-${Date.now()}`,
        no: (this.store.state.weeks || []).length + 1,
        name: weekName,
        dateRange: dateRange,
        startDate: startDate,
        endDate: endDate,
        topStudent: null,
        totalScore: null,
        maxScore: this.getMaxCriteriaScore(),
        percentage: null,
        status: status,
        isCurrent: isCurrent
      };
      this.store.state.weeks.push(newWeek);
      if (isCurrent) {
        newWeek.isCurrent = true;
        this.store.state.selectedWeekId = newWeek.id;
      } else if (status !== 'Upcoming' && (!this.store.state.weeks.some(w => w.isCurrent) || this.store.state.weeks.length === 1)) {
        newWeek.isCurrent = true;
        this.store.state.selectedWeekId = newWeek.id;
      }
      this.recalculateWeekResults(newWeek.id);
      if (status === 'Upcoming') {
        this.showToast(`⏳ Scheduled upcoming assessment cycle: ${weekName} (${dateRange})`);
      } else if (status === 'Closed') {
        this.showToast(`🔒 Created ${weekName} [CLOSED]: Scoring is sealed for all committee members.`);
      } else {
        this.showToast(`✓ Created new week interval: ${weekName} (${dateRange})`);
      }
    } else {
      const existing = (this.store.state.weeks || []).find(w => w.id === targetVal);
      if (existing) {
        existing.name = weekName;
        existing.dateRange = dateRange;
        existing.startDate = startDate;
        existing.endDate = endDate;
        existing.status = status;
        existing.isCurrent = isCurrent;
        if (isCurrent) {
          this.store.state.selectedWeekId = existing.id;
        } else if (!this.store.state.weeks.some(w => w.isCurrent) && this.store.state.weeks.length > 0) {
          const firstActive = this.store.state.weeks.find(w => w.status !== 'Upcoming') || this.store.state.weeks[0];
          firstActive.isCurrent = true;
          this.store.state.selectedWeekId = firstActive.id;
        }
        this.recalculateWeekResults(existing.id);
        if (status === 'Upcoming') {
          this.showToast(`⏳ Updated upcoming week schedule: ${weekName} (${dateRange})`);
        } else if (status === 'Closed') {
          this.showToast(`🔒 Scoring for ${weekName} is now CLOSED (Results Sealed). Committee scoring is locked.`);
        } else {
          this.showToast(`✓ Updated week interval: ${weekName} (${dateRange}) — ${status}`);
        }
      }
    }

    this.store.save();
    this.closeModals();
    this.render();
  }

  deleteSelectedWeekInterval() {
    const targetSelect = document.getElementById('setWeekTargetSelect');
    const targetVal = targetSelect ? targetSelect.value : 'new';
    if (targetVal === 'new') return;

    const week = (this.store.state.weeks || []).find(w => w.id === targetVal);
    if (!week) return;

    if (confirm(`Are you sure you want to delete "${week.name}"?`)) {
      this.store.state.weeks = this.store.state.weeks.filter(w => w.id !== targetVal);
      if (this.store.state.selectedWeekId === targetVal) {
        this.store.state.selectedWeekId = this.store.state.weeks[0] ? this.store.state.weeks[0].id : null;
      }
      if (!this.store.state.weeks.some(w => w.isCurrent) && this.store.state.weeks.length > 0) {
        this.store.state.weeks[0].isCurrent = true;
      }
      this.store.save();
      this.closeModals();
      this.showToast(`Deleted week interval: ${week.name}`);
      this.render();
    }
  }

  recalculateWeekResults(weekId) {
    if (!weekId) return;
    const week = (this.store.state.weeks || []).find(w => w.id === weekId);
    if (!week) return;
    const weekScores = this.store.state.scores[weekId] || {};
    let highestTotal = -1;
    let topStudentName = null;
    let highestPct = null;

    Object.entries(weekScores).forEach(([studentId, data]) => {
      if (data && typeof data.total === 'number') {
        if (data.total > highestTotal) {
          highestTotal = data.total;
          highestPct = data.pct;
          const s = (this.store.state.students || []).find(std => std.id === studentId);
          if (s) topStudentName = s.name;
        }
      }
    });

    if (topStudentName) {
      week.topStudent = topStudentName;
      week.totalScore = highestTotal;
      week.percentage = highestPct;
      week.maxScore = week.maxScore || this.getMaxCriteriaScore();
    }
  }

  quickToggleWeekStatus(weekId) {
    if (!weekId) return;
    const week = (this.store.state.weeks || []).find(w => w.id === weekId);
    if (!week) return;

    const newStatus = week.status === 'Closed' ? 'Open' : 'Closed';
    week.status = newStatus;
    this.recalculateWeekResults(weekId);
    this.store.save();

    if (newStatus === 'Closed') {
      this.showToast(`🔒 Scoring for ${week.name} is now CLOSED. Committee member scoring is locked.`);
    } else {
      this.showToast(`🟢 Scoring for ${week.name} is now OPEN for all committee members.`);
    }
    this.render();
  }

  // =========================================================================
  // COMMITTEE MEMBER MANAGEMENT (INTERACTIVE MODAL)
  // =========================================================================
  openAddMemberModal() {
    const modal = document.getElementById('modalAddMember');
    if (!modal) return;

    const titleEl = document.getElementById('modalAddMemberTitle');
    const editIdEl = document.getElementById('editMemberId');
    const nameInp = document.getElementById('addMemberName');
    const roleSelect = document.getElementById('addMemberRole');
    const scopeSelect = document.getElementById('addMemberScope');
    const usernameInp = document.getElementById('addMemberUsername');
    const passInp = document.getElementById('addMemberPassword');
    const statusSelect = document.getElementById('addMemberStatus');
    const btnDelete = document.getElementById('btnDeleteMember');

    if (titleEl) titleEl.textContent = '👥 + Add Committee Member';
    if (editIdEl) editIdEl.value = '';
    if (nameInp) nameInp.value = '';
    if (roleSelect) roleSelect.value = 'Teacher Rep (SHS 2)';
    if (scopeSelect) scopeSelect.value = 'All Houses & Classes';
    if (usernameInp) usernameInp.value = '';
    if (passInp) passInp.value = '';
    if (statusSelect) statusSelect.value = 'Active';
    if (btnDelete) btnDelete.style.display = 'none';

    this.updateMemberPreview();
    modal.classList.add('active');
  }

  openEditMemberModal(memberId) {
    const modal = document.getElementById('modalAddMember');
    if (!modal) return;

    const member = this.store.state.members.find(m => m.id === memberId);
    if (!member) return;

    const titleEl = document.getElementById('modalAddMemberTitle');
    const editIdEl = document.getElementById('editMemberId');
    const nameInp = document.getElementById('addMemberName');
    const roleSelect = document.getElementById('addMemberRole');
    const scopeSelect = document.getElementById('addMemberScope');
    const usernameInp = document.getElementById('addMemberUsername');
    const passInp = document.getElementById('addMemberPassword');
    const statusSelect = document.getElementById('addMemberStatus');
    const btnDelete = document.getElementById('btnDeleteMember');

    if (titleEl) titleEl.textContent = `✏️ Edit Committee Member: ${member.name}`;
    if (editIdEl) editIdEl.value = member.id;
    if (nameInp) nameInp.value = member.name;
    if (roleSelect) roleSelect.value = member.role || 'Teacher Rep (SHS 2)';
    if (scopeSelect) scopeSelect.value = member.scope || 'All Houses & Classes';
    if (usernameInp) usernameInp.value = member.username || '';
    if (passInp) passInp.value = member.password || '';
    if (statusSelect) statusSelect.value = member.status || 'Active';
    if (btnDelete) btnDelete.style.display = 'inline-flex';

    this.updateMemberPreview();
    modal.classList.add('active');
  }

  deleteCurrentMember() {
    const editIdEl = document.getElementById('editMemberId');
    const memberId = editIdEl ? editIdEl.value : '';
    if (!memberId) return;
    this.closeModals();
    this.deleteMember(memberId);
  }

  updateMemberPreview() {
    const nameInp = document.getElementById('addMemberName');
    const roleSelect = document.getElementById('addMemberRole');
    const usernameInp = document.getElementById('addMemberUsername');
    const statusSelect = document.getElementById('addMemberStatus');
    const scopeSelect = document.getElementById('addMemberScope');

    const avatarEl = document.getElementById('memberPreviewAvatar');
    const nameEl = document.getElementById('memberPreviewName');
    const metaEl = document.getElementById('memberPreviewMeta');

    const name = nameInp && nameInp.value.trim() ? nameInp.value.trim() : 'Member Name';
    const role = roleSelect ? roleSelect.value : 'Committee Member';
    const scope = scopeSelect ? scopeSelect.value : 'All Houses & Classes';
    const username = usernameInp && usernameInp.value.trim() ? usernameInp.value.trim() : 'username';
    const status = statusSelect ? statusSelect.value : 'Active';

    const initials = name.split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';

    if (avatarEl) avatarEl.textContent = initials;
    if (nameEl) nameEl.textContent = name;
    if (metaEl) {
      metaEl.innerHTML = `
        ${escapeHtml(role)} • <span style="color: #64748b;">${escapeHtml(scope)}</span> • <code>${escapeHtml(username)}</code> • 
        <span style="color: ${status === 'Active' ? 'var(--stat-green)' : '#94a3b8'}; font-weight: 700;">● ${escapeHtml(status)}</span>
      `;
    }
  }

  saveMember(e) {
    e.preventDefault();
    const editIdEl = document.getElementById('editMemberId');
    const nameInp = document.getElementById('addMemberName');
    const roleSelect = document.getElementById('addMemberRole');
    const scopeSelect = document.getElementById('addMemberScope');
    const usernameInp = document.getElementById('addMemberUsername');
    const passInp = document.getElementById('addMemberPassword');
    const statusSelect = document.getElementById('addMemberStatus');

    const editId = editIdEl ? editIdEl.value : '';
    const name = nameInp ? nameInp.value.trim() : '';
    const role = roleSelect ? roleSelect.value : 'Teacher Rep (SHS 2)';
    const scope = scopeSelect ? scopeSelect.value : 'All Houses & Classes';
    const username = usernameInp ? usernameInp.value.trim().toLowerCase() : '';
    const password = passInp && passInp.value.trim() ? passInp.value.trim() : (username || '123456');
    const status = statusSelect ? statusSelect.value : 'Active';

    if (!name || !username) {
      alert('Please fill in member name and username.');
      return;
    }

    if (editId) {
      const existing = this.store.state.members.find(m => m.id === editId);
      if (existing) {
        existing.name = name;
        existing.role = role;
        existing.scope = scope;
        existing.username = username;
        existing.password = password;
        existing.status = status;
        this.showToast(`Updated committee member: ${name}`);
      }
    } else {
      const newMember = {
        id: `mem-${Date.now()}`,
        no: this.store.state.members.length + 1,
        name: name,
        role: role,
        scope: scope,
        username: username,
        password: password,
        status: status
      };
      this.store.state.members.push(newMember);
    this.addNotification({
      id: `notif-member-${newMember.id}`,
      type: 'member',
      icon: '👥',
      title: `Committee Member Registered: ${newMember.name}`,
      message: `${newMember.name} (${newMember.role}) registered with username "${newMember.username}" and is Active for student assessments.`,
      actionLabel: 'View in Directory ➜',
      actionView: 'committee'
    });
      this.showToast(`Added committee member: ${name}`);
    }

    this.store.save();
    this.closeModals();
    this.render();
  }

  closeModals() {
    const returnTarget = this.returnToModal;
    this.returnToModal = null;
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    if (returnTarget === '+ Add Student') {
      const addStudentModal = document.getElementById('modalAddStudent');
      if (addStudentModal) addStudentModal.classList.add('active');
    }
  }

  showToast(message) {
    const stack = document.getElementById('toastStack');
    if (!stack) return;

    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = `<span>${message}</span>`;
    stack.appendChild(item);

    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(30px)';
      item.style.transition = 'all 0.25s ease';
      setTimeout(() => item.remove(), 250);
    }, 3200);
  }
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toYmd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateRange(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [y1, m1, d1] = startDateStr.split('-').map(Number);
  const [y2, m2, d2] = endDateStr.split('-').map(Number);
  const day1 = String(d1).padStart(2, '0');
  const day2 = String(d2).padStart(2, '0');
  const mon1 = months[m1 - 1];
  const mon2 = months[m2 - 1];
  if (y1 === y2) {
    if (m1 === m2) {
      return `${day1} – ${day2} ${mon1} ${y1}`;
    }
    return `${day1} ${mon1} – ${day2} ${mon2} ${y1}`;
  }
  return `${day1} ${mon1} ${y1} – ${day2} ${mon2} ${y2}`;
}

let app;
window.app = null;

function initOLAGApp() {
  if (window.app) return;
  app = new OLAGApp();
  window.app = app;

  if (window.location && (window.location.hash === '#register' || (window.location.search && window.location.search.includes('register')))) {
    if (typeof app.switchCommitteeForm === 'function') {
      app.switchCommitteeForm('register');
    }
  }

  const formAddStudent = document.getElementById('formAddStudent');
  if (formAddStudent) {
    formAddStudent.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('addStudentName').value.trim();
      const sClass = (document.getElementById('addStudentClass').value || '').trim();
      const sHouse = document.getElementById('addStudentHouse').value;
      const sGender = document.getElementById('addStudentGender').value;

      if (!name || !sClass) {
        app.showToast('Please enter both student name and class.');
        return;
      }

      if (sClass && !app.store.state.classes.includes(sClass)) {
        app.store.state.classes.push(sClass);
      }
      if (!app.store.state.selectedClass) {
        app.store.state.selectedClass = sClass;
      }

      const newId = app.store.getNextStudentId();
      const newStudent = {
        id: newId,
        name,
        class: sClass,
        house: sHouse,
        gender: sGender,
        comment: 'Newly enrolled student for assessment.'
      };

      app.store.state.students.push(newStudent);
      app.addNotification({
        id: `notif-student-${newStudent.id}`,
        type: 'student',
        icon: '🎓',
        title: `New Student Enrolled: ${newStudent.name}`,
        message: `${newStudent.name} (${newStudent.id}) enrolled in ${newStudent.class}, ${newStudent.house}.`,
        actionLabel: 'View Students ➜',
        actionView: 'students'
      });
      app.store.state.totalStudentsCount = app.store.state.students.length;
      app.store.state.selectedStudentId = newId;
      app.store.state.studentClassFilter = 'All Classes';
      app.store.state.studentHouseFilter = 'All Houses';
      app.store.state.studentSearchQuery = '';
      app.store.save();

      app.closeModals();
      formAddStudent.reset();
      app.showToast(`✓ Added student: ${name} (${newId}) — ${sClass}, ${sHouse}`);
      app.render();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOLAGApp);
} else {
  initOLAGApp();
}
