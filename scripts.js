document.addEventListener("DOMContentLoaded", () => {
    // ---- Typing Effect ----
    const typewriterElement = document.getElementById("typewriter");
    const phrases = ["Registrations Open Now!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let stopTyping = false;

    function typeEffect() {
        if (stopTyping) {
            typewriterElement.textContent = "April 2026";
            return;
        }

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Remove a character
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        // Blinking cursor effect is handled by css if needed, but here we just append an underscore or use raw text
        typewriterElement.textContent += "_";

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of word
            typeSpeed = 2000;
            isDeleting = true;
            // Remove the underscore for the pause
            typewriterElement.textContent = currentPhrase;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);


    // ---- Countdown Timer ----
    /*
    // Set Target Date to 6 seconds from now for testing
    const targetDate = new Date().getTime() + 6000;

    const countdownContainer = document.querySelector('.countdown-container');
    const regText = document.getElementById('reg-text');
    const registerBtnContainer = document.getElementById('register-btn-container');

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    // Track last rendered second to avoid unnecessary DOM writes
    let lastRenderedSecond = -1;

    function updateCountdown() {
        const now = Date.now();
        const distance = targetDate - now;

        if (distance <= 0) {
            // If the countdown is over
            stopTyping = true;
            typewriterElement.textContent = "April 2026";

            if (countdownContainer) countdownContainer.style.display = 'none';
            if (regText) regText.innerHTML = "Registrations are now open";

            if (registerBtnContainer) {
                registerBtnContainer.style.display = 'block';
                // Double rAF: wait for display:block to paint before triggering CSS transition
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        registerBtnContainer.classList.add('btn-visible');
                    });
                });
            }

            // Zero out values
            if (daysEl) daysEl.textContent = "00";
            if (hoursEl) hoursEl.textContent = "00";
            if (minsEl) minsEl.textContent = "00";
            if (secsEl) secsEl.textContent = "00";

            return; // stop the rAF loop
        }

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Only write to DOM when the second actually changes (avoids layout thrash at 60fps)
        if (seconds !== lastRenderedSecond) {
            lastRenderedSecond = seconds;
            if (daysEl) daysEl.textContent = days < 10 ? "0" + days : days;
            if (hoursEl) hoursEl.textContent = hours < 10 ? "0" + hours : hours;
            if (minsEl) minsEl.textContent = minutes < 10 ? "0" + minutes : minutes;
            if (secsEl) secsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
        }

        requestAnimationFrame(updateCountdown);
    }

    // Kick off with rAF — stays in sync with the browser's render cycle
    requestAnimationFrame(updateCountdown);
    */

    // ---- Active Nav Dot on Scroll (IntersectionObserver — no scroll-event jank) ----
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const navLinks = document.querySelectorAll('.side-nav a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, {
        // Trigger when a section occupies the centre band of the viewport
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));
});
