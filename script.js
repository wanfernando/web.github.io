document.addEventListener('DOMContentLoaded', function() {
  // Get the current year for footer copyright
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on a link (mobile)
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show toast notification function
  function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDescription = document.getElementById('toast-description');
    
    toastTitle.textContent = title;
    toastDescription.textContent = message;
    
    toast.classList.add('show');
    
    // Auto-hide toast after 5 seconds
    setTimeout(function() {
      toast.classList.remove('show');
    }, 5000);
  }

  // Close toast on button click
  const toastCloseBtn = document.querySelector('.toast-close');
  
  toastCloseBtn.addEventListener('click', function() {
    document.getElementById('toast').classList.remove('show');
  });

  // Form submission handling - Hero form
  const heroForm = document.getElementById('heroForm');
  
  if (heroForm) {
    heroForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(heroForm);
      const formValues = Object.fromEntries(formData);
      
      // Here you would normally send the data to your server
      console.log('Hero Form Submitted:', formValues);
      
      // Show success message
      showToast('Form Submitted!', 'We\'ll get back to you shortly.');
      
      // Reset form
      heroForm.reset();
    });
  }

  // Form submission handling - Contact form
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData);
      
      // Here you would normally send the data to your server
      console.log('Contact Form Submitted:', formValues);
      
      // Show success message
      showToast('Message Sent!', 'We\'ll respond to your inquiry soon.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animation class to elements when they come into view
  function animateOnScroll() {
    const elements = document.querySelectorAll('.section-header, .service-card, .feature, .process-step, .benefit-box');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate-fade-in');
      }
    });
  }

  // Run the animation check when page loads and on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});