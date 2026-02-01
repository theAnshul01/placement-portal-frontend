
# Placement Portal – Frontend

Frontend application for the Placement Portal, built using React (JavaScript) and styled with Tailwind CSS, strictly aligned with an already completed and hardened backend.

This project consumes backend APIs and does not replicate business logic on the client.

## 🚀 Tech Stack

- **React** (JavaScript)
- **React Router v6**
- **Axios**
- **Tailwind CSS**
- **Context API** (authentication only)
- **Backend**: Node.js, Express, MongoDB (already completed)

## 🎯 Project Philosophy

**Backend is the single source of truth**

Frontend focuses on:
- UX
- Role-based navigation
- Data presentation

**All critical rules are enforced by backend APIs**
- Frontend never assumes permissions or eligibility

## 🔐 Authentication & Authorization

**JWT-based authentication**
- Access token (short-lived)
- Refresh token (handled by backend)

**Role-based access control:**
- ADMIN
- OFFICER
- RECRUITER
- STUDENT

**Implementation:**
- Frontend implements route guards
- Backend validates every request

## 🧠 Core Roles & Views

### Student
- View eligible jobs
- Apply / withdraw applications
- Track application status
- Placement status visibility

### Recruiter
- Manage company jobs
- View applications per job
- Update application status (own jobs only)

### Officer / Admin
- Global dashboards
- Placement analytics
- Student & recruiter overview

## 📁 Folder Structure (Planned)

```
src/
│
├── api/              # Axios instance & API calls
├── auth/             # Auth context & route guards
├── routes/           # Role-based routing
├── dashboards/       # Role-specific dashboards
│   ├── student/
│   ├── recruiter/
│   └── officer/
│
├── pages/            # Auth & error pages
├── components/       # Reusable UI components
│
├── App.js
├── index.js
└── index.css
```

**Structure will be expanded incrementally as features are added.**

## 🎨 Styling – Tailwind CSS

This project uses Tailwind CSS for styling.

- Utility-first approach
- No custom CSS unless required
- Focus on:
  - Layout consistency
  - Responsive design
  - Clean dashboards

Tailwind will be introduced gradually, starting with layout and spacing utilities.
No advanced Tailwind knowledge is required upfront.

## 📊 Data Handling

- API calls via Axios
- No frontend data duplication
- No client-side analytics calculations
- Aggregated data is rendered as received from backend

## ⚠️ Important Constraints

- No business logic duplication
- No role assumptions on frontend
- No eligibility checks on client
- Backend errors are handled gracefully and surfaced to UI

## 🧩 State Management

- **Context API** → Authentication state
- **Local component state** → UI state
- Redux Toolkit will be introduced only if required, with a refresher beforehand

## 🛠️ Setup Instructions

```bash
npm install
npm start
```

Runs the app in development mode at: `http://localhost:3000`

## 🔄 Development Approach

Development roadmap (incremental commits):
1. Authentication flow
2. Role-based routing
3. Student dashboard
4. Recruiter dashboard
5. Officer analytics
6. UI refinement


## 🤝 Contribution & Notes

This project is built as a backend-first system.

Frontend decisions are made only to support backend behavior and improve user experience.
