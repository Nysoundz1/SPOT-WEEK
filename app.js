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
    description: 'Evaluator interface: assessment queue, 8-criteria scoring form, and personal progress.'
  }
};

const CRITERIA_LIST = [
  { id: 'crit-1', no: 1, name: 'Punctuality', max: 10 },
  { id: 'crit-2', no: 2, name: 'Neatness & Appearance', max: 10 },
  { id: 'crit-3', no: 3, name: 'Discipline', max: 10 },
  { id: 'crit-4', no: 4, name: 'Leadership', max: 10 },
  { id: 'crit-5', no: 5, name: 'Courtesy / Respect', max: 10 },
  { id: 'crit-6', no: 6, name: 'Participation', max: 10 },
  { id: 'crit-7', no: 7, name: 'Academic Attitude', max: 10 },
  { id: 'crit-8', no: 8, name: 'Teamwork', max: 10 }
];

const WEEKS_LIST = [
  { id: 'week-1', no: 1, name: 'Week 1', dateRange: '31 Mar – 06 Apr 2025', status: 'Upcoming' },
  { id: 'week-2', no: 2, name: 'Week 2', dateRange: '07 – 13 Apr 2025', status: 'Upcoming' },
  { id: 'week-3', no: 3, name: 'Week 3', dateRange: '14 – 20 Apr 2025', status: 'Upcoming' },
  { id: 'week-4', no: 4, name: 'Week 4', dateRange: '21 – 27 Apr 2025', status: 'Open', isCurrent: true },
  { id: 'week-5', no: 5, name: 'Week 5', dateRange: '28 Apr – 04 May 2025', status: 'Upcoming' }
];

const CLASSES_LIST = ['SHS 1A', 'SHS 1B', 'SHS 2A', 'SHS 2B', 'SHS 2C', 'SHS 3A', 'SHS 3B', 'SHS 3C'];
const HOUSES_LIST = ['Accra House', 'Kumasi House', 'Takoradi House', 'Cape Coast House'];

// Clean Initial State: Empty arrays for students, scores, and registered members
const COMMITTEE_MEMBERS = [];
const INITIAL_STUDENTS = [];
const INITIAL_SCORES = {};

// --- Store ---
class OLAGStore {
  constructor() {
    this.storageKey = 'OLAG_SHS_SPOT_DATA_V5';
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.theme) parsed.theme = localStorage.getItem('olag_theme') || 'light';
        if (typeof parsed.sidebarCollapsed === 'undefined') parsed.sidebarCollapsed = false;
        if (typeof parsed.dashInfoHidden === 'undefined') parsed.dashInfoHidden = false;
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
      selectedWeekId: 'week-4',
      selectedClass: 'SHS 2A',
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

