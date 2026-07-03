document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initNewsletterForm();
  navActiveLink();
});



/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
function initMobileNav() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (!menuBtn || !mobileNav) return;

  let isOpen = false;

  menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    mobileNav.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    mobileNav.setAttribute("aria-hidden", String(!isOpen));

    // Animate hamburger to X
    const spans = menuBtn.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close on link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      isOpen = false;
      mobileNav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
      const spans = menuBtn.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      isOpen = false;
      mobileNav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
      menuBtn.focus();
    }
  });
}

/* ============================================================
   NEWSLETTER FORM
   ============================================================ */
function navActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".main-nav__link");
  navLinks.forEach((link) => {
    if (link.href.includes(currentPath)) {
      link.classList.add("main-nav__link--active");
    }
  });
}

/* ============================================================
   NEWSLETTER FORM
   ============================================================ */
function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".newsletter-form__input");
    const email = input ? input.value.trim() : "";

    if (!email || !isValidEmail(email)) {
      showFormMessage(form, "Please enter a valid email address.", "error");
      return;
    }

    // Simulate success
    showFormMessage(form, "Thank you! You have been subscribed.", "success");
    if (input) input.value = "";
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(form, message, type) {
  // Remove existing message
  const existing = form.parentNode.querySelector(".form-message");
  if (existing) existing.remove();

  const msg = document.createElement("p");
  msg.className = "form-message";
  msg.textContent = message;
  msg.style.cssText = `
    margin-top: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${type === "success" ? "#7adf6a" : "#ff8a80"};
  `;
  form.parentNode.appendChild(msg);

  setTimeout(() => msg.remove(), 4000);
}


