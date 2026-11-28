
document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("opportunitiesTable");

    if (!table) return;

    const tbody = table.querySelector("tbody");
    const searchInput = document.getElementById("opportunitiesSearch");
    const limitSelect = document.getElementById("opportunitiesLimit");
    const info = document.getElementById("opportunitiesInfo");
    const pagination = document.getElementById("opportunitiesPagination");

    // اطلاعات فرصت‌ها
    let opportunities = [
        {
            id: 1,
            title: "توسعه‌دهنده فرانت‌اند",
            company: "داده‌پردازان نوین",
            type: "تمام‌وقت",
            deadline: "۱۴۰۵/۰۹/۱۵",
            applicants: 24,
            status: "success",
            statusText: "منتشرشده"
        },
        {
            id: 2,
            title: "طراح رابط کاربری",
            company: "راهکار گستران",
            type: "پروژه‌ای",
            deadline: "۱۴۰۵/۰۹/۰۸",
            applicants: 11,
            status: "pending",
            statusText: "در انتظار تأیید"
        },
        {
            id: 3,
            title: "کارشناس بازاریابی دیجیتال",
            company: "پیشگامان صنعت",
            type: "دورکاری",
            deadline: "۱۴۰۵/۰۹/۲۰",
            applicants: 8,
            status: "success",
            statusText: "منتشرشده"
        },
        {
            id: 4,
            title: "تحلیلگر داده",
            company: "فناوران فردا",
            type: "تمام‌وقت",
            deadline: "۱۴۰۵/۰۹/۰۲",
            applicants: 32,
            status: "neutral",
            statusText: "بسته‌شده"
        }
    ];

    let currentPage = 1;
    let rowsPerPage = Number(limitSelect.value);

    let sortColumn = null;
    let sortDirection = "asc";

    let filteredOpportunities = [...opportunities];

    // تبدیل اعداد به فارسی
    const toPersianNumber = number => {
        return String(number).replace(
            /\d/g,
            digit => "۰۱۲۳۴۵۶۷۸۹"[digit]
        );
    };

    // تبدیل اعداد فارسی به انگلیسی
    const toEnglishNumber = value => {
        return String(value).replace(/[۰-۹]/g, digit =>
            "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)
        );
    };

    // یکسان‌سازی متن برای جست‌وجو
    function normalizeText(value) {
        return toEnglishNumber(String(value))
            .toLowerCase()
            .trim();
    }

    // جلوگیری از ورود HTML ناخواسته
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entities[character];
        });
    }

    // جست‌وجو
    function searchRows() {
        const searchValue = normalizeText(searchInput.value);

        filteredOpportunities = opportunities.filter(opportunity => {
            return (
                normalizeText(opportunity.title).includes(searchValue) ||
                normalizeText(opportunity.company).includes(searchValue) ||
                normalizeText(opportunity.type).includes(searchValue) ||
                normalizeText(opportunity.deadline).includes(searchValue) ||
                normalizeText(opportunity.applicants).includes(searchValue) ||
                normalizeText(opportunity.statusText).includes(searchValue)
            );
        });

        currentPage = 1;

        sortRows();
        renderTable();
    }

    // مرتب‌سازی
    function sortRows() {
        if (sortColumn === null) return;

        const sortKeys = [
            "title",
            "company",
            "type",
            "deadline",
            "applicants",
            "statusText"
        ];

        const key = sortKeys[sortColumn];

        filteredOpportunities.sort((itemA, itemB) => {
            let valueA = itemA[key];
            let valueB = itemB[key];

            // مرتب‌سازی تعداد متقاضیان به‌صورت عددی
            if (sortColumn === 4) {
                valueA = Number(valueA);
                valueB = Number(valueB);

                return sortDirection === "asc"
                    ? valueA - valueB
                    : valueB - valueA;
            }

            valueA = normalizeText(valueA);
            valueB = normalizeText(valueB);

            return sortDirection === "asc"
                ? valueA.localeCompare(valueB, "fa")
                : valueB.localeCompare(valueA, "fa");
        });
    }

    // ساخت ردیف‌های جدول
    function renderTable() {
        const totalRows = filteredOpportunities.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);

        if (totalPages > 0 && currentPage > totalPages) {
            currentPage = totalPages;
        }

        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

        const visibleOpportunities = filteredOpportunities.slice(
            startIndex,
            endIndex
        );

        tbody.innerHTML = "";

        if (totalRows === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; padding:25px;">
                        موردی برای نمایش یافت نشد.
                    </td>
                </tr>
            `;
        } else {
            visibleOpportunities.forEach(opportunity => {
                const row = document.createElement("tr");

                row.dataset.id = opportunity.id;

                row.innerHTML = `
                    <td>${escapeHTML(opportunity.title)}</td>
                    <td>${escapeHTML(opportunity.company)}</td>
                    <td>${escapeHTML(opportunity.type)}</td>
                    <td>${escapeHTML(opportunity.deadline)}</td>
                    <td>${toPersianNumber(opportunity.applicants)}</td>
                    <td>
                        <span class="status ${escapeHTML(opportunity.status)}">
                            ${escapeHTML(opportunity.statusText)}
                        </span>
                    </td>
                `;

                tbody.appendChild(row);
            });
        }

        // اطلاعات تعداد نتایج
        info.textContent = totalRows === 0
            ? "هیچ موردی یافت نشد."
            : `نمایش ${toPersianNumber(startIndex + 1)} تا ${toPersianNumber(endIndex)} از ${toPersianNumber(totalRows)} مورد`;

        renderPagination(totalPages);
    }

    // صفحه‌بندی
    function renderPagination(totalPages) {
        pagination.innerHTML = "";

        if (totalPages <= 1) return;

        // دکمه قبلی
        const prevButton = document.createElement("button");

        prevButton.className = "pagination-btn";
        prevButton.textContent = "قبلی";
        prevButton.disabled = currentPage === 1;

        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });

        pagination.appendChild(prevButton);

        // شماره صفحات
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");

            pageButton.className = "pagination-btn";
            pageButton.textContent = toPersianNumber(i);

            if (i === currentPage) {
                pageButton.classList.add("active");
            }

            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderTable();
            });

            pagination.appendChild(pageButton);
        }

        // دکمه بعدی
        const nextButton = document.createElement("button");

        nextButton.className = "pagination-btn";
        nextButton.textContent = "بعدی";
        nextButton.disabled = currentPage === totalPages;

        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });

        pagination.appendChild(nextButton);
    }

    // مرتب‌سازی با کلیک روی عنوان ستون‌ها
    table.querySelectorAll("thead th").forEach((th, index) => {
        th.style.cursor = "pointer";

        th.addEventListener("click", () => {
            if (sortColumn === index) {
                sortDirection = sortDirection === "asc" ? "desc" : "asc";
            } else {
                sortColumn = index;
                sortDirection = "asc";
            }

            sortRows();
            currentPage = 1;
            renderTable();
        });
    });

    // جست‌وجو
    searchInput.addEventListener("input", searchRows);

    // تغییر تعداد ردیف‌ها
    limitSelect.addEventListener("change", () => {
        rowsPerPage = Number(limitSelect.value);
        currentPage = 1;
        renderTable();
    });

    // اجرای اولیه
    renderTable();
});
