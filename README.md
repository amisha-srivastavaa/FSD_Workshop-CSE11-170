# ![CSE 11 Full Stack Development Workshop Banner](file:///C:/Users/amish/.gemini/antigravity-ide/brain/5ea3768e-6107-4627-8c85-0e9d3097dbd5/cse11_fsd_workshop_banner_1787299459158.png)

# CSE 11 – Full Stack Development (FSD) Workshop
**3rd Semester – 2026**

> A comprehensive, hands‑on repository for the **CSE 11 – Full Stack Development** workshop. It contains both the **backend** (Node.js) and **frontend** (Vite + React) components used throughout the semester‑long labs and projects.

---

## 📚 Overview
This repo is the central codebase for the **Full Stack Development** workshop offered to 3rd‑semester Computer Science & Engineering students.  It showcases:
- **Modern JavaScript/TypeScript** practices.
- A **REST‑style backend** built with Node.js, exposing APIs for file handling, user data, and event simulation.
- A **React‑based frontend** powered by Vite, demonstrating component composition, routing, and state management.
- **Git‑centric workflow** (feature branches, PRs, CI hints) to teach industry‑standard collaboration.

---

## 🎯 Workshop Goals
1. **Understand the full stack** – from server‑side routing to client‑side rendering.
2. **Apply best practices** – linting, formatting, modular code organization, and version control.
3. **Build real‑world features** – file uploads, event loops, interactive UI components.
4. **Deploy & maintain** – using GitHub, CI pipelines, and basic cloud deployment concepts.

---

## 🛠 Prerequisites
| Tool | Minimum Version |
|------|-----------------|
| **Node.js** | 18.x |
| **npm** | 9.x |
| **Git** | 2.40 |
| **VS Code** (recommended) | – |
| **Internet** | – |

> **Note**: The project uses **Vite** for the frontend; ensure the Node version supports ES modules.

---

## 📁 Repository Structure
```
FSD SEM 3/
│
├── Backend/                # Node.js backend source files
│   ├── Domevents.js        # Example event‑loop simulation
│   ├── eventloop.js        # Core event‑loop logic
│   ├── filedemo.js         # File‑system demo utilities
│   ├── hw.js               # Homework helper scripts
│   └── ...
│
├── Frontend/               # Vite + React project (FSD11)
│   ├── src/                # React components & styles
│   │   ├── Components/     # UI building blocks (Hero, Gallery…)
│   │   ├── assets/         # Images, SVGs
│   │   └── App.jsx
│   ├── public/             # Static assets (favicon, icons)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .git/                   # Git metadata (remote points to workshop repo)
├── .gitignore
├── README.md               # ← **You are viewing this file**
└── LICENSE                 # Open‑source licence (MIT)
```

---

## 🚀 Quick Start (Local Development)
1. **Clone the repository** (already done – you are in the workspace).
2. **Install dependencies**
   ```bash
   # Backend
   cd Backend && npm install

   # Frontend
   cd ../Frontend/FSD11 && npm install
   ```
3. **Run the backend**
   ```bash
   cd ../../Backend
   node eventloop.js   # or whichever entry point you need
   ```
4. **Run the frontend**
   ```bash
   cd ../Frontend/FSD11
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.
5. **Make changes** – the project uses **hot‑module replacement**; changes appear instantly.

---

## 📦 Backend Details
- **Entry points**: `eventloop.js`, `Domevents.js`, `filedemo.js`.
- **API pattern**: Simple Express‑style routes (future extension: switch to Fastify).
- **File handling**: Uses Node's `fs/promises` for async reads/writes.
- **Logging**: Minimal `console.log`; replace with `winston` for production.

---

## 🎨 Frontend Details
- **Framework**: React 18 with functional components.
- **Bundler**: Vite – fast dev server, ES module support.
- **Styling**: Vanilla CSS + CSS modules for component scope.
- **Components**:
  - `Hero.jsx` – hero section with animated background.
  - `Gallery.jsx` – responsive image gallery.
  - `FeatureList.jsx` – showcases workshop features.
  - `Tabs.jsx` – simple tab navigation.
- **State**: Local component state; optionally integrate **React Context** for global data.

---

## 🤝 Contributing
1. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/awesome‑feature
   ```
2. **Write clear commit messages** – follow the format `type: short description` (e.g., `feat: add login page`).
3. **Push & open a PR**:
   ```bash
   git push origin feature/awesome‑feature
   ```
4. **Review** – request a peer review, address feedback, and squash‑merge.

---

## 📜 License
This workshop material is released under the **MIT License** – feel free to fork, modify, and share with fellow students.

---

## 🧑‍🏫 About the Workshop
The **CSE 11 – Full Stack Development** workshop is part of the 3rd‑semester curriculum at **[Your University Name]**. It aims to equip students with practical skills to build end‑to‑end web applications, covering:
- **Server‑side programming** (Node.js, REST APIs)
- **Client‑side development** (React, component design)
- **Version control** (Git, GitHub workflows)
- **Deployment basics** (static hosting, CI pipelines)

All lecture slides, assignments, and additional resources are stored in the repository’s `docs/` folder (to be added later).

---

*Happy coding, and enjoy the workshop!*
