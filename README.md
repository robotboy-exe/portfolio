# Personal Portfolio | Samuel Odeyovwi

🚧 **Active Development** • Portfolio v1

> Full stack developer portfolio — a living project that evolves with my skills. Currently showcases hand-coded projects, an AI-assisted Cloudflare Pages app, a Webflow landing page, and a WordPress concept.

🔗 **Live Site:** https://robotboy-portfolio.netlify.app

---

## 🧑‍💻 About This Repo

This repository contains the **current version** of my developer portfolio. It's not a finished product — it will keep changing as I learn new tools, build better projects, and refine my design sense.

Think of it as a **living lab** for my full-stack journey.

The site is fully responsive, accessible, and dark-mode ready, built with semantic HTML5, modern CSS (Grid + Flexbox), and vanilla JavaScript.

---

## 🛠️ Tech Stack (So Far)

* **HTML5** — Semantic structure, ARIA labels, responsive meta tags
* **CSS3** — Design tokens (custom properties), Grid, Flexbox, mobile-first media queries, `data-theme` dark mode, grid background, `prefers-reduced-motion`
* **JavaScript** — Flash-free theme toggle, scrollspy, scroll reveals, filmstrip galleries with a keyboard-accessible lightbox, scroll-progress rail, back-to-top
* **Fonts** — Fontsource CDN:

  * *Space Grotesk* (display / headings)
  * *IBM Plex Mono* (labels, code, metadata)
  * *Silkscreen* (pixel accents)

*This stack will expand as I add React, TypeScript, and other technologies.*

---

## ✨ Current Features

* 🌗 **Dark / Light Mode**

  * Flash-free — applied before first paint via a `<head>` bootstrap
  * Respects system preferences and manual toggling
  * Saves the user's choice (`localStorage["so-theme"]`, with legacy `theme` migration)

* 📱 **Fully Responsive**

  * Mobile, tablet, and desktop support (320px up)
  * No horizontal scrolling

* 🖼️ **Interactive Galleries**

  * Filmstrip galleries for the WordPress crypto and AI-Coached projects
  * Thumbnail strip plus prev/next controls
  * Keyboard navigation and an enlarged lightbox `<dialog>` with focus return

* 🧭 **Navigation & Feedback**

  * Scrollspy nav and scroll-progress rail (desktop)
  * Scroll reveals that respect reduced motion
  * Back-to-top button after scrolling

* ♿ **Accessibility**

  * Semantic HTML and ARIA labels
  * Screen-reader-safe animated hero name
  * Reduced-motion support

* 🧩 **Modular CSS**

  * Design tokens (custom properties) for colour, type, and spacing
  * Easy to maintain and extend

---

## 🔄 Roadmap

Planned additions and improvements:

* More vanilla JavaScript projects

* React or Vue projects

* Unit testing and CI/CD

* Blog section

* Improved performance audits

* Image optimization

* Serverless contact form

---

## 📁 Featured Projects

| Project                                  | Description                                                                                             | Tech                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **AI-Coached Screening Practice**        | Timed teamwork-prompt practice with Whisper + LLM Micro-Coach scoring, on a $0 Cloudflare Pages stack    | JavaScript, AI Dev, Cloudflare, Groq |
| **Institutional Management & Learning Platform** | Role-driven web app for Admin/Student/Prospect workflows with PHP auth and admissions pipeline   | PHP, SQL, AI Dev, JavaScript       |
| **This Portfolio**                       | The site you're looking at — my main hub for showcasing work and growth                                 | HTML, CSS, JavaScript              |
| **SaaS Landing Page (Webflow)**          | Responsive marketing page built with Webflow                                                            | Webflow                            |
| **Crypto Exchange Frontend (WordPress)** | Concept featuring dynamic forms, user authentication, and conditional logic                             | WordPress, Elementor, Form Builder |

Each project card includes a live demo, source code, or video/PDF case study where applicable.

More projects will be added over time.

---

## 🚀 Running Locally

### Clone the Repository

```bash
git clone https://github.com/robotboy-exe/portfolio.git
cd portfolio
```

### Open the Project

Open `index.html` directly in your browser.

No build step required.

### Optional: Run a Local Development Server

```bash
python -m http.server
```

Then visit:

```text
http://localhost:8000
```

---

## 📂 File Structure

```text
portfolio/
├── index.html
├── styles.css
├── app.js
├── public/
│   └── Samuel_Odeyovwi_Resume.pdf
├── images/
│   ├── admin-dashboard-mockup.png
│   ├── robotboy-portfolio.webp
│   ├── saas-landing-page-4e8914.webflow.io_.webp
│   ├── screening-practice-coach-feedback.webp
│   ├── screening-practice-practice.webp
│   ├── screening-practice-setup.webp
│   ├── screening-practice-complete.webp
│   ├── wp-screenshot1.webp
│   ├── wp-screenshot2.webp
│   ├── wp-screenshot3.webp
│   └── wp-screenshot4.webp
└── README.md
```

---

## 🌐 Deployment

The portfolio is deployed on Netlify's free tier.

Every push to the `main` branch automatically triggers a redeployment, ensuring the live site always reflects the latest version of my work.

---

## 📄 License

This project is for personal portfolio purposes.

You may view the code for inspiration, but please do not directly copy substantial portions without credit or permission.

---

## 📬 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/samuel-odeyovwi)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/robotboy-exe)

---

Built with 💻 and ☕ by **Samuel Odeyovwi** — continuously updated as I grow as a developer.