    // Toggle Password Visibility Eye
    const btnTogglePwd = document.getElementById('btnTogglePassword');
    if (btnTogglePwd) {
      btnTogglePwd.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePasswordVisibility();
      });
    }

    // Forgot Password link
    const linkForgot = document.getElementById('linkForgotPassword');
    if (linkForgot) {
      linkForgot.addEventListener('click', (e) => {
        e.preventDefault();
        this.showToast('Login Credentials:\n• Administrator: admin / admin\n• Committee Member: akosua.d / committee');
      });
    }

    // Sidebar Logout
    const btnLogout = document.getElementById('btnSidebarLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        this.store.state.isLoggedIn = false;
        this.store.save();
        this.render();
        this.showToast('You have logged out.');
      });
    }

    // Switch Dashboard Button & Header Profile click
    const btnSwitchDash = document.getElementById('btnSwitchDashboard');
    const headerProfile = document.getElementById('headerUserProfile');
    if (btnSwitchDash) btnSwitchDash.addEventListener('click', () => this.openRoleSwitcherModal());
    if (headerProfile) headerProfile.addEventListener('click', () => this.openRoleSwitcherModal());

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
    if (weekStartDate) weekStartDate.addEventListener('input', () => this.updateWeekIntervalPreview());
    if (weekEndDate) weekEndDate.addEventListener('input', () => this.updateWeekIntervalPreview());
    if (weekNameInput) weekNameInput.addEventListener('input', () => this.updateWeekIntervalPreview());

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

    if (username === 'admin') {
      if (password !== 'admin@26' && password !== 'admin' && password !== 'password' && password !== '123456') {
        this.showToast('Invalid administrator password. Default password is admin@26.');
        return;
      }
      this.handleLoginByRole('admin');
      return;
    }

    this.showToast("Invalid administrator username. Please enter 'admin'.");
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
        description: 'Evaluator interface: assessment queue, 8-criteria scoring form, and personal progress.'
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
      description: 'Evaluator interface: assessment queue, 8-criteria scoring form, and personal progress.'
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
        description: 'Evaluator interface: assessment queue, 8-criteria scoring form, and personal progress.'
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
    if (typeof window !== 'undefined' && window.location && window.location.pathname && (window.location.pathname.includes('committee-login') || window.location.pathname.includes('admin-login'))) {
      window.location.href = 'index.html';
      return;
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
        description: 'Evaluator interface: assessment queue, 8-criteria scoring form, and personal progress.'
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
    this.store.state.currentView = viewId;
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
    const currentWeek = this.store.state.weeks.find(w => w.id === this.store.state.selectedWeekId) || this.store.state.weeks[3];

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
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const weekPillEl = document.querySelector('.header-week-pill');

    if (weekIntervalEl) {
      if (isCurrentlyAdmin) {
        weekIntervalEl.innerHTML = `${escapeHtml(currentWeek.name)} (${escapeHtml(currentWeek.dateRange)}) <span class="header-week-edit-badge">✏️ Set</span>`;
      } else {
        weekIntervalEl.textContent = `${currentWeek.name} (${currentWeek.dateRange})`;
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

    // Toggle button in header between the two dashboards
    if (btnSwitchDash) {
      btnSwitchDash.innerHTML = isCurrentlyAdmin 
        ? `<span>👥 Switch to Committee Member</span>` 
        : `<span>🛡️ Switch to Admin View</span>`;
      btnSwitchDash.onclick = () => {
        this.handleLoginByRole(isCurrentlyAdmin ? 'committee' : 'admin');
      };
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
    const view = this.store.state.currentView;

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

    const currentWeek = this.store.state.weeks.find(w => w.isCurrent) || this.store.state.weeks.find(w => w.id === 'week-4') || this.store.state.weeks[0] || { id: 'week-1', name: 'Week 1', dateRange: 'Upcoming', status: 'Upcoming' };
    const topStudent = currentWeek.topStudent ? this.store.state.students.find(s => s.name === currentWeek.topStudent) : null;
    const isHidden = !!this.store.state.dashInfoHidden;

    container.innerHTML = `
      <div class="view-header view-header-with-toggle">
        <div>
          <h2>Administrator Dashboard</h2>
          <p>Welcome, ${escapeHtml(this.store.state.currentUser.name)}. Full system management and assessment control.</p>
        </div>
        <button type="button" class="btn-toggle-dash-info ${isHidden ? 'is-collapsed' : ''}" id="btnToggleAdminDashInfo" onclick="app.toggleDashboardInfo()" title="Toggle Dashboard Info Cards">
          <span class="dash-toggle-arrow">${isHidden ? '▼' : '▲'}</span>
          <span class="dash-toggle-text">${isHidden ? 'Show Dashboard Info' : 'Hide Dashboard Info'}</span>
        </button>
      </div>

      <div class="dashboard-info-collapsible ${isHidden ? 'is-collapsed' : ''}" id="adminDashboardInfoWrap">
        <div class="stat-cards-grid">
          <div class="stat-card card-blue">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Students</span>
              <span class="stat-card-value">${this.store.state.students.length}</span>
            </div>
            <div class="stat-card-icon">👥</div>
          </div>

          <div class="stat-card card-green" style="cursor: pointer;" onclick="app.openSetWeekIntervalModal('${currentWeek.id}')" title="Click to Set / Configure Week Interval">
            <div class="stat-card-text">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem;">
                <span class="stat-card-title">This Week</span>
                <span style="font-size: 0.68rem; font-weight: 700; background: rgba(255,255,255,0.3); padding: 0.1rem 0.45rem; border-radius: 999px;">⚙️ Set</span>
              </div>
              <span class="stat-card-value" style="font-size: 1.45rem;">${escapeHtml(currentWeek.name)}</span>
              <span class="stat-card-sub">(${escapeHtml(currentWeek.dateRange)})</span>
            </div>
            <div class="stat-card-icon">📅</div>
          </div>

          <div class="stat-card card-purple">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Classes</span>
              <span class="stat-card-value">${this.store.state.classes.length}</span>
            </div>
            <div class="stat-card-icon">🎓</div>
          </div>

          <div class="stat-card card-orange">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Houses</span>
              <span class="stat-card-value">${this.store.state.houses.length}</span>
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
            <span class="winner-card-week-tag">(${escapeHtml(currentWeek.name)})</span>
          </div>

          ${topStudent ? `
            <div class="dashboard-winner-body">
              <div class="dashboard-winner-left">
                <div class="winner-avatar-circle">👤</div>
                <div class="winner-info-text">
                  <h3>${escapeHtml(topStudent.name)}</h3>
                  <p>${escapeHtml(topStudent.class)} | ${escapeHtml(topStudent.house)} House</p>
                </div>
              </div>

              <div class="dashboard-winner-scores">
                <div class="winner-score-block">
                  <div class="winner-score-label">Total Score</div>
                  <div class="winner-score-value">${currentWeek.totalScore || 0} / ${currentWeek.maxScore || 80}</div>
                </div>

                <div class="winner-score-block">
                  <div class="winner-score-label">Percentage</div>
                  <div class="winner-percentage-value">${currentWeek.percentage || 0}%</div>
                </div>

                <div class="winner-laurel-decor">🌿</div>
              </div>
            </div>
          ` : `
            <div class="dashboard-winner-body" style="padding: 1.5rem; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
              <div style="font-size: 2rem;">🌟</div>
              <h4 style="margin: 0; color: var(--text-main); font-size: 1.05rem;">No Winner Announced Yet for ${escapeHtml(currentWeek.name)}</h4>
              <p style="margin: 0; font-size: 0.85rem; max-width: 440px;">Weekly assessments are awaiting evaluation submissions. As scores are entered by committee members, the top-performing student will be celebrated here.</p>
            </div>
          `}
        </div>
      </div>

      <div class="quick-actions-section">
        <div class="section-title">Quick Actions</div>
        <div class="quick-actions-grid">
          <div class="quick-action-card" onclick="app.openSetWeekIntervalModal('${currentWeek.id}')">
            <div class="quick-action-icon">📅</div>
            <div class="quick-action-label">Set Week Interval</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('assessment')">
            <div class="quick-action-icon">✏️</div>
            <div class="quick-action-label">Enter Scores (${currentWeek.name})</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('rankings')">
            <div class="quick-action-icon">📊</div>
            <div class="quick-action-label">View Rankings</div>
          </div>

          <div class="quick-action-card" onclick="app.openAddStudentModal()">
            <div class="quick-action-icon">👤➕</div>
            <div class="quick-action-label">Add Student</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('reports')">
            <div class="quick-action-icon">📥</div>
            <div class="quick-action-label">Export Report</div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // DASHBOARD 2: COMMITTEE MEMBER DASHBOARD
  // =========================================================================
  renderCommitteeDashboard() {
    const container = document.getElementById('view-dashboard-committee');
    if (!container) return;

    const currentWeek = this.store.state.weeks.find(w => w.isCurrent) || this.store.state.weeks.find(w => w.id === 'week-4') || this.store.state.weeks[0] || { id: 'week-1', name: 'Week 1' };
    const allStudents = this.store.state.students || [];
    const weekScores = this.store.state.scores[currentWeek.id] || {};

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

    container.innerHTML = `
      <div class="view-header view-header-with-toggle">
        <div>
          <h2>Committee Member Dashboard</h2>
          <p>Logged in as <strong>${escapeHtml(this.store.state.currentUser.name)}</strong> (${this.store.state.currentUser.title})</p>
        </div>
        <button type="button" class="btn-toggle-dash-info ${isHidden ? 'is-collapsed' : ''}" id="btnToggleCommitteeDashInfo" onclick="app.toggleDashboardInfo()" title="Toggle Dashboard Info Cards">
          <span class="dash-toggle-arrow">${isHidden ? '▼' : '▲'}</span>
          <span class="dash-toggle-text">${isHidden ? 'Show Dashboard Info' : 'Hide Dashboard Info'}</span>
        </button>
      </div>

      <div class="dashboard-info-collapsible ${isHidden ? 'is-collapsed' : ''}" id="committeeDashboardInfoWrap">
        <!-- Committee Progress Hero Banner -->
        <div class="committee-progress-hero">
          <div class="committee-progress-text">
            <h3>Assessment Quorum: ${escapeHtml(currentWeek.name)} Cycle</h3>
            <p>${totalAssigned > 0 
              ? `You have evaluated <strong>${evaluatedCount} of ${totalAssigned} assigned students</strong>.` 
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
          <div class="stat-card card-blue">
            <div class="stat-card-text">
              <span class="stat-card-title">Assigned Students</span>
              <span class="stat-card-value">${totalAssigned}</span>
            </div>
            <div class="stat-card-icon">📋</div>
          </div>

          <div class="stat-card card-green">
            <div class="stat-card-text">
              <span class="stat-card-title">Evaluated</span>
              <span class="stat-card-value">${evaluatedCount}</span>
            </div>
            <div class="stat-card-icon">✓</div>
          </div>

          <div class="stat-card card-orange">
            <div class="stat-card-text">
              <span class="stat-card-title">Pending</span>
              <span class="stat-card-value">${pendingCount}</span>
            </div>
            <div class="stat-card-icon">⏳</div>
          </div>

          <div class="stat-card card-purple">
            <div class="stat-card-text">
              <span class="stat-card-title">Criteria Scale</span>
              <span class="stat-card-value" style="font-size: 1.45rem;">8 Criteria</span>
              <span class="stat-card-sub">Max 80 Pts</span>
            </div>
            <div class="stat-card-icon">⚖️</div>
          </div>
        </div>
      </div>

      <!-- Next Pending Nominees to Assess -->
      <div class="scoring-table-card">
        <div class="scoring-table-title">
          <span>Pending Student Evaluations for ${escapeHtml(currentWeek.name)}</span>
          <button class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.navigateTo('assessment')">
            Open Full Rubric ➜
          </button>
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
                  <strong>All caught up!</strong> All ${totalAssigned} students have been evaluated for ${escapeHtml(currentWeek.name)}.
                </td>
              </tr>
            ` : pendingStudents.slice(0, 5).map(s => `
              <tr>
                <td><strong>${escapeHtml(s.id)}</strong></td>
                <td>${escapeHtml(s.name)}</td>
                <td>${escapeHtml(s.class)}</td>
                <td>${escapeHtml(s.house)}</td>
                <td><span style="color: var(--stat-orange); font-weight: 700;">⏳ Pending</span></td>
                <td style="text-align: center;">
                  <button class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.75rem;" onclick="app.scoreStudentFromQueue('${escapeHtml(s.id)}')">
                    Score Now
                  </button>
                </td>
              </tr>
            `).join(''))}
          </tbody>
        </table>
      </div>
    `;
  }

  scoreStudentFromQueue(studentId) {
    this.store.state.selectedStudentId = studentId;
    this.navigateTo('assessment');
  }



  // =========================================================================
  // ROLE SWITCHER MODAL
  // =========================================================================
  openRoleSwitcherModal() {
    const modal = document.getElementById('modalRoleSwitcher');
    if (!modal) return;

    const list = document.getElementById('roleSwitcherList');
    const currentKey = this.store.state.currentRoleKey;

    list.innerHTML = Object.keys(SYSTEM_ROLES).map(k => {
      const role = SYSTEM_ROLES[k];
      const isSelected = role.key === currentKey;
      return `
        <button type="button" class="role-switcher-card-btn ${isSelected ? 'active' : ''}" onclick="app.handleLoginByRole('${role.key}')">
          <div class="role-avatar-circle" style="background-color: ${role.avatarBg}; color: white;">
            ${role.avatar}
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 800; font-size: 0.95rem; color: var(--navy-primary);">${escapeHtml(role.name)}</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-gold);">${escapeHtml(role.roleTag)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">${escapeHtml(role.description)}</div>
          </div>
          ${isSelected ? '<span style="font-weight: 800; color: var(--stat-green); font-size: 0.85rem;">Active</span>' : ''}
        </button>
      `;
    }).join('');

    modal.classList.add('active');
  }

  // Common Views
  renderStudents() {
    const container = document.getElementById('view-students');
    if (!container) return;

    let students = [...this.store.state.students];
    const query = (this.store.state.studentSearchQuery || '').toLowerCase();
    const classFilter = this.store.state.studentClassFilter || 'All Classes';
    const houseFilter = this.store.state.studentHouseFilter || 'All Houses';

    if (query) {
      students = students.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.id.toLowerCase().includes(query) || 
        s.class.toLowerCase().includes(query) || 
        s.house.toLowerCase().includes(query)
      );
    }

    if (classFilter !== 'All Classes') {
      students = students.filter(s => s.class === classFilter);
    }

    if (houseFilter !== 'All Houses') {
      students = students.filter(s => s.house.toLowerCase().includes(houseFilter.toLowerCase()));
    }

    container.innerHTML = `
      <div class="view-header">
        <h2>Manage Students</h2>
        <p>Add, edit or view student information.</p>
      </div>

      <div class="table-filter-toolbar">
        <div class="toolbar-left-search">
          <div class="search-input-wrapper">
            <span class="search-icon-pos">🔍</span>
            <input type="text" id="studentSearchInput" class="form-input" 
              placeholder="Search by name, ID, class or house..." 
              value="${escapeHtml(this.store.state.studentSearchQuery)}" />
          </div>

          <select id="studentClassFilterSelect" class="form-select" style="max-width: 140px;">
            <option value="All Classes">All Classes</option>
            ${this.store.state.classes.map(c => `<option value="${c}" ${c === classFilter ? 'selected' : ''}>${c}</option>`).join('')}
          </select>

          <select id="studentHouseFilterSelect" class="form-select" style="max-width: 140px;">
            <option value="All Houses">All Houses</option>
            ${this.store.state.houses.map(h => `<option value="${h.replace(' House', '')}" ${houseFilter.includes(h.replace(' House', '')) ? 'selected' : ''}>${h.replace(' House', '')}</option>`).join('')}
          </select>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button type="button" class="btn-navy-action" style="background: #334155;" onclick="app.openAddClassModal()">
            🏫 Classes (${this.store.state.classes.length})
          </button>
          <button type="button" class="btn-navy-action" onclick="app.openAddStudentModal()">
            + Add Student
          </button>
        </div>
      </div>

      <div class="scoring-table-card" style="padding: 0; overflow: hidden;">
        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th style="width: 50px;">No.</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>House</th>
                <th>Gender</th>
                <th style="width: 110px; text-align: center;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${students.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">👥</div>
                    No students found in the database.<br>
                    <button type="button" class="btn-navy-action" style="margin-top: 0.75rem;" onclick="app.openAddStudentModal()">
                      + Add First Student
                    </button>
                  </td>
                </tr>
              ` : students.map((s, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><strong>${escapeHtml(s.id)}</strong></td>
                  <td>
                    <a href="javascript:void(0)" onclick="app.navigateTo('student-profile', { studentId: '${s.id}' })" style="font-weight: 700; color: var(--navy-primary);">
                      ${escapeHtml(s.name)}
                    </a>
                  </td>
                  <td>${escapeHtml(s.class)}</td>
                  <td>${escapeHtml(s.house)}</td>
                  <td>${escapeHtml(s.gender)}</td>
                  <td style="text-align: center;">
                    <button class="action-icon-btn" title="View Profile" onclick="app.navigateTo('student-profile', { studentId: '${s.id}' })">
                      👁️
                    </button>
                    <button class="action-icon-btn" title="Edit Student" onclick="app.openEditStudentModal('${s.id}')">
                      ✏️
                    </button>
                    <button class="action-icon-btn delete" title="Delete" onclick="app.deleteStudent('${s.id}')">
                      🗑️
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="pagination-container">
          <span>Showing ${students.length > 0 ? '1' : '0'} – ${students.length} of ${this.store.state.students.length} students</span>
          <div class="pagination-pages">
            <button class="page-btn active">1</button>
          </div>
        </div>
      </div>
    `;

    const searchInput = document.getElementById('studentSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.store.state.studentSearchQuery = e.target.value;
        this.renderStudents();
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

    const weeks = this.store.state.weeks;
    const classes = this.store.state.classes;
    const members = this.store.state.members;
    const currentWeekId = this.store.state.selectedWeekId || 'week-4';
    const currentClass = this.store.state.selectedClass || classes[0] || 'SHS 2A';
    const currentStudentId = this.store.state.selectedStudentId;
    const currentEvaluatorId = this.store.state.selectedEvaluatorId || (members[0] ? members[0].id : (this.store.state.currentUser.id || 'committee-default'));
    const evaluator = members.find(m => m.id === currentEvaluatorId) || members[0] || (this.store.state.currentUser || { name: 'Committee Member', role: 'Evaluator' });
    const currentWeekObj = weeks.find(w => w.id === currentWeekId) || weeks.find(w => w.isCurrent) || weeks[0];
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';

    const classStudents = this.store.state.students.filter(s => s.class === currentClass);
    const selectedStudent = (currentStudentId ? classStudents.find(s => s.id === currentStudentId) : null) || classStudents[0] || null;

    const weekScores = this.store.state.scores[currentWeekId] || {};
    const studentScoreData = selectedStudent ? (weekScores[selectedStudent.id] || {}) : {};
    const criteria = this.store.state.criteria;

    container.innerHTML = `
      <div class="view-header">
        <h2>Enter Weekly Assessment Scores</h2>
        <p>Select the week interval, class, evaluator and student to enter scores.</p>
      </div>

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
          <span style="font-size: 0.8rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill);">
            📅 ${escapeHtml(currentWeekObj.name)} (${escapeHtml(currentWeekObj.dateRange)})
          </span>
          <span style="font-size: 0.8rem; font-weight: 700; background: #dcfce7; color: #15803d; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill);">
            ${currentWeekObj.status === 'Closed' ? '🔒 Closed' : '🟢 Open for Scoring'}
          </span>
          ${isCurrentlyAdmin ? `<button type="button" class="btn-demo-pill" style="border: 1px solid var(--accent-gold); color: var(--navy-primary);" onclick="app.openSetWeekIntervalModal('${currentWeekObj.id}')">⚙️ Set Interval</button>` : ''}
        </div>
      </div>

      <div class="assessment-filter-card">
        <div class="filter-field">
          <label>Week Interval</label>
          <select id="assessWeekSelect" class="form-select">
            ${weeks.map(w => `<option value="${w.id}" ${w.id === currentWeekId ? 'selected' : ''}>${w.name} (${w.dateRange})</option>`).join('')}
          </select>
        </div>

        <div class="filter-field">
          <label>Class</label>
          <select id="assessClassSelect" class="form-select">
            ${classes.map(c => `<option value="${c}" ${c === currentClass ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>

        <!-- Interactive Committee Evaluator Dropdown -->
        <div class="filter-field">
          <label>Committee Evaluator</label>
          <select id="assessMemberSelect" class="form-select" style="font-weight: 600;">
            ${members.length === 0 ? `
              <option value="committee-default">
                👤 ${escapeHtml(evaluator.name)} (${escapeHtml(evaluator.role)})
              </option>
            ` : members.map(m => `
              <option value="${m.id}" ${m.id === currentEvaluatorId ? 'selected' : ''}>
                👤 ${escapeHtml(m.name)} (${escapeHtml(m.role)})
              </option>
            `).join('')}
          </select>
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
            <span>Assessment Criteria (Each / 10) — Evaluating: <strong>${escapeHtml(selectedStudent.name)}</strong> (${escapeHtml(selectedStudent.class)}, ${escapeHtml(selectedStudent.house)} House)</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">Max Total: 80 Points</span>
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
                          required />
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>

            <div class="scoring-summary-bar">
              <div class="scoring-tally-text">
                Live Total: <strong id="liveTotalDisplay">${studentScoreData.total || 0} / 80</strong> &nbsp;•&nbsp; 
                Percentage: <strong id="livePctDisplay" style="color: var(--accent-gold);">${studentScoreData.pct || 0}%</strong>
              </div>

              <button type="submit" class="btn-navy-action" style="padding: 0 2rem;">
                Submit Scores
              </button>
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
      const pct = ((total / 80) * 100).toFixed(1);
      const totalDisplay = document.getElementById('liveTotalDisplay');
      const pctDisplay = document.getElementById('livePctDisplay');
      if (totalDisplay) totalDisplay.textContent = `${total} / 80`;
      if (pctDisplay) pctDisplay.textContent = `${pct}%`;
    };

    inputs.forEach(inp => inp.addEventListener('input', updateLiveTotals));

    const classSelect = document.getElementById('assessClassSelect');
    if (classSelect) {
      classSelect.addEventListener('change', (e) => {
        this.store.state.selectedClass = e.target.value;
        const matching = this.store.state.students.filter(s => s.class === e.target.value);
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
        const scoresObj = {};
        let total = 0;
        inputs.forEach(inp => {
          const cId = inp.dataset.critId;
          const val = parseInt(inp.value, 10) || 0;
          scoresObj[cId] = val;
          total += val;
        });
        const pct = Number(((total / 80) * 100).toFixed(1));

        if (!this.store.state.scores[currentWeekId]) this.store.state.scores[currentWeekId] = {};
        this.store.state.scores[currentWeekId][selectedStudent.id] = { ...scoresObj, total, pct };

        this.store.save();
        this.showToast(`✓ Scores submitted for ${selectedStudent.name}: ${total}/80 (${pct}%)`);
        this.renderAssessment();
      });
    }
  }

  renderRankings() {
    const container = document.getElementById('view-rankings');
    if (!container) return;

    const weeks = this.store.state.weeks;
    const classes = this.store.state.classes;
    const currentWeekId = this.store.state.selectedWeekId || 'week-4';
    const currentClass = this.store.state.selectedClass || 'All';
    const weekScores = this.store.state.scores[currentWeekId] || {};
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
            ${weeks.map(w => `<option value="${w.id}" ${w.id === currentWeekId ? 'selected' : ''}>${w.name} (${w.dateRange})</option>`).join('')}
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
              <div class="winner-banner-sub">${escapeHtml(topWinner.student.class)} | ${escapeHtml(topWinner.student.house)} House</div>
            </div>
          </div>

          <div class="winner-banner-scores">
            <div class="banner-score-col">
              <div class="banner-score-lbl">Total Score</div>
              <div class="banner-score-val">${topWinner.totalScore} / 80</div>
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
              ${weeks.map(w => `
                <tr>
                  <td>
                    <strong>${escapeHtml(w.name)}</strong>
                    ${w.isCurrent ? '<span style="font-size: 0.7rem; font-weight: 700; background: #dcfce7; color: #15803d; padding: 0.1rem 0.4rem; border-radius: 999px; margin-left: 0.35rem;">Active</span>' : ''}
                  </td>
                  <td>${escapeHtml(w.dateRange)}</td>
                  <td>
                    <span class="status-badge-${w.status === 'Closed' ? 'closed' : 'active'}" style="font-size: 0.75rem;">
                      ● ${escapeHtml(w.status || 'Open')}
                    </span>
                  </td>
                  <td>
                    <span style="font-weight: 700; color: var(--navy-primary);">
                      ${w.topStudent ? escapeHtml(w.topStudent) : '<span style="color: var(--text-muted); font-weight: normal;">—</span>'}
                    </span>
                  </td>
                  <td style="text-align: center; font-weight: 700;">${w.totalScore ? `${w.totalScore} / ${w.maxScore || 80}` : '—'}</td>
                  <td style="text-align: center; font-weight: 700;">${w.percentage ? `${w.percentage}%` : '—'}</td>
                  <td style="text-align: center;">
                    <div style="display: inline-flex; gap: 0.35rem; align-items: center;">
                      <button class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.75rem;" onclick="app.viewWeekDetail('${w.id}')">
                        View
                      </button>
                      ${isCurrentlyAdmin ? `
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

    const searchQuery = (this.store.state.committeeSearchQuery || '').toLowerCase().trim();
    const roleFilter = this.store.state.committeeRoleFilter || 'All';
    const statusFilter = this.store.state.committeeStatusFilter || 'All';

    let filtered = this.store.state.members.filter(m => {
      const matchSearch = !searchQuery || 
        m.name.toLowerCase().includes(searchQuery) || 
        m.username.toLowerCase().includes(searchQuery) ||
        m.role.toLowerCase().includes(searchQuery);

      let matchRole = true;
      if (roleFilter === 'Discipline') matchRole = m.role.includes('Discipline') || m.role.includes('Principal');
      else if (roleFilter === 'Teacher') matchRole = m.role.includes('Teacher');
      else if (roleFilter === 'House') matchRole = m.role.includes('House');
      else if (roleFilter === 'Support') matchRole = m.role.includes('Parent') || m.role.includes('Counselor') || m.role.includes('Sports');

      let matchStatus = true;
      if (statusFilter !== 'All') matchStatus = m.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });

    container.innerHTML = `
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>Manage Committee Members</h2>
          <p>Add, edit, or manage faculty and committee members who enter weekly assessments.</p>
        </div>
        <button type="button" class="btn-navy-action" onclick="app.openAddMemberModal()">
          👥 + Add Member
        </button>
      </div>

      <!-- Interactive Committee Search & Dropdown Filters Bar -->
      <div class="committee-filter-bar">
        <input type="text" id="committeeSearchInput" class="form-input" placeholder="🔍 Search committee member by name, role or username..." value="${escapeHtml(this.store.state.committeeSearchQuery || '')}" style="flex: 1; min-width: 220px;" />
        
        <select id="committeeRoleFilterSelect" class="form-select" style="max-width: 190px; font-weight: 600;">
          <option value="All" ${roleFilter === 'All' ? 'selected' : ''}>🎭 All Roles</option>
          <option value="Discipline" ${roleFilter === 'Discipline' ? 'selected' : ''}>🛡️ Discipline & Exec</option>
          <option value="Teacher" ${roleFilter === 'Teacher' ? 'selected' : ''}>👨‍🏫 Teacher Reps</option>
          <option value="House" ${roleFilter === 'House' ? 'selected' : ''}>🏠 House Masters</option>
          <option value="Support" ${roleFilter === 'Support' ? 'selected' : ''}>🤝 Support & PTA</option>
        </select>

        <select id="committeeStatusFilterSelect" class="form-select" style="max-width: 150px; font-weight: 600;">
          <option value="All" ${statusFilter === 'All' ? 'selected' : ''}>All Status</option>
          <option value="Active" ${statusFilter === 'Active' ? 'selected' : ''}>🟢 Active</option>
          <option value="Observer" ${statusFilter === 'Observer' ? 'selected' : ''}>🟡 Observer</option>
          <option value="On Leave" ${statusFilter === 'On Leave' ? 'selected' : ''}>⚪ On Leave</option>
        </select>
      </div>

      <div class="scoring-table-card" style="padding: 0; overflow: hidden;">
        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th style="width: 50px;">No.</th>
                <th>Name</th>
                <th>Role</th>
                <th>Scope</th>
                <th>Username</th>
                <th>Status</th>
                <th style="text-align: center; width: 110px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    No committee members match your filters.
                  </td>
                </tr>
              ` : filtered.map((m, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><strong>${escapeHtml(m.name)}</strong></td>
                  <td>${escapeHtml(m.role)}</td>
                  <td><span style="font-size: 0.76rem; color: #475569;">${escapeHtml(m.scope || 'All Houses & Classes')}</span></td>
                  <td><code>${escapeHtml(m.username)}</code></td>
                  <td>
                    <span class="status-badge-${m.status === 'Active' ? 'active' : 'closed'}">
                      ● ${escapeHtml(m.status)}
                    </span>
                  </td>
                  <td style="text-align: center;">
                    <button class="action-icon-btn" title="Edit Member" onclick="app.openEditMemberModal('${m.id}')">
                      ✏️
                    </button>
                    <button class="action-icon-btn delete" title="Delete Member" onclick="app.deleteMember('${m.id}')">
                      🗑️
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const searchInp = document.getElementById('committeeSearchInput');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        this.store.state.committeeSearchQuery = e.target.value;
        this.renderCommittee();
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
    if (confirm('Are you sure you want to remove this committee member?')) {
      this.store.state.members = this.store.state.members.filter(m => m.id !== memberId);
      this.store.save();
      this.showToast('Committee member removed.');
      this.renderCommittee();
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
        score: `${weekData.total} / 80`,
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
              <span>${escapeHtml(student.house)} House</span>
            </div>
            <div class="profile-detail-row">
              <span>Gender</span>
              <span>${escapeHtml(student.gender)}</span>
            </div>
            <div class="profile-detail-row">
              <span>Phone</span>
              <span>${escapeHtml(student.phone || 'N/A')}</span>
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
                ${performanceRows.map(p => `
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

    const weeks = this.store.state.weeks;
    const classes = this.store.state.classes;
    const selectedWeekId = this.store.state.selectedWeekId || 'week-4';
    const currentWeek = this.store.state.weeks.find(w => w.id === selectedWeekId) || this.store.state.weeks.find(w => w.isCurrent) || this.store.state.weeks[0];
    const selectedClass = this.store.state.selectedClass || 'All';

    // Build data based on selected week and class from actual scores
    const weekScores = this.store.state.scores[selectedWeekId] || {};
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
            ${weeks.map(w => `<option value="${w.id}" ${w.id === selectedWeekId ? 'selected' : ''}>${w.name} (${w.dateRange})</option>`).join('')}
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
          <div class="report-assessment-title">Student Personality of the Week — ${escapeHtml(currentWeek.name)} (${escapeHtml(currentWeek.dateRange)})</div>
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
                    No official student scores recorded for ${escapeHtml(currentWeek.name)} yet.<br>
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
    const selectedWeekId = this.store.state.selectedWeekId || 'week-4';
    const currentWeek = this.store.state.weeks.find(w => w.id === selectedWeekId) || this.store.state.weeks[0];
    const selectedClass = this.store.state.selectedClass || 'All';
    const weekScores = this.store.state.scores[selectedWeekId] || {};

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
    const safeWeekName = (currentWeek.name || 'Week').replace(/\s+/g, '_');
    link.setAttribute('download', `OLAG_SHS_SPOT_${safeWeekName}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('CSV report exported successfully!');
  }

  renderSettings() {
    const container = document.getElementById('view-settings');
    if (!container) return;

    container.innerHTML = `
      <div class="view-header">
        <h2>System Settings</h2>
        <p>Configure academic year, houses, classes, criteria, and system preferences.</p>
      </div>

      <div class="stat-cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); margin-bottom: 2rem;">
        <div class="scoring-table-card">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 0.75rem;">School Configuration</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Academic Year: <strong>2024 / 2025</strong> • Term 2</p>
          <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-dark); display: flex; flex-direction: column; gap: 0.5rem;">
            <li style="display: flex; align-items: center; justify-content: space-between;">
              <span>Total Classes: <strong>${this.store.state.classes.length} Classes</strong></span>
              <button type="button" class="btn-text-action" onclick="app.openAddClassModal()">+ Manage Classes</button>
            </li>
            <li>Houses: <strong>Accra, Kumasi, Takoradi, Cape Coast</strong></li>
            <li>Total Criteria: <strong>8 Rubric Metrics (0-10 each, 80 total)</strong></li>
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
  }

  populateAddStudentClasses(selectedClass = null) {
    const select = document.getElementById('addStudentClass');
    if (!select) return;

    const classes = this.store.state.classes || [];
    const currentVal = selectedClass || select.value || classes[0] || 'SHS 2A';

    select.innerHTML = `
      ${classes.map(c => `<option value="${escapeHtml(c)}" ${c === currentVal ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
      <option value="__add_new__" style="color: var(--navy-primary); font-weight: 700;">+ Add New Class...</option>
    `;
    if (classes.includes(currentVal)) {
      select.value = currentVal;
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
      if (newClass && newClass.trim()) student.class = newClass.trim();
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
  // WEEK INTERVAL MANAGEMENT (ADMIN)
  // =========================================================================
  openSetWeekIntervalModal(targetWeekId = null) {
    const modal = document.getElementById('modalSetWeekInterval');
    if (!modal) return;

    const select = document.getElementById('setWeekTargetSelect');
    if (select) {
      const weeks = this.store.state.weeks;
      select.innerHTML = `
        <option value="new">➕ + Create New Week Interval</option>
        ${weeks.map(w => `
          <option value="${w.id}">
            ${escapeHtml(w.name)} (${escapeHtml(w.dateRange)}) [${w.status || 'Open'}] ${w.isCurrent ? '★ Current' : ''}
          </option>
        `).join('')}
      `;

      let selectedId = targetWeekId || this.store.state.selectedWeekId;
      if (!weeks.some(w => w.id === selectedId) && weeks.length > 0) {
        selectedId = weeks[0].id;
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

    if (weekId === 'new') {
      const nextNo = this.store.state.weeks.length + 1;
      if (nameInp) nameInp.value = `Week ${nextNo}`;
      if (statusSelect) statusSelect.value = 'Open';
      if (isCurrentChk) isCurrentChk.checked = true;
      this.applyWeekDatePreset('this-week');
    } else {
      const week = this.store.state.weeks.find(w => w.id === weekId);
      if (!week) return;

      if (nameInp) nameInp.value = week.name;
      if (statusSelect) statusSelect.value = week.status || 'Open';
      if (isCurrentChk) isCurrentChk.checked = !!week.isCurrent;

      if (week.startDate && week.endDate) {
        if (startInp) startInp.value = week.startDate;
        if (endInp) endInp.value = week.endDate;
      } else {
        const defaultDates = {
          'week-1': ['2025-03-31', '2025-04-06'],
          'week-2': ['2025-04-07', '2025-04-13'],
          'week-3': ['2025-04-14', '2025-04-20'],
          'week-4': ['2025-04-21', '2025-04-27'],
          'week-5': ['2025-04-28', '2025-05-04']
        };
        const dates = defaultDates[week.id] || ['2025-04-21', '2025-04-27'];
        if (startInp) startInp.value = dates[0];
        if (endInp) endInp.value = dates[1];
      }
    }
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

    const name = nameInp ? nameInp.value.trim() : 'Week 4';
    const sDate = startInp ? startInp.value : '';
    const eDate = endInp ? endInp.value : '';

    if (sDate && eDate) {
      const formatted = formatDateRange(sDate, eDate);
      previewEl.textContent = `${name || 'Week'} (${formatted})`;
    } else {
      previewEl.textContent = `${name || 'Week'} (Select start & end dates)`;
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
    const weekName = nameInp ? nameInp.value.trim() : 'Week 4';
    const status = statusSelect ? statusSelect.value : 'Open';
    const startDate = startInp ? startInp.value : '';
    const endDate = endInp ? endInp.value : '';
    const isCurrent = isCurrentChk ? isCurrentChk.checked : false;

    if (!weekName || !startDate || !endDate) {
      alert('Please fill in all week interval fields.');
      return;
    }

    const dateRange = formatDateRange(startDate, endDate);

    if (isCurrent) {
      this.store.state.weeks.forEach(w => w.isCurrent = false);
    }

    if (targetVal === 'new') {
      const newWeek = {
        id: `week-${Date.now()}`,
        no: this.store.state.weeks.length + 1,
        name: weekName,
        dateRange: dateRange,
        startDate: startDate,
        endDate: endDate,
        topStudent: null,
        totalScore: null,
        maxScore: 80,
        percentage: null,
        status: status,
        isCurrent: isCurrent
      };
      this.store.state.weeks.push(newWeek);
      if (isCurrent) {
        this.store.state.selectedWeekId = newWeek.id;
      }
      this.showToast(`Created new week interval: ${weekName} (${dateRange})`);
    } else {
      const existing = this.store.state.weeks.find(w => w.id === targetVal);
      if (existing) {
        existing.name = weekName;
        existing.dateRange = dateRange;
        existing.startDate = startDate;
        existing.endDate = endDate;
        existing.status = status;
        if (isCurrent) {
          existing.isCurrent = true;
          this.store.state.selectedWeekId = existing.id;
        }
        this.showToast(`Updated week interval: ${weekName} (${dateRange})`);
      }
    }

    this.store.save();
    this.closeModals();
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
    const statusSelect = document.getElementById('addMemberStatus');

    if (titleEl) titleEl.textContent = '👥 + Add Committee Member';
    if (editIdEl) editIdEl.value = '';
    if (nameInp) nameInp.value = '';
    if (roleSelect) roleSelect.value = 'Teacher Rep (SHS 2)';
    if (scopeSelect) scopeSelect.value = 'All Houses & Classes';
    if (usernameInp) usernameInp.value = '';
    if (statusSelect) statusSelect.value = 'Active';

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
    const statusSelect = document.getElementById('addMemberStatus');

    if (titleEl) titleEl.textContent = `✏️ Edit Committee Member: ${member.name}`;
    if (editIdEl) editIdEl.value = member.id;
    if (nameInp) nameInp.value = member.name;
    if (roleSelect) roleSelect.value = member.role || 'Teacher Rep (SHS 2)';
    if (scopeSelect) scopeSelect.value = member.scope || 'All Houses & Classes';
    if (usernameInp) usernameInp.value = member.username || '';
    if (statusSelect) statusSelect.value = member.status || 'Active';

    this.updateMemberPreview();
    modal.classList.add('active');
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
    const statusSelect = document.getElementById('addMemberStatus');

    const editId = editIdEl ? editIdEl.value : '';
    const name = nameInp ? nameInp.value.trim() : '';
    const role = roleSelect ? roleSelect.value : 'Teacher Rep (SHS 2)';
    const scope = scopeSelect ? scopeSelect.value : 'All Houses & Classes';
    const username = usernameInp ? usernameInp.value.trim() : 'user';
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
        status: status
      };
      this.store.state.members.push(newMember);
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
      const sClass = document.getElementById('addStudentClass').value;
      const sHouse = document.getElementById('addStudentHouse').value;
      const sGender = document.getElementById('addStudentGender').value;
      const sPhone = document.getElementById('addStudentPhone').value.trim();

      if (!name) return;

      const newId = `OLAG${String(app.store.state.students.length + 1).padStart(3, '0')}`;
      const newStudent = {
        id: newId,
        name,
        class: sClass,
        house: sHouse,
        gender: sGender,
        phone: sPhone || '024 123 4567',
        comment: 'Newly enrolled student for assessment.'
      };

      app.store.state.students.push(newStudent);
      app.store.state.totalStudentsCount = app.store.state.students.length;
      if (!app.store.state.selectedStudentId) {
        app.store.state.selectedStudentId = newId;
      }
      app.store.save();

      app.closeModals();
      formAddStudent.reset();
      app.showToast(`Added student: ${name} (${newId})`);
      app.render();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOLAGApp);
} else {
  initOLAGApp();
}
