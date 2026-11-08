/**
 * ALALAY-AI | Project Showcase Landing Page JavaScript
 * Handles Navigation, Lightbox Screenshot Zoom, and ScrollSpy
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── Dark / Light Theme Toggle ─────────────────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('alalay_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('alalay_theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(active);
    });
  }

  // ── Header Scroll Elevation ───────────────────────────────────────────────
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── Mobile Navigation Toggle ──────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Active Navigation State on Scroll (ScrollSpy) ─────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Lightbox Image Modal ──────────────────────────────────────────────────
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxOverlay = lightbox ? lightbox.querySelector('.lightbox-overlay') : null;

  const openLightbox = (imgSrc, altText, captionText) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = altText || 'Enlarged Preview';
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || altText || '';
    }
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxImg) {
      lightboxImg.src = '';
    }
  };

  // Attach click listeners to mockup wraps and images
  document.querySelectorAll('.mockup-preview-wrap, .feature-media img, [data-lightbox]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (img) {
        const caption = el.closest('.feature-media, .architecture-box')?.querySelector('.media-caption, .architecture-caption, figcaption')?.textContent?.trim() || img.alt;
        openLightbox(img.src, img.alt, caption);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ── Interactive Hero Assistive Terminal (Concept A) ──────────────────────
  const terminal = document.getElementById('assistiveTerminal');
  if (terminal) {
    const buttons = terminal.querySelectorAll('.terminal-btn');
    const reader = document.getElementById('terminalReader');
    const heading = document.getElementById('terminalHeading');
    const text = document.getElementById('terminalText');
    const meta = document.getElementById('terminalMeta');
    const friction = document.getElementById('telemetryFriction');
    const policy = document.getElementById('telemetryPolicy');

    const terminalModes = {
      default: {
        heading: 'Cellular Respiration and Photosynthesis',
        text: 'Photosynthesis is a photochemical process in chloroplastic thylakoid membranes wherein absorbed photon irradiance facilitates carbon assimilation and water photolysis to synthesize energetic glucose metabolites.',
        meta: 'Estimated reading: 45s',
        friction: 'Optimal (CLI: 7%)',
        policy: 'Sequential DQN',
        className: ''
      },
      dyslexia: {
        heading: 'Cellular Respiration and Photosynthesis',
        text: 'Photosynthesis is a photochemical process in chloroplastic thylakoid membranes wherein absorbed photon irradiance facilitates carbon assimilation and water photolysis to synthesize energetic glucose metabolites.',
        meta: 'OpenDyslexic + Guided Ruler',
        friction: 'Friction Relieved (-38%)',
        policy: 'Visual/RAN Deficit',
        className: 'mode-dyslexia'
      },
      contrast: {
        heading: 'Cellular Respiration and Photosynthesis',
        text: 'Photosynthesis is a photochemical process in chloroplastic thylakoid membranes wherein absorbed photon irradiance facilitates carbon assimilation and water photolysis to synthesize energetic glucose metabolites.',
        meta: 'High Contrast (7.1:1 AAA)',
        friction: 'Deuteranopia Filter',
        policy: 'Low Vision Mode',
        className: 'mode-contrast'
      },
      simplified: {
        heading: 'How Plants Make Food (Simplified)',
        text: 'Photosynthesis is how green plants turn sunlight and water into energy and food. Inside their leaves, plants use light to make glucose for fuel.',
        meta: 'Groq AI Simplification (Grade 6)',
        friction: 'Cognitive Load (-54%)',
        policy: 'DQN Language Adapt',
        className: 'mode-simplified'
      },
      tts: {
        heading: 'Audio Narration in Progress...',
        text: '“Photosynthesis is a photochemical process in chloroplastic thylakoid membranes wherein absorbed photon irradiance facilitates carbon assimilation...”',
        meta: 'Azure Neural TTS (165 WPM)',
        friction: 'Auditory Stream',
        policy: 'Total Blindness / Nonvisual',
        className: 'mode-tts'
      }
    };

    let currentModeIndex = 0;
    const modeKeys = ['default', 'dyslexia', 'contrast', 'simplified', 'tts'];
    let autoCycleTimer = null;
    let userInteracted = false;

    const setTerminalMode = (modeKey) => {
      const config = terminalModes[modeKey];
      if (!config) return;

      buttons.forEach(btn => {
        const isActive = btn.dataset.mode === modeKey;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Smooth content morph
      reader.className = 'terminal-reader ' + (config.className || '');
      heading.textContent = config.heading;
      text.textContent = config.text;
      if (meta) meta.textContent = config.meta;
      if (friction) friction.textContent = config.friction;
      if (policy) policy.textContent = config.policy;
    };

    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        userInteracted = true;
        clearInterval(autoCycleTimer);
        currentModeIndex = index;
        setTerminalMode(btn.dataset.mode);
      });
    });

    // Gentle Auto-Cycle Preview every 5.5s until interaction
    autoCycleTimer = setInterval(() => {
      if (userInteracted) return;
      currentModeIndex = (currentModeIndex + 1) % modeKeys.length;
      setTerminalMode(modeKeys[currentModeIndex]);
    }, 5500);

    terminal.addEventListener('mouseenter', () => {
      clearInterval(autoCycleTimer);
    });
  }
});

