/* =========================================
   ONELEARN - JAVASCRIPT
   Interactive Website Features
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. SELECT HTML ELEMENTS
    // =====================================

    const courseCards = document.querySelectorAll(".course-card");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const categoryCards = document.querySelectorAll(".category-card");

    const heroSearchForm = document.getElementById("heroSearchForm");
    const headerSearchForm = document.getElementById("headerSearchForm");

    const heroSearch = document.getElementById("heroSearch");
    const headerSearch = document.getElementById("headerSearch");

    const noResults = document.getElementById("noResults");
    const currentYear = document.getElementById("currentYear");

    // =====================================
    // 2. UPDATE COPYRIGHT YEAR
    // =====================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // =====================================
    // 3. COURSE FILTER AND SEARCH STATE
    // =====================================

    let selectedFilter = "all";
    let selectedCategory = "all";
    let searchText = "";

    // =====================================
    // 4. SHOW MATCHING COURSES
    // =====================================

    function updateCourses() {

        let visibleCourses = 0;

        courseCards.forEach(function (card) {

            const courseType = card.dataset.type;
            const courseCategory = card.dataset.category;

            const courseTitle =
                card.querySelector("h3").textContent.toLowerCase();

            const providerElement = card.querySelector(".provider");

            const providerName = providerElement
                ? providerElement.textContent.toLowerCase()
                : "";

            const searchableText =
                courseTitle + " " + providerName + " " + courseCategory;

            // Check selected free/paid filter
            const matchesFilter =
                selectedFilter === "all" ||
                courseType === selectedFilter;

            // Check selected category
            const matchesCategory =
                selectedCategory === "all" ||
                courseCategory === selectedCategory;

            // Check search text
            const matchesSearch =
                searchableText.includes(searchText);

            // Show only courses matching every condition
            const shouldShow =
                matchesFilter && matchesCategory && matchesSearch;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCourses++;
            }
        });

        // Display a message if no courses match
        if (noResults) {
            noResults.hidden = visibleCourses !== 0;
        }
    }

    // =====================================
    // 5. FREE AND PAID FILTER BUTTONS
    // =====================================

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove active state from every button
            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            // Highlight selected button
            button.classList.add("active");

            // Update selected filter
            selectedFilter = button.dataset.filter;

            // Refresh courses
            updateCourses();
        });
    });

    // =====================================
    // 6. SEARCH FUNCTION
    // =====================================

    function performSearch(value) {

        searchText = value.trim().toLowerCase();

        updateCourses();

        // Move down to courses if a search was submitted
        document.getElementById("courses").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // Hero search form
    if (heroSearchForm && heroSearch) {

        heroSearchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Keep both search boxes synchronized
            if (headerSearch) {
                headerSearch.value = heroSearch.value;
            }

            performSearch(heroSearch.value);
        });
    }

    // Header search form
    if (headerSearchForm && headerSearch) {

        headerSearchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Keep both search boxes synchronized
            if (heroSearch) {
                heroSearch.value = headerSearch.value;
            }

            performSearch(headerSearch.value);
        });
    }

    // Search updates as the user types in the hero box
    if (heroSearch) {

        heroSearch.addEventListener("input", function () {

            if (headerSearch) {
                headerSearch.value = heroSearch.value;
            }

            searchText = heroSearch.value.trim().toLowerCase();

            updateCourses();
        });
    }

    // Search updates as the user types in the header box
    if (headerSearch) {

        headerSearch.addEventListener("input", function () {

            if (heroSearch) {
                heroSearch.value = headerSearch.value;
            }

            searchText = headerSearch.value.trim().toLowerCase();

            updateCourses();
        });
    }

    // =====================================
    // 7. CATEGORY SELECTION
    // =====================================

    categoryCards.forEach(function (categoryCard) {

        categoryCard.addEventListener("click", function (event) {

            // Prevent navigation because filtering happens on this page
            event.preventDefault();

            // Read selected category
            selectedCategory = categoryCard.dataset.category;

            // Clear previous search
            searchText = "";

            if (heroSearch) {
                heroSearch.value = "";
            }

            if (headerSearch) {
                headerSearch.value = "";
            }

            // Reset free/paid filter
            selectedFilter = "all";

            filterButtons.forEach(function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === "all"
                );
            });

            // Show matching category courses
            updateCourses();

            // Scroll to course section
            document.getElementById("courses").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // =====================================
    // 8. RESET CATEGORY WHEN OPENING COURSES
    // =====================================

    document.querySelectorAll(
        '.navbar a[href="#courses"], .footer-links a[href="#courses"]'
    ).forEach(function (link) {

        link.addEventListener("click", function () {

            selectedCategory = "all";
            updateCourses();
        });
    });

    // =====================================
    // 9. INITIALIZE WEBSITE
    // =====================================

    updateCourses();

    console.log("OneLearn website loaded successfully!");

});


/* OneLearn Learning Assistant - Demo Logic */

