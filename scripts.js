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

    // ---- Registration & Event Migration ----
    const events = {
        tech: [
            { name: "Open Mic", price: 299 }, { name: "Snap Verse", price: 299 }, { name: "Mini Games", price: 199 },
            { name: "Control Cup", price: 199 }, { name: "Code Smells", price: 199 }, { name: "Chess With AI", price: 299 },
            { name: "Mad Gab", price: 199 }, { name: "Escape Room ", price: 199 }, { name: "Spell-Bee", price: 199 },
            { name: "Literacy Trivia", price: 199 }, { name: "BGMI Tournament", price: 299 },
            { name: "Stand-Up Comedy & Reel Competition", price: 299 }, { name: "Micro Sport Challenge", price: 199 },
            { name: "Canvas Arts", price: 199 }, { name: "Tech Hunt", price: 199 }, { name: "Fun Zone", price: 199 },
            { name: "Retro Arena", price: 199 }, { name: "Tech Chamber", price: 299 }, { name: "Mortal Kombat X", price: 199 },
            { name: "Lazer Maze", price: 199 }, { name: "COD Tournament", price: 299 }, { name: "ICFAI Premier League", price: 199 },
            { name: "AI Music Challenge", price: 199 }, { name: "Triathlon", price: 199 }, { name: "Photo Scavenger Hunt", price: 299 },
            { name: "Campus Bingo", price: 199 }, { name: "BookMark Studio", price: 199 }, { name: "RC Car Racing", price: 299 },
            { name: "Corn Hole", price: 199 }, { name: "Art Expo Competition", price: 299 }, { name: "Words Of Wonder", price: 199 }
        ],
        ibs: [
            { name: "Market Kshetra", price: 299 }, { name: "Rise to the Hammer", price: 299 }, { name: "Genesis", price: 299 },
            { name: "Resolve 360", price: 299 }, { name: "Zero Hour", price: 299 }, { name: "KBC", price: 199 },
            { name: "Market Masters", price: 199 }
        ],
        law: [
            { name: "Mediation (Team)", price: 500 }, { name: "The Environmental Mootcourt Battle", price: 249 },
            { name: "Opus Of The Eye", price: 100 }, { name: "Toteally Artistic", price: 100 }, { name: "Pixel to Palette", price: 100 },
            { name: "Visionary Chronicles", price: 100 }, { name: "Secret Quest", price: 100 }, { name: "EcoCine", price: 100 },
            { name: "Leagathon", price: 100 }, { name: "Murder Mystery", price: 100 }, { name: "Quill Of Conscience", price: 199 },
            { name: "Quill Tales", price: 100 }, { name: "Quizopolis", price: 149 }, { name: "Voxlegis", price: 149 },
            { name: "Sync And Slay", price: 149 }, { name: "Dumb Charades", price: 149 }, { name: "Ultimate Vox", price: 100 },
            { name: "E-Sports Valorant", price: 299 }, { name: "FIFA (Console)", price: 199 }
        ],
        socialScience: [
            { name: "Canvas Carnival", price: 200 }, { name: "Econ-Psych Shutdown", price: 399 },
            { name: "Lens Legacy", price: 200 }, { name: "Flip The Argument", price: 299 }
        ],
        architecture: [
            // Placeholder for Architecture events as they were not in the senior's JS but in their HTML
            { name: "Architectural Competition", price: 299 }, { name: "Urban Planning Workshop", price: 199 }
        ]
    };

    const schoolSelect = document.getElementById("schoolSelect");
    const eventCheckboxes = document.getElementById("eventCheckboxes");
    const totalAmountSpan = document.getElementById("totalAmount");
    const registrationForm = document.getElementById("registrationForm");

    if (schoolSelect) {
        schoolSelect.addEventListener("change", function () {
            const selectedSchool = this.value;
            eventCheckboxes.innerHTML = "";
            if (events[selectedSchool]) {
                events[selectedSchool].forEach((event, idx) => {
                    const div = document.createElement('div');
                    div.className = 'form-check custom-checkbox mb-2';
                    div.innerHTML = `
                        <input class="form-check-input event-checkbox" type="checkbox" value="${event.price}" id="event-${selectedSchool}-${idx}">
                        <label class="form-check-label" for="event-${selectedSchool}-${idx}">
                            ${event.name} - ${event.price}/-
                        </label>`;
                    eventCheckboxes.appendChild(div);
                });

                // Add event listeners to new checkboxes
                document.querySelectorAll(".event-checkbox").forEach(cb => {
                    cb.addEventListener('change', updateTotalPrice);
                });
            }
            updateTotalPrice();
        });
    }

    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll(".event-checkbox:checked").forEach((checkbox) => {
            total += parseInt(checkbox.value);
        });
        if (totalAmountSpan) totalAmountSpan.textContent = `${total}/-`;
    }

    if (registrationForm) {
        registrationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const total = totalAmountSpan.textContent;
            const selectedEvents = document.querySelectorAll(".event-checkbox:checked").length;
            const submitButton = registrationForm.querySelector("button[type='submit']");

            if (selectedEvents === 0) {
                showAlert("⚠️ Please select at least one event before proceeding!", "danger");
                return;
            }

            submitButton.disabled = true;
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Processing...`;

            // Simulate payment process
            setTimeout(() => {
                showAlert(`✅ Registration Successful! Proceeding to Payment with amount: <strong>${total}</strong>`, "success");
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Optional: reset form or redirect
                // registrationForm.reset();
                // $('#registrationModal').modal('hide');
            }, 2000);
        });
    }

    // --- File Preview Logic ---
    function handleFileUpload(inputId, containerId) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);
        if (!input || !container) return;

        input.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                container.innerHTML = `
                    <div class="file-info-badge mt-2">
                        <i class="fas fa-file-image mr-2"></i>
                        <span>${file.name}</span>
                        <i class="fas fa-times-circle remove-file-icon ml-2" style="cursor:pointer; color:#ff4444;" onclick="window.removeIdFile('${inputId}', '${containerId}')"></i>
                    </div>`;
                showAlert(`📂 <strong>${file.name}</strong> uploaded successfully.`, "info");
            }
        });
    }

    window.removeIdFile = function(inputId, containerId) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);
        if (input) input.value = "";
        if (container) container.innerHTML = "";
    };

    handleFileUpload("collegeID", "collegeFileContainer");
    handleFileUpload("aadhaarID", "aadhaarFileContainer");

    // --- Global Alert Function ---
    window.showAlert = function(message, type) {
        const alertContainer = document.getElementById("alertContainer");
        if (!alertContainer) return;

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>`;
        
        alertContainer.appendChild(alertDiv);

        // Auto-hide alert after 5 seconds
        setTimeout(() => {
            $(alertDiv).alert('close');
        }, 5000);
    };
});
