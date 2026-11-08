/**
 * ALALAY-AI | Project Showcase Landing Page JavaScript
 * Handles Navigation, Lightbox Screenshot Zoom, and ScrollSpy
 */

document.addEventListener('DOMContentLoaded', () => {
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
});

