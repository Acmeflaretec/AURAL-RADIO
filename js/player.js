/**
 * Aural Radio Live Player Controller
 */
(function() {
  'use strict';

  function initPlayer() {
    const audio = document.getElementById("radioAudio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    const statusText = document.getElementById("statusText");
    const playerCard = document.getElementById("playerCard");
    const volumeSlider = document.getElementById("volumeSlider");
    const istClock = document.getElementById("istClock");
    const canvas = document.getElementById("spectrumCanvas");

    if (!audio || !playPauseBtn) return;

    const streamUrl = "https://live.auralradiokerala.in/auralradio/mp3";
    let isPlaying = false;

    // 1. Live IST Clock & Date
    function updateISTClock() {
      if (!istClock) return;
      try {
        const now = new Date();
        const optionsDate = { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' };
        const optionsTime = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateStr = now.toLocaleDateString('en-IN', optionsDate);
        const timeStr = now.toLocaleTimeString('en-IN', optionsTime).toUpperCase();
        istClock.textContent = `${dateStr} | ${timeStr} IST`;
      } catch (err) {
        istClock.textContent = new Date().toUTCString();
      }
    }
    setInterval(updateISTClock, 1000);
    updateISTClock();

    // 2. Play / Pause Stream Logic
    function updateUI(playing, customStatus) {
      if (playing) {
        if (playIcon) playIcon.style.display = "none";
        if (pauseIcon) pauseIcon.style.display = "block";
        if (playerCard) playerCard.classList.add("playing");
      } else {
        if (playIcon) playIcon.style.display = "block";
        if (pauseIcon) pauseIcon.style.display = "none";
        if (playerCard) playerCard.classList.remove("playing");
        if (statusText) {
          if (customStatus) {
            statusText.textContent = customStatus;
          } else {
            statusText.textContent = "PAUSED - TAP TO PLAY";
            statusText.style.color = "#b71c1c";
          }
        }
      }
    }

    playPauseBtn.addEventListener("click", () => {
      if (!isPlaying) {
        if (statusText) {
          statusText.textContent = "CONNECTING LIVE...";
          statusText.style.color = "#ef6c00";
        }
        audio.src = streamUrl + "?t=" + Date.now();
        if (volumeSlider) audio.volume = volumeSlider.value;
        audio.load();

        audio.play().then(() => {
          isPlaying = true;
          updateUI(true);

          // Media Session support for mobile lock screens and notifications
          if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: 'Aural Radio - മനസ്സ് നിറയെ പാട്ട്',
              artist: 'Malayalam 24/7 Live HD',
              album: 'Aural Radio Kerala',
              artwork: [
                { src: 'images/Logo circle.png', sizes: '192x192', type: 'image/png' },
                { src: 'images/Logo circle.png', sizes: '512x512', type: 'image/png' }
              ]
            });
            navigator.mediaSession.playbackState = "playing";
          }
        }).catch((err) => {
          console.warn("Playback error:", err);
          isPlaying = false;
          updateUI(false, "STREAM OFFLINE - TAP AGAIN");
          if (statusText) statusText.style.color = "#d32f2f";
        });
      } else {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
        isPlaying = false;
        updateUI(false);
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = "paused";
        }
      }
    });

    audio.addEventListener("playing", () => {
      if (statusText) {
        statusText.textContent = "AURAL RADIO PLAYING";
        statusText.style.color = "#2e7d32";
      }
    });

    audio.addEventListener("waiting", () => {
      if (statusText && isPlaying) {
        statusText.textContent = "BUFFERING...";
        statusText.style.color = "#ef6c00";
      }
    });

    audio.addEventListener("error", () => {
      if (isPlaying) {
        isPlaying = false;
        updateUI(false, "STREAM OFFLINE - TAP AGAIN");
        if (statusText) statusText.style.color = "#d32f2f";
      }
    });

    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        audio.volume = e.target.value;
      });
    }

    // 3. Smooth Live Audio Spectrum Visualizer
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const barCount = 44;
      const bars = Array.from({ length: barCount }, () => ({
        height: 4,
        speed: Math.random() * 0.16 + 0.08,
        phase: Math.random() * Math.PI * 2
      }));

      function drawSpectrum() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / barCount) - 3;

        for (let i = 0; i < barCount; i++) {
          let b = bars[i];
          if (isPlaying && !audio.paused) {
            b.phase += b.speed;
            const centerBoost = 1 - Math.abs(i - barCount / 2) / (barCount / 2);
            const target = (Math.sin(b.phase) * 0.5 + 0.5) * (canvas.height * 0.88 * (0.35 + centerBoost * 0.65)) + 4;
            b.height += (target - b.height) * 0.25;
          } else {
            b.height += (4 - b.height) * 0.15;
          }

          const x = i * (barWidth + 3);
          const y = canvas.height - b.height;
          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
          grad.addColorStop(0, "#29b6f6");
          grad.addColorStop(0.5, "#8e24aa");
          grad.addColorStop(1, "#e91e63");
          ctx.fillStyle = grad;

          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(x, y, barWidth, b.height, 3);
          } else {
            ctx.rect(x, y, barWidth, b.height);
          }
          ctx.fill();
        }

        requestAnimationFrame(drawSpectrum);
      }
      drawSpectrum();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }
})();
