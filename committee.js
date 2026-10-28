/**
 * OUR LADY OF GRACE SENIOR HIGH SCHOOL (OLAG SHS)
 * Dedicated Committee Member Portal Controller Configuration (committee.js)
 * Locks this portal instance strictly to the Committee Member / Evaluator role and session.
 */
(function () {
  window.OLAG_PORTAL_ROLE = 'committee';

  function enforceCommitteePortal() {
    if (!window.app || !window.app.store) return;
    const state = window.app.store.state;
    state.currentRoleKey = 'committee';
    if (!state.currentUser || state.currentUser.key !== 'committee') {
      const members = Array.isArray(state.members) ? state.members : [];
      const activeMember = members.find(m => m.id === state.selectedEvaluatorId) || members[0] || {
        id: 'committee-default',
        name: 'Committee Member',
        role: 'Evaluator',
        username: 'committee'
      };
      const initials = (activeMember.name || 'CM').split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
      state.currentUser = {
        id: activeMember.id,
        key: 'committee',
        name: activeMember.name,
        title: activeMember.role,
        roleTag: 'Committee Member',
        username: activeMember.username,
        avatar: initials,
        avatarBg: '#059669',
        dashboardView: 'dashboard-committee',
        description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
      };
    }
    if (
      !state.currentView ||
      state.currentView === 'dashboard-admin' ||
      state.currentView === 'committee' ||
      state.currentView === 'settings'
    ) {
      state.currentView = 'dashboard-committee';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enforceCommitteePortal);
  } else {
    enforceCommitteePortal();
  }
})();

