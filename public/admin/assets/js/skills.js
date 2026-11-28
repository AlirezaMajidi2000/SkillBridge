
document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("skillsTable");

    if (!table) return;

    const tbody = table.querySelector("tbody");
    const searchInput = document.getElementById("skillsSearch");
    const limitSelect = document.getElementById("skillsLimit");
    const info = document.getElementById("skillsInfo");
    const pagination = document.getElementById("skillsPagination");

    // اطلاعات مهارت‌ها
    let skills = [
        {
            id: 1,
            title: "طراحی رابط کاربری",
            category: "طراحی و هنر",
            specialists: 186,
            status: "success",
            statusText: "فعال",
            lastEdit: "۱۴۰۵/۰۸/۲۸"
        },
        {
            id: 2,
            title: "JavaScript",
            category: "فناوری اطلاعات",
            specialists: 342,
            status: "success",
            statusText: "فعال",
            lastEdit: "۱۴۰۵/۰۸/۲۷"
        },
        {
            id: 3,
            title: "مدیریت پروژه",
            category: "مدیریت و کسب‌وکار",
            specialists: 94,
            status: "success",
            statusText: "فعال",
            lastEdit: "۱۴۰۵/۰۸/۲۵"
        },
        {
            id: 4,
            title: "تحلیل داده",
            category: "فناوری اطلاعات",
            specialists: 78,
            status: "neutral",
            statusText: "غیرفعال",
            lastEdit: "۱۴۰۵/۰۸/۲۰"
        },
        
    ];

    let currentPage = 1;
    let rowsPerPage = Number(limitSelect.value);

    let sortColumn = null;
    let sortDirection = "asc";

    let filteredSkills = [...skills];

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

    // جلوگیری از ورود کد HTML ناخواسته در اطلاعات
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

        filteredSkills = skills.filter(skill => {
            return (
                normalizeText(skill.title).includes(searchValue) ||
                normalizeText(skill.category).includes(searchValue) ||
                normalizeText(skill.specialists).includes(searchValue) ||
                normalizeText(skill.statusText).includes(searchValue) ||
                normalizeText(skill.lastEdit).includes(searchValue)
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
            "category",
            "specialists",
            "statusText",
            "lastEdit"
        ];

        const key = sortKeys[sortColumn];

        filteredSkills.sort((skillA, skillB) => {
            let valueA = skillA[key];
            let valueB = skillB[key];

            if (sortColumn === 2) {
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
        const totalRows = filteredSkills.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);

        if (totalPages > 0 && currentPage > totalPages) {
            currentPage = totalPages;
        }

        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

        const visibleSkills = filteredSkills.slice(startIndex, endIndex);

        tbody.innerHTML = "";

        if (totalRows === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; padding:25px;">
                        مهارتی یافت نشد.
                    </td>
                </tr>
            `;
        } else {
            visibleSkills.forEach(skill => {
                const row = document.createElement("tr");

                row.dataset.id = skill.id;

                row.innerHTML = `
                    <td>${escapeHTML(skill.title)}</td>
                    <td>${escapeHTML(skill.category)}</td>
                    <td>${toPersianNumber(skill.specialists)}</td>

                    <td>
                        <span class="status ${escapeHTML(skill.status)}">
                            ${escapeHTML(skill.statusText)}
                        </span>
                    </td>

                    <td>${escapeHTML(skill.lastEdit)}</td>

                    <td>
                        <div class="table-actions">
                            <button class="action view"
                                data-action="view"
                                title="نمایش">
                                <i class="fa-light fa-eye"></i>
                            </button>

                            <button class="action edit"
                                data-action="edit"
                                title="ویرایش">
                                <i class="fa-light fa-pen-to-square"></i>
                            </button>

                            <button class="action delete"
                                data-action="delete"
                                title="حذف">
                                <i class="fa-light fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                `;

                tbody.appendChild(row);
            });
        }

        // نمایش تعداد نتایج
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
        if (index === 5) return;

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

    // رویداد جست‌وجو
    searchInput.addEventListener("input", searchRows);

    // تغییر تعداد ردیف‌ها
    limitSelect.addEventListener("change", () => {
        rowsPerPage = Number(limitSelect.value);
        currentPage = 1;
        renderTable();
    });

    // عملیات جدول
    tbody.addEventListener("click", event => {
        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const row = button.closest("tr");

        if (!row) return;

        const skillId = Number(row.dataset.id);

        const skill = skills.find(item => item.id === skillId);

        if (!skill) return;

        // نمایش اطلاعات مهارت
        if (action === "view") {
            alert(
                `عنوان مهارت: ${skill.title}\n` +
                `دسته‌بندی: ${skill.category}\n` +
                `تعداد متخصص: ${toPersianNumber(skill.specialists)}\n` +
                `وضعیت: ${skill.statusText}\n` +
                `آخرین ویرایش: ${skill.lastEdit}`
            );
        }

        // ویرایش مهارت
        else if (action === "edit") {
            const newName = prompt(
                "عنوان جدید مهارت را وارد کنید:",
                skill.title
            );

            if (newName !== null && newName.trim() !== "") {
                skill.title = newName.trim();

                searchRows();
            }
        }

        // حذف مهارت
        else if (action === "delete") {
            const confirmed = confirm(
                `آیا از حذف مهارت «${skill.title}» مطمئن هستید؟`
            );

            if (confirmed) {
                skills = skills.filter(item => item.id !== skillId);

                searchRows();
            }
        }
    });

    // اجرای اولیه جدول
    renderTable();
});
