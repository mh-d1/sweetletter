const backgroundMusic = document.getElementById("backgroundMusic");

const musicToggle = document.querySelector(".music-toggle");
const musicText = document.querySelector(".music-text");
const musicSymbol = document.querySelector(".music-symbol");

const themeToggle = document.querySelector(".theme-toggle");
const themeText = document.querySelector(".theme-text");
const themeSymbol = document.querySelector(".theme-symbol");

if (musicToggle && backgroundMusic) {
  musicToggle.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic
        .play()
        .then(() => {
          musicText.textContent = "sound on";
          musicSymbol.textContent = "♫";
        })
        .catch(() => {
          musicText.textContent = "sound off";
          musicSymbol.textContent = "♫";
        });
    } else {
      backgroundMusic.pause();

      musicText.textContent = "sound off";
      musicSymbol.textContent = "♫";
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeText.textContent = isDark ? "dark" : "light";

    themeSymbol.textContent = isDark ? "☾" : "☼";

    localStorage.setItem("ray-theme", isDark ? "dark" : "light");
  });
}

const savedTheme = localStorage.getItem("ray-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  themeText.textContent = "dark";
  themeSymbol.textContent = "☾";
}

const revealElements = document.querySelectorAll(".reveal");

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

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && backgroundMusic) {
    backgroundMusic.pause();

    if (musicText) {
      musicText.textContent = "sound off";
    }
  }
});
