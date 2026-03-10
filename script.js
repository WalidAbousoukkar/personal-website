/**
 * Personal Portfolio
 * Handles: mobile menu, smooth scroll, active nav link, footer year
 */

(function () {
  "use strict";

  // ----- 1. Mobile menu toggle -----
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // ----- 2. Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ----- 3. Highlight active section in navigation -----
  const sections = document.querySelectorAll("section[id]");

  function setActiveLink() {
    const scrollY = window.scrollY;
    const headerHeight = document.querySelector(".header")?.offsetHeight || 60;

    sections.forEach(function (section) {
      const id = section.getAttribute("id");
      const top = section.offsetTop - headerHeight;
      const height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  // ----- 4. Hero scroll hint fade & header scrolled state -----
  const heroScrollEl = document.querySelector(".hero-scroll");
  const headerEl = document.querySelector(".header");
  const scrollThreshold = 120;

  function onScrollVisibility() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (heroScrollEl) {
      if (y > scrollThreshold) {
        heroScrollEl.classList.add("hero-scroll--hidden");
      } else {
        heroScrollEl.classList.remove("hero-scroll--hidden");
      }
    }
    if (headerEl) {
      if (y > scrollThreshold) {
        headerEl.classList.add("scrolled");
      } else {
        headerEl.classList.remove("scrolled");
      }
    }
  }

  window.addEventListener("scroll", onScrollVisibility);
  onScrollVisibility();

  // ----- 5. Footer year -----
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
