document.addEventListener("DOMContentLoaded", () => {

    // ---- Typing Effect ----
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        const phrases = ["Registrations Open Now!"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            typewriterElement.textContent = currentPhrase.substring(0, charIndex) + "_";

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 1000);
    }

    // ---- Event Poster Modal Logic ----
    const posterModalMap = {
        "law": "Images/Event Temp Images Used css/Law Final template.png",
        "tech": "Images/Event Temp Images Used css/FST Final template.png",
        "ibs": "Images/Event Temp Images Used css/IBS events template 1.png",
        "socialScience": "Images/Event Temp Images Used css/SOSs Final template.png",
        "architecture": "Images/Event Temp Images Used css/Arch Final template.png"
    };

    const lawEventsData = [
        { title: "Ideation", fee: "₹499", prize: "₹18,000", type: "Idea Presentation", desc: "Present innovative ideas to solve real-world problems." },
        { title: "Murder Mystery", fee: "₹399", prize: "₹15,000", type: "Interactive Game", desc: "Solve clues and uncover the mystery through teamwork." },
        { title: "The Plot Twist", fee: "₹499", prize: "₹18,000", type: "Storytelling", desc: "Create engaging stories with unexpected twists." },
        { title: "BGMI Tournament", fee: "₹499", prize: "₹18,000", type: "Gaming", desc: "Compete in intense BGMI battle royale matches." },
        { title: "FIFA Tournament", fee: "₹299", prize: "₹15,000", type: "Gaming", desc: "Play competitive football matches in FIFA." },
        { title: "Clash Royale Tournament", fee: "₹199", prize: "₹12,000", type: "Gaming", desc: "Battle opponents using strategy in Clash Royale." },
        { title: "Eco Art (Painting)", fee: "NIL", prize: "₹10,000", type: "Art", desc: "Create eco-friendly themed artwork." },
        { title: "Poster Making Competition", fee: "₹499", prize: "Participation-based", type: "Design", desc: "Design creative posters based on themes." },
        { title: "Canvas Painting", fee: "NIL", prize: "Display Only", type: "Art Exhibition", desc: "Showcase your painting skills on canvas." },
        { title: "Meme Making Competition", fee: "₹299", prize: "₹12,000", type: "Creative", desc: "Create funny and relatable memes." },
        { title: "Postcard Making", fee: "₹399", prize: "₹12,000", type: "Art & Craft", desc: "Design creative and unique postcards." },
        { title: "Digital Ad-Making", fee: "₹499", prize: "₹15,000", type: "Marketing", desc: "Create engaging digital advertisements." },
        { title: "Psych Sync", fee: "₹299", prize: "₹12,000", type: "Team Activity", desc: "Test coordination and understanding between teammates." },
        { title: "Stroop Battle", fee: "₹299", prize: "Trophy", type: "Cognitive Game", desc: "Test focus and reaction speed through challenges." },
        { title: "Sensus (Reel Making)", fee: "₹299", prize: "Trophy", type: "Video Creation", desc: "Create short reels with creative storytelling." },
        { title: "Lip Sync Battle", fee: "₹399", prize: "₹15,000", type: "Entertainment", desc: "Perform energetic and creative lip-sync acts." },
        { title: "Guess the Mess", fee: "₹399", prize: "₹15,000", type: "Fun Game", desc: "Guess items through messy and tricky clues." },
        { title: "Drama in a Chit", fee: "₹399", prize: "₹15,000", type: "Acting", desc: "Perform skits based on random topics." },
        { title: "Blind-Folded Treasure Hunt", fee: "₹499", prize: "₹18,000", type: "Adventure", desc: "Find clues and complete tasks while blindfolded." },
        { title: "Legal Meme Competition", fee: "₹299", prize: "₹12,000", type: "Creative", desc: "Create memes based on legal themes." },
        { title: "Extempore Moot Court", fee: "₹499", prize: "₹18,000", type: "Law / Debate", desc: "Present legal arguments on the spot." },
        { title: "Shabd Sangram (Debate)", fee: "₹499", prize: "₹15,000", type: "Debate", desc: "Compete in a verbal battle of arguments." },
        { title: "Treble Quest", fee: "₹399", prize: "₹12,000", type: "Music / Quiz", desc: "Participate in music-based challenges and quizzes." },
        { title: "The Web of Lies", fee: "₹399", prize: "₹15,000", type: "Strategy Game", desc: "Identify lies and deception among players." },
        { title: "Monopoly – The Bargain Battle", fee: "₹399", prize: "₹15,000", type: "Strategy", desc: "Play a business game focused on negotiation and deals." },
        { title: "Journal / Vision Board", fee: "₹399", prize: "₹12,000", type: "Creative", desc: "Create vision boards or personal journals." },
        { title: "Tote Bag Painting", fee: "₹399", prize: "₹12,000", type: "Art & Craft", desc: "Design and paint creative tote bags." },
        { title: "Chamber of Seven Sins", fee: "₹299", prize: "₹12,000", type: "Themed Event", desc: "Experience a game based on the seven deadly sins theme." }
    ];

    const techEventsData = [
        { title: "Space Quiz", fee: "₹499", prize: "₹15000", type: "Quiz / Space", desc: "A team quiz testing knowledge about space, rockets, and astronomy." },
        { title: "Videography Competition", fee: "₹499", prize: "₹15000", type: "Videography / Online", desc: "Create and submit a short video, with winners decided based on online likes." },
        { title: "Fit Fusion", fee: "₹299", prize: "₹12000", type: "Fun / Games", desc: "Participate in engaging table games that test coordination and fun skills." },
        { title: "Art Expo Competition", fee: "₹299", prize: "₹9000", type: "Art", desc: "Showcase your artwork creatively and compete to win prizes." },
        { title: "Aawaz", fee: "₹299–₹499", prize: "Exciting Prizes", type: "Music Competition", desc: "Perform solo, duet, instrumental, or group music acts on an open stage." },
        { title: "Ritu", fee: "₹499", prize: "₹15000", type: "Music Quiz", desc: "Test your knowledge of music theory and musical concepts through a quiz." },
        { title: "Short Film Competition", fee: "₹499", prize: "₹15000", type: "Filmmaking", desc: "Create and present a short film showcasing your storytelling skills." },
        { title: "Reels Making Competition", fee: "₹399", prize: "₹12000", type: "Video Creation", desc: "Make engaging reels under 2 minutes with creative content." },
        { title: "Script Writing Competition", fee: "₹299", prize: "₹9000", type: "Writing", desc: "Write an interesting and creative script for a cinematic concept." },
        { title: "Escape the Bud-Tech Maze", fee: "₹399", prize: "₹12000", type: "Tech / Puzzle", desc: "Solve coding and tech-based challenges to progress through levels." },
        { title: "Valorant Tournament", fee: "₹499", prize: "₹15000", type: "Gaming", desc: "Compete in a 5v5 tactical shooter to outplay and defeat opponents." },
        { title: "Call of Duty Mobile", fee: "₹299", prize: "₹9000", type: "Gaming", desc: "Engage in fast-paced combat matches to become the top team." },
        { title: "BGMI", fee: "₹299", prize: "₹9000", type: "Gaming", desc: "Survive and compete in a battle royale to be the last team standing." },
        { title: "Marketing Live", fee: "₹299", prize: "₹9000", type: "Marketing", desc: "Sell a product creatively within a limited time to impress judges." },
        { title: "Photo Contest", fee: "₹499", prize: "₹15000", type: "Photography", desc: "Submit creative photos based on themes and compete for top prizes." },
        { title: "Photo Scavenger Hunt", fee: "₹399", prize: "₹12000", type: "Puzzle / Team", desc: "Solve clues and capture photos to complete challenges and win." },
        { title: "RC Car Racing", fee: "₹299", prize: "₹9000", type: "Racing", desc: "Race RC cars against opponents to reach the finish line first." },
        { title: "Acting Competition", fee: "₹299", prize: "₹12000", type: "Acting", desc: "Perform short acts based on given scenarios with possible surprises." },
        { title: "Escape Room", fee: "₹299", prize: "₹9000", type: "Adventure / Puzzle", desc: "Solve clues and escape a horror-themed room within a time limit." }
    ];

    const ibsEventsData = [
        { title: "Genesis", fee: "₹499", prize: "₹18,000", type: "Entrepreneurial", desc: "A competition to showcase innovative business ideas and problem-solving skills." },
        { title: "Data Decode – \u201CFrom Chaos to Clarity\u201D", fee: "₹499", prize: "₹18,000", type: "Analytics Competition", desc: "Transform raw data into meaningful insights through analysis and decision-making." },
        { title: "Marketkshetra", fee: "₹499", prize: "₹18,000", type: "Marketing Simulation", desc: "Design creative marketing campaigns for brands using strategy and innovation." },
        { title: "Idealogue", fee: "₹499", prize: "₹18,000", type: "Debate", desc: "A debate event testing communication through structured and impromptu rounds." },
        { title: "Bids & Bails", fee: "₹499", prize: "₹18,000", type: "Auction Simulation", desc: "Build a team through strategic bidding in an IPL-style auction game." },
        { title: "Time Trap", fee: "₹499", prize: "₹18,000", type: "Strategy / Problem Solving", desc: "Solve challenges under time pressure with teamwork and quick thinking." },
        { title: "Frame the Find", fee: "₹499", prize: "₹18,000", type: "Videography & Editing", desc: "Create impactful visual stories using videography and editing skills." },
        { title: "FrameVerse (Short Video Competition)", fee: "₹499", prize: "₹18,000", type: "Short Film / Video", desc: "Produce a short cinematic video within a limited timeframe." }
    ];

    const architectureEventsData = [
        { title: "Melody Mania", fee: "NIL", prize: "Exciting Prizes", type: "Singing / Music", desc: "Perform your favorite songs and enjoy a fun, energetic musical experience." },
        { title: "Crystal Canvas Art", fee: "₹99", prize: "Exciting Prizes", type: "Art / Craft", desc: "Create beautiful glass paintings using colors, light, and creative designs." },
        { title: "Rang De Matka", fee: "₹199", prize: "Exciting Prizes", type: "Art / Craft", desc: "Paint and decorate pots with vibrant colors and creative patterns." },
        { title: "Digital Doodles", fee: "₹199", prize: "Exciting Prizes", type: "Digital Art", desc: "Get a fun and personalized digital caricature highlighting your unique features." }
    ];

    const socialScienceEventsData = [
        { title: "Vox Populi: Mock Parliament", fee: "₹499", prize: "Exciting Prizes", type: "Debate / Simulation", desc: "Experience a real parliamentary setup by debating policies and presenting arguments like MPs." },
        { title: "Finovate", fee: "₹399", prize: "Exciting Prizes", type: "Finance / Innovation", desc: "Pitch creative financial ideas to solve real-world problems with strategy and impact." },
        { title: "The Profiling Room: Where Behaviour Becomes Evidence", fee: "₹399", prize: "Exciting Prizes", type: "Psychology / Detective", desc: "Analyze clues and behavior to solve a crime using logical reasoning and psychological insights." },
        { title: "Canvas Carnival 2.0", fee: "₹299", prize: "Exciting Prizes", type: "Art Competition", desc: "Create a painting on the spot based on a surprise theme and present your idea." }
    ];

    const generateCarouselHtml = (carouselId, eventsList, isLight = false, customColor = null, styleOverrides = {}) => {
        const textColor = customColor || (isLight ? '#FFFFFF' : '#F5F5DC');
        const bodyFont = isLight ? 'inherit' : "'DM Serif Display', serif";
        const bgStyle = '';
        const controlFilter = customColor === '#000000' || customColor === 'black' ? 'filter: drop-shadow(2px 2px 4px rgba(255,255,255,0.8));' : 'filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));';

        const progressHtml = `
            <div class="story-progress-container d-flex position-absolute w-100" style="top: 13%; left: 0; padding: 0 20%; z-index: 1050; gap: 4px;">
                ${eventsList.map((_, index) => `
                    <div class="story-progress-segment" data-target="#${carouselId}" data-slide-to="${index}" ${isLight ? 'style="background-color: rgba(255,255,255,0.3);"' : (customColor === 'black' ? 'style="background-color: rgba(0,0,0,0.3);"' : '')}>
                        <div class="story-progress-fill" ${isLight ? 'style="background-color: #FFFFFF;"' : (customColor === 'black' ? 'style="background-color: #000000;"' : '')}></div>
                    </div>
                `).join('')}
            </div>
        `;

        const slidePadding = styleOverrides.padding || '8% 15%';
        const titleFontSize = styleOverrides.titleFontSize || 'clamp(1.8rem, 3.5vw, 3rem)';
        const bodyFontSize = styleOverrides.bodyFontSize || 'clamp(0.85rem, 1.4vw, 1.1rem)';
        const titleWordBreak = styleOverrides.wordBreak ? 'word-break: break-word; overflow-wrap: break-word;' : '';

        const slidesHtml = eventsList.map((e, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''} w-100 h-100" data-interval="4000">
                <div class="d-flex flex-column justify-content-center h-100" style="padding: ${slidePadding}; text-align: left; overflow-y: auto; overflow-x: hidden;">
                    <h2 style="font-size: ${titleFontSize}; margin-bottom: 1rem; font-family: 'DM Serif Display', serif; letter-spacing: 1px; color: ${textColor}; line-height: 1.2; ${titleWordBreak}">${e.title}</h2>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: ${bodyFontSize}; line-height: 1.6; color: ${textColor}; font-family: ${bodyFont};">
                        ${e.fee ? `<li style="margin-bottom: 0.4rem;">\u2022 <strong>Registration Fee:</strong> ${e.fee}</li>` : ''}
                        <li style="margin-bottom: 0.4rem;">\u2022 <strong>Pool Prize:</strong> ${e.prize}</li>
                        <li style="margin-bottom: 0.4rem;">\u2022 <strong>Type:</strong> ${e.type}</li>
                        <li style="margin-bottom: 0;">\u2022 <strong>Description:</strong> ${e.desc}</li>
                    </ul>
                </div>
            </div>
        `).join('');

        return `
            <div id="${carouselId}" class="carousel slide w-100 h-100" data-ride="carousel" style="${bgStyle} ${!isLight ? "font-family: 'DM Serif Display', serif;" : ""} color: ${textColor};">
                ${progressHtml}
                <div class="carousel-inner w-100 h-100">
                    ${slidesHtml}
                </div>
                <!-- Navigation Controls -->
                <a class="carousel-control-prev" href="#${carouselId}" role="button" data-slide="prev" style="width: 15%; opacity: 0.9; z-index: 1040;">
                    <span class="carousel-control-prev-icon" aria-hidden="true" style="width: 3rem; height: 3rem; ${controlFilter}"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#${carouselId}" role="button" data-slide="next" style="width: 15%; opacity: 0.9; z-index: 1040;">
                    <span class="carousel-control-next-icon" aria-hidden="true" style="width: 3rem; height: 3rem; ${controlFilter}"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        `;
    };

    // Lazy-generate carousel HTML only when needed (not all at once on page load)
    const schoolCarouselConfigs = {
        "law": () => generateCarouselHtml('lawEventCarousel', lawEventsData, false),
        "tech": () => generateCarouselHtml('techEventCarousel', techEventsData, false, 'black'),
        "ibs": () => generateCarouselHtml('ibsEventCarousel', ibsEventsData, true, null, {
            padding: '8% 18%',
            titleFontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
            bodyFontSize: 'clamp(0.8rem, 1.3vw, 1rem)'
        }),
        "socialScience": () => generateCarouselHtml('socialScienceEventCarousel', socialScienceEventsData, false, null, {
            padding: '8% 18%',
            titleFontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            bodyFontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)'
        }),
        "architecture": () => generateCarouselHtml('archEventCarousel', architectureEventsData, false, 'black')
    };

    // Cache generated HTML to avoid regenerating on repeated opens
    const carouselHtmlCache = {};

    function getCarouselHtml(school) {
        if (!carouselHtmlCache[school] && schoolCarouselConfigs[school]) {
            carouselHtmlCache[school] = schoolCarouselConfigs[school]();
        }
        return carouselHtmlCache[school] || '';
    }

    $('#posterModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var school = button.data('school');
        var modal = $(this);
        var overlay = modal.find('#modalTextOverlay');

        if (posterModalMap[school]) {
            modal.find('#modalSchoolPoster').attr('src', posterModalMap[school]);
        }

        var carouselHtml = getCarouselHtml(school);
        if (carouselHtml) {
            overlay.html(carouselHtml);

            var carousel = overlay.find('.carousel');
            if (carousel.length > 0) {
                carousel.carousel({
                    interval: 4000,
                    pause: false
                });

                carousel[0].style.setProperty('--story-duration', '4000ms');

                var updateStoryProgress = function (activeIndex) {
                    var segments = carousel.find('.story-progress-segment');
                    segments.each(function (i) {
                        var segment = $(this);
                        segment.removeClass('active completed paused');
                        if (i < activeIndex) {
                            segment.addClass('completed');
                        } else if (i === activeIndex) {
                            // Use rAF instead of forced reflow for restarting CSS animation
                            requestAnimationFrame(function () {
                                segment.addClass('active');
                            });
                        }
                    });
                };

                updateStoryProgress(0);

                carousel.on('slide.bs.carousel', function (e) {
                    updateStoryProgress(e.to);
                });

                carousel.attr('data-can-pause', 'false');

                carousel.on('mouseenter touchstart', function () {
                    if (carousel.attr('data-can-pause') === 'true') {
                        carousel.find('.story-progress-segment.active').addClass('paused');
                        carousel.carousel('pause');
                    }
                });

                carousel.on('mouseleave touchend', function () {
                    carousel.find('.story-progress-segment.active').removeClass('paused');
                    carousel.carousel('cycle');
                });
            }
        } else {
            overlay.html('');
        }
    });

    $('#posterModal').on('shown.bs.modal', function () {
        var carousel = $(this).find('.carousel');
        if (carousel.length > 0) {
            carousel.attr('data-can-pause', 'true');
            carousel.carousel('cycle');
            carousel.find('.story-progress-segment.active').removeClass('paused');
        }
    });

    $('#posterModal').on('hidden.bs.modal', function () {
        var carousel = $(this).find('.carousel');
        if (carousel.length > 0) {
            carousel.carousel('dispose');
        }
        // Clean up DOM to free memory
        $(this).find('#modalTextOverlay').empty();
        $(this).find('#modalSchoolPoster').attr('src', '');
    });

    // ---- Active Nav Dot on Scroll ----
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const navLinks = document.querySelectorAll(".side-nav a");

    if (sections.length > 0 && navLinks.length > 0) {
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
    }

    // ---- Event Data ----
    const events = {
        tech: [
            { name: "Space Quiz", price: 499 }, { name: "Videography Competition", price: 499 },
            { name: "Fit Fusion", price: 299 }, { name: "Art Expo Competition", price: 299 },
            { name: "Aawaz", price: 299 }, { name: "Ritu", price: 499 },
            { name: "Short Film Competition", price: 499 }, { name: "Reels Making Competition", price: 399 },
            { name: "Script Writing Competition", price: 299 }, { name: "Escape the Bud-Tech Maze", price: 399 },
            { name: "Valorant Tournament", price: 499 }, { name: "Call of Duty Mobile", price: 299 },
            { name: "BGMI", price: 299 }, { name: "Marketing Live", price: 299 },
            { name: "Photo Contest", price: 499 }, { name: "Photo Scavenger Hunt", price: 399 },
            { name: "RC Car Racing", price: 299 }, { name: "Acting Competition", price: 299 },
            { name: "Escape Room", price: 299 }
        ],
        ibs: [
            { name: "Genesis", price: 499 }, { name: "Data Decode – \u201CFrom Chaos to Clarity\u201D", price: 499 }, { name: "Marketkshetra", price: 499 },
            { name: "Idealogue", price: 499 }, { name: "Bids & Bails", price: 499 }, { name: "Time Trap", price: 499 },
            { name: "Frame the Find", price: 499 }, { name: "FrameVerse (Short Video Competition)", price: 499 }
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
            { name: "Vox Populi: Mock Parliament", price: 499 },
            { name: "Finovate", price: 399 },
            { name: "The Profiling Room: Where Behaviour Becomes Evidence", price: 399 },
            { name: "Canvas Carnival 2.0", price: 299 }
        ],
        architecture: [
            { name: "Melody Mania", price: 0 },
            { name: "Crystal Canvas Art", price: 99 },
            { name: "Rang De Matka", price: 199 },
            { name: "Digital Doodles", price: 199 }
        ]
    };

    const alertContainer = document.getElementById("alertContainer");

    // ---- Alert Helper ----
    function showAlert(message, type) {
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
    }

    // ================================================================
    // CENTRALIZED REGISTRATION SYSTEM — STANDALONE & DEEP LINKING
    // Supports mandatory PDF uploads (Aadhaar & College ID)
    // ================================================================

    const schoolLabels = {
        tech: "IcfaiTech (FST)",
        ibs: "IBS",
        law: "ICFAI Law School",
        socialScience: "Faculty of Social Science",
        architecture: "ICFAI Architecture"
    };

    const ALL_EVENTS = [];
    Object.keys(events).forEach((schoolKey) => {
        events[schoolKey].forEach((event) => {
            ALL_EVENTS.push({
                name: event.name,
                price: event.price,
                school: schoolKey,
                schoolLabel: schoolLabels[schoolKey] || schoolKey
            });
        });
    });

    // ---- DOM References ----
    const centralStep1Events = document.getElementById("centralStep1-events");
    const centralStep2Registration = document.getElementById("centralStep2-registration");
    const centralSchoolFilter = document.getElementById("centralSchoolFilter");
    const centralDynamicCheckboxes = document.getElementById("centralDynamicEventCheckboxes");
    const centralStep1Total = document.getElementById("centralStep1TotalAmount");
    const centralStep2Total = document.getElementById("centralStep2TotalAmount");
    const centralSummaryCount = document.getElementById("centralSummaryEventCount");
    const centralBtnProceed = document.getElementById("centralBtnProceedToRegistration");
    const centralBtnBack = document.getElementById("centralBtnBackToEvents");
    const centralForm = document.getElementById("centralRegistrationForm");

    // ---- Render Logic ----
    function renderCentralEvents(filterSchool) {
        if (!centralDynamicCheckboxes) return;

        // Build DOM in a fragment to avoid multiple reflows
        var fragment = document.createDocumentFragment();
        if (centralStep1Total) centralStep1Total.textContent = "\u20B90";

        const filtered = (filterSchool === "all" || !filterSchool)
            ? ALL_EVENTS
            : ALL_EVENTS.filter((e) => e.school === filterSchool);

        const grouped = {};
        filtered.forEach((event) => {
            if (!grouped[event.school]) grouped[event.school] = [];
            grouped[event.school].push(event);
        });

        Object.keys(grouped).forEach((schoolKey) => {
            if (filterSchool === "all" || !filterSchool) {
                const header = document.createElement("div");
                header.className = "central-school-group-header";
                header.style.cssText = "font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#EAD7C5;padding:8px 12px 4px;border-top:1px solid rgba(255,255,255,0.1);margin-top:6px;";
                header.textContent = schoolLabels[schoolKey] || schoolKey;
                fragment.appendChild(header);
            }

            grouped[schoolKey].forEach((event, idx) => {
                const div = document.createElement("div");
                div.className = "form-check custom-checkbox mb-2";
                const inputId = `central-event-${schoolKey}-${idx}`;
                div.innerHTML = `
                    <input class="form-check-input central-event-checkbox" type="checkbox"
                        value="${event.price}" data-name="${event.name}" data-school="${event.schoolLabel}" id="${inputId}">
                    <label class="form-check-label d-flex justify-content-between w-100" for="${inputId}">
                        <span>${event.name}<small style="display:block;color:rgba(243,240,224,0.5);font-size:0.78rem;">${event.schoolLabel}</small></span>
                        <span class="font-weight-bold">\u20B9${event.price}</span>
                    </label>`;
                fragment.appendChild(div);
            });
        });

        // Single DOM write instead of many appendChild calls
        centralDynamicCheckboxes.innerHTML = "";
        centralDynamicCheckboxes.appendChild(fragment);
    }

    function updateCentralStep1Total() {
        let total = 0;
        document.querySelectorAll(".central-event-checkbox:checked").forEach((cb) => {
            total += parseInt(cb.value, 10);
        });
        if (centralStep1Total) centralStep1Total.textContent = `\u20B9${total}`;
        return total;
    }

    function getCentralSelectedEvents() {
        return Array.from(document.querySelectorAll(".central-event-checkbox:checked")).map((cb) => ({
            eventName: cb.getAttribute("data-name"),
            school: cb.getAttribute("data-school"),
            amount: parseInt(cb.value, 10)
        }));
    }

    function initCentralRegistration() {
        if (!centralStep1Events) return;
        centralStep1Events.style.display = "block";
        centralStep2Registration.style.display = "none";
        const urlParams = new URLSearchParams(window.location.search);
        let schoolParam = urlParams.get("school");
        const schoolMap = { science: "tech", fst: "tech", business: "ibs", management: "ibs", social: "socialScience", ss: "socialScience", arch: "architecture" };
        if (schoolMap[schoolParam]) schoolParam = schoolMap[schoolParam];
        if (schoolParam && schoolLabels[schoolParam]) {
            if (centralSchoolFilter) centralSchoolFilter.value = schoolParam;
            renderCentralEvents(schoolParam);
        } else {
            if (centralSchoolFilter) centralSchoolFilter.value = "all";
            renderCentralEvents("all");
        }
    }

    // ---- File Helpers ----
    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    function validateFile(fileInput, statusEl) {
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            if (statusEl) statusEl.innerHTML = "";
            return false;
        }
        const file = fileInput.files[0];
        if (file.size > MAX_FILE_SIZE) {
            showAlert("File size exceeds 2MB limit.", "danger");
            fileInput.value = "";
            if (statusEl) statusEl.innerHTML = "";
            return false;
        }
        if (statusEl) statusEl.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> ${file.name} ready`;
        return file;
    }

    // ---- Premium Success Popup ----
    function showSuccessPopup(amount, redirectUrl) {
        const overlay = document.createElement("div");
        overlay.className = "registration-success-overlay";
        overlay.innerHTML = `
            <div class="success-card">
                <svg class="checkmark-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h2 class="success-title">Payment Received!</h2>
                <p class="success-subtitle">Your registration has been successfully processed.</p>
                <div class="success-details">
                    <div class="small text-muted mb-1">Total Amount</div>
                    <div class="success-amt">\u20B9${amount}</div>
                </div>
                <button class="close-success-btn">Back to Home</button>
            </div>`;

        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add("active"));

        overlay.querySelector(".close-success-btn").onclick = () => {
            overlay.classList.remove("active");
            setTimeout(() => {
                overlay.remove();
                if (redirectUrl) window.location.href = redirectUrl;
            }, 400);
        };
    }

    // ---- Event Listeners ----
    initCentralRegistration();

    if (centralSchoolFilter) {
        centralSchoolFilter.addEventListener("change", function () {
            renderCentralEvents(this.value);
        });
    }

    if (centralDynamicCheckboxes) {
        centralDynamicCheckboxes.addEventListener("change", (e) => {
            if (e.target.classList.contains("central-event-checkbox")) updateCentralStep1Total();
        });
    }

    ["centralAadhaarCard", "centralCollegeIdCard"].forEach((id) => {
        const input = document.getElementById(id);
        const st = document.getElementById(id + "Status");
        if (input) input.addEventListener("change", () => validateFile(input, st));
    });

    if (centralBtnProceed) {
        centralBtnProceed.addEventListener("click", () => {
            const checked = document.querySelectorAll(".central-event-checkbox:checked");
            if (checked.length === 0) {
                showAlert("Please select an event.", "danger");
                return;
            }
            if (centralSummaryCount) centralSummaryCount.textContent = checked.length;
            if (centralStep2Total) centralStep2Total.textContent = `\u20B9${updateCentralStep1Total()}`;
            centralStep1Events.style.display = "none";
            centralStep2Registration.style.display = "block";
            window.scrollTo(0, 0);
        });
    }

    if (centralBtnBack) {
        centralBtnBack.addEventListener("click", () => {
            centralStep2Registration.style.display = "none";
            centralStep1Events.style.display = "block";
            window.scrollTo(0, 0);
        });
    }

    if (centralForm) {
        centralForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const selectedEvents = getCentralSelectedEvents();
            if (selectedEvents.length === 0) {
                showAlert("Please select at least one event.", "danger");
                return;
            }
            const mobileNumber = document.getElementById("centralPhone").value.trim();
            if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
                showAlert("Please enter a valid 10-digit Indian mobile number.", "danger");
                return;
            }
            const aadhaarFile = validateFile(document.getElementById("centralAadhaarCard"), null);
            const collegeIdFile = validateFile(document.getElementById("centralCollegeIdCard"), null);
            if (!aadhaarFile || !collegeIdFile) {
                showAlert("Document uploads are mandatory.", "danger");
                return;
            }

            const btn = centralForm.querySelector("button[type='submit']");
            btn.disabled = true;
            btn.innerHTML = "Submitting...";

            try {
                const totalAmt = selectedEvents.reduce((s, ev) => s + ev.amount, 0);
                showSuccessPopup(totalAmt, "index.html");
            } catch (err) {
                console.error("Registration flow failed:", err);
                showAlert("Submission failed. Please try again.", "danger");
                btn.disabled = false;
                btn.innerHTML = "Submit &amp; Pay";
            }
        });
    }

    // ================================================================
    // END: Centralized Registration System
    // ================================================================

});
