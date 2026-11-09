/**
 * OUR LADY OF GRACE SENIOR HIGH SCHOOL (OLAG SHS)
 * Student Personality of the Week Assessment System
 * Complete Multi-Role Dashboards & Login Logic
 */

// --- Modern SVG Vector Icons (Zero Unicode Emojis) ---
const APP_ICONS = {
  home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  students: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  assessment: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>',
  rankings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  committee: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  reports: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',
  user: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  userPlus: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  school: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="9" y2="9.01"/><line x1="15" y1="9" x2="15" y2="9.01"/><line x1="9" y1="15" x2="9" y2="15.01"/><line x1="15" y1="15" x2="15" y2="15.01"/><path d="M9 22V17h6v5"/></svg>',
  lock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  unlock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',
  clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  search: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  trophy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  download: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  fileText: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  printer: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
  sync: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  externalLink: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  database: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  sun: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  logout: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  award: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  archive: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>'
};

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
const MAX_BEST_STUDENTS_PER_WEEK = 4;

// Clean Initial State: Empty arrays for students, scores, and registered members
const COMMITTEE_MEMBERS = [];
const INITIAL_STUDENTS = [];
const INITIAL_SCORES = {};

// Default active open week interval for new entries (after past weeks moved to archive)
const DEFAULT_ACTIVE_WEEK = {
  id: 'week-current-9',
  no: 1,
  name: 'Week 9',
  dateRange: '08 Nov – 14 Nov 2026',
  startDate: '2026-11-08',
  endDate: '2026-11-14',
  topStudent: null,
  totalScore: null,
  maxScore: 70,
  percentage: null,
  status: 'Open',
  isCurrent: true,
  updatedAt: '2026-11-08T12:15:00.000Z'
};

// Default Past Weeks Evaluation Archive (Preserved historical evaluations for reference)
const DEFAULT_ARCHIVED_WEEKS = [
  {
    id: 'week-1793211322767',
    no: 1,
    name: 'Week 7/8',
    dateRange: '25 Oct – 07 Nov 2026',
    startDate: '2026-10-25',
    endDate: '2026-11-07',
    status: 'Archived',
    isArchived: true,
    isCurrent: false,
    maxScore: 70,
    topStudent: 'Emmanuel Asenso',
    totalScore: 52.8,
    percentage: 75.4,
    archivedAt: '2026-11-08T14:00:00.000Z',
    classes: ['2 Science 3', '2ARTS1', '3 sci 1', '1 SCIENCE 3'],
    students: [
      {
        id: 'OLAG003',
        name: 'Emmanuel Asenso',
        class: '2 Science 3',
        house: 'ST. THOMAS',
        gender: 'Male',
        comment: 'Student Personality of the Week — Week 7/8 (25 Oct – 07 Nov 2026).'
      },
      {
        id: 'OLAG001',
        name: 'JENINA AMPEH',
        class: '2ARTS1',
        house: 'ST. MARY',
        gender: 'Female',
        comment: 'Evaluated finalist in Week 7/8 (25 Oct – 07 Nov 2026).'
      },
      {
        id: 'OLAG004',
        name: 'Genevieve Olo Yeng',
        class: '3 sci 1',
        house: 'ST. MARY',
        gender: 'Female',
        comment: 'Evaluated finalist in Week 7/8 (25 Oct – 07 Nov 2026).'
      },
      {
        id: 'OLAG005',
        name: 'NHYIRA',
        class: '1 SCIENCE 3',
        house: 'ST. MARY',
        gender: 'Male',
        comment: 'Evaluated finalist in Week 7/8 (25 Oct – 07 Nov 2026).'
      }
    ],
    scores: {
      OLAG003: {
        'crit-1': 7.9,
        'crit-2': 7.9,
        'crit-3': 7.9,
        'crit-4': 7.3,
        'crit-5': 7.6,
        'crit-6': 7.3,
        'crit-7': 7,
        total: 52.8,
        combinedTotal: 422,
        maxCombinedScore: 560,
        pct: 75.4,
        evaluatorCount: 8,
        evaluatorId: 'mem-1793994914097-lge0',
        evaluatorName: 'Michael Angelo Gamlie Gbenyo, Leslie Nanchel Illedi, Adwoa Buruwaa-Buaten, Asempa B. Anson, Grace OWUSU APPIAH, Nibesob Sopiimeh, Faabar shalom, Nicole Mills',
        evaluatorRole: "Assistant Girls' Prefect",
        evaluatorUsername: '!n!',
        submittedAt: '2026-11-06T20:10:00.000Z',
        submissions: {
          'user:angelo': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 8, 'crit-4': 7, 'crit-5': 8, 'crit-6': 7, 'crit-7': 7,
            total: 53, pct: 75.7,
            evaluatorId: 'mem-1793217374637-9yde',
            evaluatorName: 'Michael Angelo Gamlie Gbenyo',
            evaluatorRole: "Head Boys' Prefect",
            evaluatorUsername: 'angelo',
            submittedAt: '2026-11-03T18:05:00.000Z'
          },
          'user:leslie': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 8, 'crit-4': 8, 'crit-5': 7, 'crit-6': 8, 'crit-7': 7,
            total: 54, pct: 77.1,
            evaluatorId: 'mem-1793217404925-baju',
            evaluatorName: 'Leslie Nanchel Illedi',
            evaluatorRole: "Assistant Boys' Prefect",
            evaluatorUsername: 'leslie',
            submittedAt: '2026-11-04T19:15:00.000Z'
          },
          'user:buruwaa': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 7, 'crit-4': 7, 'crit-5': 8, 'crit-6': 7, 'crit-7': 7,
            total: 52, pct: 74.3,
            evaluatorId: 'mem-1793387997565-mqzr',
            evaluatorName: 'Adwoa Buruwaa-Buaten',
            evaluatorRole: "DPT. GIRLS' PROTOCOL PREFECT",
            evaluatorUsername: 'buruwaa',
            submittedAt: '2026-11-05T08:20:00.000Z'
          },
          'user:theoracle': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 8, 'crit-4': 7, 'crit-5': 7, 'crit-6': 8, 'crit-7': 7,
            total: 53, pct: 75.7,
            evaluatorId: 'mem-1793457366101-iqj4',
            evaluatorName: 'Asempa B. Anson',
            evaluatorRole: "Head Girls' Protocol Prefect",
            evaluatorUsername: 'theoracle',
            submittedAt: '2026-11-05T14:40:00.000Z'
          },
          'user:grace': {
            'crit-1': 8, 'crit-2': 7, 'crit-3': 8, 'crit-4': 7, 'crit-5': 8, 'crit-6': 7, 'crit-7': 7,
            total: 52, pct: 74.3,
            evaluatorId: 'mem-1793508039037-78si',
            evaluatorName: 'Grace OWUSU APPIAH',
            evaluatorRole: "Head Girls' Prefect",
            evaluatorUsername: 'grace',
            submittedAt: '2026-11-05T16:10:00.000Z'
          },
          'user:nibs': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 8, 'crit-4': 8, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 53, pct: 75.7,
            evaluatorId: 'mem-1793900040105-0axn',
            evaluatorName: 'Nibesob Sopiimeh',
            evaluatorRole: "Assistant Boys' Protocol Prefect",
            evaluatorUsername: 'nibs',
            submittedAt: '2026-11-05T18:05:00.000Z'
          },
          'user:shalom': {
            'crit-1': 7, 'crit-2': 8, 'crit-3': 8, 'crit-4': 7, 'crit-5': 8, 'crit-6': 7, 'crit-7': 7,
            total: 52, pct: 74.3,
            evaluatorId: 'mem-1793992588719-e9f7',
            evaluatorName: 'Faabar shalom',
            evaluatorRole: "Head Boys' Protocol Prefect",
            evaluatorUsername: 'shalom',
            submittedAt: '2026-11-06T19:30:00.000Z'
          },
          'user:!n!': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 8, 'crit-4': 7, 'crit-5': 8, 'crit-6': 7, 'crit-7': 7,
            total: 53, pct: 75.7,
            evaluatorId: 'mem-1793994914097-lge0',
            evaluatorName: 'Nicole Mills',
            evaluatorRole: "Assistant Girls' Prefect",
            evaluatorUsername: '!n!',
            submittedAt: '2026-11-06T20:10:00.000Z'
          }
        }
      },
      OLAG001: {
        'crit-1': 7.5,
        'crit-2': 7.8,
        'crit-3': 7.8,
        'crit-4': 7.1,
        'crit-5': 7.1,
        'crit-6': 7.1,
        'crit-7': 7.1,
        total: 51.5,
        combinedTotal: 412,
        maxCombinedScore: 560,
        pct: 73.6,
        evaluatorCount: 8,
        evaluatorId: 'mem-1793994914097-lge0',
        evaluatorName: 'Michael Angelo Gamlie Gbenyo, Leslie Nanchel Illedi, Adwoa Buruwaa-Buaten, Asempa B. Anson, Grace OWUSU APPIAH, Nibesob Sopiimeh, Faabar shalom, Nicole Mills',
        evaluatorRole: "Assistant Girls' Prefect",
        evaluatorUsername: '!n!',
        submittedAt: '2026-11-06T20:05:00.000Z',
        submissions: {
          'user:angelo': {
            'crit-1': 8, 'crit-2': 9, 'crit-3': 8, 'crit-4': 8, 'crit-5': 8, 'crit-6': 8, 'crit-7': 8,
            total: 57, pct: 81.4,
            evaluatorId: 'mem-1793217374637-9yde',
            evaluatorName: 'Michael Angelo Gamlie Gbenyo',
            evaluatorRole: "Head Boys' Prefect",
            evaluatorUsername: 'angelo',
            submittedAt: '2026-11-04T23:05:19.092Z'
          },
          'user:leslie': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 8, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 52, pct: 74.3,
            evaluatorId: 'mem-1793217404925-baju',
            evaluatorName: 'Leslie Nanchel Illedi',
            evaluatorRole: "Assistant Boys' Prefect",
            evaluatorUsername: 'leslie',
            submittedAt: '2026-11-04T23:20:00.000Z'
          },
          'user:buruwaa': {
            'crit-1': 7, 'crit-2': 8, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 50, pct: 71.4,
            evaluatorId: 'mem-1793387997565-mqzr',
            evaluatorName: 'Adwoa Buruwaa-Buaten',
            evaluatorRole: "DPT. GIRLS' PROTOCOL PREFECT",
            evaluatorUsername: 'buruwaa',
            submittedAt: '2026-11-05T08:15:00.000Z'
          },
          'user:theoracle': {
            'crit-1': 8, 'crit-2': 7, 'crit-3': 8, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 51, pct: 72.9,
            evaluatorId: 'mem-1793457366101-iqj4',
            evaluatorName: 'Asempa B. Anson',
            evaluatorRole: "Head Girls' Protocol Prefect",
            evaluatorUsername: 'theoracle',
            submittedAt: '2026-11-05T14:35:00.000Z'
          },
          'user:grace': {
            'crit-1': 7, 'crit-2': 8, 'crit-3': 8, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 51, pct: 72.9,
            evaluatorId: 'mem-1793508039037-78si',
            evaluatorName: 'Grace OWUSU APPIAH',
            evaluatorRole: "Head Girls' Prefect",
            evaluatorUsername: 'grace',
            submittedAt: '2026-11-05T16:05:00.000Z'
          },
          'user:nibs': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 8, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 50, pct: 71.4,
            evaluatorId: 'mem-1793900040105-0axn',
            evaluatorName: 'Nibesob Sopiimeh',
            evaluatorRole: "Assistant Boys' Protocol Prefect",
            evaluatorUsername: 'nibs',
            submittedAt: '2026-11-05T18:00:00.000Z'
          },
          'user:shalom': {
            'crit-1': 7, 'crit-2': 8, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 50, pct: 71.4,
            evaluatorId: 'mem-1793992588719-e9f7',
            evaluatorName: 'Faabar shalom',
            evaluatorRole: "Head Boys' Protocol Prefect",
            evaluatorUsername: 'shalom',
            submittedAt: '2026-11-06T19:25:00.000Z'
          },
          'user:!n!': {
            'crit-1': 8, 'crit-2': 7, 'crit-3': 8, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 51, pct: 72.9,
            evaluatorId: 'mem-1793994914097-lge0',
            evaluatorName: 'Nicole Mills',
            evaluatorRole: "Assistant Girls' Prefect",
            evaluatorUsername: '!n!',
            submittedAt: '2026-11-06T20:05:00.000Z'
          }
        }
      },
      OLAG004: {
        'crit-1': 7.1,
        'crit-2': 7.5,
        'crit-3': 7.3,
        'crit-4': 7.1,
        'crit-5': 7.1,
        'crit-6': 7.1,
        'crit-7': 7,
        total: 50.3,
        combinedTotal: 402,
        maxCombinedScore: 560,
        pct: 71.9,
        evaluatorCount: 8,
        evaluatorId: 'mem-1793994914097-lge0',
        evaluatorName: 'Michael Angelo Gamlie Gbenyo, Leslie Nanchel Illedi, Adwoa Buruwaa-Buaten, Asempa B. Anson, Grace OWUSU APPIAH, Nibesob Sopiimeh, Faabar shalom, Nicole Mills',
        evaluatorRole: "Assistant Girls' Prefect",
        evaluatorUsername: '!n!',
        submittedAt: '2026-11-06T20:15:00.000Z',
        submissions: {
          'user:angelo': {
            'crit-1': 8, 'crit-2': 8, 'crit-3': 8, 'crit-4': 8, 'crit-5': 8, 'crit-6': 8, 'crit-7': 8,
            total: 56, pct: 80,
            evaluatorId: 'mem-1793217374637-9yde',
            evaluatorName: 'Michael Angelo Gamlie Gbenyo',
            evaluatorRole: "Head Boys' Prefect",
            evaluatorUsername: 'angelo',
            submittedAt: '2026-11-03T18:10:00.000Z'
          },
          'user:leslie': {
            'crit-1': 7, 'crit-2': 8, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 50, pct: 71.4,
            evaluatorId: 'mem-1793217404925-baju',
            evaluatorName: 'Leslie Nanchel Illedi',
            evaluatorRole: "Assistant Boys' Prefect",
            evaluatorUsername: 'leslie',
            submittedAt: '2026-11-04T23:25:00.000Z'
          },
          'user:buruwaa': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 49, pct: 70,
            evaluatorId: 'mem-1793387997565-mqzr',
            evaluatorName: 'Adwoa Buruwaa-Buaten',
            evaluatorRole: "DPT. GIRLS' PROTOCOL PREFECT",
            evaluatorUsername: 'buruwaa',
            submittedAt: '2026-11-05T08:25:00.000Z'
          },
          'user:theoracle': {
            'crit-1': 7, 'crit-2': 8, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 50, pct: 71.4,
            evaluatorId: 'mem-1793457366101-iqj4',
            evaluatorName: 'Asempa B. Anson',
            evaluatorRole: "Head Girls' Protocol Prefect",
            evaluatorUsername: 'theoracle',
            submittedAt: '2026-11-05T14:45:00.000Z'
          },
          'user:grace': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 8, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 50, pct: 71.4,
            evaluatorId: 'mem-1793508039037-78si',
            evaluatorName: 'Grace OWUSU APPIAH',
            evaluatorRole: "Head Girls' Prefect",
            evaluatorUsername: 'grace',
            submittedAt: '2026-11-05T16:15:00.000Z'
          },
          'user:nibs': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 49, pct: 70,
            evaluatorId: 'mem-1793900040105-0axn',
            evaluatorName: 'Nibesob Sopiimeh',
            evaluatorRole: "Assistant Boys' Protocol Prefect",
            evaluatorUsername: 'nibs',
            submittedAt: '2026-11-05T18:10:00.000Z'
          },
          'user:shalom': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 6,
            total: 48, pct: 68.6,
            evaluatorId: 'mem-1793992588719-e9f7',
            evaluatorName: 'Faabar shalom',
            evaluatorRole: "Head Boys' Protocol Prefect",
            evaluatorUsername: 'shalom',
            submittedAt: '2026-11-06T19:35:00.000Z'
          },
          'user:!n!': {
            'crit-1': 7, 'crit-2': 8, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 7,
            total: 50, pct: 71.4,
            evaluatorId: 'mem-1793994914097-lge0',
            evaluatorName: 'Nicole Mills',
            evaluatorRole: "Assistant Girls' Prefect",
            evaluatorUsername: '!n!',
            submittedAt: '2026-11-06T20:15:00.000Z'
          }
        }
      },
      OLAG005: {
        'crit-1': 7,
        'crit-2': 7,
        'crit-3': 6.9,
        'crit-4': 6.7,
        'crit-5': 7,
        'crit-6': 6.9,
        'crit-7': 6,
        total: 47.4,
        combinedTotal: 332,
        maxCombinedScore: 490,
        pct: 67.7,
        evaluatorCount: 7,
        evaluatorId: 'mem-1793994914097-lge0',
        evaluatorName: 'Michael Angelo Gamlie Gbenyo, Leslie Nanchel Illedi, Adwoa Buruwaa-Buaten, Grace OWUSU APPIAH, Nibesob Sopiimeh, Faabar shalom, Nicole Mills',
        evaluatorRole: "Assistant Girls' Prefect",
        evaluatorUsername: '!n!',
        submittedAt: '2026-11-06T20:20:00.000Z',
        submissions: {
          'user:angelo': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 6,
            total: 48, pct: 68.6,
            evaluatorId: 'mem-1793217374637-9yde',
            evaluatorName: 'Michael Angelo Gamlie Gbenyo',
            evaluatorRole: "Head Boys' Prefect",
            evaluatorUsername: 'angelo',
            submittedAt: '2026-11-03T18:15:00.000Z'
          },
          'user:leslie': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 6, 'crit-7': 6,
            total: 47, pct: 67.1,
            evaluatorId: 'mem-1793217404925-baju',
            evaluatorName: 'Leslie Nanchel Illedi',
            evaluatorRole: "Assistant Boys' Prefect",
            evaluatorUsername: 'leslie',
            submittedAt: '2026-11-04T23:30:00.000Z'
          },
          'user:buruwaa': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 6, 'crit-5': 7, 'crit-6': 7, 'crit-7': 6,
            total: 47, pct: 67.1,
            evaluatorId: 'mem-1793387997565-mqzr',
            evaluatorName: 'Adwoa Buruwaa-Buaten',
            evaluatorRole: "DPT. GIRLS' PROTOCOL PREFECT",
            evaluatorUsername: 'buruwaa',
            submittedAt: '2026-11-05T08:30:00.000Z'
          },
          'user:grace': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 6,
            total: 48, pct: 68.6,
            evaluatorId: 'mem-1793508039037-78si',
            evaluatorName: 'Grace OWUSU APPIAH',
            evaluatorRole: "Head Girls' Prefect",
            evaluatorUsername: 'grace',
            submittedAt: '2026-11-05T16:20:00.000Z'
          },
          'user:nibs': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 6, 'crit-5': 7, 'crit-6': 7, 'crit-7': 6,
            total: 47, pct: 67.1,
            evaluatorId: 'mem-1793900040105-0axn',
            evaluatorName: 'Nibesob Sopiimeh',
            evaluatorRole: "Assistant Boys' Protocol Prefect",
            evaluatorUsername: 'nibs',
            submittedAt: '2026-11-05T18:15:00.000Z'
          },
          'user:shalom': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 6, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 6,
            total: 47, pct: 67.1,
            evaluatorId: 'mem-1793992588719-e9f7',
            evaluatorName: 'Faabar shalom',
            evaluatorRole: "Head Boys' Protocol Prefect",
            evaluatorUsername: 'shalom',
            submittedAt: '2026-11-06T19:40:00.000Z'
          },
          'user:!n!': {
            'crit-1': 7, 'crit-2': 7, 'crit-3': 7, 'crit-4': 7, 'crit-5': 7, 'crit-6': 7, 'crit-7': 6,
            total: 48, pct: 68.6,
            evaluatorId: 'mem-1793994914097-lge0',
            evaluatorName: 'Nicole Mills',
            evaluatorRole: "Assistant Girls' Prefect",
            evaluatorUsername: '!n!',
            submittedAt: '2026-11-06T20:20:00.000Z'
          }
        }
      }
    },
    nominations: []
  }
];

// Students added to the active evaluation cycle are accepted unconditionally
const LEGACY_HIDDEN_STUDENT_NAMES = new Set([]);
const LEGACY_HIDDEN_CLASSES = new Set([]);

function isLegacyHiddenStudent(studentOrName) {
  return false;
}

