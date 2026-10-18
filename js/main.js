// wait until all elements of the page have loaded HTML
document.addEventListener("DOMContentLoaded", function () {

    // dark mode setting
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    if (darkModeToggle) {
        // localStorage dark mode
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-theme");
            darkModeToggle.innerHTML = "☀️";
        }

        // dark mode button
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-theme");

            if (body.classList.contains("dark-theme")) {
                darkModeToggle.innerHTML = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                darkModeToggle.innerHTML = "🌙";
                localStorage.setItem("theme", "light");
            }
        });
    }

    // Event filtering code
    const categoryFilter = document.getElementById("categoryFilter");
    const locationFilter = document.getElementById("locationFilter");
    const dateFilter = document.getElementById("dateFilter");
    const eventCards = document.querySelectorAll("[data-category]");

    if (categoryFilter || locationFilter || dateFilter) {

        function filterEvents() {
           
            const selectedCategory = categoryFilter ? categoryFilter.value : "all";
            const selectedLocation = locationFilter ? locationFilter.value : "all";
            const selectedDate = dateFilter ? dateFilter.value : "";

            eventCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category") || "";
                const cardLocation = card.getAttribute("data-location") || "";
                const cardDate = card.getAttribute("data-date") || "";

                
                const matchCategory = (selectedCategory === "all" || selectedCategory === "الكل" || cardCategory === selectedCategory);
                const matchLocation = (selectedLocation === "all" || selectedLocation === "الكل" || cardLocation === selectedLocation);
                const matchDate = (selectedDate === "" || cardDate === selectedDate);

                
                if (matchCategory && matchLocation && matchDate) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }

      
        filterEvents();

        
        if (categoryFilter) categoryFilter.addEventListener("change", filterEvents);
        if (locationFilter) locationFilter.addEventListener("change", filterEvents);
        if (dateFilter) {
            dateFilter.addEventListener("change", filterEvents);
            dateFilter.addEventListener("input", filterEvents);
        }
    }

    // Verification code for the 'Contact Us' page
    const contactForm = document.getElementById("contactForm");
    const alertMessage = document.getElementById("alertMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            const userName = document.getElementById("userName").value.trim();
            const userEmail = document.getElementById("userEmail").value.trim();
            const userMessage = document.getElementById("userMessage").value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Display the appropriate alert
            if (userName === "" || userEmail === "" || userMessage === "") {
                alertMessage.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>خطأ!</strong> يرجى تعبئة جميع الحقول المطلوبة.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>`;
            } else if (!emailRegex.test(userEmail)) {
                alertMessage.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>خطأ!</strong> يرجى إدخال بريد إلكتروني صحيح.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>`;
            } else {
                alertMessage.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>تم بنجاح!</strong> شكراً لك، تم إرسال رسالتك بنجاح.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>`;
                contactForm.reset();
            }
        });
    }

    // Back to top button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        window.addEventListener("scroll", function () {
            
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});