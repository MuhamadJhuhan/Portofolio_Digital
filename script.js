// ========== MOBILE NAV TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navIcon = navToggle ? navToggle.querySelector('i') : null;

if (navToggle && navLinks && navIcon) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navIcon.classList.toggle('fa-bars');
    navIcon.classList.toggle('fa-times');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navIcon.classList.add('fa-bars');
      navIcon.classList.remove('fa-times');
    });
  });
}

// ========== SCROLL REVEAL ==========
const revealSelectors = [
  '.about-grid',
  '.skills-grid',
  '.project-card',
  '.contact-info',
  '.contact-form'
];

revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
});

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
  skillsGrid.classList.add('reveal-stagger');
  skillsGrid.classList.remove('reveal');
  skillsGrid.querySelectorAll('.skill-card').forEach(card => {
    card.classList.add('reveal-child');
  });
}

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== SKILL BAR ANIMATION ==========
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
  skillFills.forEach(fill => {
    const rect = fill.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      fill.style.width = fill.dataset.width;
    }
  });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ========== STAT COUNTER ==========
const statNumbers = document.querySelectorAll('.stat-number');
let statAnimated = false;

const animateCounters = () => {
  if (statAnimated) return;
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  const rect = aboutSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 150) {
    statAnimated = true;
    statNumbers.forEach(num => {
      const target = parseInt(num.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        num.textContent = Math.floor(current);
      }, 16);
    });
  }
};

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    if (!name || !email || !subject || !message) return;

    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
      formMessage.className = 'form-message error';
      formMessage.textContent = '⚠️ Harap isi semua kolom ya!';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      formMessage.className = 'form-message error';
      formMessage.textContent = '⚠️ Format email belum bener nih.';
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

    setTimeout(() => {
      formMessage.className = 'form-message success';
      formMessage.textContent = '✅ Pesan berhasil dikirim! Makasih sudah menghubungi saya 😊';
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';

      setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
      }, 5000);
    }, 1500);
  });
}

// ========== ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);

// ========== NAV SHADOW ON SCROLL ==========
const nav = document.querySelector('nav');

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}
// ========== MAKE PROJECT CARD CLICKABLE ==========
document.querySelectorAll('.project-card').forEach(card => {
  card.style.cursor = 'pointer'; // Ubah cursor jadi pointer saat hover kartu
  
  card.addEventListener('click', function(e) {
    // Jika yang diklik BUKAN tombol di dalam overlay (misal tombol GitHub)
    if (!e.target.closest('.btn')) {
      // Cari link demo di dalam kartu ini
      const demoLink = this.querySelector('.project-overlay .btn-sm');
      if (demoLink && demoLink.href) {
        window.open(demoLink.href, '_blank'); // Buka link di tab baru
      }
    }
  });
});