(function () {
  function initOneLearnChat() {
    const toggle = document.getElementById("onelearn-chat-toggle");
    const windowBox = document.getElementById("onelearn-chat-window");
    const close = document.getElementById("onelearn-chat-close");
    const messages = document.getElementById("onelearn-chat-messages");
    const form = document.getElementById("onelearn-chat-form");
    const input = document.getElementById("onelearn-chat-input");
    const quickButtons = document.querySelectorAll(
      "#onelearn-chatbot [data-question]"
    );

    if (!toggle || !windowBox || !messages || !form || !input) return;

    function openChat() {
      windowBox.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      input.focus();
    }

    function closeChat() {
      windowBox.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    toggle.addEventListener("click", function () {
      if (windowBox.hidden) {
        openChat();
      } else {
        closeChat();
      }
    });

    if (close) close.addEventListener("click", closeChat);

    function addMessage(text, sender) {
      const message = document.createElement("div");
      message.className = "onelearn-message " + sender;
      message.textContent = text;
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
    }

    function getReply(question) {
      const q = question.toLowerCase();

      if (/\b(hi|hello|hey|namaste)\b/.test(q)) {
        return "Hello! 👋 Welcome to OneLearn. I can help you discover courses, explore skills, and find learning resources. What would you like to learn?";
      }

      if (/\b(thank|thanks|thank you)\b/.test(q)) {
        return "You're welcome! 💙 Keep learning and growing with OneLearn.";
      }

      if (/\b(free|no cost|without paying|affordable)\b/.test(q)) {
        return "Here are some places to explore free learning resources:\n\n• freeCodeCamp: https://www.freecodecamp.org/\n• Khan Academy: https://www.khanacademy.org/\n• SWAYAM: https://swayam.gov.in/\n• MDN Web Docs: https://developer.mozilla.org/\n\nCheck each provider for course availability and any certificate fees.";
      }

      if (/\b(web development|website|html|css|javascript|coding|programming)\b/.test(q)) {
        return "Great choice! 💻 Start learning in this order:\n\n1. HTML — structure of a webpage\n2. CSS — webpage design\n3. JavaScript — interactivity\n4. Build a small project\n\nFree resource: https://www.freecodecamp.org/\n\nWould you like to explore another skill too?";
      }

      if (/\b(python|java|c\+\+|programming language)\b/.test(q)) {
        return "To learn programming, start with basic concepts such as variables, conditions, loops, and functions. Python is a beginner-friendly option.\n\nExplore: https://www.w3schools.com/ or https://www.freecodecamp.org/";
      }

      if (/\b(data science|data analytics|excel|spreadsheet)\b/.test(q)) {
        return "📊 Interested in data skills? You can start with:\n\n1. Excel and spreadsheets\n2. Basic statistics\n3. Data visualization\n4. Python or SQL as your next step\n\nTry learning resources at https://www.khanacademy.org/ and https://www.w3schools.com/.";
      }

      if (/\b(career|job|resume|interview|employment)\b/.test(q)) {
        return "🚀 For career preparation:\n\n1. Choose a career goal.\n2. Identify the skills required.\n3. Take relevant courses.\n4. Build projects to demonstrate your skills.\n5. Prepare your resume and interview skills.\n\nTell me which career or field interests you.";
      }

      if (/\b(course|courses|recommend|recommendation|learn|learning|skill|skills|start|beginner)\b/.test(q)) {
        return "I can help you explore learning paths! 🎓\n\n• Web development: HTML, CSS, JavaScript\n• Data skills: Excel, statistics, SQL\n• Programming: Python fundamentals\n• Career preparation: projects and interview skills\n\nTell me which subject interests you and whether you prefer free courses.";
      }

      if (/\b(help|what can you do|options)\b/.test(q)) {
        return "I can help you with:\n\n• Finding free learning resources\n• Exploring technical skills\n• Getting started with web development\n• Exploring career preparation\n• Choosing a learning path\n\nTry asking: 'How do I learn web development for free?'";
      }

      return "Thanks for your question! 😊 I'm the OneLearn demo assistant, so I can answer a limited set of predefined questions.\n\nTry asking about free courses, web development, programming, data skills, or career guidance.";
    }

    function sendQuestion(question) {
      const cleanQuestion = question.trim();
      if (!cleanQuestion) return;

      addMessage(cleanQuestion, "user");
      input.value = "";

      // Small delay to make the demo feel conversational.
      setTimeout(function () {
        addMessage(getReply(cleanQuestion), "bot");
      }, 350);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sendQuestion(input.value);
    });

    quickButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openChat();
        sendQuestion(button.dataset.question || "");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOneLearnChat);
  } else {
    initOneLearnChat();
  }
})();
