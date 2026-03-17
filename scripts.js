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
            // Pause at end of phrase — keep cursor visible during pause
            typeSpeed = 2000;
            isDeleting = true;
            typewriterElement.textContent = currentPhrase + "_";
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

    // ---- 2-Step Registration & Event Data ----
    // OWNER: Jothik — Edit events here
    const events = {
        // SCHOOL: IcfaiTech
        tech: [
            { name: "Open Mic", price: 299 }, { name: "Snap Verse", price: 299 }, { name: "Mini Games", price: 199 },
            { name: "Control Cup", price: 199 }, { name: "Code Smells", price: 199 }, { name: "Chess With AI", price: 299 },
            { name: "Mad Gab", price: 199 }, { name: "Escape Room", price: 199 }, { name: "Spell-Bee", price: 199 },
            { name: "Literacy Trivia", price: 199 }, { name: "BGMI Tournament", price: 299 },
            { name: "Stand-Up Comedy & Reel Competition", price: 299 }, { name: "Micro Sport Challenge", price: 199 },
            { name: "Canvas Arts", price: 199 }, { name: "Tech Hunt", price: 199 }, { name: "Fun Zone", price: 199 },
            { name: "Retro Arena", price: 199 }, { name: "Tech Chamber", price: 299 }, { name: "Mortal Kombat X", price: 199 },
            { name: "Lazer Maze", price: 199 }, { name: "COD Tournament", price: 299 }, { name: "ICFAI Premier League", price: 199 },
            { name: "AI Music Challenge", price: 199 }, { name: "Triathlon", price: 199 }, { name: "Photo Scavenger Hunt", price: 299 },
            { name: "Campus Bingo", price: 199 }, { name: "BookMark Studio", price: 199 }, { name: "RC Car Racing", price: 299 },
            { name: "Corn Hole", price: 199 }, { name: "Art Expo Competition", price: 299 }, { name: "Words Of Wonder", price: 199 }
        ],
        // SCHOOL: IBS
        ibs: [
            { name: "Market Kshetra", price: 299 }, { name: "Rise to the Hammer", price: 299 }, { name: "Genesis", price: 299 },
            { name: "Resolve 360", price: 299 }, { name: "Zero Hour", price: 299 }, { name: "KBC", price: 199 },
            { name: "Market Masters", price: 199 }
        ],
        // SCHOOL: Law
        law: [
            { name: "Ideation", price: 499 }, { name: "Murder Mystery", price: 399 },
            { name: "The Plot Twist", price: 499 }, { name: "BGMI Tournament", price: 499 },
            { name: "FIFA Tournament", price: 299 }, { name: "Clash Royale Tournament", price: 199 },
            { name: "Poster Making Competition", price: 499 }, { name: "Meme Making Competition", price: 299 },
            { name: "Postcard Making", price: 399 }, { name: "Digital Ad-Making", price: 499 },
            { name: "Psych Sync", price: 299 }, { name: "Stroop Battle", price: 299 },
            { name: "Sensus (Reel Making)", price: 299 }, { name: "Lip Sync Battle", price: 399 },
            { name: "Guess the Mess", price: 399 }, { name: "Drama in a Chit", price: 399 },
            { name: "Blind-Folded Treasure Hunt", price: 499 }, { name: "Legal Meme Competition", price: 299 },
            { name: "Extempore Moot Court", price: 499 }, { name: "Shabd Sangram (Debate)", price: 499 },
            { name: "Treble Quest", price: 399 }, { name: "The Web of Lies", price: 399 },
            { name: "Monopoly – The Bargain Battle", price: 399 }, { name: "Journal/Vision Board", price: 399 },
            { name: "Tote Bag Painting", price: 399 }, { name: "Chamber of Seven Sins", price: 299 }
        ],
        // SCHOOL: Social Science
        socialScience: [
            { name: "Canvas Carnival", price: 200 }, { name: "Econ-Psych Shutdown", price: 399 },
            { name: "Lens Legacy", price: 200 }, { name: "Flip The Argument", price: 299 }
        ],
        // SCHOOL: Architecture
        architecture: [
            { name: "Crystal Canvas Art", price: 99 }, { name: "Rang De Matka", price: 199 },
            { name: "Digital Doodles", price: 199 }
        ]
    };

    const schoolTitles = {
        tech: "IcfaiTech Events",
        ibs: "IBS Events",
        law: "ICFAI Law School Events",
        socialScience: "Faculty of Social Science Events",
        architecture: "ICFAI Architecture Events"
    };

    let currentSchool = null;

    // DOM Elements — cached once at init to avoid repeated getElementById calls
    const eventModalTitle = document.getElementById("eventModalTitle");
    const dynamicEventCheckboxes = document.getElementById("dynamicEventCheckboxes");
    const alertContainer = document.getElementById("alertContainer");
    
    // Steps
    const step1Events = document.getElementById("step1-events");
    const step2Registration = document.getElementById("step2-registration");
    
    // Totals
    const step1TotalAmount = document.getElementById("step1TotalAmount");
    const step2TotalAmount = document.getElementById("step2TotalAmount");
    const summaryEventCount = document.getElementById("summaryEventCount");
    
    // Buttons
    const btnProceedToRegistration = document.getElementById("btnProceedToRegistration");
    const btnBackToEvents = document.getElementById("btnBackToEvents");
    const registrationForm = document.getElementById("registrationForm");

    // Accessibility fix: blur any focused element inside the modal before Bootstrap
    // sets aria-hidden="true" on it — prevents "aria-hidden on focused element" warning.
    $('#eventModal').on('hide.bs.modal', function () {
        if (document.activeElement && this.contains(document.activeElement)) {
            document.activeElement.blur();
        }
    });

    // 1. Open Modal via "Events" Buttons
    document.querySelectorAll('[data-target="#eventModal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            currentSchool = this.getAttribute('data-school');
            eventModalTitle.textContent = "Select Events - " + (schoolTitles[currentSchool] || "");

            // Reset to Step 1
            step1Events.style.display = "block";
            step2Registration.style.display = "none";

            // Reset submit button state so repeat opens are not stuck disabled
            if (registrationForm) {
                const submitBtn = registrationForm.querySelector("button[type='submit']");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = "Submit &amp; Pay";
                }
            }

            // Render Events for the specific school
            renderEvents(currentSchool);
        });
    });

    // 2. Render Checkboxes dynamically
    function renderEvents(schoolKey) {
        dynamicEventCheckboxes.innerHTML = "";
        step1TotalAmount.textContent = "₹0";
        
        if (events[schoolKey]) {
            events[schoolKey].forEach((event, idx) => {
                const div = document.createElement('div');
                div.className = 'form-check custom-checkbox mb-2';
                // Using event name as ID key to ensure uniqueness and readability
                const inputId = `event-${schoolKey}-${idx}`;
                div.innerHTML = `
                    <input class="form-check-input event-checkbox" type="checkbox" value="${event.price}" data-name="${event.name}" id="${inputId}">
                    <label class="form-check-label d-flex justify-content-between w-100" for="${inputId}">
                        <span>${event.name}</span>
                        <span class="font-weight-bold">₹${event.price}</span>
                    </label>`;
                dynamicEventCheckboxes.appendChild(div);
            });
        }
    }

    // 3. Delegate Checkbox Change to Update Total
    if (dynamicEventCheckboxes) {
        dynamicEventCheckboxes.addEventListener('change', (e) => {
            if (e.target.classList.contains('event-checkbox')) {
                updateStep1Total();
            }
        });
    }

    function updateStep1Total() {
        let total = 0;
        document.querySelectorAll(".event-checkbox:checked").forEach((checkbox) => {
            total += parseInt(checkbox.value, 10);
        });
        step1TotalAmount.textContent = `₹${total}`;
        return total;
    }

    // 4. Proceed to Registration (Step 1 -> Step 2)
    if (btnProceedToRegistration) {
        btnProceedToRegistration.addEventListener('click', () => {
            const selectedBoxes = document.querySelectorAll(".event-checkbox:checked");
            if (selectedBoxes.length === 0) {
                showAlert("⚠️ Please select at least one event to proceed.", "danger");
                return;
            }
            
            const total = updateStep1Total();
            
            // Update Summary inside Step 2
            summaryEventCount.textContent = selectedBoxes.length;
            step2TotalAmount.textContent = `₹${total}`;
            eventModalTitle.textContent = "Complete Registration";
            
            // Transition UI
            step1Events.style.display = "none";
            step2Registration.style.display = "block";
        });
    }

    // 5. Back to Events (Step 2 -> Step 1)
    if (btnBackToEvents) {
        btnBackToEvents.addEventListener('click', () => {
             eventModalTitle.textContent = "Select Events - " + (schoolTitles[currentSchool] || "");
             step2Registration.style.display = "none";
             step1Events.style.display = "block";
        });
    }

    // 6. Final Submit
    if (registrationForm) {
        registrationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // --- Phone validation (Fix #5) ---
            const phone = document.getElementById('phone').value.trim();
            if (!/^[6-9]\d{9}$/.test(phone)) {
                showAlert("⚠️ Please enter a valid 10-digit Indian mobile number.", "danger");
                return;
            }

            // --- Recalculate total from checked boxes — not from DOM text (Fix #3) ---
            let total = 0;
            document.querySelectorAll(".event-checkbox:checked").forEach(cb => {
                total += parseInt(cb.value, 10);
            });
            const sumText = `₹${total}`;

            const submitButton = registrationForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Processing...`;

            // --- Payment gateway call goes here (Fix #8 structure) ---
            // Replace the setTimeout below with your actual gateway call (e.g. Razorpay).
            // On success → run the success block. On failure → run the failure block.
            setTimeout(() => {
                const paymentSuccess = true; // Replace with actual gateway response

                if (paymentSuccess) {
                    // --- Success path ---
                    showAlert(`✅ Registration Successful! Amount: <strong>${sumText}</strong>`, "success");
                    // Button stays disabled after success — re-enabled on next modal open (Fix #7)
                    submitButton.innerHTML = "Submit &amp; Pay";
                    $('#eventModal').modal('hide');
                    registrationForm.reset();
                    // Note: event checkboxes are rebuilt by renderEvents() on next modal open
                    window.removeIdFile('collegeID', 'collegeFileContainer');
                    window.removeIdFile('aadhaarID', 'aadhaarFileContainer');
                } else {
                    // --- Failure path (Fix #8) ---
                    showAlert("❌ Payment failed. Please try again.", "danger");
                    submitButton.disabled = false;
                    submitButton.innerHTML = "Submit &amp; Pay";
                }
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
            if (!file) return;

            // --- File size validation — max 5 MB (Fix #6) ---
            const MAX_SIZE_MB = 5;
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                showAlert(`⚠️ File too large. Maximum allowed size is ${MAX_SIZE_MB}MB.`, "danger");
                input.value = "";
                return;
            }

            // --- Build badge with DOM methods — prevents XSS from malicious file names (Fix #2) ---
            container.innerHTML = "";
            const badge = document.createElement('div');
            badge.className = 'file-info-badge mt-2';

            const fileIcon = document.createElement('i');
            fileIcon.className = 'fas fa-file-image mr-2';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = file.name; // textContent never parses HTML — XSS-safe

            const removeIcon = document.createElement('i');
            removeIcon.className = 'fas fa-times-circle remove-file-icon ml-2';
            removeIcon.style.cssText = 'cursor:pointer; color:#ff4444;';
            removeIcon.setAttribute('data-input-id', inputId);
            removeIcon.setAttribute('data-container-id', containerId);

            badge.appendChild(fileIcon);
            badge.appendChild(nameSpan);
            badge.appendChild(removeIcon);
            container.appendChild(badge);

            // Escape file name before inserting into alert HTML (Fix #2)
            const safeName = file.name
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            showAlert(`📂 <strong>${safeName}</strong> uploaded successfully.`, "info");
        });
    }

    // Delegated click handler for remove-file icons — handles dynamically created badges
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-file-icon")) {
            const inputId = e.target.getAttribute("data-input-id");
            const containerId = e.target.getAttribute("data-container-id");
            if (inputId && containerId) removeIdFile(inputId, containerId);
        }
    });

    function removeIdFile(inputId, containerId) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);
        if (input) input.value = "";
        if (container) container.innerHTML = "";
    }

    // Expose for post-submit reset (called directly in submit handler)
    window.removeIdFile = removeIdFile;

    handleFileUpload("collegeID", "collegeFileContainer");
    handleFileUpload("aadhaarID", "aadhaarFileContainer");

    // --- Global Alert Function ---
    window.showAlert = function (message, type) {
        // alertContainer is cached at DOMContentLoaded scope — no repeated DOM query
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
