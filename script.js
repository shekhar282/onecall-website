// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Scroll-in animation
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .why-card, .process-step, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission feedback
const form = document.getElementById('contactForm');
form.addEventListener('submit', async e => {
  const btn = form.querySelector('button[type="submit"]');
  const action = form.getAttribute('action');

  // If using Formspree, let it submit normally; just update button state
  if (action && action.includes('formspree.io') && !action.includes('YOUR_FORM_ID')) {
    btn.textContent = 'Sending...';
    btn.disabled = true;
    return;
  }

  // Fallback: show success message without real submission
  e.preventDefault();
  btn.textContent = 'Request Sent!';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send My Free Quote Request';
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
});
