document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       1. CUỘN MƯỢT KHI BẤM MENU
    ========================= */

    const menuLinks = document.querySelectorAll('nav a[href^="#"]');

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================
       2. MENU TỰ ĐỔI MÀU
       KHI ĐANG Ở SECTION ĐÓ
    ========================= */

    const sections = document.querySelectorAll(
        ".Hero, .Gioithieu, .Mangxahoi, .Kynang, .Sothich, .Lienhe"
    );

    const navLinks = document.querySelectorAll("nav a");

    const sectionIds = {
        "Hero": "trangchu",
        "Gioithieu": "gioithieu",
        "Mangxahoi": "mangxahoi",
        "Kynang": "kynang",
        "Sothich": "sothich",
        "Lienhe": "lienhe"
    };


    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const sectionClass = entry.target.className;
                    const id = sectionIds[sectionClass];

                    navLinks.forEach(function (link) {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        'nav a[href="#' + id + '"]'
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );


    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });


    /* =========================
       3. NÚT ↑ VỀ ĐẦU TRANG
    ========================= */

    const topButton = document.querySelector(".Footer-top");

    if (topButton) {

        topButton.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================
       4. NÚT "XEM THÊM"
    ========================= */

    const xemThem = document.querySelector(
        ".Gioithieu-noidung .btn"
    );

    if (xemThem) {

        xemThem.addEventListener("click", function (event) {

            const target = document.querySelector("#kynang");

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =========================
       5. FORM LIÊN HỆ
    ========================= */

    const contactForm = document.querySelector(".Lienhe-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const nameInput = contactForm.querySelector(
                'input[placeholder="Họ và tên"]'
            );

            const emailInput = contactForm.querySelector(
                'input[type="email"]'
            );

            const messageInput = contactForm.querySelector(
                "textarea"
            );


            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();


            // Kiểm tra dữ liệu

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                alert(
                    "Vui lòng điền đầy đủ thông tin trước khi gửi!"
                );

                return;

            }


            // Thông báo gửi thành công

            alert(
                "Cảm ơn " +
                name +
                "! Mình đã nhận được lời nhắn của bạn."
            );


            // Xóa nội dung form

            contactForm.reset();

        });

    }


    /* =========================
       6. LINK ĐANG ĐỂ #
       KHÔNG NHẢY LÊN ĐẦU TRANG
    ========================= */

    const emptyLinks = document.querySelectorAll(
        'a[href="#"]'
    );

    emptyLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });


    /* =========================
       7. HIỆU ỨNG XUẤT HIỆN
       KHI CUỘN TRANG
    ========================= */

    const revealItems = document.querySelectorAll(
        ".Gioithieu-card, " +
        ".Mangxahoi-item, " +
        ".Kynang-item, " +
        ".Sothich-item, " +
        ".Lienhe-thongtin, " +
        ".Lienhe-form"
    );


    /* Tạo CSS cho hiệu ứng */

    const style = document.createElement("style");

    style.textContent = `

        .reveal-item {

            opacity: 0;

            transform: translateY(25px);

            transition:
                opacity 0.7s ease,
                transform 0.7s ease;

        }


        .reveal-item.show {

            opacity: 1;

            transform: translateY(0);

        }


        nav a {

            transition: color 0.3s ease;

        }


        nav a.active {

            color: #D9A441;

        }

    `;


    document.head.appendChild(style);


    /* Gắn class hiệu ứng */

    revealItems.forEach(function (item) {

        item.classList.add("reveal-item");

    });


    /* Theo dõi khi card xuất hiện */

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealItems.forEach(function (item) {

        revealObserver.observe(item);

    });

});