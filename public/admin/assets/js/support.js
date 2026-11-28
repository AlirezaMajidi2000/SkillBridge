
let supportMessages = [
    {
        id: "TK-2048",
        sender: "نگار احمدی",
        initial: "ن",
        senderType: "متخصص",
        subject: "مشکل در تکمیل پروفایل",
        date: "امروز",
        priority: "info",
        priorityText: "عادی",
        status: "pending",
        statusText: "باز"
    },
    {
        id: "TK-2047",
        sender: "داده‌پردازان",
        initial: "د",
        senderType: "شرکت",
        subject: "درخواست اصلاح اطلاعات شرکت",
        date: "دیروز",
        priority: "rejected",
        priorityText: "بالا",
        status: "info",
        statusText: "در حال رسیدگی"
    },
    {
        id: "TK-2043",
        sender: "علی رضایی",
        initial: "ع",
        senderType: "متخصص",
        subject: "گزارش خطای بارگذاری رزومه",
        date: "۲ روز پیش",
        priority: "info",
        priorityText: "عادی",
        status: "success",
        statusText: "بسته‌شده"
    }
];

const supportSearch = document.getElementById("supportSearch");
const supportLimit = document.getElementById("supportLimit");
const supportTable = document.getElementById("supportTable");
const supportInfo = document.getElementById("supportInfo");
const supportPagination = document.getElementById("supportPagination");

let currentPage = 1;
let rowsPerPage = 5;
let searchValue = "";
let sortColumn = null;
let sortDirection = 1;

const faCollator = new Intl.Collator("fa", {
    numeric: true,
    sensitivity: "base"
});

// تبدیل اعداد انگلیسی به فارسی
function toPersianNumber(value) {
    return String(value).replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

// جلوگیری از ورود HTML ناخواسته به جدول
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// جست‌وجو
function searchSupportMessages() {
    const value = searchValue.trim().toLowerCase();

    return supportMessages.filter(message => {
        return Object.values(message).some(item =>
            String(item).toLowerCase().includes(value)
        );
    });
}

// مرتب‌سازی
function sortSupportMessages(data) {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
        return faCollator.compare(
            String(a[sortColumn]),
            String(b[sortColumn])
        ) * sortDirection;
    });
}

// نمایش اطلاعات جدول
function renderSupportTable() {
    const filteredMessages = sortSupportMessages(searchSupportMessages());

    const totalMessages = filteredMessages.length;
    const totalPages = Math.ceil(totalMessages / rowsPerPage);

    if (currentPage > totalPages) {
        currentPage = Math.max(1, totalPages);
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalMessages);

    const currentMessages = filteredMessages.slice(startIndex, endIndex);

    supportTable.querySelector("tbody").innerHTML =
        currentMessages.map(message => `
            <tr>
                <td>#${escapeHTML(message.id)}</td>

                <td>
                    <div class="person">
                        <span class="mini-avatar">
                            ${escapeHTML(message.initial)}
                        </span>

                        <span>
                            <b>${escapeHTML(message.sender)}</b>
                            <small>${escapeHTML(message.senderType)}</small>
                        </span>
                    </div>
                </td>

                <td>${escapeHTML(message.subject)}</td>

                <td>${escapeHTML(message.date)}</td>

                <td>
                    <span class="status ${escapeHTML(message.priority)}">
                        ${escapeHTML(message.priorityText)}
                    </span>
                </td>

                <td>
                    <span class="status ${escapeHTML(message.status)}">
                        ${escapeHTML(message.statusText)}
                    </span>
                </td>
            </tr>
        `).join("");

    supportInfo.textContent = totalMessages
        ? `نمایش ${toPersianNumber(startIndex + 1)} تا ${toPersianNumber(endIndex)} از ${toPersianNumber(totalMessages)} مورد`
        : "موردی برای نمایش وجود ندارد";

    renderSupportPagination(totalPages);
}

// صفحه‌بندی
function renderSupportPagination(totalPages) {
    supportPagination.innerHTML = "";

    if (totalPages <= 1) return;

    const prevButton = document.createElement("button");
    prevButton.className = "pagination-btn";
    prevButton.textContent = "قبلی";
    prevButton.disabled = currentPage === 1;

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderSupportTable();
        }
    });

    supportPagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");

        button.className = "pagination-btn";
        button.textContent = toPersianNumber(i);

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPage = i;
            renderSupportTable();
        });

        supportPagination.appendChild(button);
    }

    const nextButton = document.createElement("button");
    nextButton.className = "pagination-btn";
    nextButton.textContent = "بعدی";
    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderSupportTable();
        }
    });

    supportPagination.appendChild(nextButton);
}

// رویداد جست‌وجو
supportSearch.addEventListener("input", () => {
    searchValue = supportSearch.value;
    currentPage = 1;
    renderSupportTable();
});

// تغییر تعداد ردیف‌ها
supportLimit.addEventListener("change", () => {
    rowsPerPage = Number(supportLimit.value);
    currentPage = 1;
    renderSupportTable();
});

// مرتب‌سازی با کلیک روی عنوان ستون‌ها
supportTable.querySelectorAll("thead th[data-sort]").forEach(th => {
    th.style.cursor = "pointer";

    th.addEventListener("click", () => {
        const column = th.dataset.sort;

        if (sortColumn === column) {
            sortDirection *= -1;
        } else {
            sortColumn = column;
            sortDirection = 1;
        }

        renderSupportTable();
    });
});

// اجرای اولیه
renderSupportTable();
