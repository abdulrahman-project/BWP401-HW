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
    // 2. كود فلترة الفعاليات في صفحة (events.html)
    // ==========================================
    const categoryFilter = document.getElementById("categoryFilter");
    const eventItems = document.querySelectorAll(".event-item");

    if (categoryFilter) {
        categoryFilter.addEventListener("change", function () {
            const selectedCategory = categoryFilter.value;

            // المرور على كل الفعاليات وإخفاء أو إظهار الفعالية حسب التصنيف
            eventItems.forEach(function (item) {
                const itemCategory = item.getAttribute("data-category");

                if (selectedCategory === "all" || selectedCategory === itemCategory) {
                    item.style.display = "block"; // إظهار الكرت
                } else {
                    item.style.display = "none"; // إخفاء الكرت
                }
            });
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
});