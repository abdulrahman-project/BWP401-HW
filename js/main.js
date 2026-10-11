// ننتظر حتى يتم تحميل جميع عناصر الصفحة (HTML)
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. كود التحقق من نموذج صفحة (اتصل بنا)
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    const alertMessage = document.getElementById("alertMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // نمنع الصفحة من التحديث عند الضغط على إرسال

            // جلب القيم التي أدخلها المستخدم
            const userName = document.getElementById("userName").value.trim();
            const userEmail = document.getElementById("userEmail").value.trim();
            const userMessage = document.getElementById("userMessage").value.trim();

            // أداة للتحقق من أن البريد الإلكتروني مكتوب بصيغة صحيحة (يحتوي على @ و نقطة)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // التحقق من الحقول الفارغة
            if (userName === "" || userEmail === "" || userMessage === "") {
                // إظهار رسالة فشل (Bootstrap Alert)
                alertMessage.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>خطأ!</strong> يرجى تعبئة جميع الحقول المطلوبة.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
            }
            // التحقق من صحة البريد الإلكتروني
            else if (!emailRegex.test(userEmail)) {
                alertMessage.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>خطأ!</strong> يرجى إدخال بريد إلكتروني صحيح.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
            }
            // إذا كانت كل البيانات صحيحة
            else {
                // إظهار رسالة نجاح
                alertMessage.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>تم بنجاح!</strong> شكراً لك، تم إرسال رسالتك بنجاح.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                contactForm.reset(); // تفريغ الحقول بعد الإرسال الناجح
            }
        });
    }

    // ==========================================
    // 3. كود زر العودة للأعلى
    // ==========================================
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        // إظهار الزر عندما ينزل المستخدم 300 بكسل للأسفل
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        // عند الضغط على الزر، العودة للأعلى بسلاسة
        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    // ==========================================
    // 4. كود الوضع الليلي (Dark Mode)
    // ==========================================
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    if (darkModeToggle) {
        // التحقق مما إذا كان المستخدم قد اختار الوضع الليلي مسبقاً في صفحة أخرى
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-theme");
            darkModeToggle.innerHTML = "☀️";
        }

        // تفعيل التبديل عند الضغط على الزر
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-theme");

            // تغيير الأيقونة وحفظ الإعداد في ذاكرة المتصفح
            if (body.classList.contains("dark-theme")) {
                darkModeToggle.innerHTML = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                darkModeToggle.innerHTML = "🌙";
                localStorage.setItem("theme", "light");
            }
        });
    }
    // ==========================================
    // 2. كود فلترة (التصنيف + المكان + التاريخ) بأمان تام
    // ==========================================
    const categoryFilter = document.getElementById("categoryFilter");
    const locationFilter = document.getElementById("locationFilter");
    const dateFilter = document.getElementById("dateFilter"); // 1. أضفنا فلتر التاريخ
    const eventCards = document.querySelectorAll("[data-category]");

    if (categoryFilter) {
        const savedCategory = localStorage.getItem("preferredCategory");

        if (savedCategory) {
            categoryFilter.value = savedCategory;
        }

        function filterEvents() {
            const selectedCategory = categoryFilter.value;
            const selectedLocation = locationFilter ? locationFilter.value : "all";
            const selectedDate = dateFilter ? dateFilter.value : ""; // 2. جلب التاريخ الذي اختاره المستخدم

            localStorage.setItem("preferredCategory", selectedCategory);

            eventCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category") || "";
                const cardLocation = card.getAttribute("data-location") || "";
                const cardDate = card.getAttribute("data-date") || ""; // 3. قراءة تاريخ الكرت

                // فحص الشروط الثلاثة
                const matchCategory = (selectedCategory === "all" || selectedCategory === "الكل" || cardCategory === selectedCategory);
                const matchLocation = (selectedLocation === "all" || selectedLocation === "الكل" || cardLocation === selectedLocation);
                const matchDate = (selectedDate === "" || cardDate === selectedDate); // يتجاهل التاريخ إذا لم يقم المستخدم بتحديده

                // إظهار الكرت فقط إذا تطابقت الشروط الثلاثة معاً
                if (matchCategory && matchLocation && matchDate) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }

        filterEvents();
        categoryFilter.addEventListener("change", filterEvents);

        if (locationFilter) {
            locationFilter.addEventListener("change", filterEvents);
        }

        // 4. تشغيل الفلتر عند إدخال التاريخ
        if (dateFilter) {
            dateFilter.addEventListener("change", filterEvents);
            dateFilter.addEventListener("input", filterEvents);
        }
    }
});

