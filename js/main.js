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
    // كود فلترة الفعاليات الشامل (تصنيف، مكان، تاريخ)
    // ==========================================
    document.addEventListener("DOMContentLoaded", function () {
        // جلب حقول البحث
        const categoryFilter = document.getElementById("categoryFilter");
        const locationFilter = document.getElementById("locationFilter");
        const dateFilter = document.getElementById("dateFilter");

        // جلب جميع الكروت التي تحتوي على تصنيف
        const eventCards = document.querySelectorAll("[data-category]");

        if (categoryFilter) {
            // التحقق من وجود تصنيف محفوظ مسبقاً (البونس)
            const savedCategory = localStorage.getItem("preferredCategory");
            if (savedCategory) {
                categoryFilter.value = savedCategory;
            }

            // دالة الفلترة الشاملة
            function filterEvents() {
                // جلب القيم الحالية من الحقول الثلاثة
                const selectedCategory = categoryFilter.value;
                const selectedLocation = locationFilter ? locationFilter.value : "all";
                const selectedDate = dateFilter ? dateFilter.value : "";

                // حفظ التصنيف في الذاكرة
                localStorage.setItem("preferredCategory", selectedCategory);

                // المرور على جميع الكروت لفحصها
                eventCards.forEach(card => {
                    const cardCategory = card.getAttribute("data-category");
                    const cardLocation = card.getAttribute("data-location");
                    const cardDate = card.getAttribute("data-date");

                    // فحص كل شرط على حدة
                    const matchCategory = (selectedCategory === "all" || selectedCategory === "الكل" || cardCategory === selectedCategory);
                    const matchLocation = (selectedLocation === "all" || selectedLocation === "الكل" || cardLocation === selectedLocation);
                    const matchDate = (selectedDate === "" || cardDate === selectedDate); // إذا كان التاريخ فارغاً يتم تجاوزه

                    // إذا تطابقت جميع الشروط (و) نظهر الكرت، وإلا نخفيه
                    if (matchCategory && matchLocation && matchDate) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            }

            // تشغيل الفلترة عند تغيير أي حقل من الحقول الثلاثة
            categoryFilter.addEventListener("change", filterEvents);
            if (locationFilter) locationFilter.addEventListener("change", filterEvents);
            if (dateFilter) dateFilter.addEventListener("change", filterEvents);

            // تشغيل الفلترة فور تحميل الصفحة لتطبيق التفضيل المحفوظ
            filterEvents();
        }
    });

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
});

// ==========================================
// 4. كود الوضع الليلي (Dark Mode)
// ==========================================
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// ==========================================
// 4. كود الوضع الليلي (Dark Mode) المعدل
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    if (darkModeToggle) {
        // التحقق من ذاكرة المتصفح
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-theme");
            darkModeToggle.innerHTML = "☀️";
        }

        // تفعيل الزر
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
});