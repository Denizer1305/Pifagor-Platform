var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// static/js/modules/mobile-menu.js
function initMobileMenu() {
  console.log("Mobile menu initialized");
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");
  const closeButton = document.querySelector(".mobile-menu-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  if (!burgerMenu || !mobileMenu) return;
  const burgerIcon = burgerMenu.querySelector("i");
  function toggleMenu() {
    const isExpanded = burgerMenu.getAttribute("aria-expanded") === "true";
    burgerMenu.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
    document.body.style.overflow = !isExpanded ? "hidden" : "";
    if (!isExpanded) {
      burgerIcon.classList.remove("fa-bars");
      burgerIcon.classList.add("fa-times");
    } else {
      burgerIcon.classList.remove("fa-times");
      burgerIcon.classList.add("fa-bars");
    }
  }
  function closeMenu() {
    burgerMenu.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
    burgerIcon.classList.remove("fa-times");
    burgerIcon.classList.add("fa-bars");
  }
  burgerMenu.addEventListener("click", toggleMenu);
  if (closeButton) closeButton.addEventListener("click", closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMenu);
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}
var init_mobile_menu = __esm({
  "static/js/modules/mobile-menu.js"() {
  }
});

// static/js/modules/animations.js
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}
function initHeaderScrollEffect() {
  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}
function initCommonAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}
function initPracticeAnimations() {
  const practiceCards = document.querySelectorAll(".practice-card, .subject-card, .topic-card");
  practiceCards.forEach((card) => {
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-5px) scale(1.02)";
      this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "";
    });
  });
  const topicCards = document.querySelectorAll(".topic-card");
  topicCards.forEach((card) => {
    card.addEventListener("click", function(e) {
      if (!e.target.classList.contains("btn")) {
        const link = this.querySelector(".btn-practice");
        if (link) {
          this.style.transform = "scale(0.95)";
          setTimeout(() => {
            window.location.href = link.getAttribute("href");
          }, 200);
        }
      }
    });
  });
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const width = bar.style.width || bar.getAttribute("data-width") || "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}
var init_animations = __esm({
  "static/js/modules/animations.js"() {
  }
});

// static/js/modules/theme-switcher.js
function initThemeSwitcher() {
  const themeButtons = document.querySelectorAll(".theme-btn");
  if (themeButtons.length === 0) return;
  const savedTheme = localStorage.getItem("theme") || "default";
  setTheme(savedTheme);
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", function() {
      const theme = this.getAttribute("data-theme");
      setTheme(theme);
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "scale(1.1)";
      }, 100);
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  });
  function setTheme(theme) {
    const existingTheme = document.getElementById("dynamic-theme");
    if (existingTheme) {
      existingTheme.remove();
    }
    const themeLink = document.createElement("link");
    themeLink.id = "dynamic-theme";
    themeLink.rel = "stylesheet";
    themeLink.href = `/frontend/static/css/themes/${theme}.css`;
    document.head.appendChild(themeLink);
    themeButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-theme") === theme) {
        btn.classList.add("active");
      }
    });
    localStorage.setItem("theme", theme);
    updateThemeColor(theme);
  }
  function updateThemeColor(theme) {
    let themeColor = "#394458";
    switch (theme) {
      case "dark":
        themeColor = "#1E293B";
        break;
      case "high-contrast":
        themeColor = "#000000";
        break;
    }
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement("meta");
      themeColorMeta.name = "theme-color";
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.setAttribute("content", themeColor);
  }
}
var init_theme_switcher = __esm({
  "static/js/modules/theme-switcher.js"() {
  }
});

// static/js/modules/ui.js
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });
}
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particlesContainer.appendChild(particle);
  }
}
var init_ui = __esm({
  "static/js/modules/ui.js"() {
  }
});

// static/js/modules/auth.js
function initAuth() {
  initLogin();
  initPasswordReset();
  initEmailVerification();
  initLogout();
  initCreateNewPassword();
  initRegistration();
}
function initLogin() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;
  const loginElement = document.querySelector(".login");
  if (!loginElement) {
    console.error('Element with class "login" not found');
    return;
  }
  const indexUrl = loginElement.dataset.indexUrl;
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;
    if (!email || !isValidEmail(email)) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0445\u043E\u0434\u0430", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email \u0430\u0434\u0440\u0435\u0441", "error");
      return;
    }
    if (!password) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0445\u043E\u0434\u0430", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", "error");
      return;
    }
    if (password.length < 6) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0445\u043E\u0434\u0430", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 email \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445", "error");
      return;
    }
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "\u0412\u0445\u043E\u0434...";
    submitButton.disabled = true;
    setTimeout(() => {
      showAlert("\u0412\u0445\u043E\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D!", `\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C! \u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0448\u043B\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443.${remember ? " \u0412\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B." : ""}`, "success");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      setTimeout(() => {
        window.location.href = indexUrl;
      }, 2e3);
    }, 1500);
  });
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function getCSRFToken() {
  const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]");
  return csrfToken ? csrfToken.value : "";
}
function initRegistration() {
  const registerForm = document.querySelector("form#register-form");
  if (!registerForm) {
    console.log("Registration form not found");
    return;
  }
  console.log("Registration form found:", registerForm);
  const requirementIds = ["lengthReq", "uppercaseReq", "numberReq", "specialReq"];
  requirementIds.forEach((id) => {
    const element = document.getElementById(id);
    console.log(`Element ${id}:`, element, "Content:", element ? element.innerHTML : "NOT FOUND");
  });
  function initPasswordToggles() {
    console.log("Initializing password toggles...");
    const passwordToggles = document.querySelectorAll(".password-toggle");
    console.log("Found password toggles:", passwordToggles.length);
    passwordToggles.forEach((toggle) => {
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      newToggle.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("Password toggle clicked");
        const targetId = this.getAttribute("data-target");
        console.log("Target ID:", targetId);
        const passwordInput = document.getElementById(targetId);
        console.log("Password input found:", !!passwordInput);
        if (passwordInput) {
          const currentType = passwordInput.getAttribute("type");
          const newType = currentType === "password" ? "text" : "password";
          console.log("Changing input type from", currentType, "to", newType);
          passwordInput.setAttribute("type", newType);
          const icon = this.querySelector("i");
          if (icon) {
            if (newType === "password") {
              icon.className = "fas fa-eye";
            } else {
              icon.className = "fas fa-eye-slash";
            }
            console.log("Icon changed to:", icon.className);
          }
        } else {
          console.error("Password input not found for target:", targetId);
        }
      });
    });
    console.log("Password toggles initialization completed");
  }
  initPasswordToggles();
  function checkPasswordStrength(password) {
    let strength2 = 0;
    const requirements2 = {
      length: false,
      uppercase: false,
      number: false,
      special: false
    };
    if (!password) {
      return { strength: 0, requirements: requirements2 };
    }
    if (password.length >= 8) {
      strength2 += 25;
      requirements2.length = true;
    }
    if (/[A-Z]/.test(password)) {
      strength2 += 25;
      requirements2.uppercase = true;
    }
    if (/[0-9]/.test(password)) {
      strength2 += 25;
      requirements2.number = true;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength2 += 25;
      requirements2.special = true;
    }
    return { strength: strength2, requirements: requirements2 };
  }
  function checkPasswordMatch() {
    const password1 = document.getElementById("id_password1")?.value || "";
    const password2 = document.getElementById("id_password2")?.value || "";
    const passwordMatch = document.getElementById("passwordMatch");
    if (!passwordMatch) return false;
    if (password2.length > 0) {
      if (password1 === password2) {
        passwordMatch.style.display = "block";
        passwordMatch.innerHTML = '<i class="fas fa-check"></i> \u041F\u0430\u0440\u043E\u043B\u0438 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442';
        passwordMatch.classList.remove("invalid");
        passwordMatch.classList.add("valid");
        return true;
      } else {
        passwordMatch.style.display = "block";
        passwordMatch.innerHTML = '<i class="fas fa-times"></i> \u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442';
        passwordMatch.classList.remove("valid");
        passwordMatch.classList.add("invalid");
        return false;
      }
    } else {
      passwordMatch.style.display = "none";
      return false;
    }
  }
  function updatePasswordRequirements(requirements2) {
    console.log("Updating password requirements:", requirements2);
    const requirementsConfig = {
      "length": {
        elementId: "lengthReq",
        text: "\u041D\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
      },
      "uppercase": {
        elementId: "uppercaseReq",
        text: "\u0417\u0430\u0433\u043B\u0430\u0432\u043D\u0430\u044F \u0431\u0443\u043A\u0432\u0430"
      },
      "number": {
        elementId: "numberReq",
        text: "\u0425\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0430 \u0446\u0438\u0444\u0440\u0430"
      },
      "special": {
        elementId: "specialReq",
        text: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B"
      }
    };
    Object.keys(requirementsConfig).forEach((requirementType) => {
      const config = requirementsConfig[requirementType];
      const element = document.getElementById(config.elementId);
      if (element) {
        const isValid = requirements2[requirementType];
        if (isValid) {
          element.classList.remove("invalid");
          element.classList.add("valid");
          const currentText = element.textContent || config.text;
          element.innerHTML = '<i class="fas fa-check"></i> ' + currentText.replace(/^.*?(\s|$)/, "");
        } else {
          element.classList.remove("valid");
          element.classList.add("invalid");
          const currentText = element.textContent || config.text;
          element.innerHTML = '<i class="fas fa-times"></i> ' + currentText.replace(/^.*?(\s|$)/, "");
        }
      } else {
        console.warn("Element not found:", config.elementId);
      }
    });
  }
  function updatePasswordStrengthBar(strength2) {
    const strengthBar = document.getElementById("passwordStrengthBar");
    if (!strengthBar) return;
    strengthBar.className = "password-strength-bar";
    strengthBar.style.width = "0%";
    if (strength2 > 0) {
      if (strength2 <= 25) {
        strengthBar.classList.add("strength-weak");
        strengthBar.style.width = "25%";
      } else if (strength2 <= 50) {
        strengthBar.classList.add("strength-fair");
        strengthBar.style.width = "50%";
      } else if (strength2 <= 75) {
        strengthBar.classList.add("strength-good");
        strengthBar.style.width = "75%";
      } else {
        strengthBar.classList.add("strength-strong");
        strengthBar.style.width = "100%";
      }
    }
  }
  function updateSubmitButton() {
    const password1 = document.getElementById("id_password1")?.value || "";
    const password2 = document.getElementById("id_password2")?.value || "";
    const termsCheckbox2 = document.getElementById("terms");
    const roleSelected = document.querySelector('input[name="role"]:checked');
    const submitButton = registerForm.querySelector('button[type="submit"]');
    if (!submitButton) return;
    const { requirements: requirements2 } = checkPasswordStrength(password1);
    const passwordsMatch = checkPasswordMatch();
    const termsAccepted = termsCheckbox2 ? termsCheckbox2.checked : false;
    const roleIsSelected = roleSelected !== null;
    const allRequirementsMet = requirements2.length && requirements2.uppercase && requirements2.number && requirements2.special;
    const isFormValid = allRequirementsMet && passwordsMatch && password1.length > 0 && password2.length > 0 && termsAccepted && roleIsSelected;
    if (isFormValid) {
      submitButton.disabled = false;
      submitButton.classList.remove("btn-disabled");
    } else {
      submitButton.disabled = true;
      submitButton.classList.add("btn-disabled");
    }
  }
  const password1Input = document.getElementById("id_password1");
  const password2Input = document.getElementById("id_password2");
  const termsCheckbox = document.getElementById("terms");
  const roleInputs = document.querySelectorAll('input[name="role"]');
  if (password1Input) {
    password1Input.addEventListener("input", function() {
      const password = this.value;
      const { strength: strength2, requirements: requirements2 } = checkPasswordStrength(password);
      updatePasswordStrengthBar(strength2);
      updatePasswordRequirements(requirements2);
      checkPasswordMatch();
      updateSubmitButton();
    });
  }
  if (password2Input) {
    password2Input.addEventListener("input", function() {
      checkPasswordMatch();
      updateSubmitButton();
    });
  }
  if (termsCheckbox) {
    termsCheckbox.addEventListener("change", function() {
      updateSubmitButton();
    });
  }
  roleInputs.forEach((input) => {
    input.addEventListener("change", function() {
      updateSubmitButton();
    });
  });
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const password1 = document.getElementById("id_password1")?.value || "";
    const password2 = document.getElementById("id_password2")?.value || "";
    const terms = document.getElementById("terms")?.checked || false;
    const roleSelected = document.querySelector('input[name="role"]:checked');
    if (password1 !== password2) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442!", "error");
      return;
    }
    const { requirements: requirements2 } = checkPasswordStrength(password1);
    const allRequirementsMet = requirements2.length && requirements2.uppercase && requirements2.number && requirements2.special;
    if (!allRequirementsMet) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438!", "error");
      return;
    }
    if (!terms) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u0438\u043C\u0438\u0442\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F!", "error");
      return;
    }
    if (!roleSelected) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u043E\u043B\u044C!", "error");
      return;
    }
    const formData = new FormData(registerForm);
    const submitButton = registerForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F...";
    submitButton.disabled = true;
    console.log("Sending registration request...");
    fetch(registerForm.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": getCSRFToken()
      }
    }).then((response) => {
      console.log("Response status:", response.status);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json().then((data) => {
          return { data, status: response.status, ok: response.ok };
        });
      } else {
        throw new Error("Server returned non-JSON response");
      }
    }).then(({ data, status, ok }) => {
      console.log("Response data:", data);
      if (ok && data.success) {
        showAlert(
          "\u0423\u0441\u043F\u0435\u0448\u043D\u0430\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F!",
          "\u0412\u0430\u0448 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0431\u044B\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D. \u0422\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443.",
          "success",
          {
            autoClose: 5e3,
            onConfirm: () => {
              window.location.href = data.redirect_url || "/authorization/login/";
            }
          }
        );
      } else {
        console.log("Registration error:", data);
        document.querySelectorAll(".error-message").forEach((el) => {
          el.style.display = "none";
          el.textContent = "";
        });
        if (data.errors) {
          let hasFieldErrors = false;
          Object.keys(data.errors).forEach((field) => {
            let errorElement;
            if (field === "password1" || field === "id_password1") {
              errorElement = document.querySelector("#id_password1")?.closest(".form-group")?.querySelector(".error-message");
            } else if (field === "password2" || field === "id_password2") {
              errorElement = document.querySelector("#id_password2")?.closest(".form-group")?.querySelector(".error-message");
            } else if (field === "email" || field === "id_email") {
              errorElement = document.querySelector("#id_email")?.closest(".form-group")?.querySelector(".error-message");
            } else if (field === "fullname" || field === "id_fullname") {
              errorElement = document.querySelector("#id_fullname")?.closest(".form-group")?.querySelector(".error-message");
            } else if (field === "role") {
              errorElement = document.querySelector(".role-selector")?.closest(".form-group")?.querySelector(".error-message");
            } else if (field === "__all__") {
              showAlert("\u041E\u0448\u0438\u0431\u043A\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438", Array.isArray(data.errors[field]) ? data.errors[field][0] : data.errors[field], "error");
              return;
            }
            if (errorElement) {
              const errorText = Array.isArray(data.errors[field]) ? data.errors[field][0] : data.errors[field];
              errorElement.textContent = errorText;
              errorElement.style.display = "block";
              hasFieldErrors = true;
              console.log(`Showing error for field ${field}:`, errorText);
            }
          });
          if (!hasFieldErrors) {
            showAlert(
              "\u041E\u0448\u0438\u0431\u043A\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",
              "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0438\u0441\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043E\u0448\u0438\u0431\u043A\u0438 \u0432 \u0444\u043E\u0440\u043C\u0435.",
              "error"
            );
          }
        } else {
          showAlert(
            "\u041E\u0448\u0438\u0431\u043A\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",
            "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
            "error"
          );
        }
      }
    }).catch((error) => {
      console.error("Fetch error:", error);
      let errorMessage = "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438. ";
      if (error.message.includes("non-JSON")) {
        errorMessage += "\u0421\u0435\u0440\u0432\u0435\u0440 \u0432\u0435\u0440\u043D\u0443\u043B \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442.";
      } else {
        errorMessage += "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.";
      }
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", errorMessage, "error");
    }).finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
  });
  updateSubmitButton();
  const { strength, requirements } = checkPasswordStrength("");
  updatePasswordStrengthBar(strength);
  updatePasswordRequirements(requirements);
}
function showAlert(title, message, type = "info", options = {}) {
  const existingAlert = document.querySelector(".alert-overlay");
  if (existingAlert) {
    document.body.removeChild(existingAlert);
  }
  const overlay = document.createElement("div");
  overlay.className = "alert-overlay";
  const alertBox = document.createElement("div");
  alertBox.className = `alert-box ${type}`;
  const iconEl = document.createElement("div");
  iconEl.className = "alert-icon";
  switch (type) {
    case "success":
      iconEl.innerHTML = '<i class="fas fa-check-circle"></i>';
      break;
    case "error":
      iconEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
      break;
    case "warning":
      iconEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      break;
    default:
      iconEl.innerHTML = '<i class="fas fa-info-circle"></i>';
  }
  const titleEl = document.createElement("div");
  titleEl.className = "alert-title";
  titleEl.textContent = title;
  const messageEl = document.createElement("div");
  messageEl.className = "alert-message";
  messageEl.textContent = message;
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "alert-buttons";
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "1.5rem";
  const confirmButton = document.createElement("button");
  confirmButton.className = "alert-button";
  confirmButton.textContent = options.confirmText || "\u041F\u043E\u043D\u044F\u0442\u043D\u043E";
  alertBox.appendChild(iconEl);
  alertBox.appendChild(titleEl);
  alertBox.appendChild(messageEl);
  buttonContainer.appendChild(confirmButton);
  if (options.showCancel) {
    const cancelButton = document.createElement("button");
    cancelButton.className = "alert-button btn-light";
    cancelButton.textContent = options.cancelText || "\u041E\u0442\u043C\u0435\u043D\u0430";
    cancelButton.style.background = "transparent";
    cancelButton.style.border = "2px solid var(--primary)";
    cancelButton.style.color = "var(--primary)";
    cancelButton.onclick = () => {
      document.body.removeChild(overlay);
      if (options.onCancel) options.onCancel();
    };
    buttonContainer.appendChild(cancelButton);
  }
  alertBox.appendChild(buttonContainer);
  overlay.appendChild(alertBox);
  document.body.appendChild(overlay);
  confirmButton.focus();
  const closeAlert = () => {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
    if (options.onConfirm) options.onConfirm();
  };
  confirmButton.onclick = closeAlert;
  overlay.onclick = (e) => {
    if (e.target === overlay && !options.disableOverlayClose) {
      closeAlert();
    }
  };
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeAlert();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
  if (options.autoClose) {
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        closeAlert();
      }
    }, options.autoClose);
  }
  return {
    close: closeAlert
  };
}
function initPasswordReset() {
  const resetForm3 = document.getElementById("resetForm");
  if (!resetForm3) return;
  resetForm3.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    document.getElementById("successMessage").style.display = "block";
    this.reset();
  });
}
function initEmailVerification() {
  let timeLeft = 300;
  const countdownElement = document.getElementById("countdown");
  const resendButton = document.getElementById("resendCode");
  const verifyButton = document.getElementById("verifyCode");
  const codeDigits = document.querySelectorAll(".code-digit");
  if (!countdownElement || !resendButton || !verifyButton) return;
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email") || "user@example.com";
  const userEmailElement = document.getElementById("userEmail");
  if (userEmailElement) {
    userEmailElement.textContent = email;
  }
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (timeLeft > 0) {
      timeLeft--;
      setTimeout(updateTimer, 1e3);
    } else {
      resendButton.disabled = false;
      resendButton.classList.remove("btn-disabled");
      resendButton.innerHTML = '<i class="fas fa-redo"></i> \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E';
      countdownElement.textContent = "00:00";
      countdownElement.style.color = "var(--danger)";
    }
  }
  function resendCode() {
    if (timeLeft <= 0) {
      timeLeft = 300;
      updateTimer();
      resendButton.disabled = true;
      resendButton.classList.add("btn-disabled");
      resendButton.innerHTML = '<i class="fas fa-clock"></i> \u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D';
      countdownElement.style.color = "var(--text)";
      showAlert("\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D", `\u041D\u043E\u0432\u044B\u0439 \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 ${email}`, "info", {
        autoClose: 3e3
      });
      console.log("Resending verification code to:", email);
      setTimeout(() => {
        if (timeLeft > 0) {
          resendButton.disabled = false;
          resendButton.classList.remove("btn-disabled");
          resendButton.innerHTML = '<i class="fas fa-redo"></i> \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E';
        }
      }, 3e4);
    }
  }
  resendButton.addEventListener("click", resendCode);
  codeDigits.forEach((digit, index) => {
    digit.addEventListener("input", function() {
      if (this.value.length === 1) {
        if (index < codeDigits.length - 1) {
          codeDigits[index + 1].focus();
        } else {
          this.blur();
        }
        checkCodeCompletion();
      }
      this.value = this.value.replace(/[^0-9]/g, "");
    });
    digit.addEventListener("keydown", function(e) {
      if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
        codeDigits[index - 1].focus();
      }
      if (e.key === "ArrowLeft" && index > 0) {
        codeDigits[index - 1].focus();
      }
      if (e.key === "ArrowRight" && index < codeDigits.length - 1) {
        codeDigits[index + 1].focus();
      }
    });
    digit.addEventListener("paste", function(e) {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
      if (pasteData.length === 6) {
        for (let i = 0; i < 6; i++) {
          if (codeDigits[i]) {
            codeDigits[i].value = pasteData[i] || "";
          }
        }
        checkCodeCompletion();
        codeDigits[5].focus();
      }
    });
  });
  function checkCodeCompletion() {
    let code = "";
    codeDigits.forEach((digit) => {
      code += digit.value;
    });
    if (code.length === 6) {
      verifyButton.disabled = false;
      verifyButton.classList.remove("btn-disabled");
    } else {
      verifyButton.disabled = true;
      verifyButton.classList.add("btn-disabled");
    }
  }
  function verifyCode() {
    let code = "";
    codeDigits.forEach((digit) => {
      code += digit.value;
    });
    if (code.length !== 6) {
      showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u043D\u044B\u0439 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434.", "error");
      return;
    }
    const originalText = verifyButton.innerHTML;
    verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...';
    verifyButton.disabled = true;
    setTimeout(() => {
      if (code === "123456") {
        showAlert("\u0423\u0441\u043F\u0435\u0448\u043D\u0430\u044F \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F!", "\u0412\u0430\u0448 email \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D. \u0422\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0432\u0441\u0435\u043C\u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u044F\u043C\u0438 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B.", "success", {
          autoClose: 3e3,
          // Исправлено с 300000 на 3000
          onConfirm: () => {
            window.location.href = "/authorization/login/";
          }
        });
      } else {
        showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043E\u0434 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.", "error");
        codeDigits.forEach((digit) => {
          digit.value = "";
        });
        codeDigits[0].focus();
        verifyButton.innerHTML = originalText;
        verifyButton.disabled = true;
        verifyButton.classList.add("btn-disabled");
      }
    }, 2e3);
  }
  verifyButton.addEventListener("click", verifyCode);
  document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      let code = "";
      codeDigits.forEach((digit) => {
        code += digit.value;
      });
      if (code.length === 6) {
        verifyCode();
      }
    }
  });
  updateTimer();
  if (codeDigits.length > 0) {
    codeDigits[0].focus();
  }
}
function initPasswordResetCode() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email") || "user@example.com";
  const userEmailElement = document.getElementById("userEmail");
  if (userEmailElement) {
    userEmailElement.textContent = email;
  }
  let timeLeft = 1800;
  const countdownElement = document.getElementById("countdown");
  const resendButton = document.getElementById("resendCode");
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (countdownElement) {
      countdownElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    if (timeLeft > 0) {
      timeLeft--;
      setTimeout(updateTimer, 1e3);
    } else if (resendButton) {
      resendButton.disabled = false;
      resendButton.innerHTML = '<i class="fas fa-redo"></i> \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E';
    }
  }
  updateTimer();
  if (resendButton) {
    resendButton.addEventListener("click", function() {
      if (timeLeft <= 0) {
        timeLeft = 1800;
        updateTimer();
        resendButton.disabled = true;
        resendButton.innerHTML = '<i class="fas fa-clock"></i> \u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D';
        showAlert("\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D", "\u041D\u043E\u0432\u044B\u0439 \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u0432\u0430\u0448 email", "info");
      }
    });
  }
  const codeDigits = document.querySelectorAll(".code-digit");
  const verifyButton = document.getElementById("verifyCode");
  codeDigits.forEach((digit, index) => {
    digit.addEventListener("input", function() {
      if (this.value.length === 1 && index < codeDigits.length - 1) {
        codeDigits[index + 1].focus();
      }
      checkCodeCompletion();
    });
    digit.addEventListener("keydown", function(e) {
      if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
        codeDigits[index - 1].focus();
      }
    });
  });
  function checkCodeCompletion() {
    let code = "";
    codeDigits.forEach((digit) => {
      code += digit.value;
    });
    if (verifyButton) {
      verifyButton.disabled = code.length !== 6;
    }
  }
  if (verifyButton) {
    verifyButton.addEventListener("click", function() {
      let code = "";
      codeDigits.forEach((digit) => {
        code += digit.value;
      });
      if (code.length === 6) {
        const originalText = verifyButton.innerHTML;
        verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...';
        verifyButton.disabled = true;
        setTimeout(() => {
          window.location.href = "/authorization/create-new-password/?email=" + encodeURIComponent(email);
        }, 2e3);
      } else {
        showAlert("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u043D\u044B\u0439 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434", "error");
      }
    });
  }
}
function initLogout() {
  let timeLeft = 10;
  const countdownElement = document.getElementById("countdown");
  const secondsElement = document.getElementById("seconds");
  if (!countdownElement || !secondsElement) return;
  function updateTimer() {
    countdownElement.textContent = timeLeft.toString().padStart(2, "0");
    secondsElement.textContent = timeLeft;
    if (timeLeft > 0) {
      timeLeft--;
      setTimeout(updateTimer, 1e3);
    } else {
      window.location.href = "/";
    }
  }
  updateTimer();
  const userName2 = "\u0414\u0435\u043D\u0438\u0441 \u0411\u044B\u043A\u043E\u0432";
  const userEmail = "denizer1305@yandex.ru";
  document.getElementById("userName").textContent = userName2;
  document.getElementById("userEmail").textContent = userEmail;
}
function initCreateNewPassword() {
  const createPasswordForm = document.getElementById("resetPasswordForm");
  if (!createPasswordForm) return;
  const toggleNewPassword = document.getElementById("toggleNewPassword");
  const newPasswordInput = document.getElementById("newPassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  if (toggleNewPassword && newPasswordInput) {
    toggleNewPassword.addEventListener("click", function() {
      const type = newPasswordInput.getAttribute("type") === "password" ? "text" : "password";
      newPasswordInput.setAttribute("type", type);
      this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
  }
  if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener("click", function() {
      const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
      confirmPasswordInput.setAttribute("type", type);
      this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
  }
  function checkPasswordStrength(password) {
    let strength = 0;
    const requirements = {
      length: false,
      uppercase: false,
      number: false,
      special: false
    };
    if (password.length >= 8) {
      strength += 25;
      requirements.length = true;
    }
    if (/[A-Z]/.test(password)) {
      strength += 25;
      requirements.uppercase = true;
    }
    if (/[0-9]/.test(password)) {
      strength += 25;
      requirements.number = true;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 25;
      requirements.special = true;
    }
    return { strength, requirements };
  }
  function updatePasswordRequirements(requirements) {
    const lengthReq = document.getElementById("lengthReq");
    const uppercaseReq = document.getElementById("uppercaseReq");
    const numberReq = document.getElementById("numberReq");
    const specialReq = document.getElementById("specialReq");
    if (lengthReq && requirements.length) {
      lengthReq.classList.remove("invalid");
      lengthReq.classList.add("valid");
      lengthReq.innerHTML = '<i class="fas fa-check"></i> \u041D\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432';
    } else if (lengthReq) {
      lengthReq.classList.remove("valid");
      lengthReq.classList.add("invalid");
      lengthReq.innerHTML = '<i class="fas fa-times"></i> \u041D\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432';
    }
    if (uppercaseReq && requirements.uppercase) {
      uppercaseReq.classList.remove("invalid");
      uppercaseReq.classList.add("valid");
      uppercaseReq.innerHTML = '<i class="fas fa-check"></i> \u0417\u0430\u0433\u043B\u0430\u0432\u043D\u0430\u044F \u0431\u0443\u043A\u0432\u0430';
    } else if (uppercaseReq) {
      uppercaseReq.classList.remove("valid");
      uppercaseReq.classList.add("invalid");
      uppercaseReq.innerHTML = '<i class="fas fa-times"></i> \u0417\u0430\u0433\u043B\u0430\u0432\u043D\u0430\u044F \u0431\u0443\u043A\u0432\u0430';
    }
    if (numberReq && requirements.number) {
      numberReq.classList.remove("invalid");
      numberReq.classList.add("valid");
      numberReq.innerHTML = '<i class="fas fa-check"></i> \u0425\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0430 \u0446\u0438\u0444\u0440\u0430';
    } else if (numberReq) {
      numberReq.classList.remove("valid");
      numberReq.classList.add("invalid");
      numberReq.innerHTML = '<i class="fas fa-times"></i> \u0425\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0430 \u0446\u0438\u0444\u0440\u0430';
    }
    if (specialReq && requirements.special) {
      specialReq.classList.remove("invalid");
      specialReq.classList.add("valid");
      specialReq.innerHTML = '<i class="fas fa-check"></i> \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B';
    } else if (specialReq) {
      specialReq.classList.remove("valid");
      specialReq.classList.add("invalid");
      specialReq.innerHTML = '<i class="fas fa-times"></i> \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B';
    }
  }
  function updatePasswordStrengthBar(strength) {
    const strengthBar = document.getElementById("passwordStrengthBar");
    if (!strengthBar) return;
    strengthBar.className = "password-strength-bar";
    if (strength <= 25) {
      strengthBar.classList.add("strength-weak");
    } else if (strength <= 50) {
      strengthBar.classList.add("strength-fair");
    } else if (strength <= 75) {
      strengthBar.classList.add("strength-good");
    } else {
      strengthBar.classList.add("strength-strong");
    }
  }
  function checkPasswordMatch() {
    const newPassword = newPasswordInput ? newPasswordInput.value : "";
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";
    const passwordMatch = document.getElementById("passwordMatch");
    if (!passwordMatch) return false;
    if (confirmPassword.length > 0) {
      if (newPassword === confirmPassword) {
        passwordMatch.style.display = "none";
        return true;
      } else {
        passwordMatch.style.display = "block";
        return false;
      }
    } else {
      passwordMatch.style.display = "none";
      return false;
    }
  }
  function updateSubmitButton() {
    const newPassword = newPasswordInput ? newPasswordInput.value : "";
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";
    const submitButton = document.getElementById("submitButton");
    if (!submitButton) return;
    const { strength, requirements } = checkPasswordStrength(newPassword);
    const passwordsMatch = checkPasswordMatch();
    const allRequirementsMet = requirements.length && requirements.uppercase && requirements.number && requirements.special;
    if (allRequirementsMet && passwordsMatch && newPassword.length > 0 && confirmPassword.length > 0) {
      submitButton.disabled = false;
      submitButton.classList.remove("btn-disabled");
    } else {
      submitButton.disabled = true;
      submitButton.classList.add("btn-disabled");
    }
  }
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", function() {
      const password = this.value;
      const { strength, requirements } = checkPasswordStrength(password);
      updatePasswordStrengthBar(strength);
      updatePasswordRequirements(requirements);
      updateSubmitButton();
    });
  }
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", function() {
      updateSubmitButton();
    });
  }
  if (createPasswordForm) {
    createPasswordForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const newPassword = newPasswordInput ? newPasswordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";
      const submitButton = document.getElementById("submitButton");
      if (!submitButton) return;
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435...';
      submitButton.disabled = true;
      setTimeout(() => {
        showAlert("\u041F\u0430\u0440\u043E\u043B\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D!", "\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C \u0431\u044B\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D. \u0422\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u0441 \u043D\u043E\u0432\u044B\u043C \u043F\u0430\u0440\u043E\u043B\u0435\u043C.", "success", {
          autoClose: 3e3,
          onConfirm: () => {
            window.location.href = "/authorization/login/";
          }
        });
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 2e3);
    });
  }
}
var init_auth = __esm({
  "static/js/modules/auth.js"() {
    document.addEventListener("DOMContentLoaded", function() {
      if (document.querySelector(".password-reset-code-form")) {
        initPasswordResetCode();
      }
    });
  }
});

// static/js/modules/attendance.js
function initAttendance() {
  console.log("Initializing attendance module...");
  const userName2 = "";
  const userEmail = "";
  document.getElementById("userName").textContent = userName2;
  initAttendanceModal();
  initDayDetailsModal();
  initStatisticsModals();
  initBulkActions();
  initDateNavigation();
  initCalendarDays();
}
function initAttendanceModal() {
  const attendanceModal = document.getElementById("attendanceModal");
  const closeModal = document.getElementById("closeModal");
  const cancelAttendance = document.getElementById("cancelAttendance");
  const saveAttendance = document.getElementById("saveAttendance");
  const statusOptions = document.querySelectorAll(".status-option");
  const attendanceCells = document.querySelectorAll(".attendance-status");
  let currentStudent = null;
  let currentDate2 = null;
  let selectedStatus = null;
  if (!attendanceModal || !closeModal || !cancelAttendance || !saveAttendance) {
    console.log("Some attendance modal elements not found");
    return;
  }
  attendanceCells.forEach((cell) => {
    cell.addEventListener("click", function() {
      const studentId = this.getAttribute("data-student");
      const date = this.getAttribute("data-date");
      const studentName = getStudentName(studentId);
      const formattedDate = formatDate(date);
      document.getElementById("studentDateInfo").textContent = `\u0421\u0442\u0443\u0434\u0435\u043D\u0442: ${studentName} \u2022 \u0414\u0430\u0442\u0430: ${formattedDate}`;
      currentStudent = studentId;
      currentDate2 = date;
      const currentStatus = this.querySelector(".status-badge").className;
      if (currentStatus.includes("status-present")) {
        selectedStatus = "present";
      } else if (currentStatus.includes("status-absent")) {
        selectedStatus = "absent";
      } else if (currentStatus.includes("status-late")) {
        selectedStatus = "late";
      } else if (currentStatus.includes("status-excused")) {
        selectedStatus = "excused";
      }
      statusOptions.forEach((option) => {
        option.classList.remove("selected");
        if (option.getAttribute("data-status") === selectedStatus) {
          option.classList.add("selected");
        }
      });
      attendanceModal.classList.add("active");
    });
  });
  function closeAttendanceModal() {
    attendanceModal.classList.remove("active");
    selectedStatus = null;
    statusOptions.forEach((option) => {
      option.classList.remove("selected");
    });
  }
  closeModal.addEventListener("click", closeAttendanceModal);
  cancelAttendance.addEventListener("click", closeAttendanceModal);
  statusOptions.forEach((option) => {
    option.addEventListener("click", function() {
      statusOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      selectedStatus = this.getAttribute("data-status");
    });
  });
  saveAttendance.addEventListener("click", function() {
    if (selectedStatus !== null) {
      console.log(`Saving attendance ${selectedStatus} for student ${currentStudent}, date ${currentDate2}`);
      const targetCell = document.querySelector(`.attendance-status[data-student="${currentStudent}"][data-date="${currentDate2}"]`);
      if (targetCell) {
        const statusBadge = targetCell.querySelector(".status-badge");
        if (selectedStatus === "present") {
          statusBadge.textContent = "0";
          statusBadge.className = "status-badge status-present";
        } else if (selectedStatus === "absent") {
          statusBadge.textContent = "2";
          statusBadge.className = "status-badge status-absent";
        } else if (selectedStatus === "late") {
          statusBadge.textContent = "1";
          statusBadge.className = "status-badge status-late";
        } else if (selectedStatus === "excused") {
          statusBadge.textContent = "\u0423\u0432\u0430\u0436.";
          statusBadge.className = "status-badge status-excused";
        }
      }
      closeAttendanceModal();
    } else {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u043F\u043E\u0441\u0435\u0449\u0430\u0435\u043C\u043E\u0441\u0442\u0438");
    }
  });
}
function initDayDetailsModal() {
  const dayDetailsModal = document.getElementById("dayDetailsModal");
  const closeDayDetailsModal = document.getElementById("closeDayDetailsModal");
  const modalDayDate = document.getElementById("modalDayDate");
  const lateList = document.getElementById("lateList");
  const absentList = document.getElementById("absentList");
  const presentList = document.getElementById("presentList");
  if (!dayDetailsModal || !closeDayDetailsModal || !modalDayDate) {
    console.log("Some day details modal elements not found");
    return;
  }
  const attendanceByDay = {
    "2024-01-01": {
      late: [],
      absent: [],
      present: [
        { id: 1, name: "\u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432", avatar: "\u0418\u0418" },
        { id: 2, name: "\u041C\u0430\u0440\u0438\u044F \u041F\u0435\u0442\u0440\u043E\u0432\u0430", avatar: "\u041C\u041F" }
      ]
    }
  };
  function renderStudentList(container, students) {
    if (!container) return;
    container.innerHTML = "";
    if (students.length === 0) {
      container.innerHTML = '<div class="no-data">\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445</div>';
      return;
    }
    students.forEach((student) => {
      const studentItem = document.createElement("div");
      studentItem.className = "student-item";
      studentItem.innerHTML = `
                <div class="student-avatar-small">${student.avatar}</div>
                <div class="student-name">${student.name}</div>
            `;
      container.appendChild(studentItem);
    });
  }
  function getDayType(dayElement) {
    const indicators = dayElement.querySelectorAll(".attendance-indicator");
    let hasRed = false;
    let hasYellow = false;
    let hasGreen = false;
    indicators.forEach((indicator) => {
      if (indicator.classList.contains("indicator-poor")) hasRed = true;
      if (indicator.classList.contains("indicator-average")) hasYellow = true;
      if (indicator.classList.contains("indicator-good")) hasGreen = true;
    });
    if (hasRed && hasYellow) return "both";
    if (hasRed) return "absent";
    if (hasYellow) return "late";
    if (hasGreen) return "present";
    return "none";
  }
  function openDayDetailsModal(date, dayNumber, dayElement) {
    const dateString = `${dayNumber} \u044F\u043D\u0432\u0430\u0440\u044F 2024`;
    modalDayDate.textContent = dateString;
    const dayData = attendanceByDay[date] || { late: [], absent: [], present: [] };
    const dayType = getDayType(dayElement);
    if (lateList) lateList.style.display = "none";
    if (absentList) absentList.style.display = "none";
    if (presentList) presentList.style.display = "none";
    switch (dayType) {
      case "absent":
        if (absentList) {
          absentList.style.display = "block";
          renderStudentList(absentList, dayData.absent);
        }
        break;
      case "late":
        if (lateList) {
          lateList.style.display = "block";
          renderStudentList(lateList, dayData.late);
        }
        break;
      case "present":
        if (presentList) {
          presentList.style.display = "block";
          presentList.innerHTML = '<div class="no-data">\u0412\u0441\u0435 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u044B \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u043B\u0438</div>';
        }
        break;
      case "both":
        if (lateList) {
          lateList.style.display = "block";
          renderStudentList(lateList, dayData.late);
        }
        if (absentList) {
          absentList.style.display = "block";
          renderStudentList(absentList, dayData.absent);
        }
        break;
      default:
        if (lateList) {
          lateList.style.display = "block";
          renderStudentList(lateList, dayData.late);
        }
        if (absentList) {
          absentList.style.display = "block";
          renderStudentList(absentList, dayData.absent);
        }
        if (presentList) {
          presentList.style.display = "block";
          renderStudentList(presentList, dayData.present);
        }
    }
    dayDetailsModal.classList.add("active");
  }
  function closeDayDetailsModalFunc() {
    dayDetailsModal.classList.remove("active");
  }
  const calendarDays = document.querySelectorAll(".calendar-day");
  calendarDays.forEach((day) => {
    if (day.classList.contains("other-month")) return;
    day.style.cursor = "pointer";
    day.addEventListener("click", function() {
      const dayNumber = this.querySelector(".day-number").textContent.trim();
      const date = `2024-01-${dayNumber.padStart(2, "0")}`;
      openDayDetailsModal(date, dayNumber, this);
    });
  });
  if (closeDayDetailsModal) {
    closeDayDetailsModal.addEventListener("click", closeDayDetailsModalFunc);
  }
  dayDetailsModal.addEventListener("click", function(e) {
    if (e.target === dayDetailsModal) {
      closeDayDetailsModalFunc();
    }
  });
}
function initStatisticsModals() {
  const bestAttendanceModal = document.getElementById("bestAttendanceModal");
  const worstAttendanceModal = document.getElementById("worstAttendanceModal");
  const problemSubjectModal = document.getElementById("problemSubjectModal");
  const monthlyTrendModal = document.getElementById("monthlyTrendModal");
  function openBestAttendanceModal() {
    if (bestAttendanceModal) bestAttendanceModal.classList.add("active");
  }
  function openWorstAttendanceModal() {
    if (worstAttendanceModal) worstAttendanceModal.classList.add("active");
  }
  function openProblemSubjectModal() {
    if (problemSubjectModal) problemSubjectModal.classList.add("active");
  }
  function openMonthlyTrendModal() {
    if (monthlyTrendModal) monthlyTrendModal.classList.add("active");
  }
  function closeBestAttendanceModalFunc() {
    if (bestAttendanceModal) bestAttendanceModal.classList.remove("active");
  }
  function closeWorstAttendanceModalFunc() {
    if (worstAttendanceModal) worstAttendanceModal.classList.remove("active");
  }
  function closeProblemSubjectModalFunc() {
    if (problemSubjectModal) problemSubjectModal.classList.remove("active");
  }
  function closeMonthlyTrendModalFunc() {
    if (monthlyTrendModal) monthlyTrendModal.classList.remove("active");
  }
  const summaryItems = document.querySelectorAll(".summary-item");
  summaryItems.forEach((item, index) => {
    item.addEventListener("click", function() {
      switch (index) {
        case 0:
          openBestAttendanceModal();
          break;
        case 1:
          openWorstAttendanceModal();
          break;
        case 2:
          openProblemSubjectModal();
          break;
        case 3:
          openMonthlyTrendModal();
          break;
      }
    });
  });
  const closeButtons = [
    { id: "closeBestAttendanceModal", func: closeBestAttendanceModalFunc },
    { id: "closeBestAttendanceBtn", func: closeBestAttendanceModalFunc },
    { id: "closeWorstAttendanceModal", func: closeWorstAttendanceModalFunc },
    { id: "closeWorstAttendanceBtn", func: closeWorstAttendanceModalFunc },
    { id: "closeProblemSubjectModal", func: closeProblemSubjectModalFunc },
    { id: "closeProblemSubjectBtn", func: closeProblemSubjectModalFunc },
    { id: "closeMonthlyTrendModal", func: closeMonthlyTrendModalFunc },
    { id: "closeMonthlyTrendBtn", func: closeMonthlyTrendModalFunc }
  ];
  closeButtons.forEach(({ id, func }) => {
    const element = document.getElementById(id);
    if (element) element.addEventListener("click", func);
  });
  [bestAttendanceModal, worstAttendanceModal, problemSubjectModal, monthlyTrendModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", function(e) {
        if (e.target === modal) {
          const closeFuncs = {
            "bestAttendanceModal": closeBestAttendanceModalFunc,
            "worstAttendanceModal": closeWorstAttendanceModalFunc,
            "problemSubjectModal": closeProblemSubjectModalFunc,
            "monthlyTrendModal": closeMonthlyTrendModalFunc
          };
          closeFuncs[modal.id]?.();
        }
      });
    }
  });
}
function initBulkActions() {
  const bulkActions = document.querySelectorAll(".bulk-action");
  bulkActions.forEach((action) => {
    action.addEventListener("click", function() {
      const actionId = this.id;
      if (actionId === "markAllPresent") {
        if (confirm("\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435\u0445 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432 \u043A\u0430\u043A \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u043D\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0434\u0430\u0442\u0443?")) {
          alert("\u0412\u0441\u0435 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u044B \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u044B \u043A\u0430\u043A \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435");
        }
      } else if (actionId === "markAllAbsent") {
        if (confirm("\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435\u0445 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432 \u043A\u0430\u043A \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u043D\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0434\u0430\u0442\u0443?")) {
          alert("\u0412\u0441\u0435 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u044B \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u044B \u043A\u0430\u043A \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435");
        }
      } else if (actionId === "exportData") {
        alert("\u0414\u0430\u043D\u043D\u044B\u0435 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 Excel");
      } else if (actionId === "generateReport") {
        alert("\u041E\u0442\u0447\u0435\u0442 \u043E \u043F\u043E\u0441\u0435\u0449\u0430\u0435\u043C\u043E\u0441\u0442\u0438 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D");
      }
    });
  });
}
function initDateNavigation() {
  const prevBtn = document.querySelector(".nav-btn:first-child");
  const nextBtn = document.querySelector(".nav-btn:last-child");
  const currentDateElement = document.querySelector(".current-date");
  if (!prevBtn || !nextBtn || !currentDateElement) return;
  let currentMonth = 0;
  let currentYear = 2024;
  const months = [
    "\u042F\u043D\u0432\u0430\u0440\u044C",
    "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
    "\u041C\u0430\u0440\u0442",
    "\u0410\u043F\u0440\u0435\u043B\u044C",
    "\u041C\u0430\u0439",
    "\u0418\u044E\u043D\u044C",
    "\u0418\u044E\u043B\u044C",
    "\u0410\u0432\u0433\u0443\u0441\u0442",
    "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
    "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
    "\u041D\u043E\u044F\u0431\u0440\u044C",
    "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
  ];
  function updateCalendar() {
    currentDateElement.textContent = `${months[currentMonth]} ${currentYear}`;
  }
  prevBtn.addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar();
  });
  nextBtn.addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
  });
}
function initCalendarDays() {
  const calendarDays = document.querySelectorAll(".calendar-day");
  calendarDays.forEach((day) => {
    if (!day.classList.contains("other-month")) {
      day.style.cursor = "pointer";
    }
  });
}
function getStudentName(studentId) {
  const students = {
    "1": "\u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432",
    "2": "\u041C\u0430\u0440\u0438\u044F \u041F\u0435\u0442\u0440\u043E\u0432\u0430",
    "3": "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0421\u0438\u0434\u043E\u0440\u043E\u0432",
    "4": "\u0415\u043B\u0435\u043D\u0430 \u041D\u043E\u0432\u0438\u043A\u043E\u0432\u0430",
    "5": "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u041A\u043E\u0437\u043B\u043E\u0432"
  };
  return students[studentId] || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0441\u0442\u0443\u0434\u0435\u043D\u0442";
}
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("ru-RU", options);
  } catch (e) {
    return dateString;
  }
}
var init_attendance = __esm({
  "static/js/modules/attendance.js"() {
  }
});

// static/js/modules/progress.js
function initProgress() {
  const userName2 = "\u0415\u043B\u0435\u043D\u0430 \u041F\u043B\u0435\u0445\u0430\u043D\u043E\u0432\u0430";
  const userEmail = "elena.plekhanova@example.com";
  document.getElementById("userName").textContent = userName2;
  const nameParts = userName2.split(" ");
  const initials = nameParts.map((part) => part[0]).join("").toUpperCase();
  document.getElementById("userAvatar").textContent = initials;
  const prevBtn = document.querySelector(".period-navigation .nav-btn:first-child");
  const nextBtn = document.querySelector(".period-navigation .nav-btn:last-child");
  const currentPeriodElement = document.querySelector(".current-period");
  const periods = ["I \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C", "II \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C", "III \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C", "IV \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C"];
  let currentPeriodIndex = 0;
  function updatePeriod() {
    currentPeriodElement.textContent = periods[currentPeriodIndex];
    updateChart();
  }
  prevBtn.addEventListener("click", function() {
    currentPeriodIndex--;
    if (currentPeriodIndex < 0) {
      currentPeriodIndex = periods.length - 1;
    }
    updatePeriod();
  });
  nextBtn.addEventListener("click", function() {
    currentPeriodIndex++;
    if (currentPeriodIndex >= periods.length) {
      currentPeriodIndex = 0;
    }
    updatePeriod();
  });
  const actionButtons = document.querySelectorAll(".action-btn");
  actionButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-chart-line")) {
        alert("\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
      } else if (icon.classList.contains("fa-envelope")) {
        alert("\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0443");
      }
    });
  });
  let performanceChart = null;
  const chartTypeButtons = document.querySelectorAll(".chart-type-btn");
  const chartPeriodSelect = document.getElementById("chartPeriod");
  function initChart() {
    const ctx = document.getElementById("performanceChart").getContext("2d");
    const activeType = document.querySelector(".chart-type-btn.active").getAttribute("data-type");
    if (performanceChart) {
      performanceChart.destroy();
    }
    const { labels, datasets } = getChartData(chartPeriodSelect.value, activeType);
    performanceChart = new Chart(ctx, {
      type: activeType,
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "\u0414\u0438\u043D\u0430\u043C\u0438\u043A\u0430 \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432"
          }
        },
        scales: activeType === "radar" ? {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 5
          }
        } : {
          y: {
            beginAtZero: true,
            max: 5,
            title: {
              display: true,
              text: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B"
            }
          },
          x: {
            title: {
              display: true,
              text: "\u041F\u0435\u0440\u0438\u043E\u0434 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F"
            }
          }
        }
      }
    });
  }
  function getChartData(period, type) {
    let labels = [];
    let datasets = [];
    if (period === "\u0417\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u043C\u0435\u0441\u044F\u0446") {
      labels = ["\u041D\u0435\u0434\u0435\u043B\u044F 1", "\u041D\u0435\u0434\u0435\u043B\u044F 2", "\u041D\u0435\u0434\u0435\u043B\u044F 3", "\u041D\u0435\u0434\u0435\u043B\u044F 4"];
      datasets = [
        {
          label: "\u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432",
          data: [4.2, 4.3, 4.5, 4.6],
          borderColor: "#4A6FA5",
          backgroundColor: type === "line" || type === "radar" ? "transparent" : "rgba(74, 111, 165, 0.5)",
          tension: 0.4
        },
        {
          label: "\u041C\u0430\u0440\u0438\u044F \u041F\u0435\u0442\u0440\u043E\u0432\u0430",
          data: [4.8, 4.9, 4.9, 5],
          borderColor: "#2ECC71",
          backgroundColor: type === "line" || type === "radar" ? "transparent" : "rgba(46, 204, 113, 0.5)",
          tension: 0.4
        },
        {
          label: "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0421\u0438\u0434\u043E\u0440\u043E\u0432",
          data: [2.8, 3, 2.9, 3],
          borderColor: "#E74C3C",
          backgroundColor: type === "line" || type === "radar" ? "transparent" : "rgba(231, 76, 60, 0.5)",
          tension: 0.4
        }
      ];
    } else if (period === "\u0417\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 3 \u043C\u0435\u0441\u044F\u0446\u0430") {
      labels = ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442"];
      datasets = [
        {
          label: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u043A\u043B\u0430\u0441\u0441\u0430",
          data: [3.9, 4.1, 4.2],
          borderColor: "#4A6FA5",
          backgroundColor: type === "line" || type === "radar" ? "transparent" : "rgba(74, 111, 165, 0.5)",
          tension: 0.4
        },
        {
          label: "\u041B\u0443\u0447\u0448\u0438\u0439 \u0443\u0447\u0435\u043D\u0438\u043A",
          data: [4.7, 4.8, 5],
          borderColor: "#2ECC71",
          backgroundColor: type === "line" || type === "radar" ? "transparent" : "rgba(46, 204, 113, 0.5)",
          tension: 0.4
        },
        {
          label: "\u0425\u0443\u0434\u0448\u0438\u0439 \u0443\u0447\u0435\u043D\u0438\u043A",
          data: [2.8, 3, 3],
          borderColor: "#E74C3C",
          backgroundColor: type === "line" || type === "radar" ? "transparent" : "rgba(231, 76, 60, 0.5)",
          tension: 0.4
        }
      ];
    } else if (period === "\u0417\u0430 \u0443\u0447\u0435\u0431\u043D\u044B\u0439 \u0433\u043E\u0434") {
      labels = ["\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C", "\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439"];
      datasets = [
        {
          label: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u043A\u043B\u0430\u0441\u0441\u0430",
          data: [3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.2, 4.3],
          borderColor: "#4A6FA5",
          backgroundColor: type === "line" || type === "radar" ? "transparent" : "rgba(74, 111, 165, 0.5)",
          tension: 0.4
        }
      ];
    }
    return { labels, datasets };
  }
  chartTypeButtons.forEach((button) => {
    button.addEventListener("click", function() {
      chartTypeButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      updateChart();
    });
  });
  chartPeriodSelect.addEventListener("change", updateChart);
  function updateChart() {
    initChart();
  }
  initChart();
}
var init_progress = __esm({
  "static/js/modules/progress.js"() {
  }
});

// static/js/modules/statistics.js
function initStatistics() {
  console.log("Initializing statistics module...");
  const userName2 = "\u0415\u043B\u0435\u043D\u0430 \u041F\u043B\u0435\u0445\u0430\u043D\u043E\u0432\u0430";
  const userEmail = "";
  document.getElementById("userName").textContent = userName2;
  initStatisticsCharts();
  initExportFunctionality();
}
function initStatisticsCharts() {
  const gradesCtx = document.getElementById("gradesDistributionChart");
  if (gradesCtx) {
    window.gradesChart = new Chart(gradesCtx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["\u041E\u0442\u043B\u0438\u0447\u043D\u043E (5)", "\u0425\u043E\u0440\u043E\u0448\u043E (4)", "\u0423\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E (3)", "\u041D\u0435\u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E (2)"],
        datasets: [{
          data: [45, 35, 15, 5],
          backgroundColor: ["#2ECC71", "#3498DB", "#F39C12", "#E74C3C"],
          borderWidth: 2,
          borderColor: "#fff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } }
      }
    });
  }
  const coursesCtx = document.getElementById("coursesProgressChart");
  if (coursesCtx) {
    window.coursesChart = new Chart(coursesCtx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430", "\u0424\u0438\u0437\u0438\u043A\u0430", "WEB-\u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438", "\u0411\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445"],
        datasets: [{
          label: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 (%)",
          data: [78, 65, 52, 71, 58],
          backgroundColor: "rgba(74, 111, 165, 0.7)",
          borderColor: "rgba(74, 111, 165, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }
  const activityCtx = document.getElementById("activityChart");
  if (activityCtx) {
    window.activityChart = new Chart(activityCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: ["\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431", "\u0412\u0441"],
        datasets: [{
          label: "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432",
          data: [65, 75, 70, 80, 60, 55, 45],
          borderColor: "#4A6FA5",
          backgroundColor: "rgba(74, 111, 165, 0.1)",
          borderWidth: 3,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }
  const assignmentsCtx = document.getElementById("assignmentsChart");
  if (assignmentsCtx) {
    window.assignmentsChart = new Chart(assignmentsCtx.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E", "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435", "\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043E", "\u041D\u0435 \u043D\u0430\u0447\u0430\u0442\u043E"],
        datasets: [{
          data: [65, 20, 5, 10],
          backgroundColor: ["#2ECC71", "#F39C12", "#E74C3C", "#8A8A9F"],
          borderWidth: 2,
          borderColor: "#fff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } }
      }
    });
  }
}
var init_statistics = __esm({
  "static/js/modules/statistics.js"() {
  }
});

// static/js/modules/export.js
function initExport() {
  const exportScheduleBtn = document.getElementById("exportScheduleBtn");
  const exportScheduleModal = document.getElementById("exportScheduleModal");
  const cancelScheduleExport = document.getElementById("cancelScheduleExport");
  const confirmScheduleExport = document.getElementById("confirmScheduleExport");
  const exportContent = document.getElementById("exportContent");
  const printContent = document.getElementById("printContent");
  const exportDate = document.getElementById("exportDate");
  const exportTeacher = document.getElementById("exportTeacher");
  const exportPeriod = document.getElementById("exportPeriod");
  const exportScheduleView = document.getElementById("exportScheduleView");
  const exportEventsBody = document.getElementById("exportEventsBody");
  const exportUpcomingBody = document.getElementById("exportUpcomingBody");
  const exportScheduleLoading = document.getElementById("exportScheduleLoading");
  function setExportData() {
    const now = /* @__PURE__ */ new Date();
    exportDate.textContent = now.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    exportTeacher.textContent = userName;
    if (currentView === "month") {
      const monthNames = [
        "\u042F\u043D\u0432\u0430\u0440\u044C",
        "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
        "\u041C\u0430\u0440\u0442",
        "\u0410\u043F\u0440\u0435\u043B\u044C",
        "\u041C\u0430\u0439",
        "\u0418\u044E\u043D\u044C",
        "\u0418\u044E\u043B\u044C",
        "\u0410\u0432\u0433\u0443\u0441\u0442",
        "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
        "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
        "\u041D\u043E\u044F\u0431\u0440\u044C",
        "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
      ];
      exportPeriod.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (currentView === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      const monthNames = [
        "\u044F\u043D\u0432\u0430\u0440\u044F",
        "\u0444\u0435\u0432\u0440\u0430\u043B\u044F",
        "\u043C\u0430\u0440\u0442\u0430",
        "\u0430\u043F\u0440\u0435\u043B\u044F",
        "\u043C\u0430\u044F",
        "\u0438\u044E\u043D\u044F",
        "\u0438\u044E\u043B\u044F",
        "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
        "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F",
        "\u043E\u043A\u0442\u044F\u0431\u0440\u044F",
        "\u043D\u043E\u044F\u0431\u0440\u044F",
        "\u0434\u0435\u043A\u0430\u0431\u0440\u044F"
      ];
      exportPeriod.textContent = `${weekStart.getDate()} ${monthNames[weekStart.getMonth()]} - ${weekEnd.getDate()} ${monthNames[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`;
    } else if (currentView === "day") {
      const monthNames = [
        "\u044F\u043D\u0432\u0430\u0440\u044F",
        "\u0444\u0435\u0432\u0440\u0430\u043B\u044F",
        "\u043C\u0430\u0440\u0442\u0430",
        "\u0430\u043F\u0440\u0435\u043B\u044F",
        "\u043C\u0430\u044F",
        "\u0438\u044E\u043D\u044F",
        "\u0438\u044E\u043B\u044F",
        "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
        "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F",
        "\u043E\u043A\u0442\u044F\u0431\u0440\u044F",
        "\u043D\u043E\u044F\u0431\u0440\u044F",
        "\u0434\u0435\u043A\u0430\u0431\u0440\u044F"
      ];
      const dayNames = ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"];
      exportPeriod.textContent = `${dayNames[currentDate.getDay()]}, ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  }
  async function prepareExportContent() {
    return new Promise((resolve) => {
      exportContent.style.display = "block";
      let currentViewElement;
      if (currentView === "month") {
        currentViewElement = document.querySelector(".month-view");
      } else if (currentView === "week") {
        currentViewElement = document.querySelector(".week-view");
      } else if (currentView === "day") {
        currentViewElement = document.querySelector(".day-view");
      }
      if (currentViewElement) {
        exportScheduleView.innerHTML = "";
        const clone = currentViewElement.cloneNode(true);
        exportScheduleView.appendChild(clone);
      }
      exportEventsBody.innerHTML = "";
      const allEvents = getAllEvents().sort((a, b) => new Date(a.date) - new Date(b.date));
      allEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString("ru-RU");
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${event.time || "\u0412\u0435\u0441\u044C \u0434\u0435\u043D\u044C"}</td>
                    <td>${event.title}</td>
                    <td>${getEventTypeName(event.type)}</td>
                    <td>${getCourseName(event.course) || ""}</td>
                    <td>${event.location || ""}</td>
                    <td>${event.description || ""}</td>
                `;
        exportEventsBody.appendChild(row);
      });
      exportUpcomingBody.innerHTML = "";
      const upcomingEvents = getUpcomingEvents();
      upcomingEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString("ru-RU");
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${event.time || "\u0412\u0435\u0441\u044C \u0434\u0435\u043D\u044C"}</td>
                    <td>${event.title}</td>
                    <td>${getCourseName(event.course) || ""}</td>
                    <td>${event.location || ""}</td>
                `;
        exportUpcomingBody.appendChild(row);
      });
      setTimeout(() => {
        resolve();
      }, 1e3);
    });
  }
  function showLoading() {
    exportScheduleLoading.style.display = "flex";
  }
  function hideLoading() {
    exportScheduleLoading.style.display = "none";
  }
  async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    try {
      const canvas = await html2canvas(exportContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        allowTaint: false,
        width: exportContent.scrollWidth,
        height: exportContent.scrollHeight
      });
      const imgData = canvas.toDataURL("/frontend/static/assets/image/logo/logo.png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("\u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435_\u043F\u0438\u0444\u0430\u0433\u043E\u0440_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".pdf");
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435 \u0432 PDF:", error);
      throw error;
    }
  }
  async function exportToImage() {
    try {
      const canvas = await html2canvas(exportContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        allowTaint: false,
        width: exportContent.scrollWidth,
        height: exportContent.scrollHeight
      });
      const link = document.createElement("a");
      link.download = "\u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435_\u043F\u0438\u0444\u0430\u0433\u043E\u0440_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".png";
      link.href = canvas.toDataURL("/frontend/static/assets/image/logo/logo.png");
      link.click();
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435 \u0432 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435:", error);
      throw error;
    }
  }
  async function exportToWord() {
    try {
      const { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow } = window.docx;
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0439 - \u041F\u0418\u0424\u0410\u0413\u041E\u0420",
                  bold: true,
                  size: 32
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `\u0414\u0430\u0442\u0430 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438: ${(/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU")}`,
                  size: 24
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044C: ${userName}`,
                  size: 24
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `\u041F\u0435\u0440\u0438\u043E\u0434: ${exportPeriod.textContent}`,
                  size: 24
                })
              ]
            }),
            new Paragraph({
              text: ""
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\u0412\u0441\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u043F\u0435\u0440\u0438\u043E\u0434\u0430:",
                  bold: true,
                  size: 28
                })
              ]
            })
          ]
        }]
      });
      const allEvents = getAllEvents().sort((a, b) => new Date(a.date) - new Date(b.date));
      if (allEvents.length > 0) {
        const tableRows = [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("\u0414\u0430\u0442\u0430")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("\u0412\u0440\u0435\u043C\u044F")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("\u0422\u0438\u043F")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("\u041A\u0443\u0440\u0441")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("\u041C\u0435\u0441\u0442\u043E")] })] })
            ]
          })
        ];
        allEvents.forEach((event) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString("ru-RU");
          tableRows.push(new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun(formattedDate)] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun(event.time || "\u0412\u0435\u0441\u044C \u0434\u0435\u043D\u044C")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun(event.title)] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun(getEventTypeName(event.type))] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun(getCourseName(event.course) || "")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun(event.location || "")] })] })
            ]
          }));
        });
        doc.addSection({
          children: [
            new Table({
              width: {
                size: 100,
                type: "pct"
              },
              rows: tableRows
            })
          ]
        });
      }
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "\u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435_\u043F\u0438\u0444\u0430\u0433\u043E\u0440_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".docx");
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435 \u0432 Word:", error);
      throw error;
    }
  }
  async function exportToExcel() {
    try {
      const wb = XLSX.utils.book_new();
      const allEvents = getAllEvents().sort((a, b) => new Date(a.date) - new Date(b.date));
      const eventsData = [
        ["\u0414\u0430\u0442\u0430", "\u0412\u0440\u0435\u043C\u044F", "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", "\u0422\u0438\u043F", "\u041A\u0443\u0440\u0441", "\u041C\u0435\u0441\u0442\u043E", "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"]
      ];
      allEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString("ru-RU");
        eventsData.push([
          formattedDate,
          event.time || "\u0412\u0435\u0441\u044C \u0434\u0435\u043D\u044C",
          event.title,
          getEventTypeName(event.type),
          getCourseName(event.course) || "",
          event.location || "",
          event.description || ""
        ]);
      });
      const ws = XLSX.utils.aoa_to_sheet(eventsData);
      XLSX.utils.book_append_sheet(wb, ws, "\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435");
      const upcomingEvents = getUpcomingEvents();
      const upcomingData = [
        ["\u0414\u0430\u0442\u0430", "\u0412\u0440\u0435\u043C\u044F", "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", "\u041A\u0443\u0440\u0441", "\u041C\u0435\u0441\u0442\u043E"]
      ];
      upcomingEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString("ru-RU");
        upcomingData.push([
          formattedDate,
          event.time || "\u0412\u0435\u0441\u044C \u0434\u0435\u043D\u044C",
          event.title,
          getCourseName(event.course) || "",
          event.location || ""
        ]);
      });
      const ws2 = XLSX.utils.aoa_to_sheet(upcomingData);
      XLSX.utils.book_append_sheet(wb, ws2, "\u0411\u043B\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F");
      XLSX.writeFile(wb, "\u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435_\u043F\u0438\u0444\u0430\u0433\u043E\u0440_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".xlsx");
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435 \u0432 Excel:", error);
      throw error;
    }
  }
  async function exportToPrint() {
    try {
      const canvas = await html2canvas(exportContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        allowTaint: false,
        width: exportContent.scrollWidth,
        height: exportContent.scrollHeight
      });
      const imgData = canvas.toDataURL("/frontend/static/assets/image/logo/logo.png");
      printContent.innerHTML = "";
      const img = document.createElement("img");
      img.src = imgData;
      img.style.width = "100%";
      img.style.height = "auto";
      printContent.appendChild(img);
      printContent.style.display = "block";
      window.print();
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0435\u0447\u0430\u0442\u0438:", error);
      throw error;
    } finally {
      setTimeout(() => {
        printContent.style.display = "none";
        printContent.innerHTML = "";
      }, 500);
    }
  }
  exportScheduleBtn.addEventListener("click", function() {
    setExportData();
    exportScheduleModal.style.display = "flex";
  });
  cancelScheduleExport.addEventListener("click", function() {
    exportScheduleModal.style.display = "none";
  });
  exportScheduleModal.addEventListener("click", function(e) {
    if (e.target === exportScheduleModal) {
      exportScheduleModal.style.display = "none";
    }
  });
  confirmScheduleExport.addEventListener("click", async function() {
    const format = document.querySelector('input[name="exportScheduleFormat"]:checked').value;
    exportScheduleModal.style.display = "none";
    showLoading();
    try {
      await prepareExportContent();
      switch (format) {
        case "pdf":
          await exportToPDF();
          break;
        case "image":
          await exportToImage();
          break;
        case "word":
          await exportToWord();
          break;
        case "excel":
          await exportToExcel();
          break;
        case "print":
          await exportToPrint();
          break;
      }
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435:", error);
      alert("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.");
    } finally {
      exportContent.style.display = "none";
      hideLoading();
    }
  });
}
var init_export = __esm({
  "static/js/modules/export.js"() {
  }
});

// static/js/pages/analitics-page.js
function initAttendancePage() {
  console.log("Initializing attendance page...");
  initAttendance();
}
function initProgressPage() {
  console.log("Initializing progress page...");
  initProgress();
}
function initStatisticsPage() {
  console.log("Initializing statistics page...");
  initStatistics();
  initExport();
}
var init_analitics_page = __esm({
  "static/js/pages/analitics-page.js"() {
    init_attendance();
    init_progress();
    init_statistics();
    init_export();
  }
});

// static/js/pages/contact-pages.js
function initMap() {
  if (typeof ymaps === "undefined") {
    console.warn("Yandex Maps not loaded");
    return;
  }
  ymaps.ready(function() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;
    var myMap = new ymaps.Map("map", {
      center: [56.11855, 40.37832],
      zoom: 15,
      controls: ["zoomControl", "fullscreenControl"]
    });
    var myPlacemark = new ymaps.Placemark([56.11855, 40.37832], {
      hintContent: "\u0412\u043B\u0413\u041A \u0438\u043C. \u0414.\u041A.\u0421\u043E\u0432\u0435\u0442\u043A\u0438\u043D\u0430 - \u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440\u0441\u043A\u0438\u0439 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043B\u043B\u0435\u0434\u0436",
      balloonContentHeader: "\u0412\u043B\u0413\u041A \u0438\u043C. \u0414.\u041A.\u0421\u043E\u0432\u0435\u0442\u043A\u0438\u043D\u0430",
      balloonContentBody: `
                <div style="padding: 10px 0;">
                    <p><strong>\u0410\u0434\u0440\u0435\u0441:</strong> \u0433. \u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440, \u0443\u043B. \u041E\u0444\u0438\u0446\u0435\u0440\u0441\u043A\u0430\u044F, \u0434. 11</p>
                    <p><strong>\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</strong> +7 (800) 555-35-35</p>
                    <p><strong>\u0420\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B:</strong> \u041F\u043D-\u041F\u0442: 8:00-17:00</p>
                </div>
            `,
      balloonContentFooter: "\u041E\u0441\u043D\u043E\u0432\u0430\u043D \u0432 1885 \u0433\u043E\u0434\u0443"
    }, {
      iconLayout: "default#image",
      iconImageHref: "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#4A6FA5" d="M16 0C10.477 0 6 4.477 6 10c0 5.523 10 22 10 22s10-16.477 10-22c0-5.523-4.477-10-10-10zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/></svg>'),
      iconImageSize: [32, 32],
      iconImageOffset: [-16, -32]
    });
    myMap.geoObjects.add(myPlacemark);
    myPlacemark.balloon.open();
  });
}
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const answer = question.nextElementSibling;
      const isActive = answer.classList.contains("active");
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        ans.classList.remove("active");
      });
      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("active");
      });
      if (!isActive) {
        answer.classList.add("active");
        item.classList.add("active");
      }
    });
  });
}
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435! \u041C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F.");
      this.reset();
    });
  }
}
var init_contact_pages = __esm({
  "static/js/pages/contact-pages.js"() {
  }
});

// static/js/pages/teachers-pages.js
function initTeachersFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const teacherCards = document.querySelectorAll(".teacher-card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filterValue = this.getAttribute("data-filter");
      teacherCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-categories").includes(filterValue)) {
          card.style.display = "block";
          setTimeout(() => {
            card.classList.add("visible");
          }, 10);
        } else {
          card.style.display = "none";
          card.classList.remove("visible");
        }
      });
    });
  });
}
var init_teachers_pages = __esm({
  "static/js/pages/teachers-pages.js"() {
  }
});

// static/js/pages/admin/platform-users.js
function initPlatformUsers() {
  const userName2 = "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440";
  const userEmail = "admin@school.ru";
  const userNameElement = document.getElementById("userName");
  if (userNameElement) {
    userNameElement.textContent = userName2;
  }
  if (document.getElementById("rolesChart")) {
    loadChartJS().then(() => {
      initializeCharts();
    });
  }
  const addUserBtn = document.getElementById("addUserBtn");
  const addUserModal = document.getElementById("addUserModal");
  const closeModal = document.getElementById("closeModal");
  const cancelAdd = document.getElementById("cancelAdd");
  const saveUser = document.getElementById("saveUser");
  if (addUserBtn && addUserModal) {
    let closeAddModal = function() {
      addUserModal.classList.remove("active");
    };
    addUserBtn.addEventListener("click", function() {
      addUserModal.classList.add("active");
    });
    if (closeModal) closeModal.addEventListener("click", closeAddModal);
    if (cancelAdd) cancelAdd.addEventListener("click", closeAddModal);
    if (saveUser) {
      saveUser.addEventListener("click", function() {
        const userFirstName = document.getElementById("userFirstName")?.value;
        const userLastName = document.getElementById("userLastName")?.value;
        const userEmail2 = document.getElementById("userEmail")?.value;
        const userRole = document.getElementById("userRole")?.value;
        const userStatus = document.getElementById("userStatus")?.value;
        const userPassword = document.getElementById("userPassword")?.value;
        const userConfirmPassword = document.getElementById("userConfirmPassword")?.value;
        if (!userFirstName || !userLastName || !userEmail2 || !userPassword) {
          alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F");
          return;
        }
        if (userPassword !== userConfirmPassword) {
          alert("\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442");
          return;
        }
        console.log(`Adding user: ${userFirstName} ${userLastName}, ${userEmail2}, ${userRole}, ${userStatus}`);
        alert(`\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ${userFirstName} ${userLastName} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D!`);
        closeAddModal();
        document.getElementById("userFirstName").value = "";
        document.getElementById("userLastName").value = "";
        document.getElementById("userEmail").value = "";
        document.getElementById("userPassword").value = "";
        document.getElementById("userConfirmPassword").value = "";
      });
    }
  }
  const selectAllCheckbox = document.getElementById("selectAll");
  const userCheckboxes = document.querySelectorAll(".user-checkbox");
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function() {
      userCheckboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
    });
  }
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.toLowerCase();
      const userRows = document.querySelectorAll(".user-row");
      userRows.forEach((row) => {
        const userName3 = row.querySelector(".user-name")?.textContent.toLowerCase();
        const userEmail2 = row.querySelector(".user-email")?.textContent.toLowerCase();
        if (userName3?.includes(searchTerm) || userEmail2?.includes(searchTerm)) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
  const roleFilter = document.querySelectorAll(".filter-select")[0];
  if (roleFilter) {
    roleFilter.addEventListener("change", function() {
      const selectedRole = this.value;
      const userRows = document.querySelectorAll(".user-row");
      if (selectedRole === "\u0412\u0441\u0435 \u0440\u043E\u043B\u0438") {
        userRows.forEach((row) => {
          row.style.display = "table-row";
        });
      } else {
        userRows.forEach((row) => {
          const role = row.querySelector(".role-badge")?.textContent;
          if (role === selectedRole) {
            row.style.display = "table-row";
          } else {
            row.style.display = "none";
          }
        });
      }
    });
  }
  const statusFilter = document.querySelectorAll(".filter-select")[1];
  if (statusFilter) {
    statusFilter.addEventListener("change", function() {
      const selectedStatus = this.value;
      const userRows = document.querySelectorAll(".user-row");
      if (selectedStatus === "\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B") {
        userRows.forEach((row) => {
          row.style.display = "table-row";
        });
      } else {
        userRows.forEach((row) => {
          const status = row.querySelector(".status-badge")?.textContent;
          if (status === selectedStatus) {
            row.style.display = "table-row";
          } else {
            row.style.display = "none";
          }
        });
      }
    });
  }
  const editButtons = document.querySelectorAll(".action-btn:not(.delete)");
  const deleteButtons = document.querySelectorAll(".action-btn.delete");
  editButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const userRow = this.closest(".user-row");
      const userName3 = userRow.querySelector(".user-name")?.textContent;
      alert(`\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: ${userName3}`);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const userRow = this.closest(".user-row");
      const userName3 = userRow.querySelector(".user-name")?.textContent;
      if (confirm(`\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F ${userName3}?`)) {
        userRow.remove();
        alert(`\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ${userName3} \u0443\u0434\u0430\u043B\u0435\u043D`);
      }
    });
  });
}
function initializeCharts() {
  if (typeof Chart === "undefined") return;
  createRolesChart();
  createRegistrationChart();
  createActivityChart();
  createStatusChart();
}
function createRolesChart() {
  const ctx = document.getElementById("rolesChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: ["\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B", "\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438", "\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u0438", "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B"],
      datasets: [{
        data: [987, 48, 212, 5],
        backgroundColor: [
          "rgba(52, 152, 219, 0.7)",
          "rgba(243, 156, 18, 0.7)",
          "rgba(46, 204, 113, 0.7)",
          "rgba(231, 76, 60, 0.7)"
        ],
        borderColor: [
          "rgba(52, 152, 219, 1)",
          "rgba(243, 156, 18, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(231, 76, 60, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}
function createRegistrationChart() {
  const ctx = document.getElementById("registrationChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"],
      datasets: [{
        label: "\u041D\u043E\u0432\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438",
        data: [45, 60, 75, 80, 65, 70, 55, 120, 180, 150, 90, 70],
        backgroundColor: "rgba(74, 111, 165, 0.7)",
        borderColor: "rgba(74, 111, 165, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function createActivityChart() {
  const ctx = document.getElementById("activityChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "line",
    data: {
      labels: ["\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431", "\u0412\u0441"],
      datasets: [{
        label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438",
        data: [850, 920, 810, 930, 1010, 650, 580],
        borderColor: "rgba(46, 204, 113, 1)",
        backgroundColor: "rgba(46, 204, 113, 0.1)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function createStatusChart() {
  const ctx = document.getElementById("statusChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "pie",
    data: {
      labels: ["\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435", "\u041D\u0435\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435", "\u041E\u0436\u0438\u0434\u0430\u044E\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F"],
      datasets: [{
        data: [1189, 45, 13],
        backgroundColor: [
          "rgba(46, 204, 113, 0.7)",
          "rgba(149, 165, 166, 0.7)",
          "rgba(243, 156, 18, 0.7)"
        ],
        borderColor: [
          "rgba(46, 204, 113, 1)",
          "rgba(149, 165, 166, 1)",
          "rgba(243, 156, 18, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}
var init_platform_users = __esm({
  "static/js/pages/admin/platform-users.js"() {
  }
});

// static/js/pages/admin/role-management.js
function initRoleManagement() {
  const userName2 = "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440";
  const userNameElement = document.getElementById("userName");
  const userAvatar = document.getElementById("userAvatar");
  if (userNameElement) {
    userNameElement.textContent = userName2;
  }
  if (userAvatar) {
    const nameParts = userName2.split(" ");
    const initials = nameParts.map((part) => part[0]).join("").toUpperCase();
    userAvatar.textContent = initials;
  }
  if (document.getElementById("rolesDistributionChart")) {
    loadChartJS().then(() => {
      initializeCharts2();
    });
  }
  const addRoleBtn = document.getElementById("addRoleBtn");
  const addRoleModal = document.getElementById("addRoleModal");
  const closeModal = document.getElementById("closeModal");
  const cancelAdd = document.getElementById("cancelAdd");
  const saveRole = document.getElementById("saveRole");
  if (addRoleBtn && addRoleModal) {
    let closeAddModal = function() {
      addRoleModal.classList.remove("active");
    };
    addRoleBtn.addEventListener("click", function() {
      addRoleModal.classList.add("active");
    });
    if (closeModal) closeModal.addEventListener("click", closeAddModal);
    if (cancelAdd) cancelAdd.addEventListener("click", closeAddModal);
    if (saveRole) {
      saveRole.addEventListener("click", function() {
        const roleName = document.getElementById("roleName")?.value;
        const roleKey = document.getElementById("roleKey")?.value;
        const roleDescription = document.getElementById("roleDescription")?.value;
        const roleType = document.getElementById("roleType")?.value;
        if (!roleName || !roleKey || !roleDescription) {
          alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F");
          return;
        }
        console.log(`Adding role: ${roleName}, ${roleKey}, ${roleDescription}, ${roleType}`);
        alert(`\u0420\u043E\u043B\u044C "${roleName}" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430!`);
        closeAddModal();
        document.getElementById("roleName").value = "";
        document.getElementById("roleKey").value = "";
        document.getElementById("roleDescription").value = "";
        const checkboxes = document.querySelectorAll('.permissions-checkboxes input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      });
    }
  }
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.toLowerCase();
      const roleCards = document.querySelectorAll(".role-card");
      roleCards.forEach((card) => {
        const roleName = card.querySelector(".role-info h3")?.textContent.toLowerCase();
        if (roleName?.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
  const roleFilter = document.querySelector(".filter-select");
  if (roleFilter) {
    roleFilter.addEventListener("change", function() {
      const selectedFilter = this.value;
      const roleCards = document.querySelectorAll(".role-card");
      if (selectedFilter === "\u0412\u0441\u0435 \u0440\u043E\u043B\u0438") {
        roleCards.forEach((card) => {
          card.style.display = "block";
        });
      } else if (selectedFilter === "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0440\u043E\u043B\u0438") {
        roleCards.forEach((card) => {
          const roleStatus = card.querySelector(".role-status")?.textContent;
          if (roleStatus === "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0440\u043E\u043B\u044C") {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      } else if (selectedFilter === "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0440\u043E\u043B\u0438") {
        roleCards.forEach((card) => {
          const roleStatus = card.querySelector(".role-status")?.textContent;
          if (roleStatus === "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F \u0440\u043E\u043B\u044C") {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }
    });
  }
  const editButtons = document.querySelectorAll(".action-btn:not(.delete)");
  const deleteButtons = document.querySelectorAll(".action-btn.delete");
  editButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const roleCard = this.closest(".role-card");
      const roleName = roleCard.querySelector(".role-info h3")?.textContent;
      alert(`\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u043E\u043B\u0438: ${roleName}`);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const roleCard = this.closest(".role-card");
      const roleName = roleCard.querySelector(".role-info h3")?.textContent;
      const roleStatus = roleCard.querySelector(".role-status")?.textContent;
      if (roleStatus === "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0440\u043E\u043B\u044C") {
        alert("\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0440\u043E\u043B\u0438 \u043D\u0435\u043B\u044C\u0437\u044F \u0443\u0434\u0430\u043B\u0438\u0442\u044C");
        return;
      }
      if (confirm(`\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0440\u043E\u043B\u044C "${roleName}"?`)) {
        roleCard.remove();
        alert(`\u0420\u043E\u043B\u044C "${roleName}" \u0443\u0434\u0430\u043B\u0435\u043D\u0430`);
      }
    });
  });
  const permissionChecks = document.querySelectorAll(".permission-check");
  permissionChecks.forEach((check) => {
    check.addEventListener("click", function() {
      this.classList.toggle("checked");
    });
  });
}
function initializeCharts2() {
  if (typeof Chart === "undefined") return;
  createRolesDistributionChart();
  createRolesActivityChart();
}
function createRolesDistributionChart() {
  const ctx = document.getElementById("rolesDistributionChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: ["\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B", "\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438", "\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u0438", "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B", "\u041C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440\u044B", "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438"],
      datasets: [{
        data: [987, 48, 212, 5, 2, 1],
        backgroundColor: [
          "rgba(52, 152, 219, 0.7)",
          "rgba(243, 156, 18, 0.7)",
          "rgba(46, 204, 113, 0.7)",
          "rgba(231, 76, 60, 0.7)",
          "rgba(155, 89, 182, 0.7)",
          "rgba(26, 188, 156, 0.7)"
        ],
        borderColor: [
          "rgba(52, 152, 219, 1)",
          "rgba(243, 156, 18, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(155, 89, 182, 1)",
          "rgba(26, 188, 156, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}
function createRolesActivityChart() {
  const ctx = document.getElementById("rolesActivityChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B", "\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438", "\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B", "\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u0438", "\u041C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440\u044B", "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438"],
      datasets: [{
        label: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 (\u0447\u0430\u0441\u043E\u0432/\u043D\u0435\u0434\u0435\u043B\u044E)",
        data: [42, 38, 12, 5, 25, 30],
        backgroundColor: "rgba(74, 111, 165, 0.7)",
        borderColor: "rgba(74, 111, 165, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
var init_role_management = __esm({
  "static/js/pages/admin/role-management.js"() {
  }
});

// static/js/pages/admin/subject-management.js
function initSubjectManagement() {
  const userName2 = "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440";
  const userNameElement = document.getElementById("userName");
  const userAvatar = document.getElementById("userAvatar");
  if (userNameElement) {
    userNameElement.textContent = userName2;
  }
  if (userAvatar) {
    const nameParts = userName2.split(" ");
    const initials = nameParts.map((part) => part[0]).join("").toUpperCase();
    userAvatar.textContent = initials;
  }
  if (document.getElementById("studentsDistributionChart")) {
    loadChartJS().then(() => {
      initializeCharts3();
    });
  }
  const addSubjectBtn = document.getElementById("addSubjectBtn");
  const addSubjectModal = document.getElementById("addSubjectModal");
  const closeModal = document.getElementById("closeModal");
  const cancelAdd = document.getElementById("cancelAdd");
  const saveSubject = document.getElementById("saveSubject");
  if (addSubjectBtn && addSubjectModal) {
    let closeAddModal = function() {
      addSubjectModal.classList.remove("active");
    };
    addSubjectBtn.addEventListener("click", function() {
      addSubjectModal.classList.add("active");
    });
    if (closeModal) closeModal.addEventListener("click", closeAddModal);
    if (cancelAdd) cancelAdd.addEventListener("click", closeAddModal);
    if (saveSubject) {
      saveSubject.addEventListener("click", function() {
        const subjectName = document.getElementById("subjectName")?.value;
        const subjectCategory = document.getElementById("subjectCategory")?.value;
        const subjectStatus = document.getElementById("subjectStatus")?.value;
        const subjectDescription = document.getElementById("subjectDescription")?.value;
        if (!subjectName || !subjectDescription) {
          alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F");
          return;
        }
        console.log(`Adding subject: ${subjectName}, ${subjectCategory}, ${subjectStatus}, ${subjectDescription}`);
        alert(`\u041F\u0440\u0435\u0434\u043C\u0435\u0442 "${subjectName}" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D!`);
        closeAddModal();
        document.getElementById("subjectName").value = "";
        document.getElementById("subjectDescription").value = "";
        const checkboxes = document.querySelectorAll('.teachers-select input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      });
    }
  }
  const selectAllCheckbox = document.getElementById("selectAll");
  const subjectCheckboxes = document.querySelectorAll(".subject-checkbox");
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function() {
      subjectCheckboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
    });
  }
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.toLowerCase();
      const subjectCards = document.querySelectorAll(".subject-card");
      const subjectRows = document.querySelectorAll(".subject-row");
      subjectCards.forEach((card) => {
        const subjectName = card.querySelector(".subject-info h3")?.textContent.toLowerCase();
        if (subjectName?.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
      subjectRows.forEach((row) => {
        const subjectName = row.querySelector(".subject-name")?.textContent.toLowerCase();
        if (subjectName?.includes(searchTerm)) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
  const categoryFilter = document.querySelectorAll(".filter-select")[0];
  if (categoryFilter) {
    categoryFilter.addEventListener("change", function() {
      const selectedCategory = this.value;
      const subjectCards = document.querySelectorAll(".subject-card");
      const subjectRows = document.querySelectorAll(".subject-row");
      if (selectedCategory === "\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438") {
        subjectCards.forEach((card) => {
          card.style.display = "block";
        });
        subjectRows.forEach((row) => {
          row.style.display = "table-row";
        });
      } else {
        subjectCards.forEach((card) => {
          const category = card.querySelector(".subject-info p")?.textContent;
          if (category === selectedCategory) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
        subjectRows.forEach((row) => {
          const category = row.querySelector("td:nth-child(3)")?.textContent;
          if (category === selectedCategory) {
            row.style.display = "table-row";
          } else {
            row.style.display = "none";
          }
        });
      }
    });
  }
  const statusFilter = document.querySelectorAll(".filter-select")[1];
  if (statusFilter) {
    statusFilter.addEventListener("change", function() {
      const selectedStatus = this.value;
      const subjectCards = document.querySelectorAll(".subject-card");
      const subjectRows = document.querySelectorAll(".subject-row");
      if (selectedStatus === "\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B") {
        subjectCards.forEach((card) => {
          card.style.display = "block";
        });
        subjectRows.forEach((row) => {
          row.style.display = "table-row";
        });
      } else {
        subjectCards.forEach((card) => {
          const status = card.querySelector(".subject-status")?.textContent;
          if (status?.includes(selectedStatus)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
        subjectRows.forEach((row) => {
          const status = row.querySelector(".status-badge")?.textContent;
          if (status === selectedStatus) {
            row.style.display = "table-row";
          } else {
            row.style.display = "none";
          }
        });
      }
    });
  }
  const editButtons = document.querySelectorAll(".action-btn:not(.delete)");
  const deleteButtons = document.querySelectorAll(".action-btn.delete");
  editButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const subjectCard = this.closest(".subject-card") || this.closest(".subject-row");
      const subjectName = subjectCard.querySelector(".subject-info h3, .subject-name")?.textContent;
      alert(`\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430: ${subjectName}`);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const subjectCard = this.closest(".subject-card") || this.closest(".subject-row");
      const subjectName = subjectCard.querySelector(".subject-info h3, .subject-name")?.textContent;
      if (confirm(`\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442 "${subjectName}"?`)) {
        subjectCard.remove();
        alert(`\u041F\u0440\u0435\u0434\u043C\u0435\u0442 "${subjectName}" \u0443\u0434\u0430\u043B\u0435\u043D`);
      }
    });
  });
}
function initializeCharts3() {
  if (typeof Chart === "undefined") return;
  createStudentsDistributionChart();
  createCoursesDistributionChart();
}
function createStudentsDistributionChart() {
  const ctx = document.getElementById("studentsDistributionChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430", "\u0424\u0438\u0437\u0438\u043A\u0430", "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "\u0425\u0438\u043C\u0438\u044F", "\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439", "\u0418\u0441\u0442\u043E\u0440\u0438\u044F", "\u0411\u0438\u043E\u043B\u043E\u0433\u0438\u044F", "\u041B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430"],
      datasets: [{
        label: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432",
        data: [587, 421, 723, 312, 654, 398, 285, 376],
        backgroundColor: "rgba(74, 111, 165, 0.7)",
        borderColor: "rgba(74, 111, 165, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function createCoursesDistributionChart() {
  const ctx = document.getElementById("coursesDistributionChart");
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "pie",
    data: {
      labels: ["\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430", "\u0424\u0438\u0437\u0438\u043A\u0430", "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "\u0425\u0438\u043C\u0438\u044F", "\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439", "\u0418\u0441\u0442\u043E\u0440\u0438\u044F", "\u0414\u0440\u0443\u0433\u0438\u0435"],
      datasets: [{
        data: [24, 18, 32, 14, 28, 16, 32],
        backgroundColor: [
          "rgba(74, 111, 165, 0.7)",
          "rgba(46, 204, 113, 0.7)",
          "rgba(243, 156, 18, 0.7)",
          "rgba(52, 152, 219, 0.7)",
          "rgba(155, 89, 182, 0.7)",
          "rgba(231, 76, 60, 0.7)",
          "rgba(26, 188, 156, 0.7)"
        ],
        borderColor: [
          "rgba(74, 111, 165, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(243, 156, 18, 1)",
          "rgba(52, 152, 219, 1)",
          "rgba(155, 89, 182, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(26, 188, 156, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}
var init_subject_management = __esm({
  "static/js/pages/admin/subject-management.js"() {
  }
});

// static/js/pages/material-creation.js
function initMaterialCreation() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  const typeOptions = document.querySelectorAll(".type-option");
  const materialTypeInput = document.getElementById("material-type");
  const previewIcon = document.getElementById("preview-icon");
  const previewType = document.getElementById("preview-type");
  const fileTypeInfo = document.getElementById("file-type-info");
  const fileLabelText = document.getElementById("file-label-text");
  const fileUploadGroup = document.getElementById("file-upload-group");
  const linkInputGroup = document.getElementById("link-input-group");
  const materialUrl = document.getElementById("material-url");
  const urlPreview = document.getElementById("url-preview");
  const previewUrl = document.getElementById("preview-url");
  const previewLink = document.getElementById("preview-link");
  const previewLinkUrl = document.getElementById("preview-link-url");
  typeOptions.forEach((option) => {
    option.addEventListener("click", function() {
      typeOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      const type = this.getAttribute("data-type");
      materialTypeInput.value = type;
      updatePreviewByType(type);
      updateFileTypeInfo(type);
      toggleInputFields(type);
    });
  });
  function updatePreviewByType(type) {
    const typeNames = {
      "video": "\u0412\u0438\u0434\u0435\u043E",
      "document": "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442",
      "presentation": "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F",
      "code": "\u041A\u043E\u0434/\u041F\u0440\u0438\u043C\u0435\u0440\u044B",
      "task": "\u0417\u0430\u0434\u0430\u043D\u0438\u0435",
      "test": "\u0422\u0435\u0441\u0442",
      "link": "\u0421\u0441\u044B\u043B\u043A\u0430"
    };
    const typeIcons = {
      "video": "fas fa-play",
      "document": "far fa-file-pdf",
      "presentation": "far fa-file-powerpoint",
      "code": "fas fa-code",
      "task": "fas fa-tasks",
      "test": "fas fa-question-circle",
      "link": "fas fa-link"
    };
    const typeColors = {
      "video": "icon-video",
      "document": "icon-document",
      "presentation": "icon-presentation",
      "code": "icon-code",
      "task": "icon-task",
      "test": "icon-test",
      "link": "icon-link"
    };
    previewIcon.className = "preview-icon " + typeColors[type];
    previewIcon.innerHTML = `<i class="${typeIcons[type]}"></i>`;
    previewType.textContent = `\u0422\u0438\u043F: ${typeNames[type]}`;
    if (type === "link") {
      previewLink.style.display = "block";
    } else {
      previewLink.style.display = "none";
    }
  }
  function updateFileTypeInfo(type) {
    const fileInfo = {
      "video": "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F MP4, AVI, MOV, WebM (\u043C\u0430\u043A\u0441. 2GB)",
      "document": "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F PDF, DOC, DOCX, TXT (\u043C\u0430\u043A\u0441. 100MB)",
      "presentation": "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F PPT, PPTX, PDF (\u043C\u0430\u043A\u0441. 100MB)",
      "code": "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F ZIP, RAR, \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u043A\u043E\u0434\u0430 (\u043C\u0430\u043A\u0441. 50MB)",
      "task": "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F PDF, DOC, ZIP \u0441 \u0437\u0430\u0434\u0430\u043D\u0438\u044F\u043C\u0438 (\u043C\u0430\u043A\u0441. 50MB)",
      "test": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0442\u0435\u0441\u0442\u043E\u0432",
      "link": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 URL (\u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 http:// \u0438\u043B\u0438 https://)"
    };
    const fileLabels = {
      "video": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E\u0444\u0430\u0439\u043B",
      "document": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442",
      "presentation": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E",
      "code": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0430\u0440\u0445\u0438\u0432 \u0441 \u043A\u043E\u0434\u043E\u043C",
      "task": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0441 \u0437\u0430\u0434\u0430\u043D\u0438\u0435\u043C",
      "test": "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0442\u0435\u0441\u0442",
      "link": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B"
    };
    fileTypeInfo.textContent = fileInfo[type];
    fileLabelText.textContent = fileLabels[type];
  }
  function toggleInputFields(type) {
    if (type === "link") {
      fileUploadGroup.style.display = "none";
      linkInputGroup.classList.add("active");
      materialUrl.required = true;
      document.getElementById("material-file").required = false;
    } else if (type === "test") {
      fileUploadGroup.style.display = "none";
      linkInputGroup.classList.remove("active");
      document.getElementById("material-file").required = false;
      materialUrl.required = false;
    } else {
      fileUploadGroup.style.display = "block";
      linkInputGroup.classList.remove("active");
      document.getElementById("material-file").required = true;
      materialUrl.required = false;
    }
  }
  const titleInput = document.getElementById("material-title");
  const descInput = document.getElementById("material-desc");
  const durationInput = document.getElementById("material-duration");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const previewDuration = document.getElementById("preview-duration");
  titleInput.addEventListener("input", function() {
    previewTitle.textContent = this.value || "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430";
  });
  descInput.addEventListener("input", function() {
    previewDesc.textContent = this.value || "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
  });
  durationInput.addEventListener("input", function() {
    if (this.value) {
      previewDuration.textContent = `\u0412\u0440\u0435\u043C\u044F: ${this.value} \u043C\u0438\u043D.`;
    } else {
      previewDuration.textContent = "\u0412\u0440\u0435\u043C\u044F: -";
    }
  });
  materialUrl.addEventListener("input", function() {
    if (this.value) {
      previewUrl.href = this.value;
      previewUrl.textContent = this.value;
      urlPreview.classList.add("active");
      previewLinkUrl.href = this.value;
      previewLinkUrl.textContent = this.value;
    } else {
      urlPreview.classList.remove("active");
    }
  });
  const form = document.getElementById("material-form");
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const materialType = materialTypeInput.value;
    if (materialType === "link") {
      const url = materialUrl.value;
      if (!isValidUrl(url)) {
        alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 URL (\u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 http:// \u0438\u043B\u0438 https://)");
        materialUrl.focus();
        return;
      }
    }
    alert("\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D!");
    previewTitle.textContent = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430";
    previewDesc.textContent = "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
    previewDuration.textContent = "\u0412\u0440\u0435\u043C\u044F: -";
    urlPreview.classList.remove("active");
    previewLink.style.display = "none";
  });
  function isValidUrl(string) {
    try {
      new URL(string);
      return string.startsWith("http://") || string.startsWith("https://");
    } catch (_) {
      return false;
    }
  }
}
var init_material_creation = __esm({
  "static/js/pages/material-creation.js"() {
  }
});

// static/js/pages/material-browser.js
function initMaterialBrowser() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  const topicItems = document.querySelectorAll(".topic-item");
  const filterItems = document.querySelectorAll(".filter-item");
  const materialCards = document.querySelectorAll(".material-card");
  const materialsTitle = document.querySelector(".materials-title");
  const materialsDescription = document.querySelector(".materials-description");
  let currentTopic = "all";
  let currentType = "all";
  topicItems.forEach((item) => {
    item.addEventListener("click", function() {
      const topic = this.getAttribute("data-topic");
      topicItems.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      currentTopic = topic;
      filterMaterials();
      updateMaterialsHeader();
    });
  });
  filterItems.forEach((item) => {
    item.addEventListener("click", function() {
      const type = this.getAttribute("data-type");
      filterItems.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");
      currentType = type;
      filterMaterials();
      updateMaterialsHeader();
    });
  });
  function filterMaterials() {
    let visibleCount = 0;
    materialCards.forEach((card) => {
      const cardTopic = card.getAttribute("data-topic");
      const cardType = card.getAttribute("data-type");
      const topicMatch = currentTopic === "all" || cardTopic === currentTopic;
      const typeMatch = currentType === "all" || cardType === currentType;
      if (topicMatch && typeMatch) {
        card.style.display = "block";
        visibleCount++;
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
    const descriptionElement = document.querySelector(".materials-description");
    if (descriptionElement) {
      descriptionElement.textContent = `${visibleCount} \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u043F\u043E \u043E\u0441\u043D\u043E\u0432\u0430\u043C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F`;
    }
    const emptyState = document.querySelector(".empty-state");
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = "block";
      } else {
        emptyState.style.display = "none";
      }
    }
  }
  function updateMaterialsHeader() {
    const activeTopic = document.querySelector(".topic-item.active");
    let topicName = "\u0412\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B";
    if (activeTopic) {
      const topicSpan = activeTopic.querySelector("span");
      if (topicSpan) {
        topicName = topicSpan.textContent;
      }
    }
    if (materialsTitle) {
      materialsTitle.textContent = topicName;
    }
  }
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.toLowerCase();
      materialCards.forEach((card) => {
        const titleElement = card.querySelector("h3");
        const descriptionElement = card.querySelector(".material-description");
        if (titleElement && descriptionElement) {
          const title = titleElement.textContent.toLowerCase();
          const description = descriptionElement.textContent.toLowerCase();
          if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 100);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        }
      });
      updateMaterialCount();
    });
  }
  function updateMaterialCount() {
    const visibleCards = document.querySelectorAll('.material-card[style*="display: block"], .material-card:not([style*="display: none"])');
    const descriptionElement = document.querySelector(".materials-description");
    if (descriptionElement) {
      descriptionElement.textContent = `${visibleCards.length} \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u043F\u043E \u043E\u0441\u043D\u043E\u0432\u0430\u043C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F`;
    }
  }
  updateMaterialCount();
  materialCards.forEach((card) => {
    card.addEventListener("click", function(e) {
      if (!e.target.classList.contains("btn") && !e.target.closest(".btn")) {
        const link = this.querySelector("a.btn");
        if (link) {
          window.location.href = link.getAttribute("href");
        }
      }
    });
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });
    card.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
  const resetFiltersBtn = document.querySelector(".reset-filters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function() {
      topicItems.forEach((item) => {
        if (item.getAttribute("data-topic") === "all") {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      filterItems.forEach((item) => {
        if (item.getAttribute("data-type") === "all") {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      if (searchInput) {
        searchInput.value = "";
      }
      currentTopic = "all";
      currentType = "all";
      filterMaterials();
      updateMaterialsHeader();
    });
  }
}
var init_material_browser = __esm({
  "static/js/pages/material-browser.js"() {
  }
});

// static/js/pages/schedule-pages.js
function initSchedulePage() {
  const userName2 = "\u0415\u043B\u0435\u043D\u0430 \u041F\u043B\u0435\u0445\u0430\u043D\u043E\u0432\u0430";
  document.getElementById("userName").textContent = userName2;
  const nameParts = userName2.split(" ");
  const initials = nameParts.map((part) => part[0]).join("").toUpperCase();
  document.getElementById("userAvatar").textContent = initials;
  let currentDate2 = new Date(2024, 0, 10);
  let currentView2 = "month";
  let eventsStorage = {};
  const viewOptions = document.querySelectorAll(".view-option");
  viewOptions.forEach((option) => {
    option.addEventListener("click", function() {
      viewOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      currentView2 = this.getAttribute("data-view");
      switchView(currentView2);
    });
  });
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const currentDateElement = document.getElementById("currentDate");
  const modal = document.getElementById("eventModal");
  const closeModalBtn = document.getElementById("closeModal");
  const cancelEventBtn = document.getElementById("cancelEventBtn");
  const addEventBtn = document.getElementById("addEventBtn");
  const addEventBtnWeek = document.getElementById("addEventBtnWeek");
  const addEventBtnDay = document.getElementById("addEventBtnDay");
  const deleteEventBtn = document.getElementById("deleteEventBtn");
  const eventForm = document.getElementById("eventForm");
  const modalTitle = document.getElementById("modalTitle");
  let currentEventId = null;
  let isEditing = false;
  initScheduleExport();
  function updateDisplay() {
    if (currentView2 === "month") {
      const monthNames = [
        "\u042F\u043D\u0432\u0430\u0440\u044C",
        "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
        "\u041C\u0430\u0440\u0442",
        "\u0410\u043F\u0440\u0435\u043B\u044C",
        "\u041C\u0430\u0439",
        "\u0418\u044E\u043D\u044C",
        "\u0418\u044E\u043B\u044C",
        "\u0410\u0432\u0433\u0443\u0441\u0442",
        "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
        "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
        "\u041D\u043E\u044F\u0431\u0440\u044C",
        "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
      ];
      currentDateElement.textContent = `${monthNames[currentDate2.getMonth()]} ${currentDate2.getFullYear()}`;
    } else if (currentView2 === "week") {
      const weekStart = new Date(currentDate2);
      weekStart.setDate(currentDate2.getDate() - currentDate2.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      const monthNames = [
        "\u044F\u043D\u0432",
        "\u0444\u0435\u0432",
        "\u043C\u0430\u0440",
        "\u0430\u043F\u0440",
        "\u043C\u0430\u044F",
        "\u0438\u044E\u043D",
        "\u0438\u044E\u043B",
        "\u0430\u0432\u0433",
        "\u0441\u0435\u043D",
        "\u043E\u043A\u0442",
        "\u043D\u043E\u044F",
        "\u0434\u0435\u043A"
      ];
      currentDateElement.textContent = `${weekStart.getDate()} ${monthNames[weekStart.getMonth()]} - ${weekEnd.getDate()} ${monthNames[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`;
    } else if (currentView2 === "day") {
      const monthNames = [
        "\u044F\u043D\u0432\u0430\u0440\u044F",
        "\u0444\u0435\u0432\u0440\u0430\u043B\u044F",
        "\u043C\u0430\u0440\u0442\u0430",
        "\u0430\u043F\u0440\u0435\u043B\u044F",
        "\u043C\u0430\u044F",
        "\u0438\u044E\u043D\u044F",
        "\u0438\u044E\u043B\u044F",
        "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
        "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F",
        "\u043E\u043A\u0442\u044F\u0431\u0440\u044F",
        "\u043D\u043E\u044F\u0431\u0440\u044F",
        "\u0434\u0435\u043A\u0430\u0431\u0440\u044F"
      ];
      const dayNames = ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"];
      currentDateElement.textContent = `${dayNames[currentDate2.getDay()]}, ${currentDate2.getDate()} ${monthNames[currentDate2.getMonth()]} ${currentDate2.getFullYear()}`;
    }
    updateMonthView();
    updateWeekView();
    updateDayView();
    updateUpcomingEvents();
    updateTodaySchedule();
  }
  function switchView(view) {
    document.querySelector(".month-view").style.display = "none";
    document.querySelector(".week-view").style.display = "none";
    document.querySelector(".day-view").style.display = "none";
    document.querySelector(`.${view}-view`).style.display = "block";
    updateDisplay();
  }
  initializeSampleEvents();
  updateDisplay();
  switchView("month");
}
function initScheduleCreatePage() {
  const userName2 = "\u0415\u043B\u0435\u043D\u0430 \u041F\u043B\u0435\u0445\u0430\u043D\u043E\u0432\u0430";
  document.getElementById("userName").textContent = userName2;
  const nameParts = userName2.split(" ");
  const initials = nameParts.map((part) => part[0]).join("").toUpperCase();
  document.getElementById("userAvatar").textContent = initials;
  const today = /* @__PURE__ */ new Date();
  const formattedDate = today.toISOString().split("T")[0];
  document.getElementById("lessonDate").value = formattedDate;
  const nextHour = today.getHours() + 1;
  document.getElementById("lessonTime").value = `${nextHour.toString().padStart(2, "0")}:00`;
  const colorOptions = document.querySelectorAll(".color-option");
  let selectedColor = "#4A6FA5";
  colorOptions.forEach((option) => {
    option.addEventListener("click", function() {
      colorOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      selectedColor = this.getAttribute("data-color");
      updatePreview2();
    });
  });
  const repeatOptions = document.querySelectorAll(".repeat-option");
  const weeklyOptions = document.getElementById("weeklyOptions");
  repeatOptions.forEach((option) => {
    option.addEventListener("click", function() {
      repeatOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      if (this.getAttribute("data-repeat") === "weekly") {
        weeklyOptions.style.display = "block";
      } else {
        weeklyOptions.style.display = "none";
      }
    });
  });
  const dayOptions = document.querySelectorAll(".day-option");
  dayOptions.forEach((option) => {
    option.addEventListener("click", function() {
      this.classList.toggle("selected");
    });
  });
  const templateCards = document.querySelectorAll(".template-card");
  templateCards.forEach((card) => {
    card.addEventListener("click", function() {
      const template = this.getAttribute("data-template");
      applyTemplate(template);
    });
  });
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  saveBtn.addEventListener("click", function() {
    if (validateForm4()) {
      alert("\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u043E!");
      window.location.href = "/frontend/templates/journal/schedule.html";
    }
  });
  cancelBtn.addEventListener("click", function() {
    if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F? \u0412\u0441\u0435 \u043D\u0435\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B.")) {
      window.location.href = "/frontend/templates/journal/schedule.html";
    }
  });
  function validateForm4() {
    const title = document.getElementById("lessonTitle").value;
    const subject = document.getElementById("subjectSelect").value;
    const classSelect = document.getElementById("classSelect").value;
    const date = document.getElementById("lessonDate").value;
    const time = document.getElementById("lessonTime").value;
    if (!title) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u044F");
      return false;
    }
    if (!subject) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442");
      return false;
    }
    if (!classSelect) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043B\u0430\u0441\u0441");
      return false;
    }
    if (!date) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0437\u0430\u043D\u044F\u0442\u0438\u044F");
      return false;
    }
    if (!time) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0435\u043C\u044F \u0437\u0430\u043D\u044F\u0442\u0438\u044F");
      return false;
    }
    return true;
  }
  function applyTemplate(template) {
    let duration, description;
    switch (template) {
      case "standard":
        duration = "45";
        description = "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u043E\u0435 45-\u043C\u0438\u043D\u0443\u0442\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u0441 15-\u043C\u0438\u043D\u0443\u0442\u043D\u044B\u043C \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u043E\u043C \u043C\u0435\u0436\u0434\u0443 \u0443\u0440\u043E\u043A\u0430\u043C\u0438.";
        break;
      case "block":
        duration = "90";
        description = "\u0411\u043B\u043E\u0447\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C\u044E 90 \u043C\u0438\u043D\u0443\u0442 \u0441 30-\u043C\u0438\u043D\u0443\u0442\u043D\u044B\u043C \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u043E\u043C \u043F\u043E\u0441\u043B\u0435.";
        break;
      case "intensive":
        duration = "120";
        description = "\u0418\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u043E\u0435 \u0441\u0434\u0432\u043E\u0435\u043D\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C\u044E 2 \u0447\u0430\u0441\u0430.";
        break;
      case "custom":
        alert("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0432\u0440\u0443\u0447\u043D\u0443\u044E");
        return;
    }
    document.getElementById("durationSelect").value = duration;
    document.getElementById("lessonDescription").value = description;
    updatePreview2();
  }
  function updatePreview2() {
    console.log("Preview updated with color:", selectedColor);
  }
  const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea");
  formInputs.forEach((input) => {
    input.addEventListener("input", updatePreview2);
    input.addEventListener("change", updatePreview2);
  });
}
function initScheduleExport() {
  console.log("Schedule export initialized");
}
function initializeSampleEvents() {
  console.log("Sample events initialized");
}
function updateMonthView() {
  console.log("Month view updated");
}
function updateWeekView() {
  console.log("Week view updated");
}
function updateDayView() {
  console.log("Day view updated");
}
function updateUpcomingEvents() {
  console.log("Upcoming events updated");
}
function updateTodaySchedule() {
  console.log("Today schedule updated");
}
var init_schedule_pages = __esm({
  "static/js/pages/schedule-pages.js"() {
  }
});

// static/js/modules/chat.js
function initChat() {
  const sendButton = document.getElementById("sendButton");
  const messageInput = document.getElementById("messageInput");
  if (!sendButton || !messageInput) return;
  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  messageInput.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
  scrollToBottom();
}
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const messageText = messageInput.value.trim();
  if (messageText === "") return;
  addMessage(messageText, "user");
  messageInput.value = "";
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    const response = generateResponse(messageText);
    addMessage(response, "anastasia");
    scrollToBottom();
  }, 1500);
}
function addMessage(text, sender) {
  const chatMessages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  const now = /* @__PURE__ */ new Date();
  const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  if (sender === "anastasia") {
    messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="/frontend/static/assets/image/logo/Anastasia.svg" alt="\u0410\u043D\u0430\u0441\u0442\u0430\u0441\u0438\u044F">
            </div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
  } else {
    messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${timeString}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
  }
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}
function showTypingIndicator() {
  const chatMessages = document.getElementById("chatMessages");
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.id = "typingIndicator";
  typingDiv.innerHTML = `
        <div class="message-avatar">
            <img src="/frontend/static/assets/image/logo/Anastasia.svg" alt="\u0410\u043D\u0430\u0441\u0442\u0430\u0441\u0438\u044F">
        </div>
        <div class="message-content">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typingIndicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}
function scrollToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
function generateResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes("\u043F\u0440\u0438\u0432\u0435\u0442") || lowerMessage.includes("\u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439")) {
    return "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0420\u0430\u0434\u0430 \u0441\u043D\u043E\u0432\u0430 \u0432\u0430\u0441 \u0432\u0438\u0434\u0435\u0442\u044C. \u0427\u0435\u043C \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?";
  } else if (lowerMessage.includes("\u0442\u0435\u0441\u0442") || lowerMessage.includes("\u0432\u043E\u043F\u0440\u043E\u0441")) {
    return "\u042F \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C \u0432\u0430\u043C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u0435\u0441\u0442 \u043F\u043E \u043D\u0443\u0436\u043D\u043E\u0439 \u0442\u0435\u043C\u0435. \u041A\u0430\u043A\u0438\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u044B \u0432\u044B \u0445\u043E\u0442\u0435\u043B\u0438 \u0431\u044B \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C?";
  } else if (lowerMessage.includes("\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C") || lowerMessage.includes("\u0440\u0430\u0431\u043E\u0442\u0430")) {
    return "\u0414\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0440\u0430\u0431\u043E\u0442\u044B, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0441 \u0437\u0430\u0434\u0430\u043D\u0438\u0435\u043C, \u0438 \u044F \u043F\u0440\u043E\u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u044E \u0435\u0433\u043E.";
  } else if (lowerMessage.includes("python") || lowerMessage.includes("\u043F\u0438\u0442\u043E\u043D")) {
    return "Python - \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440! \u042D\u0442\u043E \u043C\u043E\u0449\u043D\u044B\u0439 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u044F\u0437\u044B\u043A \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F. \u041F\u043E \u043A\u0430\u043A\u043E\u0439 \u0442\u0435\u043C\u0435 \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u0430 \u043F\u043E\u043C\u043E\u0449\u044C?";
  } else if (lowerMessage.includes("\u0441\u043F\u0430\u0441\u0438\u0431\u043E")) {
    return "\u0412\u0441\u0435\u0433\u0434\u0430 \u0440\u0430\u0434\u0430 \u043F\u043E\u043C\u043E\u0447\u044C! \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u0435\u0449\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B, \u043E\u0431\u0440\u0430\u0449\u0430\u0439\u0442\u0435\u0441\u044C.";
  } else {
    return "\u042F \u043F\u043E\u043D\u044F\u043B\u0430 \u0432\u0430\u0448 \u0432\u043E\u043F\u0440\u043E\u0441. \u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043E\u0431\u0441\u0443\u0434\u0438\u043C \u044D\u0442\u043E \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435. \u041C\u043E\u0436\u0435\u0442\u0435 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C, \u0447\u0442\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u0432\u0430\u0441 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442?";
  }
}
function quickAction(action) {
  let message = "";
  switch (action) {
    case "variables":
      message = "\u0425\u043E\u0447\u0443 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u0435\u0441\u0442 \u043F\u043E \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u043C \u0438 \u0442\u0438\u043F\u0430\u043C \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 Python.";
      break;
    case "syntax":
      message = "\u041D\u0443\u0436\u0435\u043D \u0442\u0435\u0441\u0442 \u043F\u043E \u0431\u0430\u0437\u043E\u0432\u043E\u043C\u0443 \u0441\u0438\u043D\u0442\u0430\u043A\u0441\u0438\u0441\u0443 Python.";
      break;
    case "functions":
      message = "\u0418\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442 \u0442\u0435\u0441\u0442 \u043F\u043E \u0444\u0443\u043D\u043A\u0446\u0438\u044F\u043C \u0432 Python.";
      break;
    case "all":
      message = "\u0421\u043E\u0437\u0434\u0430\u0439 \u0442\u0435\u0441\u0442 \u043F\u043E \u0432\u0441\u0435\u043C \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u043C \u0442\u0435\u043C\u0430\u043C Python \u0434\u043B\u044F \u043D\u0430\u0447\u0438\u043D\u0430\u044E\u0449\u0438\u0445.";
      break;
    case "preview":
      message = "\u0414\u0430, \u0445\u043E\u0447\u0443 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0442\u0435\u0441\u0442\u0430 \u043F\u0435\u0440\u0435\u0434 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u043C.";
      break;
    case "save":
      message = "\u0421\u043E\u0445\u0440\u0430\u043D\u0438 \u0442\u0435\u0441\u0442, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430.";
      break;
    case "modify":
      message = "\u0425\u043E\u0447\u0443 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0442\u0435\u0441\u0442\u0430.";
      break;
    default:
      message = "\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u0431\u044B\u0441\u0442\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435: " + action;
  }
  addMessage(message, "user");
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    const response = generateQuickActionResponse(action);
    addMessage(response, "anastasia");
    scrollToBottom();
  }, 1500);
}
function generateQuickActionResponse(action) {
  switch (action) {
    case "variables":
      return "\u041E\u0442\u043B\u0438\u0447\u043D\u043E! \u0421\u043E\u0437\u0434\u0430\u043C \u0442\u0435\u0441\u0442 \u043F\u043E \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u043C \u0438 \u0442\u0438\u043F\u0430\u043C \u0434\u0430\u043D\u043D\u044B\u0445. \u0412\u043A\u043B\u044E\u0447\u0443 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043D\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0442\u0438\u043F\u043E\u0432, \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0442\u0438\u043F\u043E\u0432 \u0438 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445. \u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0443\u0436\u043D\u043E?";
    case "syntax":
      return "\u0425\u043E\u0440\u043E\u0448\u043E! \u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043B\u044E \u0442\u0435\u0441\u0442 \u043F\u043E \u0431\u0430\u0437\u043E\u0432\u043E\u043C\u0443 \u0441\u0438\u043D\u0442\u0430\u043A\u0441\u0438\u0441\u0443 Python: \u043E\u0442\u0441\u0442\u0443\u043F\u044B, \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438, \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438. \u041A\u0430\u043A\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u0435\u043D?";
    case "functions":
      return "\u041E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440! \u0424\u0443\u043D\u043A\u0446\u0438\u0438 - \u0432\u0430\u0436\u043D\u0430\u044F \u0442\u0435\u043C\u0430. \u0412\u043A\u043B\u044E\u0447\u0443 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043D\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0439, \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0438 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438.";
    case "all":
      return "\u0421\u043E\u0437\u0434\u0430\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u044B\u0439 \u0442\u0435\u0441\u0442 \u043F\u043E \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u043C \u0442\u0435\u043C\u0430\u043C Python \u0434\u043B\u044F \u043D\u0430\u0447\u0438\u043D\u0430\u044E\u0449\u0438\u0445. \u0412\u043A\u043B\u044E\u0447\u0443 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043F\u043E \u0441\u0438\u043D\u0442\u0430\u043A\u0441\u0438\u0441\u0443, \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u043C, \u0442\u0438\u043F\u0430\u043C \u0434\u0430\u043D\u043D\u044B\u0445, \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430\u043C, \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C, \u0446\u0438\u043A\u043B\u0430\u043C \u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u044F\u043C.";
    case "preview":
      return "\u0412\u043E\u0442 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0442\u0435\u0441\u0442\u0430:\n\n1. \u041A\u0430\u043A\u043E\u0439 \u0442\u0438\u043F \u0434\u0430\u043D\u043D\u044B\u0445 \u0443 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F 3.14?\n2. \u041A\u0430\u043A \u043E\u0431\u044A\u044F\u0432\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0443\u044E \u0432 Python?\n3. \u0427\u0442\u043E \u0432\u044B\u0432\u0435\u0434\u0435\u0442 print(2 + 3 * 4)?\n\n\u0425\u043E\u0442\u0438\u0442\u0435 \u0447\u0442\u043E-\u0442\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C?";
    case "save":
      return '\u0422\u0435\u0441\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D! \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0439\u0442\u0438 \u0435\u0433\u043E \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 "\u041C\u043E\u0438 \u0442\u0435\u0441\u0442\u044B". \u0425\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u0438\u043C \u0441\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C\u0438 \u0441\u0435\u0439\u0447\u0430\u0441?';
    case "modify":
      return "\u041A\u0430\u043A\u0438\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C? \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432, \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0438\u043B\u0438 \u0442\u0435\u043C\u044B?";
    default:
      return "\u042F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0430 \u0432\u0430\u0448\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435. \u0427\u0435\u043C \u0435\u0449\u0435 \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?";
  }
}
var init_chat = __esm({
  "static/js/modules/chat.js"() {
  }
});

// static/js/pages/dashboard.js
function initDashboard() {
  const createClassBtn = document.getElementById("createClassBtn");
  const createClassModal = document.getElementById("createClassModal");
  const closeModal = document.getElementById("closeModal");
  const cancelCreate = document.getElementById("cancelCreate");
  const saveClass = document.getElementById("saveClass");
  createClassBtn.addEventListener("click", function() {
    createClassModal.classList.add("active");
  });
  function closeCreateModal() {
    createClassModal.classList.remove("active");
  }
  closeModal.addEventListener("click", closeCreateModal);
  cancelCreate.addEventListener("click", closeCreateModal);
  saveClass.addEventListener("click", function() {
    const className = document.getElementById("className").value;
    const classGrade = document.getElementById("classGrade").value;
    const classDescription = document.getElementById("classDescription").value;
    if (!className) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043B\u0430\u0441\u0441\u0430");
      return;
    }
    console.log(`Creating class: ${className}, ${classGrade}, ${classDescription}`);
    alert(`\u041A\u043B\u0430\u0441\u0441 "${className}" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D!`);
    closeCreateModal();
    document.getElementById("className").value = "";
    document.getElementById("classDescription").value = "";
  });
  const searchInput = document.querySelector(".search-box input");
  searchInput.addEventListener("input", function() {
    const searchTerm = this.value.toLowerCase();
    const classCards = document.querySelectorAll(".class-card");
    classCards.forEach((card) => {
      const className = card.querySelector(".class-info h3").textContent.toLowerCase();
      if (className.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
  const actionButtons = document.querySelectorAll(".action-btn");
  actionButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const classCard = this.closest(".class-card");
      const className = classCard.querySelector(".class-info h3").textContent;
      if (this.querySelector(".fa-edit")) {
        alert(`\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043B\u0430\u0441\u0441\u0430: ${className}`);
      } else if (this.querySelector(".fa-cog")) {
        alert(`\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043B\u0430\u0441\u0441\u0430: ${className}`);
      }
    });
  });
  const gradeModal = document.getElementById("gradeModal");
  const gradeCloseModal = document.getElementById("closeModal");
  const cancelGrade = document.getElementById("cancelGrade");
  const saveGrade = document.getElementById("saveGrade");
  const gradeOptions = document.querySelectorAll(".grade-option");
  const gradeCells = document.querySelectorAll(".grade-value");
  const bulkActions = document.querySelectorAll(".bulk-action");
  let currentStudent = null;
  let currentTask = null;
  let selectedGrade = null;
  gradeCells.forEach((cell) => {
    cell.addEventListener("click", function() {
      const studentId = this.getAttribute("data-student");
      const task = this.getAttribute("data-task");
      const studentName = getStudentName2(studentId);
      const taskName = getTaskName(task);
      document.getElementById("studentTaskInfo").textContent = `\u0421\u0442\u0443\u0434\u0435\u043D\u0442: ${studentName} \u2022 \u0417\u0430\u0434\u0430\u043D\u0438\u0435: ${taskName}`;
      currentStudent = studentId;
      currentTask = task;
      const currentGrade = this.querySelector(".grade-badge").textContent;
      selectedGrade = currentGrade;
      gradeOptions.forEach((option) => {
        if (option.getAttribute("data-grade") === selectedGrade) {
          option.classList.add("selected");
        }
      });
      gradeModal.classList.add("active");
    });
  });
  function closeGradeModal() {
    gradeModal.classList.remove("active");
    selectedGrade = null;
    gradeOptions.forEach((option) => {
      option.classList.remove("selected");
    });
    document.getElementById("gradeComment").value = "";
  }
  gradeCloseModal.addEventListener("click", closeGradeModal);
  cancelGrade.addEventListener("click", closeGradeModal);
  gradeOptions.forEach((option) => {
    option.addEventListener("click", function() {
      gradeOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      selectedGrade = this.getAttribute("data-grade");
    });
  });
  saveGrade.addEventListener("click", function() {
    if (selectedGrade !== null) {
      const comment = document.getElementById("gradeComment").value;
      console.log(`Saving grade ${selectedGrade} for student ${currentStudent}, task ${currentTask}, comment: ${comment}`);
      const targetCell = document.querySelector(`.grade-value[data-student="${currentStudent}"][data-task="${currentTask}"]`);
      const gradeBadge = targetCell.querySelector(".grade-badge");
      gradeBadge.textContent = selectedGrade;
      gradeBadge.className = "grade-badge";
      if (selectedGrade === "5") {
        gradeBadge.classList.add("grade-excellent");
      } else if (selectedGrade === "4") {
        gradeBadge.classList.add("grade-good");
      } else if (selectedGrade === "3") {
        gradeBadge.classList.add("grade-average");
      } else {
        gradeBadge.classList.add("grade-poor");
      }
      updateStudentAverage(currentStudent);
      closeGradeModal();
    } else {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443");
    }
  });
  bulkActions.forEach((action) => {
    action.addEventListener("click", function() {
      const actionId = this.id;
      if (actionId === "addTask") {
        alert("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u0437\u0430\u0434\u0430\u043D\u0438\u044F");
      } else if (actionId === "importGrades") {
        alert("\u0418\u043C\u043F\u043E\u0440\u0442 \u043E\u0446\u0435\u043D\u043E\u043A \u0438\u0437 \u0444\u0430\u0439\u043B\u0430");
      } else if (actionId === "exportGrades") {
        alert("\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043E\u0446\u0435\u043D\u043E\u043A \u0432 Excel");
      } else if (actionId === "generateReport") {
        alert("\u041E\u0442\u0447\u0435\u0442 \u043E\u0431 \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u0438 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D");
      }
    });
  });
  const prevBtn = document.querySelector(".term-navigation .nav-btn:first-child");
  const nextBtn = document.querySelector(".term-navigation .nav-btn:last-child");
  const currentTermElement = document.querySelector(".current-term");
  const terms = ["I \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C", "II \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C", "III \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C", "IV \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C"];
  let currentTermIndex = 0;
  function updateTerm() {
    currentTermElement.textContent = terms[currentTermIndex];
  }
  prevBtn.addEventListener("click", function() {
    currentTermIndex--;
    if (currentTermIndex < 0) {
      currentTermIndex = terms.length - 1;
    }
    updateTerm();
  });
  nextBtn.addEventListener("click", function() {
    currentTermIndex++;
    if (currentTermIndex >= terms.length) {
      currentTermIndex = 0;
    }
    updateTerm();
  });
  function getStudentName2(studentId) {
    const students = {
      "1": "\u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432",
      "2": "\u041C\u0430\u0440\u0438\u044F \u041F\u0435\u0442\u0440\u043E\u0432\u0430",
      "3": "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0421\u0438\u0434\u043E\u0440\u043E\u0432",
      "4": "\u0415\u043B\u0435\u043D\u0430 \u041D\u043E\u0432\u0438\u043A\u043E\u0432\u0430",
      "5": "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u041A\u043E\u0437\u043B\u043E\u0432"
    };
    return students[studentId] || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0441\u0442\u0443\u0434\u0435\u043D\u0442";
  }
  function getTaskName(taskId) {
    const tasks = {
      "hw1": "\u0414\u0417 \u21161",
      "test1": "\u0422\u0435\u0441\u0442 \u21161",
      "project": "\u041F\u0440\u043E\u0435\u043A\u0442",
      "hw2": "\u0414\u0417 \u21162",
      "test2": "\u0422\u0435\u0441\u0442 \u21162"
    };
    return tasks[taskId] || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u0435";
  }
  function updateStudentAverage(studentId) {
    const studentCells = document.querySelectorAll(`.grade-value[data-student="${studentId}"]`);
    let sum = 0;
    let count = 0;
    studentCells.forEach((cell) => {
      const grade = parseInt(cell.querySelector(".grade-badge").textContent);
      if (!isNaN(grade)) {
        sum += grade;
        count++;
      }
    });
    if (count > 0) {
      const average = (sum / count).toFixed(1);
      const averageCell = document.querySelector(`tr[data-student="${studentId}"] td:nth-child(7) .grade-badge`);
      if (averageCell) {
        averageCell.textContent = average;
        averageCell.className = "grade-badge";
        if (average >= 4.5) {
          averageCell.classList.add("grade-excellent");
        } else if (average >= 3.5) {
          averageCell.classList.add("grade-good");
        } else if (average >= 2.5) {
          averageCell.classList.add("grade-average");
        } else {
          averageCell.classList.add("grade-poor");
        }
      }
    }
  }
}
var init_dashboard = __esm({
  "static/js/pages/dashboard.js"() {
  }
});

// static/js/lib/utils.js
var Utils;
var init_utils = __esm({
  "static/js/lib/utils.js"() {
    Utils = class {
      static isMobile() {
        return window.innerWidth <= 992;
      }
      static formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
      }
      static getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
      }
      static formatFileSize(bytes) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      }
      static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }
      static validatePassword(password) {
        return password.length >= 8;
      }
      static showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.remove();
        }, 5e3);
      }
      static formatPhone(phone) {
        return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5");
      }
      static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }
    };
  }
});

// static/js/modules/modal-manager.js
var ModalManager, modalManager;
var init_modal_manager = __esm({
  "static/js/modules/modal-manager.js"() {
    ModalManager = class {
      constructor() {
        this.modals = /* @__PURE__ */ new Map();
        this.init();
      }
      init() {
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("modal-overlay")) {
            this.hide(e.target.id);
          }
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            this.hideAll();
          }
        });
      }
      register(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
          console.warn(`Modal with id ${modalId} not found`);
          return false;
        }
        this.modals.set(modalId, {
          element: modal,
          options
        });
        const closeButtons = modal.querySelectorAll("[data-modal-close]");
        closeButtons.forEach((btn) => {
          btn.addEventListener("click", () => this.hide(modalId));
        });
        return true;
      }
      show(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) {
          console.error(`Modal ${modalId} not registered`);
          return false;
        }
        const modal = modalData.element;
        modal.style.display = "flex";
        setTimeout(() => {
          modal.classList.add("active");
        }, 10);
        document.body.style.overflow = "hidden";
        return true;
      }
      hide(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) return false;
        const modal = modalData.element;
        modal.classList.remove("active");
        setTimeout(() => {
          modal.style.display = "none";
          document.body.style.overflow = "";
        }, 300);
        return true;
      }
      hideAll() {
        this.modals.forEach((modalData, modalId) => {
          this.hide(modalId);
        });
      }
      // Динамическое создание модального окна
      createModal(modalId, content, options = {}) {
        if (this.modals.has(modalId)) {
          console.warn(`Modal ${modalId} already exists`);
          return false;
        }
        const modal = document.createElement("div");
        modal.id = modalId;
        modal.className = "modal-overlay";
        modal.innerHTML = content;
        document.body.appendChild(modal);
        return this.register(modalId, options);
      }
    };
    modalManager = new ModalManager();
  }
});

// static/js/modules/course-students.js
var CourseStudentsManager;
var init_course_students = __esm({
  "static/js/modules/course-students.js"() {
    init_modal_manager();
    CourseStudentsManager = class {
      constructor() {
        this.availableStudents = [
          { id: 1, name: "\u0410\u043D\u043D\u0430 \u041A\u043E\u0437\u043B\u043E\u0432\u0430", email: "anna.koz@example.com", group: "10-\u0410", initials: "\u0410\u041A" },
          { id: 2, name: "\u0421\u0435\u0440\u0433\u0435\u0439 \u0412\u043E\u043B\u043A\u043E\u0432", email: "s.volkov@example.com", group: "10-\u0411", initials: "\u0421\u0412" },
          { id: 3, name: "\u041E\u043B\u044C\u0433\u0430 \u041C\u043E\u0440\u043E\u0437\u043E\u0432\u0430", email: "olga.moroz@example.com", group: "11-\u0410", initials: "\u041E\u041C" },
          { id: 4, name: "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u0421\u043E\u043A\u043E\u043B\u043E\u0432", email: "d.sokolov@example.com", group: "10-\u0410", initials: "\u0414\u0421" },
          { id: 5, name: "\u0418\u0440\u0438\u043D\u0430 \u041F\u0430\u0432\u043B\u043E\u0432\u0430", email: "i.pavlova@example.com", group: "11-\u0411", initials: "\u0418\u041F" },
          { id: 6, name: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u041B\u0435\u0431\u0435\u0434\u0435\u0432", email: "a.lebedev@example.com", group: "10-\u0411", initials: "\u0410\u041B" },
          { id: 7, name: "\u041D\u0430\u0442\u0430\u043B\u044C\u044F \u0412\u043E\u0440\u043E\u0431\u044C\u0435\u0432\u0430", email: "n.vorob@example.com", group: "11-\u0410", initials: "\u041D\u0412" },
          { id: 8, name: "\u041C\u0438\u0445\u0430\u0438\u043B \u041E\u0440\u043B\u043E\u0432", email: "m.orlov@example.com", group: "10-\u0410", initials: "\u041C\u041E" }
        ];
        this.currentStudents = [
          { id: 101, name: "\u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432", email: "ivan.ivanov@example.com", group: "10-\u0410", initials: "\u0418\u0418", progress: 92, grade: 4.9, lastActivity: "2 \u0447\u0430\u0441\u0430 \u043D\u0430\u0437\u0430\u0434" },
          { id: 102, name: "\u041C\u0430\u0440\u0438\u044F \u041F\u0435\u0442\u0440\u043E\u0432\u0430", email: "maria.petrova@example.com", group: "10-\u0411", initials: "\u041C\u041F", progress: 78, grade: 4.5, lastActivity: "\u0412\u0447\u0435\u0440\u0430" },
          { id: 103, name: "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0421\u0438\u0434\u043E\u0440\u043E\u0432", email: "alex.sidorov@example.com", group: "11-\u0410", initials: "\u0410\u0421", progress: 65, grade: 4.2, lastActivity: "3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434" },
          { id: 104, name: "\u0415\u043B\u0435\u043D\u0430 \u041D\u043E\u0432\u0438\u043A\u043E\u0432\u0430", email: "elena.novikova@example.com", group: "10-\u0410", initials: "\u0415\u041D", progress: 45, grade: 3.8, lastActivity: "\u041D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434" }
        ];
        this.init();
      }
      init() {
        this.registerModals();
        this.initEventHandlers();
        this.renderStudentsList();
        this.updateStudentsTable();
        console.log("CourseStudentsManager initialized");
      }
      registerModals() {
        if (!modalManager.register("addStudentModal")) {
          console.warn("Add student modal not found, creating dynamically...");
          this.createStudentModal();
        }
      }
      createStudentModal() {
        const modalContent = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432 \u0432 \u043A\u0443\u0440\u0441</h3>
                    <button type="button" class="modal-close" data-modal-close>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="studentSearch" class="form-label">\u041F\u043E\u0438\u0441\u043A \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432</label>
                        <input type="text" id="studentSearch" class="form-control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F, email \u0438\u043B\u0438 \u0433\u0440\u0443\u043F\u043F\u0443...">
                    </div>
                    
                    <div class="students-list-container">
                        <h4>\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u044B</h4>
                        <div id="studentsList" class="students-list">
                            <!-- \u0421\u043F\u0438\u0441\u043E\u043A \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u0437\u0434\u0435\u0441\u044C -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-modal-close>\u041E\u0442\u043C\u0435\u043D\u0430</button>
                    <button type="button" class="btn btn-success" id="confirmStudentModal">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445</button>
                </div>
            </div>
        `;
        modalManager.createModal("addStudentModal", modalContent);
      }
      initEventHandlers() {
        document.addEventListener("click", (e) => {
          if (e.target.closest("#addStudentBtn")) {
            this.openAddStudentModal();
          }
          if (e.target.closest("#confirmStudentModal")) {
            this.confirmAddStudents();
          }
        });
        document.addEventListener("input", (e) => {
          if (e.target.id === "studentSearch") {
            this.filterStudents(e.target.value);
          }
        });
      }
      openAddStudentModal() {
        console.log("Opening student modal");
        this.renderStudentsList();
        modalManager.show("addStudentModal");
      }
      confirmAddStudents() {
        const selectedStudents = [];
        const checkboxes = document.querySelectorAll("#studentsList .student-checkbox:checked");
        checkboxes.forEach((checkbox) => {
          const studentId = parseInt(checkbox.dataset.id);
          const student = this.availableStudents.find((s) => s.id === studentId);
          if (student) {
            selectedStudents.push(student);
          }
        });
        if (selectedStudents.length === 0) {
          this.showNotification("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u043E\u0433\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430", "error");
          return;
        }
        selectedStudents.forEach((student) => {
          if (!this.currentStudents.some((s) => s.id === student.id)) {
            this.currentStudents.push({
              ...student,
              progress: 0,
              grade: 0,
              lastActivity: "\u0415\u0449\u0435 \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D"
            });
          }
        });
        this.updateStudentsTable();
        modalManager.hide("addStudentModal");
        this.showNotification(`\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ${selectedStudents.length} \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432`);
      }
      filterStudents(searchTerm = "") {
        this.renderStudentsList(searchTerm);
      }
      renderStudentsList(searchTerm = "") {
        const studentsList = document.getElementById("studentsList");
        if (!studentsList) return;
        const filteredStudents = this.availableStudents.filter(
          (student) => !this.currentStudents.some((current) => current.id === student.id) && (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase()) || student.group.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        studentsList.innerHTML = "";
        if (filteredStudents.length === 0) {
          studentsList.innerHTML = '<div class="no-students">\u041D\u0435\u0442 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432 \u0434\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F</div>';
          return;
        }
        filteredStudents.forEach((student) => {
          const studentItem = document.createElement("div");
          studentItem.className = "student-item";
          studentItem.innerHTML = `
                <input type="checkbox" class="student-checkbox" data-id="${student.id}">
                <div class="student-avatar-small">${student.initials}</div>
                <div class="student-info">
                    <div class="student-name">${student.name}</div>
                    <div class="student-email">${student.email}</div>
                </div>
                <div class="student-group">${student.group}</div>
            `;
          studentsList.appendChild(studentItem);
        });
      }
      updateStudentsTable() {
        const tableBody = document.querySelector(".students-table tbody");
        if (!tableBody) return;
        tableBody.innerHTML = "";
        this.currentStudents.forEach((student) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="student-avatar">${student.initials}</div>
                        <div>${student.name}</div>
                    </div>
                </td>
                <td class="progress-cell">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${student.progress}%"></div>
                    </div>
                    <span>${student.progress}%</span>
                </td>
                <td>${student.grade}</td>
                <td>${student.lastActivity}</td>
                <td>
                    <button class="action-btn" data-action="email"><i class="fas fa-envelope"></i></button>
                    <button class="action-btn" data-action="stats"><i class="fas fa-chart-line"></i></button>
                </td>
            `;
          tableBody.appendChild(row);
        });
        this.updateStudentCount();
        this.initActionButtons();
      }
      updateStudentCount() {
        const studentCountElement = document.querySelector(".management-card:nth-child(2) h3");
        if (studentCountElement) {
          studentCountElement.textContent = this.currentStudents.length;
        }
      }
      initActionButtons() {
        document.querySelectorAll('.action-btn[data-action="email"]').forEach((button) => {
          button.addEventListener("click", (e) => {
            e.stopPropagation();
            const studentName = button.closest("tr").querySelector(".student-name").textContent;
            this.showNotification(`\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0443 ${studentName}`);
          });
        });
        document.querySelectorAll('.action-btn[data-action="stats"]').forEach((button) => {
          button.addEventListener("click", (e) => {
            e.stopPropagation();
            const studentName = button.closest("tr").querySelector(".student-name").textContent;
            this.showNotification(`\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430 ${studentName}`);
          });
        });
      }
      showNotification(message, type = "success") {
        if (typeof showToast !== "undefined") {
          showToast(message, type);
        } else {
          console.log(`Notification [${type}]: ${message}`);
        }
      }
    };
  }
});

// static/js/modules/course-management.js
function showToast2(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;
  document.body.appendChild(toast);
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.remove();
  });
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 4e3);
}
function getToastIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-circle";
    case "warning":
      return "fa-exclamation-triangle";
    default:
      return "fa-info-circle";
  }
}
function initCourseManagement() {
  console.log("Initializing course management...");
  const studentsManager = new CourseStudentsManager();
  initModulesManagement();
  initManagementCards();
  initSaveButtons();
  console.log("Course management fully initialized");
}
function initModulesManagement() {
  let currentModules = [
    { id: 1, title: "\u0412\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0432 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", description: "\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043F\u043E\u043D\u044F\u0442\u0438\u044F \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F. \u0417\u043D\u0430\u043A\u043E\u043C\u0441\u0442\u0432\u043E \u0441 \u044F\u0437\u044B\u043A\u0430\u043C\u0438 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F.", type: "theory", order: 1 },
    { id: 2, title: "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0438 \u0442\u0438\u043F\u044B \u0434\u0430\u043D\u043D\u044B\u0445", description: "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u043C\u0438, \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0442\u0438\u043F\u044B \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u043D\u0430\u0434 \u043D\u0438\u043C\u0438.", type: "theory", order: 2 },
    { id: 3, title: "\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u044B", description: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 if, else, switch \u0434\u043B\u044F \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u043E\u0442\u043E\u043A\u043E\u043C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B.", type: "theory", order: 3 },
    { id: 4, title: "\u0426\u0438\u043A\u043B\u044B", description: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0446\u0438\u043A\u043B\u043E\u0432 for, while, do-while \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439.", type: "practice", order: 4 }
  ];
  if (!modalManager.register("addModuleModal")) {
    createModuleModal();
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("#addModuleBtn")) {
      openAddModuleModal();
    }
    if (e.target.closest("#confirmModuleModal")) {
      confirmAddModule();
    }
    if (e.target.closest("[data-module-action]")) {
      const button = e.target.closest("[data-module-action]");
      const action = button.dataset.moduleAction;
      const moduleId = parseInt(button.dataset.moduleId);
      handleModuleAction(action, moduleId);
    }
  });
  function createModuleModal() {
    const modalContent = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u043C\u043E\u0434\u0443\u043B\u044F</h3>
                    <button type="button" class="modal-close" data-modal-close>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="module-title" class="form-label">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F *</label>
                        <input type="text" id="module-title" class="form-control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F">
                    </div>
                    
                    <div class="form-group">
                        <label for="module-description" class="form-label">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F</label>
                        <textarea id="module-description" class="form-control" placeholder="\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F" rows="3"></textarea>
                    </div>
                    
                    <div class="module-type-options">
                        <div class="form-group">
                            <label class="form-label">\u0422\u0438\u043F \u043C\u043E\u0434\u0443\u043B\u044F</label>
                            <div class="radio-options">
                                <label class="radio-option">
                                    <input type="radio" name="moduleType" value="theory" checked>
                                    <span class="radio-checkmark"></span>
                                    <span class="radio-label">
                                        <i class="fas fa-book"></i>
                                        \u0422\u0435\u043E\u0440\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439
                                    </span>
                                </label>
                                
                                <label class="radio-option">
                                    <input type="radio" name="moduleType" value="practice">
                                    <span class="radio-checkmark"></span>
                                    <span class="radio-label">
                                        <i class="fas fa-tasks"></i>
                                        \u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439
                                    </span>
                                </label>
                                
                                <label class="radio-option">
                                    <input type="radio" name="moduleType" value="project">
                                    <span class="radio-checkmark"></span>
                                    <span class="radio-label">
                                        <i class="fas fa-project-diagram"></i>
                                        \u041F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0439
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-modal-close>\u041E\u0442\u043C\u0435\u043D\u0430</button>
                    <button type="button" class="btn btn-success" id="confirmModuleModal">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C</button>
                </div>
            </div>
        `;
    modalManager.createModal("addModuleModal", modalContent);
  }
  function openAddModuleModal() {
    console.log("Opening module modal");
    const moduleTitle = document.getElementById("module-title");
    const moduleDescription = document.getElementById("module-description");
    if (moduleTitle) moduleTitle.value = "";
    if (moduleDescription) moduleDescription.value = "";
    const theoryRadio = document.querySelector('input[name="moduleType"][value="theory"]');
    if (theoryRadio) theoryRadio.checked = true;
    modalManager.show("addModuleModal");
  }
  function confirmAddModule() {
    const moduleTitle = document.getElementById("module-title");
    if (!moduleTitle) return;
    const title = moduleTitle.value.trim();
    const description = document.getElementById("module-description") ? document.getElementById("module-description").value.trim() : "";
    const typeInput = document.querySelector('input[name="moduleType"]:checked');
    const type = typeInput ? typeInput.value : "theory";
    if (!title) {
      showNotification("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F", "error");
      moduleTitle.focus();
      return;
    }
    const newModule = {
      id: Date.now(),
      title,
      description,
      type,
      order: currentModules.length + 1
    };
    currentModules.push(newModule);
    updateModulesList();
    modalManager.hide("addModuleModal");
    showNotification("\u041C\u043E\u0434\u0443\u043B\u044C \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D");
  }
  function updateModulesList() {
    const modulesList = document.querySelector(".modules-list");
    if (!modulesList) return;
    modulesList.innerHTML = "";
    currentModules.forEach((module) => {
      const moduleItem = document.createElement("div");
      moduleItem.className = "module-item";
      moduleItem.innerHTML = `
                <div class="module-order">${module.order}</div>
                <div class="module-info">
                    <h4>${module.title}</h4>
                    <p>${module.description}</p>
                </div>
                <div class="module-actions">
                    <button class="action-btn" data-module-action="edit" data-module-id="${module.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" data-module-action="delete" data-module-id="${module.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="action-btn" data-module-action="up" data-module-id="${module.id}">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="action-btn" data-module-action="down" data-module-id="${module.id}">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                </div>
            `;
      modulesList.appendChild(moduleItem);
    });
    updateModuleCount();
  }
  function handleModuleAction(action, moduleId) {
    switch (action) {
      case "edit":
        showNotification(`\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F ${moduleId}`);
        break;
      case "delete":
        deleteModule(moduleId);
        break;
      case "up":
        moveModuleUp(moduleId);
        break;
      case "down":
        moveModuleDown(moduleId);
        break;
    }
  }
  function deleteModule(moduleId) {
    if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043C\u043E\u0434\u0443\u043B\u044C?")) {
      currentModules = currentModules.filter((module) => module.id !== moduleId);
      currentModules.forEach((module, index) => {
        module.order = index + 1;
      });
      updateModulesList();
      showNotification("\u041C\u043E\u0434\u0443\u043B\u044C \u0443\u0434\u0430\u043B\u0435\u043D");
    }
  }
  function moveModuleUp(moduleId) {
    const moduleIndex = currentModules.findIndex((module) => module.id === moduleId);
    if (moduleIndex > 0) {
      [currentModules[moduleIndex - 1], currentModules[moduleIndex]] = [currentModules[moduleIndex], currentModules[moduleIndex - 1]];
      currentModules.forEach((module, index) => {
        module.order = index + 1;
      });
      updateModulesList();
    }
  }
  function moveModuleDown(moduleId) {
    const moduleIndex = currentModules.findIndex((module) => module.id === moduleId);
    if (moduleIndex < currentModules.length - 1) {
      [currentModules[moduleIndex], currentModules[moduleIndex + 1]] = [currentModules[moduleIndex + 1], currentModules[moduleIndex]];
      currentModules.forEach((module, index) => {
        module.order = index + 1;
      });
      updateModulesList();
    }
  }
  function updateModuleCount() {
    const moduleCountElement = document.querySelector(".management-card:first-child h3");
    if (moduleCountElement) {
      moduleCountElement.textContent = currentModules.length;
    }
  }
  updateModulesList();
}
function initManagementCards() {
  document.querySelectorAll(".management-card").forEach((card) => {
    card.addEventListener("click", function() {
      const cardText = this.querySelector("p").textContent;
      if (cardText.includes("\u041C\u043E\u0434\u0443\u043B\u0435\u0439")) {
        document.querySelector(".modules-list").scrollIntoView({ behavior: "smooth" });
      } else if (cardText.includes("\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432")) {
        document.querySelector(".students-table").scrollIntoView({ behavior: "smooth" });
      } else if (cardText.includes("\u0417\u0430\u0434\u0430\u043D\u0438\u0439")) {
        document.querySelector(".assignments-list").scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
function initSaveButtons() {
  const saveSettingsBtn = document.querySelector(".settings-form .btn");
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", function(e) {
      e.preventDefault();
      showNotification("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u0443\u0440\u0441\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B");
    });
  }
  const saveMainBtn = document.querySelector(".course-management-actions .btn");
  if (saveMainBtn) {
    saveMainBtn.addEventListener("click", function(e) {
      e.preventDefault();
      showNotification("\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B");
    });
  }
}
function showNotification(message, type = "success") {
  if (typeof showToast2 !== "undefined") {
    showToast2(message, type);
  } else {
    console.log(`Notification [${type}]: ${message}`);
  }
}
var init_course_management = __esm({
  "static/js/modules/course-management.js"() {
    init_course_students();
    init_modal_manager();
  }
});

// static/js/modules/course-creation.js
function initCourseCreation() {
  initPreview();
  initFormSubmission();
  initToastSystem();
  addToastStyles();
}
function initToastSystem() {
  if (!document.getElementById("toast-container")) {
    const toastContainer3 = document.createElement("div");
    toastContainer3.id = "toast-container";
    toastContainer3.className = "toast-container";
    document.body.appendChild(toastContainer3);
  }
}
function showToast3(message, type = "info", duration = 4e3) {
  const toastContainer3 = document.getElementById("toast-container");
  if (!toastContainer3) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle"
  };
  toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-progress"></div>
    `;
  toastContainer3.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    hideToast(toast);
  });
  if (duration > 0) {
    setTimeout(() => {
      hideToast(toast);
    }, duration);
  }
  const progressBar = toast.querySelector(".toast-progress");
  if (progressBar) {
    progressBar.style.animation = `progress ${duration}ms linear`;
  }
  return toast;
}
function hideToast(toast) {
  toast.classList.remove("show");
  toast.classList.add("hide");
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}
function initPreview() {
  console.log("Initializing preview...");
  const titleInput = document.getElementById("course-title");
  const descInput = document.getElementById("course-short-desc");
  const levelSelect = document.getElementById("course-level");
  const durationInput = document.getElementById("course-duration");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const previewLevel = document.getElementById("preview-level");
  const previewDuration = document.getElementById("preview-duration");
  if (!titleInput || !previewTitle) {
    console.error("Title input or preview title not found");
    return;
  }
  titleInput.addEventListener("input", function() {
    console.log("Title changed:", this.value);
    previewTitle.textContent = this.value || "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430";
  });
  if (descInput && previewDesc) {
    descInput.addEventListener("input", function() {
      previewDesc.textContent = this.value || "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
    });
  }
  if (levelSelect && previewLevel) {
    levelSelect.addEventListener("change", function() {
      const levelText = this.options[this.selectedIndex].text;
      previewLevel.textContent = `\u0423\u0440\u043E\u0432\u0435\u043D\u044C: ${levelText || "-"}`;
    });
  }
  if (durationInput && previewDuration) {
    durationInput.addEventListener("input", function() {
      previewDuration.textContent = `\u0427\u0430\u0441\u043E\u0432: ${this.value || "-"}`;
    });
  }
  const imageInput = document.getElementById("course-image");
  const previewImage = document.querySelector(".preview-image");
  if (imageInput && previewImage) {
    imageInput.addEventListener("change", function(e) {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e2) {
          previewImage.innerHTML = "";
          const img = document.createElement("img");
          img.src = e2.target.result;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          img.style.borderRadius = "8px";
          previewImage.appendChild(img);
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }
  console.log("Preview initialized successfully");
}
function initFormSubmission() {
  console.log("Initializing form submission...");
  const form = document.getElementById("course-form");
  const saveDraftBtn = document.querySelector(".form-actions .btn-light");
  if (!form) {
    console.error("Form not found");
    return;
  }
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", function(e) {
      e.preventDefault();
      const formData = {
        title: document.getElementById("course-title").value,
        description: document.getElementById("course-short-desc").value,
        fullDescription: document.getElementById("course-full-desc").value,
        category: document.getElementById("course-category").value,
        level: document.getElementById("course-level").value,
        duration: document.getElementById("course-duration").value,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      localStorage.setItem("courseDraft", JSON.stringify(formData));
      showToast3("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D!", "success", 3e3);
      console.log("Draft saved:", formData);
    });
  }
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435...';
    submitBtn.disabled = true;
    setTimeout(() => {
      showToast3("\u041A\u0443\u0440\u0441 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044E!", "success", 5e3);
      resetForm();
      localStorage.removeItem("courseDraft");
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      console.log("Course created successfully");
    }, 2e3);
  });
  loadDraft();
  console.log("Form submission initialized successfully");
}
function validateForm() {
  const title = document.getElementById("course-title").value.trim();
  const description = document.getElementById("course-short-desc").value.trim();
  const fullDescription = document.getElementById("course-full-desc").value.trim();
  const category = document.getElementById("course-category").value;
  const level = document.getElementById("course-level").value;
  const duration = document.getElementById("course-duration").value;
  if (!title) {
    showToast3("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430", "error", 4e3);
    return false;
  }
  if (!description) {
    showToast3("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430", "error", 4e3);
    return false;
  }
  if (!fullDescription) {
    showToast3("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430", "error", 4e3);
    return false;
  }
  if (!category) {
    showToast3("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E \u043A\u0443\u0440\u0441\u0430", "error", 4e3);
    return false;
  }
  if (!level) {
    showToast3("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438", "error", 4e3);
    return false;
  }
  if (!duration || duration < 1) {
    showToast3("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0443\u044E \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043A\u0443\u0440\u0441\u0430", "error", 4e3);
    return false;
  }
  return true;
}
function resetForm() {
  const form = document.getElementById("course-form");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const previewLevel = document.getElementById("preview-level");
  const previewDuration = document.getElementById("preview-duration");
  const previewImage = document.querySelector(".preview-image");
  if (form) {
    form.reset();
    console.log("Form reset");
  }
  if (previewTitle) previewTitle.textContent = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430";
  if (previewDesc) previewDesc.textContent = "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
  if (previewLevel) previewLevel.textContent = "\u0423\u0440\u043E\u0432\u0435\u043D\u044C: -";
  if (previewDuration) previewDuration.textContent = "\u0427\u0430\u0441\u043E\u0432: -";
  if (previewImage) {
    previewImage.innerHTML = '<i class="fas fa-book"></i>';
  }
  console.log("Preview reset");
}
function loadDraft() {
  const draft = localStorage.getItem("courseDraft");
  if (draft) {
    try {
      const formData = JSON.parse(draft);
      document.getElementById("course-title").value = formData.title || "";
      document.getElementById("course-short-desc").value = formData.description || "";
      document.getElementById("course-full-desc").value = formData.fullDescription || "";
      document.getElementById("course-category").value = formData.category || "";
      document.getElementById("course-level").value = formData.level || "";
      document.getElementById("course-duration").value = formData.duration || "";
      document.getElementById("course-title").dispatchEvent(new Event("input"));
      document.getElementById("course-short-desc").dispatchEvent(new Event("input"));
      document.getElementById("course-level").dispatchEvent(new Event("change"));
      document.getElementById("course-duration").dispatchEvent(new Event("input"));
      console.log("Draft loaded:", formData);
      showToast3("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D", "info", 3e3);
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430:", error);
    }
  }
}
function addToastStyles() {
  const toastStyles = `
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        }
        
        .toast {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-left: 4px solid;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .toast.hide {
            transform: translateX(400px);
            opacity: 0;
        }
        
        .toast-success {
            border-left-color: #10b981;
        }
        
        .toast-error {
            border-left-color: #ef4444;
        }
        
        .toast-warning {
            border-left-color: #f59e0b;
        }
        
        .toast-info {
            border-left-color: #3b82f6;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            padding: 16px;
            position: relative;
        }
        
        .toast-icon {
            margin-right: 12px;
            font-size: 1.5em;
            flex-shrink: 0;
        }
        
        .toast-success .toast-icon {
            color: #10b981;
        }
        
        .toast-error .toast-icon {
            color: #ef4444;
        }
        
        .toast-warning .toast-icon {
            color: #f59e0b;
        }
        
        .toast-info .toast-icon {
            color: #3b82f6;
        }
        
        .toast-message {
            flex: 1;
            font-weight: 500;
            color: #374151;
            font-size: 0.95em;
            line-height: 1.4;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px;
            margin-left: 8px;
            border-radius: 4px;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        .toast-close:hover {
            background: #f3f4f6;
            color: #6b7280;
        }
        
        .toast-progress {
            height: 3px;
            width: 100%;
            background: rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .toast-progress::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transform-origin: left;
            animation: progress linear;
        }
        
        .toast-success .toast-progress::before {
            background: linear-gradient(90deg, #10b981, #34d399);
        }
        
        .toast-error .toast-progress::before {
            background: linear-gradient(90deg, #ef4444, #f87171);
        }
        
        .toast-warning .toast-progress::before {
            background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }
        
        .toast-info .toast-progress::before {
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        
        @keyframes progress {
            0% {
                transform: scaleX(1);
            }
            100% {
                transform: scaleX(0);
            }
        }
        
        .fa-spin {
            animation: fa-spin 1s infinite linear;
        }
        
        @keyframes fa-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @media (max-width: 768px) {
            .toast-container {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .toast {
                transform: translateY(-100px);
            }
            
            .toast.show {
                transform: translateY(0);
            }
            
            .toast.hide {
                transform: translateY(-100px);
            }
        }
    `;
  if (!document.querySelector("#toast-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "toast-styles";
    styleSheet.textContent = toastStyles;
    document.head.appendChild(styleSheet);
  }
}
var init_course_creation = __esm({
  "static/js/modules/course-creation.js"() {
  }
});

// static/js/modules/course-detail-management.js
function initCourseDetailManagement() {
  initDeleteButtons();
  initAddLessonModal();
  initAddModuleModal();
  initDragAndDrop();
  addManagementStyles();
}
function initDeleteButtons() {
  const materialsList = document.querySelector(".materials-list");
  if (materialsList) {
    materialsList.addEventListener("click", function(e) {
      if (e.target.classList.contains("btn-danger") || e.target.closest(".btn-danger")) {
        const materialItem = e.target.closest(".material-item");
        if (materialItem) {
          if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B?")) {
            materialItem.style.animation = "slideOut 0.3s ease";
            setTimeout(() => {
              materialItem.remove();
              showToast4("\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D", "success", 3e3);
            }, 300);
          }
        }
      }
    });
  }
  const lessonsContainer = document.querySelector(".lessons-container");
  if (lessonsContainer) {
    lessonsContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("delete-lesson") || e.target.closest(".delete-lesson")) {
        const lessonItem = e.target.closest(".lesson-item");
        if (lessonItem) {
          if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u0443\u0440\u043E\u043A?")) {
            lessonItem.style.animation = "slideOut 0.3s ease";
            setTimeout(() => {
              lessonItem.remove();
              updateLessonNumbers();
              showToast4("\u0423\u0440\u043E\u043A \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D", "success", 3e3);
            }, 300);
          }
        }
      }
    });
  }
  const modulesContainer = document.querySelector(".modules-container");
  if (modulesContainer) {
    modulesContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("delete-module") || e.target.closest(".delete-module")) {
        const moduleItem = e.target.closest(".module-item");
        if (moduleItem) {
          if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043C\u043E\u0434\u0443\u043B\u044C \u0438 \u0432\u0441\u0435 \u0435\u0433\u043E \u0443\u0440\u043E\u043A\u0438?")) {
            moduleItem.style.animation = "slideOut 0.3s ease";
            setTimeout(() => {
              moduleItem.remove();
              updateModuleNumbers();
              showToast4("\u041C\u043E\u0434\u0443\u043B\u044C \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D", "success", 3e3);
            }, 300);
          }
        }
      }
    });
  }
}
function initAddLessonModal() {
  const addLessonBtn = document.querySelector(".add-lesson-btn");
  const lessonModal = document.getElementById("addLessonModal");
  const closeLessonModal = document.getElementById("closeLessonModal");
  const cancelLessonModal = document.getElementById("cancelLessonModal");
  const confirmLessonModal = document.getElementById("confirmLessonModal");
  const lessonTypeOptions = document.querySelectorAll(".lesson-type-option");
  if (!addLessonBtn || !lessonModal) return;
  let selectedLessonType = "lecture";
  addLessonBtn.addEventListener("click", function() {
    selectedLessonType = "lecture";
    updateLessonTypeSelection();
    lessonModal.style.display = "flex";
    setTimeout(() => lessonModal.classList.add("show"), 10);
  });
  function closeLessonModalFunc() {
    lessonModal.classList.remove("show");
    setTimeout(() => {
      lessonModal.style.display = "none";
    }, 300);
  }
  if (closeLessonModal) closeLessonModal.addEventListener("click", closeLessonModalFunc);
  if (cancelLessonModal) cancelLessonModal.addEventListener("click", closeLessonModalFunc);
  lessonTypeOptions.forEach((option) => {
    option.addEventListener("click", function() {
      selectedLessonType = this.getAttribute("data-type");
      updateLessonTypeSelection();
    });
  });
  function updateLessonTypeSelection() {
    lessonTypeOptions.forEach((option) => {
      if (option.getAttribute("data-type") === selectedLessonType) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  }
  if (confirmLessonModal) {
    confirmLessonModal.addEventListener("click", function() {
      addNewLesson(selectedLessonType);
      closeLessonModalFunc();
    });
  }
  lessonModal.addEventListener("click", function(e) {
    if (e.target === lessonModal) {
      closeLessonModalFunc();
    }
  });
}
function initAddModuleModal() {
  const addModuleBtn = document.querySelector(".add-module-btn");
  const moduleModal = document.getElementById("addModuleModal");
  const closeModuleModal = document.getElementById("closeModuleModal");
  const cancelModuleModal = document.getElementById("cancelModuleModal");
  const confirmModuleModal = document.getElementById("confirmModuleModal");
  if (!addModuleBtn || !moduleModal) return;
  addModuleBtn.addEventListener("click", function() {
    document.getElementById("module-title").value = "";
    document.getElementById("module-description").value = "";
    document.querySelector('input[name="module-type"][value="theory"]').checked = true;
    moduleModal.style.display = "flex";
    setTimeout(() => moduleModal.classList.add("show"), 10);
  });
  function closeModuleModalFunc() {
    moduleModal.classList.remove("show");
    setTimeout(() => {
      moduleModal.style.display = "none";
    }, 300);
  }
  if (closeModuleModal) closeModuleModal.addEventListener("click", closeModuleModalFunc);
  if (cancelModuleModal) cancelModuleModal.addEventListener("click", closeModuleModalFunc);
  if (confirmModuleModal) {
    confirmModuleModal.addEventListener("click", function() {
      const title = document.getElementById("module-title").value.trim();
      const description = document.getElementById("module-description").value.trim();
      const type = document.querySelector('input[name="module-type"]:checked').value;
      if (!title) {
        showToast4("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F", "error", 4e3);
        return;
      }
      addNewModule(title, description, type);
      closeModuleModalFunc();
    });
  }
  moduleModal.addEventListener("click", function(e) {
    if (e.target === moduleModal) {
      closeModuleModalFunc();
    }
  });
}
function addNewLesson(type) {
  const lessonsContainer = document.querySelector(".lessons-container");
  if (!lessonsContainer) {
    console.warn("\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u0443\u0440\u043E\u043A\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
    return;
  }
  const lessonId = Date.now();
  const lessonNumber = lessonsContainer.children.length + 1;
  let typeIcon, typeName, typeClass;
  switch (type) {
    case "test":
      typeIcon = "fa-question-circle";
      typeName = "\u0422\u0435\u0441\u0442";
      typeClass = "lesson-test";
      break;
    case "practice":
      typeIcon = "fa-code";
      typeName = "\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430";
      typeClass = "lesson-practice";
      break;
    case "lecture":
    default:
      typeIcon = "fa-play-circle";
      typeName = "\u041B\u0435\u043A\u0446\u0438\u044F";
      typeClass = "lesson-lecture";
  }
  const lessonItem = document.createElement("div");
  lessonItem.className = `lesson-item ${typeClass}`;
  lessonItem.setAttribute("data-lesson-id", lessonId);
  lessonItem.setAttribute("draggable", "true");
  lessonItem.innerHTML = `
        <div class="lesson-drag-handle">
            <i class="fas fa-grip-vertical"></i>
        </div>
        <div class="lesson-icon">
            <i class="fas ${typeIcon}"></i>
        </div>
        <div class="lesson-content">
            <div class="lesson-header">
                <h4 class="lesson-title">\u0423\u0440\u043E\u043A ${lessonNumber}: \u041D\u043E\u0432\u0430\u044F ${typeName}</h4>
                <span class="lesson-type-badge">${typeName}</span>
            </div>
            <p class="lesson-description">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0443\u0440\u043E\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0437\u0434\u0435\u0441\u044C</p>
            <div class="lesson-meta">
                <span class="lesson-duration"><i class="far fa-clock"></i> 0 \u043C\u0438\u043D.</span>
                <span class="lesson-status"><i class="far fa-edit"></i> \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A</span>
            </div>
        </div>
        <div class="lesson-actions">
            <button type="button" class="btn btn-small btn-light edit-lesson" title="\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-small btn-danger delete-lesson" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
  lessonsContainer.appendChild(lessonItem);
  lessonItem.style.animation = "slideIn 0.3s ease";
  showToast4(`\u041D\u043E\u0432\u044B\u0439 \u0443\u0440\u043E\u043A "${typeName}" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D`, "success", 3e3);
  initLessonItemEvents(lessonItem);
}
function addNewModule(title, description, type) {
  const modulesContainer = document.querySelector(".modules-container");
  if (!modulesContainer) {
    console.warn("\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
    return;
  }
  const moduleId = Date.now();
  const moduleNumber = modulesContainer.children.length + 1;
  let typeIcon, typeName;
  switch (type) {
    case "practice":
      typeIcon = "fa-tasks";
      typeName = "\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439";
      break;
    case "project":
      typeIcon = "fa-project-diagram";
      typeName = "\u041F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0439";
      break;
    case "theory":
    default:
      typeIcon = "fa-book";
      typeName = "\u0422\u0435\u043E\u0440\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439";
  }
  const moduleItem = document.createElement("div");
  moduleItem.className = "module-item";
  moduleItem.setAttribute("data-module-id", moduleId);
  moduleItem.setAttribute("draggable", "true");
  moduleItem.innerHTML = `
        <div class="module-header">
            <div class="module-drag-handle">
                <i class="fas fa-grip-vertical"></i>
            </div>
            <div class="module-info">
                <h3 class="module-title">\u041C\u043E\u0434\u0443\u043B\u044C ${moduleNumber}: ${title}</h3>
                <span class="module-type-badge">
                    <i class="fas ${typeIcon}"></i> ${typeName}
                </span>
            </div>
            <div class="module-actions">
                <button type="button" class="btn btn-small btn-light add-lesson-btn" title="\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0440\u043E\u043A">
                    <i class="fas fa-plus"></i> \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0440\u043E\u043A
                </button>
                <button type="button" class="btn btn-small btn-danger delete-module" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="module-description">
            <p>${description || "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0443\u043B\u044F \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0437\u0434\u0435\u0441\u044C"}</p>
        </div>
        <div class="lessons-container">
            <!-- \u0423\u0440\u043E\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C\u0441\u044F \u0441\u044E\u0434\u0430 -->
        </div>
    `;
  modulesContainer.appendChild(moduleItem);
  moduleItem.style.animation = "slideIn 0.3s ease";
  showToast4(`\u041C\u043E\u0434\u0443\u043B\u044C "${title}" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D`, "success", 3e3);
  initModuleItemEvents(moduleItem);
}
function initLessonItemEvents(lessonItem) {
  const editBtn = lessonItem.querySelector(".edit-lesson");
  if (editBtn) {
    editBtn.addEventListener("click", function() {
      const lessonId = lessonItem.getAttribute("data-lesson-id");
      showToast4(`\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0443\u0440\u043E\u043A\u0430 ${lessonId}`, "info", 3e3);
    });
  }
  lessonItem.addEventListener("dragstart", handleDragStart);
  lessonItem.addEventListener("dragend", handleDragEnd);
}
function initModuleItemEvents(moduleItem) {
  const addLessonBtn = moduleItem.querySelector(".add-lesson-btn");
  if (addLessonBtn) {
    addLessonBtn.addEventListener("click", function() {
      showToast4("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u043A\u0430 \u0432 \u043C\u043E\u0434\u0443\u043B\u044C", "info", 3e3);
    });
  }
  moduleItem.addEventListener("dragstart", handleDragStart);
  moduleItem.addEventListener("dragend", handleDragEnd);
}
function initDragAndDrop() {
  const containers = document.querySelectorAll(".lessons-container, .modules-container");
  containers.forEach((container) => {
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("drop", handleDrop);
  });
}
function handleDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.getAttribute("data-lesson-id") || e.target.getAttribute("data-module-id"));
}
function handleDragEnd(e) {
  e.target.classList.remove("dragging");
}
function handleDragOver(e) {
  e.preventDefault();
  const draggingElement = document.querySelector(".dragging");
  if (!draggingElement) return;
  const afterElement = getDragAfterElement(e.currentTarget, e.clientY);
  if (afterElement) {
    e.currentTarget.insertBefore(draggingElement, afterElement);
  } else {
    e.currentTarget.appendChild(draggingElement);
  }
}
function handleDrop(e) {
  e.preventDefault();
  updateLessonNumbers();
  updateModuleNumbers();
  showToast4("\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D", "success", 2e3);
}
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".lesson-item:not(.dragging), .module-item:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
function updateLessonNumbers() {
  const lessons = document.querySelectorAll(".lesson-item");
  lessons.forEach((lesson, index) => {
    const titleElement = lesson.querySelector(".lesson-title");
    if (titleElement) {
      const currentText = titleElement.textContent;
      const newText = currentText.replace(/Урок \d+:/, `\u0423\u0440\u043E\u043A ${index + 1}:`);
      titleElement.textContent = newText;
    }
  });
}
function updateModuleNumbers() {
  const modules = document.querySelectorAll(".module-item");
  modules.forEach((module, index) => {
    const titleElement = module.querySelector(".module-title");
    if (titleElement) {
      const currentText = titleElement.textContent;
      const newText = currentText.replace(/Модуль \d+:/, `\u041C\u043E\u0434\u0443\u043B\u044C ${index + 1}:`);
      titleElement.textContent = newText;
    }
  });
}
function addManagementStyles() {
  const styles = `
        /* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u044B\u0445 \u043E\u043A\u043E\u043D */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal.show {
            opacity: 1;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow: hidden;
            transform: translateY(-50px);
            transition: transform 0.3s ease;
        }
        
        .modal.show .modal-content {
            transform: translateY(0);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
            margin: 0;
            color: var(--primary);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.2em;
            color: #666;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: all 0.2s;
        }
        
        .modal-close:hover {
            background: #f5f5f5;
            color: #333;
        }
        
        .modal-body {
            padding: 25px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            padding: 20px 25px;
            border-top: 1px solid #eee;
        }
        
        /* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u0442\u0438\u043F\u0430 \u0443\u0440\u043E\u043A\u0430 */
        .lesson-type-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .lesson-type-option {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .lesson-type-option:hover {
            border-color: var(--accent);
            transform: translateY(-2px);
        }
        
        .lesson-type-option.selected {
            border-color: var(--accent);
            background-color: rgba(74, 144, 226, 0.05);
        }
        
        .type-icon {
            margin-right: 15px;
            font-size: 2em;
            color: var(--accent);
            flex-shrink: 0;
        }
        
        .type-info {
            flex: 1;
        }
        
        .type-info h4 {
            margin: 0 0 5px 0;
            color: var(--primary);
        }
        
        .type-info p {
            margin: 0;
            color: #666;
            font-size: 0.9em;
        }
        
        .type-check {
            color: var(--accent);
            font-size: 1.2em;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lesson-type-option.selected .type-check {
            opacity: 1;
        }
        
        /* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u0442\u0438\u043F\u0430 \u043C\u043E\u0434\u0443\u043B\u044F */
        .radio-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .radio-option {
            display: flex;
            align-items: center;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
        }
        
        .radio-option:hover {
            border-color: var(--accent);
        }
        
        .radio-option input[type="radio"] {
            position: absolute;
            opacity: 0;
        }
        
        .radio-checkmark {
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            border-radius: 50%;
            margin-right: 15px;
            position: relative;
            flex-shrink: 0;
            transition: all 0.3s;
        }
        
        .radio-option input[type="radio"]:checked + .radio-checkmark {
            border-color: var(--accent);
            background-color: var(--accent);
        }
        
        .radio-option input[type="radio"]:checked + .radio-checkmark::after {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
        }
        
        .radio-label {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            color: var(--primary);
        }
        
        /* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u0443\u0440\u043E\u043A\u043E\u0432 \u0438 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 */
        .lesson-item, .module-item {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            margin-bottom: 15px;
            background: white;
            transition: all 0.3s;
        }
        
        .lesson-item:hover, .module-item:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .lesson-item {
            display: flex;
            align-items: center;
            padding: 15px;
            gap: 15px;
        }
        
        .lesson-lecture {
            border-left: 4px solid #4a90e2;
        }
        
        .lesson-test {
            border-left: 4px solid #f39c12;
        }
        
        .lesson-practice {
            border-left: 4px solid #27ae60;
        }
        
        .lesson-drag-handle {
            color: #ccc;
            cursor: grab;
            padding: 5px;
        }
        
        .lesson-drag-handle:active {
            cursor: grabbing;
        }
        
        .lesson-icon {
            font-size: 1.5em;
            color: var(--accent);
            flex-shrink: 0;
        }
        
        .lesson-content {
            flex: 1;
        }
        
        .lesson-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        
        .lesson-title {
            margin: 0;
            color: var(--primary);
            font-size: 1.1em;
        }
        
        .lesson-type-badge {
            background: var(--accent);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: 500;
        }
        
        .lesson-test .lesson-type-badge {
            background: #f39c12;
        }
        
        .lesson-practice .lesson-type-badge {
            background: #27ae60;
        }
        
        .lesson-description {
            margin: 0 0 10px 0;
            color: #666;
            font-size: 0.9em;
        }
        
        .lesson-meta {
            display: flex;
            gap: 15px;
            font-size: 0.8em;
            color: #888;
        }
        
        .lesson-actions {
            display: flex;
            gap: 5px;
            flex-shrink: 0;
        }
        
        .module-item {
            padding: 0;
            overflow: hidden;
        }
        
        .module-header {
            display: flex;
            align-items: center;
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .module-drag-handle {
            color: #ccc;
            cursor: grab;
            padding: 5px;
            margin-right: 15px;
        }
        
        .module-info {
            flex: 1;
        }
        
        .module-title {
            margin: 0 0 5px 0;
            color: var(--primary);
        }
        
        .module-type-badge {
            background: #e9ecef;
            color: #495057;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        
        .module-actions {
            display: flex;
            gap: 10px;
        }
        
        .module-description {
            padding: 15px 20px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .module-description p {
            margin: 0;
            color: #666;
        }
        
        .lessons-container {
            padding: 20px;
            min-height: 100px;
        }
        
        .dragging {
            opacity: 0.5;
            transform: rotate(5deg);
        }
        
        /* \u0410\u043D\u0438\u043C\u0430\u0446\u0438\u0438 */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-100%);
            }
        }
        
        /* \u0410\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C */
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 20px;
            }
            
            .lesson-item {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .lesson-actions {
                align-self: flex-end;
            }
            
            .module-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
            
            .module-actions {
                align-self: stretch;
                justify-content: space-between;
            }
        }
    `;
  if (!document.querySelector("#management-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "management-styles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}
function showToast4(message, type = "info", duration = 4e3) {
  console.log(`Toast [${type}]: ${message}`);
}
var init_course_detail_management = __esm({
  "static/js/modules/course-detail-management.js"() {
  }
});

// static/js/modules/course-editor.js
function initCreateCourseDetailPage() {
  initTabs();
  initVideoOptions();
  initEditor();
  initImportFunctionality();
  initPreview2();
  initFormSubmission2();
  initMaterialsPanel();
  addEditorStyles();
  initToastSystem2();
}
function initToastSystem2() {
  if (!document.getElementById("toast-container")) {
    const toastContainer3 = document.createElement("div");
    toastContainer3.id = "toast-container";
    toastContainer3.className = "toast-container";
    document.body.appendChild(toastContainer3);
  }
}
function showToast5(message, type = "info", duration = 4e3) {
  const toastContainer3 = document.getElementById("toast-container");
  if (!toastContainer3) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle"
  };
  toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-progress"></div>
    `;
  toastContainer3.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    hideToast2(toast);
  });
  if (duration > 0) {
    setTimeout(() => {
      hideToast2(toast);
    }, duration);
  }
  const progressBar = toast.querySelector(".toast-progress");
  if (progressBar) {
    progressBar.style.animation = `progress ${duration}ms linear`;
  }
  return toast;
}
function hideToast2(toast) {
  toast.classList.remove("show");
  toast.classList.add("hide");
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}
function initTabs() {
  const contentTabs = document.querySelectorAll(".content-tab");
  const contentPanels = document.querySelectorAll(".content-panel");
  contentTabs.forEach((tab) => {
    tab.addEventListener("click", function() {
      const tabId = this.getAttribute("data-tab");
      contentTabs.forEach((t) => t.classList.remove("active"));
      contentPanels.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(`${tabId}-panel`).classList.add("active");
    });
  });
}
function initVideoOptions() {
  const videoOptions = document.querySelectorAll(".video-option");
  const videoTypeInput = document.getElementById("video-type");
  const uploadSection = document.getElementById("upload-section");
  const youtubeSection = document.getElementById("youtube-section");
  const videoInput = document.getElementById("lecture-video");
  const youtubeInput = document.getElementById("youtube-url");
  if (videoInput) videoInput.removeAttribute("required");
  if (youtubeInput) youtubeInput.removeAttribute("required");
  if (videoTypeInput) videoTypeInput.removeAttribute("required");
  videoOptions.forEach((option) => {
    option.addEventListener("click", function() {
      videoOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      const type = this.getAttribute("data-type");
      if (videoTypeInput) videoTypeInput.value = type;
      if (type === "upload") {
        if (uploadSection) uploadSection.style.display = "block";
        if (youtubeSection) youtubeSection.style.display = "none";
      } else {
        if (uploadSection) uploadSection.style.display = "none";
        if (youtubeSection) youtubeSection.style.display = "block";
      }
    });
  });
}
function initEditor() {
  const editorButtons = document.querySelectorAll(".editor-button");
  const editorContent = document.getElementById("lecture-content");
  const lectureTextInput = document.getElementById("lecture-text");
  if (!editorContent || !lectureTextInput) return;
  let savedSelection = null;
  let linkModal, imageModal;
  function createModals() {
    linkModal = document.createElement("div");
    linkModal.className = "editor-modal";
    linkModal.innerHTML = `
            <div class="modal-content">
                <h3>\u0412\u0441\u0442\u0430\u0432\u043A\u0430 \u0441\u0441\u044B\u043B\u043A\u0438</h3>
                <div class="form-group">
                    <label for="link-url">URL \u0441\u0441\u044B\u043B\u043A\u0438:</label>
                    <input type="url" id="link-url" class="form-control" placeholder="https://example.com">
                </div>
                <div class="form-group">
                    <label for="link-text">\u0422\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438:</label>
                    <input type="text" id="link-text" class="form-control" placeholder="\u0422\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438">
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-light" id="link-cancel">\u041E\u0442\u043C\u0435\u043D\u0430</button>
                    <button type="button" class="btn btn-success" id="link-insert">\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C</button>
                </div>
            </div>
        `;
    imageModal = document.createElement("div");
    imageModal.className = "editor-modal";
    imageModal.innerHTML = `
            <div class="modal-content">
                <h3>\u0412\u0441\u0442\u0430\u0432\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F</h3>
                <div class="form-group">
                    <label>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A:</label>
                    <div class="image-source-tabs">
                        <button type="button" class="source-tab active" data-source="url">\u0418\u0437 URL</button>
                        <button type="button" class="source-tab" data-source="upload">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B</button>
                    </div>
                </div>
                <div class="image-source-content">
                    <div class="source-panel active" id="url-panel">
                        <div class="form-group">
                            <label for="image-url">URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:</label>
                            <input type="url" id="image-url" class="form-control" placeholder="https://example.com/image.jpg">
                        </div>
                        <div class="form-group">
                            <label for="image-alt">\u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442:</label>
                            <input type="text" id="image-alt" class="form-control" placeholder="\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F">
                        </div>
                    </div>
                    <div class="source-panel" id="upload-panel">
                        <div class="form-group">
                            <label>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B:</label>
                            <div class="file-upload">
                                <input type="file" id="image-file" class="file-upload-input" accept="image/*">
                                <label for="image-file" class="file-upload-label">
                                    <div>
                                        <i class="fas fa-upload"></i>
                                        <span>\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435</span>
                                        <span style="font-size: 0.8rem;">\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F JPG, PNG, GIF, WebP</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="upload-image-alt">\u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442:</label>
                            <input type="text" id="upload-image-alt" class="form-control" placeholder="\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F">
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-light" id="image-cancel">\u041E\u0442\u043C\u0435\u043D\u0430</button>
                    <button type="button" class="btn btn-success" id="image-insert">\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C</button>
                </div>
            </div>
        `;
    document.body.appendChild(linkModal);
    document.body.appendChild(imageModal);
    setupModalEvents();
  }
  function setupModalEvents() {
    document.addEventListener("click", function(e) {
      if (e.target === linkModal) hideModal(linkModal);
      if (e.target === imageModal) hideModal(imageModal);
    });
    const linkCancelBtn = document.getElementById("link-cancel");
    const linkInsertBtn = document.getElementById("link-insert");
    if (linkCancelBtn && linkInsertBtn) {
      linkCancelBtn.addEventListener("click", () => hideModal(linkModal));
      linkInsertBtn.addEventListener("click", insertLink);
    }
    const imageCancelBtn = document.getElementById("image-cancel");
    const imageInsertBtn = document.getElementById("image-insert");
    if (imageCancelBtn && imageInsertBtn) {
      imageCancelBtn.addEventListener("click", () => hideModal(imageModal));
      imageInsertBtn.addEventListener("click", insertImage);
    }
    const sourceTabs = imageModal.querySelectorAll(".source-tab");
    sourceTabs.forEach((tab) => {
      tab.addEventListener("click", function() {
        const source = this.getAttribute("data-source");
        sourceTabs.forEach((t) => t.classList.remove("active"));
        imageModal.querySelectorAll(".source-panel").forEach((p) => p.classList.remove("active"));
        this.classList.add("active");
        const sourcePanel = document.getElementById(`${source}-panel`);
        if (sourcePanel) sourcePanel.classList.add("active");
      });
    });
    const imageFileInput = document.getElementById("image-file");
    if (imageFileInput) {
      imageFileInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e2) {
            console.log("\u0424\u0430\u0439\u043B \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D:", file.name);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }
  function executeEditorCommand(command) {
    saveSelection();
    switch (command) {
      case "bold":
      case "italic":
      case "underline":
      case "insertUnorderedList":
      case "insertOrderedList":
        document.execCommand(command, false, null);
        break;
      case "createLink":
        showLinkModal();
        break;
      case "insertImage":
        showImageModal();
        break;
      case "code":
        insertCodeBlock();
        break;
    }
    editorContent.focus();
    updateHiddenField();
  }
  function showLinkModal() {
    const selection = getSelectionText();
    const linkTextInput = document.getElementById("link-text");
    if (linkTextInput) linkTextInput.value = selection || "";
    showModal(linkModal);
  }
  function showImageModal() {
    showModal(imageModal);
  }
  function insertLink() {
    const linkUrlInput = document.getElementById("link-url");
    const linkTextInput = document.getElementById("link-text");
    if (!linkUrlInput || !linkTextInput) return;
    const url = linkUrlInput.value.trim();
    const text = linkTextInput.value.trim();
    if (!url) {
      showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 URL \u0441\u0441\u044B\u043B\u043A\u0438", "error", 4e3);
      return;
    }
    restoreSelection();
    if (text) {
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand("insertHTML", false, `<a href="${url}" target="_blank">${url}</a>`);
    }
    hideModal(linkModal);
    updateHiddenField();
  }
  function insertImage() {
    const urlPanel = document.getElementById("url-panel");
    const uploadPanel = document.getElementById("upload-panel");
    let imageUrl, altText;
    if (urlPanel && urlPanel.classList.contains("active")) {
      const imageUrlInput = document.getElementById("image-url");
      const imageAltInput = document.getElementById("image-alt");
      if (imageUrlInput && imageAltInput) {
        imageUrl = imageUrlInput.value.trim();
        altText = imageAltInput.value.trim();
      }
    } else {
      const fileInput = document.getElementById("image-file");
      if (!fileInput || !fileInput.files[0]) {
        showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F", "error", 4e3);
        return;
      }
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        imageUrl = e.target.result;
        const uploadImageAltInput = document.getElementById("upload-image-alt");
        if (uploadImageAltInput) {
          altText = uploadImageAltInput.value.trim();
        }
        insertImageElement(imageUrl, altText);
      };
      reader.readAsDataURL(file);
      return;
    }
    if (!imageUrl) {
      showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F", "error", 4e3);
      return;
    }
    insertImageElement(imageUrl, altText);
  }
  function insertImageElement(url, alt) {
    restoreSelection();
    const img = document.createElement("img");
    img.src = url;
    img.alt = alt || "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    document.execCommand("insertHTML", false, img.outerHTML);
    hideModal(imageModal);
    updateHiddenField();
  }
  function insertCodeBlock() {
    restoreSelection();
    const selection = getSelectionText();
    if (selection) {
      document.execCommand("formatBlock", false, "<pre>");
      const pre = editorContent.querySelector("pre:last-child");
      if (pre) {
        pre.innerHTML = `<code>${selection}</code>`;
      }
    } else {
      document.execCommand("insertHTML", false, "<pre><code>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0437\u0434\u0435\u0441\u044C...</code></pre>");
    }
    updateHiddenField();
  }
  function saveSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      savedSelection = sel.getRangeAt(0);
    }
  }
  function restoreSelection() {
    if (savedSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelection);
    }
  }
  function getSelectionText() {
    const sel = window.getSelection();
    return sel.toString();
  }
  function showModal(modal) {
    if (modal) {
      modal.style.display = "flex";
      if (modal === linkModal) {
        const linkUrlInput = document.getElementById("link-url");
        if (linkUrlInput) linkUrlInput.value = "";
        if (!getSelectionText()) {
          const linkTextInput = document.getElementById("link-text");
          if (linkTextInput) linkTextInput.value = "";
        }
      } else if (modal === imageModal) {
        const imageUrlInput = document.getElementById("image-url");
        const imageAltInput = document.getElementById("image-alt");
        const imageFileInput = document.getElementById("image-file");
        const uploadImageAltInput = document.getElementById("upload-image-alt");
        if (imageUrlInput) imageUrlInput.value = "";
        if (imageAltInput) imageAltInput.value = "";
        if (imageFileInput) imageFileInput.value = "";
        if (uploadImageAltInput) uploadImageAltInput.value = "";
      }
    }
  }
  function hideModal(modal) {
    if (modal) modal.style.display = "none";
  }
  function updateHiddenField() {
    lectureTextInput.value = editorContent.innerHTML;
  }
  function cleanPastedContent() {
    const elements = editorContent.querySelectorAll("*");
    elements.forEach((el) => {
      el.removeAttribute("style");
      el.removeAttribute("class");
      ["id", "dir", "lang", "xmlns"].forEach((attr) => {
        el.removeAttribute(attr);
      });
    });
    updateHiddenField();
  }
  createModals();
  editorButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const command = this.getAttribute("data-command");
      executeEditorCommand(command);
    });
  });
  editorContent.addEventListener("input", function() {
    updateHiddenField();
  });
  editorContent.addEventListener("paste", function(e) {
    setTimeout(() => {
      cleanPastedContent();
    }, 10);
  });
  updateHiddenField();
}
function initImportFunctionality() {
  const importWordBtn = document.getElementById("import-word-btn");
  const wordFileInput = document.getElementById("word-file-input");
  const importPdfBtn = document.getElementById("import-pdf-btn");
  const pdfFileInput = document.getElementById("pdf-file-input");
  const importStatus = document.getElementById("import-status");
  const progressBar = document.getElementById("import-progress-bar");
  const progress = document.getElementById("import-progress");
  const editorContent = document.getElementById("lecture-content");
  const lectureTextInput = document.getElementById("lecture-text");
  if (!importWordBtn || !importPdfBtn) return;
  importWordBtn.addEventListener("click", function() {
    if (wordFileInput) wordFileInput.click();
  });
  importPdfBtn.addEventListener("click", function() {
    if (pdfFileInput) pdfFileInput.click();
  });
  if (wordFileInput) {
    wordFileInput.addEventListener("change", handleWordImport);
  }
  if (pdfFileInput) {
    pdfFileInput.addEventListener("change", handlePdfImport);
  }
  function handleWordImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.match(/\.(docx|doc)$/)) {
      showImportStatus("error", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0444\u043E\u0440\u043C\u0430\u0442\u0430 .docx \u0438\u043B\u0438 .doc");
      return;
    }
    showImportStatus("info", "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 Word \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430...");
    if (progressBar) progressBar.style.display = "block";
    if (progress) progress.style.width = "30%";
    if (typeof mammoth !== "undefined") {
      const readFileAsArrayBuffer = (file2) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function(e2) {
            resolve(e2.target.result);
          };
          reader.onerror = function(e2) {
            reject(e2);
          };
          reader.readAsArrayBuffer(file2);
        });
      };
      readFileAsArrayBuffer(file).then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer })).then(function(result) {
        const html = result.value;
        if (editorContent) editorContent.innerHTML = html;
        if (lectureTextInput) lectureTextInput.value = html;
        if (progress) progress.style.width = "100%";
        setTimeout(() => {
          if (progressBar) progressBar.style.display = "none";
          showImportStatus("success", "Word \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D!");
        }, 500);
      }).catch(function(error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043C\u043F\u043E\u0440\u0442\u0435 Word \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430:", error);
        if (progressBar) progressBar.style.display = "none";
        showImportStatus("error", "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043C\u043F\u043E\u0440\u0442\u0435 Word \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.");
      });
    } else {
      showImportStatus("error", "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 Word \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430");
    }
    e.target.value = "";
  }
  function handlePdfImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.match(/\.pdf$/)) {
      showImportStatus("error", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0444\u043E\u0440\u043C\u0430\u0442\u0430 .pdf");
      return;
    }
    showImportStatus("info", "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 PDF \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430...");
    if (progressBar) progressBar.style.display = "block";
    if (progress) progress.style.width = "10%";
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const typedarray = new Uint8Array(this.result);
      if (typeof pdfjsLib !== "undefined") {
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
          let totalPages = pdf.numPages;
          let pagesProcessed = 0;
          function extractPageText(pageNum) {
            return pdf.getPage(pageNum).then(function(page) {
              return page.getTextContent().then(function(textContentObj) {
                let pageText = "";
                textContentObj.items.forEach(function(textItem) {
                  pageText += textItem.str + " ";
                });
                return pageText;
              });
            });
          }
          let pagePromises = [];
          for (let i = 1; i <= totalPages; i++) {
            pagePromises.push(extractPageText(i));
          }
          Promise.all(pagePromises).then(function(pagesText) {
            const textContent = pagesText.join("\n\n");
            const formattedText = formatPdfText(textContent);
            if (editorContent) editorContent.innerHTML = formattedText;
            if (lectureTextInput) lectureTextInput.value = formattedText;
            if (progress) progress.style.width = "100%";
            setTimeout(() => {
              if (progressBar) progressBar.style.display = "none";
              showImportStatus("success", `PDF \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D! \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E ${totalPages} \u0441\u0442\u0440\u0430\u043D\u0438\u0446.`);
            }, 500);
          });
          const updateProgress2 = function() {
            pagesProcessed++;
            const progressPercent = 10 + pagesProcessed / totalPages * 90;
            if (progress) progress.style.width = `${progressPercent}%`;
          };
          pagePromises.forEach((promise) => {
            promise.then(updateProgress2);
          });
        }).catch(function(error) {
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 PDF:", error);
          if (progressBar) progressBar.style.display = "none";
          showImportStatus("error", "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043C\u043F\u043E\u0440\u0442\u0435 PDF \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.");
        });
      } else {
        showImportStatus("error", "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 PDF \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430");
      }
    };
    fileReader.readAsArrayBuffer(file);
    e.target.value = "";
  }
  function showImportStatus(type, message) {
    if (importStatus) {
      importStatus.textContent = message;
      importStatus.className = "import-status " + type;
    }
  }
  function formatPdfText(text) {
    let lines = text.split("\n");
    let formattedLines = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;
      if (line.length < 100 && line === line.toUpperCase() && !line.endsWith(".") && !line.endsWith(",") && !line.match(/\d/)) {
        formattedLines.push(`<h3>${line}</h3>`);
      } else if (line.length < 150 && line[0] === line[0].toUpperCase() && !line.endsWith(".") && !line.endsWith(",")) {
        formattedLines.push(`<h4>${line}</h4>`);
      } else {
        let sentences = line.split(". ");
        for (let j = 0; j < sentences.length; j++) {
          let sentence = sentences[j].trim();
          if (sentence) {
            if (!sentence.endsWith(".") && j < sentences.length - 1) {
              sentence += ".";
            }
            formattedLines.push(`<p>${sentence}</p>`);
          }
        }
      }
    }
    return formattedLines.join("\n");
  }
}
function initPreview2() {
  const titleInput = document.getElementById("lecture-title");
  const descInput = document.getElementById("lecture-desc");
  const durationInput = document.getElementById("lecture-duration");
  const orderInput = document.getElementById("lecture-order");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const previewDuration = document.getElementById("preview-duration");
  const previewOrder = document.getElementById("preview-order");
  if (titleInput && previewTitle) {
    titleInput.addEventListener("input", function() {
      previewTitle.textContent = this.value || "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438";
    });
  }
  if (descInput && previewDesc) {
    descInput.addEventListener("input", function() {
      previewDesc.textContent = this.value || "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
    });
  }
  if (durationInput && previewDuration) {
    durationInput.addEventListener("input", function() {
      if (this.value) {
        previewDuration.textContent = `\u0412\u0440\u0435\u043C\u044F: ${this.value} \u043C\u0438\u043D.`;
      } else {
        previewDuration.textContent = "\u0412\u0440\u0435\u043C\u044F: -";
      }
    });
  }
  if (orderInput && previewOrder) {
    orderInput.addEventListener("input", function() {
      if (this.value) {
        previewOrder.textContent = `\u041F\u043E\u0440\u044F\u0434\u043E\u043A: ${this.value}`;
      } else {
        previewOrder.textContent = "\u041F\u043E\u0440\u044F\u0434\u043E\u043A: -";
      }
    });
  }
}
function validateForm2() {
  const title = document.getElementById("lecture-title").value.trim();
  const description = document.getElementById("lecture-desc").value.trim();
  const duration = document.getElementById("lecture-duration").value;
  const order = document.getElementById("lecture-order").value;
  const content = document.getElementById("lecture-text").value.trim();
  if (!title) {
    showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438", "error", 4e3);
    return false;
  }
  if (!description) {
    showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438", "error", 4e3);
    return false;
  }
  if (!duration || duration < 1) {
    showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0443\u044E \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043B\u0435\u043A\u0446\u0438\u0438", "error", 4e3);
    return false;
  }
  if (!order || order < 1) {
    showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043A\u043E\u0432\u044B\u0439 \u043D\u043E\u043C\u0435\u0440", "error", 4e3);
    return false;
  }
  if (!content || content === "<p>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438 \u0437\u0434\u0435\u0441\u044C...</p><p>\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u0441\u043F\u0438\u0441\u043A\u0438, \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 \u043A\u043E\u0434.</p>") {
    showToast5("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438", "error", 4e3);
    return false;
  }
  return true;
}
function resetForm2() {
  const form = document.getElementById("lecture-form");
  const editorContent = document.getElementById("lecture-content");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const previewDuration = document.getElementById("preview-duration");
  const previewOrder = document.getElementById("preview-order");
  if (form) form.reset();
  if (editorContent) editorContent.innerHTML = "<p>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438 \u0437\u0434\u0435\u0441\u044C...</p><p>\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u0441\u043F\u0438\u0441\u043A\u0438, \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 \u043A\u043E\u0434.</p>";
  if (previewTitle) previewTitle.textContent = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438";
  if (previewDesc) previewDesc.textContent = "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043B\u0435\u043A\u0446\u0438\u0438 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
  if (previewDuration) previewDuration.textContent = "\u0412\u0440\u0435\u043C\u044F: -";
  if (previewOrder) previewOrder.textContent = "\u041F\u043E\u0440\u044F\u0434\u043E\u043A: -";
  const uploadOption = document.querySelector('.video-option[data-type="upload"]');
  if (uploadOption) uploadOption.click();
}
function loadDraft2() {
  const draft = localStorage.getItem("lectureDraft");
  if (draft) {
    try {
      const formData = JSON.parse(draft);
      document.getElementById("lecture-title").value = formData.title || "";
      document.getElementById("lecture-desc").value = formData.description || "";
      document.getElementById("lecture-duration").value = formData.duration || "";
      document.getElementById("lecture-order").value = formData.order || "";
      document.getElementById("lecture-text").value = formData.content || "";
      const editorContent = document.getElementById("lecture-content");
      if (editorContent && formData.content) {
        editorContent.innerHTML = formData.content;
      }
      if (formData.videoType === "youtube") {
        const youtubeOption = document.querySelector('.video-option[data-type="youtube"]');
        if (youtubeOption) youtubeOption.click();
        document.getElementById("youtube-url").value = formData.youtubeUrl || "";
      }
      initPreview2();
      console.log("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D");
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430:", error);
    }
  }
}
function initFormSubmission2() {
  const form = document.getElementById("lecture-form");
  const saveDraftBtn = document.querySelector(".form-actions .btn-light");
  if (form) {
    form.setAttribute("novalidate", "novalidate");
  }
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", function(e) {
      e.preventDefault();
      const formData = {
        title: document.getElementById("lecture-title").value,
        description: document.getElementById("lecture-desc").value,
        duration: document.getElementById("lecture-duration").value,
        order: document.getElementById("lecture-order").value,
        videoType: document.getElementById("video-type").value,
        content: document.getElementById("lecture-text").value,
        youtubeUrl: document.getElementById("youtube-url").value || "",
        videoFile: document.getElementById("lecture-video").files[0] ? "\u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E" : null
      };
      localStorage.setItem("lectureDraft", JSON.stringify(formData));
      showToast5("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D!", "success", 3e3);
    });
  }
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (!validateForm2()) {
        return;
      }
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435...';
      submitBtn.disabled = true;
      setTimeout(() => {
        showToast5("\u041B\u0435\u043A\u0446\u0438\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430!", "success", 5e3);
        resetForm2();
        localStorage.removeItem("lectureDraft");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2e3);
    });
  }
  loadDraft2();
}
function initMaterialsPanel() {
  const materialsList = document.querySelector(".materials-list");
  const addMaterialBtn = document.querySelector("#materials-panel .btn-light");
  if (!materialsList || !addMaterialBtn) return;
  materialsList.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-danger") || e.target.closest(".btn-danger")) {
      const materialItem = e.target.closest(".material-item");
      if (materialItem) {
        if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B?")) {
          materialItem.remove();
        }
      }
    }
    if (e.target.classList.contains("btn-light") || e.target.closest(".btn-light")) {
      const materialItem = e.target.closest(".material-item");
      if (materialItem) {
        showToast5("\u0424\u0443\u043D\u043A\u0446\u0438\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u0432 \u0431\u0443\u0434\u0443\u0449\u0435\u043C", "info", 3e3);
      }
    }
  });
  addMaterialBtn.addEventListener("click", function() {
    const newMaterial = document.createElement("div");
    newMaterial.className = "material-item";
    newMaterial.innerHTML = `
            <div class="material-icon">
                <i class="far fa-file-pdf"></i>
            </div>
            <div class="material-info">
                <div class="material-title">\u041D\u043E\u0432\u044B\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B</div>
                <div class="material-meta">PDF \u2022 0 MB</div>
            </div>
            <div class="material-actions">
                <button type="button" class="btn btn-small btn-light">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>
                <button type="button" class="btn btn-small btn-danger">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
            </div>
        `;
    materialsList.appendChild(newMaterial);
    showToast5("\u041D\u043E\u0432\u044B\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D. \u0412 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438 \u0437\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u0430\u0439\u043B\u0430.", "info", 4e3);
  });
}
function addEditorStyles() {
  const editorStyles = `
        .editor-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            align-items: center;
            justify-content: center;
        }
        
        .editor-modal .modal-content {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .editor-modal h3 {
            margin-bottom: 20px;
            color: var(--primary);
            text-align: center;
        }
        
        .editor-modal .form-group {
            margin-bottom: 20px;
        }
        
        .editor-modal label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: var(--primary);
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .image-source-tabs {
            display: flex;
            border-bottom: 1px solid #ddd;
            margin-bottom: 15px;
        }
        
        .source-tab {
            padding: 10px 20px;
            background: none;
            border: none;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
            color: var(--secondary);
        }
        
        .source-tab.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
            font-weight: bold;
        }
        
        .source-panel {
            display: none;
        }
        
        .source-panel.active {
            display: block;
        }
        
        #lecture-content pre {
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin: 10px 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        #lecture-content code {
            background: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        
        #lecture-content pre code {
            background: none;
            padding: 0;
        }
        
        #lecture-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 10px 0;
        }
        
        #lecture-content a {
            color: var(--accent);
            text-decoration: underline;
        }
        
        #lecture-content ul, #lecture-content ol {
            margin: 10px 0;
            padding-left: 30px;
        }
        
        #lecture-content li {
            margin: 5px 0;
        }
        
        .import-status {
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            font-size: 0.9em;
        }
        
        .import-status.info {
            background-color: #e3f2fd;
            color: #1565c0;
            border: 1px solid #bbdefb;
        }
        
        .import-status.success {
            background-color: #e8f5e9;
            color: #2e7d32;
            border: 1px solid #c8e6c9;
        }
        
        .import-status.error {
            background-color: #ffebee;
            color: #c62828;
            border: 1px solid #ffcdd2;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background-color: #f0f0f0;
            border-radius: 3px;
            margin: 10px 0;
            overflow: hidden;
            display: none;
        }
        
        .progress {
            height: 100%;
            background: linear-gradient(90deg, var(--accent), var(--primary));
            border-radius: 3px;
            transition: width 0.3s ease;
            width: 0%;
        }
        
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        }
        
        .toast {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-left: 4px solid;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .toast.hide {
            transform: translateX(400px);
            opacity: 0;
        }
        
        .toast-success {
            border-left-color: #10b981;
        }
        
        .toast-error {
            border-left-color: #ef4444;
        }
        
        .toast-warning {
            border-left-color: #f59e0b;
        }
        
        .toast-info {
            border-left-color: #3b82f6;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            padding: 16px;
            position: relative;
        }
        
        .toast-icon {
            margin-right: 12px;
            font-size: 1.5em;
            flex-shrink: 0;
        }
        
        .toast-success .toast-icon {
            color: #10b981;
        }
        
        .toast-error .toast-icon {
            color: #ef4444;
        }
        
        .toast-warning .toast-icon {
            color: #f59e0b;
        }
        
        .toast-info .toast-icon {
            color: #3b82f6;
        }
        
        .toast-message {
            flex: 1;
            font-weight: 500;
            color: #374151;
            font-size: 0.95em;
            line-height: 1.4;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px;
            margin-left: 8px;
            border-radius: 4px;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        .toast-close:hover {
            background: #f3f4f6;
            color: #6b7280;
        }
        
        .toast-progress {
            height: 3px;
            width: 100%;
            background: rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .toast-progress::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transform-origin: left;
            animation: progress linear;
        }
        
        .toast-success .toast-progress::before {
            background: linear-gradient(90deg, #10b981, #34d399);
        }
        
        .toast-error .toast-progress::before {
            background: linear-gradient(90deg, #ef4444, #f87171);
        }
        
        .toast-warning .toast-progress::before {
            background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }
        
        .toast-info .toast-progress::before {
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        
        @keyframes progress {
            0% {
                transform: scaleX(1);
            }
            100% {
                transform: scaleX(0);
            }
        }
        
        .fa-spin {
            animation: fa-spin 1s infinite linear;
        }
        
        @keyframes fa-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @media (max-width: 768px) {
            .toast-container {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .toast {
                transform: translateY(-100px);
            }
            
            .toast.show {
                transform: translateY(0);
            }
            
            .toast.hide {
                transform: translateY(-100px);
            }
        }
    `;
  if (!document.querySelector("#editor-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "editor-styles";
    styleSheet.textContent = editorStyles;
    document.head.appendChild(styleSheet);
  }
}
var init_course_editor = __esm({
  "static/js/modules/course-editor.js"() {
    if (typeof pdfjsLib !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
    }
  }
});

// static/js/modules/courses.js
function initCoursePages() {
  const currentPath = window.location.pathname;
  if (currentPath.includes("courses.html")) {
    initCoursesPage();
  } else if (currentPath.includes("courses-list.html")) {
    initCoursesListPage();
  } else if (currentPath.includes("courses-detail.html")) {
    initCourseDetailPage();
  } else if (currentPath.includes("create-courses.html")) {
    initCreateCoursePage();
  }
}
function initCoursesPage() {
  console.log("Initialized courses page");
}
function initCoursesListPage() {
  console.log("Initialized courses list page");
}
function initCourseDetailPage() {
  document.addEventListener("DOMContentLoaded", function() {
    const video = document.querySelector("iframe");
    if (video) {
      video.addEventListener("load", function() {
        console.log("\u0412\u0438\u0434\u0435\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E, \u043B\u0435\u043A\u0446\u0438\u044F \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u0430 \u043A\u0430\u043A \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u0430\u044F");
      });
    }
  });
}
function initCreateCoursePage() {
  const titleInput = document.getElementById("course-title");
  const descInput = document.getElementById("course-short-desc");
  const levelSelect = document.getElementById("course-level");
  const durationInput = document.getElementById("course-duration");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const previewLevel = document.getElementById("preview-level");
  const previewDuration = document.getElementById("preview-duration");
  if (titleInput && previewTitle) {
    titleInput.addEventListener("input", function() {
      previewTitle.textContent = this.value || "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430";
    });
  }
  if (descInput && previewDesc) {
    descInput.addEventListener("input", function() {
      previewDesc.textContent = this.value || "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
    });
  }
  if (levelSelect && previewLevel) {
    levelSelect.addEventListener("change", function() {
      const levelText = this.options[this.selectedIndex].text;
      previewLevel.textContent = `\u0423\u0440\u043E\u0432\u0435\u043D\u044C: ${levelText || "-"}`;
    });
  }
  if (durationInput && previewDuration) {
    durationInput.addEventListener("input", function() {
      previewDuration.textContent = `\u0427\u0430\u0441\u043E\u0432: ${this.value || "-"}`;
    });
  }
  const imageInput = document.getElementById("course-image");
  const previewImage = document.querySelector(".preview-image");
  if (imageInput && previewImage) {
    imageInput.addEventListener("change", function(e) {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e2) {
          previewImage.innerHTML = "";
          const img = document.createElement("img");
          img.src = e2.target.result;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          img.style.borderRadius = "8px";
          previewImage.appendChild(img);
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }
  const form = document.getElementById("course-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("\u041A\u0443\u0440\u0441 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044E!");
      if (previewTitle) previewTitle.textContent = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430";
      if (previewDesc) previewDesc.textContent = "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";
      if (previewLevel) previewLevel.textContent = "\u0423\u0440\u043E\u0432\u0435\u043D\u044C: -";
      if (previewDuration) previewDuration.textContent = "\u0427\u0430\u0441\u043E\u0432: -";
      if (previewImage) previewImage.innerHTML = '<i class="fas fa-book"></i>';
    });
  }
}
var init_courses = __esm({
  "static/js/modules/courses.js"() {
  }
});

// static/js/pages/course-pages.js
function initCoursesModule() {
  const currentPath = window.location.pathname;
  console.log('\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043C\u043E\u0434\u0443\u043B\u044F "\u041A\u0443\u0440\u0441\u044B":', currentPath);
  initCoursePages();
  if (currentPath.includes("create-courses.html") || document.getElementById("course-form")) {
    console.log("\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043A\u0443\u0440\u0441\u0430");
    initCourseCreation();
    initCourseManagement();
  }
  if (currentPath.includes("create-course-detail.html")) {
    console.log("\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u043A\u0443\u0440\u0441\u0435");
    initCreateCourseDetailPage();
    initCourseDetailManagement();
  }
  if (currentPath.includes("course-management.html") || currentPath.includes("courses.html") && document.querySelector(".module-card")) {
    console.log("\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0443\u0440\u0441\u043E\u043C");
    initCourseManagement();
  }
  initSpecificCourseComponents();
}
function initSpecificCourseComponents() {
  if (document.getElementById("course-form")) {
    initCourseCreation();
  }
  if (document.querySelector(".module-card") || document.querySelector(".add-module-btn")) {
    initCourseManagement();
  }
  if (document.getElementById("lecture-content") || document.querySelector(".content-tabs")) {
    initCreateCourseDetailPage();
  }
  if (document.querySelector(".materials-list") || document.querySelector(".add-lesson-btn")) {
    initCourseDetailManagement();
  }
}
function createCourseModule(title, description, type = "theory") {
  return {
    id: Date.now(),
    title,
    description,
    type,
    lessons: [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function createCourseLesson(title, type = "lecture", content = "") {
  return {
    id: Date.now(),
    title,
    type,
    content,
    duration: 0,
    order: 0,
    materials: [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
var CourseUtils;
var init_course_pages = __esm({
  "static/js/pages/course-pages.js"() {
    init_course_creation();
    init_course_detail_management();
    init_course_management();
    init_course_editor();
    init_courses();
    CourseUtils = {
      formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
          return mins > 0 ? `${hours}\u0447 ${mins}\u043C` : `${hours}\u0447`;
        }
        return `${mins}\u043C`;
      },
      getLevelText(level) {
        const levels = {
          beginner: "\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0439",
          intermediate: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439",
          advanced: "\u041F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439"
        };
        return levels[level] || "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D";
      },
      getLessonTypeText(type) {
        const types = {
          lecture: "\u041B\u0435\u043A\u0446\u0438\u044F",
          test: "\u0422\u0435\u0441\u0442",
          practice: "\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430"
        };
        return types[type] || "\u041B\u0435\u043A\u0446\u0438\u044F";
      },
      isValidYouTubeUrl(url) {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        return regex.test(url);
      },
      extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
      }
    };
    if (typeof window !== "undefined") {
      window.CourseUtils = CourseUtils;
      window.createCourseModule = createCourseModule;
      window.createCourseLesson = createCourseLesson;
    }
  }
});

// static/js/modules/toast.js
function initToastSystem3() {
  if (!document.querySelector(".toast-container")) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  } else {
    toastContainer = document.querySelector(".toast-container");
  }
}
function showToast6(message, type = "success", title = "", duration = 4e3) {
  if (!toastContainer) initToastSystem3();
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icons = {
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-triangle",
    error: "fas fa-times-circle",
    info: "fas fa-info-circle"
  };
  toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ""}
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  if (duration > 0) {
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  return toast;
}
var toastContainer;
var init_toast = __esm({
  "static/js/modules/toast.js"() {
  }
});

// static/js/modules/practic-execution.js
var practic_execution_exports = {};
__export(practic_execution_exports, {
  initFileAttachment: () => initFileAttachment,
  initPracticExecution: () => initPracticExecution2
});
function initPracticExecution2() {
  const codeInput = document.getElementById("code-input");
  const runBtn = document.getElementById("run-btn");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const hintBtn = document.getElementById("hint-btn");
  const resultsSection = document.getElementById("results");
  const outputDisplay = document.getElementById("output-display");
  const feedbackText = document.getElementById("feedback-text");
  const resultStatus = document.getElementById("result-status");
  const nextTaskBtn = document.getElementById("next-task-btn");
  const tryAgainBtn = document.getElementById("try-again-btn");
  const fileManager = initFileAttachment();
  const defaultCode = `# \u0412\u0430\u0448 \u043A\u043E\u0434 \u0437\u0434\u0435\u0441\u044C
name = "\u0410\u043D\u043D\u0430"
age = 20
height = 1.65
is_student = True

# \u0412\u044B\u0432\u043E\u0434 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430
print(f"\u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 {name}, \u043C\u043D\u0435 {age} \u043B\u0435\u0442, \u043C\u043E\u0439 \u0440\u043E\u0441\u0442 {height} \u043C, \u0441\u0442\u0443\u0434\u0435\u043D\u0442: {is_student}")`;
  runBtn?.addEventListener("click", function() {
    const code = codeInput?.value;
    if (!code || code.trim() === defaultCode.trim()) {
      showToast6("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u043A\u043E\u0434 \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C", "warning", "\u041A\u043E\u0434 \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D");
      return;
    }
    resultsSection?.classList.add("active");
    if (outputDisplay) outputDisplay.textContent = "\u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 \u0410\u043D\u043D\u0430, \u043C\u043D\u0435 20 \u043B\u0435\u0442, \u043C\u043E\u0439 \u0440\u043E\u0441\u0442 1.65 \u043C, \u0441\u0442\u0443\u0434\u0435\u043D\u0442: True";
    if (feedbackText) feedbackText.textContent = "\u041A\u043E\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E! \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u044B\u0432\u043E\u0434 \u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C \u0437\u0430\u0434\u0430\u043D\u0438\u044F.";
    if (resultStatus) {
      resultStatus.textContent = "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E";
      resultStatus.className = "result-status status-success";
    }
    const submittedFiles = document.getElementById("submitted-files");
    if (submittedFiles) submittedFiles.innerHTML = "";
    resultsSection?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const fadeElements = resultsSection?.querySelectorAll(".fade-in");
      fadeElements?.forEach((element) => {
        element.classList.add("visible");
      });
    }, 100);
    showToast6("\u041A\u043E\u0434 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D", "success", "\u0417\u0430\u043F\u0443\u0441\u043A");
  });
  submitBtn?.addEventListener("click", function() {
    const code = codeInput?.value;
    fileManager.syncFiles();
    const attachedFiles = fileManager.getAttachedFiles();
    console.log("\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0440\u0435\u0448\u0435\u043D\u0438\u044F. \u0424\u0430\u0439\u043B\u044B:", attachedFiles);
    if (!code || code.trim() === defaultCode.trim()) {
      showToast6("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u043E\u0439", "warning", "\u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442");
      return;
    }
    resultsSection?.classList.add("active");
    resultsSection?.scrollIntoView({ behavior: "smooth" });
    const now = /* @__PURE__ */ new Date();
    const submissionTimeElement = document.getElementById("submission-time");
    if (submissionTimeElement) {
      submissionTimeElement.textContent = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    }
    const submittedFiles = document.getElementById("submitted-files");
    if (submittedFiles) {
      if (attachedFiles.length > 0) {
        let filesHtml = '<div class="submitted-files-title"><strong>\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B:</strong></div>';
        attachedFiles.forEach((file) => {
          const fileIcon = getFileIcon(file.name);
          const fileSize = formatFileSize(file.size);
          filesHtml += `
                        <div class="submitted-file-item">
                            <i class="fas ${fileIcon}"></i>
                            <span>${file.name}</span>
                            <small>(${fileSize})</small>
                        </div>
                    `;
        });
        submittedFiles.innerHTML = filesHtml;
      } else {
        submittedFiles.innerHTML = '<div class="submitted-files-title">\u0424\u0430\u0439\u043B\u044B \u043D\u0435 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u044B</div>';
      }
    }
    if (outputDisplay) outputDisplay.textContent = code;
    if (feedbackText) {
      feedbackText.textContent = "\u0412\u0430\u0448\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443. \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0431\u0443\u0434\u0443\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0435\u043C.";
    }
    if (resultStatus) {
      resultStatus.textContent = "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E";
      resultStatus.className = "result-status status-success";
    }
    setTimeout(() => {
      const fadeElements = resultsSection?.querySelectorAll(".fade-in");
      fadeElements?.forEach((element) => {
        element.classList.add("visible");
      });
    }, 100);
    console.log("\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0437\u0430\u0434\u0430\u043D\u0438\u044F:", {
      code,
      files: attachedFiles
    });
    showToast6("\u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443!", "success", "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E");
    fileManager.clearAttachedFiles();
  });
  resetBtn?.addEventListener("click", function() {
    const confirmToast = showToast6(
      "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0441\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043A\u043E\u0434 \u043A \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C\u0443 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044E?",
      "warning",
      "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0441\u0431\u0440\u043E\u0441\u0430",
      0
    );
    confirmToast.querySelector(".toast-close").remove();
    const toastActions = document.createElement("div");
    toastActions.className = "toast-actions";
    toastActions.style.marginTop = "10px";
    toastActions.style.display = "flex";
    toastActions.style.gap = "8px";
    toastActions.style.justifyContent = "flex-end";
    toastActions.innerHTML = `
            <button class="btn btn-danger btn-small confirm-reset">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C</button>
            <button class="btn btn-light btn-small cancel-reset">\u041E\u0442\u043C\u0435\u043D\u0430</button>
        `;
    const toastContent = confirmToast.querySelector(".toast-content");
    toastContent.appendChild(toastActions);
    confirmToast.querySelector(".confirm-reset").addEventListener("click", function() {
      if (codeInput) codeInput.value = defaultCode;
      showToast6("\u041A\u043E\u0434 \u0441\u0431\u0440\u043E\u0448\u0435\u043D \u043A \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C\u0443 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044E", "info", "\u0421\u0431\u0440\u043E\u0441");
      confirmToast.remove();
    });
    confirmToast.querySelector(".cancel-reset").addEventListener("click", function() {
      confirmToast.remove();
    });
  });
  hintBtn?.addEventListener("click", function() {
    showToast6('\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 f-\u0441\u0442\u0440\u043E\u043A\u0438 \u0434\u043B\u044F \u0444\u043E\u0440\u043C\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u044B\u0432\u043E\u0434\u0430. \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: print(f"\u0422\u0435\u043A\u0441\u0442 {\u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F} \u0442\u0435\u043A\u0441\u0442")', "info", "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430");
  });
  nextTaskBtn?.addEventListener("click", function() {
    showToast6("\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u043A \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C\u0443 \u0437\u0430\u0434\u0430\u043D\u0438\u044E...", "info", "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u0435");
  });
  tryAgainBtn?.addEventListener("click", function() {
    resultsSection?.classList.remove("active");
    const fadeElements = resultsSection?.querySelectorAll(".fade-in");
    fadeElements?.forEach((element) => {
      element.classList.remove("visible");
    });
    codeInput?.focus();
    showToast6("\u041C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0440\u0435\u0448\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u043D\u0438\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437", "info", "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430");
  });
  let saveTimeout;
  codeInput?.addEventListener("input", function() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      localStorage.setItem("practic_code_autosave", this.value);
    }, 1e3);
  });
  const savedCode = localStorage.getItem("practic_code_autosave");
  if (savedCode && codeInput) {
    const restoreToast = showToast6(
      "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0430\u0432\u0442\u043E\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435. \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C?",
      "info",
      "\u0410\u0432\u0442\u043E\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435",
      5e3
    );
    restoreToast.querySelector(".toast-close").remove();
    const toastActions = document.createElement("div");
    toastActions.className = "toast-actions";
    toastActions.style.marginTop = "10px";
    toastActions.style.display = "flex";
    toastActions.style.gap = "8px";
    toastActions.style.justifyContent = "flex-end";
    toastActions.innerHTML = `
            <button class="btn btn-success btn-small confirm-restore">\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C</button>
            <button class="btn btn-light btn-small cancel-restore">\u041E\u0442\u043C\u0435\u043D\u0430</button>
        `;
    const toastContent = restoreToast.querySelector(".toast-content");
    toastContent.appendChild(toastActions);
    restoreToast.querySelector(".confirm-restore").addEventListener("click", function() {
      codeInput.value = savedCode;
      showToast6("\u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "success", "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E");
      restoreToast.remove();
    });
    restoreToast.querySelector(".cancel-restore").addEventListener("click", function() {
      localStorage.removeItem("practic_code_autosave");
      showToast6("\u0410\u0432\u0442\u043E\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u043E", "info", "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E");
      restoreToast.remove();
    });
  }
}
function initFileAttachment() {
  const attachFileBtn = document.getElementById("attach-file-btn");
  const fileAttachmentSection = document.getElementById("file-attachment-section");
  const fileInput = document.getElementById("file-input");
  const fileList = document.getElementById("file-list");
  const hideAttachmentsBtn = document.getElementById("hide-attachments-btn");
  const saveAttachmentsBtn = document.getElementById("save-attachments-btn");
  const fileUploadLabel = document.querySelector(".file-upload-label");
  const fileLabelText = document.getElementById("file-label-text");
  let attachedFiles = [];
  try {
    const storedFiles = localStorage.getItem("practic_attached_files");
    if (storedFiles) {
      attachedFiles = JSON.parse(storedFiles);
      if (!Array.isArray(attachedFiles)) {
        attachedFiles = [];
      }
    }
  } catch (e) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0444\u0430\u0439\u043B\u043E\u0432 \u0438\u0437 localStorage:", e);
    attachedFiles = [];
  }
  attachedFiles = attachedFiles.map((file) => {
    if (!file.extension) {
      file.extension = getFileExtension(file.name);
    }
    return file;
  });
  attachFileBtn?.addEventListener("click", function() {
    fileAttachmentSection?.classList.toggle("active");
    if (fileAttachmentSection?.classList.contains("active")) {
      renderFileList();
    }
  });
  hideAttachmentsBtn?.addEventListener("click", function() {
    fileAttachmentSection?.classList.remove("active");
  });
  if (fileUploadLabel) {
    let preventDefaults = function(e) {
      e.preventDefault();
      e.stopPropagation();
    }, highlight = function() {
      fileUploadLabel.classList.add("drag-over");
    }, unhighlight = function() {
      fileUploadLabel.classList.remove("drag-over");
    }, handleDrop2 = function(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    };
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      fileUploadLabel.addEventListener(eventName, preventDefaults, false);
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      fileUploadLabel.addEventListener(eventName, highlight, false);
    });
    ["dragleave", "drop"].forEach((eventName) => {
      fileUploadLabel.addEventListener(eventName, unhighlight, false);
    });
    fileUploadLabel.addEventListener("drop", handleDrop2, false);
  }
  fileInput?.addEventListener("change", function(e) {
    handleFiles(e.target.files);
    fileInput.value = "";
  });
  function handleFiles(files) {
    const fileArray = Array.from(files);
    let filesAdded = 0;
    fileArray.forEach((file) => {
      if (attachedFiles.length >= 5) {
        showToast6("\u041C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 5 \u0444\u0430\u0439\u043B\u043E\u0432", "warning", "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showToast6(`\u0424\u0430\u0439\u043B "${file.name}" \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439. \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: 10 MB`, "warning", "\u0411\u043E\u043B\u044C\u0448\u043E\u0439 \u0444\u0430\u0439\u043B");
        return;
      }
      const allowedTypes = [".pdf", ".doc", ".docx", ".txt", ".py", ".jpg", ".jpeg", ".png", ".zip"];
      const fileExtension = getFileExtension(file.name);
      if (!allowedTypes.includes(fileExtension)) {
        showToast6(`\u0424\u0430\u0439\u043B "${file.name}" \u0438\u043C\u0435\u0435\u0442 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442`, "warning", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442");
        return;
      }
      const isDuplicate = attachedFiles.some(
        (f) => f.name === file.name && f.size === file.size
      );
      if (isDuplicate) {
        showToast6(`\u0424\u0430\u0439\u043B "${file.name}" \u0443\u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D`, "warning", "\u0414\u0443\u0431\u043B\u0438\u043A\u0430\u0442");
        return;
      }
      attachedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        extension: fileExtension,
        lastModified: file.lastModified,
        // Добавляем временную метку для уникальности
        id: Date.now() + Math.random()
      });
      filesAdded++;
    });
    if (filesAdded > 0) {
      saveFilesToStorage();
      renderFileList();
      updateFileLabel();
      showToast6(`\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ${filesAdded} \u0444\u0430\u0439\u043B(\u043E\u0432)`, "success", "\u0424\u0430\u0439\u043B\u044B \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B");
      console.log("\u0424\u0430\u0439\u043B\u044B \u043F\u043E\u0441\u043B\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F:", attachedFiles);
      console.log("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u0432 localStorage:", localStorage.getItem("practic_attached_files"));
    }
  }
  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = "";
    if (attachedFiles.length === 0) {
      fileList.innerHTML = `
                <div class="file-item" style="text-align: center; color: #6c757d;">
                    <i class="fas fa-folder-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                    <div>\u0424\u0430\u0439\u043B\u044B \u043D\u0435 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u044B</div>
                </div>
            `;
      return;
    }
    attachedFiles.forEach((file, index) => {
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";
      const fileSize = formatFileSize(file.size);
      const fileIcon = getFileIcon(file.name);
      const displayExtension = file.extension ? file.extension.replace(".", "").toUpperCase() : "FILE";
      fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas ${fileIcon} file-icon"></i>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-meta">
                            <span class="file-size">${fileSize}</span>
                            <span class="file-type">${displayExtension}</span>
                        </div>
                    </div>
                </div>
                <button class="file-remove" data-index="${index}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u0430\u0439\u043B">
                    <i class="fas fa-times"></i>
                </button>
            `;
      fileList.appendChild(fileItem);
    });
    document.querySelectorAll(".file-remove").forEach((btn) => {
      btn.addEventListener("click", function() {
        const index = parseInt(this.getAttribute("data-index"));
        if (index >= 0 && index < attachedFiles.length) {
          const fileName = attachedFiles[index].name;
          attachedFiles.splice(index, 1);
          saveFilesToStorage();
          renderFileList();
          updateFileLabel();
          showToast6(`\u0424\u0430\u0439\u043B "${fileName}" \u0443\u0434\u0430\u043B\u0435\u043D`, "info", "\u0424\u0430\u0439\u043B \u0443\u0434\u0430\u043B\u0435\u043D");
        }
      });
    });
  }
  function updateFileLabel() {
    if (fileLabelText) {
      fileLabelText.textContent = attachedFiles.length > 0 ? `\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E \u0444\u0430\u0439\u043B\u043E\u0432: ${attachedFiles.length}` : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0440\u0435\u0448\u0435\u043D\u0438\u044F";
    }
  }
  saveAttachmentsBtn?.addEventListener("click", function() {
    console.log("\u041D\u0430\u0436\u0430\u0442\u0430 \u043A\u043D\u043E\u043F\u043A\u0430 \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B. attachedFiles:", attachedFiles);
    const storedFiles = getStoredFiles();
    const totalFiles = attachedFiles.length > 0 ? attachedFiles.length : storedFiles.length;
    if (totalFiles === 0) {
      showToast6("\u041D\u0435\u0442 \u0444\u0430\u0439\u043B\u043E\u0432 \u0434\u043B\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F", "warning", "\u0424\u0430\u0439\u043B\u044B");
      return;
    }
    if (attachedFiles.length === 0 && storedFiles.length > 0) {
      attachedFiles = storedFiles;
      saveFilesToStorage();
      renderFileList();
      updateFileLabel();
    }
    showToast6(`\u0424\u0430\u0439\u043B\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B (${attachedFiles.length} \u0444\u0430\u0439\u043B(\u043E\u0432))`, "success", "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
    fileAttachmentSection?.classList.remove("active");
  });
  function saveFilesToStorage() {
    try {
      localStorage.setItem("practic_attached_files", JSON.stringify(attachedFiles));
      console.log("\u0424\u0430\u0439\u043B\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B \u0432 localStorage:", attachedFiles);
    } catch (e) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432 \u0432 localStorage:", e);
      showToast6("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432", "error", "\u041E\u0448\u0438\u0431\u043A\u0430");
    }
  }
  function getStoredFiles() {
    try {
      const stored = localStorage.getItem("practic_attached_files");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432 \u0438\u0437 localStorage:", e);
      return [];
    }
  }
  renderFileList();
  updateFileLabel();
  console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432\u043E\u0433\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430. attachedFiles:", attachedFiles);
  console.log("\u0424\u0430\u0439\u043B\u044B \u0432 localStorage:", getStoredFiles());
  return {
    getAttachedFiles: () => [...attachedFiles],
    // возвращаем копию массива
    clearAttachedFiles: () => {
      attachedFiles = [];
      localStorage.removeItem("practic_attached_files");
      renderFileList();
      updateFileLabel();
      showToast6("\u0412\u0441\u0435 \u0444\u0430\u0439\u043B\u044B \u0443\u0434\u0430\u043B\u0435\u043D\u044B", "info", "\u041E\u0447\u0438\u0441\u0442\u043A\u0430");
    },
    // Добавляем метод для принудительной синхронизации
    syncFiles: () => {
      const stored = getStoredFiles();
      if (stored.length !== attachedFiles.length) {
        attachedFiles = stored;
        renderFileList();
        updateFileLabel();
      }
    }
  };
}
function getFileExtension(filename) {
  if (!filename) return "";
  const parts = filename.split(".");
  return parts.length > 1 ? "." + parts.pop().toLowerCase() : "";
}
function getFileIcon(filename) {
  const extension = getFileExtension(filename);
  switch (extension) {
    case ".pdf":
      return "fa-file-pdf";
    case ".doc":
    case ".docx":
      return "fa-file-word";
    case ".txt":
      return "fa-file-alt";
    case ".py":
      return "fa-file-code";
    case ".jpg":
    case ".jpeg":
    case ".png":
      return "fa-file-image";
    case ".zip":
      return "fa-file-archive";
    default:
      return "fa-file";
  }
}
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
var init_practic_execution = __esm({
  "static/js/modules/practic-execution.js"() {
    init_toast();
  }
});

// static/js/modules/practic-review.js
function initPracticReview() {
  const reviewModal = document.getElementById("review-modal");
  const openReviewButtons = document.querySelectorAll(".open-review");
  const closeModalButton = document.getElementById("close-modal");
  const cancelReviewButton = document.getElementById("cancel-review");
  const gradeOptions = document.querySelectorAll(".grade-option");
  const submitReviewButton = document.getElementById("submit-review");
  const saveDraftButton = document.getElementById("save-draft");
  openReviewButtons.forEach((button) => {
    button.addEventListener("click", function() {
      reviewModal?.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
  function closeModal() {
    reviewModal?.classList.remove("active");
    document.body.style.overflow = "auto";
  }
  closeModalButton?.addEventListener("click", closeModal);
  cancelReviewButton?.addEventListener("click", closeModal);
  reviewModal?.addEventListener("click", function(e) {
    if (e.target === reviewModal) {
      closeModal();
    }
  });
  gradeOptions.forEach((option) => {
    option.addEventListener("click", function() {
      gradeOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
  submitReviewButton?.addEventListener("click", function() {
    const selectedGrade = document.querySelector(".grade-option.selected");
    if (!selectedGrade) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443");
      return;
    }
    const gradeValue = selectedGrade.getAttribute("data-value");
    const comment = document.getElementById("review-comment")?.value;
    alert(`\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E! \u041E\u0446\u0435\u043D\u043A\u0430: ${gradeValue}/5`);
    closeModal();
    const card = document.querySelector(".submission-card.pending");
    if (card) {
      card.classList.remove("pending");
      card.classList.add("reviewed");
      const statusElement = card.querySelector(".submission-status");
      if (statusElement) {
        statusElement.textContent = "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E";
        statusElement.className = "submission-status status-reviewed";
      }
      const actions = card.querySelector(".submission-actions");
      if (actions) {
        actions.innerHTML = `
                    <button class="btn btn-light btn-small">
                        <i class="fas fa-eye"></i> \u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C
                    </button>
                    <button class="btn btn-success btn-small">
                        <i class="fas fa-check"></i> \u041E\u0446\u0435\u043D\u043A\u0430: ${gradeValue}/5
                    </button>
                `;
      }
    }
  });
  saveDraftButton?.addEventListener("click", function() {
    alert("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D");
  });
  const filters = document.querySelectorAll(".filter-select");
  filters.forEach((filter) => {
    filter.addEventListener("change", function() {
      console.log("\u0424\u0438\u043B\u044C\u0442\u0440 \u0438\u0437\u043C\u0435\u043D\u0435\u043D:", this.id, this.value);
    });
  });
}
var init_practic_review = __esm({
  "static/js/modules/practic-review.js"() {
  }
});

// static/js/modules/practic-creation.js
function initPracticCreation() {
  const subjectSelect = document.getElementById("practice-subject");
  const subjectSections = document.querySelectorAll(".subject-specific-section");
  const programmingLanguageGroup = document.getElementById("programming-language-group");
  const codeBtn = document.getElementById("code-btn");
  const currentSubjectSpan = document.getElementById("current-subject");
  const examplesTitle = document.getElementById("examples-title");
  const inputLabel = document.getElementById("input-label-1");
  const outputLabel = document.getElementById("output-label-1");
  const addRequirementBtn = document.getElementById("add-requirement-btn");
  const requirementsList = document.getElementById("requirements-list");
  const addTestCaseBtn = document.getElementById("add-test-case-btn");
  const testCasesContainer = document.querySelector(".test-cases");
  const savePracticeBtn = document.getElementById("save-practice-btn");
  const previewBtn = document.querySelector(".practice-creation-navigation .btn-light");
  const subjectNames = {
    "russian": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A",
    "literature": "\u041B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
    "math": "\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430",
    "economics": "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0430",
    "programming": "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"
  };
  const exampleLabels = {
    "russian": { input: "\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u0434\u0430\u043D\u0438\u044F", output: "\u041F\u0440\u0438\u043C\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0430" },
    "literature": { input: "\u0412\u043E\u043F\u0440\u043E\u0441/\u0437\u0430\u0434\u0430\u043D\u0438\u0435", output: "\u041F\u0440\u0438\u043C\u0435\u0440 \u0430\u043D\u0430\u043B\u0438\u0437\u0430" },
    "math": { input: "\u0423\u0441\u043B\u043E\u0432\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438", output: "\u0420\u0435\u0448\u0435\u043D\u0438\u0435/\u043E\u0442\u0432\u0435\u0442" },
    "economics": { input: "\u0423\u0441\u043B\u043E\u0432\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438", output: "\u0420\u0435\u0448\u0435\u043D\u0438\u0435/\u043E\u0442\u0432\u0435\u0442" },
    "programming": { input: "\u0412\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435", output: "\u041E\u0436\u0438\u0434\u0430\u0435\u043C\u044B\u0439 \u0432\u044B\u0432\u043E\u0434" }
  };
  function updateSubjectUI() {
    const selectedSubject = subjectSelect?.value;
    if (!selectedSubject) return;
    subjectSections.forEach((section) => {
      section.classList.remove("active");
    });
    const selectedSection = document.getElementById(`${selectedSubject}-section`);
    if (selectedSection) selectedSection.classList.add("active");
    if (currentSubjectSpan) currentSubjectSpan.textContent = subjectNames[selectedSubject];
    if (selectedSubject === "programming") {
      if (programmingLanguageGroup) programmingLanguageGroup.style.display = "block";
      if (codeBtn) codeBtn.style.display = "flex";
      if (examplesTitle) examplesTitle.textContent = "\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u043B\u0443\u0447\u0430\u0438";
      if (inputLabel) inputLabel.textContent = exampleLabels[selectedSubject].input;
      if (outputLabel) outputLabel.textContent = exampleLabels[selectedSubject].output;
    } else {
      if (programmingLanguageGroup) programmingLanguageGroup.style.display = "none";
      if (codeBtn) codeBtn.style.display = "none";
      if (examplesTitle) examplesTitle.textContent = "\u041F\u0440\u0438\u043C\u0435\u0440\u044B";
      if (inputLabel) inputLabel.textContent = exampleLabels[selectedSubject].input;
      if (outputLabel) outputLabel.textContent = exampleLabels[selectedSubject].output;
    }
    const practiceCreationSection = document.querySelector(".practice-creation");
    if (practiceCreationSection) {
      practiceCreationSection.className = `section practice-creation subject-${selectedSubject}`;
    }
  }
  function initRequirementEvents(requirementItem) {
    const deleteBtn = requirementItem.querySelector(".delete-requirement");
    const moveUpBtn = requirementItem.querySelector(".move-up");
    const moveDownBtn = requirementItem.querySelector(".move-down");
    deleteBtn?.addEventListener("click", function() {
      const confirmToast = showToast6(
        "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435?",
        "warning",
        "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
        0
      );
      confirmToast.querySelector(".toast-close").remove();
      const toastActions = document.createElement("div");
      toastActions.className = "toast-actions";
      toastActions.style.marginTop = "10px";
      toastActions.style.display = "flex";
      toastActions.style.gap = "8px";
      toastActions.style.justifyContent = "flex-end";
      toastActions.innerHTML = `
                <button class="btn btn-danger btn-small confirm-delete">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
                <button class="btn btn-light btn-small cancel-delete">\u041E\u0442\u043C\u0435\u043D\u0430</button>
            `;
      const toastContent = confirmToast.querySelector(".toast-content");
      toastContent.appendChild(toastActions);
      toastContent.querySelector(".confirm-delete").addEventListener("click", function() {
        if (requirementsList && requirementItem.parentNode === requirementsList) {
          requirementsList.removeChild(requirementItem);
          updateRequirementsSummary();
          showToast6("\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E", "success", "\u0423\u0434\u0430\u043B\u0435\u043D\u043E");
        }
        confirmToast.remove();
      });
      toastContent.querySelector(".cancel-delete").addEventListener("click", function() {
        confirmToast.remove();
      });
    });
    moveUpBtn?.addEventListener("click", function() {
      const prev = requirementItem.previousElementSibling;
      if (prev && requirementsList) {
        requirementsList.insertBefore(requirementItem, prev);
        updateRequirementNumbers();
        showToast6("\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043E \u0432\u0432\u0435\u0440\u0445", "info", "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435");
      } else {
        showToast6("\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u0443\u0436\u0435 \u043D\u0430 \u043F\u0435\u0440\u0432\u043E\u0439 \u043F\u043E\u0437\u0438\u0446\u0438\u0438", "warning", "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435");
      }
    });
    moveDownBtn?.addEventListener("click", function() {
      const next = requirementItem.nextElementSibling;
      if (next && requirementsList) {
        requirementsList.insertBefore(next, requirementItem);
        updateRequirementNumbers();
        showToast6("\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043E \u0432\u043D\u0438\u0437", "info", "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435");
      } else {
        showToast6("\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u0443\u0436\u0435 \u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u043F\u043E\u0437\u0438\u0446\u0438\u0438", "warning", "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435");
      }
    });
  }
  function updateRequirementNumbers() {
    const requirements = document.querySelectorAll(".requirement-item");
    requirements.forEach((item, index) => {
    });
  }
  function updateRequirementsSummary() {
    const requirementsCount = document.querySelectorAll(".requirement-item").length;
    const summaryElement = document.querySelector(".summary-item:nth-child(4) .summary-value");
    if (summaryElement) {
      summaryElement.textContent = requirementsCount;
    }
  }
  function initTestCaseEvents(testCase) {
    const deleteBtn = testCase.querySelector(".delete-test-case");
    const toggleBtn = testCase.querySelector(".toggle-visibility");
    const editBtn = testCase.querySelector(".edit-test-case");
    deleteBtn?.addEventListener("click", function() {
      const confirmToast = showToast6(
        "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439?",
        "warning",
        "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
        0
      );
      confirmToast.querySelector(".toast-close").remove();
      const toastActions = document.createElement("div");
      toastActions.className = "toast-actions";
      toastActions.style.marginTop = "10px";
      toastActions.style.display = "flex";
      toastActions.style.gap = "8px";
      toastActions.style.justifyContent = "flex-end";
      toastActions.innerHTML = `
                <button class="btn btn-danger btn-small confirm-delete">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
                <button class="btn btn-light btn-small cancel-delete">\u041E\u0442\u043C\u0435\u043D\u0430</button>
            `;
      const toastContent = confirmToast.querySelector(".toast-content");
      toastContent.appendChild(toastActions);
      toastContent.querySelector(".confirm-delete").addEventListener("click", function() {
        if (testCasesContainer && testCase.parentNode === testCasesContainer) {
          testCasesContainer.removeChild(testCase);
          updateTestCasesSummary();
          showToast6("\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439 \u0443\u0434\u0430\u043B\u0435\u043D", "success", "\u0423\u0434\u0430\u043B\u0435\u043D\u043E");
        }
        confirmToast.remove();
      });
      toastContent.querySelector(".cancel-delete").addEventListener("click", function() {
        confirmToast.remove();
      });
    });
    toggleBtn?.addEventListener("click", function() {
      const isVisible = this.innerHTML.includes("fa-eye");
      if (isVisible) {
        this.innerHTML = '<i class="fas fa-eye-slash"></i> \u0421\u043A\u0440\u044B\u0442\u044C \u043E\u0442 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432';
        showToast6("\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439 \u0441\u043A\u0440\u044B\u0442 \u043E\u0442 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432", "info", "\u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C");
      } else {
        this.innerHTML = '<i class="fas fa-eye"></i> \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C';
        showToast6("\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439 \u043F\u043E\u043A\u0430\u0437\u0430\u043D \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C", "info", "\u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C");
      }
    });
    editBtn?.addEventListener("click", function() {
      const isEditing = this.classList.contains("editing");
      if (isEditing) {
        saveTestCaseEdits(testCase, this);
      } else {
        enableTestCaseEditing(testCase, this);
      }
    });
  }
  function enableTestCaseEditing(testCase, editButton) {
    const inputElement = testCase.querySelector(".test-case-input");
    const outputElement = testCase.querySelector(".test-case-output");
    const originalInput = inputElement.textContent;
    const originalOutput = outputElement.textContent;
    const inputTextarea = document.createElement("textarea");
    inputTextarea.className = "form-control test-case-edit-input";
    inputTextarea.value = originalInput;
    inputTextarea.rows = 3;
    const outputTextarea = document.createElement("textarea");
    outputTextarea.className = "form-control test-case-edit-output";
    outputTextarea.value = originalOutput;
    outputTextarea.rows = 3;
    inputElement.replaceWith(inputTextarea);
    outputElement.replaceWith(outputTextarea);
    editButton.innerHTML = '<i class="fas fa-save"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C';
    editButton.classList.add("editing");
    editButton.classList.remove("btn-light");
    editButton.classList.add("btn-success");
    const cancelButton = document.createElement("button");
    cancelButton.className = "btn btn-warning btn-small cancel-edit";
    cancelButton.innerHTML = '<i class="fas fa-times"></i> \u041E\u0442\u043C\u0435\u043D\u0430';
    cancelButton.style.marginLeft = "5px";
    editButton.parentNode.insertBefore(cancelButton, editButton.nextSibling);
    cancelButton.addEventListener("click", function() {
      const inputDiv = document.createElement("div");
      inputDiv.className = "test-case-input";
      inputDiv.textContent = originalInput;
      const outputDiv = document.createElement("div");
      outputDiv.className = "test-case-output";
      outputDiv.textContent = originalOutput;
      const editInput = testCase.querySelector(".test-case-edit-input");
      const editOutput = testCase.querySelector(".test-case-edit-output");
      if (editInput) editInput.replaceWith(inputDiv);
      if (editOutput) editOutput.replaceWith(outputDiv);
      editButton.innerHTML = '<i class="fas fa-edit"></i> \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C';
      editButton.classList.remove("editing", "btn-success");
      editButton.classList.add("btn-light");
      cancelButton.remove();
      showToast6("\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043E", "info", "\u041E\u0442\u043C\u0435\u043D\u0430");
    });
    showToast6("\u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D", "info", "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435");
  }
  function saveTestCaseEdits(testCase, editButton) {
    const inputTextarea = testCase.querySelector(".test-case-edit-input");
    const outputTextarea = testCase.querySelector(".test-case-edit-output");
    const cancelButton = testCase.querySelector(".cancel-edit");
    const newInput = inputTextarea?.value || "";
    const newOutput = outputTextarea?.value || "";
    if (!newInput.trim() || !newOutput.trim()) {
      showToast6("\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F", "warning", "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435");
      return;
    }
    const inputDiv = document.createElement("div");
    inputDiv.className = "test-case-input";
    inputDiv.textContent = newInput;
    const outputDiv = document.createElement("div");
    outputDiv.className = "test-case-output";
    outputDiv.textContent = newOutput;
    if (inputTextarea) inputTextarea.replaceWith(inputDiv);
    if (outputTextarea) outputTextarea.replaceWith(outputDiv);
    editButton.innerHTML = '<i class="fas fa-edit"></i> \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C';
    editButton.classList.remove("editing", "btn-success");
    editButton.classList.add("btn-light");
    if (cancelButton) {
      cancelButton.remove();
    }
    showToast6("\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B", "success", "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
  }
  function updateTestCasesSummary() {
    const testCasesCount = document.querySelectorAll(".test-case-card").length;
    const summaryElement = document.querySelector(".summary-item:nth-child(3) .summary-value");
    if (summaryElement) {
      summaryElement.textContent = testCasesCount;
    }
  }
  function collectPracticeData() {
    return {
      title: document.getElementById("practice-title")?.value || "",
      description: document.getElementById("practice-description")?.value || "",
      subject: subjectSelect?.value || "programming",
      requirements: Array.from(document.querySelectorAll(".requirement-item input")).map((input) => input.value),
      testCases: Array.from(document.querySelectorAll(".test-case-card")).map((card) => ({
        input: card.querySelector(".test-case-input")?.textContent || "",
        output: card.querySelector(".test-case-output")?.textContent || ""
      }))
    };
  }
  function showPreviewModal(practiceData) {
    const modal = document.createElement("div");
    modal.className = "modal-overlay active";
    modal.innerHTML = `
            <div class="modal" style="max-width: 800px;">
                <div class="modal-header">
                    <h3 class="modal-title">\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0437\u0430\u0434\u0430\u043D\u0438\u044F</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body" style="max-height: 60vh; overflow-y: auto;">
                    <div class="preview-content">
                        <h2>${practiceData.title}</h2>
                        <p class="text-muted">${practiceData.description}</p>
                        <div class="preview-meta">
                            <span><strong>\u041F\u0440\u0435\u0434\u043C\u0435\u0442:</strong> ${subjectNames[practiceData.subject]}</span>
                        </div>
                        <hr>
                        
                        ${practiceData.requirements.length > 0 ? `
                            <div class="preview-section">
                                <h4>\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F \u043A \u0440\u0435\u0448\u0435\u043D\u0438\u044E:</h4>
                                <ul>
                                    ${practiceData.requirements.map((req) => `<li>${req}</li>`).join("")}
                                </ul>
                            </div>
                        ` : ""}
                        
                        ${practiceData.testCases.length > 0 ? `
                            <div class="preview-section">
                                <h4>${practiceData.subject === "programming" ? "\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u043B\u0443\u0447\u0430\u0438" : "\u041F\u0440\u0438\u043C\u0435\u0440\u044B"}:</h4>
                                ${practiceData.testCases.map((testCase, index) => `
                                    <div class="preview-test-case">
                                        <h5>${practiceData.subject === "programming" ? "\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439" : "\u041F\u0440\u0438\u043C\u0435\u0440"} ${index + 1}</h5>
                                        <div class="preview-test-case-content">
                                            <div>
                                                <strong>${exampleLabels[practiceData.subject].input}:</strong>
                                                <div class="code-block">${testCase.input}</div>
                                            </div>
                                            <div>
                                                <strong>${exampleLabels[practiceData.subject].output}:</strong>
                                                <div class="code-block">${testCase.output}</div>
                                            </div>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        ` : ""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-light" id="preview-close">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>
                </div>
            </div>
        `;
    document.body.appendChild(modal);
    modal.querySelector(".modal-close").addEventListener("click", () => modal.remove());
    modal.querySelector("#preview-close").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
    showToast6("\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u043E\u0442\u043A\u0440\u044B\u0442", "info", "\u0413\u043E\u0442\u043E\u0432\u043E");
  }
  function initModals() {
    const settingsBtn = document.getElementById("settings-btn");
    const requirementsBtn = document.getElementById("requirements-btn");
    const examplesBtn = document.getElementById("examples-btn");
    const hintsBtn = document.getElementById("hints-btn");
    const codeBtn2 = document.getElementById("code-btn");
    const settingsModal = document.getElementById("settings-modal");
    const requirementsModal = document.getElementById("requirements-modal");
    const examplesModal = document.getElementById("examples-modal");
    const hintsModal = document.getElementById("hints-modal");
    const codeModal = document.getElementById("code-modal");
    const settingsClose = document.getElementById("settings-close");
    const requirementsClose = document.getElementById("requirements-close");
    const examplesClose = document.getElementById("examples-close");
    const hintsClose = document.getElementById("hints-close");
    const codeClose = document.getElementById("code-close");
    const settingsCancel = document.getElementById("settings-cancel");
    const requirementsCancel = document.getElementById("requirements-cancel");
    const examplesCancel = document.getElementById("examples-cancel");
    const hintsCancel = document.getElementById("hints-cancel");
    const codeCancel = document.getElementById("code-cancel");
    const settingsSave = document.getElementById("settings-save");
    const requirementsSave = document.getElementById("requirements-save");
    const examplesSave = document.getElementById("examples-save");
    const hintsSave = document.getElementById("hints-save");
    const codeSave = document.getElementById("code-save");
    if (!settingsBtn || !settingsModal) {
      console.log("\u041C\u043E\u0434\u0430\u043B\u044C\u043D\u044B\u0435 \u043E\u043A\u043D\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435");
      return;
    }
    settingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("active");
    });
    requirementsBtn?.addEventListener("click", () => {
      requirementsModal?.classList.add("active");
    });
    examplesBtn?.addEventListener("click", () => {
      examplesModal?.classList.add("active");
    });
    hintsBtn?.addEventListener("click", () => {
      hintsModal?.classList.add("active");
    });
    codeBtn2?.addEventListener("click", () => {
      codeModal?.classList.add("active");
    });
    function closeAllModals() {
      settingsModal?.classList.remove("active");
      requirementsModal?.classList.remove("active");
      examplesModal?.classList.remove("active");
      hintsModal?.classList.remove("active");
      codeModal?.classList.remove("active");
    }
    settingsClose?.addEventListener("click", closeAllModals);
    requirementsClose?.addEventListener("click", closeAllModals);
    examplesClose?.addEventListener("click", closeAllModals);
    hintsClose?.addEventListener("click", closeAllModals);
    codeClose?.addEventListener("click", closeAllModals);
    settingsCancel?.addEventListener("click", closeAllModals);
    requirementsCancel?.addEventListener("click", closeAllModals);
    examplesCancel?.addEventListener("click", closeAllModals);
    hintsCancel?.addEventListener("click", closeAllModals);
    codeCancel?.addEventListener("click", closeAllModals);
    settingsSave?.addEventListener("click", () => {
      showToast6("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B!", "success", "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438");
      closeAllModals();
    });
    requirementsSave?.addEventListener("click", () => {
      showToast6("\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B!", "success", "\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F");
      closeAllModals();
    });
    examplesSave?.addEventListener("click", () => {
      showToast6("\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B!", "success", "\u041F\u0440\u0438\u043C\u0435\u0440\u044B");
      closeAllModals();
    });
    hintsSave?.addEventListener("click", () => {
      showToast6("\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B!", "success", "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438");
      closeAllModals();
    });
    codeSave?.addEventListener("click", () => {
      showToast6("\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u0434 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D!", "success", "\u041A\u043E\u0434");
      closeAllModals();
    });
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        closeAllModals();
      }
    });
  }
  function initPasswordFieldManagement() {
    const requireRegistration = document.getElementById("require-registration");
    const passwordField = document.getElementById("password-field");
    if (!requireRegistration || !passwordField) {
      return;
    }
    function togglePasswordField() {
      if (requireRegistration.checked) {
        passwordField.style.display = "block";
      } else {
        passwordField.style.display = "none";
      }
    }
    togglePasswordField();
    requireRegistration.addEventListener("change", togglePasswordField);
    const settingsSave = document.getElementById("settings-save");
    if (settingsSave) {
      settingsSave.addEventListener("click", function() {
        if (requireRegistration.checked) {
          const password = document.getElementById("practice-password")?.value;
          if (password) {
            showToast6("\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D", "success", "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438");
          } else {
            showToast6("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u0437\u0430\u0434\u0430\u043D\u0438\u044F", "warning", "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435");
            return;
          }
        }
      });
    }
  }
  function initExistingTestCases() {
    const testCases = document.querySelectorAll(".test-case-card");
    testCases.forEach((testCase) => {
      const toggleBtn = testCase.querySelector(".btn-light");
      const editBtn = testCase.querySelector(".btn-light:nth-child(1)");
      const deleteBtn = testCase.querySelector(".btn-danger");
      toggleBtn?.addEventListener("click", function() {
        const isVisible = this.innerHTML.includes("fa-eye");
        if (isVisible) {
          this.innerHTML = '<i class="fas fa-eye-slash"></i> \u0421\u043A\u0440\u044B\u0442\u044C \u043E\u0442 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432';
          showToast6("\u041F\u0440\u0438\u043C\u0435\u0440 \u0441\u043A\u0440\u044B\u0442 \u043E\u0442 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432", "info", "\u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C");
        } else {
          this.innerHTML = '<i class="fas fa-eye"></i> \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C';
          showToast6("\u041F\u0440\u0438\u043C\u0435\u0440 \u043F\u043E\u043A\u0430\u0437\u0430\u043D \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C", "info", "\u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C");
        }
      });
      editBtn?.addEventListener("click", function() {
        const testCaseContent = this.closest(".test-case-card").querySelector(".test-case-content");
        const inputs = testCaseContent.querySelectorAll(".test-case-input, .test-case-output");
        inputs.forEach((input) => {
          const currentText = input.textContent;
          input.innerHTML = `<textarea class="form-control" style="height: 80px;">${currentText}</textarea>`;
        });
        this.innerHTML = '<i class="fas fa-save"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C';
        this.classList.remove("btn-light");
        this.classList.add("btn-success");
        const originalClickHandler = this.onclick;
        this.onclick = null;
        this.addEventListener("click", function saveHandler() {
          const textareas = testCaseContent.querySelectorAll("textarea");
          textareas.forEach((textarea, index) => {
            const div = document.createElement("div");
            div.className = index === 0 ? "test-case-input" : "test-case-output";
            div.textContent = textarea.value;
            div.style.border = "none";
            div.style.padding = "8px";
            div.style.backgroundColor = "transparent";
            textarea.parentNode.replaceChild(div, textarea);
          });
          this.innerHTML = '<i class="fas fa-edit"></i> \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C';
          this.classList.remove("btn-success");
          this.classList.add("btn-light");
          this.onclick = originalClickHandler;
          showToast6("\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B", "success", "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435");
        }, { once: true });
      });
      deleteBtn?.addEventListener("click", function() {
        const testCaseCard = this.closest(".test-case-card");
        const confirmToast = showToast6(
          "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043F\u0440\u0438\u043C\u0435\u0440?",
          "warning",
          "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
          0
        );
        confirmToast.querySelector(".toast-close").remove();
        const toastActions = document.createElement("div");
        toastActions.className = "toast-actions";
        toastActions.style.marginTop = "10px";
        toastActions.style.display = "flex";
        toastActions.style.gap = "8px";
        toastActions.style.justifyContent = "flex-end";
        toastActions.innerHTML = `
                    <button class="btn btn-danger btn-small confirm-delete">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
                    <button class="btn btn-light btn-small cancel-delete">\u041E\u0442\u043C\u0435\u043D\u0430</button>
                `;
        const toastContent = confirmToast.querySelector(".toast-content");
        toastContent.appendChild(toastActions);
        toastContent.querySelector(".confirm-delete").addEventListener("click", function() {
          testCaseCard.remove();
          updateTestCasesSummary();
          showToast6("\u041F\u0440\u0438\u043C\u0435\u0440 \u0443\u0434\u0430\u043B\u0435\u043D", "success", "\u0423\u0434\u0430\u043B\u0435\u043D\u043E");
          confirmToast.remove();
        });
        toastContent.querySelector(".cancel-delete").addEventListener("click", function() {
          confirmToast.remove();
        });
      });
    });
  }
  updateSubjectUI();
  subjectSelect?.addEventListener("change", updateSubjectUI);
  addRequirementBtn?.addEventListener("click", function() {
    if (!requirementsList) return;
    const newRequirement = document.createElement("li");
    newRequirement.className = "requirement-item";
    newRequirement.innerHTML = `
            <div class="requirement-text">
                <input type="text" class="form-control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435">
            </div>
            <div class="requirement-actions">
                <button class="btn btn-light btn-small move-up"><i class="fas fa-arrow-up"></i></button>
                <button class="btn btn-light btn-small move-down"><i class="fas fa-arrow-down"></i></button>
                <button class="btn btn-danger btn-small delete-requirement"><i class="fas fa-trash"></i></button>
            </div>
        `;
    requirementsList.appendChild(newRequirement);
    initRequirementEvents(newRequirement);
    updateRequirementsSummary();
    showToast6("\u041D\u043E\u0432\u043E\u0435 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E", "success", "\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435");
  });
  addTestCaseBtn?.addEventListener("click", function() {
    if (!testCasesContainer) return;
    const selectedSubject = subjectSelect?.value || "programming";
    const testCases = document.querySelectorAll(".test-case-card");
    const newTestCaseNumber = testCases.length + 1;
    const newTestCase = document.createElement("div");
    newTestCase.className = "test-case-card";
    newTestCase.innerHTML = `
            <div class="test-case-header">
                <div class="test-case-title">${selectedSubject === "programming" ? "\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439" : "\u041F\u0440\u0438\u043C\u0435\u0440"} ${newTestCaseNumber}</div>
                <div>
                    <button class="btn btn-light btn-small toggle-visibility"><i class="fas fa-eye"></i> \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C</button>
                </div>
            </div>
            <div class="test-case-content">
                <div>
                    <div class="form-label">${exampleLabels[selectedSubject].input}</div>
                    <div class="test-case-input">${selectedSubject === "programming" ? "\u0412\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435..." : "\u0423\u0441\u043B\u043E\u0432\u0438\u0435..."}</div>
                </div>
                <div>
                    <div class="form-label">${exampleLabels[selectedSubject].output}</div>
                    <div class="test-case-output">${selectedSubject === "programming" ? "\u041E\u0436\u0438\u0434\u0430\u0435\u043C\u044B\u0439 \u0432\u044B\u0432\u043E\u0434..." : "\u0420\u0435\u0448\u0435\u043D\u0438\u0435..."}</div>
                </div>
            </div>
            <div class="test-case-actions">
                <button class="btn btn-light btn-small edit-test-case"><i class="fas fa-edit"></i> \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>
                <button class="btn btn-danger btn-small delete-test-case"><i class="fas fa-trash"></i> \u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
            </div>
        `;
    testCasesContainer.appendChild(newTestCase);
    initTestCaseEvents(newTestCase);
    updateTestCasesSummary();
    showToast6("\u041D\u043E\u0432\u044B\u0439 \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D", "success", "\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439");
  });
  savePracticeBtn?.addEventListener("click", function() {
    const practiceTitle = document.getElementById("practice-title")?.value;
    const selectedSubject = subjectSelect?.value;
    if (!practiceTitle) {
      showToast6("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F", "warning", "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445");
      document.getElementById("practice-title")?.focus();
      return;
    }
    if (!selectedSubject) {
      showToast6("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442", "warning", "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445");
      return;
    }
    const saveButton = this;
    const originalText = saveButton.innerHTML;
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435...';
    saveButton.disabled = true;
    setTimeout(() => {
      saveButton.innerHTML = originalText;
      saveButton.disabled = false;
      showToast6(`\u0417\u0430\u0434\u0430\u043D\u0438\u0435 "${practiceTitle}" \u043F\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443 "${subjectNames[selectedSubject]}" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E!`, "success", "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
    }, 1500);
  });
  previewBtn?.addEventListener("click", function() {
    const practiceData = collectPracticeData();
    if (!practiceData.title) {
      showToast6("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430", "warning", "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445");
      return;
    }
    showPreviewModal(practiceData);
  });
  document.querySelectorAll(".requirement-item").forEach(initRequirementEvents);
  document.querySelectorAll(".test-case-card").forEach(initTestCaseEvents);
  updateRequirementsSummary();
  updateTestCasesSummary();
  initModals();
  initPasswordFieldManagement();
  initExistingTestCases();
  let autoSaveTimeout;
  const autoSaveElements = document.querySelectorAll("#practice-title, #practice-description, .requirement-item input, .test-case-input, .test-case-output");
  autoSaveElements.forEach((element) => {
    element.addEventListener("input", function() {
      clearTimeout(autoSaveTimeout);
      autoSaveTimeout = setTimeout(() => {
        const data = collectPracticeData();
        localStorage.setItem("practice_autosave", JSON.stringify(data));
      }, 2e3);
    });
  });
  const savedPractice = localStorage.getItem("practice_autosave");
  if (savedPractice) {
    try {
      const practiceData = JSON.parse(savedPractice);
      const restoreToast = showToast6(
        "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0430\u0432\u0442\u043E\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u043E\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u0435. \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C?",
        "info",
        "\u0410\u0432\u0442\u043E\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435",
        5e3
      );
      restoreToast.querySelector(".toast-close").remove();
      const toastActions = document.createElement("div");
      toastActions.className = "toast-actions";
      toastActions.style.marginTop = "10px";
      toastActions.style.display = "flex";
      toastActions.style.gap = "8px";
      toastActions.style.justifyContent = "flex-end";
      toastActions.innerHTML = `
                <button class="btn btn-success btn-small confirm-restore">\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C</button>
                <button class="btn btn-light btn-small cancel-restore">\u041E\u0442\u043C\u0435\u043D\u0430</button>
            `;
      const toastContent = restoreToast.querySelector(".toast-content");
      toastContent.appendChild(toastActions);
      restoreToast.querySelector(".confirm-restore").addEventListener("click", function() {
        document.getElementById("practice-title").value = practiceData.title;
        document.getElementById("practice-description").value = practiceData.description;
        subjectSelect.value = practiceData.subject;
        updateSubjectUI();
        showToast6("\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0438\u0437 \u0430\u0432\u0442\u043E\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F", "success", "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E");
        restoreToast.remove();
      });
      restoreToast.querySelector(".cancel-restore").addEventListener("click", function() {
        localStorage.removeItem("practice_autosave");
        showToast6("\u0410\u0432\u0442\u043E\u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u043E", "info", "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E");
        restoreToast.remove();
      });
    } catch (e) {
      console.error("Error restoring autosave:", e);
    }
  }
  savePracticeBtn?.addEventListener("click", function() {
    localStorage.removeItem("practice_autosave");
  });
}
var init_practic_creation = __esm({
  "static/js/modules/practic-creation.js"() {
    init_toast();
  }
});

// static/js/pages/practic-pages.js
function initPracticePage() {
  initCommonAnimations();
  initToastSystem3();
  if (document.getElementById("code-input") && document.getElementById("run-btn")) {
    console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u043D\u0438\u044F");
    initPracticExecution2();
  } else if (document.getElementById("review-modal") || document.querySelector(".submission-card")) {
    console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0437\u0430\u0434\u0430\u043D\u0438\u0439");
    initPracticReview();
  } else if (document.getElementById("practice-subject") || document.querySelector(".practice-creation")) {
    console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u043D\u0438\u044F");
    initPracticCreation();
  } else if (document.querySelector(".practice-grid") && document.querySelector(".subject-card")) {
    console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438");
    initPracticOverview();
  } else if (document.querySelector(".topics-container") && document.querySelector(".topic-card")) {
    console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0441\u043F\u0438\u0441\u043A\u0430 \u0437\u0430\u0434\u0430\u043D\u0438\u0439");
    initPracticeAnimations();
  } else {
    console.log("\u0422\u0438\u043F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D");
  }
}
function initPracticOverview() {
  console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438");
  const subjectCards = document.querySelectorAll(".subject-card");
  subjectCards.forEach((card) => {
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.transition = "transform 0.3s ease";
    });
    card.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0) scale(1)";
    });
    card.addEventListener("click", function(e) {
      if (!e.target.classList.contains("btn")) {
        const link = this.querySelector("a");
        if (link) {
          window.location.href = link.getAttribute("href");
        }
      }
    });
  });
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.toLowerCase();
      const cards = document.querySelectorAll(".subject-card");
      cards.forEach((card) => {
        const title = card.querySelector(".subject-title").textContent.toLowerCase();
        const description = card.querySelector(".subject-description").textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      filterSubjects(filter);
    });
  });
  function filterSubjects(filter) {
    const cards = document.querySelectorAll(".subject-card");
    cards.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else {
        const subjectType = card.getAttribute("data-subject");
        if (subjectType === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  }
  initProgressStats();
}
function initProgressStats() {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.width = progress + "%";
    setTimeout(() => {
      bar.style.transition = "width 1s ease-in-out";
    }, 100);
  });
}
var init_practic_pages = __esm({
  "static/js/pages/practic-pages.js"() {
    init_practic_execution();
    init_practic_review();
    init_practic_creation();
    init_animations();
    init_toast();
    document.addEventListener("DOMContentLoaded", initPracticePage);
  }
});

// static/js/pages/test-pages.js
function initToastSystem4() {
  if (!document.querySelector(".toast-container")) {
    toastContainer2 = document.createElement("div");
    toastContainer2.className = "toast-container";
    document.body.appendChild(toastContainer2);
  } else {
    toastContainer2 = document.querySelector(".toast-container");
  }
}
function showToast7(message, type = "success", title = "", duration = 4e3) {
  if (!toastContainer2) initToastSystem4();
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icons = {
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-triangle",
    error: "fas fa-times-circle",
    info: "fas fa-info-circle"
  };
  toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ""}
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
  toastContainer2.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  if (duration > 0) {
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  return toast;
}
function removeQuestion2(questionNumber) {
  const confirmToast = showToast7(
    `\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441 ${questionNumber}?`,
    "warning",
    "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
    0
  );
  confirmToast.querySelector(".toast-close").remove();
  const toastActions = document.createElement("div");
  toastActions.className = "toast-actions";
  toastActions.style.marginTop = "10px";
  toastActions.style.display = "flex";
  toastActions.style.gap = "8px";
  toastActions.style.justifyContent = "flex-end";
  toastActions.innerHTML = `
        <button class="btn btn-danger btn-small confirm-delete">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        <button class="btn btn-light btn-small cancel-delete">\u041E\u0442\u043C\u0435\u043D\u0430</button>
    `;
  const toastContent = confirmToast.querySelector(".toast-content");
  toastContent.appendChild(toastActions);
  confirmToast.querySelector(".confirm-delete").addEventListener("click", function() {
    const questionCards = document.querySelectorAll(".question-card");
    if (questionCards[questionNumber - 1]) {
      questionCards[questionNumber - 1].remove();
      updateQuestionNumbers();
      updateProgress();
      updateNavigation();
      showToast7(`\u0412\u043E\u043F\u0440\u043E\u0441 ${questionNumber} \u0443\u0434\u0430\u043B\u0435\u043D`, "success", "\u0423\u0441\u043F\u0435\u0448\u043D\u043E");
    }
    confirmToast.remove();
  });
  confirmToast.querySelector(".cancel-delete").addEventListener("click", function() {
    confirmToast.remove();
  });
}
function updateQuestionNumbers() {
  const questionCards = document.querySelectorAll(".question-card");
  questionCards.forEach((card, index) => {
    const questionNumber = card.querySelector(".question-number");
    if (questionNumber) {
      questionNumber.textContent = `\u0412\u043E\u043F\u0440\u043E\u0441 ${index + 1}`;
    }
    const deleteBtn = card.querySelector(".btn-danger");
    if (deleteBtn) {
      deleteBtn.setAttribute("onclick", `removeQuestion(${index + 1})`);
    }
    const textarea = card.querySelector('textarea[id^="question-text-"]');
    if (textarea) {
      textarea.id = `question-text-${index + 1}`;
      const label = card.querySelector('label[for^="question-text-"]');
      if (label) {
        label.setAttribute("for", `question-text-${index + 1}`);
      }
    }
  });
  const totalQuestionsElement = document.getElementById("total-questions");
  if (totalQuestionsElement) {
    totalQuestionsElement.textContent = questionCards.length;
  }
}
function updateProgress() {
  const currentQuestionElement = document.getElementById("current-question");
  const totalQuestionsElement = document.getElementById("total-questions");
  if (!currentQuestionElement || !totalQuestionsElement) return;
  const currentQuestion = parseInt(currentQuestionElement.textContent) || 1;
  const totalQuestions = parseInt(totalQuestionsElement.textContent) || 1;
  const progressPercent = Math.round(currentQuestion / totalQuestions * 100);
  const progressPercentElement = document.getElementById("progress-percent");
  if (progressPercentElement) {
    progressPercentElement.textContent = `${progressPercent}%`;
  }
}
function updateNavigation() {
  const questionsNav = document.querySelector(".questions-nav");
  const questionCards = document.querySelectorAll(".question-card");
  if (!questionsNav) return;
  const existingNavItems = questionsNav.querySelectorAll(".question-nav-item:not(:last-child)");
  existingNavItems.forEach((item) => item.remove());
  questionCards.forEach((_, index) => {
    const navItem = document.createElement("div");
    navItem.className = "question-nav-item";
    if (index === 0) navItem.classList.add("current");
    navItem.textContent = index + 1;
    navItem.addEventListener("click", () => navigateToQuestion(index + 1));
    const addButton = questionsNav.querySelector(".question-nav-item:last-child");
    questionsNav.insertBefore(navItem, addButton);
  });
  updateSummary();
}
function updateSummary() {
  const questionCards = document.querySelectorAll(".question-card");
  const summaryValue = document.querySelector(".summary-item:nth-child(2) .summary-value");
  if (summaryValue) {
    summaryValue.textContent = `${questionCards.length}/20`;
  }
}
function updateQuestionTypeUI(questionCard) {
  const typeSelect = questionCard.querySelector(".question-type-select");
  const optionsContainer = questionCard.querySelector(".options-container");
  const textAnswerContainer = questionCard.querySelector(".text-answer-container");
  const codeAnswerContainer = questionCard.querySelector(".code-answer-container");
  if (!typeSelect) return;
  const questionType = typeSelect.value;
  questionCard.classList.remove("question-type-single", "question-type-multiple", "question-type-text", "question-type-code");
  questionCard.classList.add(`question-type-${questionType}`);
  switch (questionType) {
    case "single":
    case "multiple":
      if (optionsContainer) optionsContainer.style.display = "block";
      if (textAnswerContainer) textAnswerContainer.style.display = "none";
      if (codeAnswerContainer) codeAnswerContainer.style.display = "none";
      break;
    case "text":
      if (optionsContainer) optionsContainer.style.display = "none";
      if (textAnswerContainer) textAnswerContainer.style.display = "block";
      if (codeAnswerContainer) codeAnswerContainer.style.display = "none";
      break;
    case "code":
      if (optionsContainer) optionsContainer.style.display = "none";
      if (textAnswerContainer) textAnswerContainer.style.display = "none";
      if (codeAnswerContainer) codeAnswerContainer.style.display = "block";
      break;
  }
  updateAnswerSelectionLogic(questionCard);
}
function updateAnswerSelectionLogic(questionCard) {
  const typeSelect = questionCard.querySelector(".question-type-select");
  const optionItems = questionCard.querySelectorAll(".option-item");
  if (!typeSelect) return;
  const questionType = typeSelect.value;
  optionItems.forEach((item) => {
    item.removeEventListener("click", handleOptionClick);
    item.addEventListener("click", handleOptionClick);
  });
  function handleOptionClick(e) {
    if (e.target.tagName === "INPUT" || e.target.closest(".option-actions")) {
      return;
    }
    const clickedItem = this;
    const questionType2 = typeSelect.value;
    if (questionType2 === "single") {
      optionItems.forEach((opt) => opt.classList.remove("selected"));
      clickedItem.classList.add("selected");
    } else if (questionType2 === "multiple") {
      clickedItem.classList.toggle("selected");
    }
  }
}
function initQuestionTypeEvents() {
  const questionTypeSelects = document.querySelectorAll(".question-type-select");
  questionTypeSelects.forEach((select) => {
    if (!select.hasAttribute("data-type-initialized")) {
      select.setAttribute("data-type-initialized", "true");
      select.addEventListener("change", function() {
        const questionCard = this.closest(".question-card");
        updateQuestionTypeUI(questionCard);
      });
    }
  });
  const questionCards = document.querySelectorAll(".question-card");
  questionCards.forEach((card) => {
    updateQuestionTypeUI(card);
  });
}
function createNewQuestion(questionData = null) {
  const questionsContainer = document.querySelector(".test-creation-content");
  const questionCards = document.querySelectorAll(".question-card");
  const newQuestionNumber = questionCards.length + 1;
  const questionText = questionData?.text || "\u041D\u043E\u0432\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441";
  const questionType = questionData?.type || "single";
  const options = questionData?.options || [
    { text: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430 1", isCorrect: false },
    { text: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430 2", isCorrect: false }
  ];
  let optionsHTML = "";
  options.forEach((option, index) => {
    const optionLetter = String.fromCharCode(65 + index);
    optionsHTML += `
            <div class="option-item ${option.isCorrect ? "selected" : ""}">
                <div class="option-marker"></div>
                <div class="option-text">
                    <input type="text" class="form-control" value="${option.text}">
                </div>
                <div class="option-actions">
                    <button class="btn btn-small btn-success option-correct-btn">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-small btn-danger option-delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
  });
  const newQuestionHTML = `
        <div class="question-card">
            <div class="question-header">
                <div>
                    <div class="question-number">\u0412\u043E\u043F\u0440\u043E\u0441 ${newQuestionNumber}</div>
                    <div class="question-text">${questionText}</div>
                </div>
                <button class="btn btn-danger btn-small" onclick="removeQuestion(${newQuestionNumber})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>

            <div class="form-group">
                <label class="form-label" for="question-text-${newQuestionNumber}">\u0422\u0435\u043A\u0441\u0442 \u0432\u043E\u043F\u0440\u043E\u0441\u0430</label>
                <textarea id="question-text-${newQuestionNumber}" class="form-control">${questionText}</textarea>
            </div>

            <div class="form-group programming-only" style="display: none;">
                <label class="form-label">\u041A\u043E\u0434 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)</label>
                <div class="code-editor">
                    <div class="code-toolbar">
                        <button type="button">Python</button>
                        <button type="button">JavaScript</button>
                        <button type="button">HTML</button>
                    </div>
                    <textarea class="form-control code-block" rows="4">${questionData?.code || ""}</textarea>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">\u0422\u0438\u043F \u0432\u043E\u043F\u0440\u043E\u0441\u0430</label>
                <select class="form-control form-select question-type-select">
                    <option value="single" ${questionType === "single" ? "selected" : ""}>\u041E\u0434\u0438\u043D \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442</option>
                    <option value="multiple" ${questionType === "multiple" ? "selected" : ""}>\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432</option>
                    <option value="text" ${questionType === "text" ? "selected" : ""}>\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u043E\u0442\u0432\u0435\u0442</option>
                    <option value="code" ${questionType === "code" ? "selected" : ""} class="programming-only">\u041D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u043E\u0434\u0430</option>
                </select>
            </div>

            <div class="form-group options-container">
                <label class="form-label">\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u043E\u0432</label>
                <div class="options-list">
                    ${optionsHTML}
                </div>
                <button class="btn btn-light add-option-btn">
                    <i class="fas fa-plus"></i> \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430
                </button>
            </div>

            <div class="form-group text-answer-container">
                <label class="form-label">\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u043E\u0442\u0432\u0435\u0442</label>
                <textarea class="form-control" rows="4" placeholder="\u0421\u0442\u0443\u0434\u0435\u043D\u0442 \u0432\u0432\u0435\u0434\u0435\u0442 \u043E\u0442\u0432\u0435\u0442 \u0437\u0434\u0435\u0441\u044C..."></textarea>
            </div>

            <div class="form-group code-answer-container programming-only">
                <label class="form-label">\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043A\u043E\u0434\u0430</label>
                <div class="code-editor">
                    <div class="code-toolbar">
                        <button type="button" class="active">Python</button>
                        <button type="button">JavaScript</button>
                        <button type="button">Java</button>
                        <button type="button">C++</button>
                    </div>
                    <textarea class="form-control code-block" rows="6" placeholder="// \u0421\u0442\u0443\u0434\u0435\u043D\u0442 \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u043A\u043E\u0434 \u0437\u0434\u0435\u0441\u044C..."></textarea>
                </div>
            </div>

            <div class="question-actions">
                <button class="btn btn-light duplicate-question-btn">
                    <i class="fas fa-copy"></i> \u0414\u0443\u0431\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441
                </button>
            </div>
        </div>
    `;
  const addButton = document.querySelector(".add-question-btn");
  if (addButton) {
    addButton.insertAdjacentHTML("beforebegin", newQuestionHTML);
  } else {
    questionsContainer.insertAdjacentHTML("beforeend", newQuestionHTML);
  }
  updateQuestionNumbers();
  updateNavigation();
  updateProgress();
  initQuestionEvents();
  if (newQuestionNumber > 1) {
    const newQuestion = document.querySelector(".question-card:last-child");
    if (newQuestion) {
      newQuestion.style.display = "none";
    }
  }
  setTimeout(() => {
    const newQuestion = document.querySelector(".question-card:last-child");
    if (newQuestion) {
      updateQuestionTypeUI(newQuestion);
      initQuestionTypeEvents();
    }
  }, 0);
  if (questionType === "code") {
    const newQuestion = document.querySelector(".question-card:last-child");
    const codeBlock = newQuestion.querySelector(".programming-only");
    if (codeBlock) {
      codeBlock.style.display = "block";
    }
  }
  showToast7(`\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432\u043E\u043F\u0440\u043E\u0441 ${newQuestionNumber}`, "success", "\u041D\u043E\u0432\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441");
  return newQuestionNumber;
}
function navigateToQuestion(questionNumber) {
  const questionCards = document.querySelectorAll(".question-card");
  const questionNavItems = document.querySelectorAll(".question-nav-item:not(:last-child)");
  questionCards.forEach((card) => {
    card.style.display = "none";
  });
  if (questionCards[questionNumber - 1]) {
    questionCards[questionNumber - 1].style.display = "block";
  }
  questionNavItems.forEach((item, index) => {
    item.classList.toggle("current", index === questionNumber - 1);
  });
  const currentQuestionElement = document.getElementById("current-question");
  if (currentQuestionElement) {
    currentQuestionElement.textContent = questionNumber;
  }
  updateProgress();
}
function duplicateQuestion(questionCard) {
  if (!questionCard) return;
  const questionData = {
    text: questionCard.querySelector('textarea[id^="question-text-"]')?.value || "\u041D\u043E\u0432\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441",
    type: questionCard.querySelector(".question-type-select")?.value || "single",
    options: []
  };
  const optionItems = questionCard.querySelectorAll(".option-item");
  optionItems.forEach((option) => {
    questionData.options.push({
      text: option.querySelector('input[type="text"]')?.value || "\u0412\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430",
      isCorrect: option.classList.contains("selected")
    });
  });
  const codeBlock = questionCard.querySelector(".code-block");
  if (codeBlock) {
    questionData.code = codeBlock.value;
  }
  const newQuestionNumber = createNewQuestion(questionData);
  navigateToQuestion(newQuestionNumber);
}
function initQuestionEvents() {
  const optionItems = document.querySelectorAll(".option-item");
  optionItems.forEach((item) => {
    if (!item.hasAttribute("data-initialized")) {
      item.setAttribute("data-initialized", "true");
      item.addEventListener("click", function(e) {
        if (e.target === this || e.target.classList.contains("option-marker")) {
          const questionCard = this.closest(".question-card");
          const questionTypeSelect = questionCard.querySelector(".question-type-select");
          const questionType = questionTypeSelect ? questionTypeSelect.value : "single";
          if (questionType === "single") {
            const parentOptions = this.closest(".options-list");
            parentOptions.querySelectorAll(".option-item").forEach((opt) => {
              opt.classList.remove("selected");
            });
            this.classList.add("selected");
          } else if (questionType === "multiple") {
            this.classList.toggle("selected");
          }
        }
      });
    }
  });
  const optionCorrectBtns = document.querySelectorAll(".option-correct-btn");
  optionCorrectBtns.forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true");
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        const optionItem = this.closest(".option-item");
        const questionCard = optionItem.closest(".question-card");
        const questionType = questionCard.querySelector(".question-type-select").value;
        if (questionType === "single") {
          const parentOptions = optionItem.closest(".options-list");
          parentOptions.querySelectorAll(".option-item").forEach((opt) => {
            opt.classList.remove("selected");
          });
          optionItem.classList.add("selected");
        } else {
          optionItem.classList.toggle("selected");
        }
      });
    }
  });
  const optionDeleteBtns = document.querySelectorAll(".option-delete-btn");
  optionDeleteBtns.forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true");
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        const optionItem = this.closest(".option-item");
        const optionsList = optionItem.parentElement;
        if (optionsList.children.length > 1) {
          const confirmToast = showToast7(
            "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430?",
            "warning",
            "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
            0
          );
          confirmToast.querySelector(".toast-close").remove();
          const toastActions = document.createElement("div");
          toastActions.className = "toast-actions";
          toastActions.style.marginTop = "10px";
          toastActions.style.display = "flex";
          toastActions.style.gap = "8px";
          toastActions.style.justifyContent = "flex-end";
          toastActions.innerHTML = `
                        <button class="btn btn-danger btn-small confirm-delete">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
                        <button class="btn btn-light btn-small cancel-delete">\u041E\u0442\u043C\u0435\u043D\u0430</button>
                    `;
          const toastContent = confirmToast.querySelector(".toast-content");
          toastContent.appendChild(toastActions);
          toastContent.querySelector(".confirm-delete").addEventListener("click", function() {
            optionItem.remove();
            showToast7("\u0412\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430 \u0443\u0434\u0430\u043B\u0435\u043D", "success");
            confirmToast.remove();
          });
          toastContent.querySelector(".cancel-delete").addEventListener("click", function() {
            confirmToast.remove();
          });
        } else {
          showToast7("\u0414\u043E\u043B\u0436\u0435\u043D \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430", "warning", "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0443\u0434\u0430\u043B\u0438\u0442\u044C");
        }
      });
    }
  });
  const addOptionBtns = document.querySelectorAll(".add-option-btn");
  addOptionBtns.forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true");
      btn.addEventListener("click", function() {
        const optionsList = this.previousElementSibling;
        const optionCount = optionsList.children.length;
        const newOptionLetter = String.fromCharCode(65 + optionCount);
        const newOptionHTML = `
                    <div class="option-item">
                        <div class="option-marker"></div>
                        <div class="option-text">
                            <input type="text" class="form-control" value="\u0412\u0430\u0440\u0438\u0430\u043D\u0442 ${newOptionLetter}">
                        </div>
                        <div class="option-actions">
                            <button class="btn btn-small btn-success option-correct-btn"><i class="fas fa-check"></i></button>
                            <button class="btn btn-small btn-danger option-delete-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
        optionsList.insertAdjacentHTML("beforeend", newOptionHTML);
        initQuestionEvents();
      });
    }
  });
  const duplicateBtns = document.querySelectorAll(".duplicate-question-btn");
  duplicateBtns.forEach((btn) => {
    if (!btn.hasAttribute("data-initialized")) {
      btn.setAttribute("data-initialized", "true");
      btn.addEventListener("click", function() {
        const questionCard = this.closest(".question-card");
        duplicateQuestion(questionCard);
      });
    }
  });
  const questionTypeSelects = document.querySelectorAll(".question-type-select");
  questionTypeSelects.forEach((select) => {
    if (!select.hasAttribute("data-initialized")) {
      select.setAttribute("data-initialized", "true");
      select.addEventListener("change", function() {
        const questionCard = this.closest(".question-card");
        updateQuestionTypeUI(questionCard);
      });
    }
  });
  initQuestionTypeEvents();
}
function previewTest() {
  const testData = collectTestData();
  if (testData.questions.length === 0) {
    showToast7("\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u0432\u043E\u043F\u0440\u043E\u0441 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430", "warning", "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445");
    return;
  }
  const modal = document.createElement("div");
  modal.className = "modal-overlay active";
  modal.innerHTML = `
        <div class="modal" style="max-width: 800px;">
            <div class="modal-header">
                <h3 class="modal-title">\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0442\u0435\u0441\u0442\u0430</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body" style="max-height: 60vh; overflow-y: auto;">
                <div class="preview-content">
                    <h2>${testData.title}</h2>
                    <p class="text-muted">${testData.description}</p>
                    <div class="preview-meta">
                        <span><strong>\u041F\u0440\u0435\u0434\u043C\u0435\u0442:</strong> ${getSubjectName(testData.subject)}</span>
                        <span><strong>\u0412\u0440\u0435\u043C\u044F:</strong> ${testData.time} \u043C\u0438\u043D</span>
                        <span><strong>\u0423\u0440\u043E\u0432\u0435\u043D\u044C:</strong> ${getLevelName(testData.level)}</span>
                        <span><strong>\u0412\u043E\u043F\u0440\u043E\u0441\u043E\u0432:</strong> ${testData.questions.length}</span>
                    </div>
                    <hr>
                    ${testData.questions.map((question, index) => `
                        <div class="preview-question">
                            <h4>\u0412\u043E\u043F\u0440\u043E\u0441 ${index + 1}: ${question.text}</h4>
                            ${question.type !== "text" && question.type !== "code" ? `
                                <div class="preview-options">
                                    ${question.options.map((option, optIndex) => `
                                        <div class="preview-option ${option.isCorrect ? "correct" : ""}">
                                            <span class="option-letter">${String.fromCharCode(65 + optIndex)}</span>
                                            <span>${option.text}</span>
                                            ${option.isCorrect ? '<span class="correct-badge"><i class="fas fa-check"></i></span>' : ""}
                                        </div>
                                    `).join("")}
                                </div>
                            ` : `
                                <div class="preview-text-answer">
                                    <em>${question.type === "code" ? "\u041E\u0442\u0432\u0435\u0442: \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u043E\u0434\u0430" : "\u041E\u0442\u0432\u0435\u0442: \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0432\u0432\u043E\u0434"}</em>
                                </div>
                            `}
                        </div>
                    `).join("")}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" id="preview-close">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>
            </div>
        </div>
    `;
  document.body.appendChild(modal);
  modal.querySelector(".modal-close").addEventListener("click", () => modal.remove());
  modal.querySelector("#preview-close").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
  showToast7("\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0442\u0435\u0441\u0442\u0430 \u043E\u0442\u043A\u0440\u044B\u0442", "info", "\u0413\u043E\u0442\u043E\u0432\u043E");
}
function getSubjectName(subject) {
  const subjects = {
    "russian": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A",
    "literature": "\u041B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
    "math": "\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430",
    "economics": "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0430",
    "programming": "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"
  };
  return subjects[subject] || subject;
}
function getLevelName(level) {
  const levels = {
    "beginner": "\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0439",
    "intermediate": "\u0421\u0440\u0435\u0434\u043D\u0438\u0439",
    "advanced": "\u041F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439"
  };
  return levels[level] || level;
}
function collectTestData() {
  const testTitle = document.getElementById("test-title");
  const testDescription = document.getElementById("test-description");
  const testSubject = document.getElementById("test-subject");
  const testTime = document.getElementById("test-time");
  const testLevel = document.getElementById("test-level");
  const testDueDate = document.getElementById("test-due-date");
  const testData = {
    title: testTitle?.value || "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",
    description: testDescription?.value || "",
    subject: testSubject?.value || "programming",
    time: testTime?.value || "20",
    level: testLevel?.value || "intermediate",
    dueDate: testDueDate?.value || "",
    questions: []
  };
  const questionCards = document.querySelectorAll(".question-card");
  questionCards.forEach((card) => {
    const questionTextElement = card.querySelector('textarea[id^="question-text-"]');
    const questionTypeElement = card.querySelector(".question-type-select");
    if (questionTextElement && questionTypeElement) {
      const question = {
        text: questionTextElement.value,
        type: questionTypeElement.value,
        options: []
      };
      const optionItems = card.querySelectorAll(".option-item");
      optionItems.forEach((option) => {
        const input = option.querySelector('input[type="text"]');
        if (input) {
          question.options.push({
            text: input.value,
            isCorrect: option.classList.contains("selected")
          });
        }
      });
      const codeBlock = card.querySelector(".code-block");
      if (codeBlock) {
        question.code = codeBlock.value;
      }
      testData.questions.push(question);
    }
  });
  return testData;
}
function saveTest() {
  const testData = collectTestData();
  if (testData.questions.length === 0) {
    showToast7("\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u0432\u043E\u043F\u0440\u043E\u0441 \u043F\u0435\u0440\u0435\u0434 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u043C", "warning", "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445");
    return;
  }
  if (!testData.title.trim()) {
    showToast7("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u0435\u0441\u0442\u0430", "warning", "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445");
    document.getElementById("test-title")?.focus();
    return;
  }
  const saveButton = document.getElementById("save-test-btn");
  const originalText = saveButton.innerHTML;
  saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435...';
  saveButton.disabled = true;
  setTimeout(() => {
    saveButton.innerHTML = originalText;
    saveButton.disabled = false;
    showToast7('\u0422\u0435\u0441\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D! \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0439\u0442\u0438 \u0435\u0433\u043E \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 "\u041C\u043E\u0438 \u0442\u0435\u0441\u0442\u044B".', "success", "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
  }, 1500);
}
function initCreateTestPage() {
  initToastSystem4();
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
  const subjectSelect = document.getElementById("test-subject");
  const programmingOnlyElements = document.querySelectorAll(".programming-only");
  const currentSubjectSpan = document.getElementById("current-subject");
  const testDueDateInput = document.getElementById("test-due-date");
  const dueDateInfo = document.getElementById("due-date-info");
  const dueDateText = document.getElementById("due-date-text");
  const defaultDate = /* @__PURE__ */ new Date();
  defaultDate.setDate(defaultDate.getDate() + 7);
  if (testDueDateInput) {
    testDueDateInput.valueAsDate = defaultDate;
    updateDueDateInfo();
  }
  function updateSubjectUI() {
    const selectedSubject = subjectSelect?.value || "programming";
    const isProgramming = selectedSubject === "programming";
    programmingOnlyElements.forEach((el) => {
      el.style.display = isProgramming ? "block" : "none";
    });
    if (currentSubjectSpan) {
      currentSubjectSpan.textContent = getSubjectName(selectedSubject);
    }
    const testCreationSection = document.querySelector(".test-creation");
    if (testCreationSection) {
      testCreationSection.classList.remove("subject-russian", "subject-literature", "subject-math", "subject-economics", "subject-programming");
      testCreationSection.classList.add(`subject-${selectedSubject}`);
    }
  }
  function updateDueDateInfo() {
    if (!testDueDateInput || !dueDateInfo || !dueDateText) return;
    const dueDate = new Date(testDueDateInput.value);
    const today = /* @__PURE__ */ new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1e3 * 3600 * 24));
    if (daysDiff > 0) {
      dueDateInfo.style.display = "flex";
      dueDateText.textContent = `\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ${daysDiff} \u0434\u043D\u0435\u0439 \u0434\u043E \u0441\u0434\u0430\u0447\u0438`;
      if (daysDiff > 14) {
        dueDateInfo.className = "due-date-info";
      } else if (daysDiff > 7) {
        dueDateInfo.className = "due-date-info warning";
      } else {
        dueDateInfo.className = "due-date-info danger";
      }
    } else if (daysDiff === 0) {
      dueDateInfo.style.display = "flex";
      dueDateInfo.className = "due-date-info danger";
      dueDateText.textContent = "\u0422\u0435\u0441\u0442 \u043D\u0443\u0436\u043D\u043E \u0441\u0434\u0430\u0442\u044C \u0441\u0435\u0433\u043E\u0434\u043D\u044F!";
    } else {
      dueDateInfo.style.display = "flex";
      dueDateInfo.className = "due-date-info danger";
      dueDateText.textContent = "\u0421\u0440\u043E\u043A \u0441\u0434\u0430\u0447\u0438 \u0438\u0441\u0442\u0435\u043A!";
    }
  }
  if (subjectSelect) {
    updateSubjectUI();
    subjectSelect.addEventListener("change", updateSubjectUI);
    if (testDueDateInput) {
      testDueDateInput.addEventListener("change", updateDueDateInfo);
    }
  }
  initQuestionEvents();
  const addQuestionBtn = document.querySelector(".add-question-btn");
  if (addQuestionBtn) {
    addQuestionBtn.addEventListener("click", () => createNewQuestion());
  }
  const addNavButton = document.querySelector(".questions-nav .question-nav-item:last-child");
  if (addNavButton) {
    addNavButton.addEventListener("click", () => createNewQuestion());
  }
  updateNavigation();
  navigateToQuestion(1);
  const previewBtn = document.querySelector(".test-creation-navigation .btn-light");
  if (previewBtn && previewBtn.querySelector(".fa-eye")) {
    previewBtn.addEventListener("click", previewTest);
  }
  const saveTestBtn = document.getElementById("save-test-btn");
  if (saveTestBtn) {
    saveTestBtn.addEventListener("click", saveTest);
  }
  const settingsBtn = document.getElementById("settings-btn");
  const shareBtn = document.getElementById("share-btn");
  const settingsModal = document.getElementById("settings-modal");
  const shareModal = document.getElementById("share-modal");
  const settingsClose = document.getElementById("settings-close");
  const shareClose = document.getElementById("share-close");
  const settingsCancel = document.getElementById("settings-cancel");
  const shareCancel = document.getElementById("share-cancel");
  const settingsSave = document.getElementById("settings-save");
  const copyLink = document.getElementById("copy-link");
  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("active");
    });
  }
  if (shareBtn && shareModal) {
    shareBtn.addEventListener("click", () => {
      shareModal.classList.add("active");
    });
  }
  function closeAllModals() {
    if (settingsModal) settingsModal.classList.remove("active");
    if (shareModal) shareModal.classList.remove("active");
    const helpModals = document.querySelectorAll(".modal-overlay");
    helpModals.forEach((modal) => modal.classList.remove("active"));
  }
  if (settingsClose) settingsClose.addEventListener("click", closeAllModals);
  if (shareClose) shareClose.addEventListener("click", closeAllModals);
  if (settingsCancel) settingsCancel.addEventListener("click", closeAllModals);
  if (shareCancel) shareCancel.addEventListener("click", closeAllModals);
  if (settingsSave) {
    settingsSave.addEventListener("click", () => {
      showToast7("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0442\u0435\u0441\u0442\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B!", "success", "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
      closeAllModals();
    });
  }
  if (copyLink) {
    copyLink.addEventListener("click", () => {
      const linkInput = document.querySelector(".share-link input");
      if (linkInput) {
        linkInput.select();
        document.execCommand("copy");
        const originalText = copyLink.innerHTML;
        copyLink.innerHTML = '<i class="fas fa-check"></i> \u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E!';
        setTimeout(() => {
          copyLink.innerHTML = originalText;
        }, 2e3);
        showToast7("\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430", "success", "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E");
      }
    });
  }
  const shareFacebook = document.getElementById("share-facebook");
  const shareTelegram = document.getElementById("share-telegram");
  const shareVk = document.getElementById("share-vk");
  const shareEmail = document.getElementById("share-email");
  const shareCopy = document.getElementById("share-copy");
  const shareActions = [shareFacebook, shareTelegram, shareVk, shareEmail, shareCopy];
  shareActions.forEach((action) => {
    if (action) {
      action.addEventListener("click", function() {
        const platform = this.querySelector("span").textContent;
        showToast7(`\u0424\u0443\u043D\u043A\u0446\u0438\u044F "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u0447\u0435\u0440\u0435\u0437 ${platform}" \u0431\u0443\u0434\u0435\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u043F\u043E\u0437\u0436\u0435`, "info", "\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435");
      });
    }
  });
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeAllModals();
    }
  });
  const testTypeOptions = document.querySelectorAll(".test-type-option");
  const aiAssistant = document.getElementById("ai-assistant");
  if (testTypeOptions.length > 0) {
    testTypeOptions.forEach((option) => {
      option.addEventListener("click", function() {
        testTypeOptions.forEach((opt) => opt.classList.remove("selected"));
        this.classList.add("selected");
        const testType = this.getAttribute("data-type");
        if (testType === "training") {
          if (aiAssistant) aiAssistant.style.display = "block";
        } else {
          if (aiAssistant) aiAssistant.style.display = "none";
        }
      });
    });
  }
  const aiRequestBtn = document.getElementById("ai-request-btn");
  const aiRequestInput = document.querySelector(".ai-request-input");
  const aiResponse = document.getElementById("ai-response");
  if (aiRequestBtn && aiRequestInput) {
    aiRequestBtn.addEventListener("click", function() {
      const request = aiRequestInput.value.trim();
      if (request.startsWith("/test")) {
        aiRequestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F...';
        aiRequestBtn.disabled = true;
        setTimeout(() => {
          if (aiResponse) aiResponse.classList.add("show");
          aiRequestBtn.innerHTML = '<i class="fas fa-paper-plane"></i> \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C';
          aiRequestBtn.disabled = false;
          showToast7("\u0412\u043E\u043F\u0440\u043E\u0441\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B", "success", "\u0418\u0418 \u0410\u043D\u0430\u0441\u0442\u0430\u0441\u0438\u044F");
        }, 2e3);
      } else {
        showToast7("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0444\u043E\u0440\u043C\u0430\u0442: /test <\u0442\u0435\u043C\u0430> [\u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C] [\u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E_\u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432]", "warning", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442");
      }
    });
  }
  const aiAddAllBtn = document.getElementById("ai-add-all");
  const aiCancelBtn = document.getElementById("ai-cancel");
  const aiQuestionItems = document.querySelectorAll(".ai-question-item");
  if (aiAddAllBtn) {
    aiAddAllBtn.addEventListener("click", function() {
      const aiQuestions = document.querySelectorAll(".ai-question-item");
      let addedCount = 0;
      aiQuestions.forEach((aiQuestion) => {
        createNewQuestion();
        const questionCards = document.querySelectorAll(".question-card");
        const lastQuestion = questionCards[questionCards.length - 1];
        const questionText = aiQuestion.textContent.replace(/^Вопрос \d+:\s*/, "");
        const textarea = lastQuestion.querySelector("textarea");
        if (textarea) {
          textarea.value = questionText;
        }
        const questionTextElement = lastQuestion.querySelector(".question-text");
        if (questionTextElement) {
          questionTextElement.textContent = questionText;
        }
        addedCount++;
      });
      if (aiResponse) {
        aiResponse.classList.remove("show");
      }
      if (aiRequestInput) {
        aiRequestInput.value = "";
      }
      showToast7(`\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ${addedCount} \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u0432 \u0442\u0435\u0441\u0442!`, "success", "\u0418\u0418 \u0410\u043D\u0430\u0441\u0442\u0430\u0441\u0438\u044F");
    });
  }
  if (aiCancelBtn) {
    aiCancelBtn.addEventListener("click", function() {
      if (aiResponse) aiResponse.classList.remove("show");
      if (aiRequestInput) aiRequestInput.value = "";
      showToast7("\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430", "info", "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E");
    });
  }
  if (aiQuestionItems.length > 0) {
    aiQuestionItems.forEach((item) => {
      item.addEventListener("click", function() {
        const questionText = this.textContent.replace(/^Вопрос \d+:\s*/, "");
        createNewQuestion();
        const questionCards = document.querySelectorAll(".question-card");
        const lastQuestion = questionCards[questionCards.length - 1];
        const textarea = lastQuestion.querySelector("textarea");
        if (textarea) {
          textarea.value = questionText;
        }
        const questionTextElement = lastQuestion.querySelector(".question-text");
        if (questionTextElement) {
          questionTextElement.textContent = questionText;
        }
        showToast7("\u0412\u043E\u043F\u0440\u043E\u0441 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0442\u0435\u0441\u0442", "success", "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E");
      });
    });
  }
  if (aiRequestInput) {
    aiRequestInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        if (aiRequestBtn) aiRequestBtn.click();
      }
    });
  }
  const requireRegistration = document.getElementById("require-registration");
  const passwordField = document.getElementById("password-field");
  if (requireRegistration && passwordField) {
    if (requireRegistration.checked) {
      passwordField.style.display = "block";
    } else {
      passwordField.style.display = "none";
    }
    requireRegistration.addEventListener("change", function() {
      if (this.checked) {
        passwordField.style.display = "block";
      } else {
        passwordField.style.display = "none";
      }
    });
  }
  const helpGuideLink = document.getElementById("help-guide-link");
  const helpTypesLink = document.getElementById("help-types-link");
  const helpAnalyticsLink = document.getElementById("help-analytics-link");
  if (helpGuideLink) {
    helpGuideLink.addEventListener("click", function(e) {
      e.preventDefault();
      const modal = document.getElementById("help-guide-modal");
      if (modal) modal.classList.add("active");
    });
  }
  if (helpTypesLink) {
    helpTypesLink.addEventListener("click", function(e) {
      e.preventDefault();
      const modal = document.getElementById("help-types-modal");
      if (modal) modal.classList.add("active");
    });
  }
  if (helpAnalyticsLink) {
    helpAnalyticsLink.addEventListener("click", function(e) {
      e.preventDefault();
      const modal = document.getElementById("help-analytics-modal");
      if (modal) modal.classList.add("active");
    });
  }
  const helpGuideClose = document.getElementById("help-guide-close");
  const helpTypesClose = document.getElementById("help-types-close");
  const helpAnalyticsClose = document.getElementById("help-analytics-close");
  const helpGuideCancel = document.getElementById("help-guide-cancel");
  const helpTypesCancel = document.getElementById("help-types-cancel");
  const helpAnalyticsCancel = document.getElementById("help-analytics-cancel");
  function closeHelpModals() {
    const modals = [
      "help-guide-modal",
      "help-types-modal",
      "help-analytics-modal"
    ];
    modals.forEach((modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove("active");
    });
  }
  if (helpGuideClose) helpGuideClose.addEventListener("click", closeHelpModals);
  if (helpTypesClose) helpTypesClose.addEventListener("click", closeHelpModals);
  if (helpAnalyticsClose) helpAnalyticsClose.addEventListener("click", closeHelpModals);
  if (helpGuideCancel) helpGuideCancel.addEventListener("click", closeHelpModals);
  if (helpTypesCancel) helpTypesCancel.addEventListener("click", closeHelpModals);
  if (helpAnalyticsCancel) helpAnalyticsCancel.addEventListener("click", closeHelpModals);
}
var toastContainer2;
var init_test_pages = __esm({
  "static/js/pages/test-pages.js"() {
    window.removeQuestion = removeQuestion2;
    window.showToast = showToast7;
    document.addEventListener("DOMContentLoaded", function() {
      if (document.querySelector(".test-creation")) {
        initCreateTestPage();
      }
    });
  }
});

// static/js/pages/homework-pages.js
function initHomeworkPages(currentPath) {
  console.log("Initializing homework pages for path:", currentPath);
  if (currentPath.includes("homework.html")) {
    initHomeworkListPage();
  } else if (currentPath.includes("homework-create.html")) {
    initHomeworkCreatePage();
  } else if (currentPath.includes("homework-detail.html")) {
    initHomeworkDetailPage();
  } else if (currentPath.includes("homework-results.html")) {
    initHomeworkResultsPage();
  } else if (currentPath.includes("homework-review.html")) {
    initHomeworkReviewPage();
  } else if (currentPath.includes("homework-templates.html")) {
    initHomeworkTemplatesPage();
  }
}
function showAlert2(message, type = "info") {
  const alert2 = document.createElement("div");
  alert2.className = `custom-alert ${type}`;
  const icon = getAlertIcon(type);
  alert2.innerHTML = `
        <div class="alert-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="alert-content">
            ${message}
        </div>
        <button class="alert-close">
            <i class="fas fa-times"></i>
        </button>
    `;
  document.body.appendChild(alert2);
  setTimeout(() => {
    alert2.classList.add("visible");
  }, 10);
  alert2.querySelector(".alert-close").addEventListener("click", function() {
    alert2.classList.remove("visible");
    setTimeout(() => {
      if (alert2.parentNode) {
        alert2.remove();
      }
    }, 300);
  });
  if (type === "success" || type === "info") {
    setTimeout(() => {
      if (alert2.parentNode) {
        alert2.classList.remove("visible");
        setTimeout(() => {
          if (alert2.parentNode) {
            alert2.remove();
          }
        }, 300);
      }
    }, 5e3);
  }
}
function getAlertIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-circle";
    case "warning":
      return "fa-exclamation-triangle";
    case "info":
      return "fa-info-circle";
    default:
      return "fa-info-circle";
  }
}
function initHomeworkListPage() {
  console.log("Initializing homework list page");
  initHomeworkFilters();
  initHomeworkCardInteractions();
}
function initHomeworkFilters() {
  const subjectFilter = document.getElementById("subject");
  const statusFilter = document.getElementById("status");
  const dueDateFilter = document.getElementById("due-date");
  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".search-box button");
  if (!subjectFilter && !statusFilter) {
    console.log("Homework filters not found on this page");
    return;
  }
  function filterHomework() {
    const subjectValue = subjectFilter ? subjectFilter.value : "all";
    const statusValue = statusFilter ? statusFilter.value : "all";
    const dueDateValue = dueDateFilter ? dueDateFilter.value : "";
    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const homeworkCards = document.querySelectorAll(".homework-card");
    homeworkCards.forEach((card) => {
      const cardSubject = card.querySelector(".homework-subject")?.textContent.toLowerCase() || "";
      const cardStatus = card.querySelector(".homework-status")?.textContent.toLowerCase() || "";
      const cardTitle = card.querySelector(".homework-title")?.textContent.toLowerCase() || "";
      const cardDueDateElement = card.querySelector(".homework-info-item:nth-child(2) .homework-info-value");
      const cardDueDate = cardDueDateElement ? cardDueDateElement.textContent : "";
      let showCard = true;
      if (subjectValue !== "all" && subjectFilter) {
        const subjectText = subjectFilter.options[subjectFilter.selectedIndex].text.toLowerCase();
        if (!cardSubject.includes(subjectText)) {
          showCard = false;
        }
      }
      if (statusValue !== "all" && statusFilter) {
        let statusClass = "";
        switch (statusValue) {
          case "new":
            statusClass = "status-new";
            break;
          case "in-progress":
            statusClass = "status-in-progress";
            break;
          case "reviewed":
            statusClass = "status-reviewed";
            break;
          case "overdue":
            statusClass = "status-overdue";
            break;
        }
        if (!card.querySelector(".homework-status")?.classList.contains(statusClass)) {
          showCard = false;
        }
      }
      if (dueDateValue && cardDueDate) {
        const dueDateParts = cardDueDate.split(".");
        const cardDueDateFormatted = `${dueDateParts[2]}-${dueDateParts[1]}-${dueDateParts[0]}`;
        if (cardDueDateFormatted !== dueDateValue) {
          showCard = false;
        }
      }
      if (searchValue && !cardTitle.includes(searchValue)) {
        showCard = false;
      }
      card.style.display = showCard ? "block" : "none";
    });
    const visibleCards = document.querySelectorAll('.homework-card[style="display: block"]');
    const noResultsMessage = document.getElementById("no-results-message");
    if (visibleCards.length === 0) {
      if (!noResultsMessage) {
        const message = document.createElement("div");
        message.id = "no-results-message";
        message.className = "no-results fade-in";
        message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>\u0417\u0430\u0434\u0430\u043D\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B</h3>
                    <p>\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438</p>
                `;
        document.querySelector(".homework-grid")?.appendChild(message);
        setTimeout(() => message.classList.add("visible"), 100);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
    }
  }
  if (subjectFilter) subjectFilter.addEventListener("change", filterHomework);
  if (statusFilter) statusFilter.addEventListener("change", filterHomework);
  if (dueDateFilter) dueDateFilter.addEventListener("change", filterHomework);
  if (searchButton) searchButton.addEventListener("click", filterHomework);
  if (searchInput) {
    searchInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        filterHomework();
      }
    });
  }
  setTimeout(filterHomework, 100);
}
function initHomeworkCardInteractions() {
  const homeworkCards = document.querySelectorAll(".homework-card");
  homeworkCards.forEach((card) => {
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";
    });
    card.addEventListener("click", function(e) {
      if (!e.target.closest(".btn")) {
        const detailLink = this.querySelector('a[href*="homework-detail"]');
        if (detailLink) {
          window.location.href = detailLink.getAttribute("href");
        }
      }
    });
  });
}
function initHomeworkCreatePage() {
  console.log("Initializing homework creation page");
  initHomeworkForm();
  initTemplatePreview();
  initCriteriaManagement();
  initFileUploadSection();
  initFormSubmission3();
}
function initHomeworkForm() {
  const form = document.querySelector(".form-content");
  if (!form) return;
  setupDateDefaults();
  initBasicValidation();
}
function setupDateDefaults() {
  const today = /* @__PURE__ */ new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const startDateInput = document.getElementById("assignment-start");
  const dueDateInput = document.getElementById("assignment-due");
  if (startDateInput && !startDateInput.value) {
    startDateInput.valueAsDate = today;
  }
  if (dueDateInput && !dueDateInput.value) {
    dueDateInput.valueAsDate = nextWeek;
  }
  if (startDateInput && dueDateInput) {
    startDateInput.addEventListener("change", function() {
      const startDate = new Date(this.value);
      const dueDate = new Date(dueDateInput.value);
      if (dueDate < startDate) {
        dueDateInput.valueAsDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1e3);
        updatePreview();
      }
    });
    dueDateInput.addEventListener("change", function() {
      const startDate = new Date(startDateInput.value);
      const dueDate = new Date(this.value);
      if (dueDate < startDate) {
        showAlert2("\u0421\u0440\u043E\u043A \u0441\u0434\u0430\u0447\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0440\u0430\u043D\u044C\u0448\u0435 \u0434\u0430\u0442\u044B \u0432\u044B\u0434\u0430\u0447\u0438", "error");
        this.valueAsDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1e3);
      }
      updatePreview();
    });
  }
}
function initBasicValidation() {
  const requiredFields = document.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    field.addEventListener("blur", function() {
      if (!this.value.trim()) {
        this.classList.add("error");
      } else {
        this.classList.remove("error");
      }
    });
  });
}
function initCriteriaManagement() {
  const addCriteriaBtn = document.getElementById("add-criteria-btn");
  const criteriaList = document.getElementById("criteria-list");
  if (!addCriteriaBtn || !criteriaList) return;
  let criteriaCount = criteriaList.querySelectorAll(".criteria-item").length || 1;
  addCriteriaBtn.addEventListener("click", function() {
    criteriaCount++;
    const criteriaItem = document.createElement("div");
    criteriaItem.className = "criteria-item fade-in";
    criteriaItem.innerHTML = `
            <div class="criteria-inputs">
                <div class="form-group">
                    <label>\u041A\u0440\u0438\u0442\u0435\u0440\u0438\u0439 ${criteriaCount}</label>
                    <input type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u044F" class="criteria-name">
                </div>
                <div class="form-group">
                    <label>\u0411\u0430\u043B\u043B\u044B</label>
                    <input type="number" min="1" max="10" value="1" class="criteria-points">
                </div>
            </div>
            <div class="criteria-actions">
                <i class="fas fa-times criteria-remove" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0439"></i>
            </div>
        `;
    criteriaList.appendChild(criteriaItem);
    setTimeout(() => {
      criteriaItem.classList.add("visible");
    }, 10);
    criteriaItem.querySelector(".criteria-remove").addEventListener("click", function() {
      if (criteriaCount > 1) {
        criteriaItem.style.opacity = "0";
        criteriaItem.style.transform = "translateX(-20px)";
        setTimeout(() => {
          criteriaItem.remove();
          criteriaCount--;
          updateCriteriaNumbers();
          updateTotalScorePreview();
        }, 300);
      } else {
        showAlert2("\u0414\u043E\u043B\u0436\u0435\u043D \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0439 \u043E\u0446\u0435\u043D\u043A\u0438", "warning");
      }
    });
    const pointsInput = criteriaItem.querySelector(".criteria-points");
    pointsInput.addEventListener("input", updateTotalScorePreview);
    updateCriteriaNumbers();
    updateTotalScorePreview();
  });
  const initialRemoveBtns = criteriaList.querySelectorAll(".criteria-remove");
  initialRemoveBtns.forEach((btn) => {
    btn.addEventListener("click", function() {
      const criteriaItem = this.closest(".criteria-item");
      if (criteriaCount > 1) {
        criteriaItem.style.opacity = "0";
        criteriaItem.style.transform = "translateX(-20px)";
        setTimeout(() => {
          criteriaItem.remove();
          criteriaCount--;
          updateCriteriaNumbers();
          updateTotalScorePreview();
        }, 300);
      } else {
        showAlert2("\u0414\u043E\u043B\u0436\u0435\u043D \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0439 \u043E\u0446\u0435\u043D\u043A\u0438", "warning");
      }
    });
  });
  criteriaList.querySelectorAll(".criteria-points").forEach((input) => {
    input.addEventListener("input", updateTotalScorePreview);
  });
}
function updateCriteriaNumbers() {
  const criteriaList = document.getElementById("criteria-list");
  if (!criteriaList) return;
  const criteriaItems = criteriaList.querySelectorAll(".criteria-item");
  criteriaItems.forEach((item, index) => {
    const label = item.querySelector("label");
    if (label) {
      label.textContent = `\u041A\u0440\u0438\u0442\u0435\u0440\u0438\u0439 ${index + 1}`;
    }
  });
}
function updateTotalScorePreview() {
  const criteriaPoints = document.querySelectorAll(".criteria-points");
  let totalScore = 0;
  criteriaPoints.forEach((input) => {
    totalScore += parseInt(input.value) || 0;
  });
  const maxScoreInput = document.getElementById("max-score");
  if (maxScoreInput) {
    maxScoreInput.value = totalScore;
  }
  const previewScore = document.getElementById("preview-score");
  if (previewScore) {
    previewScore.textContent = totalScore;
  }
}
function initTemplatePreview() {
  const previewElements = {
    title: document.getElementById("preview-title"),
    subject: document.getElementById("preview-subject"),
    description: document.getElementById("preview-description"),
    difficulty: document.getElementById("preview-difficulty"),
    due: document.getElementById("preview-due"),
    score: document.getElementById("preview-score"),
    time: document.getElementById("preview-time")
  };
  const formElements = {
    title: document.getElementById("assignment-title"),
    subject: document.getElementById("assignment-subject"),
    difficulty: document.getElementById("assignment-difficulty"),
    description: document.getElementById("assignment-description"),
    due: document.getElementById("assignment-due"),
    time: document.getElementById("assignment-time"),
    score: document.getElementById("max-score")
  };
  const hasAllElements = Object.values(previewElements).every((el) => el !== null) && Object.values(formElements).every((el) => el !== null);
  if (!hasAllElements) {
    console.log("Some preview elements are missing");
    return;
  }
  function updatePreview2() {
    previewElements.title.textContent = formElements.title.value || "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F";
    const subjectText = formElements.subject.options[formElements.subject.selectedIndex].text;
    previewElements.subject.textContent = subjectText !== "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442" ? subjectText : "\u041F\u0440\u0435\u0434\u043C\u0435\u0442";
    previewElements.description.textContent = formElements.description.value || "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C \u043F\u043E\u0441\u043B\u0435 \u0432\u0432\u043E\u0434\u0430.";
    const difficultyText = formElements.difficulty.options[formElements.difficulty.selectedIndex].text;
    previewElements.difficulty.textContent = difficultyText;
    previewElements.due.textContent = formElements.due.value ? formatDate2(formElements.due.value) : "--.--.----";
    previewElements.score.textContent = formElements.score.value || "10";
    previewElements.time.textContent = formElements.time.value ? `${formElements.time.value} \u0447` : "- \u0447";
  }
  function formatDate2(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
  }
  updatePreview2();
  Object.values(formElements).forEach((element) => {
    if (element) {
      element.addEventListener("input", updatePreview2);
      element.addEventListener("change", updatePreview2);
    }
  });
  const refreshPreviewBtn = document.getElementById("refresh-preview-btn");
  if (refreshPreviewBtn) {
    refreshPreviewBtn.addEventListener("click", function() {
      updatePreview2();
      showAlert2("\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D", "success");
    });
  }
}
function initFileUploadSection() {
  const fileUploadArea = document.getElementById("file-upload-area");
  const fileInput = document.getElementById("file-input");
  const fileList = document.getElementById("file-list");
  if (!fileUploadArea || !fileInput || !fileList) return;
  initBasicFileUpload(fileUploadArea, fileInput, fileList);
}
function initBasicFileUpload(uploadArea, input, list) {
  uploadArea.classList.add("file-upload-area");
  uploadArea.addEventListener("click", function() {
    input.click();
  });
  uploadArea.addEventListener("dragover", function(e) {
    e.preventDefault();
    this.classList.add("dragover");
  });
  uploadArea.addEventListener("dragleave", function() {
    this.classList.remove("dragover");
  });
  uploadArea.addEventListener("drop", function(e) {
    e.preventDefault();
    this.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        addFileToList(file, list);
      });
    }
  });
  input.addEventListener("change", function() {
    if (this.files.length > 0) {
      Array.from(this.files).forEach((file) => {
        addFileToList(file, list);
      });
      this.value = "";
    }
  });
}
function addFileToList(file, list) {
  const fileItem = document.createElement("div");
  fileItem.className = "file-item fade-in";
  const fileExtension = file.name.split(".").pop().toLowerCase();
  let fileIcon = "fa-file";
  if (["pdf"].includes(fileExtension)) {
    fileIcon = "fa-file-pdf";
  } else if (["doc", "docx"].includes(fileExtension)) {
    fileIcon = "fa-file-word";
  } else if (["jpg", "jpeg", "png", "gif", "bmp", "svg"].includes(fileExtension)) {
    fileIcon = "fa-file-image";
  } else if (["zip", "rar", "7z", "tar", "gz"].includes(fileExtension)) {
    fileIcon = "fa-file-archive";
  } else if (["xls", "xlsx"].includes(fileExtension)) {
    fileIcon = "fa-file-excel";
  } else if (["ppt", "pptx"].includes(fileExtension)) {
    fileIcon = "fa-file-powerpoint";
  }
  const fileSize = formatFileSize2(file.size);
  fileItem.innerHTML = `
        <div class="file-info">
            <i class="fas ${fileIcon}"></i>
            <div class="file-details">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${fileSize}</div>
            </div>
        </div>
        <div class="file-remove" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u0430\u0439\u043B">
            <i class="fas fa-times"></i>
        </div>
    `;
  list.appendChild(fileItem);
  setTimeout(() => {
    fileItem.classList.add("visible");
  }, 10);
  fileItem.querySelector(".file-remove").addEventListener("click", function() {
    fileItem.style.opacity = "0";
    fileItem.style.transform = "translateX(-20px)";
    setTimeout(() => {
      fileItem.remove();
    }, 300);
  });
}
function formatFileSize2(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
function initFormSubmission3() {
  const saveDraftBtn = document.getElementById("save-draft-btn");
  const createAssignmentBtn = document.getElementById("create-assignment-btn");
  const successModal = document.getElementById("success-modal");
  const viewAssignmentBtn = document.getElementById("view-assignment-btn");
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", function() {
      if (validateForm3(true)) {
        showAlert2("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D", "success");
        this.innerHTML = '<i class="fas fa-check"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E';
        this.classList.add("btn-success");
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-save"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A';
          this.classList.remove("btn-success");
        }, 2e3);
      }
    });
  }
  if (createAssignmentBtn) {
    createAssignmentBtn.addEventListener("click", function() {
      if (validateForm3()) {
        if (successModal) {
          successModal.classList.add("active");
        } else {
          showAlert2("\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u043E!", "success");
          setTimeout(() => {
            window.location.href = "/frontend/templates/homework/homework.html";
          }, 2e3);
        }
      }
    });
  }
  if (viewAssignmentBtn) {
    viewAssignmentBtn.addEventListener("click", function() {
      window.location.href = "/frontend/templates/homework/homework-detail.html";
    });
  }
}
function validateForm3(isDraft = false) {
  const title = document.getElementById("assignment-title");
  const subject = document.getElementById("assignment-subject");
  const description = document.getElementById("assignment-description");
  const dueDate = document.getElementById("assignment-due");
  let isValid = true;
  document.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  if (!isDraft) {
    if (!title || !title.value.trim()) {
      markFieldError(title, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F");
      isValid = false;
    }
    if (!subject || !subject.value) {
      markFieldError(subject, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442");
      isValid = false;
    }
    if (!description || !description.value.trim()) {
      markFieldError(description, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F");
      isValid = false;
    }
    if (!dueDate || !dueDate.value) {
      markFieldError(dueDate, "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0440\u043E\u043A \u0441\u0434\u0430\u0447\u0438");
      isValid = false;
    }
  }
  if (!isValid && !isDraft) {
    showAlert2("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F", "error");
    const firstError = document.querySelector(".error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
  }
  return isDraft ? true : isValid;
}
function markFieldError(field, message) {
  if (!field) return;
  field.classList.add("error");
  let errorElement = field.parentNode.querySelector(".error-message");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    field.parentNode.appendChild(errorElement);
  }
  errorElement.textContent = message;
}
function initHomeworkDetailPage() {
  console.log("Initializing homework detail page");
  initSubmissionOptions();
  initHomeworkSubmission();
  initHomeworkSidebar();
  initDeadlineCounter();
}
function initSubmissionOptions() {
  const textOption = document.getElementById("text-option");
  const fileOption = document.getElementById("file-option");
  const textForm = document.getElementById("text-form");
  const fileForm = document.getElementById("file-form");
  const fileUploadArea = document.getElementById("file-upload-area");
  const fileInput = document.getElementById("file-input");
  const fileName = document.getElementById("file-name");
  if (!textOption || !fileOption) return;
  textOption.addEventListener("click", function() {
    textOption.classList.add("active");
    fileOption.classList.remove("active");
    if (textForm) textForm.style.display = "block";
    if (fileForm) fileForm.style.display = "none";
  });
  fileOption.addEventListener("click", function() {
    fileOption.classList.add("active");
    textOption.classList.remove("active");
    if (fileForm) fileForm.style.display = "block";
    if (textForm) textForm.style.display = "none";
  });
  if (fileUploadArea && fileInput && fileName) {
    fileUploadArea.addEventListener("click", function() {
      fileInput.click();
    });
    fileInput.addEventListener("change", function() {
      if (fileInput.files.length > 0) {
        fileName.textContent = `\u0412\u044B\u0431\u0440\u0430\u043D \u0444\u0430\u0439\u043B: ${fileInput.files[0].name}`;
        fileName.style.color = "var(--success-color)";
      } else {
        fileName.textContent = "";
      }
    });
  }
}
function initHomeworkSubmission() {
  const submitBtn = document.getElementById("submit-btn");
  const saveDraftBtn = document.getElementById("save-draft-btn");
  const resultsSection = document.getElementById("results");
  const feedbackText = document.getElementById("feedback-text");
  if (!submitBtn) return;
  submitBtn.addEventListener("click", function() {
    const solutionText = document.getElementById("solution-text");
    const fileInput = document.getElementById("file-input");
    const file = fileInput?.files[0];
    const textOption = document.getElementById("text-option");
    if (textOption?.classList.contains("active") && (!solutionText || !solutionText.value.trim())) {
      showAlert2("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0441 \u0440\u0435\u0448\u0435\u043D\u0438\u0435\u043C", "warning");
      solutionText?.focus();
      return;
    }
    if (!textOption?.classList.contains("active") && !file) {
      showAlert2("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438", "warning");
      return;
    }
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430...';
    this.disabled = true;
    setTimeout(() => {
      this.innerHTML = originalText;
      this.disabled = false;
      if (textOption?.classList.contains("active")) {
        if (feedbackText) {
          feedbackText.textContent = "\u0412\u0430\u0448\u0430 \u0440\u0430\u0431\u043E\u0442\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443. \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0435\u043C. \u041E\u0431\u044B\u0447\u043D\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 1-3 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u044F.";
        }
      } else {
        if (feedbackText) {
          feedbackText.textContent = `\u0424\u0430\u0439\u043B "${file.name}" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443. \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0435\u043C. \u041E\u0431\u044B\u0447\u043D\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 1-3 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u044F.`;
        }
      }
      if (resultsSection) {
        resultsSection.style.display = "block";
        resultsSection.scrollIntoView({ behavior: "smooth" });
        showAlert2("\u0420\u0430\u0431\u043E\u0442\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443", "success");
      }
    }, 1500);
  });
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", function() {
      const solutionText = document.getElementById("solution-text");
      showAlert2("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D", "success");
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E';
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 2e3);
    });
  }
}
function initHomeworkSidebar() {
  const tipsItems = document.querySelectorAll(".tips-list li");
  const resourceLinks = document.querySelectorAll(".resources-list a");
  tipsItems.forEach((tip, index) => {
    tip.style.animationDelay = `${index * 0.1}s`;
    tip.classList.add("fade-in");
    setTimeout(() => tip.classList.add("visible"), 100);
  });
  resourceLinks.forEach((link) => {
    link.addEventListener("mouseenter", function() {
      this.style.transform = "translateX(5px)";
    });
    link.addEventListener("mouseleave", function() {
      this.style.transform = "translateX(0)";
    });
  });
}
function initDeadlineCounter() {
  const deadlineElement = document.querySelector(".meta-item span");
  if (!deadlineElement) return;
  const deadlineText = deadlineElement.textContent;
  const deadlineMatch = deadlineText.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (deadlineMatch) {
    const deadlineDate = /* @__PURE__ */ new Date(`${deadlineMatch[3]}-${deadlineMatch[2]}-${deadlineMatch[1]}`);
    updateDeadlineCounter(deadlineDate);
  }
}
function updateDeadlineCounter(deadlineDate) {
  const now = /* @__PURE__ */ new Date();
  const timeDiff = deadlineDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeDiff / (1e3 * 3600 * 24));
  const daysLeftElement = document.querySelector(".info-item:nth-child(5) .info-value");
  if (daysLeftElement) {
    daysLeftElement.textContent = `${daysLeft} ${getDaysText(daysLeft)}`;
    if (daysLeft <= 0) {
      daysLeftElement.style.color = "var(--error-color)";
      daysLeftElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> \u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043E`;
    } else if (daysLeft <= 3) {
      daysLeftElement.style.color = "var(--warning-color)";
    }
  }
}
function getDaysText(days) {
  if (days % 10 === 1 && days % 100 !== 11) return "\u0434\u0435\u043D\u044C";
  if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) return "\u0434\u043D\u044F";
  return "\u0434\u043D\u0435\u0439";
}
function initHomeworkResultsPage() {
  console.log("Initializing homework results page");
  initResultsTabs();
  initResubmissionHandler();
  initProgressBars();
  initFeedbackInteractions();
}
function initResultsTabs() {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      tab.classList.add("active");
      const targetTab = document.getElementById(`${tabId}-tab`);
      if (targetTab) {
        targetTab.classList.add("active");
      }
    });
  });
}
function initResubmissionHandler() {
  const resubmitBtn = document.getElementById("resubmit-btn");
  if (resubmitBtn) {
    resubmitBtn.addEventListener("click", function() {
      if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0435\u0440\u0435\u0441\u0434\u0430\u0442\u044C \u044D\u0442\u043E \u0437\u0430\u0434\u0430\u043D\u0438\u0435? \u0423 \u0432\u0430\u0441 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C 2 \u043F\u043E\u043F\u044B\u0442\u043A\u0438.")) {
        window.location.href = "/frontend/templates/homework/homework-detail.html";
      }
    });
  }
}
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.transition = "width 1s ease-in-out";
      bar.style.width = width;
    }, 300);
  });
}
function initFeedbackInteractions() {
  const feedbackCard = document.querySelector(".feedback-card");
  if (feedbackCard) {
    feedbackCard.addEventListener("click", function() {
      this.classList.toggle("expanded");
    });
  }
  const criteriaItems = document.querySelectorAll(".criteria-item");
  criteriaItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add("fade-in");
    setTimeout(() => item.classList.add("visible"), 100);
  });
}
function initHomeworkReviewPage() {
  console.log("Initializing homework review page");
  initReviewInterface();
  initReviewFilters();
  initScoreCalculation();
  initReviewSubmission();
  initNextSubmissionHandler();
}
function initReviewInterface() {
  initSubmissionSwitcher();
  initReviewTabs();
}
function initSubmissionSwitcher() {
  const submissionItems = document.querySelectorAll(".submission-item");
  submissionItems.forEach((item) => {
    item.addEventListener("click", function() {
      submissionItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
      const studentName = this.querySelector(".student-name")?.textContent;
      const assignmentTitle = this.querySelector(".assignment-title")?.textContent;
      if (studentName) {
        const studentNameElement = document.querySelector(".student-details h3");
        if (studentNameElement) studentNameElement.textContent = studentName;
      }
      if (assignmentTitle) {
        const assignmentNameElement = document.querySelector(".assignment-name");
        if (assignmentNameElement) assignmentNameElement.textContent = assignmentTitle;
      }
      if (studentName) {
        const names = studentName.split(" ");
        const initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : "");
        const avatar = document.querySelector(".student-avatar");
        if (avatar) {
          avatar.textContent = initials;
        }
      }
      resetReviewForm();
    });
  });
}
function resetReviewForm() {
  const overallScoreInput = document.getElementById("overall-score");
  const criteriaInputs = document.querySelectorAll(".criteria-input");
  const feedbackTextarea = document.getElementById("feedback");
  const teacherCommentTextarea = document.getElementById("teacher-comment");
  if (overallScoreInput) overallScoreInput.value = 0;
  criteriaInputs.forEach((input) => input.value = 0);
  if (feedbackTextarea) feedbackTextarea.value = "";
  if (teacherCommentTextarea) teacherCommentTextarea.value = "";
  calculateTotalScore();
}
function initReviewTabs() {
  const reviewTabs = document.querySelectorAll(".review-tab");
  const tabContents = document.querySelectorAll(".tab-content");
  reviewTabs.forEach((tab) => {
    tab.addEventListener("click", function() {
      const tabId = this.getAttribute("data-tab");
      reviewTabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      this.classList.add("active");
      const targetTab = document.getElementById(`${tabId}-tab`);
      if (targetTab) {
        targetTab.classList.add("active");
      }
    });
  });
}
function initReviewFilters() {
  const subjectFilter = document.getElementById("subject");
  const statusFilter = document.getElementById("status");
  const groupFilter = document.getElementById("group");
  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".search-box button");
  if (!subjectFilter && !statusFilter) return;
  function filterSubmissions() {
    const subjectValue = subjectFilter ? subjectFilter.value : "all";
    const statusValue = statusFilter ? statusFilter.value : "all";
    const groupValue = groupFilter ? groupFilter.value : "all";
    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const submissionItems = document.querySelectorAll(".submission-item");
    submissionItems.forEach((item) => {
      const studentName = item.querySelector(".student-name")?.textContent.toLowerCase() || "";
      const assignmentTitle = item.querySelector(".assignment-title")?.textContent.toLowerCase() || "";
      const status = item.querySelector(".submission-status")?.textContent.toLowerCase() || "";
      let showItem = true;
      if (subjectValue !== "all") {
        if (subjectValue !== "math") {
          showItem = false;
        }
      }
      if (statusValue !== "all") {
        let statusClass = "";
        switch (statusValue) {
          case "pending":
            statusClass = "\u043E\u0436\u0438\u0434\u0430\u0435\u0442";
            break;
          case "reviewed":
            statusClass = "\u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E";
            break;
          case "returned":
            statusClass = "\u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u043E";
            break;
        }
        if (!status.includes(statusClass)) {
          showItem = false;
        }
      }
      if (searchValue && !studentName.includes(searchValue) && !assignmentTitle.includes(searchValue)) {
        showItem = false;
      }
      item.style.display = showItem ? "flex" : "none";
    });
    updatePendingCounter();
  }
  function updatePendingCounter() {
    const pendingItems = document.querySelectorAll('.submission-item[style="display: flex"] .status-pending');
    const pendingCounter = document.querySelector(".stat-item:first-child .stat-value");
    if (pendingCounter && pendingItems.length > 0) {
      pendingCounter.textContent = pendingItems.length;
    }
  }
  if (subjectFilter) subjectFilter.addEventListener("change", filterSubmissions);
  if (statusFilter) statusFilter.addEventListener("change", filterSubmissions);
  if (groupFilter) groupFilter.addEventListener("change", filterSubmissions);
  if (searchButton) searchButton.addEventListener("click", filterSubmissions);
  if (searchInput) {
    searchInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        filterSubmissions();
      }
    });
  }
  setTimeout(filterSubmissions, 100);
}
function initScoreCalculation() {
  const criteriaInputs = document.querySelectorAll(".criteria-input");
  const overallScoreInput = document.getElementById("overall-score");
  const totalScoreValue = document.getElementById("total-score-value");
  if (!criteriaInputs.length || !overallScoreInput || !totalScoreValue) return;
  function calculateTotalScore2() {
    let total = 0;
    criteriaInputs.forEach((input) => {
      total += parseInt(input.value) || 0;
    });
    overallScoreInput.value = total;
    totalScoreValue.textContent = `${total} / 10`;
    updateGradeColor(total);
  }
  function updateGradeColor(score) {
    const maxScore = 10;
    const percentage = score / maxScore * 100;
    if (percentage >= 80) {
      totalScoreValue.style.color = "var(--success-color)";
    } else if (percentage >= 60) {
      totalScoreValue.style.color = "var(--warning-color)";
    } else {
      totalScoreValue.style.color = "var(--error-color)";
    }
  }
  criteriaInputs.forEach((input) => {
    input.addEventListener("input", calculateTotalScore2);
  });
  overallScoreInput.addEventListener("input", function() {
    totalScoreValue.textContent = `${this.value} / 10`;
    updateGradeColor(parseInt(this.value) || 0);
  });
  calculateTotalScore2();
}
function initReviewSubmission() {
  const saveDraftBtn = document.getElementById("save-draft-btn");
  const returnBtn = document.getElementById("return-btn");
  const submitReviewBtn = document.getElementById("submit-review-btn");
  const successModal = document.getElementById("success-modal");
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", function() {
      showAlert2("\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043E\u0446\u0435\u043D\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D", "success");
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E';
      setTimeout(() => {
        this.innerHTML = originalHTML;
      }, 2e3);
    });
  }
  if (returnBtn) {
    returnBtn.addEventListener("click", function() {
      if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u044D\u0442\u0443 \u0440\u0430\u0431\u043E\u0442\u0443 \u043D\u0430 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0443? \u0421\u0442\u0443\u0434\u0435\u043D\u0442 \u043F\u043E\u043B\u0443\u0447\u0438\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0438 \u0441\u043C\u043E\u0436\u0435\u0442 \u0438\u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u0443.")) {
        showAlert2("\u0420\u0430\u0431\u043E\u0442\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0430 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0443 \u043D\u0430 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0443", "success");
        const activeSubmission = document.querySelector(".submission-item.active");
        if (activeSubmission) {
          const statusElement = activeSubmission.querySelector(".submission-status");
          if (statusElement) {
            statusElement.textContent = "\u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u043E";
            statusElement.className = "submission-status status-returned";
          }
        }
      }
    });
  }
  if (submitReviewBtn) {
    submitReviewBtn.addEventListener("click", function() {
      const overallScore = document.getElementById("overall-score")?.value;
      const feedback = document.getElementById("feedback")?.value;
      if (!overallScore || overallScore === "0") {
        showAlert2("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443", "warning");
        return;
      }
      if (!feedback || !feedback.trim()) {
        showAlert2("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043E\u0431\u0440\u0430\u0442\u043D\u0443\u044E \u0441\u0432\u044F\u0437\u044C \u0434\u043B\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430", "warning");
        return;
      }
      if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443? \u0421\u0442\u0443\u0434\u0435\u043D\u0442 \u043F\u043E\u043B\u0443\u0447\u0438\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0441 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u043C\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438.")) {
        if (successModal) {
          successModal.classList.add("active");
        }
        const activeSubmission = document.querySelector(".submission-item.active");
        if (activeSubmission) {
          const statusElement = activeSubmission.querySelector(".submission-status");
          if (statusElement) {
            statusElement.textContent = "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E";
            statusElement.className = "submission-status status-reviewed";
          }
        }
        showAlert2("\u041E\u0446\u0435\u043D\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0443", "success");
      }
    });
  }
}
function initNextSubmissionHandler() {
  const nextSubmissionBtn = document.getElementById("next-submission-btn");
  if (nextSubmissionBtn) {
    nextSubmissionBtn.addEventListener("click", function() {
      const successModal = document.getElementById("success-modal");
      if (successModal) {
        successModal.classList.remove("active");
      }
      const currentActive = document.querySelector(".submission-item.active");
      const nextItem = currentActive?.nextElementSibling;
      if (nextItem && nextItem.classList.contains("submission-item")) {
        currentActive.classList.remove("active");
        nextItem.classList.add("active");
        const studentName = nextItem.querySelector(".student-name")?.textContent;
        const assignmentTitle = nextItem.querySelector(".assignment-title")?.textContent;
        if (studentName) {
          document.querySelector(".student-name").textContent = studentName;
        }
        if (assignmentTitle) {
          document.querySelector(".assignment-name").textContent = assignmentTitle;
        }
        if (studentName) {
          const names = studentName.split(" ");
          const initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : "");
          const avatar = document.querySelector(".student-avatar");
          if (avatar) {
            avatar.textContent = initials;
          }
        }
        resetReviewForm();
        const reviewTabs = document.querySelectorAll(".review-tab");
        const tabContents = document.querySelectorAll(".tab-content");
        reviewTabs.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        const submissionTab = document.querySelector('.review-tab[data-tab="submission"]');
        const submissionTabContent = document.getElementById("submission-tab");
        if (submissionTab) submissionTab.classList.add("active");
        if (submissionTabContent) submissionTabContent.classList.add("active");
        showAlert2("\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u043A \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0440\u0430\u0431\u043E\u0442\u0435", "info");
      } else {
        showAlert2("\u042D\u0442\u043E \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435", "info");
      }
    });
  }
}
function initHomeworkTemplatesPage() {
  console.log("Initializing homework templates page");
  initTemplateFilters();
  initTemplatePreviewModal();
  initTemplateUsage();
  initTemplateCardInteractions();
}
function initTemplateFilters() {
  const subjectFilter = document.getElementById("subject");
  const difficultyFilter = document.getElementById("difficulty");
  const typeFilter = document.getElementById("type");
  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".search-box button");
  if (!subjectFilter && !difficultyFilter) return;
  function filterTemplates() {
    const subjectValue = subjectFilter ? subjectFilter.value : "all";
    const difficultyValue = difficultyFilter ? difficultyFilter.value : "all";
    const typeValue = typeFilter ? typeFilter.value : "all";
    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const templateCards = document.querySelectorAll(".template-card");
    templateCards.forEach((card) => {
      const cardSubject = card.querySelector(".template-subject")?.textContent.toLowerCase() || "";
      const cardDifficultyElement = card.querySelector(".template-info-item:nth-child(1) .template-info-value");
      const cardDifficulty = cardDifficultyElement ? cardDifficultyElement.textContent.toLowerCase() : "";
      const cardTypeElement = card.querySelector(".template-info-item:nth-child(3) .template-info-value");
      const cardType = cardTypeElement ? cardTypeElement.textContent.toLowerCase() : "";
      const cardTitle = card.querySelector(".template-title")?.textContent.toLowerCase() || "";
      let showCard = true;
      if (subjectValue !== "all") {
        const subjectText = subjectFilter.options[subjectFilter.selectedIndex].text.toLowerCase();
        if (!cardSubject.includes(subjectText)) {
          showCard = false;
        }
      }
      if (difficultyValue !== "all") {
        let difficultyClass = "";
        switch (difficultyValue) {
          case "easy":
            difficultyClass = "\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0439";
            break;
          case "medium":
            difficultyClass = "\u0441\u0440\u0435\u0434\u043D\u0438\u0439";
            break;
          case "hard":
            difficultyClass = "\u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439";
            break;
        }
        if (cardDifficulty !== difficultyClass) {
          showCard = false;
        }
      }
      if (typeValue !== "all") {
        let typeClass = "";
        switch (typeValue) {
          case "theory":
            typeClass = "\u0442\u0435\u043E\u0440\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435";
            break;
          case "practice":
            typeClass = "\u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435";
            break;
          case "project":
            typeClass = "\u043F\u0440\u043E\u0435\u043A\u0442\u043D\u043E\u0435";
            break;
          case "research":
            typeClass = "\u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0435";
            break;
        }
        if (!cardType.includes(typeClass)) {
          showCard = false;
        }
      }
      if (searchValue && !cardTitle.includes(searchValue)) {
        showCard = false;
      }
      card.style.display = showCard ? "block" : "none";
    });
    const visibleCards = document.querySelectorAll('.template-card[style="display: block"]');
    const noResultsMessage = document.getElementById("no-templates-message");
    if (visibleCards.length === 0) {
      if (!noResultsMessage) {
        const message = document.createElement("div");
        message.id = "no-templates-message";
        message.className = "no-results fade-in";
        message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B</h3>
                    <p>\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438</p>
                `;
        document.querySelector(".templates-grid")?.appendChild(message);
        setTimeout(() => message.classList.add("visible"), 100);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
    }
  }
  if (subjectFilter) subjectFilter.addEventListener("change", filterTemplates);
  if (difficultyFilter) difficultyFilter.addEventListener("change", filterTemplates);
  if (typeFilter) typeFilter.addEventListener("change", filterTemplates);
  if (searchButton) searchButton.addEventListener("click", filterTemplates);
  if (searchInput) {
    searchInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        filterTemplates();
      }
    });
  }
  setTimeout(filterTemplates, 100);
}
function initTemplatePreviewModal() {
  const previewModal = document.getElementById("preview-modal");
  const previewClose = document.getElementById("preview-close");
  const previewCancel = document.getElementById("preview-cancel");
  const previewButtons = document.querySelectorAll(".preview-template");
  if (!previewModal) return;
  const templateData = {
    1: {
      title: "\u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u044B\u0445 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0439",
      description: `\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u0437\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u043D\u0430\u0432\u044B\u043A\u043E\u0432 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u044B\u0445 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0439 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u043C\u0435\u0442\u043E\u0434\u0430\u043C\u0438. \u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0440\u0435\u0448\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0435 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F, \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0435 \u043A\u043E\u0440\u043D\u0438.`,
      requirements: `1. \u0420\u0435\u0448\u0438\u0442\u0435 10 \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u044B\u0445 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0439, \u043F\u0440\u0438\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0445 \u043D\u0438\u0436\u0435
2. \u0414\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043C\u0435\u0442\u043E\u0434 \u0440\u0435\u0448\u0435\u043D\u0438\u044F
3. \u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u043E\u043B\u043D\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0441 \u043F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u044F\u043C\u0438 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0448\u0430\u0433\u0430
4. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043E\u0440\u043D\u0438, \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u0438\u0432 \u0438\u0445 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0435 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435
5. \u041E\u0444\u043E\u0440\u043C\u0438\u0442\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0438 \u0440\u0430\u0437\u0431\u043E\u0440\u0447\u0438\u0432\u043E`,
      criteria: `\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0431\u0430\u043B\u043B: 10

\u041A\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u043E\u0446\u0435\u043D\u043A\u0438:
- \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0439 (5 \u0431\u0430\u043B\u043B\u043E\u0432)
- \u041F\u043E\u043B\u043D\u043E\u0442\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u0439 (3 \u0431\u0430\u043B\u043B\u0430)
- \u0410\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E\u0441\u0442\u044C \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F (2 \u0431\u0430\u043B\u043B\u0430)`
    },
    2: {
      title: "\u0417\u0430\u043A\u043E\u043D\u044B \u041D\u044C\u044E\u0442\u043E\u043D\u0430",
      description: `\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u043E\u043D\u043E\u0432 \u041D\u044C\u044E\u0442\u043E\u043D\u0430 \u0434\u043B\u044F \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0437\u0430\u0434\u0430\u0447. \u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043F\u0440\u043E\u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438 \u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0437\u0430\u043A\u043E\u043D\u044B.`,
      requirements: `1. \u0418\u0437\u0443\u0447\u0438\u0442\u0435 \u0442\u0435\u043E\u0440\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u043F\u043E \u0437\u0430\u043A\u043E\u043D\u0430\u043C \u041D\u044C\u044E\u0442\u043E\u043D\u0430
2. \u0420\u0435\u0448\u0438\u0442\u0435 8 \u0437\u0430\u0434\u0430\u0447 \u043D\u0430 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u043E\u043D\u043E\u0432 \u041D\u044C\u044E\u0442\u043E\u043D\u0430
3. \u041E\u0442\u0432\u0435\u0442\u044C\u0442\u0435 \u043D\u0430 5 \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u0434\u043B\u044F \u0441\u0430\u043C\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438
4. \u0421\u0444\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u044B\u0432\u043E\u0434\u044B \u043F\u043E \u043F\u0440\u043E\u0434\u0435\u043B\u0430\u043D\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u0435`,
      criteria: `\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0431\u0430\u043B\u043B: 10

\u041A\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u043E\u0446\u0435\u043D\u043A\u0438:
- \u041F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0442\u0435\u043E\u0440\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 (3 \u0431\u0430\u043B\u043B\u0430)
- \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u0447 (4 \u0431\u0430\u043B\u043B\u0430)
- \u041F\u043E\u043B\u043D\u043E\u0442\u0430 \u043E\u0442\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B (2 \u0431\u0430\u043B\u043B\u0430)
- \u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u044B\u0432\u043E\u0434\u043E\u0432 (1 \u0431\u0430\u043B\u043B)`
    },
    3: {
      title: "\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438",
      description: `\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043E\u0441\u0432\u043E\u0435\u043D\u0438\u0435 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 \u0438 \u0438\u0445 \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044E \u043D\u0430 \u044F\u0437\u044B\u043A\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F Python. \u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432 \u0438 \u043F\u0440\u043E\u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\u0445 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C.`,
      requirements: `1. \u0420\u0435\u0430\u043B\u0438\u0437\u0443\u0439\u0442\u0435 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B \u043F\u0443\u0437\u044B\u0440\u044C\u043A\u043E\u0432\u043E\u0439 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438, \u0431\u044B\u0441\u0442\u0440\u043E\u0439 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 \u0438 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 \u0441\u043B\u0438\u044F\u043D\u0438\u0435\u043C
2. \u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B \u043D\u0430 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0445 \u043D\u0430\u0431\u043E\u0440\u0430\u0445 \u0434\u0430\u043D\u043D\u044B\u0445
3. \u0421\u0440\u0430\u0432\u043D\u0438\u0442\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432 \u043F\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F
4. \u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u044C\u0442\u0435 \u043E\u0442\u0447\u0435\u0442 \u0441 \u0430\u043D\u0430\u043B\u0438\u0437\u043E\u043C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432`,
      criteria: `\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0431\u0430\u043B\u043B: 10

\u041A\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u043E\u0446\u0435\u043D\u043A\u0438:
- \u041A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432 (4 \u0431\u0430\u043B\u043B\u0430)
- \u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F (3 \u0431\u0430\u043B\u043B\u0430)
- \u0410\u043D\u0430\u043B\u0438\u0437 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438 (2 \u0431\u0430\u043B\u043B\u0430)
- \u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u0447\u0435\u0442\u0430 (1 \u0431\u0430\u043B\u043B)`
    }
  };
  let currentTemplateId2 = null;
  previewButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const templateId = this.getAttribute("data-template");
      currentTemplateId2 = templateId;
      const template = templateData[templateId];
      if (template) {
        const previewModalTitle = document.getElementById("preview-modal-title");
        const previewDescriptionContent = document.getElementById("preview-description-content");
        const previewRequirementsContent = document.getElementById("preview-requirements-content");
        const previewCriteriaContent = document.getElementById("preview-criteria-content");
        if (previewModalTitle) previewModalTitle.textContent = template.title;
        if (previewDescriptionContent) previewDescriptionContent.textContent = template.description;
        if (previewRequirementsContent) previewRequirementsContent.textContent = template.requirements;
        if (previewCriteriaContent) previewCriteriaContent.textContent = template.criteria;
        previewModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });
  function closePreviewModal() {
    previewModal.classList.remove("active");
    document.body.style.overflow = "";
  }
  if (previewClose) previewClose.addEventListener("click", closePreviewModal);
  if (previewCancel) previewCancel.addEventListener("click", closePreviewModal);
  previewModal.addEventListener("click", function(e) {
    if (e.target === previewModal) {
      closePreviewModal();
    }
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && previewModal.classList.contains("active")) {
      closePreviewModal();
    }
  });
}
function initTemplateUsage() {
  const useButtons = document.querySelectorAll(".use-template");
  const previewUse = document.getElementById("preview-use");
  useButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const templateId = this.getAttribute("data-template");
      showAlert2(`\u0428\u0430\u0431\u043B\u043E\u043D "${templateId}" \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F...`, "info");
      setTimeout(() => {
        window.location.href = `/frontend/templates/homework/homework-create.html?template=${templateId}`;
      }, 1e3);
    });
  });
  if (previewUse) {
    previewUse.addEventListener("click", function() {
      const previewModal = document.getElementById("preview-modal");
      if (previewModal) {
        previewModal.classList.remove("active");
        document.body.style.overflow = "";
      }
      if (currentTemplateId) {
        showAlert2(`\u0428\u0430\u0431\u043B\u043E\u043D "${currentTemplateId}" \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F...`, "info");
        setTimeout(() => {
          window.location.href = `/frontend/templates/homework/homework-create.html?template=${currentTemplateId}`;
        }, 1e3);
      }
    });
  }
}
function initTemplateCardInteractions() {
  const templateCards = document.querySelectorAll(".template-card");
  templateCards.forEach((card) => {
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "";
    });
    card.addEventListener("click", function(e) {
      if (!e.target.closest(".btn")) {
        const previewBtn = this.querySelector(".preview-template");
        if (previewBtn) {
          previewBtn.click();
        }
      }
    });
  });
}
var alertStyles, styleElement;
var init_homework_pages = __esm({
  "static/js/pages/homework-pages.js"() {
    init_utils();
    alertStyles = `
.custom-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    background: white;
    border: 1px solid #e0e0e0;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 400px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    font-family: 'PT Sans', sans-serif;
}

.custom-alert.visible {
    opacity: 1;
    transform: translateX(0);
}

.custom-alert.success {
    border-left: 4px solid #4CAF50;
    background: linear-gradient(135deg, #f8fff8 0%, #e8f5e8 100%);
}

.custom-alert.error {
    border-left: 4px solid #f44336;
    background: linear-gradient(135deg, #fff8f8 0%, #f5e8e8 100%);
}

.custom-alert.warning {
    border-left: 4px solid #ff9800;
    background: linear-gradient(135deg, #fffbf8 0%, #f5f0e8 100%);
}

.custom-alert.info {
    border-left: 4px solid #2196F3;
    background: linear-gradient(135deg, #f8fbff 0%, #e8f0f5 100%);
}

.custom-alert .alert-icon {
    font-size: 20px;
    width: 24px;
    text-align: center;
}

.custom-alert.success .alert-icon {
    color: #4CAF50;
}

.custom-alert.error .alert-icon {
    color: #f44336;
}

.custom-alert.warning .alert-icon {
    color: #ff9800;
}

.custom-alert.info .alert-icon {
    color: #2196F3;
}

.custom-alert .alert-content {
    flex: 1;
    color: #333;
    font-size: 14px;
    line-height: 1.4;
}

.custom-alert .alert-close {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #666;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.custom-alert .alert-close:hover {
    background: rgba(0,0,0,0.1);
    color: #333;
}

/* \u0410\u043D\u0438\u043C\u0430\u0446\u0438\u0438 \u0434\u043B\u044F fade-in \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u043E\u0448\u0438\u0431\u043E\u043A \u0444\u043E\u0440\u043C */
.error {
    border-color: #f44336 !important;
    background-color: #fff8f8 !important;
}

.error-message {
    color: #f44336;
    font-size: 12px;
    margin-top: 5px;
    display: block;
}

/* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0444\u0430\u0439\u043B\u043E\u0432 */
.file-upload-area {
    border: 2px dashed #ddd;
    border-radius: 8px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fafafa;
}

.file-upload-area:hover {
    border-color: #2196F3;
    background: #f0f8ff;
}

.file-upload-area.dragover {
    border-color: #2196F3;
    background: #e3f2fd;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 8px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.file-item:hover {
    background: #e9ecef;
}

.file-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.file-details {
    display: flex;
    flex-direction: column;
}

.file-name {
    font-weight: 600;
    color: #333;
}

.file-size {
    font-size: 12px;
    color: #666;
}

.file-remove {
    color: #999;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.file-remove:hover {
    color: #f44336;
    background: rgba(244, 67, 54, 0.1);
}

/* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0435\u0432 \u043E\u0446\u0435\u043D\u043A\u0438 */
.criteria-item {
    display: flex;
    gap: 15px;
    align-items: flex-end;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.criteria-item:hover {
    background: #e9ecef;
}

.criteria-inputs {
    display: flex;
    gap: 15px;
    flex: 1;
}

.criteria-actions {
    display: flex;
    align-items: center;
}

.criteria-remove {
    color: #999;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.criteria-remove:hover {
    color: #f44336;
    background: rgba(244, 67, 54, 0.1);
}

/* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441-\u0431\u0430\u0440\u043E\u0432 */
.progress-bar {
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    flex: 1;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    border-radius: 4px;
    transition: width 1s ease-in-out;
}

/* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432 */
.status-new {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-in-progress {
    background: #fff3e0;
    color: #f57c00;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-reviewed {
    background: #e8f5e8;
    color: #388e3c;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-overdue {
    background: #ffebee;
    color: #d32f2f;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-pending {
    background: #fff3e0;
    color: #f57c00;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-returned {
    background: #ffebee;
    color: #d32f2f;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-completed {
    background: #e8f5e8;
    color: #388e3c;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

/* \u0421\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u044B\u0445 \u043E\u043A\u043E\u043D */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.7);
    transition: all 0.3s ease;
}

.modal-overlay.active .modal {
    transform: scale(1);
}

.modal-header {
    padding: 20px 24px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.modal-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #4CAF50;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
}

.modal-title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0;
}

.modal-content {
    padding: 20px 24px;
    color: #666;
    line-height: 1.5;
}

.modal-actions {
    padding: 0 24px 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}
`;
    styleElement = document.createElement("style");
    styleElement.textContent = alertStyles;
    document.head.appendChild(styleElement);
    window.initHomeworkPages = initHomeworkPages;
  }
});

// static/js/modules/tests.js
function initTestTaking() {
  let timeLeft = 20 * 60;
  const timerElement = document.getElementById("timer");
  const sidebarTimerElement = document.getElementById("sidebar-timer");
  let timerInterval;
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (timerElement) timerElement.textContent = timeString;
    if (sidebarTimerElement) sidebarTimerElement.textContent = timeString;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishTest();
    } else {
      timeLeft--;
    }
  }
  if (timerElement) {
    timerInterval = setInterval(updateTimer, 1e3);
  }
  const optionItems = document.querySelectorAll(".option-item");
  optionItems.forEach((item) => {
    item.addEventListener("click", function() {
      optionItems.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
  const questionNavItems = document.querySelectorAll(".question-nav-item");
  const currentQuestionElement = document.getElementById("current-question");
  const progressFillElement = document.getElementById("progress-fill");
  const progressPercentElement = document.getElementById("progress-percent");
  const totalQuestions = 15;
  if (questionNavItems.length > 0) {
    questionNavItems.forEach((item, index) => {
      item.addEventListener("click", function() {
        const questionNumber = index + 1;
        if (currentQuestionElement) {
          currentQuestionElement.textContent = questionNumber;
        }
        const progressPercent = Math.round(questionNumber / totalQuestions * 100);
        if (progressFillElement) {
          progressFillElement.style.width = `${progressPercent}%`;
        }
        if (progressPercentElement) {
          progressPercentElement.textContent = `${progressPercent}%`;
        }
        questionNavItems.forEach((nav) => nav.classList.remove("current"));
        this.classList.add("current");
        console.log(`\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441 ${questionNumber}`);
      });
    });
  }
  const nextQuestionBtn = document.getElementById("next-question-btn");
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", function() {
      const currentQuestion = parseInt(currentQuestionElement.textContent);
      if (currentQuestion < totalQuestions) {
        const nextQuestion = currentQuestion + 1;
        if (currentQuestionElement) {
          currentQuestionElement.textContent = nextQuestion;
        }
        const progressPercent = Math.round(nextQuestion / totalQuestions * 100);
        if (progressFillElement) {
          progressFillElement.style.width = `${progressPercent}%`;
        }
        if (progressPercentElement) {
          progressPercentElement.textContent = `${progressPercent}%`;
        }
        questionNavItems.forEach((nav) => nav.classList.remove("current"));
        questionNavItems[nextQuestion - 1].classList.add("current");
        questionNavItems[currentQuestion - 1].classList.add("answered");
        console.log(`\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441 ${nextQuestion}`);
      } else {
        finishTest();
      }
    });
  }
  function finishTest() {
    clearInterval(timerInterval);
    window.location.href = "/frontend/templates/test/test-result.html";
  }
  const finishTestBtn = document.querySelector(".btn-danger");
  if (finishTestBtn) {
    finishTestBtn.addEventListener("click", function() {
      if (confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0442\u0435\u0441\u0442? \u041F\u043E\u0441\u043B\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B.")) {
        finishTest();
      }
    });
  }
}
function initTestResultsPage() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  const detailsTabs = document.querySelectorAll(".details-tab");
  const detailsPanels = document.querySelectorAll(".details-panel");
  if (detailsTabs.length > 0) {
    detailsTabs.forEach((tab) => {
      tab.addEventListener("click", function() {
        const tabId = this.getAttribute("data-tab");
        detailsTabs.forEach((t) => t.classList.remove("active"));
        detailsPanels.forEach((p) => p.classList.remove("active"));
        this.classList.add("active");
        const panel = document.getElementById(`${tabId}-panel`);
        if (panel) panel.classList.add("active");
      });
    });
  }
  const watchDetailsBtn = document.querySelector('a[href="#results"]');
  if (watchDetailsBtn) {
    watchDetailsBtn.addEventListener("click", function(e) {
      e.preventDefault();
      const resultsSection = document.getElementById("results");
      if (resultsSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = resultsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
var init_tests = __esm({
  "static/js/modules/tests.js"() {
  }
});

// static/js/main.js
var require_main = __commonJS({
  "static/js/main.js"(exports, module) {
    init_mobile_menu();
    init_animations();
    init_theme_switcher();
    init_ui();
    init_auth();
    init_analitics_page();
    init_contact_pages();
    init_teachers_pages();
    init_platform_users();
    init_role_management();
    init_subject_management();
    init_material_creation();
    init_material_browser();
    init_schedule_pages();
    init_progress();
    init_chat();
    init_dashboard();
    init_utils();
    init_course_management();
    init_course_pages();
    init_practic_pages();
    init_test_pages();
    init_homework_pages();
    init_tests();
    document.addEventListener("DOMContentLoaded", function() {
      const currentPath = window.location.pathname;
      initHomeworkPages(currentPath);
      initPracticePage();
      initMobileMenu();
      initScrollAnimations();
      initHeaderScrollEffect();
      initThemeSwitcher();
      initSmoothScroll();
      initParticles();
      initAuth();
      initCoursesModule();
      initAnalyticsPages(currentPath);
      initPageSpecificModules(currentPath);
      initNewModules(currentPath);
      initJournalPages(currentPath);
      initSmoothAnchorScroll();
      if (document.querySelector(".test-creation")) {
        initCreateTestPage();
      }
      if (document.querySelector(".test-taking")) {
        initTestTaking();
      }
      if (document.querySelector(".test-results")) {
        initTestResultsPage();
      }
    });
    function initAnalyticsPages(currentPath) {
      if (currentPath.includes("attendance.html")) {
        initAttendancePage();
      } else if (currentPath.includes("progress.html")) {
        initProgressPage();
      } else if (currentPath.includes("statistics.html")) {
        initStatisticsPage();
      }
    }
    function initPageSpecificModules(currentPath) {
      if (document.getElementById("contactForm") || document.getElementById("map")) {
        if (document.getElementById("map") && typeof ymaps === "undefined") {
          loadYandexMaps().then(() => {
            initMap();
            initFAQ();
            initContactForm();
          });
        } else {
          initFAQ();
          initContactForm();
          if (document.getElementById("map")) {
            initMap();
          }
        }
      }
      if (document.querySelector(".teachers-filters")) {
        initTeachersFilter();
      }
      if (document.querySelector(".users-header")) {
        initPlatformUsers();
      }
      if (document.querySelector(".roles-header")) {
        initRoleManagement();
      }
      if (document.querySelector(".subjects-header")) {
        initSubjectManagement();
      }
      if (document.getElementById("material-form")) {
        initMaterialCreation();
      }
      if (document.querySelector(".material-card")) {
        initMaterialBrowser();
      }
    }
    function initNewModules(currentPath) {
      if (currentPath.includes("chat-interface.html")) {
        initChat();
      }
      if (currentPath.includes("dashboard.html") || currentPath.includes("teacher-dashboard.html")) {
        initDashboard();
      }
      if (currentPath.includes("registration") || currentPath.includes("/authorization/") || window.location.pathname === "/authorization/" || window.location.pathname === "/authorization") {
        console.log("Initializing registration module...");
        initAuth();
      }
      if (currentPath.includes("practic-detail.html")) {
        console.log("\u041F\u0440\u044F\u043C\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u043D\u0438\u044F");
        Promise.resolve().then(() => (init_practic_execution(), practic_execution_exports)).then((module2) => {
          module2.initPracticExecution();
        });
      }
      if (currentPath.includes("test-generation.html")) {
        initTestGeneration();
      }
      if (currentPath.includes("homework")) {
        initHomeworkPages(currentPath);
      }
      if (currentPath.includes("create-tests.html")) {
        initCreateTestPage();
      } else if (currentPath.includes("tests-detail.html")) {
        initTestTaking();
      } else if (currentPath.includes("test-result.html")) {
        initTestResultsPage();
      } else if (currentPath.includes("tests-list.html")) {
        initTestsList();
      } else if (currentPath.includes("tests.html")) {
        initCommonAnimations2();
      }
    }
    function initSmoothAnchorScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
          const href = this.getAttribute("href");
          if (href === "#" || href === "#!" || this.getAttribute("data-toggle")) {
            return;
          }
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            const headerHeight = document.querySelector("header")?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
          }
        });
      });
    }
    function initCommonAnimations2() {
      const fadeElements = document.querySelectorAll(".fade-in");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, {
        threshold: 0.1
      });
      fadeElements.forEach((element) => {
        observer.observe(element);
      });
    }
    function loadYandexMaps() {
      return new Promise((resolve, reject) => {
        if (typeof ymaps !== "undefined") {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?apikey=d6033963-5910-4384-8a9b-ca0e6600b444&lang=ru_RU";
        script.type = "text/javascript";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Yandex Maps"));
        document.head.appendChild(script);
      });
    }
    function initPracticeModules(currentPath) {
      if (currentPath.includes("create-practic.html")) {
        initPracticeCreation();
      } else if (currentPath.includes("practic-detail.html")) {
        initPracticExecution();
      } else if (currentPath.includes("practic-check.html")) {
        initPracticeReview();
      } else if (currentPath.includes("practic.html") || currentPath.includes("practic-list.html")) {
        initCommonPracticeAnimations();
      }
    }
    function initJournalPages(currentPath) {
      if (currentPath.includes("journal.html")) {
        initJournalPage();
      } else if (currentPath.includes("progress.html")) {
        initProgress();
      } else if (currentPath.includes("grades.html") || currentPath.includes("classes.html")) {
        initDashboard();
      } else if (currentPath.includes("schedule.html")) {
        initSchedulePage();
      } else if (currentPath.includes("schedule-create.html")) {
        initScheduleCreatePage();
      }
    }
    function initCommonPracticeAnimations() {
      const fadeElements = document.querySelectorAll(".fade-in");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, {
        threshold: 0.1
      });
      fadeElements.forEach((element) => {
        observer.observe(element);
      });
      const subjectCards = document.querySelectorAll(".subject-card");
      subjectCards.forEach((card) => {
        card.addEventListener("mouseenter", function() {
          this.style.transform = "translateY(-10px) scale(1.02)";
        });
        card.addEventListener("mouseleave", function() {
          this.style.transform = "translateY(0) scale(1)";
        });
      });
      const topicCards = document.querySelectorAll(".topic-card");
      topicCards.forEach((card) => {
        card.addEventListener("click", function(e) {
          if (!e.target.classList.contains("btn")) {
            const link = this.querySelector(".btn-practice");
            if (link) {
              window.location.href = link.getAttribute("href");
            }
          }
        });
      });
    }
    function initJournalPage() {
      const journalTable = document.querySelector(".journal-table");
      if (journalTable) {
        initJournalTable();
      }
    }
    function initJournalTable() {
      const tableRows = document.querySelectorAll(".journal-table tbody tr");
      tableRows.forEach((row) => {
        row.addEventListener("click", function() {
          this.classList.toggle("selected");
        });
      });
    }
    window.Utils = Utils;
    window.quickAction = quickAction;
    window.removeQuestion = removeQuestion;
    window.initJournalPage = initJournalPage;
    if (typeof module !== "undefined" && module.exports) {
      module.exports = {
        initMobileMenu,
        initScrollAnimations,
        initHeaderScrollEffect,
        initThemeSwitcher,
        initSmoothScroll,
        initParticles,
        initAuth,
        initAnalyticsPages,
        initPageSpecificModules,
        initNewModules,
        initPracticeModules,
        initJournalPages,
        initSmoothAnchorScroll,
        initCommonAnimations: initCommonAnimations2,
        loadYandexMaps,
        initCommonPracticeAnimations,
        initJournalPage
      };
    }
  }
});
export default require_main();
//# sourceMappingURL=bundle.js.map
