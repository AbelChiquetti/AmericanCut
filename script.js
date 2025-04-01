// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const header = document.getElementById("header");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const allLinks = document.querySelectorAll('a[href^="#"]');
  const tooltips = document.querySelectorAll(".info-tooltip");

  // Function to toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  }

  // Function to close mobile menu
  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }

  // Function to handle header scroll effect
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // Function for smooth scrolling
  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    // Close mobile menu if open
    closeMobileMenu();

    // Calculate header height
    const headerHeight = header.offsetHeight;

    // Calculate target position
    const targetPosition = targetElement.offsetTop - headerHeight;

    // Smooth scroll
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  // Function to handle animations on scroll
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll(
      ".beneficio-card, .funcionalidade-item, .plano-card, .contato-item"
    );

    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.85;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform =
          element.classList.contains("plano-card") &&
          element.classList.contains("destaque")
            ? "translateY(0)"
            : "translateY(0)";
      }
    });
  }

  // Function to initialize animations
  function initAnimations() {
    const animatedElements = document.querySelectorAll(
      ".beneficio-card, .funcionalidade-item, .plano-card, .contato-item"
    );

    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
    });

    // Trigger initial animation check
    animateOnScroll();
  }

  // Initialize animations after a short delay
  setTimeout(initAnimations, 100);

  // Event Listeners

  // Mobile menu toggle click event
  mobileMenuToggle.addEventListener("click", toggleMobileMenu);

  // Smooth scrolling for all anchor links
  allLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // Header scroll effect
  window.addEventListener("scroll", handleHeaderScroll);

  // Animation on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Perform initial scroll check
  handleHeaderScroll();

  // Handle form submission (if you have a form)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // You would typically send the form data to a server here
      // For now, let's just show a success message
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      this.reset();
    });
  }

  // Handle WhatsApp tracking clicks
  const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
  whatsappButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Track event with Google Analytics (if available)
      if (typeof gtag === "function") {
        gtag("event", "click", {
          event_category: "WhatsApp",
          event_label: this.getAttribute("href"),
        });
      }

      // Track event with Facebook Pixel (if available)
      if (typeof fbq === "function") {
        fbq("track", "Contact");
      }
    });
  });
});
