/* =========================================================
   RAY
   INTERACTION SCRIPT
   ========================================================= */

/* =========================================================
   ELEMENTS
   ========================================================= */

const backgroundMusic = document.getElementById("backgroundMusic");

const musicToggle = document.querySelector(".music-toggle");

const musicText = document.querySelector(".music-text");

const musicSymbol = document.querySelector(".music-symbol");

const themeToggle = document.querySelector(".theme-toggle");

const themeText = document.querySelector(".theme-text");

const themeSymbol = document.querySelector(".theme-symbol");

/* =========================================================
   MUSIC
   ========================================================= */

musicToggle.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic
      .play()
      .then(() => {
        musicText.textContent = "sound on";

        musicSymbol.textContent = "♫";
      })
      .catch(() => {
        console.log("Browser menolak autoplay audio.");
      });
  } else {
    backgroundMusic.pause();

    musicText.textContent = "sound off";

    musicSymbol.textContent = "♫";
  }
});

/* =========================================================
   THEME
   ========================================================= */

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    themeText.textContent = "dark";

    themeSymbol.textContent = "☾";
  } else {
    themeText.textContent = "light";

    themeSymbol.textContent = "☼";
  }

  /*
        Simpan pilihan tema
        ke localStorage.
    */

  localStorage.setItem("ray-theme", isDark ? "dark" : "light");
});

/* =========================================================
   LOAD SAVED THEME
   ========================================================= */

const savedTheme = localStorage.getItem("ray-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  themeText.textContent = "dark";

  themeSymbol.textContent = "☾";
}

/* =========================================================
   IMAGE REVEAL
   ========================================================= */

const images = document.querySelectorAll(
  ".hero-image, .thing-card, .memory, .letter-inner, .final-section",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

images.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   STOP MUSIC WHEN PAGE IS HIDDEN
   ========================================================= */

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    backgroundMusic.pause();

    musicText.textContent = "sound off";
  }
});
