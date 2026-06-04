<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,50:3B82F6,100:6366F1&height=220&section=header&text=User%20Management%20System&fontSize=55&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Role-Based%20Access%20Control%20%7C%20React%20%2B%20Vite&descAlignY=58&descAlign=50" width="100%"/>

<br/>

[![React](https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<br/>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1000&color=06B6D4&center=true&vCenter=true&width=600&lines=Role-based+access+control+%F0%9F%94%90;Admin+%26+User+dashboards+%F0%9F%93%8A;Profile+picture+uploads+%F0%9F%96%BC%EF%B8%8F;Persistent+local+storage+%F0%9F%92%BE;Fully+responsive+UI+%E2%9C%A8" alt="Typing SVG" />
</p>

<br/>

<blockquote>
A modern <strong>React + Vite</strong> web app for managing users with role-based access control. Admins can create, edit, and delete users — while a clean dashboard gives each role exactly what they need.
</blockquote>

<br/>

</div>

---

## 🌟 Features

<table>
  <tr>
    <td align="center" width="220">👤<br/><strong>User Registration</strong><br/><sub>Sign up with name, email, password & profile picture</sub></td>
    <td align="center" width="220">🔐<br/><strong>Role-Based Access</strong><br/><sub>Separate Admin and User permissions & views</sub></td>
    <td align="center" width="220">📊<br/><strong>User Dashboard</strong><br/><sub>Clean overview of all registered users</sub></td>
  </tr>
  <tr>
    <td align="center" width="220">✏️<br/><strong>Admin Controls</strong><br/><sub>Edit & delete operations restricted to admins only</sub></td>
    <td align="center" width="220">💾<br/><strong>Local Storage</strong><br/><sub>Data persists across sessions without a backend</sub></td>
    <td align="center" width="220">📱<br/><strong>Responsive UI</strong><br/><sub>Works seamlessly on desktop and mobile</sub></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **UI Library** | React 18 |
| **Language** | JavaScript (ES6+) |
| **Build Tool** | Vite 5 |
| **Styling** | CSS3 |
| **Storage** | Browser LocalStorage |

</div>

---

## 📁 Project Structure

```
User-Management-System/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Dashboard, Login, Register views
│   └── main.jsx            # App entry point
├── .github/                # GitHub workflows
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Tanyaagarg/User-Management-System.git
cd User-Management-System

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 👥 Roles & Permissions

| Action | User | Admin |
|--------|------|-------|
| View dashboard | ✅ | ✅ |
| Register account | ✅ | ✅ |
| Edit own profile | ✅ | ✅ |
| Edit any user | ❌ | ✅ |
| Delete any user | ❌ | ✅ |
| Manage roles | ❌ | ✅ |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,50:3B82F6,100:6366F1&height=120&section=footer" width="100%"/>

<sub>Built with ⚡ React + Vite</sub>

</div>
