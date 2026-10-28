/**
 * OUR LADY OF GRACE SENIOR HIGH SCHOOL (OLAG SHS)
 * Dedicated Administrator Portal Controller Configuration (admin.js)
 * Locks this portal instance strictly to the Administrator role and session.
 */
(function () {
  window.OLAG_PORTAL_ROLE = 'admin';

  function enforceAdminPortal() {
    if (!window.app || !window.app.store) return;
    const state = window.app.store.state;
    state.currentRoleKey = 'admin';
    if (!state.currentUser || state.currentUser.key !== 'admin') {
      state.currentUser = {
        id: 'role-admin',
        key: 'admin',
        name: 'Administrator',
        title: 'System Administrator',
        roleTag: 'Administrator',
        username: 'admin',
        avatar: 'AD',
        avatarBg: '#0c2340',
        dashboardView: 'dashboard-admin',
        description: 'Full administrative oversight: all students, criteria rubric, week intervals, and reports.'
      };
    }
    state.selectedEvaluatorId = state.currentUser.id || 'role-admin';
    if (!state.currentView || state.currentView === 'dashboard-committee') {
      state.currentView = 'dashboard-admin';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enforceAdminPortal);
  } else {
    enforceAdminPortal();
  }
})();

