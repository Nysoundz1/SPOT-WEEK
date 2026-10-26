# 🏫 OUR LADY OF GRACE SENIOR HIGH SCHOOL (OLAG SHS)
## Student Personality of the Week Assessment System — Dual Dashboard Edition

> **Motto:** Knowledge • Morality • Service  
> **Slogan:** Better Character | Brighter Future  
> Live at: [http://localhost:3000](http://localhost:3000)

---

## 🔑 The Two Dedicated Dashboards & Logins

The application is structured into **exactly two dashboards**: **Admin Dashboard** and **Committee Member Dashboard**, each tailored with dedicated permissions, sidebar navigation, and metrics:

| Dashboard | User Persona | Demo Username | Demo Password | Key Features & Workflow |
| :--- | :--- | :--- | :--- | :--- |
| 🛡️ **Admin Dashboard** | IT Admin / Committee Chair | `admin` | `admin` | Full school-wide administrative control: student directory (124 students across 8 classes and 4 houses), 8 criteria rubric management, weekly assessment lifecycle (Open/Close weeks), tie-breaking, committee member roster, and printable single-page official certificates. |
| 👥 **Committee Member Dashboard** | Mrs. Akosua Dankwa (*Head of Discipline*) | `akosua.d` | `committee` | Private evaluator assessment workflow: weekly candidate queue, quorum progress ring (75% completed), 8-criteria scoring form (1–10 per criterion, total /80), confidential comments, submitted evaluations review, and official rankings. |

---

## ⚙️ New Features Added

### 1. 📅 Admin Week Interval Management
- **Interactive Header Week Pill**: In Admin mode, clicking the top header week interval pill (`📅 Week 4 (21 – 27 Apr 2025) ✏️ Set`) opens the Week Interval modal.
- **Configurable Scoring Lifecycle**:
  - Set Week Title / Number (e.g. `Week 4`, `Week 5`).
  - Set Start Date & End Date with automatic interval formatting (`21 – 27 Apr 2025`).
  - Lifecycle Status: `🟢 Open (Active for Scoring)`, `🔒 Closed (Results Sealed)`, `⏳ Upcoming`.
  - Quick Date Presets: `📅 Current 7-Day Cycle`, `⏩ Next Week`, `📆 14-Day Cycle`.
  - Checkbox: `Set as active Current Week Interval for the school`.
- **Admin Dashboard Integration**: The "This Week" card and Quick Actions both feature 1-click access to configure week intervals.
- **Previous Weeks View**: Features `📅 + Set New Week Interval` and row-level `✏️` edit buttons.

### 2. 👥 Interactive Committee Member Dropdowns & Management
- **Weekly Assessment Evaluator Dropdown**:
  - Located in the Weekly Assessment filter card (`Week Interval` | `Class` | `Committee Evaluator` | `Student`).
  - Switch between committee member evaluation ballots with live panel progress indicators.
  - Interactive Evaluator Banner showing current evaluator avatar, department, role, and week status.
- **Rich "+ Add / Edit Committee Member" Modal**:
  - Full Name input with automatic username generation (e.g., `grace.m`).
  - **Interactive Committee Role Dropdown**: Icons for Head of Discipline, Vice Principal, House Masters, Teacher Reps, Guidance Counselor, Sports Coordinator, Parent Rep (PTA), Chaplaincy.
  - **Interactive Assigned Scope Dropdown**: All Houses & Classes, specific House focus, or specific SHS class level.
  - **Interactive Status Dropdown**: Active, Observer, On Leave.
  - **Live Preview Card**: Shows what the member's avatar, initials, role tag, and badge look like in real time as inputs change.
- **Interactive Filter Bar in Manage Committee Members**:
  - Instant live search by name, role, or username.
  - Role filter dropdown (All, Discipline & Exec, Teacher Reps, House Masters, Support & PTA).
  - Status filter dropdown (All, Active, Observer, On Leave).
  - Row edit button opens the interactive modal pre-filled with the member's data.

### 3. 🏫 Admin Add & Manage Classes
- **"+ Add Class" Directly from "+ Add Student" Modal**:
  - Right next to the `Class *` label, admins can click `+ Add Class` or select `+ Add New Class...` from the dropdown.
  - Opens the dedicated **Add & Manage Classes** modal.
  - Adding a class instantly selects it in the student enrollment form and returns smoothly without losing form progress.
- **Dedicated Manage Classes Modal & Directory Toolbar**:
  - Located on the **Manage Students** toolbar (`🏫 Classes (8)`) and in **System Settings**.
  - **Quick Presets**: 1-click presets for common tracks (`SHS 1C`, `SHS 2D`, `SHS 3D`, `SHS 1 General Arts`, `SHS 2 Science A`).
  - **Duplicate Protection**: Automatically enforces unique class names.
  - **Existing Class Badges**: Shows student enrollment counts for each class.
  - **Safe Deletion**: Empty classes can be deleted via `🗑️`, while classes with assigned students are protected from accidental removal.
  - **System-Wide Sync**: Newly added classes instantly populate filter bars across Students, Weekly Assessments, and Reports.

---

## 🚀 How to Access & Switch Dashboards

1. **Dedicated Login Portals**:
   - **Admin Portal**: [http://localhost:3000](http://localhost:3000) (`index.html`) — For administrators to sign in with their credentials.
   - **Committee Portal**: [http://localhost:3000/committee-login](http://localhost:3000/committee-login) (`committee-login.html`) — For committee members to sign in or register with their information.
2. **Inside the App**:
   - Tap the **"🔄 Switch to Committee Member"** / **"🔄 Switch to Admin View"** button in the top header (or click the user profile pill) to switch perspectives with 1 click.
3. **Official Certificate Printing**:
   - Navigate to **Reports** in the sidebar.
   - Click **"🖨️ Print Certificate"** (or press <kbd>Ctrl</kbd> + <kbd>P</kbd> / <kbd>Cmd</kbd> + <kbd>P</kbd>).
   - Generates a pristine, single-page A4 gold-bordered official certificate with crest, signatures, and assessment marks—free from any web UI buttons or page headers.
4. **Logout**:
   - Click **"🚪 Logout"** at the bottom of the left sidebar to return to the split-screen login page.
