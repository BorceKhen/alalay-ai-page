# ALALAY-AI — GitHub Pages Landing Page

A responsive, accessible project website and research showcase for **ALALAY-AI: An AI-Driven Assistive Learning and Adaptive Accessibility Platform with Multi-Deficit Profiling for Neurodivergent Learners**.

Built for GitHub Pages deployment in partial fulfillment of the requirements for **BS Computer Science**, Laguna State Polytechnic University (LSPU).

---

## 📋 Requirements Checklist Included

Based on thesis presentation standards:
- [x] **Research Title** (Hero section with academic institution and title banner)
- [x] **Team Members & Adviser** (Proponents cards with roles and department affiliations)
- [x] **Problem Statement & Objectives** (Problem background, research questions, general objective, and specific objectives)
- [x] **Methodology** (Phased developmental lifecycle, system architecture preview, and stakeholder evaluation breakdown)
- [x] **System Features & Screenshots** (Alternating feature showcases with interactive lightbox screenshot enlargement)
- [x] **Links** (Direct access to GitHub repository, live web application, demo video, and manuscript)

---

## 📂 File Structure

```text
alalay-ai-page/
├── index.html                     # Main landing page
├── README.md                      # Deployment & editing guide
└── assets/
    ├── css/
    │   └── style.css              # Custom styling (ALALAY-AI theme, responsive, accessible)
    ├── js/
    │   └── main.js                # Mobile navigation, ScrollSpy, and Lightbox image viewer
    └── img/
        ├── logo.png               # ALALAY-AI Logo
        ├── logo.svg               # ALALAY-AI SVG Vector Logo
        ├── icon.png               # Brand icon / favicon
        └── screenshots/           # Screenshot graphics
            ├── architecture.svg   # System architecture diagram placeholder
            ├── feature-1.svg      # Dashboard & Decks placeholder
            ├── feature-2.svg      # Document Ingestion & OCR placeholder
            ├── feature-3.svg      # AI Recommendation & Dyslexia Subtypes placeholder
            └── feature-4.svg      # Assistive Reading Controls placeholder
```

---

## 🚀 How to Deploy on GitHub Pages

1. **Create a GitHub Repository**:
   - Create a new public repository (e.g. `alalay-ai-pages` or within your organization).
2. **Push files**:
   ```bash
   cd "alalay-ai-page"
   git init
   git add .
   git commit -m "feat: Initial ALALAY-AI GitHub Pages landing page with placeholders"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-PAGES-REPO>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** &rarr; **Pages** (under Code and automation).
   - Under **Build and deployment** &rarr; **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://<YOUR-USERNAME>.github.io/<YOUR-PAGES-REPO>/`.

---

## ✍️ How to Replace Placeholders

All placeholders are highlighted in the code with tags such as `[Insert Researcher 1 Name]` and `.ph-tag` indicators:
1. **Research Details**: Open `index.html` and replace all bracketed items `[...]` with your team's finalized thesis text.
2. **Actual Screenshots**: Place your `.png` or `.webp` screenshots inside `assets/img/screenshots/` and update the `src` attribute of the corresponding `<img>` tags in `index.html`.
3. **External Links**: Update the `href` in the `#links` section with your actual YouTube/Drive demo video and deployed app URL.

