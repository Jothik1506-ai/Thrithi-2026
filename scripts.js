document.addEventListener("DOMContentLoaded", () => {
    // ---- Typing Effect ----
    const typewriterElement = document.getElementById("typewriter");
    const phrases = ["Registrations Open Now!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Remove a character
            charIndex--;
            typewriterElement.textContent = currentPhrase.substring(0, charIndex) + "_";
        } else {
            // Add a character
            charIndex++;
            typewriterElement.textContent = currentPhrase.substring(0, charIndex) + "_";
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase — show text without cursor during pause
            typeSpeed = 2000;
            isDeleting = true;
            typewriterElement.textContent = currentPhrase;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect after logo intro animation settles
    setTimeout(typeEffect, 1000);


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

    // Single delegated listener covers all dynamically created checkboxes
    if (eventCheckboxes) {
        eventCheckboxes.addEventListener('change', (e) => {
            if (e.target.classList.contains('event-checkbox')) updateTotalPrice();
        });
    }

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