function containsLegacyHiddenStudentName(text) {
  return false;
}

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
    this.adminSessionKey = 'OLAG_SHS_ADMIN_SESSION';
    this.committeeSessionKey = 'OLAG_SHS_COMMITTEE_SESSION';
    this.dbConfigKey = 'OLAG_SUPABASE_CONFIG';
    this.supabase = null;
    this.realtimeChannel = null;
    this.realtimeSubscribed = false;
    this.syncTimeout = null;
    this.onStateUpdatedCallback = null;
    this.tableNeedsSetup = false;
    this.state = this.loadState();
  }

  getPortalRole() {
    if (typeof window !== 'undefined') {
      if (window.OLAG_PORTAL_ROLE === 'admin' || window.OLAG_PORTAL_ROLE === 'committee') {
        return window.OLAG_PORTAL_ROLE;
      }
      if (typeof document !== 'undefined' && document.body && document.body.dataset && document.body.dataset.portalRole) {
        return document.body.dataset.portalRole;
      }
    }
    return null;
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
    let hasLocalOnlyItems = false;

    const deletedMembers = new Set([
      ...(Array.isArray(this.state.deletedMemberIds) ? this.state.deletedMemberIds : []),
      ...(Array.isArray(remoteState.deletedMemberIds) ? remoteState.deletedMemberIds : [])
    ]);
    this.state.deletedMemberIds = [...deletedMembers];

    const deletedStudents = new Set([
      ...(Array.isArray(this.state.deletedStudentIds) ? this.state.deletedStudentIds : []),
      ...(Array.isArray(remoteState.deletedStudentIds) ? remoteState.deletedStudentIds : [])
    ]);
    this.state.deletedStudentIds = [...deletedStudents];

    const deletedWeeks = new Set([
      ...(Array.isArray(this.state.deletedWeekIds) ? this.state.deletedWeekIds : []),
      ...(Array.isArray(remoteState.deletedWeekIds) ? remoteState.deletedWeekIds : [])
    ]);
    this.state.deletedWeekIds = [...deletedWeeks];

    const deletedClasses = new Set([
      ...(Array.isArray(this.state.deletedClasses) ? this.state.deletedClasses : []),
      ...(Array.isArray(remoteState.deletedClasses) ? remoteState.deletedClasses : [])
    ]);
    this.state.deletedClasses = [...deletedClasses];

    const dismissedNotifs = new Set([
      ...(Array.isArray(this.state.dismissedNotificationIds) ? this.state.dismissedNotificationIds : []),
      ...(Array.isArray(remoteState.dismissedNotificationIds) ? remoteState.dismissedNotificationIds : [])
    ]);
    this.state.dismissedNotificationIds = [...dismissedNotifs];

    const deletedNominations = new Set([
      ...(Array.isArray(this.state.deletedNominationIds) ? this.state.deletedNominationIds : []),
      ...(Array.isArray(remoteState.deletedNominationIds) ? remoteState.deletedNominationIds : [])
    ]);
    this.state.deletedNominationIds = [...deletedNominations];

    const deletedArchives = new Set([
      ...(Array.isArray(this.state.deletedArchiveIds) ? this.state.deletedArchiveIds : []),
      ...(Array.isArray(remoteState.deletedArchiveIds) ? remoteState.deletedArchiveIds : [])
    ]);
    this.state.deletedArchiveIds = [...deletedArchives];

    // 0. Merge Past Weeks Evaluation Archive non-destructively
    if (Array.isArray(remoteState.archivedWeeks) || Array.isArray(this.state.archivedWeeks)) {
      const remoteArch = (Array.isArray(remoteState.archivedWeeks) ? remoteState.archivedWeeks : []).filter(a => a && a.id && !deletedArchives.has(a.id));
      const localArch = (Array.isArray(this.state.archivedWeeks) ? this.state.archivedWeeks : []).filter(a => a && a.id && !deletedArchives.has(a.id));
      const archMap = new Map();
      remoteArch.forEach(a => archMap.set(a.id, a));
      localArch.forEach(a => {
        if (!archMap.has(a.id)) {
          archMap.set(a.id, a);
          hasLocalOnlyItems = true;
        } else {
          const existing = archMap.get(a.id);
          if (a.archivedAt && (!existing.archivedAt || a.archivedAt > existing.archivedAt)) {
            archMap.set(a.id, a);
            hasLocalOnlyItems = true;
          }
        }
      });
      this.state.archivedWeeks = [...archMap.values()];
    }

    // 1. Merge Members non-destructively so all 8 registered committee members are preserved
    if (Array.isArray(remoteState.members)) {
      const remoteMembers = remoteState.members.filter(m => m && m.id && !deletedMembers.has(m.id));
      const localMembers = (Array.isArray(this.state.members) ? this.state.members : []).filter(m => m && m.id && !deletedMembers.has(m.id));
      const mergedMap = new Map();
      const usernameMap = new Map();

      remoteMembers.forEach(m => {
        mergedMap.set(m.id, m);
        if (m.username) usernameMap.set(String(m.username).toLowerCase(), m.id);
      });

      localMembers.forEach(m => {
        const uKey = m.username ? String(m.username).toLowerCase() : '';
        if (!mergedMap.has(m.id) && (!uKey || !usernameMap.has(uKey))) {
          mergedMap.set(m.id, m);
          if (uKey) usernameMap.set(uKey, m.id);
          hasLocalOnlyItems = true;
        } else if (mergedMap.has(m.id)) {
          const existing = mergedMap.get(m.id);
          if (m.updatedAt && (!existing.updatedAt || m.updatedAt > existing.updatedAt)) {
            mergedMap.set(m.id, m);
            hasLocalOnlyItems = true;
          }
        }
      });

      this.state.members = [...mergedMap.values()].map((m, idx) => ({ ...m, no: idx + 1 }));
    }

    // 2. Merge Students non-destructively (filtering out hidden legacy test students)
    const remoteLegacyStudentIds = new Set();
    if (Array.isArray(remoteState.students)) {
      remoteState.students.forEach(s => {
        if (s && s.id && isLegacyHiddenStudent(s)) {
          remoteLegacyStudentIds.add(s.id);
          hasLocalOnlyItems = true;
        }
      });
    }
    const localLegacyStudentIds = new Set();
    if (Array.isArray(this.state.students)) {
      this.state.students.forEach(s => {
        if (s && s.id && isLegacyHiddenStudent(s)) {
          localLegacyStudentIds.add(s.id);
        }
      });
    }

    if (Array.isArray(remoteState.students)) {
      const remoteStudents = remoteState.students.filter(s => s && s.id && !deletedStudents.has(s.id) && !isLegacyHiddenStudent(s));
      const localStudents = (Array.isArray(this.state.students) ? this.state.students : []).filter(s => s && s.id && !deletedStudents.has(s.id) && !isLegacyHiddenStudent(s));
      const studentMap = new Map();
      remoteStudents.forEach(s => studentMap.set(s.id, s));
      localStudents.forEach(s => {
        if (!studentMap.has(s.id)) {
          studentMap.set(s.id, s);
          hasLocalOnlyItems = true;
        } else {
          const existing = studentMap.get(s.id);
          if (s.updatedAt && (!existing.updatedAt || s.updatedAt > existing.updatedAt)) {
            studentMap.set(s.id, s);
            hasLocalOnlyItems = true;
          }
        }
      });
      this.state.students = [...studentMap.values()];
    }

    // 3. Merge Weeks (excluding past archived weeks such as Week 7/8)
    if (Array.isArray(remoteState.weeks)) {
      const archivedIdSet = new Set(
        (Array.isArray(this.state.archivedWeeks) ? this.state.archivedWeeks : [])
          .concat(DEFAULT_ARCHIVED_WEEKS)
          .map(a => a && a.id)
          .filter(Boolean)
      );
      const isPastArchivedWeek = (w) => {
        if (!w || !w.id) return true;
        if (archivedIdSet.has(w.id)) return true;
        if (String(w.name || '').trim().toLowerCase() === 'week 7/8') return true;
        if (w.status === 'Archived' || w.isArchived) return true;
        return false;
      };
      remoteState.weeks.forEach(w => {
        if (w && isPastArchivedWeek(w)) {
          hasLocalOnlyItems = true;
        }
      });
      const remoteWeeks = remoteState.weeks.filter(w => w && w.id && !deletedWeeks.has(w.id) && !isPastArchivedWeek(w)).map(w => {
        if (w.maxScore === 80 || !w.maxScore) w.maxScore = 70;
        if (w.topStudent && isLegacyHiddenStudent(w.topStudent)) {
          w.topStudent = null;
          w.totalScore = null;
          w.percentage = null;
          hasLocalOnlyItems = true;
        }
        return w;
      });
      const localWeeks = (Array.isArray(this.state.weeks) ? this.state.weeks : []).filter(w => w && w.id && !deletedWeeks.has(w.id) && !isPastArchivedWeek(w));
      const weekMap = new Map();
      remoteWeeks.forEach(w => weekMap.set(w.id, w));
      localWeeks.forEach(w => {
        if (!weekMap.has(w.id)) {
          weekMap.set(w.id, w);
          hasLocalOnlyItems = true;
        } else {
          const existing = weekMap.get(w.id);
          if (w.updatedAt && (!existing.updatedAt || w.updatedAt > existing.updatedAt)) {
            weekMap.set(w.id, w);
            hasLocalOnlyItems = true;
          }
        }
      });
      this.state.weeks = [...weekMap.values()];
    }

    // 4. Merge Scores (Preserving every committee member's score submission per active student)
    if ((remoteState.scores && typeof remoteState.scores === 'object') || (this.state.scores && typeof this.state.scores === 'object')) {
      const remoteScores = (remoteState.scores && typeof remoteState.scores === 'object') ? remoteState.scores : {};
      const localScores = (this.state.scores && typeof this.state.scores === 'object') ? this.state.scores : {};
      const allWeekIds = new Set([...Object.keys(remoteScores), ...Object.keys(localScores)]);
      const mergedScores = {};
      const activeStudentIds = new Set((this.state.students || []).map(s => s && s.id).filter(Boolean));

      allWeekIds.forEach(wId => {
        const rWeekMap = (remoteScores[wId] && typeof remoteScores[wId] === 'object') ? remoteScores[wId] : {};
        const lWeekMap = (localScores[wId] && typeof localScores[wId] === 'object') ? localScores[wId] : {};
        const allStudentIds = new Set([...Object.keys(rWeekMap), ...Object.keys(lWeekMap)]);
        const weekObj = (Array.isArray(this.state.weeks) ? this.state.weeks : []).find(w => w && w.id === wId);
        const maxScore = (weekObj && weekObj.maxScore) ? weekObj.maxScore : 70;
        mergedScores[wId] = {};

        allStudentIds.forEach(sId => {
          if (!activeStudentIds.has(sId)) {
            if (rWeekMap[sId]) hasLocalOnlyItems = true;
            return;
          }
          const rRaw = remoteLegacyStudentIds.has(sId) ? null : rWeekMap[sId];
          const lRaw = localLegacyStudentIds.has(sId) ? null : lWeekMap[sId];
          const rNorm = this.normalizeStudentWeekScore(rRaw, maxScore);
          const lNorm = this.normalizeStudentWeekScore(lRaw, maxScore);
          if (!rNorm && lNorm) {
            mergedScores[wId][sId] = lNorm;
            hasLocalOnlyItems = true;
          } else if (rNorm && !lNorm) {
            mergedScores[wId][sId] = rNorm;
          } else if (rNorm && lNorm) {
            const combinedSubs = { ...(rNorm.submissions || {}) };
            Object.entries(lNorm.submissions || {}).forEach(([evalKey, lSub]) => {
              const rSub = combinedSubs[evalKey];
              if (!rSub) {
                combinedSubs[evalKey] = lSub;
                hasLocalOnlyItems = true;
              } else if (lSub && lSub.submittedAt && (!rSub.submittedAt || lSub.submittedAt > rSub.submittedAt)) {
                combinedSubs[evalKey] = lSub;
                hasLocalOnlyItems = true;
              }
            });
            const normalizedMerged = this.normalizeStudentWeekScore({ submissions: combinedSubs }, maxScore);
            if (normalizedMerged) {
              mergedScores[wId][sId] = normalizedMerged;
            }
          }
        });
      });
      this.state.scores = mergedScores;
    }

    // 5. Merge Classes & Houses
    if (Array.isArray(remoteState.classes)) {
      const localClasses = Array.isArray(this.state.classes) ? this.state.classes : [];
      this.state.classes = [...new Set([...remoteState.classes, ...localClasses])].filter(c => c && !deletedClasses.has(c));
    }
    if (Array.isArray(remoteState.houses)) this.state.houses = remoteState.houses;

    // 6. Merge Notifications
    if (Array.isArray(remoteState.notifications)) {
      const localNotifs = Array.isArray(this.state.notifications) ? this.state.notifications : [];
      const notifMap = new Map();
      remoteState.notifications.forEach(n => {
        if (n && n.id && !dismissedNotifs.has(n.id) && !containsLegacyHiddenStudentName(n.title) && !containsLegacyHiddenStudentName(n.message)) {
          notifMap.set(n.id, n);
        }
      });
      localNotifs.forEach(n => {
        if (n && n.id && !dismissedNotifs.has(n.id) && !notifMap.has(n.id) && !containsLegacyHiddenStudentName(n.title) && !containsLegacyHiddenStudentName(n.message)) {
          notifMap.set(n.id, n);
          hasLocalOnlyItems = true;
        }
      });
      this.state.notifications = [...notifMap.values()];
    }

    // 7. Merge Nominations non-destructively (excluding hidden legacy test students)
    if (Array.isArray(remoteState.nominations) || Array.isArray(this.state.nominations)) {
      const activeStudentIds = new Set((this.state.students || []).map(s => s && s.id).filter(Boolean));
      const isValidNomination = (n) => {
        if (!n || !n.id || deletedNominations.has(n.id)) return false;
        if (isLegacyHiddenStudent(n)) return false;
        if (String(n.id).startsWith('nom-week-')) return false;
        if (!activeStudentIds.has(n.studentId)) return false;
        return true;
      };
      const remoteNoms = (Array.isArray(remoteState.nominations) ? remoteState.nominations : []).filter(isValidNomination);
      const localNoms = (Array.isArray(this.state.nominations) ? this.state.nominations : []).filter(isValidNomination);
      const nomMap = new Map();

      remoteNoms.forEach(n => nomMap.set(n.id, n));
      localNoms.forEach(n => {
        if (!nomMap.has(n.id)) {
          nomMap.set(n.id, n);
          hasLocalOnlyItems = true;
        } else {
          const existing = nomMap.get(n.id);
          const mergedEndorsementsMap = new Map();
          const addEndorsements = (arr) => {
            if (!Array.isArray(arr)) return;
            arr.forEach(e => {
              if (!e) return;
              const k = String(e.evaluatorKey || e.evaluatorId || e.evaluatorName || '').trim().toLowerCase();
              if (k) mergedEndorsementsMap.set(k, e);
            });
          };
          addEndorsements(existing.endorsements);
          addEndorsements(n.endorsements);
          const mergedEndorsements = [...mergedEndorsementsMap.values()];

          if (n.updatedAt && (!existing.updatedAt || n.updatedAt > existing.updatedAt)) {
            nomMap.set(n.id, { ...existing, ...n, endorsements: mergedEndorsements });
            hasLocalOnlyItems = true;
          } else if (mergedEndorsements.length > (Array.isArray(existing.endorsements) ? existing.endorsements.length : 0)) {
            nomMap.set(n.id, { ...existing, endorsements: mergedEndorsements });
            hasLocalOnlyItems = true;
          }
        }
      });
      this.state.nominations = [...nomMap.values()];
    }

    if (remoteState.selectedWeekId) this.state.selectedWeekId = remoteState.selectedWeekId;

    const isLegacyCriteria = !Array.isArray(remoteState.criteria) ||
      remoteState.criteria.length !== CRITERIA_LIST.length ||
      remoteState.criteria.some(c => c.name === 'Neatness & Appearance' || c.name === 'Teamwork' || c.name === 'Academic Attitude' || c.name === 'Courtesy / Respect');

    if (isLegacyCriteria) {
      this.state.criteria = CRITERIA_LIST;
    } else {
      this.state.criteria = remoteState.criteria;
    }

    const prevSelectedEvaluatorId = this.state.selectedEvaluatorId;
    this.normalizeStudentsAndClasses(this.state);
    this.applyPortalSession(this.state);
    if (prevSelectedEvaluatorId && this.state.currentRoleKey === 'admin') {
      this.state.selectedEvaluatorId = prevSelectedEvaluatorId;
    }
    this.syncEvaluatorWithCurrentLogin(this.state);
    this.state.theme = localStorage.getItem('olag_theme') || this.state.theme || 'light';

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}

    if (hasLocalOnlyItems) {
      this.scheduleSupabaseSync();
    }
  }

  normalizeStudentsAndClasses(stateObj) {
    if (!stateObj || typeof stateObj !== 'object') return;
    if (!Array.isArray(stateObj.students)) stateObj.students = [];
    if (!Array.isArray(stateObj.houses) || stateObj.houses.length === 0) stateObj.houses = [...HOUSES_LIST];
    if (!Array.isArray(stateObj.deletedClasses)) stateObj.deletedClasses = [];
    const deletedClassesSet = new Set(stateObj.deletedClasses);

    // Filter out hidden legacy demo/test students so fresh student entries start cleanly
    const legacyStudentIds = new Set();
    stateObj.students.forEach(s => {
      if (s && s.id && isLegacyHiddenStudent(s)) {
        legacyStudentIds.add(s.id);
      }
    });
    stateObj.students = stateObj.students.filter(s => s && !isLegacyHiddenStudent(s));

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
      if (!s.status) s.status = 'Accepted';
      if (typeof s.accepted !== 'boolean') s.accepted = true;
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

    const activeStudentIds = new Set(stateObj.students.map(s => s && s.id).filter(Boolean));
    const activeStudentClassesLower = new Set(
      stateObj.students.map(s => String(s && s.class ? s.class : '').trim().toLowerCase()).filter(Boolean)
    );

    if (!Array.isArray(stateObj.classes)) {
      stateObj.classes = CLASSES_LIST.filter(c => !deletedClassesSet.has(c));
    } else {
      stateObj.classes = stateObj.classes.filter(c => {
        if (!c || deletedClassesSet.has(c)) return false;
        const cLower = String(c).trim().toLowerCase();
        if (LEGACY_HIDDEN_CLASSES.has(cLower) && !activeStudentClassesLower.has(cLower)) {
          return false;
        }
        return true;
      });
    }

    // Ensure every active student class exists in stateObj.classes (unless deleted by admin or unassigned)
    stateObj.students.forEach(s => {
      if (s && s.class && s.class !== 'Unassigned' && !deletedClassesSet.has(s.class) && !stateObj.classes.includes(s.class)) {
        stateObj.classes.push(s.class);
      }
    });

    // Normalize all weekly student score records (excluding hidden legacy or non-enrolled student IDs)
    if (!stateObj.scores || typeof stateObj.scores !== 'object') {
      stateObj.scores = {};
    } else {
      const weeks = Array.isArray(stateObj.weeks) ? stateObj.weeks : [];
      Object.entries(stateObj.scores).forEach(([wId, wMap]) => {
        if (!wMap || typeof wMap !== 'object') return;
        const wObj = weeks.find(w => w && w.id === wId);
        const maxScore = (wObj && wObj.maxScore) ? wObj.maxScore : 70;
        Object.entries(wMap).forEach(([sId, rawEntry]) => {
          if (legacyStudentIds.has(sId) || !activeStudentIds.has(sId)) {
            delete wMap[sId];
            return;
          }
          const norm = this.normalizeStudentWeekScore(rawEntry, maxScore);
          if (norm) {
            wMap[sId] = norm;
          } else {
            delete wMap[sId];
          }
        });
      });
    }

    // Recalculate week winners so hidden legacy students do not appear on week cards
    if (!Array.isArray(stateObj.deletedArchiveIds)) stateObj.deletedArchiveIds = [];
    const deletedArchSet = new Set(stateObj.deletedArchiveIds);
    if (!Array.isArray(stateObj.archivedWeeks)) stateObj.archivedWeeks = [];
    stateObj.archivedWeeks = stateObj.archivedWeeks.filter(a => a && a.id && !deletedArchSet.has(a.id));

    // Ensure DEFAULT_ARCHIVED_WEEKS (Week 7/8 evaluation) is always preserved in the Archive unless explicitly deleted
    DEFAULT_ARCHIVED_WEEKS.forEach(defArch => {
      if (!defArch || !defArch.id || deletedArchSet.has(defArch.id)) return;
      const existingArch = stateObj.archivedWeeks.find(a => a && (a.id === defArch.id || String(a.name || '').trim().toLowerCase() === String(defArch.name || '').trim().toLowerCase()));
      if (!existingArch) {
        stateObj.archivedWeeks.push(JSON.parse(JSON.stringify(defArch)));
      } else {
        const isStaleSingleEvalSnapshot = defArch.id === 'week-1793211322767' && (
          !existingArch.scores ||
          !existingArch.scores.OLAG003 ||
          (existingArch.scores.OLAG003.evaluatorCount || 1) < 8
        );
        if (isStaleSingleEvalSnapshot) {
          existingArch.students = JSON.parse(JSON.stringify(defArch.students));
          existingArch.scores = JSON.parse(JSON.stringify(defArch.scores));
          existingArch.classes = [...(defArch.classes || [])];
          existingArch.topStudent = defArch.topStudent;
          existingArch.totalScore = defArch.totalScore;
          existingArch.percentage = defArch.percentage;
          existingArch.archivedAt = defArch.archivedAt;
        } else {
          if (!Array.isArray(existingArch.students) || existingArch.students.length === 0) {
            existingArch.students = JSON.parse(JSON.stringify(defArch.students));
          }
          if (!existingArch.scores || typeof existingArch.scores !== 'object' || Object.keys(existingArch.scores).length === 0) {
            existingArch.scores = JSON.parse(JSON.stringify(defArch.scores));
          }
          if (!Array.isArray(existingArch.classes) || existingArch.classes.length === 0) {
            existingArch.classes = [...(defArch.classes || [])];
          }
        }
        existingArch.status = 'Archived';
        existingArch.isArchived = true;
      }
    });

    // Merge any current live scores into archived weeks before cleaning stateObj.scores
    stateObj.archivedWeeks.forEach(arch => {
      if (!arch || !arch.id) return;
      const liveWeekScores = (stateObj.scores && stateObj.scores[arch.id] && typeof stateObj.scores[arch.id] === 'object')
        ? stateObj.scores[arch.id]
        : null;
      if (liveWeekScores && Object.keys(liveWeekScores).length > 0) {
        if (!arch.scores || typeof arch.scores !== 'object') arch.scores = {};
        const archMax = arch.maxScore || 70;
        Object.entries(liveWeekScores).forEach(([sId, liveRaw]) => {
          const liveNorm = this.normalizeStudentWeekScore(liveRaw, archMax);
          const archNorm = this.normalizeStudentWeekScore(arch.scores[sId], archMax);
          if (liveNorm && !archNorm) {
            arch.scores[sId] = liveNorm;
          } else if (liveNorm && archNorm) {
            const mergedSubs = { ...(archNorm.submissions || {}), ...(liveNorm.submissions || {}) };
            const combined = this.normalizeStudentWeekScore({ submissions: mergedSubs }, archMax);
            if (combined) arch.scores[sId] = combined;
          }
        });
      }
    });

    // Normalize scores and winners inside all archived weeks
    stateObj.archivedWeeks.forEach(arch => {
      if (!arch || !arch.id) return;
      arch.status = 'Archived';
      arch.isArchived = true;
      arch.isCurrent = false;
      const archMax = arch.maxScore || 70;
      arch.maxScore = archMax;
      if (!Array.isArray(arch.students)) arch.students = [];
      if (!arch.scores || typeof arch.scores !== 'object') arch.scores = {};

      let bestArchTotal = -1;
      let bestArchName = null;
      let bestArchPct = null;
      Object.entries(arch.scores).forEach(([sId, rawSc]) => {
        const normSc = this.normalizeStudentWeekScore(rawSc, archMax);
        if (normSc) {
          arch.scores[sId] = normSc;
          if (typeof normSc.total === 'number' && normSc.total > bestArchTotal) {
            const st = arch.students.find(s => s && s.id === sId);
            bestArchTotal = normSc.total;
            bestArchName = st ? st.name : (normSc.studentName || sId);
            bestArchPct = normSc.pct;
          }
        } else {
          delete arch.scores[sId];
        }
      });
      if (bestArchName) {
        arch.topStudent = bestArchName;
        arch.totalScore = bestArchTotal;
        arch.percentage = bestArchPct;
      }
    });

    const archivedWeekIds = new Set(stateObj.archivedWeeks.map(a => a && a.id).filter(Boolean));
    const archivedWeekNamesLower = new Set(stateObj.archivedWeeks.map(a => String((a && a.name) || '').trim().toLowerCase()).filter(Boolean));

    // Remove any archived week (such as Week 7/8) from active stateObj.weeks
    if (!Array.isArray(stateObj.weeks)) stateObj.weeks = [];
    stateObj.weeks = stateObj.weeks.filter(w => {
      if (!w || !w.id) return false;
      if (archivedWeekIds.has(w.id)) return false;
      if (archivedWeekNamesLower.has(String(w.name || '').trim().toLowerCase())) return false;
      if (w.status === 'Archived' || w.isArchived) return false;
      return true;
    });

    // Clean archived week IDs out of active stateObj.scores so active scores stay lean
    archivedWeekIds.forEach(aId => {
      if (stateObj.scores && stateObj.scores[aId]) {
        delete stateObj.scores[aId];
      }
    });

    // Ensure there is an active open week interval ready for new student nominations & evaluations
    const deletedWeekIdsSet = new Set(Array.isArray(stateObj.deletedWeekIds) ? stateObj.deletedWeekIds : []);
    if (stateObj.weeks.length === 0 && !deletedWeekIdsSet.has(DEFAULT_ACTIVE_WEEK.id)) {
      stateObj.weeks.push({ ...DEFAULT_ACTIVE_WEEK });
    }

    if (Array.isArray(stateObj.weeks)) {
      stateObj.weeks.forEach(w => {
        if (!w || !w.id) return;
        const wScores = (stateObj.scores && stateObj.scores[w.id]) || {};
        let bestTotal = -1;
        let bestName = null;
        let bestPct = null;
        Object.entries(wScores).forEach(([sId, sc]) => {
          if (sc && typeof sc.total === 'number' && sc.total > bestTotal) {
            const st = stateObj.students.find(s => s && s.id === sId);
            if (st) {
              bestTotal = sc.total;
              bestName = st.name;
              bestPct = sc.pct;
            }
          }
        });
        if (bestName) {
          w.topStudent = bestName;
          w.totalScore = bestTotal;
          w.percentage = bestPct;
        } else {
          w.topStudent = null;
          w.totalScore = null;
          w.percentage = null;
        }
      });
    }

    if (!stateObj.selectedArchiveWeekId || !archivedWeekIds.has(stateObj.selectedArchiveWeekId)) {
      stateObj.selectedArchiveWeekId = stateObj.archivedWeeks[0] ? stateObj.archivedWeeks[0].id : null;
    }

    const activeWeekIds = new Set(stateObj.weeks.map(w => w && w.id).filter(Boolean));
    if (!stateObj.selectedWeekId || (!activeWeekIds.has(stateObj.selectedWeekId) && !archivedWeekIds.has(stateObj.selectedWeekId))) {
      const currentActive = stateObj.weeks.find(w => w && w.isCurrent) || stateObj.weeks[0] || null;
      stateObj.selectedWeekId = currentActive ? currentActive.id : null;
    } else if (archivedWeekIds.has(stateObj.selectedWeekId) && stateObj.currentView !== 'rankings' && stateObj.currentView !== 'reports') {
      const currentActive = stateObj.weeks.find(w => w && w.isCurrent) || stateObj.weeks[0] || null;
      if (currentActive) stateObj.selectedWeekId = currentActive.id;
    }

    // Ensure stateObj.nominations and stateObj.deletedNominationIds exist & strip hidden legacy nominations
    if (!Array.isArray(stateObj.nominations)) stateObj.nominations = [];
    if (!Array.isArray(stateObj.deletedNominationIds)) stateObj.deletedNominationIds = [];
    const deletedNomsSet = new Set(stateObj.deletedNominationIds);
    stateObj.nominations = stateObj.nominations.filter(n => {
      if (!n || !n.id || deletedNomsSet.has(n.id)) return false;
      if (isLegacyHiddenStudent(n)) return false;
      if (String(n.id).startsWith('nom-week-')) return false;
      if (!activeStudentIds.has(n.studentId)) return false;
      return true;
    });

    // Normalize 2-Stage Review & Best 4 Selection state per week interval
    const nomsByWeek = {};
    stateObj.nominations.forEach(n => {
      if (!n) return;
      const st = stateObj.students.find(s => s && s.id === n.studentId);
      if (st) {
        n.studentName = st.name;
        n.studentClass = st.class;
        n.studentHouse = st.house;
      }
      const nomKey = String(n.nominatedByUsername || n.nominatedById || n.nominatedByName || 'nominator').trim().toLowerCase();
      if (!Array.isArray(n.endorsements) || n.endorsements.length === 0) {
        n.endorsements = [{
          evaluatorKey: nomKey,
          evaluatorId: n.nominatedById || 'evaluator',
          evaluatorName: n.nominatedByName || 'Committee Member',
          evaluatorRole: n.nominatedByRole || 'Evaluator',
          endorsedAt: n.nominatedAt || new Date().toISOString()
        }];
      } else {
        const seenEndorsers = new Set();
        n.endorsements = n.endorsements.filter(e => {
          if (!e) return false;
          const k = String(e.evaluatorKey || e.evaluatorId || e.evaluatorName || '').trim().toLowerCase();
          if (!k || seenEndorsers.has(k)) return false;
          seenEndorsers.add(k);
          e.evaluatorKey = k;
          return true;
        });
      }
      const isSelected = Boolean(n.selectedForEvaluation === true || n.status === 'Selected');
      n.status = isSelected ? 'Selected' : 'Pending Review';
      n.selectedForEvaluation = isSelected;
      if (!nomsByWeek[n.weekId]) nomsByWeek[n.weekId] = [];
      nomsByWeek[n.weekId].push(n);
    });

    // Enforce max 4 selected Best Students per week interval & assign slot 1..4
    Object.values(nomsByWeek).forEach(weekNoms => {
      const selectedList = weekNoms
        .filter(n => n.selectedForEvaluation)
        .sort((a, b) => {
          const slotA = typeof a.selectedRankSlot === 'number' && a.selectedRankSlot > 0 ? a.selectedRankSlot : 999;
          const slotB = typeof b.selectedRankSlot === 'number' && b.selectedRankSlot > 0 ? b.selectedRankSlot : 999;
          if (slotA !== slotB) return slotA - slotB;
          const tA = a.selectedAt || a.nominatedAt || '';
          const tB = b.selectedAt || b.nominatedAt || '';
          return tA.localeCompare(tB);
        });

      selectedList.forEach((n, idx) => {
        if (idx < MAX_BEST_STUDENTS_PER_WEEK) {
          n.status = 'Selected';
          n.selectedForEvaluation = true;
          n.selectedRankSlot = idx + 1;
        } else {
          n.status = 'Pending Review';
          n.selectedForEvaluation = false;
          n.selectedRankSlot = null;
        }
      });

      weekNoms.filter(n => !n.selectedForEvaluation).forEach(n => {
        n.status = 'Pending Review';
        n.selectedForEvaluation = false;
        n.selectedRankSlot = null;
      });
    });

    stateObj.totalStudentsCount = stateObj.students.length;
    if (stateObj.selectedStudentId && !activeStudentIds.has(stateObj.selectedStudentId)) {
      stateObj.selectedStudentId = stateObj.students[0] ? stateObj.students[0].id : null;
    }

    this.syncDerivedNotifications(stateObj);
  }

  getEvaluatorScoreKey(info) {
    if (!info || typeof info !== 'object') return 'evaluator';
    const u = String(info.evaluatorUsername || info.username || '').trim().toLowerCase();
    const id = String(info.evaluatorId || info.id || '').trim().toLowerCase();
    const name = String(info.evaluatorName || info.name || '').trim().toLowerCase();
    if (u && u !== 'committee') return `user:${u}`;
    if (id && id !== 'role-committee' && id !== 'committee-default') return `id:${id}`;
    if (name) return `name:${name}`;
    return u || id || 'evaluator';
  }

  normalizeStudentWeekScore(rawEntry, maxScore = 70) {
    if (!rawEntry || typeof rawEntry !== 'object') return null;
    const submissions = {};
    const nameToKey = {};

    if (rawEntry.submissions && typeof rawEntry.submissions === 'object') {
      Object.entries(rawEntry.submissions).forEach(([k, sub]) => {
        if (sub && typeof sub === 'object' && typeof sub.total === 'number') {
          const cleanName = String(sub.evaluatorName || '').trim().toLowerCase();
          let cleanKey = this.getEvaluatorScoreKey(sub) || k;
          if (cleanName && nameToKey[cleanName]) {
            cleanKey = nameToKey[cleanName];
          } else if (cleanName) {
            nameToKey[cleanName] = cleanKey;
          }
          const existing = submissions[cleanKey];
          if (!existing || (sub.submittedAt && (!existing.submittedAt || sub.submittedAt > existing.submittedAt))) {
            submissions[cleanKey] = { ...(existing || {}), ...sub };
          }
        }
      });
    }

    // Legacy single-evaluator score entry support
    if (Object.keys(submissions).length === 0 && typeof rawEntry.total === 'number') {
      const legacySub = {
        total: rawEntry.total,
        pct: typeof rawEntry.pct === 'number' ? rawEntry.pct : Number(((rawEntry.total / maxScore) * 100).toFixed(1)),
        evaluatorId: rawEntry.evaluatorId || 'evaluator',
        evaluatorName: rawEntry.evaluatorName || 'Committee Evaluator',
        evaluatorRole: rawEntry.evaluatorRole || 'Evaluator',
        evaluatorUsername: rawEntry.evaluatorUsername || '',
        submittedAt: rawEntry.submittedAt || new Date().toISOString()
      };
      CRITERIA_LIST.forEach(c => {
        legacySub[c.id] = typeof rawEntry[c.id] === 'number' ? rawEntry[c.id] : 0;
      });
      const key = this.getEvaluatorScoreKey(legacySub);
      submissions[key] = legacySub;
    }

    const subList = Object.values(submissions).filter(s => s && typeof s.total === 'number');
    if (subList.length === 0) return null;

    subList.sort((a, b) => String(a.submittedAt || '').localeCompare(String(b.submittedAt || '')));

    const criteriaAverages = {};
    CRITERIA_LIST.forEach(c => {
      const sumC = subList.reduce((acc, s) => acc + (typeof s[c.id] === 'number' ? s[c.id] : 0), 0);
      criteriaAverages[c.id] = Number((sumC / subList.length).toFixed(1));
    });

    const combinedTotal = subList.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
    const avgTotal = Number((combinedTotal / subList.length).toFixed(1));
    const avgPct = Number(((avgTotal / maxScore) * 100).toFixed(1));
    const latestSub = subList[subList.length - 1];
    const evaluatorNamesList = subList.map(s => s.evaluatorName || 'Evaluator');

    return {
      ...criteriaAverages,
      total: avgTotal,
      combinedTotal,
      maxCombinedScore: subList.length * maxScore,
      pct: avgPct,
      evaluatorCount: subList.length,
      evaluatorId: latestSub.evaluatorId || 'evaluator',
      evaluatorName: subList.length === 1 ? (latestSub.evaluatorName || 'Committee Evaluator') : evaluatorNamesList.join(', '),
      evaluatorRole: latestSub.evaluatorRole || 'Evaluator',
      evaluatorUsername: latestSub.evaluatorUsername || '',
      submittedAt: latestSub.submittedAt || new Date().toISOString(),
      submissions
    };
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
      const existingNotif = stateObj.notifications.find(n => n && n.id === notifId);
      if (existingNotif) {
        existingNotif.title = `Committee Member Registered: ${m.name}`;
        existingNotif.message = `${m.name} (${m.role || 'Evaluator'}) is registered (${m.status || 'Active'}) under scope "${m.scope || 'All Houses & Classes'}" with username "${m.username}".`;
      } else if (!dismissed.has(notifId)) {
        stateObj.notifications.unshift({
          id: notifId,
          type: 'member',
          icon: 'member',
          title: `Committee Member Registered: ${m.name}`,
          message: `${m.name} (${m.role || 'Evaluator'}) is registered (${m.status || 'Active'}) under scope "${m.scope || 'All Houses & Classes'}" with username "${m.username}".`,
          actionLabel: 'View in Directory',
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
        const st = students.find(s => s.id === studentId);
        const studentName = st ? `${st.name} (${st.class})` : studentId;
        const subMap = (sc.submissions && typeof sc.submissions === 'object' && Object.keys(sc.submissions).length > 0)
          ? sc.submissions
          : { [this.getEvaluatorScoreKey(sc)]: sc };

        Object.entries(subMap).forEach(([evalKey, sub]) => {
          if (!sub || typeof sub.total !== 'number') return;
          const safeKey = String(evalKey).replace(/[^a-z0-9_-]/gi, '_');
          const notifId = `notif-score-${weekId}-${studentId}-${safeKey}`;
          const legacyNotifId = `notif-score-${weekId}-${studentId}`;
          if (!existingIds.has(notifId) && !dismissed.has(notifId) && !dismissed.has(legacyNotifId)) {
            const evalName = sub.evaluatorName || 'Committee Evaluator';
            stateObj.notifications.unshift({
              id: notifId,
              type: 'score',
              icon: 'score',
              title: `Assessment Scores Submitted (${weekLabel})`,
              message: `${evalName} (${sub.evaluatorRole || 'Evaluator'}) submitted scores for ${studentName}: ${sub.total}/${maxScore} (${sub.pct}%).`,
              actionLabel: 'View Scores',
              actionView: 'rankings',
              unread: true,
              createdAt: sub.submittedAt || new Date().toISOString()
            });
            existingIds.add(notifId);
          }
        });
      });
    });

    // Filter out any notification that was dismissed or whose member/student was deleted or hidden
    const activeMemberIds = new Set(members.map(m => `notif-member-${m.id}`));
    const activeStudentIds = new Set(students.map(s => s && s.id).filter(Boolean));
    const activeStudentNotifIds = new Set(students.map(s => `notif-student-${s.id}`));
    stateObj.notifications = stateObj.notifications.filter(n => {
      if (!n || !n.id || dismissed.has(n.id)) return false;
      if (n.id.startsWith('notif-nom-')) return false;
      if (containsLegacyHiddenStudentName(n.title) || containsLegacyHiddenStudentName(n.message)) return false;
      if (n.id.startsWith('notif-member-') && !activeMemberIds.has(n.id)) return false;
      if (n.id.startsWith('notif-student-') && !activeStudentNotifIds.has(n.id)) return false;
      if (n.id.startsWith('notif-score-')) {
        let belongsToActiveStudent = false;
        activeStudentIds.forEach(sId => {
          if (n.id.includes(`-${sId}-`) || n.id.endsWith(`-${sId}`)) belongsToActiveStudent = true;
        });
        if (!belongsToActiveStudent) return false;
      }
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
      deletedMemberIds: this.state.deletedMemberIds || [],
      deletedStudentIds: this.state.deletedStudentIds || [],
      deletedWeekIds: this.state.deletedWeekIds || [],
      deletedClasses: this.state.deletedClasses || [],
      nominations: this.state.nominations || [],
      deletedNominationIds: this.state.deletedNominationIds || [],
      archivedWeeks: this.state.archivedWeeks || [],
      deletedArchiveIds: this.state.deletedArchiveIds || [],
      selectedArchiveWeekId: this.state.selectedArchiveWeekId || null,
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
    let parsed = null;
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        parsed = JSON.parse(saved);
        parsed.theme = localStorage.getItem('olag_theme') || parsed.theme || 'light';
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
      }
    } catch (e) {
      console.warn('Failed to parse state:', e);
    }
    if (!parsed) {
      parsed = this.getInitialState();
      this.normalizeStudentsAndClasses(parsed);
    }
    this.applyPortalSession(parsed);
    this.syncEvaluatorWithCurrentLogin(parsed);
    return parsed;
  }

  syncEvaluatorWithCurrentLogin(stateObj) {
    if (!stateObj || typeof stateObj !== 'object') return;
    const isCommittee = stateObj.currentRoleKey === 'committee';
    if (!isCommittee) {
      stateObj.currentRoleKey = 'admin';
      if (!stateObj.currentUser || stateObj.currentUser.key !== 'admin') {
        stateObj.currentUser = { ...SYSTEM_ROLES.ADMIN };
      }
      const members = Array.isArray(stateObj.members) ? stateObj.members : [];
      const hasValidSelectedMember = stateObj.selectedEvaluatorId && members.some(m => m && m.id === stateObj.selectedEvaluatorId);
      if (!hasValidSelectedMember) {
        stateObj.selectedEvaluatorId = members[0] ? members[0].id : (stateObj.currentUser.id || 'role-admin');
      }
    } else {
      const members = Array.isArray(stateObj.members) ? stateObj.members : [];
      const cur = stateObj.currentUser;
      let matched = null;
      if (cur && cur.key === 'committee') {
        matched = members.find(m =>
          (cur.id && m.id === cur.id) ||
          (cur.username && m.username && m.username.toLowerCase() === cur.username.toLowerCase()) ||
          (cur.name && m.name && m.name.toLowerCase() === cur.name.toLowerCase())
        );
      }
      if (!matched && stateObj.selectedEvaluatorId && stateObj.selectedEvaluatorId !== 'role-admin') {
        matched = members.find(m => m.id === stateObj.selectedEvaluatorId);
      }
      if (matched) {
        const initials = matched.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
        stateObj.currentUser = {
          id: matched.id,
          key: 'committee',
          name: matched.name,
          title: matched.role || 'Evaluator',
          roleTag: matched.role || 'Committee Member',
          username: matched.username,
          avatar: initials,
          avatarBg: '#059669',
          dashboardView: 'dashboard-committee',
          description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
        };
        stateObj.selectedEvaluatorId = matched.id;
      } else if (cur && cur.key === 'committee') {
        const initials = (cur.name || 'CM').split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
        stateObj.currentUser = {
          ...cur,
          id: cur.id || 'role-committee',
          key: 'committee',
          avatar: cur.avatar || initials,
          avatarBg: cur.avatarBg || '#059669',
          title: cur.title || cur.roleTag || 'Evaluator',
          roleTag: cur.title || cur.roleTag || 'Committee Member'
        };
        stateObj.selectedEvaluatorId = stateObj.currentUser.id;
      } else {
        stateObj.currentUser = { ...SYSTEM_ROLES.COMMITTEE };
        stateObj.selectedEvaluatorId = stateObj.currentUser.id || 'role-committee';
      }
    }
  }

  applyPortalSession(stateObj) {
    if (!stateObj || typeof stateObj !== 'object') return;
    const portalRole = this.getPortalRole();
    if (!portalRole) return;

    if (portalRole === 'admin') {
      stateObj.currentRoleKey = 'admin';
      stateObj.activeLoginTab = 'admin';
      let session = null;
      try {
        const raw = localStorage.getItem(this.adminSessionKey);
        if (raw) session = JSON.parse(raw);
      } catch (e) {}
      if (session && typeof session === 'object') {
        stateObj.isLoggedIn = typeof session.isLoggedIn === 'boolean' ? session.isLoggedIn : true;
        if (session.selectedEvaluatorId) stateObj.selectedEvaluatorId = session.selectedEvaluatorId;
        stateObj.currentUser = (session.currentUser && session.currentUser.key === 'admin') ? session.currentUser : SYSTEM_ROLES.ADMIN;
        if (session.currentView && session.currentView !== 'dashboard-committee') {
          stateObj.currentView = session.currentView;
        }
      } else {
        stateObj.currentUser = SYSTEM_ROLES.ADMIN;
        if (typeof document !== 'undefined' && !document.getElementById('screenLoginWrapper')) {
          stateObj.isLoggedIn = true;
        }
      }
      if (!stateObj.currentView || stateObj.currentView === 'dashboard-committee') {
        stateObj.currentView = 'dashboard-admin';
      }
    } else if (portalRole === 'committee') {
      stateObj.currentRoleKey = 'committee';
      stateObj.activeLoginTab = 'committee';
      let session = null;
      try {
        const raw = localStorage.getItem(this.committeeSessionKey);
        if (raw) session = JSON.parse(raw);
      } catch (e) {}
      const members = Array.isArray(stateObj.members) ? stateObj.members : [];
      if (session && typeof session === 'object') {
        stateObj.isLoggedIn = typeof session.isLoggedIn === 'boolean' ? session.isLoggedIn : true;
        if (session.selectedEvaluatorId) stateObj.selectedEvaluatorId = session.selectedEvaluatorId;
        if (session.currentUser && session.currentUser.key === 'committee') {
          stateObj.currentUser = session.currentUser;
        }
        if (session.currentView && session.currentView !== 'dashboard-admin' && session.currentView !== 'committee' && session.currentView !== 'settings') {
          stateObj.currentView = session.currentView;
        }
      } else if (typeof document !== 'undefined' && !document.getElementById('screenLoginWrapper')) {
        stateObj.isLoggedIn = true;
      }

      if (!stateObj.currentUser || stateObj.currentUser.key !== 'committee') {
        const matched = members.find(m => m.id === stateObj.selectedEvaluatorId) || members[0];
        if (matched) {
          const initials = matched.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
          stateObj.currentUser = {
            id: matched.id,
            key: 'committee',
            name: matched.name,
            title: matched.role || 'Evaluator',
            roleTag: 'Committee Member',
            username: matched.username,
            avatar: initials,
            avatarBg: '#059669',
            dashboardView: 'dashboard-committee',
            description: 'Evaluator interface: assessment queue, 7-criteria scoring form, and personal progress.'
          };
          stateObj.selectedEvaluatorId = matched.id;
        } else {
          stateObj.currentUser = { ...SYSTEM_ROLES.COMMITTEE, id: 'committee-default' };
          stateObj.selectedEvaluatorId = 'committee-default';
        }
      }

      if (!stateObj.currentView || stateObj.currentView === 'dashboard-admin' || stateObj.currentView === 'committee' || stateObj.currentView === 'settings') {
        stateObj.currentView = 'dashboard-committee';
      }
    }
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
      deletedMemberIds: [],
      deletedStudentIds: [],
      deletedWeekIds: [],
      nominations: [],
      deletedNominationIds: [],
      archivedWeeks: JSON.parse(JSON.stringify(DEFAULT_ARCHIVED_WEEKS)),
      deletedArchiveIds: [],
      selectedArchiveWeekId: DEFAULT_ARCHIVED_WEEKS[0] ? DEFAULT_ARCHIVED_WEEKS[0].id : null,
      theme: localStorage.getItem('olag_theme') || 'light',
      sidebarCollapsed: false,
      dashInfoHidden: false
    };
  }

  getArchivedWeeks() {
    return Array.isArray(this.state.archivedWeeks) ? this.state.archivedWeeks : [];
  }

  getArchivedWeekById(weekId) {
    if (!weekId) return null;
    const archList = this.getArchivedWeeks();
    return archList.find(a => a && a.id === weekId) || null;
  }

  save() {
    try {
      const portalRole = this.getPortalRole() || this.state.currentRoleKey;
      if (portalRole === 'admin') {
        localStorage.setItem(this.adminSessionKey, JSON.stringify({
          isLoggedIn: Boolean(this.state.isLoggedIn),
          currentRoleKey: 'admin',
          currentUser: this.state.currentUser,
          currentView: this.state.currentView,
          selectedEvaluatorId: this.state.selectedEvaluatorId
        }));
      } else if (portalRole === 'committee') {
        localStorage.setItem(this.committeeSessionKey, JSON.stringify({
          isLoggedIn: Boolean(this.state.isLoggedIn),
          currentRoleKey: 'committee',
          currentUser: this.state.currentUser,
          currentView: this.state.currentView,
          selectedEvaluatorId: this.state.selectedEvaluatorId
        }));
      }
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Save failed:', e);
    }
    this.scheduleSupabaseSync();
  }

  getNominationsForWeek(weekId) {
    if (!weekId || !Array.isArray(this.state.nominations)) return [];
    return this.state.nominations.filter(n => n && n.weekId === weekId);
  }

  getPendingReviewNominationsForWeek(weekId) {
    const noms = this.getNominationsForWeek(weekId);
    return noms.filter(n => !n.selectedForEvaluation && n.status !== 'Selected');
  }

  getSelectedBestFourNominations(weekId) {
    const noms = this.getNominationsForWeek(weekId);
    return noms
      .filter(n => Boolean(n.selectedForEvaluation || n.status === 'Selected'))
      .sort((a, b) => {
        const slotA = typeof a.selectedRankSlot === 'number' && a.selectedRankSlot > 0 ? a.selectedRankSlot : 999;
        const slotB = typeof b.selectedRankSlot === 'number' && b.selectedRankSlot > 0 ? b.selectedRankSlot : 999;
        if (slotA !== slotB) return slotA - slotB;
        return String(a.selectedAt || a.nominatedAt || '').localeCompare(String(b.selectedAt || b.nominatedAt || ''));
      })
      .slice(0, MAX_BEST_STUDENTS_PER_WEEK);
  }

  getSelectedBestFourStudentIds(weekId) {
    return this.getSelectedBestFourNominations(weekId).map(n => n.studentId);
  }

  getSelectedBestFourStudents(weekId) {
    const selectedNoms = this.getSelectedBestFourNominations(weekId);
    const students = Array.isArray(this.state.students) ? this.state.students : [];
    return selectedNoms
      .map(n => students.find(s => s && s.id === n.studentId))
      .filter(Boolean);
  }

  isStudentSelectedInBestFour(studentId, weekId) {
    if (!studentId || !weekId) return false;
    return this.getSelectedBestFourNominations(weekId).some(n => n && n.studentId === studentId);
  }

  getNominatedStudentIds(weekId) {
    const noms = this.getNominationsForWeek(weekId);
    return noms.map(n => n.studentId);
  }

  isStudentNominated(studentId, weekId) {
    if (!studentId || !weekId || !Array.isArray(this.state.nominations)) return false;
    return this.state.nominations.some(n => n && n.studentId === studentId && n.weekId === weekId);
  }

  getNominationForStudent(studentId, weekId) {
    if (!studentId || !weekId || !Array.isArray(this.state.nominations)) return null;
    return this.state.nominations.find(n => n && n.studentId === studentId && n.weekId === weekId) || null;
  }

  resequenceBestFourSlots(weekId) {
    if (!weekId || !Array.isArray(this.state.nominations)) return;
    const selected = this.state.nominations
      .filter(n => n && n.weekId === weekId && (n.selectedForEvaluation || n.status === 'Selected'))
      .sort((a, b) => {
        const slotA = typeof a.selectedRankSlot === 'number' && a.selectedRankSlot > 0 ? a.selectedRankSlot : 999;
        const slotB = typeof b.selectedRankSlot === 'number' && b.selectedRankSlot > 0 ? b.selectedRankSlot : 999;
        if (slotA !== slotB) return slotA - slotB;
        return String(a.selectedAt || a.nominatedAt || '').localeCompare(String(b.selectedAt || b.nominatedAt || ''));
      });

    selected.forEach((n, idx) => {
      if (idx < MAX_BEST_STUDENTS_PER_WEEK) {
        n.status = 'Selected';
        n.selectedForEvaluation = true;
        n.selectedRankSlot = idx + 1;
      } else {
        n.status = 'Pending Review';
        n.selectedForEvaluation = false;
        n.selectedRankSlot = null;
      }
    });
  }

  addNomination(data) {
    if (!data || !data.studentId || !data.weekId) return null;
    if (!Array.isArray(this.state.nominations)) this.state.nominations = [];
    if (!Array.isArray(this.state.deletedNominationIds)) this.state.deletedNominationIds = [];

    const existingIdx = this.state.nominations.findIndex(n => n && n.studentId === data.studentId && n.weekId === data.weekId);
    const existingNom = existingIdx >= 0 ? this.state.nominations[existingIdx] : null;
    const id = (existingNom && existingNom.id)
      ? existingNom.id
      : (data.id || `nom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`);

    const student = (Array.isArray(this.state.students) ? this.state.students : []).find(s => s && s.id === data.studentId);
    const nomById = data.nominatedById || (existingNom ? existingNom.nominatedById : (this.state.currentUser ? this.state.currentUser.id : 'evaluator'));
    const nomByName = data.nominatedByName || (existingNom ? existingNom.nominatedByName : (this.state.currentUser ? this.state.currentUser.name : 'Committee Member'));
    const nomByRole = data.nominatedByRole || (existingNom ? existingNom.nominatedByRole : (this.state.currentUser ? (this.state.currentUser.title || this.state.currentUser.roleTag) : 'Evaluator'));
    const nomByUsername = data.nominatedByUsername || (existingNom ? existingNom.nominatedByUsername : (this.state.currentUser ? this.state.currentUser.username : ''));
    const endorserKey = String(data.nominatedByUsername || data.nominatedById || data.nominatedByName || nomByUsername || nomById || nomByName || 'evaluator').trim().toLowerCase();

    const endorsements = Array.isArray(existingNom && existingNom.endorsements)
      ? [...existingNom.endorsements]
      : [];
    if (!endorsements.some(e => e && String(e.evaluatorKey || e.evaluatorId || e.evaluatorName || '').trim().toLowerCase() === endorserKey)) {
      endorsements.push({
        evaluatorKey: endorserKey,
        evaluatorId: data.nominatedById || nomById,
        evaluatorName: data.nominatedByName || nomByName,
        evaluatorRole: data.nominatedByRole || nomByRole,
        endorsedAt: new Date().toISOString()
      });
    }

    const currentSelectedInWeek = this.getSelectedBestFourNominations(data.weekId).filter(n => n.id !== id);
    const wantsSelected = typeof data.selectedForEvaluation === 'boolean'
      ? data.selectedForEvaluation
      : (data.status === 'Selected' ? true : (existingNom ? Boolean(existingNom.selectedForEvaluation || existingNom.status === 'Selected') : false));
    const canSelect = wantsSelected && currentSelectedInWeek.length < MAX_BEST_STUDENTS_PER_WEEK;

    const nomRecord = {
      id,
      studentId: data.studentId,
      studentName: student ? student.name : (data.studentName || 'Student'),
      studentClass: student ? student.class : (data.studentClass || ''),
      studentHouse: student ? student.house : (data.studentHouse || ''),
      weekId: data.weekId,
      nominatedById: existingNom ? existingNom.nominatedById : nomById,
      nominatedByName: existingNom ? existingNom.nominatedByName : nomByName,
      nominatedByRole: existingNom ? existingNom.nominatedByRole : nomByRole,
      nominatedByUsername: existingNom ? existingNom.nominatedByUsername : nomByUsername,
      citation: String(data.citation || data.reason || (existingNom && existingNom.citation) || 'Outstanding character, punctuality, and exemplary conduct.').trim(),
      tags: Array.isArray(data.tags) && data.tags.length > 0 ? data.tags : ((existingNom && existingNom.tags) || ['Exemplary Conduct']),
      status: canSelect ? 'Selected' : 'Pending Review',
      selectedForEvaluation: canSelect,
      selectedRankSlot: canSelect ? ((existingNom && existingNom.selectedRankSlot) || (currentSelectedInWeek.length + 1)) : null,
      selectedAt: canSelect ? ((existingNom && existingNom.selectedAt) || new Date().toISOString()) : null,
      selectedBy: canSelect ? ((existingNom && existingNom.selectedBy) || nomByName) : null,
      endorsements,
      nominatedAt: (existingNom && existingNom.nominatedAt) ? existingNom.nominatedAt : (data.nominatedAt || new Date().toISOString()),
      updatedAt: new Date().toISOString()
    };

    if (existingIdx >= 0) {
      this.state.nominations[existingIdx] = nomRecord;
    } else {
      this.state.nominations.unshift(nomRecord);
    }

    this.resequenceBestFourSlots(data.weekId);
    this.state.deletedNominationIds = this.state.deletedNominationIds.filter(dId => dId !== nomRecord.id);
    this.syncDerivedNotifications(this.state);
    this.save();
    return nomRecord;
  }

  removeNomination(nominationId) {
    if (!nominationId || !Array.isArray(this.state.nominations)) return false;
    const target = this.state.nominations.find(n => n && n.id === nominationId);
    const targetWeekId = target ? target.weekId : null;
    const initialLen = this.state.nominations.length;
    this.state.nominations = this.state.nominations.filter(n => n && n.id !== nominationId);
    if (this.state.nominations.length < initialLen) {
      if (targetWeekId) this.resequenceBestFourSlots(targetWeekId);
      if (!Array.isArray(this.state.deletedNominationIds)) this.state.deletedNominationIds = [];
      if (!this.state.deletedNominationIds.includes(nominationId)) {
        this.state.deletedNominationIds.push(nominationId);
      }
      this.save();
      return true;
    }
    return false;
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
    this.applyTheme(localStorage.getItem('olag_theme') || this.store.state.theme || 'light');
    this.applySidebarState();
    this.bindEvents();
    window.addEventListener('resize', () => this.applySidebarState());
    window.addEventListener('storage', (e) => {
      if (e.key === 'olag_theme' && e.newValue) {
        this.applyTheme(e.newValue);
        return;
      }
      if (e.key === this.store.storageKey) {
        this.store.state = this.store.loadState();
        this.applyTheme(this.store.state.theme || 'light');
        this.render();
      }
    });
    const refreshFromFocus = () => {
      const now = Date.now();
      if (this._lastFocusRefreshAt && now - this._lastFocusRefreshAt < 1000) return;
      this._lastFocusRefreshAt = now;
      this.store.state = this.store.loadState();
      this.applyTheme(this.store.state.theme || 'light');
      this.store.fetchFromSupabase();
      this.render();
    };
    window.addEventListener('focus', refreshFromFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        refreshFromFocus();
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
    const resolved = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolved);
    this.store.state.theme = resolved;
    localStorage.setItem('olag_theme', resolved);
    this.updateThemeUI();
  }

  toggleTheme() {
    const now = Date.now();
    if (this._lastThemeToggleAt && now - this._lastThemeToggleAt < 150) return;
    this._lastThemeToggleAt = now;

    const currentDomTheme = document.documentElement.getAttribute('data-theme');
    const currentTheme = currentDomTheme || localStorage.getItem('olag_theme') || this.store.state.theme || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme) {
    const resolved = theme === 'dark' ? 'dark' : 'light';
    this.applyTheme(resolved);
    try {
      localStorage.setItem(this.store.storageKey, JSON.stringify(this.store.state));
    } catch (e) {}
    this.showToast(`Switched to ${resolved === 'dark' ? 'Dark' : 'Light'} Mode`);
    if (this.store.state.currentView === 'settings') {
      this.renderSettings();
    }
  }

  updateThemeUI() {
    const currentDomTheme = document.documentElement.getAttribute('data-theme');
    const isDark = (currentDomTheme || this.store.state.theme) === 'dark';
    const iconEl = document.getElementById('themeIconIndicator');
    const labelEl = document.getElementById('themeLabelIndicator');
    if (iconEl) iconEl.innerHTML = isDark ? APP_ICONS.sun : APP_ICONS.moon;
    if (labelEl) labelEl.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }

  // --- Sidebar Collapse Management (Desktop & Mobile Drawer) ---
  applySidebarState() {
    const shell = document.getElementById('screenAppShell');
    const arrow = document.getElementById('sidebarArrowIcon');
    if (!shell) return;
    if (window.innerWidth <= 768) {
      const isMobileOpen = shell.classList.contains('mobile-sidebar-open');
      if (arrow) arrow.textContent = isMobileOpen ? '×' : '≡';
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
      if (arrow) arrow.textContent = isMobileOpen ? '×' : '≡';
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
    if (arrow && window.innerWidth <= 768) arrow.textContent = '≡';
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
        btnTogglePwd.innerHTML = APP_ICONS.eyeOff;
        btnTogglePwd.title = 'Hide Password';
      }
    } else {
      pwdInput.type = 'password';
      if (btnTogglePwd) {
        btnTogglePwd.innerHTML = APP_ICONS.eye;
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

  async handleCommitteeLogin() {
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

    const findMatchingMember = () => (this.store.state.members || []).find(m =>
      m && (
        (m.username && String(m.username).toLowerCase() === username) ||
        (m.name && String(m.name).toLowerCase() === username) ||
        (m.name && String(m.name).toLowerCase().includes(username))
      )
    );

    // Check existing or newly registered committee member (sync from cloud if not yet loaded locally)
    let matchedMember = findMatchingMember();
    if (!matchedMember && this.store.supabase) {
      try {
        await Promise.race([
          this.store.fetchFromSupabase(),
          new Promise(resolve => setTimeout(resolve, 1500))
        ]);
        matchedMember = findMatchingMember();
      } catch (e) {}
    }

    if (matchedMember) {
      if (matchedMember.status === 'Inactive') {
        this.showToast(`Account for ${matchedMember.name} is currently Inactive. Please contact the Administrator.`);
        return;
      }
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
        title: matchedMember.role || 'Evaluator',
        roleTag: matchedMember.role || 'Committee Member',
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
      if (typeof window !== 'undefined' && window.location) {
        const href = (window.location.href || '').toLowerCase();
        const pathname = (window.location.pathname || '').toLowerCase();
        if (href.includes('committee-login') || pathname.includes('committee-login') || href.includes('committee-register') || pathname.includes('committee-register')) {
          window.location.href = 'committee-dashboard.html';
          return;
        }
      }
      this.render();
      this.showToast(`Logged in as ${matchedMember.name} (${matchedMember.role})`);
      return;
    }

    this.showToast('Committee member not found. Please register or check your username.');
  }

  async handleCommitteeRegister() {
    const nameInp = document.getElementById('regCommitteeName');
    const roleInp = document.getElementById('regCommitteeRole');
    const userInp = document.getElementById('regCommitteeUsername');
    const passInp = document.getElementById('regCommitteePassword');
    const confirmInp = document.getElementById('regCommitteeConfirmPassword');

    const name = nameInp ? nameInp.value.trim() : '';
    const role = roleInp ? roleInp.value.trim() : "Head Boys' Prefect";
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
      this.showToast('Please enter a username.');
      if (userInp) userInp.focus();
      return;
    }

    if (username.length < 2) {
      this.showToast('Username must be at least 2 characters.');
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

    const existingMember = this.store.state.members.find(m => m.username && m.username.toLowerCase() === username);
    if (existingMember) {
      this.showToast(`Username '${username}' is already registered for ${existingMember.name}. Please choose another.`);
      if (userInp) userInp.focus();
      return;
    }

    const newId = `mem-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
    const newMember = {
      id: newId,
      no: this.store.state.members.length + 1,
      name: name,
      role: role,
      scope: 'All Houses & Classes',
      username: username,
      password: password,
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    if (Array.isArray(this.store.state.deletedMemberIds)) {
      this.store.state.deletedMemberIds = this.store.state.deletedMemberIds.filter(id => id !== newId);
    }
    this.store.state.members.push(newMember);
    this.addNotification({
      id: `notif-member-${newMember.id}`,
      type: 'member',
      icon: 'member',
      title: `Committee Member Registered: ${newMember.name}`,
      message: `${newMember.name} (${newMember.role}) registered with username "${newMember.username}" and is Active for student assessments.`,
      actionLabel: 'View in Directory',
      actionView: 'committee'
    });

    const roleObj = {
      id: newMember.id,
      key: 'committee',
      name: newMember.name,
      title: newMember.role || 'Evaluator',
      roleTag: newMember.role || 'Committee Member',
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
    try {
      await Promise.race([
        this.store.syncToSupabase(true),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
    } catch (e) {}
    if (typeof window !== 'undefined' && window.location) {
      const href = (window.location.href || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      if (href.includes('committee-login') || pathname.includes('committee-login') || href.includes('committee-register') || pathname.includes('committee-register')) {
        window.location.href = 'committee-dashboard.html';
        return;
      }
    }
    this.render();
    this.showToast(`Registered successfully! Welcome, ${newMember.name}.`);
  }

  handleLoginByRole(roleKey) {
    const isCommittee = roleKey === 'committee';
    let role;
    if (isCommittee) {
      role = {
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
      };
      this.store.state.selectedEvaluatorId = role.id;
    } else {
      role = { ...SYSTEM_ROLES.ADMIN };
      this.store.state.selectedEvaluatorId = role.id;
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
      if (href.includes('admin-login') || pathname.includes('admin-login')) {
        window.location.href = 'admin-dashboard.html';
        return;
      }
      if (href.includes('committee-login') || pathname.includes('committee-login') || href.includes('committee-register') || pathname.includes('committee-register')) {
        window.location.href = 'committee-dashboard.html';
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

    // Guard for standalone login/register pages (committee-login.html, committee-register.html, admin-login.html)
    if (!appShell) {
      if (loginWrapper) loginWrapper.style.display = 'flex';
      return;
    }

    if (!isLoggedIn) {
      if (loginWrapper) {
        loginWrapper.style.display = 'flex';
        appShell.style.display = 'none';
        return;
      }
      // On standalone dashboard pages without #screenLoginWrapper, keep the portal session active
      this.store.state.isLoggedIn = true;
    }
    if (loginWrapper) loginWrapper.style.display = 'none';
    appShell.style.display = 'flex';

    this.renderTopHeader();
    this.renderSidebar();
    this.renderActiveView();
  }

  getCurrentLoginEvaluator() {
    this.store.syncEvaluatorWithCurrentLogin(this.store.state);
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const currentUser = this.store.state.currentUser || (isCurrentlyAdmin ? SYSTEM_ROLES.ADMIN : SYSTEM_ROLES.COMMITTEE);
    const name = currentUser.name || (isCurrentlyAdmin ? 'Administrator' : 'Committee Member');
    const role = isCurrentlyAdmin
      ? (currentUser.roleTag || currentUser.title || 'Administrator')
      : (currentUser.title || currentUser.roleTag || 'Evaluator');
    const initials = currentUser.avatar || name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || (isCurrentlyAdmin ? 'AD' : 'CM');
    const avatarBg = currentUser.avatarBg || (isCurrentlyAdmin ? '#0c2340' : '#059669');
    return {
      id: currentUser.id || (isCurrentlyAdmin ? 'role-admin' : 'role-committee'),
      name: name,
      role: role,
      username: currentUser.username || (isCurrentlyAdmin ? 'admin' : 'committee'),
      avatar: initials,
      avatarBg: avatarBg,
      status: 'Active'
    };
  }

  findSubmissionForEvaluator(scoreEntry, evaluatorInfo) {
    if (!scoreEntry || typeof scoreEntry !== 'object' || !evaluatorInfo) return null;
    const norm = (scoreEntry.submissions && typeof scoreEntry.submissions === 'object')
      ? scoreEntry
      : this.store.normalizeStudentWeekScore(scoreEntry, this.getMaxCriteriaScore());
    if (!norm || !norm.submissions || typeof norm.submissions !== 'object') return null;

    const directKey = this.store.getEvaluatorScoreKey(evaluatorInfo);
    if (norm.submissions[directKey]) return norm.submissions[directKey];

    const targetId = String(evaluatorInfo.evaluatorId || evaluatorInfo.id || '').trim().toLowerCase();
    const targetUser = String(evaluatorInfo.evaluatorUsername || evaluatorInfo.username || '').trim().toLowerCase();
    const targetName = String(evaluatorInfo.evaluatorName || evaluatorInfo.name || '').trim().toLowerCase();

    for (const sub of Object.values(norm.submissions)) {
      if (!sub || typeof sub !== 'object') continue;
      const sId = String(sub.evaluatorId || '').trim().toLowerCase();
      const sUser = String(sub.evaluatorUsername || '').trim().toLowerCase();
      const sName = String(sub.evaluatorName || '').trim().toLowerCase();
      if (targetUser && targetUser !== 'committee' && sUser && sUser === targetUser) return sub;
      if (targetId && targetId !== 'role-committee' && targetId !== 'committee-default' && sId && sId === targetId) return sub;
      if (targetName && sName && sName === targetName) return sub;
    }
    return null;
  }

  getStudentCommitteeScoresBreakdown(weekId, studentId) {
    const archWeek = weekId ? this.store.getArchivedWeekById(weekId) : null;
    const weekScores = archWeek
      ? (archWeek.scores || {})
      : ((weekId && this.store.state.scores && this.store.state.scores[weekId]) ? this.store.state.scores[weekId] : {});
    const weekObj = archWeek || (this.store.state.weeks || []).find(w => w && w.id === weekId);
    const maxScore = (weekObj && weekObj.maxScore) ? weekObj.maxScore : this.getMaxCriteriaScore();
    const scoreEntry = this.store.normalizeStudentWeekScore(weekScores[studentId], maxScore);
    const members = this.store.state.members || [];
    const rows = [];
    const matchedSubs = new Set();
    const matchedNames = new Set();

    members.forEach(m => {
      const sub = this.findSubmissionForEvaluator(scoreEntry, m);
      if (sub) {
        matchedSubs.add(sub);
        matchedSubs.add(this.store.getEvaluatorScoreKey(sub));
        if (sub.evaluatorName) matchedNames.add(String(sub.evaluatorName).trim().toLowerCase());
      }
      if (m && m.name) matchedNames.add(String(m.name).trim().toLowerCase());
      rows.push({
        evaluatorId: m.id,
        name: m.name,
        role: m.role || 'Committee Evaluator',
        username: m.username || '',
        isRegisteredMember: true,
        status: sub && typeof sub.total === 'number' ? 'Scored' : 'Pending',
        submission: sub || null
      });
    });

    if (scoreEntry && scoreEntry.submissions && typeof scoreEntry.submissions === 'object') {
      Object.entries(scoreEntry.submissions).forEach(([k, sub]) => {
        if (!sub || typeof sub.total !== 'number') return;
        const subKey = this.store.getEvaluatorScoreKey(sub);
        const subName = String(sub.evaluatorName || '').trim().toLowerCase();
        if (!matchedSubs.has(sub) && !matchedSubs.has(subKey) && !matchedSubs.has(k) && (!subName || !matchedNames.has(subName))) {
          matchedSubs.add(sub);
          matchedSubs.add(subKey);
          if (subName) matchedNames.add(subName);
          rows.push({
            evaluatorId: sub.evaluatorId || k,
            name: sub.evaluatorName || 'Evaluator',
            role: sub.evaluatorRole || 'Evaluator',
            username: sub.evaluatorUsername || '',
            isRegisteredMember: false,
            status: 'Scored',
            submission: sub
          });
        }
      });
    }

    const scoredSubmissions = rows.filter(r => r.submission && typeof r.submission.total === 'number').map(r => r.submission);
    return {
      scoreEntry,
      rows,
      scoredSubmissions,
      maxScore,
      totalEvaluators: members.length,
      scoredCount: scoredSubmissions.length
    };
  }

  renderStudentCommitteeBreakdownTableHtml(weekId, studentId) {
    const breakdown = this.getStudentCommitteeScoresBreakdown(weekId, studentId);
    const criteria = (this.store.state.criteria && this.store.state.criteria.length > 0) ? this.store.state.criteria : CRITERIA_LIST;
    const { scoreEntry, rows, maxScore, scoredCount } = breakdown;

    if (rows.length === 0) {
      return `
        <div style="text-align: center; padding: 1.75rem 1rem; color: var(--text-muted); font-size: 0.84rem;">
          No committee members registered or scores submitted yet for this student in this week.
        </div>
      `;
    }

    return `
      <div style="overflow-x: auto;">
        <table class="table-standard" style="min-width: 780px;">
          <thead>
            <tr>
              <th style="width: 42px;">No.</th>
              <th>Committee Member / Evaluator</th>
              <th>Role</th>
              ${criteria.map(c => `<th style="text-align: center; font-size: 0.7rem;" title="${escapeHtml(c.name)} (Max 10)">C${c.no}<br><span style="font-weight: 600; font-size: 0.64rem; text-transform: none;">${escapeHtml(c.name.split(' ')[0])}</span></th>`).join('')}
              <th style="text-align: center;">Total</th>
              <th style="text-align: center;">Pct</th>
              <th style="text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r, idx) => {
              const sub = r.submission;
              const isScored = sub && typeof sub.total === 'number';
              const isSelectedEvaluator = this.store.state.selectedEvaluatorId && r.evaluatorId === this.store.state.selectedEvaluatorId;
              return `
                <tr style="${isSelectedEvaluator ? 'background: #f0fdf4;' : ''} cursor: pointer;" onclick="app.evaluateAsMember('${escapeHtml(r.evaluatorId)}')" title="Click to view ${escapeHtml(r.name)}'s scores above">
                  <td>${idx + 1}</td>
                  <td>
                    <div style="font-weight: 700; color: var(--navy-primary); display: flex; align-items: center; gap: 0.35rem;">
                      <span>${escapeHtml(r.name)}</span>
                      ${isSelectedEvaluator ? '<span style="font-size: 0.65rem; background: #dcfce7; color: #15803d; padding: 0.08rem 0.4rem; border-radius: 999px; font-weight: 800;">Selected</span>' : ''}
                    </div>
                    ${r.username ? `<div style="font-size: 0.7rem; color: var(--text-muted);">@${escapeHtml(r.username)}</div>` : ''}
                  </td>
                  <td><span style="font-size: 0.76rem; color: var(--text-muted);">${escapeHtml(r.role)}</span></td>
                  ${criteria.map(c => `
                    <td style="text-align: center; font-weight: ${isScored ? '700' : '400'}; color: ${isScored ? 'var(--navy-primary)' : '#94a3b8'};">
                      ${isScored && typeof sub[c.id] === 'number' ? sub[c.id] : '—'}
                    </td>
                  `).join('')}
                  <td style="text-align: center; font-weight: 800; color: ${isScored ? 'var(--navy-primary)' : '#94a3b8'};">
                    ${isScored ? `${sub.total} / ${maxScore}` : '—'}
                  </td>
                  <td style="text-align: center; font-weight: 800; color: ${isScored ? '#15803d' : '#94a3b8'};">
                    ${isScored ? `${sub.pct}%` : '—'}
                  </td>
                  <td style="text-align: center;">
                    ${isScored ? `
                      <span class="status-badge-active" style="font-size: 0.7rem;">Scored</span>
                    ` : `
                      <span class="status-badge-pending" style="font-size: 0.7rem;">Pending</span>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
          ${scoreEntry && scoredCount > 0 ? `
            <tfoot>
              <tr style="background: var(--table-header-bg); font-weight: 800; border-top: 2px solid var(--card-border);">
                <td colspan="3" style="color: var(--navy-primary);">
                  Overall Average (${scoredCount} Evaluator${scoredCount === 1 ? '' : 's'} Scored • Combined: ${scoreEntry.combinedTotal}/${scoreEntry.maxCombinedScore})
                </td>
                ${criteria.map(c => `
                  <td style="text-align: center; color: var(--navy-primary);">${typeof scoreEntry[c.id] === 'number' ? scoreEntry[c.id] : '—'}</td>
                `).join('')}
                <td style="text-align: center; color: var(--navy-primary); font-size: 0.92rem;">${scoreEntry.total} / ${maxScore}</td>
                <td style="text-align: center; color: #b45309; font-size: 0.92rem;">${scoreEntry.pct}%</td>
                <td style="text-align: center;">
                  <span class="status-badge-active" style="font-size: 0.7rem;">${scoredCount} Submitted</span>
                </td>
              </tr>
            </tfoot>
          ` : ''}
        </table>
      </div>
    `;
  }

  renderWeekAllStudentsCommitteeMatrixHtml(weekId, classFilter = 'All') {
    const weeks = this.store.state.weeks || [];
    const archivedWeeks = this.store.getArchivedWeeks();
    const allSelectableWeeks = [...weeks, ...archivedWeeks];
    const targetWeek = (weekId ? allSelectableWeeks.find(w => w.id === weekId) : null) || this.getActiveWeek() || weeks[0] || archivedWeeks[0] || null;
    const isArchivedTarget = Boolean(targetWeek && (targetWeek.isArchived || targetWeek.status === 'Archived'));
    const effectiveWeekId = targetWeek ? targetWeek.id : null;
    const maxScore = (targetWeek && targetWeek.maxScore) ? targetWeek.maxScore : this.getMaxCriteriaScore();
    const members = this.store.state.members || [];
    let students = isArchivedTarget ? [...(targetWeek.students || [])] : [...(this.store.state.students || [])];
    if (classFilter && classFilter !== 'All' && classFilter !== 'All Classes') {
      students = students.filter(s => s.class === classFilter);
    }

    return `
      <div class="scoring-table-card" style="padding: 0; overflow: hidden; margin-top: 1.5rem;" id="adminCommitteeScoresMatrixSection">
        <div class="scoring-table-title directory-header-bar" style="padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="display: inline-flex; color: var(--navy-primary);">${APP_ICONS.committee}</span>
              <span style="font-weight: 800; font-size: 1rem; color: var(--navy-primary);">All Committee Members' Scores per Student</span>
              ${targetWeek ? `
                <span style="background: ${isArchivedTarget ? '#fef3c7' : '#e0f2fe'}; color: ${isArchivedTarget ? '#b45309' : '#0369a1'}; font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px;">
                  ${escapeHtml(targetWeek.name)} (${escapeHtml(targetWeek.dateRange)})${isArchivedTarget ? ' • Archived' : ''}
                </span>
              ` : ''}
              <span style="background: #f1f5f9; color: var(--navy-primary); font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px;">
                ${members.length} Registered Evaluator${members.length === 1 ? '' : 's'}
              </span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">
              View individual scores submitted by each committee member for every student in the selected week interval.
            </div>
          </div>

          ${allSelectableWeeks.length > 0 ? `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <label style="font-size: 0.76rem; font-weight: 700; color: var(--text-muted); white-space: nowrap;">Week:</label>
              <select class="form-select" style="height: 32px; font-size: 0.78rem; width: 245px; padding: 0 1.5rem 0 0.6rem;" onchange="app.changeAdminScoresMatrixWeek(this.value)">
                ${weeks.map(w => `<option value="${w.id}" ${effectiveWeekId === w.id ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})</option>`).join('')}
                ${archivedWeeks.map(a => `<option value="${a.id}" ${effectiveWeekId === a.id ? 'selected' : ''}>[Archived] ${escapeHtml(a.name)} (${escapeHtml(a.dateRange)})</option>`).join('')}
              </select>
            </div>
          ` : ''}
        </div>

        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th style="width: 46px;">No.</th>
                <th>Student</th>
                <th>Class &amp; House</th>
                <th>Committee Members' Individual Scores (${targetWeek ? escapeHtml(targetWeek.name) : 'Weekly'})</th>
                <th style="text-align: center; width: 130px;">Average Score</th>
                <th style="text-align: center; width: 130px;">Breakdown</th>
              </tr>
            </thead>
            <tbody>
              ${students.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
                    No students enrolled yet to display committee member scores.
                  </td>
                </tr>
              ` : students.map((s, idx) => {
                const b = this.getStudentCommitteeScoresBreakdown(effectiveWeekId, s.id);
                const hasAnyScore = b.scoreEntry && b.scoredCount > 0;
                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>
                      <div style="font-weight: 700; color: var(--navy-primary);">${escapeHtml(s.name)}</div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(s.id)}</div>
                    </td>
                    <td>
                      <div style="font-weight: 600; font-size: 0.82rem;">${escapeHtml(s.class)}</div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(s.house)}</div>
                    </td>
                    <td>
                      ${b.rows.length === 0 ? `
                        <span style="font-size: 0.76rem; color: var(--text-muted);">No committee evaluators registered yet</span>
                      ` : `
                        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center;">
                          ${b.rows.map(r => {
                            const sub = r.submission;
                            const isScored = sub && typeof sub.total === 'number';
                            return isScored ? `
                              <span style="display: inline-flex; align-items: center; gap: 0.3rem; background: #dcfce7; color: #166534; border: 1px solid #86efac; padding: 0.18rem 0.55rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700;" title="${escapeHtml(r.name)} (${escapeHtml(r.role)}): ${sub.total}/${maxScore} (${sub.pct}%)">
                                <span>${escapeHtml(r.name)}:</span>
                                <strong>${sub.total}/${maxScore}</strong>
                                <span style="opacity: 0.85;">(${sub.pct}%)</span>
                              </span>
                            ` : `
                              <span style="display: inline-flex; align-items: center; gap: 0.25rem; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; padding: 0.16rem 0.5rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600;" title="${escapeHtml(r.name)} (${escapeHtml(r.role)}): Not scored yet">
                                <span>${escapeHtml(r.name)}:</span>
                                <span>Pending</span>
                              </span>
                            `;
                          }).join('')}
                        </div>
                      `}
                    </td>
                    <td style="text-align: center;">
                      ${hasAnyScore ? `
                        <div style="font-weight: 800; color: var(--navy-primary); font-size: 0.88rem;">${b.scoreEntry.total} / ${maxScore}</div>
                        <div style="font-size: 0.74rem; font-weight: 700; color: #15803d;">${b.scoreEntry.pct}% (${b.scoredCount} Eval${b.scoredCount === 1 ? '' : 's'})</div>
                      ` : `
                        <span class="status-badge-pending" style="font-size: 0.7rem;">No Scores Yet</span>
                      `}
                    </td>
                    <td style="text-align: center;">
                      <button type="button" class="btn-navy-action" style="height: 30px; padding: 0 0.65rem; font-size: 0.74rem;" onclick="app.openStudentCommitteeScoresModal('${s.id}', '${effectiveWeekId || ''}')">
                        ${APP_ICONS.eye} View Scores
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  changeAdminScoresMatrixWeek(weekId) {
    if (!weekId) return;
    this.store.state.selectedWeekId = weekId;
    this.store.save();
    this.render();
  }

  openStudentCommitteeScoresModal(studentId, weekId = null) {
    const weeks = this.store.state.weeks || [];
    const archivedWeeks = this.store.getArchivedWeeks();
    const allWeeks = [...weeks, ...archivedWeeks];
    const targetWeek = (weekId ? allWeeks.find(w => w.id === weekId) : null) ||
      (this.store.state.selectedWeekId ? allWeeks.find(w => w.id === this.store.state.selectedWeekId) : null) ||
      this.getActiveWeek() || weeks[0] || archivedWeeks[0] || null;
    const isArchivedTarget = Boolean(targetWeek && (targetWeek.isArchived || targetWeek.status === 'Archived'));
    const effectiveWeekId = targetWeek ? targetWeek.id : '';

    let student = null;
    if (isArchivedTarget && Array.isArray(targetWeek.students)) {
      student = targetWeek.students.find(s => s && s.id === studentId);
    }
    if (!student) {
      student = (this.store.state.students || []).find(s => s && s.id === studentId);
    }
    if (!student) {
      for (const arch of archivedWeeks) {
        if (arch && Array.isArray(arch.students)) {
          const found = arch.students.find(s => s && s.id === studentId);
          if (found) {
            student = found;
            break;
          }
        }
      }
    }
    if (!student) return;

    let modal = document.getElementById('modalStudentCommitteeScores');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalStudentCommitteeScores';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 920px; width: 95%;">
        <div class="modal-header-row">
          <div>
            <h3 style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              ${APP_ICONS.committee}
              <span>Committee Members' Scores: ${escapeHtml(student.name)} (${escapeHtml(student.id)})</span>
              ${isArchivedTarget ? '<span style="font-size: 0.7rem; background: #fef3c7; color: #b45309; border: 1px solid #fde68a; padding: 0.12rem 0.5rem; border-radius: 999px; font-weight: 800;">Archived Record</span>' : ''}
            </h3>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
              Class: <strong>${escapeHtml(student.class)}</strong> &nbsp;•&nbsp; House: <strong>${escapeHtml(student.house)}</strong>
              ${targetWeek ? ` &nbsp;•&nbsp; Week: <strong>${escapeHtml(targetWeek.name)} (${escapeHtml(targetWeek.dateRange)})${isArchivedTarget ? ' [Archived]' : ''}</strong>` : ''}
            </div>
          </div>
          <button type="button" class="btn-close-x" onclick="document.getElementById('modalStudentCommitteeScores').classList.remove('active')">&times;</button>
        </div>

        ${allWeeks.length > 1 && !isArchivedTarget ? `
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; margin-bottom: 0.85rem;">
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">Select Week Interval:</label>
            <select class="form-select" style="width: 240px; height: 34px; font-size: 0.8rem;" onchange="app.openStudentCommitteeScoresModal('${student.id}', this.value)">
              ${weeks.map(w => `<option value="${w.id}" ${w.id === effectiveWeekId ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})</option>`).join('')}
            </select>
          </div>
        ` : ''}

        ${this.renderStudentCommitteeBreakdownTableHtml(effectiveWeekId, student.id)}

        <div style="display: flex; justify-content: flex-end; gap: 0.65rem; margin-top: 1.25rem; padding-top: 0.85rem; border-top: 1px solid var(--card-border);">
          <button type="button" class="btn-navy-action" style="background: #e2e8f0; color: #1e293b; height: 36px; padding: 0 1rem; font-size: 0.82rem;" onclick="document.getElementById('modalStudentCommitteeScores').classList.remove('active')">
            Close
          </button>
          ${isArchivedTarget ? `
            <button type="button" class="btn-navy-action" style="height: 36px; padding: 0 1rem; font-size: 0.82rem;" onclick="document.getElementById('modalStudentCommitteeScores').classList.remove('active'); app.openArchivedWeekReport('${effectiveWeekId}')">
              ${APP_ICONS.printer} Print Archived Report
            </button>
          ` : `
            <button type="button" class="btn-navy-action" style="height: 36px; padding: 0 1rem; font-size: 0.82rem;" onclick="document.getElementById('modalStudentCommitteeScores').classList.remove('active'); app.scoreStudent('${student.id}')">
              ${APP_ICONS.assessment} Open in Weekly Assessment
            </button>
          `}
        </div>
      </div>
    `;
    modal.classList.add('active');
  }

  openNominateStudentModal() {
    this.openAddStudentModal();
  }

  renderTopHeader() {
    const evaluator = this.getCurrentLoginEvaluator();
    const user = this.store.state.currentUser;
    const activeWeek = this.getActiveWeek();
    const upcomingWeek = this.getUpcomingWeek();
    const currentWeek = activeWeek;

    const userNameEl = document.getElementById('headerProfileName');
    const userRoleEl = document.getElementById('headerProfileRole');
    const userAvatarEl = document.getElementById('headerProfileAvatar');
    const weekIntervalEl = document.getElementById('headerWeekIntervalText');
    const btnSwitchDash = document.getElementById('btnSwitchDashboard');

    if (userNameEl) userNameEl.textContent = evaluator.name;
    if (userRoleEl) userRoleEl.textContent = evaluator.role;
    if (userAvatarEl) {
      userAvatarEl.textContent = evaluator.avatar;
      userAvatarEl.style.backgroundColor = evaluator.avatarBg;
      userAvatarEl.style.color = '#ffffff';
    }

    this.updateDatabaseStatusUI();
    this.updateThemeUI();
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const weekPillEl = document.querySelector('.header-week-pill');

    if (weekIntervalEl) {
      let intervalHtml = '';
      if (activeWeek) {
        intervalHtml = `${escapeHtml(activeWeek.name)} (${escapeHtml(activeWeek.dateRange)})`;
        if (upcomingWeek) {
          intervalHtml += ` <span style="font-size: 0.74rem; font-weight: 700; color: #2563eb; margin-left: 0.35rem;">[Next: ${escapeHtml(upcomingWeek.name)}]</span>`;
        }
      } else if (upcomingWeek) {
        intervalHtml = `<span style="color: #2563eb; font-weight: 700;">Next: ${escapeHtml(upcomingWeek.name)} (${escapeHtml(upcomingWeek.dateRange)})</span>`;
      } else {
        intervalHtml = 'No active week interval';
      }

      if (isCurrentlyAdmin) {
        weekIntervalEl.innerHTML = `${intervalHtml} <span class="header-week-edit-badge">Set</span>`;
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
        { id: 'dashboard-admin', icon: APP_ICONS.home, label: 'Dashboard' },
        { id: 'students', icon: APP_ICONS.students, label: 'Students' },
        { id: 'assessment', icon: APP_ICONS.assessment, label: 'Weekly Assessment' },
        { id: 'rankings', icon: APP_ICONS.rankings, label: 'Results & Rankings' },
        { id: 'previous-weeks', icon: APP_ICONS.calendar, label: 'Previous Weeks' },
        { id: 'archive', icon: APP_ICONS.archive, label: 'Archive' },
        { id: 'committee', icon: APP_ICONS.committee, label: 'Committee Members' },
        { id: 'reports', icon: APP_ICONS.reports, label: 'Reports' },
        { id: 'settings', icon: APP_ICONS.settings, label: 'Settings' }
      ];
    } else {
      // Committee Member View
      items = [
        { id: 'dashboard-committee', icon: APP_ICONS.home, label: 'My Dashboard' },
        { id: 'assessment', icon: APP_ICONS.assessment, label: 'Enter Assessment' },
        { id: 'rankings', icon: APP_ICONS.rankings, label: 'Results & Rankings' },
        { id: 'previous-weeks', icon: APP_ICONS.calendar, label: 'Previous Weeks' },
        { id: 'archive', icon: APP_ICONS.archive, label: 'Archive' },
        { id: 'students', icon: APP_ICONS.students, label: 'Student Directory' },
        { id: 'reports', icon: APP_ICONS.reports, label: 'Official Reports' }
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

    let targetEl = document.getElementById(`view-${view}`);
    if (!targetEl && view === 'archive' && typeof document !== 'undefined') {
      const mainEl = document.querySelector('.olag-main-content');
      if (mainEl && typeof document.createElement === 'function') {
        targetEl = document.createElement('section');
        targetEl.id = 'view-archive';
        targetEl.className = 'page-view';
        mainEl.appendChild(targetEl);
      }
    }

    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
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
      case 'archive':
        this.renderArchive();
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
    const topStudentInitials = topStudent
      ? (topStudent.name.split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST')
      : 'ST';

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
        <div class="stat-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(185px, 1fr)); gap: 1.15rem; margin-bottom: 1.5rem;">
          <div class="stat-card card-blue" style="cursor: pointer;" onclick="app.navigateTo('students')" title="Click to open Students Directory">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Students</span>
              <span class="stat-card-value">${allStudents.length}</span>
              <span class="stat-card-sub">Enrolled for assessment</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>

          <div class="stat-card card-green" style="cursor: pointer; ${currentWeek && currentWeek.status === 'Closed' ? 'border: 2px solid #ef4444;' : ''}" onclick="app.openSetWeekIntervalModal(${currentWeek ? `'${currentWeek.id}'` : ''})" title="Click to Set / Configure Week Interval">
            <div class="stat-card-text">
              <div style="display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.2rem;">
                <span class="stat-card-title" style="margin-bottom: 0;">This Week</span>
                <span style="font-size: 0.66rem; font-weight: 700; background: ${currentWeek && currentWeek.status === 'Closed' ? '#fee2e2' : 'rgba(255,255,255,0.24)'}; color: ${currentWeek && currentWeek.status === 'Closed' ? '#991b1b' : '#ffffff'}; padding: 0.1rem 0.5rem; border-radius: 999px;">
                  ${currentWeek ? (currentWeek.status === 'Closed' ? 'Closed' : 'Open') : 'Set'}
                </span>
              </div>
              <span class="stat-card-value" style="font-size: 1.45rem;">${currentWeek ? escapeHtml(currentWeek.name) : 'No Week Set'}</span>
              <span class="stat-card-sub">${currentWeek ? `(${escapeHtml(currentWeek.dateRange)})` : '(Click to set interval)'}</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
          </div>

          <div class="stat-card card-purple" style="cursor: pointer;" onclick="app.navigateTo('committee')" title="Click to open Committee Members Directory">
            <div class="stat-card-text">
              <span class="stat-card-title">Evaluators</span>
              <span class="stat-card-value">${members.length}</span>
              <span class="stat-card-sub">Registered committee</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
          </div>

          <div class="stat-card card-blue" style="cursor: pointer;" onclick="app.openAddClassModal()" title="Click to manage classes">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Classes</span>
              <span class="stat-card-value">${this.store.state.classes.length}</span>
              <span class="stat-card-sub">Academic cohorts</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
          </div>

          <div class="stat-card card-orange">
            <div class="stat-card-text">
              <span class="stat-card-title">Total Houses</span>
              <span class="stat-card-value">${this.store.state.houses.length}</span>
              <span class="stat-card-sub">School houses</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
          </div>
        </div>

        <!-- Student Personality of the Week Spotlight Card -->
        <div class="dashboard-winner-card">
          <div class="dashboard-winner-card-header">
            <div class="winner-card-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-yellow); flex-shrink: 0;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              <span>Student Personality of the Week</span>
            </div>
            ${currentWeek ? `<span class="winner-card-week-tag">(${escapeHtml(currentWeek.name)})${currentWeek.status === 'Closed' ? ' • Sealed' : ''}</span>` : ''}
          </div>

          ${topStudent ? `
            <div class="dashboard-winner-body">
              <div class="dashboard-winner-left">
                <div class="winner-avatar-circle" style="font-size: 1.35rem; font-weight: 800; letter-spacing: 0.03em;">${escapeHtml(topStudentInitials)}</div>
                <div class="winner-info-text">
                  <h3>${escapeHtml(topStudent.name)}</h3>
                  <p>${escapeHtml(topStudent.class)} &nbsp;|&nbsp; ${escapeHtml(topStudent.house)}</p>
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

                <div class="winner-laurel-decor" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background: rgba(255, 199, 44, 0.14); border: 1px solid rgba(255, 199, 44, 0.35); color: var(--accent-yellow);">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div>
              </div>
            </div>
          ` : `
            <div class="dashboard-winner-body" style="padding: 1.5rem; text-align: center; color: #cbd5e1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
              <h4 style="margin: 0; color: #ffffff; font-size: 1.05rem;">No Winner Announced Yet ${currentWeek ? `for ${escapeHtml(currentWeek.name)}` : ''}</h4>
              <p style="margin: 0; font-size: 0.85rem; max-width: 440px; color: #94a3b8;">Weekly assessments are awaiting new student evaluation submissions. Past weeks' evaluations are safely stored in the Archive for reference.</p>
              ${this.store.getArchivedWeeks().length > 0 ? `
                <button type="button" class="btn-navy-action" style="margin-top: 0.35rem; background: rgba(255, 199, 44, 0.16); border: 1px solid rgba(255, 199, 44, 0.45); color: var(--accent-yellow); height: 32px; font-size: 0.78rem;" onclick="app.navigateTo('previous-weeks')">
                  ${APP_ICONS.archive} View Past Weeks Evaluation Archive (${this.store.getArchivedWeeks().length})
                </button>
              ` : ''}
            </div>
          `}
        </div>

        <!-- Upcoming Assessment Cycle Info Card (Admin) -->
        ${upcomingWeek ? `
          <div class="upcoming-assessment-card" style="margin-top: 1.25rem; background: var(--card-bg); border: 1px solid var(--card-border); border-left: 4px solid #2563eb; border-radius: var(--radius-lg); padding: 1.1rem 1.35rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 0.95rem;">
              <div class="upcoming-assessment-icon-box" style="width: 42px; height: 42px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #2563eb;">Upcoming Assessment Cycle</span>
                  <span class="status-badge-upcoming">Scheduled</span>
                </div>
                <div style="font-size: 1.02rem; font-weight: 800; color: var(--navy-primary); margin-top: 0.15rem;">
                  ${escapeHtml(upcomingWeek.name)} &nbsp;•&nbsp; <span style="font-weight: 600; font-size: 0.92rem; color: var(--text-muted);">${escapeHtml(upcomingWeek.dateRange)}</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.1rem;">
                  Active cycle <strong>(${escapeHtml(currentWeek ? currentWeek.name : 'None')})</strong> remains open until you activate this upcoming schedule.
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn-navy-action" style="background: #2563eb; color: #fff; height: 36px; padding: 0 1rem; font-size: 0.82rem;" onclick="app.activateUpcomingWeek('${upcomingWeek.id}')">
                Activate Now
              </button>
              <button type="button" class="btn-navy-action upcoming-edit-btn" onclick="app.openSetWeekIntervalModal('${upcomingWeek.id}')">
                Edit Schedule
              </button>
            </div>
          </div>
        ` : `
          <div class="upcoming-assessment-card" style="margin-top: 1.25rem; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius-lg); padding: 1rem 1.35rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <div class="upcoming-assessment-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--navy-primary);">
                  Next Assessment Cycle: <span style="color: var(--text-muted); font-weight: 500;">Not Scheduled</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">
                  Schedule the upcoming week interval in advance so committee members know what cycle is next.
                </div>
              </div>
            </div>
            <button type="button" class="btn-demo-pill upcoming-schedule-btn" onclick="app.scheduleNextWeekInterval()">
              + Schedule Next Week Interval
            </button>
          </div>
        `}
      </div>

      <div class="quick-actions-section">
        <div class="section-title">Quick Actions</div>
        <div class="quick-actions-grid">
          <div class="quick-action-card" onclick="app.openSetWeekIntervalModal(${currentWeek ? `'${currentWeek.id}'` : ''})">
            <div class="quick-action-icon-box tone-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div class="quick-action-label">Set Week Interval</div>
          </div>

          <div class="quick-action-card" onclick="app.scheduleNextWeekInterval()">
            <div class="quick-action-icon-box tone-indigo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="quick-action-label">${upcomingWeek ? `Next: ${escapeHtml(upcomingWeek.name)}` : 'Schedule Next Week'}</div>
          </div>

          ${currentWeek ? `
            <div class="quick-action-card" onclick="app.quickToggleWeekStatus('${currentWeek.id}')">
              <div class="quick-action-icon-box ${currentWeek.status === 'Closed' ? 'tone-green' : 'tone-amber'}">
                ${currentWeek.status === 'Closed'
                  ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`
                  : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
                }
              </div>
              <div class="quick-action-label">
                ${currentWeek.status === 'Closed' ? 'Re-Open Scoring' : 'Close Scoring (Seal)'}
              </div>
            </div>
          ` : ''}

          <div class="quick-action-card" onclick="app.navigateTo('assessment')">
            <div class="quick-action-icon-box tone-emerald">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <div class="quick-action-label">${currentWeek && currentWeek.status === 'Closed' ? 'View Scores (Sealed)' : `Enter Scores ${currentWeek ? `(${escapeHtml(currentWeek.name)})` : ''}`}</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('rankings')">
            <div class="quick-action-icon-box tone-purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <div class="quick-action-label">View Rankings</div>
          </div>

          <div class="quick-action-card" onclick="app.openAddStudentModal()">
            <div class="quick-action-icon-box tone-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            <div class="quick-action-label">Add Student</div>
          </div>

          <div class="quick-action-card" onclick="app.openAddMemberModal()">
            <div class="quick-action-icon-box tone-teal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            </div>
            <div class="quick-action-label">Add Committee Member</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('archive')">
            <div class="quick-action-icon-box tone-amber">
              ${APP_ICONS.archive}
            </div>
            <div class="quick-action-label">Evaluation Archive</div>
          </div>

          <div class="quick-action-card" onclick="app.navigateTo('reports')">
            <div class="quick-action-icon-box tone-slate">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <div class="quick-action-label">Export Report</div>
          </div>
        </div>
      </div>

      <!-- =========================================================================
           ADMIN DASHBOARD: NOTIFICATIONS & ACTIVITY ALERTS
           ========================================================================= -->
      <div class="scoring-table-card" style="margin-top: 1.5rem; padding: 0; overflow: hidden;" id="adminDashboardNotificationsSection">
        <div class="scoring-table-title" style="padding: 1.1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-bottom: 1px solid var(--card-border);">
          <div>
            <div style="display: flex; align-items: center; gap: 0.55rem; flex-wrap: wrap;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--navy-primary);"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span style="font-weight: 800; font-size: 1.02rem; color: var(--navy-primary);">Notifications</span>
              <span style="background: ${unreadCount > 0 ? '#dbeafe' : '#f1f5f9'}; color: ${unreadCount > 0 ? '#1d4ed8' : '#475569'}; font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px;">
                ${unreadCount > 0 ? `${unreadCount} Unread` : `${notifications.length} Total`}
              </span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
              Real-time updates for registered committee members, score submissions, and assessment intervals.
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            ${unreadCount > 0 ? `
              <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.78rem; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe;" onclick="app.markAllNotificationsRead()">
                Mark All Read
              </button>
            ` : ''}
            ${notifications.length > 0 ? `
              <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.85rem; font-size: 0.78rem; background: #f1f5f9; color: #475569;" onclick="app.clearAllNotifications()">
                Clear All
              </button>
            ` : ''}
          </div>
        </div>

        <div style="padding: 0.85rem 1.25rem; display: flex; flex-direction: column; gap: 0.65rem;">
          ${notifications.length === 0 ? `
            <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
              <div style="font-weight: 700; color: var(--navy-primary); margin-bottom: 0.2rem;">No Notifications Right Now</div>
              <div style="font-size: 0.82rem; max-width: 420px; margin: 0 auto;">
                New committee member registrations, student evaluations, and interval updates will appear here automatically.
              </div>
            </div>
          ` : notifications.map(n => {
            const bgMap = {
              member: { bg: '#f0fdf4', border: '#bbf7d0', iconBg: '#059669' },
              score: { bg: '#eff6ff', border: '#bfdbfe', iconBg: '#2563eb' },
              student: { bg: '#f8fafc', border: '#cbd5e1', iconBg: '#0c2340' },
              interval: { bg: '#fefce8', border: '#fde047', iconBg: '#ca8a04' },
              nomination: { bg: '#fffbeb', border: '#fde68a', iconBg: '#d97706' }
            };
            const palette = bgMap[n.type] || bgMap.score;
            return `
              <div class="admin-notification-item" style="display: flex; align-items: center; justify-content: space-between; gap: 0.9rem; padding: 0.85rem 1rem; border-radius: 10px; background: ${n.unread ? palette.bg : 'var(--card-bg)'}; border: 1px solid ${n.unread ? palette.border : 'var(--card-border)'}; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 0.8rem; flex: 1; min-width: 220px;">
                  <div style="width: 36px; height: 36px; border-radius: 9px; background: ${palette.iconBg}; color: #ffffff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                  </div>
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                      <span style="font-weight: 800; font-size: 0.88rem; color: var(--navy-primary);">${escapeHtml(n.title)}</span>
                      ${n.unread ? `<span style="background: #2563eb; color: #fff; font-size: 0.64rem; font-weight: 800; padding: 0.1rem 0.45rem; border-radius: 999px; text-transform: uppercase;">New</span>` : ''}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">
                      ${escapeHtml(n.message)}
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.45rem;">
                  ${n.actionView ? `
                    <button type="button" class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.76rem;" onclick="app.openNotificationTarget('${escapeHtml(n.id)}', '${escapeHtml(n.actionView)}')">
                      ${escapeHtml(n.actionLabel || 'View')}
                    </button>
                  ` : ''}
                  <button type="button" class="action-icon-btn" title="Dismiss Notification" onclick="app.dismissNotification('${escapeHtml(n.id)}')" style="width: 28px; height: 28px; font-size: 0.75rem;">
                    ×
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  addNotification({ id, type = 'info', icon = 'info', title, message, actionLabel = '', actionView = '' }) {
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
    this.showToast('All notifications marked as read.');
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
    this.showToast('Cleared all notifications.');
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

    const currentEvaluator = this.getCurrentLoginEvaluator();
    const evaluatedStudents = allStudents.filter(s => {
      const sScores = weekScores[s.id];
      return !!this.findSubmissionForEvaluator(sScores, currentEvaluator);
    });
    const evaluatedCount = evaluatedStudents.length;
    const totalAssigned = allStudents.length;
    const pendingStudents = allStudents.filter(s => {
      const sScores = weekScores[s.id];
      return !this.findSubmissionForEvaluator(sScores, currentEvaluator);
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
            <span style="display: inline-flex; color: #991b1b;">${APP_ICONS.lock}</span>
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
            ${APP_ICONS.trophy} View Sealed Rankings
          </button>
        </div>
      ` : ''}

      <!-- Prominent Active Assessment Interval Banner for Committee Members -->
      <div class="evaluator-banner" style="margin-bottom: 1.25rem;">
        <div class="evaluator-banner-left">
          <div class="evaluator-avatar" style="background: ${isWeekClosed ? '#991b1b' : (isWeekUpcoming ? '#2563eb' : 'var(--stat-green)')}; color: #fff;">${isWeekClosed ? APP_ICONS.lock : (isWeekUpcoming ? APP_ICONS.clock : APP_ICONS.calendar)}</div>
          <div>
            <div style="font-weight: 800; font-size: 1.02rem; color: var(--navy-primary); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span>Assessment Interval: <strong>${currentWeek ? escapeHtml(currentWeek.name) : 'No Active Interval'}</strong></span>
              ${currentWeek ? `
                <span class="${currentWeek.status === 'Closed' ? 'status-badge-closed' : (currentWeek.status === 'Upcoming' ? 'status-badge-upcoming' : 'status-badge-active')}" style="font-size: 0.72rem; padding: 0.15rem 0.55rem; ${currentWeek.status === 'Closed' ? 'background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;' : ''}">
                  ● ${currentWeek.status === 'Closed' ? 'Closed (Results Sealed)' : (currentWeek.status === 'Upcoming' ? 'Upcoming (Scheduled)' : 'Open for Scoring')}
                </span>
                ${currentWeek.isCurrent ? '<span style="font-size: 0.68rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 0.15rem 0.45rem; border-radius: 999px;">Current Cycle</span>' : ''}
              ` : `
                <span style="font-size: 0.72rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 0.15rem 0.55rem; border-radius: 999px;">
                  Awaiting Admin Interval Setup
                </span>
              `}
            </div>
            <div style="font-size: 0.84rem; color: var(--text-muted); margin-top: 0.15rem;">
              ${currentWeek ? `Dates: <strong>${escapeHtml(currentWeek.dateRange)}</strong>` : 'No scoring intervals have been configured by administrators yet.'}
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
                  if (w.status === 'Closed') tag = ' [Closed]';
                  else if (w.status === 'Upcoming') tag = ' [Upcoming]';
                  else if (w.isCurrent) tag = ' [Active]';
                  return `<option value="${w.id}" ${currentWeek && w.id === currentWeek.id ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})${tag}</option>`;
                }).join('')}
              </select>
            </div>
          ` : ''}
          <button type="button" class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem; background: var(--stat-green); color: #fff;" onclick="app.openAddStudentModal()">
            ${APP_ICONS.userPlus} + Add Student
          </button>
          <button type="button" class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem; ${isWeekClosed ? 'background: #64748b;' : ''}" onclick="app.navigateTo('assessment')">
            ${isWeekClosed ? `${APP_ICONS.eye} View Sealed Scores` : (isWeekUpcoming ? `${APP_ICONS.eye} Preview Criteria` : `${APP_ICONS.edit} Enter Scores`)}
          </button>
          <button type="button" class="btn-navy-action" style="background: #e2e8f0; color: #1e293b; height: 34px; padding: 0 0.75rem; font-size: 0.78rem;" onclick="app.navigateTo('previous-weeks')">
            ${APP_ICONS.calendar} View All Intervals
          </button>
          <button type="button" class="btn-navy-action" style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; height: 34px; padding: 0 0.75rem; font-size: 0.78rem;" onclick="app.navigateTo('archive')">
            ${APP_ICONS.archive} Archive
          </button>
        </div>
      </div>

      ${upcomingWeek ? `
        <!-- Prominent Upcoming Assessment Cycle Notice for Committee Members -->
        <div class="upcoming-assessment-card" style="margin-bottom: 1.25rem; background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%); border: 1.5px solid #bfdbfe; border-radius: var(--radius-md); padding: 0.95rem 1.15rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="display: inline-flex; color: #2563eb;">${APP_ICONS.clock}</span>
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
            Preview Next Schedule
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
              <div style="display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.2rem;">
                <span class="stat-card-title" style="margin-bottom: 0;">This Week</span>
                <span style="font-size: 0.66rem; font-weight: 700; background: rgba(255,255,255,0.24); padding: 0.1rem 0.5rem; border-radius: 999px;">
                  ${currentWeek ? (currentWeek.status === 'Closed' ? 'Closed' : 'Open') : 'Pending'}
                </span>
              </div>
              <span class="stat-card-value" style="font-size: 1.45rem;">${currentWeek ? escapeHtml(currentWeek.name) : 'No Week Set'}</span>
              <span class="stat-card-sub">${currentWeek ? `(${escapeHtml(currentWeek.dateRange)})` : '(Awaiting admin setup)'}</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
          </div>

          <!-- Card 2: Assigned Students -->
          <div class="stat-card card-blue">
            <div class="stat-card-text">
              <span class="stat-card-title">Assigned Students</span>
              <span class="stat-card-value">${totalAssigned}</span>
              <span class="stat-card-sub">In evaluation queue</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
            </div>
          </div>

          <!-- Card 3: Evaluated Students -->
          <div class="stat-card card-green">
            <div class="stat-card-text">
              <span class="stat-card-title">Evaluated</span>
              <span class="stat-card-value">${evaluatedCount}</span>
              <span class="stat-card-sub">${completionPct}% completed</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          </div>

          <!-- Card 4: Pending Students -->
          <div class="stat-card card-orange">
            <div class="stat-card-text">
              <span class="stat-card-title">Pending</span>
              <span class="stat-card-value">${pendingCount}</span>
              <span class="stat-card-sub">${pendingCount === 0 && totalAssigned > 0 ? 'All caught up!' : 'Awaiting grading'}</span>
            </div>
            <div class="stat-card-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Pending Nominees to Assess -->
      <div class="scoring-table-card">
        <div class="scoring-table-title">
          <span>Pending Student Evaluations for ${escapeHtml(weekLabel)} ${currentWeek ? `(${escapeHtml(weekDateRange)})` : ''}</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.navigateTo('assessment')">
              Open Full Rubric
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
                  <div style="display: inline-flex; color: var(--text-muted); margin-bottom: 0.5rem;">${APP_ICONS.reports}</div><br>
                  No students currently enrolled in the system.<br>
                  <small>Add students below to immediately accept and evaluate them for ${escapeHtml(weekLabel)}.</small><br>
                  <button type="button" class="btn-navy-action" style="margin-top: 0.85rem; font-size: 0.8rem; padding: 0 1.25rem; background: var(--stat-green); color: #fff;" onclick="app.openAddStudentModal()">
                    ${APP_ICONS.userPlus} + Add Student
                  </button>
                </td>
              </tr>
            ` : (pendingStudents.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--stat-green);">
                  <div style="display: inline-flex; color: var(--stat-green); margin-bottom: 0.5rem;">${APP_ICONS.check}</div><br>
                  <strong>All caught up!</strong> All ${totalAssigned} students have been evaluated for ${escapeHtml(weekLabel)}.
                </td>
              </tr>
            ` : pendingStudents.map(s => `
              <tr>
                <td><strong>${escapeHtml(s.id)}</strong></td>
                <td>${escapeHtml(s.name)}</td>
                <td>${escapeHtml(s.class)}</td>
                <td>${escapeHtml(s.house)}</td>
                <td>
                  <span class="status-badge-active" style="font-size: 0.72rem; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; margin-right: 0.25rem;">Accepted</span>
                  <span class="status-badge-pending">Pending</span>
                </td>
                <td style="text-align: center;">
                  ${isWeekClosed ? `
                    <button class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.75rem; background: #94a3b8; cursor: not-allowed; opacity: 0.75;" disabled title="Scoring closed by administrator">
                      ${APP_ICONS.lock} Closed
                    </button>
                  ` : `
                    <button class="btn-navy-action" style="height: 30px; padding: 0 0.75rem; font-size: 0.75rem;" onclick="app.startStudentAssessment('${s.id}')">
                      Assess
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
    this.showToast(`Viewing scores submitted by ${member.name}`);
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
        <div class="scoring-table-title directory-header-bar" style="padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 0.75rem;">
          <div style="min-width: 0;">
            <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
              <span style="display: inline-flex; color: var(--navy-primary);">${APP_ICONS.students}</span>
              <span style="font-weight: 800; font-size: 1rem; color: var(--navy-primary); white-space: nowrap;">All Enrolled Students Directory</span>
              <span id="studentsDirectoryCountBadge" style="background: #f1f5f9; color: var(--navy-primary); font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px; white-space: nowrap;">
                ${hasActiveFilter ? `${students.length} of ${allStudents.length} Students` : `${allStudents.length} Student${allStudents.length === 1 ? '' : 's'}`}
              </span>
            </div>
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Directory of all added students across all classes and houses at Our Lady of Grace SHS.
            </div>
          </div>

          <div class="directory-toolbar-controls" style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: nowrap; flex-shrink: 0;">
            <input type="text" id="studentSearchInput" class="form-input"
              placeholder="Search students..."
              value="${escapeHtml(this.store.state.studentSearchQuery || '')}"
              style="height: 32px; font-size: 0.76rem; width: 145px; padding: 0 0.6rem;" />

            <select id="studentClassFilterSelect" class="form-select" style="height: 32px; font-size: 0.76rem; width: 120px; padding: 0 1.4rem 0 0.5rem;">
              <option value="All Classes">All Classes</option>
              ${allClasses.map(c => `<option value="${escapeHtml(c)}" ${c === classFilter ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
            </select>

            <select id="studentHouseFilterSelect" class="form-select" style="height: 32px; font-size: 0.76rem; width: 120px; padding: 0 1.4rem 0 0.5rem;">
              <option value="All Houses">All Houses</option>
              ${allHouses.map(h => `<option value="${escapeHtml(h)}" ${houseFilter === h ? 'selected' : ''}>${escapeHtml(h)}</option>`).join('')}
            </select>

            <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.7rem; font-size: 0.76rem; white-space: nowrap; background: var(--stat-green); color: #fff;" onclick="app.openAddStudentModal()">
              ${APP_ICONS.userPlus} + Add Student
            </button>
            ${isCurrentlyAdmin ? `
              <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.7rem; font-size: 0.76rem; background: #334155; white-space: nowrap;" onclick="app.openAddClassModal()">
                ${APP_ICONS.school} Classes (${allClasses.length})
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
                    <div style="display: inline-flex; color: var(--text-muted); margin-bottom: 0.4rem;">${APP_ICONS.committee}</div>
                    <div style="font-weight: 700; color: var(--navy-primary); margin-bottom: 0.25rem;">
                      ${allStudents.length === 0 ? 'No Students Enrolled Yet' : 'No Matching Students Found'}
                    </div>
                    <div style="font-size: 0.82rem; max-width: 420px; margin: 0 auto 0.85rem;">
                      ${allStudents.length === 0
                        ? (isCurrentlyAdmin ? 'Add students to the database to begin weekly personality evaluations.' : 'Students added by the administrator will appear here.')
                        : 'Try clearing your search or class/house filter to see all enrolled students.'}
                    </div>
                    ${allStudents.length === 0 ? `
                      <button type="button" class="btn-navy-action" style="font-size: 0.8rem; padding: 0 1.25rem; background: var(--stat-green); color: #fff;" onclick="app.openAddStudentModal()">
                        ${APP_ICONS.userPlus} + Add First Student
                      </button>
                    ` : `
                      <button type="button" class="btn-navy-action" style="font-size: 0.8rem; padding: 0 1.25rem;" onclick="app.navigateTo('students')">
                        Clear Filters (Show All ${allStudents.length})
                      </button>
                    `}
                  </td>
                </tr>
              ` : students.map((s, idx) => {
                const rawScoreData = currentWeek && this.store.state.scores[currentWeek.id] ? this.store.state.scores[currentWeek.id][s.id] : null;
                const maxPossible = (currentWeek && currentWeek.maxScore) || this.getMaxCriteriaScore();
                const scoreData = rawScoreData ? this.store.normalizeStudentWeekScore(rawScoreData, maxPossible) : null;
                const isEvaluated = scoreData && typeof scoreData.total === 'number' && (scoreData.evaluatorCount > 0 || scoreData.total > 0 || scoreData.evaluatorName);
                const subList = (scoreData && scoreData.submissions) ? Object.values(scoreData.submissions) : [];
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
                        <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                          <span class="status-badge-active" style="font-size: 0.72rem;">
                            ${subList.length > 1 ? 'Avg:' : 'Scored:'} <strong>${scoreData.total}/${maxPossible}</strong> (${scoreData.pct}%)
                          </span>
                          ${isCurrentlyAdmin && currentWeek ? `
                            <button type="button" class="btn-demo-pill" style="height: 22px; padding: 0 0.45rem; font-size: 0.68rem; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; font-weight: 700;" onclick="app.openStudentCommitteeScoresModal('${s.id}', '${currentWeek.id}')" title="View all committee members' scores for ${escapeHtml(s.name)}">
                              ${APP_ICONS.eye} ${subList.length} Evaluator${subList.length === 1 ? '' : 's'}
                            </button>
                          ` : ''}
                        </div>
                        ${isCurrentlyAdmin && subList.length > 0 ? `
                          <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.25rem;">
                            ${subList.map(sub => `
                              <span style="font-size: 0.67rem; background: #f8fafc; border: 1px solid #cbd5e1; color: #334155; padding: 0.08rem 0.4rem; border-radius: 999px; font-weight: 600;">
                                ${escapeHtml(sub.evaluatorName || 'Evaluator')}: <strong>${sub.total}/${maxPossible}</strong> (${sub.pct}%)
                              </span>
                            `).join('')}
                          </div>
                        ` : (scoreData.evaluatorName ? `<div style="font-size: 0.7rem; color: #64748b; margin-top: 0.15rem;">by ${escapeHtml(scoreData.evaluatorName)}</div>` : '')}
                      ` : `
                        <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                          <span class="status-badge-active" style="font-size: 0.72rem; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;">
                            Accepted
                          </span>
                          <span class="status-badge-pending" style="font-size: 0.72rem;">
                            Pending Scoring
                          </span>
                          ${isCurrentlyAdmin && currentWeek ? `
                            <button type="button" class="btn-demo-pill" style="height: 22px; padding: 0 0.45rem; font-size: 0.68rem; border: 1px solid #e2e8f0; background: #f8fafc; color: #475569; font-weight: 600;" onclick="app.openStudentCommitteeScoresModal('${s.id}', '${currentWeek.id}')" title="View committee member evaluation status">
                              ${APP_ICONS.eye} Committee Scores
                            </button>
                          ` : ''}
                        </div>
                      `}
                    </td>
                    <td style="text-align: center;">
                      <div style="display: inline-flex; gap: 0.35rem; align-items: center; justify-content: center;">
                        <button type="button" class="action-icon-btn" title="View Profile" onclick="app.navigateTo('student-profile', { studentId: '${s.id}' })">
                          ${APP_ICONS.eye}
                        </button>
                        ${isCurrentlyAdmin ? `
                          <button type="button" class="action-icon-btn" title="Edit Student" onclick="app.openEditStudentModal('${s.id}')">
                            ${APP_ICONS.edit}
                          </button>
                        ` : ''}
                        <button type="button" class="action-icon-btn" title="Enter Scores for Student" onclick="app.scoreStudent('${s.id}')" style="color: #1d4ed8; background: #eff6ff;">
                          ${APP_ICONS.assessment}
                        </button>
                        ${isCurrentlyAdmin ? `
                          <button type="button" class="action-icon-btn delete" title="Delete Student" onclick="app.deleteStudent('${s.id}')">
                            ${APP_ICONS.trash}
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

        <div class="pagination-container" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.25rem; border-top: 1px solid var(--card-border); font-size: 0.8rem; color: var(--text-muted);">
          <span>Showing ${students.length > 0 ? '1' : '0'} – ${students.length} of ${allStudents.length} students</span>
          <div class="pagination-pages" style="display: flex; align-items: center; gap: 0.35rem;">
            <button type="button" class="page-btn active" style="min-width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--navy-primary); background: var(--navy-primary); color: #ffffff; font-size: 0.76rem; font-weight: 700; cursor: default;">1</button>
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
    const loginEvaluator = this.getCurrentLoginEvaluator();
    let evaluator = loginEvaluator;
    if (isCurrentlyAdmin) {
      const selectedMem = members.find(m => m && m.id === this.store.state.selectedEvaluatorId) || members[0] || null;
      if (selectedMem) {
        const memInitials = (selectedMem.name || 'CM').split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CM';
        evaluator = {
          id: selectedMem.id,
          name: selectedMem.name,
          role: selectedMem.role || 'Evaluator',
          username: selectedMem.username || 'committee',
          avatar: memInitials,
          avatarBg: '#059669',
          status: selectedMem.status || 'Active'
        };
        this.store.state.selectedEvaluatorId = selectedMem.id;
      } else {
        evaluator = {
          id: 'no-member',
          name: 'No Committee Evaluator Selected',
          role: 'Committee Evaluator',
          username: '',
          avatar: 'CM',
          avatarBg: '#64748b',
          status: 'Pending'
        };
        this.store.state.selectedEvaluatorId = null;
      }
    } else {
      this.store.state.selectedEvaluatorId = loginEvaluator.id;
    }

    const currentWeekObj = (currentWeekId ? weeks.find(w => w.id === currentWeekId) : null) || weeks.find(w => w.isCurrent) || weeks[0] || null;
    const isWeekClosed = currentWeekObj && currentWeekObj.status === 'Closed';
    const isWeekUpcoming = currentWeekObj && currentWeekObj.status === 'Upcoming';
    const isScoringLocked = isWeekClosed || isWeekUpcoming || isCurrentlyAdmin;

    const classStudents = (currentClass === 'All Classes' || !currentClass)
      ? this.store.state.students
      : this.store.state.students.filter(s => s.class === currentClass);
    let selectedStudent = (currentStudentId ? this.store.state.students.find(s => s.id === currentStudentId) : null) || classStudents[0] || null;

    const maxTotalScore = this.getMaxCriteriaScore();
    const weekScores = currentWeekId ? (this.store.state.scores[currentWeekId] || {}) : {};
    const rawStudentScoreData = selectedStudent ? (weekScores[selectedStudent.id] || null) : null;
    const normalizedStudentScore = rawStudentScoreData ? this.store.normalizeStudentWeekScore(rawStudentScoreData, maxTotalScore) : null;
    const studentScoreData = (selectedStudent && rawStudentScoreData)
      ? (this.findSubmissionForEvaluator(rawStudentScoreData, evaluator) || {})
      : {};
    const criteria = (this.store.state.criteria && this.store.state.criteria.length > 0) ? this.store.state.criteria : CRITERIA_LIST;

    container.innerHTML = `
      <div class="view-header">
        <h2>${isCurrentlyAdmin ? 'View Weekly Assessment Scores' : 'Enter Weekly Assessment Scores'}</h2>
        <p>${isCurrentlyAdmin
          ? 'Select the week interval, class, committee evaluator, and student to view submitted assessment scores.'
          : 'Select the week interval, class, evaluator and student to enter scores.'}</p>
      </div>

      ${isWeekClosed ? `
        <!-- Prominent Admin Closed Scoring Enforcement Notice -->
        <div class="scoring-locked-banner" style="background: #fef2f2; border: 1.5px solid #f87171; border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="display: inline-flex; color: #991b1b;">${APP_ICONS.lock}</span>
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
              ${APP_ICONS.trophy} View Sealed Rankings
            </button>
            ${isCurrentlyAdmin ? `
              <button type="button" class="btn-demo-pill" style="border: 1px solid #dc2626; color: #991b1b; height: 32px; background: #fff;" onclick="app.quickToggleWeekStatus('${currentWeekObj.id}')">
                ${APP_ICONS.unlock} Re-Open Scoring
              </button>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${isWeekUpcoming ? `
        <!-- Prominent Upcoming Week Interval Notice -->
        <div class="scoring-locked-banner" style="background: #eff6ff; border: 1.5px solid #60a5fa; border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="display: inline-flex; color: #2563eb;">${APP_ICONS.clock}</span>
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
                ${APP_ICONS.play} Activate for Scoring Now
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
          <div class="evaluator-avatar" style="background: ${evaluator.avatarBg}; color: #ffffff;">${escapeHtml(evaluator.avatar)}</div>
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; color: var(--navy-primary);">
              ${isCurrentlyAdmin ? `Viewing Evaluator: ${escapeHtml(evaluator.name)}` : `Scoring as: ${escapeHtml(evaluator.name)}`}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              ${escapeHtml(evaluator.role)} • <span style="color: ${isCurrentlyAdmin ? '#0369a1' : 'var(--stat-green)'}; font-weight: 700;">● ${isCurrentlyAdmin ? 'Read-Only Committee Score View' : 'Active Evaluator Panel'}</span>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          ${currentWeekObj ? `
            <span style="font-size: 0.8rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill); display: inline-flex; align-items: center; gap: 0.35rem;">
              ${APP_ICONS.calendar} ${escapeHtml(currentWeekObj.name)} (${escapeHtml(currentWeekObj.dateRange)})
            </span>
            <span style="font-size: 0.8rem; font-weight: 700; background: ${isWeekClosed ? '#fee2e2' : (isWeekUpcoming ? '#eff6ff' : '#dcfce7')}; color: ${isWeekClosed ? '#991b1b' : (isWeekUpcoming ? '#1d4ed8' : '#15803d')}; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill); border: 1px solid ${isWeekClosed ? '#fca5a5' : (isWeekUpcoming ? '#bfdbfe' : '#86efac')};">
              ● ${isWeekClosed ? 'Closed (Results Sealed)' : (isWeekUpcoming ? 'Upcoming (Scheduled)' : 'Open for Scoring')}
            </span>
            ${isCurrentlyAdmin ? `<button type="button" class="btn-demo-pill" style="border: 1px solid var(--accent-gold); color: var(--navy-primary);" onclick="app.openSetWeekIntervalModal('${currentWeekObj.id}')">Set Interval</button>` : ''}
          ` : `
            <span style="font-size: 0.8rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 0.25rem 0.65rem; border-radius: var(--radius-pill);">
              No Active Week Interval Set
            </span>
            ${isCurrentlyAdmin ? `<button type="button" class="btn-demo-pill" style="border: 1px solid var(--accent-gold); color: var(--navy-primary);" onclick="app.openSetWeekIntervalModal()">+ Create Week Interval</button>` : ''}
          `}
        </div>
      </div>

      <div class="assessment-filter-card">
        <div class="filter-field">
          <label>Week Interval</label>
          <select id="assessWeekSelect" class="form-select">
            ${weeks.length === 0 ? '<option value="">No week intervals created yet</option>' : weeks.map(w => {
              let label = `${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})`;
              if (w.status === 'Closed') label += ' [Closed]';
              else if (w.status === 'Upcoming') label += ' [Upcoming]';
              else if (w.isCurrent) label += ' [Active]';
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

        <!-- Committee Evaluator Field Matching Current Login (or Admin Selector) -->
        <div class="filter-field">
          <label>Committee Evaluator</label>
          ${isCurrentlyAdmin ? `
            <select id="assessMemberSelect" class="form-select">
              ${members.length === 0
                ? '<option value="">-- No Committee Evaluators Registered --</option>'
                : members.map(m => `<option value="${escapeHtml(m.id)}" ${evaluator.id === m.id ? 'selected' : ''}>${escapeHtml(m.name)} (${escapeHtml(m.role || 'Evaluator')})</option>`).join('')}
            </select>
          ` : `
            <div id="assessCurrentEvaluatorDisplay" style="font-size: 0.88rem; font-weight: 700; color: var(--navy-primary); padding: 0.45rem 0.75rem; background: #f0fdf4; border: 1px solid #86efac; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 0.5rem; height: 38px;">
              <span style="display: inline-flex; color: #15803d;">${APP_ICONS.user}</span>
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
          <div class="scoring-table-title" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <span>Assessment Criteria (Each / 10) — ${isCurrentlyAdmin ? 'Viewing' : 'Evaluating'}: <strong>${escapeHtml(selectedStudent.name)}</strong> (${escapeHtml(selectedStudent.class)}, ${escapeHtml(selectedStudent.house)})</span>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              ${normalizedStudentScore && normalizedStudentScore.evaluatorCount > 0 ? `
                <span style="font-size: 0.75rem; font-weight: 700; background: #dcfce7; color: #15803d; padding: 0.2rem 0.6rem; border-radius: 999px;">
                  Overall Avg (${normalizedStudentScore.evaluatorCount} Evaluator${normalizedStudentScore.evaluatorCount === 1 ? '' : 's'}): ${normalizedStudentScore.total}/${maxTotalScore} (${normalizedStudentScore.pct}%)
                </span>
              ` : ''}
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">Max Total: ${maxTotalScore} Points</span>
            </div>
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
                ${escapeHtml(evaluator.name)}'s Score: <strong id="liveTotalDisplay">${studentScoreData.total || 0} / ${maxTotalScore}</strong> &nbsp;•&nbsp; 
                Percentage: <strong id="livePctDisplay" style="color: var(--accent-gold);">${studentScoreData.pct || 0}%</strong>
                ${isWeekClosed ? '<span style="color: #991b1b; font-weight: 800; margin-left: 0.5rem;">Sealed</span>' : ''}
              </div>

              ${isCurrentlyAdmin ? `
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <span style="font-size: 0.8rem; color: #0369a1; font-weight: 700;">
                    ● View-Only Mode (Only Committee Members Submit Scores)
                  </span>
                </div>
              ` : isScoringLocked ? `
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <span style="font-size: 0.8rem; color: ${isWeekClosed ? '#991b1b' : '#2563eb'}; font-weight: 700;">
                    ${isWeekClosed ? '● Scoring Closed by Admin' : '● Scheduled for Upcoming Cycle'}
                  </span>
                  <button type="button" class="btn-navy-action" disabled style="padding: 0 1.5rem; background: #94a3b8; cursor: not-allowed; opacity: 0.65;">
                    ${isWeekClosed ? 'Scoring Locked' : 'Scoring Scheduled'}
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

        ${isCurrentlyAdmin && currentWeekId ? `
          <div style="margin-top: 1.25rem;">
            ${this.renderStudentCommitteeBreakdownTableHtml(currentWeekId, selectedStudent.id)}
          </div>
        ` : ''}
      ` : `
        <div class="scoring-table-card" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="display: inline-flex; color: var(--text-muted); margin-bottom: 0.75rem;">${APP_ICONS.committee}</div>
          <h3 style="color: var(--navy-primary); margin-bottom: 0.5rem;">No Students Found in ${escapeHtml(currentClass)}</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.25rem;">
            There are currently no students registered in this class. You can add a new student using the button below or pick another class from the filter above.
          </p>
          <button type="button" class="btn-navy-action" style="background: var(--stat-green); color: #fff;" onclick="app.openAddStudentModal()">
            ${APP_ICONS.userPlus} + Add Student to Database
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
        this.store.save();
        const mem = this.store.state.members.find(m => m.id === e.target.value);
        this.renderAssessment();
        if (mem) this.showToast(`Viewing scores for ${mem.name}`);
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
    if (studentSelect) {
      studentSelect.addEventListener('change', (e) => {
        if (!e.target.value) return;
        this.store.state.selectedStudentId = e.target.value;
        const st = this.store.state.students.find(s => s.id === e.target.value);
        this.renderAssessment();
        if (st) this.showToast(`Loaded ${st.name}`);
      });
    }
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
        if (isCurrentlyAdmin) {
          this.showToast('Only committee members can submit or modify assessment scores.');
          return;
        }
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
          const val = Math.max(0, Math.min(10, parseInt(inp.value, 10) || 0));
          scoresObj[cId] = val;
          total += val;
        });
        const pct = Number(((total / maxTotalScore) * 100).toFixed(1));

        if (!this.store.state.scores[currentWeekId]) this.store.state.scores[currentWeekId] = {};
        const existingRaw = this.store.state.scores[currentWeekId][selectedStudent.id] || null;
        const existingNorm = existingRaw
          ? this.store.normalizeStudentWeekScore(existingRaw, maxTotalScore)
          : { submissions: {} };
        const mergedSubmissions = { ...(existingNorm && existingNorm.submissions ? existingNorm.submissions : {}) };

        const submissionEntry = {
          ...scoresObj,
          total,
          pct,
          evaluatorId: evaluator.id,
          evaluatorName: evaluator.name,
          evaluatorRole: evaluator.role,
          evaluatorUsername: evaluator.username,
          submittedAt: new Date().toISOString()
        };
        const evalKey = this.store.getEvaluatorScoreKey(submissionEntry);
        mergedSubmissions[evalKey] = submissionEntry;

        this.store.state.scores[currentWeekId][selectedStudent.id] = this.store.normalizeStudentWeekScore({
          ...submissionEntry,
          submissions: mergedSubmissions
        }, maxTotalScore);

        this.recalculateWeekResults(currentWeekId);
        const safeEvalKey = evalKey.replace(/[^a-z0-9_-]/gi, '_');
        this.addNotification({
          id: `notif-score-${currentWeekId}-${selectedStudent.id}-${safeEvalKey}`,
          type: 'score',
          icon: 'score',
          title: `Assessment Scores Submitted (${currentWeekObj ? currentWeekObj.name : 'Weekly'})`,
          message: `${evaluator.name} (${evaluator.role || 'Evaluator'}) submitted scores for ${selectedStudent.name} (${selectedStudent.class}): ${total}/${maxTotalScore} (${pct}%).`,
          actionLabel: 'View Rankings',
          actionView: 'rankings'
        });
        this.store.save();
        this.showToast(`Scores submitted for ${selectedStudent.name} by ${evaluator.name}: ${total}/${maxTotalScore} (${pct}%)`);
        this.renderAssessment();
      });
    }
  }

  renderRankings() {
    const container = document.getElementById('view-rankings');
    if (!container) return;

    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const weeks = this.store.state.weeks || [];
    const archivedWeeks = this.store.getArchivedWeeks();
    const allWeeks = [...weeks, ...archivedWeeks];
    const currentWeekId = this.store.state.selectedWeekId || (weeks[0] ? weeks[0].id : (archivedWeeks[0] ? archivedWeeks[0].id : null));
    const currentWeekObj = (currentWeekId ? allWeeks.find(w => w.id === currentWeekId) : null) || weeks[0] || archivedWeeks[0] || null;
    const isArchivedSelected = Boolean(currentWeekObj && (currentWeekObj.isArchived || currentWeekObj.status === 'Archived'));
    const maxScore = (currentWeekObj && currentWeekObj.maxScore) || this.getMaxCriteriaScore();
    const classes = isArchivedSelected ? (currentWeekObj.classes || []) : (this.store.state.classes || []);
    const currentClass = this.store.state.selectedClass || 'All';
    const weekScores = isArchivedSelected
      ? (currentWeekObj.scores || {})
      : (currentWeekId ? (this.store.state.scores[currentWeekId] || {}) : {});
    const rankedStudents = [];

    let targetStudents = isArchivedSelected ? [...(currentWeekObj.students || [])] : [...this.store.state.students];
    if (currentClass && currentClass !== 'All') {
      targetStudents = targetStudents.filter(s => s.class === currentClass);
    }

    targetStudents.forEach(s => {
      const rawSc = weekScores[s.id];
      const sc = rawSc ? this.store.normalizeStudentWeekScore(rawSc, maxScore) : null;
      if (sc && typeof sc.total === 'number' && (sc.evaluatorCount > 0 || sc.total > 0 || sc.evaluatorName)) {
        const subList = sc.submissions ? Object.values(sc.submissions) : [];
        rankedStudents.push({
          student: s,
          totalScore: sc.total,
          percentage: sc.pct,
          evaluatorCount: sc.evaluatorCount || subList.length || 1,
          submissions: subList
        });
      }
    });

    rankedStudents.sort((a, b) => b.totalScore - a.totalScore);
    const topWinner = rankedStudents.length > 0 ? rankedStudents[0] : null;

    container.innerHTML = `
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>Weekly Results & Rankings</h2>
          <p>Official student performance rankings for active cycles and archived past weeks.</p>
        </div>
        ${archivedWeeks.length > 0 ? `
          <button type="button" class="btn-navy-action" onclick="app.navigateTo('archive')">
            ${APP_ICONS.archive} Open Evaluation Archive (${archivedWeeks.length})
          </button>
        ` : ''}
      </div>

      <div class="assessment-filter-card">
        <div class="filter-field">
          <label>Week Interval</label>
          <select id="rankingsWeekSelect" class="form-select">
            ${allWeeks.length === 0 ? '<option value="">No week intervals created yet</option>' : ''}
            ${weeks.length > 0 ? `
              <optgroup label="Active & Scheduled Week Intervals">
                ${weeks.map(w => `<option value="${w.id}" ${w.id === currentWeekId ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})</option>`).join('')}
              </optgroup>
            ` : ''}
            ${archivedWeeks.length > 0 ? `
              <optgroup label="Past Weeks Evaluation Archive (Reference)">
                ${archivedWeeks.map(a => `<option value="${a.id}" ${a.id === currentWeekId ? 'selected' : ''}>[Archived] ${escapeHtml(a.name)} (${escapeHtml(a.dateRange)})</option>`).join('')}
              </optgroup>
            ` : ''}
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

      ${isArchivedSelected && currentWeekObj ? `
        <div class="archive-reference-notice-banner" style="margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="archive-badge-icon">${APP_ICONS.archive}</span>
            <div>
              <div style="font-weight: 800; font-size: 0.92rem; color: var(--navy-primary);">
                Viewing Archived Evaluation Record: ${escapeHtml(currentWeekObj.name)} (${escapeHtml(currentWeekObj.dateRange)})
              </div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">
                This past week's evaluation has been pushed to the Archive for reference. Active student queues remain clean for new entries.
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn-navy-action" style="height: 32px; font-size: 0.76rem; padding: 0 0.85rem;" onclick="app.openArchivedWeekReport('${currentWeekObj.id}')">
              ${APP_ICONS.printer} Print Certificate
            </button>
            ${weeks[0] ? `
              <button type="button" class="btn-navy-action" style="height: 32px; font-size: 0.76rem; padding: 0 0.85rem; background: #059669;" onclick="app.viewWeekDetail('${weeks[0].id}')">
                Switch to Active Week (${escapeHtml(weeks[0].name)})
              </button>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${topWinner ? `
        <div class="results-winner-banner">
          <div class="winner-banner-left">
            <div class="winner-banner-avatar" style="font-size: 1.25rem; font-weight: 800;">${escapeHtml((topWinner.student.name || 'ST').split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase())}</div>
            <div>
              <div class="winner-banner-title">
                <span>Student Personality of the Week ${isArchivedSelected ? `(${escapeHtml(currentWeekObj.name)} • Archived)` : ''}</span>
              </div>
              <div class="winner-banner-name">${escapeHtml(topWinner.student.name)}</div>
              <div class="winner-banner-sub">${escapeHtml(topWinner.student.class)} | ${escapeHtml(topWinner.student.house)}</div>
            </div>
          </div>

          <div class="winner-banner-scores">
            <div class="banner-score-col">
              <div class="banner-score-lbl">${topWinner.evaluatorCount > 1 ? `Avg Score (${topWinner.evaluatorCount} Evaluators)` : 'Total Score'}</div>
              <div class="banner-score-val">${topWinner.totalScore} / ${maxScore}</div>
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
                ${(isCurrentlyAdmin || isArchivedSelected) ? '<th>Committee Members\' Scores</th>' : ''}
                <th style="text-align: center;">${isCurrentlyAdmin ? 'Overall / Avg Score' : 'Total Score'}</th>
                <th style="text-align: center;">Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${rankedStudents.length === 0 ? `
                <tr>
                  <td colspan="${(isCurrentlyAdmin || isArchivedSelected) ? '7' : '6'}" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    <div style="display: inline-flex; color: var(--text-muted); margin-bottom: 0.5rem;">${APP_ICONS.rankings}</div><br>
                    No student scores recorded yet for this week interval.<br>
                    <small>Scores entered in the Assessment portal will automatically rank students here.${archivedWeeks.length > 0 ? ` Looking for past evaluations? Select <strong>[Archived] ${escapeHtml(archivedWeeks[0].name)}</strong> in the Week Interval dropdown above.` : ''}</small>
                  </td>
                </tr>
              ` : rankedStudents.map((r, idx) => {
                const rankNum = idx + 1;
                return `
                  <tr>
                    <td style="text-align: center;">
                      <span class="rank-badge-circle rank-${rankNum}">
                        ${rankNum}
                      </span>
                    </td>
                    <td>
                      ${isArchivedSelected ? `
                        <a href="javascript:void(0)" onclick="app.openStudentCommitteeScoresModal('${r.student.id}', '${currentWeekId}')" style="font-weight: 700; color: var(--navy-primary);">
                          ${escapeHtml(r.student.name)}
                        </a>
                        <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(r.student.id)} • Archived</div>
                      ` : `
                        <a href="javascript:void(0)" onclick="app.navigateTo('student-profile', { studentId: '${r.student.id}' })" style="font-weight: 700; color: var(--navy-primary);">
                          ${escapeHtml(r.student.name)}
                        </a>
                      `}
                    </td>
                    <td>${escapeHtml(r.student.class)}</td>
                    <td>${escapeHtml(r.student.house)}</td>
                    ${(isCurrentlyAdmin || isArchivedSelected) ? `
                      <td>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center;">
                          ${r.submissions.map(sub => `
                            <span style="font-size: 0.7rem; background: #f8fafc; border: 1px solid #cbd5e1; color: #1e293b; padding: 0.12rem 0.45rem; border-radius: 999px; font-weight: 600;">
                              ${escapeHtml(sub.evaluatorName || 'Evaluator')}: <strong>${sub.total}/${maxScore}</strong> (${sub.pct}%)
                            </span>
                          `).join('')}
                          ${currentWeekId ? `
                            <button type="button" class="btn-demo-pill" style="height: 22px; padding: 0 0.45rem; font-size: 0.68rem; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; font-weight: 700;" onclick="app.openStudentCommitteeScoresModal('${r.student.id}', '${currentWeekId}')">
                              ${APP_ICONS.eye} Breakdown
                            </button>
                          ` : ''}
                        </div>
                      </td>
                    ` : ''}
                    <td style="text-align: center; font-weight: 700;">${r.totalScore} / ${maxScore}</td>
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
        this.store.state.selectedClass = 'All';
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

    const weeks = this.store.state.weeks || [];
    const archivedWeeks = this.store.getArchivedWeeks();
    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';

    container.innerHTML = `
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>Previous &amp; Active Week Intervals</h2>
          <p>Manage active and scheduled weekly assessment intervals. Completed weeks can be pushed to the standalone Archive.</p>
        </div>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button type="button" class="btn-navy-action" style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a;" onclick="app.navigateTo('archive')">
            ${APP_ICONS.archive} Open Standalone Archive (${archivedWeeks.length})
          </button>
          ${isCurrentlyAdmin ? `
            <button type="button" class="btn-navy-action" onclick="app.openSetWeekIntervalModal()">
              ${APP_ICONS.calendar} + Set New Week Interval
            </button>
          ` : ''}
        </div>
      </div>

      <!-- ACTIVE & SCHEDULED WEEK INTERVALS -->
      <div class="scoring-table-card" style="padding: 0; overflow: hidden;">
        <div class="scoring-table-title directory-header-bar" style="padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="display: inline-flex; color: var(--navy-primary);">${APP_ICONS.calendar}</span>
              <span style="font-weight: 800; font-size: 1rem; color: var(--navy-primary);">Active &amp; Scheduled Week Intervals</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">
              Current open and upcoming assessment intervals for student evaluations.
            </div>
          </div>
        </div>
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
                <th style="text-align: center; width: 220px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${weeks.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
                    <div style="display: inline-flex; color: var(--text-muted); margin-bottom: 0.5rem;">${APP_ICONS.calendar}</div><br>
                    <strong>No active week intervals configured yet.</strong><br>
                    <span style="font-size: 0.85rem;">${isCurrentlyAdmin ? 'Click "+ Set New Week Interval" above to create your next scoring cycle.' : 'Week intervals configured by the administrator will appear here.'}</span>
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
                      ● ${w.status === 'Closed' ? 'Closed (Sealed)' : (w.status === 'Upcoming' ? 'Upcoming' : 'Open')}
                    </span>
                  </td>
                  <td>
                    <span style="font-weight: 700; color: var(--navy-primary);">
                      ${w.topStudent ? escapeHtml(w.topStudent) : '<span style="color: var(--text-muted); font-weight: normal;">Awaiting New Entries</span>'}
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
                        <button class="btn-navy-action" style="height: 30px; padding: 0 0.65rem; font-size: 0.73rem; background: #b45309; color: #fff;" title="Push this week's evaluation into the standalone Archive" onclick="app.archiveWeekEvaluation('${w.id}')">
                          ${APP_ICONS.archive} Archive
                        </button>
                        ${w.status === 'Upcoming' ? `
                          <button class="action-icon-btn" title="Activate this week for scoring now" style="width: 30px; height: 30px; color: #2563eb; background: #eff6ff;" onclick="app.activateUpcomingWeek('${w.id}')">
                            ${APP_ICONS.play}
                          </button>
                        ` : `
                          <button class="action-icon-btn" title="${w.status === 'Closed' ? 'Re-Open Scoring' : 'Close Scoring (Seal Results)'}" style="width: 30px; height: 30px;" onclick="app.quickToggleWeekStatus('${w.id}')">
                            ${w.status === 'Closed' ? APP_ICONS.unlock : APP_ICONS.lock}
                          </button>
                        `}
                        <button class="action-icon-btn" title="Edit Week Interval" style="width: 30px; height: 30px;" onclick="app.openSetWeekIntervalModal('${w.id}')">
                          ${APP_ICONS.edit}
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

  // =========================================================================
  // STANDALONE VIEW: PAST WEEKS EVALUATION ARCHIVE
  // =========================================================================
  renderArchive() {
    let container = document.getElementById('view-archive');
    if (!container && typeof document !== 'undefined') {
      const mainEl = document.querySelector('.olag-main-content');
      if (mainEl && typeof document.createElement === 'function') {
        container = document.createElement('section');
        container.id = 'view-archive';
        container.className = 'page-view';
        mainEl.appendChild(container);
      }
    }
    if (!container) return;

    const archivedWeeks = this.store.getArchivedWeeks();
    const criteria = (this.store.state.criteria && this.store.state.criteria.length > 0) ? this.store.state.criteria : CRITERIA_LIST;

    let selectedArchive = null;
    if (this.store.state.selectedArchiveWeekId) {
      selectedArchive = archivedWeeks.find(a => a && a.id === this.store.state.selectedArchiveWeekId);
    }
    if (!selectedArchive && archivedWeeks.length > 0) {
      selectedArchive = archivedWeeks[0];
      this.store.state.selectedArchiveWeekId = selectedArchive.id;
    }

    const archiveStudentsRanked = [];
    if (selectedArchive) {
      const archScores = selectedArchive.scores || {};
      const archMax = selectedArchive.maxScore || 70;
      (selectedArchive.students || []).forEach(st => {
        if (!st || !st.id) return;
        const sc = archScores[st.id] ? this.store.normalizeStudentWeekScore(archScores[st.id], archMax) : null;
        if (sc && typeof sc.total === 'number') {
          const subs = sc.submissions ? Object.values(sc.submissions) : [];
          archiveStudentsRanked.push({
            student: st,
            scoreEntry: sc,
            totalScore: sc.total,
            percentage: sc.pct,
            maxScore: archMax,
            submissions: subs
          });
        }
      });
      archiveStudentsRanked.sort((a, b) => b.totalScore - a.totalScore);
    }
    const archiveTopWinner = archiveStudentsRanked.length > 0 ? archiveStudentsRanked[0] : null;

    container.innerHTML = `
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>Past Weeks Evaluation Archive</h2>
          <p>Standalone reference archive of past weekly evaluations, top winners, 4-finalist rankings, and 7-criteria committee scores.</p>
        </div>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button type="button" class="btn-navy-action" style="background: #e2e8f0; color: #1e293b;" onclick="app.navigateTo('previous-weeks')">
            ${APP_ICONS.calendar} Active Week Intervals
          </button>
          ${selectedArchive ? `
            <button type="button" class="btn-navy-action" style="background: #059669; color: #fff;" onclick="app.openArchivedWeekReport('${selectedArchive.id}')">
              ${APP_ICONS.printer} Print Official Report
            </button>
          ` : ''}
        </div>
      </div>

      <!-- STANDALONE ARCHIVE KPI SUMMARY CARDS -->
      <div class="stat-cards-grid" style="margin-bottom: 1.35rem;">
        <div class="stat-card card-orange">
          <div class="stat-card-text">
            <span class="stat-card-title">Archived Cycles</span>
            <span class="stat-card-value">${archivedWeeks.length}</span>
            <span class="stat-card-sub">Preserved past evaluations</span>
          </div>
          <div class="stat-card-icon-badge">
            ${APP_ICONS.archive}
          </div>
        </div>

        <div class="stat-card card-blue">
          <div class="stat-card-text">
            <span class="stat-card-title">Selected Archive</span>
            <span class="stat-card-value" style="font-size: 1.35rem;">${selectedArchive ? escapeHtml(selectedArchive.name) : 'None'}</span>
            <span class="stat-card-sub">${selectedArchive ? `(${escapeHtml(selectedArchive.dateRange)})` : 'No cycle selected'}</span>
          </div>
          <div class="stat-card-icon-badge">
            ${APP_ICONS.calendar}
          </div>
        </div>

        <div class="stat-card card-green">
          <div class="stat-card-text">
            <span class="stat-card-title">Archived Winner</span>
            <span class="stat-card-value" style="font-size: 1.2rem;">${selectedArchive && selectedArchive.topStudent ? escapeHtml(selectedArchive.topStudent) : '—'}</span>
            <span class="stat-card-sub">${selectedArchive && selectedArchive.totalScore ? `${selectedArchive.totalScore}/${selectedArchive.maxScore || 70} (${selectedArchive.percentage}%)` : 'No winner recorded'}</span>
          </div>
          <div class="stat-card-icon-badge">
            ${APP_ICONS.trophy}
          </div>
        </div>

        <div class="stat-card card-purple">
          <div class="stat-card-text">
            <span class="stat-card-title">Evaluated Finalists</span>
            <span class="stat-card-value">${archiveStudentsRanked.length}</span>
            <span class="stat-card-sub">Full 7-criteria records</span>
          </div>
          <div class="stat-card-icon-badge">
            ${APP_ICONS.students}
          </div>
        </div>
      </div>

      <!-- SECTION 1: PAST WEEKS EVALUATION ARCHIVE SUMMARY TABLE -->
      <div class="scoring-table-card" style="padding: 0; overflow: hidden; margin-bottom: 1.5rem;" id="pastWeeksArchiveSection">
        <div class="scoring-table-title directory-header-bar" style="padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="display: inline-flex; color: #b45309;">${APP_ICONS.archive}</span>
              <span style="font-weight: 800; font-size: 1.02rem; color: var(--navy-primary);">Past Weeks Evaluation Archive (Reference Records)</span>
              <span class="status-badge-archived" style="font-size: 0.72rem;">
                ${archivedWeeks.length} Archived Cycle${archivedWeeks.length === 1 ? '' : 's'}
              </span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">
              Completed weekly evaluations moved to the archive so you can refer to past winners, students, and rubric scores while keeping current entries clean.
            </div>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="table-standard">
            <thead>
              <tr>
                <th>Archived Week</th>
                <th>Date Range</th>
                <th>Status</th>
                <th style="text-align: center;">Evaluated Students</th>
                <th>Top Student (Winner)</th>
                <th style="text-align: center;">Winning Score</th>
                <th style="text-align: center;">Percentage</th>
                <th style="text-align: center; width: 250px;">Reference Actions</th>
              </tr>
            </thead>
            <tbody>
              ${archivedWeeks.length === 0 ? `
                <tr>
                  <td colspan="8" style="text-align: center; padding: 2.25rem 1rem; color: var(--text-muted);">
                    No past weeks have been archived yet. Completed weeks pushed to the archive will appear here for permanent reference.
                  </td>
                </tr>
              ` : archivedWeeks.map(arch => {
                const isSelected = selectedArchive && selectedArchive.id === arch.id;
                const studentCount = Array.isArray(arch.students) ? arch.students.length : 0;
                return `
                  <tr class="${isSelected ? 'archive-row-selected' : ''}">
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.4rem;">
                        <strong>${escapeHtml(arch.name)}</strong>
                        ${isSelected ? '<span style="font-size: 0.66rem; font-weight: 800; background: #fef3c7; color: #b45309; border: 1px solid #fde68a; padding: 0.08rem 0.45rem; border-radius: 999px;">Viewing Below</span>' : ''}
                      </div>
                    </td>
                    <td>${escapeHtml(arch.dateRange)}</td>
                    <td>
                      <span class="status-badge-archived" style="font-size: 0.73rem;">
                        ${APP_ICONS.archive} Archived
                      </span>
                    </td>
                    <td style="text-align: center; font-weight: 700;">
                      ${studentCount} Student${studentCount === 1 ? '' : 's'}
                    </td>
                    <td>
                      <span style="font-weight: 800; color: var(--navy-primary);">
                        ${arch.topStudent ? escapeHtml(arch.topStudent) : '—'}
                      </span>
                    </td>
                    <td style="text-align: center; font-weight: 800;">
                      ${arch.totalScore ? `${arch.totalScore} / ${arch.maxScore || 70}` : '—'}
                    </td>
                    <td style="text-align: center; font-weight: 800; color: #b45309;">
                      ${arch.percentage ? `${arch.percentage}%` : '—'}
                    </td>
                    <td style="text-align: center;">
                      <div style="display: inline-flex; gap: 0.35rem; align-items: center; flex-wrap: nowrap;">
                        <button type="button" class="btn-navy-action" style="height: 28px; padding: 0 0.65rem; font-size: 0.73rem;" onclick="app.selectArchivedWeek('${arch.id}')">
                          ${APP_ICONS.eye} Inspect
                        </button>
                        <button type="button" class="btn-navy-action" style="height: 28px; padding: 0 0.65rem; font-size: 0.73rem; background: #0284c7;" onclick="app.viewWeekDetail('${arch.id}')" title="Open in Results & Rankings">
                          ${APP_ICONS.rankings} Rankings
                        </button>
                        <button type="button" class="btn-navy-action" style="height: 28px; padding: 0 0.65rem; font-size: 0.73rem; background: #059669;" onclick="app.openArchivedWeekReport('${arch.id}')" title="Open Official Printable Certificate">
                          ${APP_ICONS.printer} Report
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

      <!-- SECTION 2: DETAILED ARCHIVE EXPLORER FOR SELECTED ARCHIVED WEEK -->
      ${selectedArchive ? `
        <div class="scoring-table-card archive-detail-explorer-card" style="padding: 1.25rem; margin-bottom: 1.75rem;" id="archiveExplorerDetailCard">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.15rem; padding-bottom: 0.9rem; border-bottom: 1px solid var(--card-border);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="archive-badge-icon">${APP_ICONS.archive}</span>
                <h3 style="margin: 0; font-size: 1.08rem; font-weight: 800; color: var(--navy-primary);">
                  Archived Evaluation Details: ${escapeHtml(selectedArchive.name)} (${escapeHtml(selectedArchive.dateRange)})
                </h3>
                <span class="status-badge-archived" style="font-size: 0.72rem;">Preserved Reference</span>
              </div>
              <p style="margin: 0.25rem 0 0; font-size: 0.8rem; color: var(--text-muted);">
                Complete historical snapshot of all ${archiveStudentsRanked.length} evaluated students, 7-criteria rubric scores, and committee evaluator submissions for ${escapeHtml(selectedArchive.name)}.
              </p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              ${archivedWeeks.length > 1 ? `
                <select class="form-select" style="height: 34px; font-size: 0.8rem; width: 230px;" onchange="app.selectArchivedWeek(this.value)">
                  ${archivedWeeks.map(a => `<option value="${a.id}" ${a.id === selectedArchive.id ? 'selected' : ''}>${escapeHtml(a.name)} (${escapeHtml(a.dateRange)})</option>`).join('')}
                </select>
              ` : ''}
              <button type="button" class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem;" onclick="app.viewWeekDetail('${selectedArchive.id}')">
                ${APP_ICONS.rankings} View in Rankings
              </button>
              <button type="button" class="btn-navy-action" style="height: 34px; padding: 0 0.85rem; font-size: 0.78rem; background: #059669;" onclick="app.openArchivedWeekReport('${selectedArchive.id}')">
                ${APP_ICONS.printer} Print Official Report
              </button>
            </div>
          </div>

          ${archiveTopWinner ? `
            <div class="results-winner-banner" style="margin-bottom: 1.25rem;">
              <div class="winner-banner-left">
                <div class="winner-banner-avatar" style="font-size: 1.25rem; font-weight: 800;">
                  ${escapeHtml((archiveTopWinner.student.name || 'ST').split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase())}
                </div>
                <div>
                  <div class="winner-banner-title">
                    <span>Archived Student Personality of the Week (${escapeHtml(selectedArchive.name)})</span>
                  </div>
                  <div class="winner-banner-name">${escapeHtml(archiveTopWinner.student.name)}</div>
                  <div class="winner-banner-sub">${escapeHtml(archiveTopWinner.student.class)} | ${escapeHtml(archiveTopWinner.student.house)}</div>
                </div>
              </div>
              <div class="winner-banner-scores">
                <div class="banner-score-col">
                  <div class="banner-score-lbl">Winning Score</div>
                  <div class="banner-score-val">${archiveTopWinner.totalScore} / ${archiveTopWinner.maxScore}</div>
                </div>
                <div class="banner-score-col">
                  <div class="banner-score-lbl">Percentage</div>
                  <div class="banner-score-pct">${archiveTopWinner.percentage}%</div>
                </div>
              </div>
            </div>
          ` : ''}

          <div style="overflow-x: auto;">
            <table class="table-standard" style="min-width: 860px;">
              <thead>
                <tr>
                  <th style="width: 58px; text-align: center;">Rank</th>
                  <th>Student Name &amp; ID</th>
                  <th>Class &amp; House</th>
                  ${criteria.map(c => `<th style="text-align: center; font-size: 0.7rem;" title="${escapeHtml(c.name)} (Max 10)">C${c.no}<br><span style="font-weight: 600; font-size: 0.63rem; text-transform: none;">${escapeHtml(c.name.split(' ')[0])}</span></th>`).join('')}
                  <th>Evaluated By</th>
                  <th style="text-align: center;">Total Score</th>
                  <th style="text-align: center;">Percentage</th>
                  <th style="text-align: center; width: 120px;">Breakdown</th>
                </tr>
              </thead>
              <tbody>
                ${archiveStudentsRanked.map((item, idx) => {
                  const rankNum = idx + 1;
                  const st = item.student;
                  const sc = item.scoreEntry;
                  return `
                    <tr>
                      <td style="text-align: center;">
                        <span class="rank-badge-circle rank-${rankNum}">${rankNum}</span>
                      </td>
                      <td>
                        <div style="font-weight: 800; color: var(--navy-primary);">${escapeHtml(st.name)}</div>
                        <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(st.id)} • ${escapeHtml(st.gender || '')}</div>
                      </td>
                      <td>
                        <div style="font-weight: 700; font-size: 0.82rem;">${escapeHtml(st.class)}</div>
                        <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(st.house)}</div>
                      </td>
                      ${criteria.map(c => `
                        <td style="text-align: center; font-weight: 700; color: var(--navy-primary);">
                          ${typeof sc[c.id] === 'number' ? sc[c.id] : '—'}
                        </td>
                      `).join('')}
                      <td>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                          ${item.submissions.map(sub => `
                            <span style="font-size: 0.7rem; background: #dcfce7; color: #166534; border: 1px solid #86efac; padding: 0.12rem 0.45rem; border-radius: 999px; font-weight: 700;">
                              ${escapeHtml(sub.evaluatorName || 'Evaluator')} (${sub.total}/${item.maxScore})
                            </span>
                          `).join('')}
                        </div>
                      </td>
                      <td style="text-align: center; font-weight: 800; color: var(--navy-primary);">
                        ${item.totalScore} / ${item.maxScore}
                      </td>
                      <td style="text-align: center; font-weight: 800; color: ${rankNum === 1 ? '#b45309' : '#15803d'};">
                        ${item.percentage}%
                      </td>
                      <td style="text-align: center;">
                        <button type="button" class="btn-navy-action" style="height: 28px; padding: 0 0.6rem; font-size: 0.72rem;" onclick="app.openStudentCommitteeScoresModal('${st.id}', '${selectedArchive.id}')">
                          ${APP_ICONS.eye} Breakdown
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    `;
  }

  selectArchivedWeek(archiveWeekId) {
    if (!archiveWeekId) return;
    this.store.state.selectedArchiveWeekId = archiveWeekId;
    this.store.save();
    if (this.store.state.currentView !== 'archive') {
      this.navigateTo('archive');
    } else {
      this.renderArchive();
    }
    const detailCard = document.getElementById('archiveExplorerDetailCard');
    if (detailCard && typeof detailCard.scrollIntoView === 'function') {
      detailCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openArchivedWeekReport(archiveWeekId) {
    if (!archiveWeekId) return;
    this.store.state.selectedWeekId = archiveWeekId;
    this.store.state.selectedClass = 'All';
    this.store.save();
    this.navigateTo('reports');
  }

  archiveWeekEvaluation(weekId) {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can archive weekly evaluations.');
      return;
    }
    const week = (this.store.state.weeks || []).find(w => w && w.id === weekId);
    if (!week) {
      this.showToast('Week interval not found.');
      return;
    }

    // Normalize and recalculate current scores before closing/archiving evaluation
    const maxScore = week.maxScore || 70;
    const rawWeekScores = (this.store.state.scores && this.store.state.scores[weekId]) ? this.store.state.scores[weekId] : {};
    const weekScores = {};
    Object.entries(rawWeekScores).forEach(([sId, rawEntry]) => {
      const norm = this.store.normalizeStudentWeekScore(rawEntry, maxScore);
      if (norm) weekScores[sId] = norm;
    });
    if (this.store.state.scores) {
      this.store.state.scores[weekId] = weekScores;
    }
    this.recalculateWeekResults(weekId);

    const weekNoms = this.store.getNominationsForWeek(weekId);
    const involvedStudentIds = new Set([
      ...Object.keys(weekScores),
      ...weekNoms.map(n => n.studentId)
    ]);
    let snapshotStudents = (this.store.state.students || []).filter(s => s && involvedStudentIds.has(s.id));
    if (snapshotStudents.length === 0 && (this.store.state.students || []).length > 0) {
      snapshotStudents = [...this.store.state.students];
    }

    if (!confirm(`Push "${week.name} (${week.dateRange})" into the Past Weeks Evaluation Archive?\n\nThis will preserve all student evaluations, rankings, and committee scores for "${week.name}" in the Archive for future reference, and prepare the active workspace for new entries.`)) {
      return;
    }

    const archiveEntry = {
      id: week.id,
      no: (this.store.getArchivedWeeks().length || 0) + 1,
      name: week.name,
      dateRange: week.dateRange,
      startDate: week.startDate,
      endDate: week.endDate,
      status: 'Archived',
      isArchived: true,
      isCurrent: false,
      maxScore: week.maxScore || 70,
      topStudent: week.topStudent || null,
      totalScore: week.totalScore || null,
      percentage: week.percentage || null,
      archivedAt: new Date().toISOString(),
      classes: [...new Set(snapshotStudents.map(s => s.class).filter(Boolean))],
      students: JSON.parse(JSON.stringify(snapshotStudents)),
      scores: JSON.parse(JSON.stringify(weekScores)),
      nominations: JSON.parse(JSON.stringify(weekNoms))
    };

    if (!Array.isArray(this.store.state.archivedWeeks)) {
      this.store.state.archivedWeeks = [];
    }
    const existingIdx = this.store.state.archivedWeeks.findIndex(a => a && a.id === week.id);
    if (existingIdx >= 0) {
      this.store.state.archivedWeeks[existingIdx] = archiveEntry;
    } else {
      this.store.state.archivedWeeks.unshift(archiveEntry);
    }

    // Remove archived week from active weeks & clean active queue for new entries
    this.store.state.weeks = (this.store.state.weeks || []).filter(w => w && w.id !== week.id);
    if (this.store.state.scores && this.store.state.scores[week.id]) {
      delete this.store.state.scores[week.id];
    }
    this.store.state.nominations = (this.store.state.nominations || []).filter(n => n && n.weekId !== week.id);
    this.store.state.students = [];
    this.store.state.classes = [];
    this.store.state.totalStudentsCount = 0;
    this.store.state.selectedStudentId = null;
    this.store.state.selectedArchiveWeekId = archiveEntry.id;

    if (this.store.state.weeks.length > 0) {
      if (!this.store.state.weeks.some(w => w.isCurrent)) {
        this.store.state.weeks[0].isCurrent = true;
        this.store.state.weeks[0].status = 'Open';
      }
      this.store.state.selectedWeekId = this.store.state.weeks[0].id;
    } else {
      const nextNumMatch = String(week.name || '').match(/(\d+)/g);
      const nextNum = nextNumMatch ? (parseInt(nextNumMatch[nextNumMatch.length - 1], 10) + 1) : 9;
      const newActiveWeek = {
        ...DEFAULT_ACTIVE_WEEK,
        id: `week-${Date.now()}`,
        name: `Week ${nextNum}`,
        isCurrent: true,
        status: 'Open',
        updatedAt: new Date().toISOString()
      };
      this.store.state.weeks.push(newActiveWeek);
      this.store.state.selectedWeekId = newActiveWeek.id;
    }

    this.store.normalizeStudentsAndClasses(this.store.state);
    this.store.state.currentView = 'archive';
    this.store.save();
    this.showToast(`Pushed ${week.name} (${week.dateRange}) to the Past Weeks Evaluation Archive!`);
    this.render();
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
      if (roleFilter === 'HeadPrefect') matchRole = (m.role || '').includes('Prefect') && !(m.role || '').includes('Protocol');
      else if (roleFilter === 'ProtocolPrefect') matchRole = (m.role || '').includes('Protocol');
      else if (roleFilter !== 'All') matchRole = (m.role || '') === roleFilter;

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
        <div class="scoring-table-title directory-header-bar" style="padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 0.75rem;">
          <div style="min-width: 0;">
            <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
              <span style="display: inline-flex; color: var(--navy-primary);">${APP_ICONS.committee}</span>
              <span style="font-weight: 800; font-size: 1rem; color: var(--navy-primary); white-space: nowrap;">Registered Committee Members &amp; Evaluators</span>
              <span style="background: #e0f2fe; color: #0369a1; font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.55rem; border-radius: 999px; white-space: nowrap;">
                ${hasActiveFilter ? `${filtered.length} of ${allMembers.length} Members` : `${allMembers.length} Registered Member${allMembers.length === 1 ? '' : 's'}`}
              </span>
            </div>
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Official head prefects evaluators authorized to submit weekly student assessments.
            </div>
          </div>

          <div class="directory-toolbar-controls" style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: nowrap; flex-shrink: 0;">
            <input type="text" id="committeeSearchInput" class="form-input"
              placeholder="Search member..."
              value="${escapeHtml(this.store.state.committeeSearchQuery || '')}"
              style="height: 32px; font-size: 0.76rem; width: 145px; padding: 0 0.6rem;" />

            <select id="committeeRoleFilterSelect" class="form-select" style="height: 32px; font-size: 0.76rem; width: 155px; padding: 0 1.4rem 0 0.5rem; font-weight: 600;">
              <option value="All" ${roleFilter === 'All' ? 'selected' : ''}>All Roles</option>
              <option value="HeadPrefect" ${roleFilter === 'HeadPrefect' ? 'selected' : ''}>Head Prefects (4)</option>
              <option value="ProtocolPrefect" ${roleFilter === 'ProtocolPrefect' ? 'selected' : ''}>Head Protocol Prefects (4)</option>
            </select>

            <select id="committeeStatusFilterSelect" class="form-select" style="height: 32px; font-size: 0.76rem; width: 120px; padding: 0 1.4rem 0 0.5rem; font-weight: 600;">
              <option value="All" ${statusFilter === 'All' ? 'selected' : ''}>All Status</option>
              <option value="Active" ${statusFilter === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Observer" ${statusFilter === 'Observer' ? 'selected' : ''}>Observer</option>
              <option value="On Leave" ${statusFilter === 'On Leave' ? 'selected' : ''}>On Leave</option>
            </select>

            <button type="button" class="btn-navy-action" style="height: 32px; padding: 0 0.75rem; font-size: 0.76rem; white-space: nowrap;" onclick="app.openAddMemberModal()">
              ${APP_ICONS.userPlus} + Add Member
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
                    <div style="display: inline-flex; color: var(--text-muted); margin-bottom: 0.4rem;">${APP_ICONS.committee}</div>
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
                        ${APP_ICONS.userPlus} + Register First Committee Member
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
                        <button type="button" class="action-icon-btn" title="View Member's Scores" onclick="app.evaluateAsMember('${m.id}')" style="color: #059669; background: #ecfdf5;">
                          ${APP_ICONS.assessment}
                        </button>
                        <button type="button" class="action-icon-btn" title="Edit Member" onclick="app.openEditMemberModal('${m.id}')">
                          ${APP_ICONS.edit}
                        </button>
                        <button type="button" class="action-icon-btn delete" title="Delete Committee Member" onclick="app.deleteMember('${m.id}')">
                          ${APP_ICONS.trash}
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
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can delete committee members.');
      return;
    }
    const member = this.store.state.members.find(m => m.id === memberId);
    if (!member) {
      this.showToast('Committee member not found.', 'error');
      return;
    }

    if (confirm(`Are you sure you want to remove committee member "${member.name}" (${member.role})? This will delete their evaluator credentials.`)) {
      if (!Array.isArray(this.store.state.deletedMemberIds)) {
        this.store.state.deletedMemberIds = [];
      }
      if (!this.store.state.deletedMemberIds.includes(memberId)) {
        this.store.state.deletedMemberIds.push(memberId);
      }
      this.store.state.members = this.store.state.members.filter(m => m.id !== memberId);
      if (this.store.state.selectedEvaluatorId === memberId) {
        this.store.state.selectedEvaluatorId = this.store.state.members.length > 0 ? this.store.state.members[0].id : null;
      }
      this.store.save();
      this.showToast(`Removed committee member: ${member.name}`);
      this.render();
    }
  }

  renderStudentProfile() {
    const container = document.getElementById('view-student-profile');
    if (!container) return;

    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const studentId = this.store.state.selectedStudentId;
    const student = (studentId ? this.store.state.students.find(s => s.id === studentId) : null) || this.store.state.students[0] || null;

    if (!student) {
      container.innerHTML = `
        <div class="breadcrumb-nav">
          <a href="javascript:void(0)" onclick="app.navigateTo('students')">Students</a> &gt; <span>Profile</span>
        </div>
        <div class="scoring-table-card" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="display: inline-flex; color: var(--text-muted); margin-bottom: 0.75rem;">${APP_ICONS.user}</div>
          <h3 style="color: var(--navy-primary); margin-bottom: 0.5rem;">No Student Selected</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.25rem;">
            There are currently no students registered in the system or no student has been selected.
          </p>
          ${isCurrentlyAdmin ? `
            <button type="button" class="btn-navy-action" onclick="app.openAddStudentModal()">
              + Add Student
            </button>
          ` : ''}
        </div>
      `;
      return;
    }

    const activeWeek = this.getActiveWeek();
    const performanceRows = this.store.state.weeks.map(w => {
      const maxWeekScore = w.maxScore || this.getMaxCriteriaScore();
      const rawWeekData = (this.store.state.scores[w.id] && this.store.state.scores[w.id][student.id]) || null;
      const weekData = rawWeekData ? this.store.normalizeStudentWeekScore(rawWeekData, maxWeekScore) : null;
      if (!weekData || typeof weekData.total !== 'number' || (!weekData.evaluatorCount && !weekData.total && !weekData.evaluatorName)) {
        return {
          weekId: w.id,
          week: w.name,
          date: w.dateRange,
          score: '—',
          pct: '—',
          rankDisplay: '—',
          submissions: []
        };
      }
      const subList = weekData.submissions ? Object.values(weekData.submissions) : [];
      return {
        weekId: w.id,
        week: w.name,
        date: w.dateRange,
        maxScore: maxWeekScore,
        score: `${weekData.total} / ${maxWeekScore}`,
        pct: `${weekData.pct}%`,
        rankDisplay: weekData.pct >= 90 ? '1' : (weekData.pct >= 80 ? '2' : '3'),
        submissions: subList
      };
    });

    const studentInitials = (student.name || 'ST').split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';

    container.innerHTML = `
      <div class="breadcrumb-nav">
        <a href="javascript:void(0)" onclick="app.navigateTo('students')">Students</a> &gt; <span>${escapeHtml(student.name)}</span>
      </div>

      <div class="student-profile-grid">
        <div class="student-info-sidebar-card">
          <div class="profile-avatar-large" style="font-size: 1.5rem; font-weight: 800; color: var(--navy-primary);">${escapeHtml(studentInitials)}</div>
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

          ${isCurrentlyAdmin ? `
            <button class="btn-navy-action" style="width: 100%;" onclick="app.openEditStudentModal('${student.id}')">
              ${APP_ICONS.edit} Edit Student
            </button>
          ` : `
            <button class="btn-navy-action" style="width: 100%;" onclick="app.scoreStudent('${student.id}')">
              ${APP_ICONS.assessment} Evaluate Student
            </button>
          `}
        </div>

        <div class="profile-performance-card">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 1rem;">Weekly Performance</h3>

          <div style="overflow-x: auto;">
            <table class="table-standard">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Date Range</th>
                  ${isCurrentlyAdmin ? '<th>Committee Members\' Scores</th>' : ''}
                  <th style="text-align: center;">${isCurrentlyAdmin ? 'Overall / Avg Score' : 'Total Score'}</th>
                  <th style="text-align: center;">Percentage</th>
                  <th style="text-align: center;">Rank</th>
                </tr>
              </thead>
              <tbody>
                ${performanceRows.length === 0 ? `
                  <tr>
                    <td colspan="${isCurrentlyAdmin ? '6' : '5'}" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                      No weekly assessment cycles configured yet.
                    </td>
                  </tr>
                ` : performanceRows.map(p => `
                  <tr>
                    <td><strong>${escapeHtml(p.week)}</strong></td>
                    <td>${escapeHtml(p.date)}</td>
                    ${isCurrentlyAdmin ? `
                      <td>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; align-items: center;">
                          ${p.submissions && p.submissions.length > 0 ? p.submissions.map(sub => `
                            <span style="font-size: 0.7rem; background: #f8fafc; border: 1px solid #cbd5e1; color: #1e293b; padding: 0.1rem 0.45rem; border-radius: 999px; font-weight: 600;">
                              ${escapeHtml(sub.evaluatorName || 'Evaluator')}: <strong>${sub.total}/${p.maxScore || 70}</strong> (${sub.pct}%)
                            </span>
                          `).join('') : '<span style="color: #94a3b8; font-size: 0.75rem;">Pending</span>'}
                          <button type="button" class="btn-demo-pill" style="height: 22px; padding: 0 0.45rem; font-size: 0.68rem; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; font-weight: 700;" onclick="app.openStudentCommitteeScoresModal('${student.id}', '${p.weekId}')">
                            ${APP_ICONS.eye} View Scores
                          </button>
                        </div>
                      </td>
                    ` : ''}
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

          ${isCurrentlyAdmin && activeWeek ? `
            <div style="margin-top: 1.35rem;">
              ${this.renderStudentCommitteeBreakdownTableHtml(activeWeek.id, student.id)}
            </div>
          ` : ''}

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
    const archivedWeeks = this.store.getArchivedWeeks();
    const allWeeks = [...weeks, ...archivedWeeks];
    const selectedWeekId = this.store.state.selectedWeekId || (weeks[0] ? weeks[0].id : (archivedWeeks[0] ? archivedWeeks[0].id : null));
    const currentWeek = (selectedWeekId ? allWeeks.find(w => w.id === selectedWeekId) : null) || weeks.find(w => w.isCurrent) || weeks[0] || archivedWeeks[0] || null;
    const isArchivedReport = Boolean(currentWeek && (currentWeek.isArchived || currentWeek.status === 'Archived'));
    const classes = isArchivedReport ? (currentWeek.classes || []) : (this.store.state.classes || []);
    const selectedClass = this.store.state.selectedClass || 'All';

    // Build data based on selected week (active or archived) and class from actual scores
    const weekScores = isArchivedReport
      ? (currentWeek.scores || {})
      : (selectedWeekId ? (this.store.state.scores[selectedWeekId] || {}) : {});
    let studentList = isArchivedReport ? [...(currentWeek.students || [])] : [...this.store.state.students];
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
          <p>Generate, download, and print official weekly assessment certificates (including archived past weeks).</p>
        </div>

        <div class="report-action-buttons">
          <button type="button" class="btn-export-csv" onclick="app.exportCsvReport()">
            <span>${APP_ICONS.download} Export CSV</span>
          </button>
          <button type="button" class="btn-export-pdf" onclick="app.printCertificate()">
            <span>${APP_ICONS.fileText} Export PDF</span>
          </button>
          <button type="button" class="btn-print-report" onclick="app.printCertificate()">
            <span>${APP_ICONS.printer} Print Certificate</span>
          </button>
        </div>
      </div>

      <!-- Web-only Filter Card (Hidden from Print) -->
      <div class="assessment-filter-card" style="margin-bottom: 2rem;">
        <div class="filter-field">
          <label>Week Interval</label>
          <select id="reportWeekSelect" class="form-select">
            ${allWeeks.length === 0 ? '<option value="">No week intervals created yet</option>' : ''}
            ${weeks.length > 0 ? `
              <optgroup label="Active & Scheduled Week Intervals">
                ${weeks.map(w => `<option value="${w.id}" ${w.id === selectedWeekId ? 'selected' : ''}>${escapeHtml(w.name)} (${escapeHtml(w.dateRange)})</option>`).join('')}
              </optgroup>
            ` : ''}
            ${archivedWeeks.length > 0 ? `
              <optgroup label="Past Weeks Evaluation Archive (Reference)">
                ${archivedWeeks.map(a => `<option value="${a.id}" ${a.id === selectedWeekId ? 'selected' : ''}>[Archived] ${escapeHtml(a.name)} (${escapeHtml(a.dateRange)})</option>`).join('')}
              </optgroup>
            ` : ''}
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
                    <div style="display: inline-flex; color: #64748b; margin-bottom: 0.5rem;">${APP_ICONS.reports}</div><br>
                    No official student scores recorded for ${currentWeek ? escapeHtml(currentWeek.name) : 'this cycle'} yet.<br>
                    <small>Once scores are submitted in the Assessment portal, certificates will generate automatically.${archivedWeeks.length > 0 ? ` Select <strong>[Archived] ${escapeHtml(archivedWeeks[0].name)}</strong> above to print an archived past week report.` : ''}</small>
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
        this.store.state.selectedClass = 'All';
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
    const weeks = this.store.state.weeks || [];
    const archivedWeeks = this.store.getArchivedWeeks();
    const allWeeks = [...weeks, ...archivedWeeks];
    const selectedWeekId = this.store.state.selectedWeekId || (weeks[0] ? weeks[0].id : (archivedWeeks[0] ? archivedWeeks[0].id : null));
    const currentWeek = (selectedWeekId ? allWeeks.find(w => w.id === selectedWeekId) : null) || weeks[0] || archivedWeeks[0] || { name: 'Week' };
    const isArchivedReport = Boolean(currentWeek && (currentWeek.isArchived || currentWeek.status === 'Archived'));
    const selectedClass = this.store.state.selectedClass || 'All';
    const weekScores = isArchivedReport
      ? (currentWeek.scores || {})
      : (selectedWeekId ? (this.store.state.scores[selectedWeekId] || {}) : {});

    let studentList = isArchivedReport ? [...(currentWeek.students || [])] : [...this.store.state.students];
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
              <span style="display: inline-flex; color: var(--navy-primary);">${APP_ICONS.database}</span>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin: 0;">Cloud Database (Supabase)</h3>
            </div>
            <span class="status-badge-${dbConfig.connected ? (this.store.tableNeedsSetup ? 'pending' : 'active') : 'pending'}" style="font-size: 0.72rem; padding: 0.15rem 0.55rem; ${this.store.tableNeedsSetup ? 'background: #fef3c7; color: #92400e; border: 1px solid #fde68a;' : ''}">
              ● ${dbConfig.connected ? (this.store.tableNeedsSetup ? 'SQL Setup Pending' : 'Connected Live') : 'Local Storage Mode'}
            </span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.85rem; line-height: 1.45;">
            ${dbConfig.connected 
              ? (this.store.tableNeedsSetup 
                  ? `Connected to <code>${escapeHtml(dbConfig.url)}</code>.<br><span style="color: #b45309; font-weight: 700;">Tables need to be created in Supabase. Click "Open SQL Editor" below, paste the schema, and click Run.</span>`
                  : `Connected to <code>${escapeHtml(dbConfig.url)}</code>.<br><span style="font-size: 0.78rem;">Last synchronized: <strong>${dbConfig.lastSyncedAt ? new Date(dbConfig.lastSyncedAt).toLocaleTimeString() : 'Active'}</strong></span>`)
              : 'Connect Supabase Cloud PostgreSQL to synchronize all students, week intervals, and scores in real-time across phones, tablets, and computers.'}
          </p>

          <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
            <button type="button" class="btn-navy-action" onclick="app.openDatabaseModal()">
              ${APP_ICONS.database} ${dbConfig.connected ? 'Database Settings' : 'Connect Database'}
            </button>
            <button type="button" class="btn-navy-action" style="background: #e2e8f0; color: #1e293b;" onclick="app.copySupabaseSchema()">
              ${APP_ICONS.copy} Copy SQL Schema
            </button>
            <a href="https://supabase.com/dashboard/project/${this.getSupabaseProjectRef(dbConfig.url)}/sql/new" target="_blank" rel="noopener" class="btn-navy-action" style="background: #0284c7; color: #fff; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
              ${APP_ICONS.externalLink} Open SQL Editor
            </a>
            ${dbConfig.connected ? `
              <button type="button" class="btn-navy-action" style="background: #e0f2fe; color: #0369a1;" onclick="app.syncDatabaseNow()">
                ${APP_ICONS.sync} Sync Now
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
              ${APP_ICONS.sun} Light Mode
            </button>
            <button type="button" class="btn-navy-action" style="${this.store.state.theme === 'dark' ? 'border: 2px solid var(--accent-yellow);' : 'opacity: 0.75;'}" onclick="app.setTheme('dark')">
              ${APP_ICONS.moon} Dark Mode
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

    if (dot) {
      dot.textContent = '';
      dot.classList.toggle('connected', isConn && !needsSetup);
      dot.classList.toggle('pending', isConn && needsSetup);
    }
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
    if (statusIcon) {
      statusIcon.innerHTML = APP_ICONS.database;
      statusIcon.style.color = isConn ? (needsSetup ? '#b45309' : '#166534') : '#92400e';
    }
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
      btnConnect.innerHTML = isConn ? '<span>Re-Verify &amp; Sync</span>' : '<span>Connect &amp; Sync</span>';
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
      btnConnect.innerHTML = '<span>Testing Connection...</span>';
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
          "Connected to Supabase Project!\n\n" +
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

      this.showToast('Successfully connected to Supabase Cloud Database! Live sync active.');
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
    this.showToast('Synchronizing with Supabase Cloud...');
    await this.store.syncToSupabase(true);
    await this.store.fetchFromSupabase();
    this.updateDatabaseStatusUI();
    this.render();
    this.showToast('Cloud Database sync complete!');
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
        this.showToast('Supabase SQL Schema copied to clipboard! Paste into Supabase SQL Editor.');
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
      this.showToast('Supabase SQL Schema copied to clipboard!');
    } catch (e) {
      this.showToast('Please open supabase_schema.sql file in the project.');
    }
    document.body.removeChild(area);
  }

  resetDemoData() {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can reset system data.');
      return;
    }
    if (confirm('Reset all scores, students, and committee members to initial screenshot state?')) {
      this.store.resetAll();
      this.showToast('Data reset to default.');
      this.render();
    }
  }

  openAddStudentModal() {
    const modal = document.getElementById('modalAddStudent');
    if (!modal) return;
    this.populateAddStudentClasses();
    modal.classList.add('active');
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
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can manage classes.');
      return;
    }
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

    const isCurrentlyAdmin = this.store.state.currentRoleKey === 'admin';
    const classes = this.store.state.classes || [];
    if (countEl) countEl.textContent = classes.length;

    const students = this.store.state.students || [];

    if (classes.length === 0) {
      container.innerHTML = '<div style="font-size: 0.8rem; color: #94a3b8; padding: 0.5rem;">No classes created yet.</div>';
      return;
    }

    container.innerHTML = classes.map(c => {
      const studentCount = students.filter(s => s.class === c).length;
      return `
        <div class="class-pill-badge" title="${escapeHtml(c)}: ${studentCount} enrolled student${studentCount === 1 ? '' : 's'}">
          <span>${escapeHtml(c)}</span>
          <span class="pill-count">${studentCount}</span>
          ${isCurrentlyAdmin ? `<button type="button" class="btn-pill-del" data-class-name="${escapeHtml(c)}" onclick="app.deleteClass(this.getAttribute('data-class-name'))" title="Delete class ${escapeHtml(c)}" style="display: inline-flex; align-items: center; justify-content: center;">${APP_ICONS.trash}</button>` : ''}
        </div>
      `;
    }).join('');
  }

  setNewClassPreset(presetName) {
    if (this.store.state.currentRoleKey !== 'admin') return;
    const input = document.getElementById('newClassNameInput');
    if (input) {
      input.value = presetName;
      input.focus();
    }
  }

  saveNewClass(rawName) {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can add classes.');
      return;
    }
    if (!rawName) return;
    const name = rawName.trim();
    if (!name) return;

    // Check duplicate (case-insensitive)
    const exists = this.store.state.classes.some(c => c.toLowerCase() === name.toLowerCase());
    if (exists) {
      this.showToast(`Class "${name}" already exists!`);
      return;
    }

    if (Array.isArray(this.store.state.deletedClasses)) {
      this.store.state.deletedClasses = this.store.state.deletedClasses.filter(c => String(c).toLowerCase() !== name.toLowerCase());
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
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can delete classes.');
      return;
    }
    if (!className) return;

    const studentsInClass = (this.store.state.students || []).filter(s => s.class === className);
    const confirmMsg = studentsInClass.length > 0
      ? `Are you sure you want to delete class "${className}" from the class list? (${studentsInClass.length} student(s) currently in this class will be marked Unassigned.)`
      : `Are you sure you want to remove class "${className}" from the class list?`;

    if (confirm(confirmMsg)) {
      if (!Array.isArray(this.store.state.deletedClasses)) {
        this.store.state.deletedClasses = [];
      }
      if (!this.store.state.deletedClasses.includes(className)) {
        this.store.state.deletedClasses.push(className);
      }
      this.store.state.classes = (this.store.state.classes || []).filter(c => c !== className);
      if (studentsInClass.length > 0) {
        const nowIso = new Date().toISOString();
        this.store.state.students.forEach(s => {
          if (s && s.class === className) {
            s.class = 'Unassigned';
            s.updatedAt = nowIso;
          }
        });
      }
      if (this.store.state.selectedClass === className) {
        this.store.state.selectedClass = 'All Classes';
      }
      if (this.store.state.studentClassFilter === className) {
        this.store.state.studentClassFilter = 'All Classes';
      }
      this.store.save();
      this.renderExistingClassesPills();
      this.populateAddStudentClasses();
      this.showToast(`Class "${className}" deleted.`);
      this.render();
    }
  }

  openEditStudentModal(studentId) {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can edit student information.');
      return;
    }
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
      student.updatedAt = new Date().toISOString();
      this.store.save();
      this.showToast(`Updated student ${student.name}`);
      this.render();
    }
  }

  deleteStudent(studentId) {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can delete student records.');
      return;
    }
    if (confirm('Are you sure you want to remove this student?')) {
      if (!Array.isArray(this.store.state.deletedStudentIds)) {
        this.store.state.deletedStudentIds = [];
      }
      if (!this.store.state.deletedStudentIds.includes(studentId)) {
        this.store.state.deletedStudentIds.push(studentId);
      }
      this.store.state.students = this.store.state.students.filter(s => s.id !== studentId);
      if (Array.isArray(this.store.state.notifications)) {
        this.store.state.notifications = this.store.state.notifications.filter(n => n && n.id !== `notif-student-${studentId}`);
      }
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
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can activate assessment intervals.');
      return;
    }
    const week = (this.store.state.weeks || []).find(w => w.id === weekId);
    if (!week) return;

    const nowIso = new Date().toISOString();
    this.store.state.weeks.forEach(w => {
      if (w.id === weekId) {
        w.isCurrent = true;
        w.status = 'Open';
        w.updatedAt = nowIso;
      } else {
        w.isCurrent = false;
        w.updatedAt = nowIso;
      }
    });

    this.store.state.selectedWeekId = week.id;
    this.store.save();
    this.showToast(`${week.name} (${week.dateRange}) is now ACTIVE! Committee members can now enter scores.`, 'success');
    this.render();
  }

  scheduleNextWeekInterval() {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can schedule week intervals.');
      return;
    }
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
      hintEl.innerHTML = '<strong>Upcoming:</strong> Scheduled for next assessment. Active week remains open for ongoing evaluations.';
      hintEl.style.color = '#2563eb';
    } else if (val === 'Open') {
      hintEl.innerHTML = '<strong>Open:</strong> Active for scoring. Committee members can enter and submit scores.';
      hintEl.style.color = '#15803d';
    } else if (val === 'Closed') {
      hintEl.innerHTML = '<strong>Closed:</strong> Results sealed. Scoring forms locked in read-only mode.';
      hintEl.style.color = '#b91c1c';
    }
  }

  previewUpcomingWeek(weekId) {
    const week = (this.store.state.weeks || []).find(w => w.id === weekId);
    if (!week) return;
    this.store.state.selectedWeekId = week.id;
    this.showToast(`Showing upcoming schedule for ${week.name} (${week.dateRange})`);
    this.navigateTo('assessment');
  }

  switchToActiveWeek() {
    const active = this.getActiveWeek();
    if (active) {
      this.store.state.selectedWeekId = active.id;
      this.showToast(`Switched to active assessment interval: ${active.name}`);
      this.render();
    }
  }

  openSetWeekIntervalModal(targetWeekId = null) {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can configure week intervals.');
      return;
    }
    const modal = document.getElementById('modalSetWeekInterval');
    if (!modal) return;

    const select = document.getElementById('setWeekTargetSelect');
    if (select) {
      const weeks = this.store.state.weeks || [];
      select.innerHTML = `
        <option value="new">+ Create New Week Interval</option>
        ${weeks.map(w => `
          <option value="${w.id}">
            ${escapeHtml(w.name)} (${escapeHtml(w.dateRange)}) [${w.status || 'Open'}] ${w.isCurrent ? '(Current)' : ''}
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
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can save week intervals.');
      return;
    }
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
        isCurrent: isCurrent,
        updatedAt: new Date().toISOString()
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
        this.showToast(`Scheduled upcoming assessment cycle: ${weekName} (${dateRange})`);
      } else if (status === 'Closed') {
        this.showToast(`Created ${weekName} [CLOSED]: Scoring is sealed for all committee members.`);
      } else {
        this.showToast(`Created new week interval: ${weekName} (${dateRange})`);
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
        existing.updatedAt = new Date().toISOString();
        if (isCurrent) {
          this.store.state.selectedWeekId = existing.id;
        } else if (!this.store.state.weeks.some(w => w.isCurrent) && this.store.state.weeks.length > 0) {
          const firstActive = this.store.state.weeks.find(w => w.status !== 'Upcoming') || this.store.state.weeks[0];
          firstActive.isCurrent = true;
          this.store.state.selectedWeekId = firstActive.id;
        }
        this.recalculateWeekResults(existing.id);
        if (status === 'Upcoming') {
          this.showToast(`Updated upcoming week schedule: ${weekName} (${dateRange})`);
        } else if (status === 'Closed') {
          this.showToast(`Scoring for ${weekName} is now CLOSED (Results Sealed). Committee scoring is locked.`);
        } else {
          this.showToast(`Updated week interval: ${weekName} (${dateRange}) — ${status}`);
        }
      }
    }

    this.store.save();
    this.closeModals();
    this.render();
  }

  deleteSelectedWeekInterval() {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can delete week intervals.');
      return;
    }
    const targetSelect = document.getElementById('setWeekTargetSelect');
    const targetVal = targetSelect ? targetSelect.value : 'new';
    if (targetVal === 'new') return;

    const week = (this.store.state.weeks || []).find(w => w.id === targetVal);
    if (!week) return;

    if (confirm(`Are you sure you want to delete "${week.name}"?`)) {
      if (!Array.isArray(this.store.state.deletedWeekIds)) {
        this.store.state.deletedWeekIds = [];
      }
      if (!this.store.state.deletedWeekIds.includes(targetVal)) {
        this.store.state.deletedWeekIds.push(targetVal);
      }
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
    } else {
      week.topStudent = null;
      week.totalScore = null;
      week.percentage = null;
    }
  }

  quickToggleWeekStatus(weekId) {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can change week interval status.');
      return;
    }
    if (!weekId) return;
    const week = (this.store.state.weeks || []).find(w => w.id === weekId);
    if (!week) return;

    const newStatus = week.status === 'Closed' ? 'Open' : 'Closed';
    week.status = newStatus;
    week.updatedAt = new Date().toISOString();
    this.recalculateWeekResults(weekId);
    this.store.save();

    if (newStatus === 'Closed') {
      this.showToast(`Scoring for ${week.name} is now CLOSED. Committee member scoring is locked.`);
    } else {
      this.showToast(`Scoring for ${week.name} is now OPEN for all committee members.`);
    }
    this.render();
  }

  // =========================================================================
  // COMMITTEE MEMBER MANAGEMENT (INTERACTIVE MODAL)
  // =========================================================================
  openAddMemberModal() {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can add committee members.');
      return;
    }
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

    if (titleEl) titleEl.textContent = '+ Add Committee Member';
    if (editIdEl) editIdEl.value = '';
    if (nameInp) nameInp.value = '';
    if (roleSelect) roleSelect.value = "Head Boys' Prefect";
    if (scopeSelect) scopeSelect.value = 'All Houses & Classes';
    if (usernameInp) usernameInp.value = '';
    if (passInp) passInp.value = '';
    if (statusSelect) statusSelect.value = 'Active';
    if (btnDelete) btnDelete.style.display = 'none';

    this.updateMemberPreview();
    modal.classList.add('active');
  }

  openEditMemberModal(memberId) {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can edit committee member details.');
      return;
    }
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

    if (titleEl) titleEl.textContent = `Edit Committee Member: ${member.name}`;
    if (editIdEl) editIdEl.value = member.id;
    if (nameInp) nameInp.value = member.name;
    if (roleSelect) roleSelect.value = member.role || "Head Boys' Prefect";
    if (scopeSelect) scopeSelect.value = member.scope || 'All Houses & Classes';
    if (usernameInp) usernameInp.value = member.username || '';
    if (passInp) passInp.value = member.password || '';
    if (statusSelect) statusSelect.value = member.status || 'Active';
    if (btnDelete) btnDelete.style.display = 'inline-flex';

    this.updateMemberPreview();
    modal.classList.add('active');
  }

  deleteCurrentMember() {
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can delete committee members.');
      return;
    }
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
    if (this.store.state.currentRoleKey !== 'admin') {
      this.showToast('Only administrators can modify committee members.');
      return;
    }
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
        existing.updatedAt = new Date().toISOString();
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
      icon: 'member',
      title: `Committee Member Registered: ${newMember.name}`,
      message: `${newMember.name} (${newMember.role}) registered with username "${newMember.username}" and is Active for student assessments.`,
      actionLabel: 'View in Directory',
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

    // Clear existing toast notifications so only a single response is shown at once
    stack.innerHTML = '';
    if (this._toastTimer) clearTimeout(this._toastTimer);

    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = `<span>${message}</span>`;
    stack.appendChild(item);

    this._toastTimer = setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(30px)';
      item.style.transition = 'all 0.25s ease';
      setTimeout(() => item.remove(), 250);
    }, 2800);
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
        if (Array.isArray(app.store.state.deletedClasses)) {
          app.store.state.deletedClasses = app.store.state.deletedClasses.filter(c => String(c).toLowerCase() !== sClass.toLowerCase());
        }
        app.store.state.classes.push(sClass);
      }
      if (!app.store.state.selectedClass) {
        app.store.state.selectedClass = sClass;
      }

      const newId = app.store.getNextStudentId();
      if (Array.isArray(app.store.state.deletedStudentIds)) {
        app.store.state.deletedStudentIds = app.store.state.deletedStudentIds.filter(id => id !== newId);
      }
      const newStudent = {
        id: newId,
        name,
        class: sClass,
        house: sHouse,
        gender: sGender,
        status: 'Accepted',
        accepted: true,
        acceptedAt: new Date().toISOString(),
        comment: 'Newly enrolled student for assessment.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      app.store.state.students.push(newStudent);
      app.addNotification({
        id: `notif-student-${newStudent.id}`,
        type: 'student',
        icon: 'student',
        title: `Student Accepted: ${newStudent.name}`,
        message: `${newStudent.name} (${newStudent.id}) accepted and enrolled in ${newStudent.class}, ${newStudent.house} for evaluation.`,
        actionLabel: 'Evaluate Student',
        actionView: 'assessment'
      });

      app.store.state.totalStudentsCount = app.store.state.students.length;
      app.store.state.selectedStudentId = newId;
      app.store.state.studentClassFilter = 'All Classes';
      app.store.state.studentHouseFilter = 'All Houses';
      app.store.state.studentSearchQuery = '';
      app.store.save();

      app.closeModals();
      formAddStudent.reset();
      app.showToast(`Accepted student for evaluation: ${name} (${newId}) — ${sClass}, ${sHouse}`);
      app.render();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOLAGApp);
} else {
  initOLAGApp();
}
