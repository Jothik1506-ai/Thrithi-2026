document.addEventListener("DOMContentLoaded", () => {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxN5QR3mU2W7wqUpcQhgW1OiMDYP-K7_BBNgJx16gdZPjKaUNdObNdJcHTIUjw61it/exec";

    // ---- Typing Effect ----
    const typewriterElement = document.getElementById("typewriter");
    const phrases = ["Registrations Open Now!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            typewriterElement.textContent = currentPhrase.substring(0, charIndex) + "_";
        } else {
            charIndex++;
            typewriterElement.textContent = currentPhrase.substring(0, charIndex) + "_";
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
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

    setTimeout(typeEffect, 1000);

    // ---- Active Nav Dot on Scroll ----
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const navLinks = document.querySelectorAll(".side-nav a");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
                });
            }
        });
    }, {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0
    });

    sections.forEach((section) => navObserver.observe(section));

    // ---- 2-Step Registration & Event Data ----
    const events = {
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
        ibs: [
            { name: "Genesis", price: 499 }, { name: "Data decode", price: 499 }, { name: "Marketkshetra", price: 499 },
            { name: "Idealouge", price: 499 }, { name: "Bids & Bails", price: 499 }, { name: "Time trap", price: 499 },
            { name: "Frame the Find", price: 499 }, { name: "FrameVerse", price: 499 }
        ],
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
            { name: "Monopoly - The Bargain Battle", price: 399 }, { name: "Journal/Vision Board", price: 399 },
            { name: "Tote Bag Painting", price: 399 }, { name: "Chamber of Seven Sins", price: 299 }
        ],
        socialScience: [
            { name: "Canvas Carnival 2.0", price: 299 }, { name: "Finnovate", price: 399 },
            { name: "The Profiling Room: Where Behaviour Becomes Evidence", price: 399 }, { name: "Canvas Carnival 2.0", price: 299 }
        ],
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

    const eventModalTitle = document.getElementById("eventModalTitle");
    const dynamicEventCheckboxes = document.getElementById("dynamicEventCheckboxes");
    const alertContainer = document.getElementById("alertContainer");
    const step1Events = document.getElementById("step1-events");
    const step2Registration = document.getElementById("step2-registration");
    const step1TotalAmount = document.getElementById("step1TotalAmount");
    const step2TotalAmount = document.getElementById("step2TotalAmount");
    const summaryEventCount = document.getElementById("summaryEventCount");
    const btnProceedToRegistration = document.getElementById("btnProceedToRegistration");
    const btnBackToEvents = document.getElementById("btnBackToEvents");
    const registrationForm = document.getElementById("registrationForm");
    const collegeIdInput = document.getElementById("collegeID");
    const aadhaarIdInput = document.getElementById("aadhaarID");

    // File upload handling is intentionally excluded from the workflow.
    if (collegeIdInput) {
        collegeIdInput.required = false;
        collegeIdInput.value = "";
    }
    if (aadhaarIdInput) {
        aadhaarIdInput.required = false;
        aadhaarIdInput.value = "";
    }

    $("#eventModal").on("hide.bs.modal", function () {
        if (document.activeElement && this.contains(document.activeElement)) {
            document.activeElement.blur();
        }
    });

    document.querySelectorAll('[data-target="#eventModal"]').forEach((btn) => {
        btn.addEventListener("click", function () {
            currentSchool = this.getAttribute("data-school");
            eventModalTitle.textContent = "Select Events - " + (schoolTitles[currentSchool] || "");

            step1Events.style.display = "block";
            step2Registration.style.display = "none";

            if (registrationForm) {
                const submitBtn = registrationForm.querySelector("button[type='submit']");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = "Submit &amp; Pay";
                }
            }

            renderEvents(currentSchool);
        });
    });

    function renderEvents(schoolKey) {
        dynamicEventCheckboxes.innerHTML = "";
        step1TotalAmount.textContent = "₹0";

        if (events[schoolKey]) {
            events[schoolKey].forEach((event, idx) => {
                const div = document.createElement("div");
                div.className = "form-check custom-checkbox mb-2";
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

    if (dynamicEventCheckboxes) {
        dynamicEventCheckboxes.addEventListener("change", (e) => {
            if (e.target.classList.contains("event-checkbox")) {
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

    function getSelectedEvents() {
        return Array.from(document.querySelectorAll(".event-checkbox:checked")).map((checkbox) => ({
            eventName: checkbox.getAttribute("data-name"),
            amount: parseInt(checkbox.value, 10)
        }));
    }

    async function submitRegistration(payload) {
        if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")) {
            throw new Error("Google Apps Script URL is missing.");
        }

        await new Promise((resolve, reject) => {
            const iframeName = `gas-frame-${Date.now()}`;
            const iframe = document.createElement("iframe");
            iframe.name = iframeName;
            iframe.style.display = "none";

            const form = document.createElement("form");
            form.method = "POST";
            form.action = GOOGLE_SCRIPT_URL;
            form.target = iframeName;
            form.style.display = "none";

            const fields = {
                fullName: payload.fullName,
                mobileNumber: payload.mobileNumber,
                emailId: payload.emailId,
                institutionName: payload.institutionName,
                eventName: payload.eventName,
                amount: String(payload.amount)
            };

            Object.entries(fields).forEach(([key, value]) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = value;
                form.appendChild(input);
            });

            let cleanedUp = false;
            const cleanup = () => {
                if (cleanedUp) return;
                cleanedUp = true;
                form.remove();
                iframe.remove();
            };

            iframe.addEventListener("load", () => {
                setTimeout(() => {
                    cleanup();
                    resolve();
                }, 300);
            });

            setTimeout(() => {
                cleanup();
                reject(new Error("Submission timed out."));
            }, 10000);

            document.body.appendChild(iframe);
            document.body.appendChild(form);
            form.submit();
        });
    }

    if (btnProceedToRegistration) {
        btnProceedToRegistration.addEventListener("click", () => {
            const selectedBoxes = document.querySelectorAll(".event-checkbox:checked");
            if (selectedBoxes.length === 0) {
                showAlert("Please select at least one event to proceed.", "danger");
                return;
            }

            const total = updateStep1Total();
            summaryEventCount.textContent = selectedBoxes.length;
            step2TotalAmount.textContent = `₹${total}`;
            eventModalTitle.textContent = "Complete Registration";
            step1Events.style.display = "none";
            step2Registration.style.display = "block";
        });
    }

    if (btnBackToEvents) {
        btnBackToEvents.addEventListener("click", () => {
            eventModalTitle.textContent = "Select Events - " + (schoolTitles[currentSchool] || "");
            step2Registration.style.display = "none";
            step1Events.style.display = "block";
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const mobileNumber = document.getElementById("phone").value.trim();
            const emailId = document.getElementById("email").value.trim();
            const institutionName = document.getElementById("college").value.trim();
            const selectedEvents = getSelectedEvents();

            if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
                showAlert("Please enter a valid 10-digit Indian mobile number.", "danger");
                return;
            }

            if (!emailId) {
                showAlert("Email ID is required.", "danger");
                return;
            }

            if (selectedEvents.length === 0) {
                showAlert("Please select at least one event.", "danger");
                return;
            }

            const amount = selectedEvents.reduce((sum, event) => sum + event.amount, 0);
            const payload = {
                fullName,
                mobileNumber,
                emailId,
                institutionName,
                eventName: selectedEvents.map((event) => event.eventName).join(", "),
                amount,
                selectedEvents
            };

            const submitButton = registrationForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Submitting...`;

            try {
                await submitRegistration(payload);
                showAlert(`Registration submitted successfully. Amount: <strong>₹${amount}</strong>`, "success");
                submitButton.innerHTML = "Submit &amp; Pay";
                $("#eventModal").modal("hide");
                registrationForm.reset();
                renderEvents(currentSchool);
                summaryEventCount.textContent = "0";
                step2TotalAmount.textContent = "₹0";
                step1TotalAmount.textContent = "₹0";
                removeIdFile("collegeID", "collegeFileContainer");
                removeIdFile("aadhaarID", "aadhaarFileContainer");
            } catch (error) {
                console.error("Registration submission failed:", error);
                showAlert("Submission failed. Please check the Google Apps Script URL and try again.", "danger");
                submitButton.disabled = false;
                submitButton.innerHTML = "Submit &amp; Pay";
            }
        });
    }

    function removeIdFile(inputId, containerId) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);
        if (input) input.value = "";
        if (container) container.innerHTML = "";
    }

    window.removeIdFile = removeIdFile;

    window.showAlert = function (message, type) {
        if (!alertContainer) return;

        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>`;

        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            $(alertDiv).alert("close");
        }, 5000);
    };
});
