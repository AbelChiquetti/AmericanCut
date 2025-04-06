document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const allLinks = document.querySelectorAll('a[href^="#"]');
  const tooltips = document.querySelectorAll(".info-tooltip");

  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  }

  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }

  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    closeMobileMenu();

    const headerHeight = header.offsetHeight;

    const targetPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

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

  function initAnimations() {
    const animatedElements = document.querySelectorAll(
      ".beneficio-card, .funcionalidade-item, .plano-card, .contato-item"
    );

    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
    });

    animateOnScroll();
  }

  setTimeout(initAnimations, 100);

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);

  allLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  window.addEventListener("scroll", handleHeaderScroll);

  window.addEventListener("scroll", animateOnScroll);

  handleHeaderScroll();

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      this.reset();
    });
  }

  const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
  whatsappButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (typeof gtag === "function") {
        gtag("event", "click", {
          event_category: "WhatsApp",
          event_label: this.getAttribute("href"),
        });
      }

      if (typeof fbq === "function") {
        fbq("track", "Contact");
      }
    });
  });
});