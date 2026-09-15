/* ============================================
   THOUGHTS THROUGH TIME — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar scroll effect ----------
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---------- Mobile menu toggle ----------
  const toggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Scroll-triggered fade-in ----------
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length > 0) {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    faders.forEach(el => fadeObserver.observe(el));
  }

  // ---------- Back to top button ----------
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Newsletter form (placeholder) ----------
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter__input');
      if (input && input.value.trim()) {
        const btn = newsletterForm.querySelector('.newsletter__button');
        btn.textContent = 'Subscribed!';
        btn.style.background = '#2d7a2d';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  // ---------- Reading progress bar (article pages) ----------
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
      window.addEventListener('scroll', () => {
        const rect = articleContent.getBoundingClientRect();
        const contentTop = rect.top + window.scrollY;
        const contentHeight = articleContent.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY - contentTop + windowHeight;
        const progress = Math.min(Math.max(scrolled / contentHeight, 0), 1);
        progressBar.style.transform = `scaleX(${progress})`;
      }, { passive: true });
    }
  }

  // ---------- Estimated reading time ----------
  const articleBody = document.querySelector('.article-content');
  const readTimeEl = document.querySelector('.read-time');
  if (articleBody && readTimeEl) {
    const text = articleBody.textContent || '';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 230));
    readTimeEl.textContent = `${minutes} min read`;
  }

  // ---------- Active nav link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
