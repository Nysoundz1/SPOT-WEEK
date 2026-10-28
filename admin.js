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
        key: 'admin',
        name: 'Rev. Fr. Principal',
        title: 'School Administrator',
        roleTag: 'Administrator (Head)',
        avatar: 'AD',
        avatarBg: '#0c2340',
        dashboardView: 'dashboard-admin',
        description: 'Complete institutional oversight, assessment management, criteria control, and student records.'
      };
    }
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
