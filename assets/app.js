/* =========================================================
   WordMasters Practice — app.js (Full Rewrite)
   Hidden teacher mode: press & hold logo 7 seconds
   sessionStorage only (resets when tab closes)
   No visible UI, no text
   ========================================================= */

(function () {
  "use strict";

  const TEACHER_KEY = "wm_teacher_mode";
  const HOLD_MS = 7000;

  function isTeacherMode() {
    return sessionStorage.getItem(TEACHER_KEY) === "1";
  }

  function applyTeacherMode(on) {
    sessionStorage.setItem(TEACHER_KEY, on ? "1" : "0");
    document.documentElement.classList.toggle("teacher", on);

    document.querySelectorAll("[data-teacher-only='1']").forEach(el => {
      el.classList.toggle("hidden", !on);
    });
  }

  // Initialize
  applyTeacherMode(isTeacherMode());

  // Find logo: prefer id, fallback to class
  const logo = document.getElementById("siteLogo") || document.querySelector(".logo");
  if (logo) {
    let timer = null;
    let holding = false;

    const start = (e) => {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (holding) return;
      holding = true;

      timer = window.setTimeout(() => {
        applyTeacherMode(!isTeacherMode());
        holding = false;
        timer = null;
      }, HOLD_MS);
    };

    const cancel = () => {
      if (!holding) return;
      holding = false;
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
    };

    // Mouse
    logo.addEventListener("mousedown", start);
    window.addEventListener("mouseup", cancel);
    window.addEventListener("mouseleave", cancel);

    // Touch
    logo.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchend", cancel);
    window.addEventListener("touchcancel", cancel);

    // Prevent context menu on logo
    logo.addEventListener("contextmenu", (e) => e.preventDefault());
  }

})();




