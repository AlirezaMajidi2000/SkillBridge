
let notifications = [
    {
        id: 1,
        title: "به‌روزرسانی قوانین سامانه",
        audience: "همه کاربران",
        channel: "داخل سامانه",
        date: "امروز",
        status: "success",
        statusText: "منتشرشده"
    },
    {
        id: 2,
        title: "فرصت‌های جدید حوزه فناوری",
        audience: "متخصصان فناوری",
        channel: "داخل سامانه و ایمیل",
        date: "دیروز",
        status: "pending",
        statusText: "زمان‌بندی‌شده"
    },
    {
        id: 3,
        title: "تکمیل اطلاعات شرکت",
        audience: "شرکت‌های تأییدنشده",
        channel: "داخل سامانه",
        date: "۲ روز پیش",
        status: "neutral",
        statusText: "پیش‌نویس"
    }
];

const notificationsSearch = document.getElementById("notificationsSearch");
const notificationsLimit = document.getElementById("notificationsLimit");
const notificationsTable = document.getElementById("notificationsTable");
const notificationsInfo = document.getElementById("notificationsInfo");
const notificationsPagination = document.getElementById("notificationsPagination");

let currentPage = 1;
let rowsPerPage = 5;
let searchValue = "";
let sortColumn = null;
let sortDirection = 1;

const notificationsCollator = new Intl.Collator("fa", {
    numeric: true,
    sensitivity: "base"
});

// تبدیل اعداد انگلیسی به فارسی
function toPersianNumber(value) {
    return String(value).replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

// جلوگیری از ورود HTML ناخواسته
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
function searchNotifications() {
    const value = searchValue.trim().toLowerCase();

    return notifications.filter(notification => {
        return Object.values(notification).some(item =>
            String(item).toLowerCase().includes(value)
        );
    });
}

// مرتب‌سازی
function sortNotifications(data) {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
        return notificationsCollator.compare(
            String(a[sortColumn]),
            String(b[sortColumn])
        ) * sortDirection;
    });
}

// نمایش جدول
function renderNotificationsTable() {
    const filteredNotifications = sortNotifications(searchNotifications());

    const totalNotifications = filteredNotifications.length;
    const totalPages = Math.ceil(totalNotifications / rowsPerPage);

    if (currentPage > totalPages) {
        currentPage = Math.max(1, totalPages);
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalNotifications);

    const currentNotifications = filteredNotifications.slice(
        startIndex,
        endIndex
    );

    notificationsTable.querySelector("tbody").innerHTML =
        currentNotifications.map(notification => `
            <tr>
                <td>${escapeHTML(notification.title)}</td>

                <td>${escapeHTML(notification.audience)}</td>

                <td>${escapeHTML(notification.channel)}</td>

                <td>${escapeHTML(notification.date)}</td>

                <td>
                    <span class="status ${escapeHTML(notification.status)}">
                        ${escapeHTML(notification.statusText)}
                    </span>
                </td>

                <td>
                    <div class="table-actions">
                        <button
                            class="action view"
                            data-action="view"
                            data-id="${notification.id}"
                            title="مشاهده"
                        >
                            <i class="fa-light fa-eye"></i>
                        </button>

                        <button
                            class="action edit"
                            data-action="edit"
                            data-id="${notification.id}"
                            title="ویرایش"
                        >
                            <i class="fa-light fa-pen-to-square"></i>
                        </button>

                        <button
                            class="action delete"
                            data-action="delete"
                            data-id="${notification.id}"
                            title="حذف"
                        >
                            <i class="fa-light fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");

    notificationsInfo.textContent = totalNotifications
        ? `نمایش ${toPersianNumber(startIndex + 1)} تا ${toPersianNumber(endIndex)} از ${toPersianNumber(totalNotifications)} مورد`
        : "موردی برای نمایش وجود ندارد";

    renderNotificationsPagination(totalPages);
}

// صفحه‌بندی
function renderNotificationsPagination(totalPages) {
    notificationsPagination.innerHTML = "";

    if (totalPages <= 1) return;

    const prevButton = document.createElement("button");
    prevButton.className = "pagination-btn";
    prevButton.textContent = "قبلی";
    prevButton.disabled = currentPage === 1;

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderNotificationsTable();
        }
    });

    notificationsPagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");

        button.className = "pagination-btn";
        button.textContent = toPersianNumber(i);

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPage = i;
            renderNotificationsTable();
        });

        notificationsPagination.appendChild(button);
    }

    const nextButton = document.createElement("button");
    nextButton.className = "pagination-btn";
    nextButton.textContent = "بعدی";
    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderNotificationsTable();
        }
    });

    notificationsPagination.appendChild(nextButton);
}

// جست‌وجو
notificationsSearch.addEventListener("input", () => {
    searchValue = notificationsSearch.value;
    currentPage = 1;
    renderNotificationsTable();
});

// تغییر تعداد نمایش
notificationsLimit.addEventListener("change", () => {
    rowsPerPage = Number(notificationsLimit.value);
    currentPage = 1;
    renderNotificationsTable();
});

// مرتب‌سازی ستون‌ها
notificationsTable.querySelectorAll("thead th[data-sort]").forEach(th => {
    th.style.cursor = "pointer";

    th.addEventListener("click", () => {
        const column = th.dataset.sort;

        if (sortColumn === column) {
            sortDirection *= -1;
        } else {
            sortColumn = column;
            sortDirection = 1;
        }

        renderNotificationsTable();
    });
});

// عملیات جدول
notificationsTable.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    const notification = notifications.find(item => item.id === id);

    if (!notification) return;

    if (action === "view") {
        alert(
            `عنوان: ${notification.title}\n` +
            `مخاطبان: ${notification.audience}\n` +
            `کانال: ${notification.channel}\n` +
            `تاریخ: ${notification.date}\n` +
            `وضعیت: ${notification.statusText}`
        );
    }

    if (action === "edit") {
        const newTitle = prompt("عنوان جدید اعلان را وارد کنید:", notification.title);

        if (newTitle === null || !newTitle.trim()) return;

        notification.title = newTitle.trim();

        renderNotificationsTable();
    }

    if (action === "delete") {
        const confirmDelete = confirm(
            `آیا از حذف اعلان «${notification.title}» مطمئن هستید؟`
        );

        if (!confirmDelete) return;

        notifications = notifications.filter(item => item.id !== id);

        renderNotificationsTable();
    }
});

// اجرای اولیه
renderNotificationsTable();
