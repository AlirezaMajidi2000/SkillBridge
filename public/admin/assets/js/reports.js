const myChart = document.getElementById('myChart')

new Chart (myChart , {
    type : "bar",
    data : {
        labels : ["فروردین" , "اردیبهشت" , "خرداد" , "تیر" , "مرداد" , "شهریور" , "مهر" , "آبان" , "آذر" , "دی" , "بهمن" , "اسفند"],
        datasets : [{
            label : "تعداد ثبت نام های ماهانه",
            data : [12 , 20 , 22 , 14 , 32 , 12 , 12 , 20 , 22 , 14 , 32 , 12],
            backgroundColor: [
                'rgba(32, 104, 108, 0.2)',   // January
                'rgba(0, 82, 54, 0.2)',       // February
                'rgba(107, 196, 166, 0.2)',  // March
                'rgba(254, 152, 42, 0.2)',   // April
                'rgba(188, 79, 7, 0.2)',     // May
                'rgba(44, 137, 121, 0.2)',   // June
                'rgba(77, 156, 143, 0.2)',   // July
                'rgba(153, 196, 174, 0.2)',  // August
                'rgba(230, 126, 55, 0.2)',   // September
                'rgba(87, 119, 103, 0.2)',   // October
                'rgba(174, 112, 65, 0.2)',   // November
                'rgba(22, 91, 95, 0.2)'     // December
            ],

            borderColor: [
                'rgb(32, 104, 108)',
                'rgb(0, 82, 54)',
                'rgb(107, 196, 166)',
                'rgb(254, 152, 42)',
                'rgb(188, 79, 7)',
                'rgb(44, 137, 121)',
                'rgb(77, 156, 143)',
                'rgb(153, 196, 174)',
                'rgb(230, 126, 55)',
                'rgb(87, 119, 103)',
                'rgb(174, 112, 65)',
                'rgb(22, 91, 95)'
            ],
            borderWidth: 2,
            yAxisID : "infoY"
        },
    ]
    },
    options :{
        scales :{
            infoY : {
                position : "left"
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
})

////////////////////////////////////////////////

// اطلاعات گزارش‌ها
let reports = [
    {
        id: 1,
        title: "گزارش ثبت‌نام متخصصان",
        period: "ماه جاری",
        updated: "امروز",
        format: "Excel / PDF"
    },
    {
        id: 2,
        title: "گزارش عملکرد شرکت‌ها",
        period: "سه ماه اخیر",
        updated: "دیروز",
        format: "Excel / PDF"
    },
    {
        id: 3,
        title: "گزارش درخواست‌های همکاری",
        period: "ماه جاری",
        updated: "امروز",
        format: "Excel / PDF"
    }
];


// عناصر جدول
const reportsTable = document.getElementById("reportsTable");
const reportsBody = reportsTable.querySelector("tbody");
const reportsSearch = document.getElementById("reportsSearch");
const reportsLimit = document.getElementById("reportsLimit");
const reportsInfo = document.getElementById("reportsInfo");
const reportsPagination = document.getElementById("reportsPagination");


// وضعیت جدول
let currentPage = 1;
let rowsPerPage = 5;
let filteredReports = [...reports];

let sortColumn = "";
let sortDirection = 1;


// تبدیل اعداد به فارسی
function toPersianNumber(number) {
    return number.toLocaleString("fa-IR");
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


// نمایش اطلاعات جدول
function renderReports() {

    const totalReports = filteredReports.length;
    const totalPages = Math.ceil(totalReports / rowsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalReports);

    const currentReports = filteredReports.slice(startIndex, endIndex);

    reportsBody.innerHTML = "";

    if (currentReports.length === 0) {
        reportsBody.innerHTML = `
            <tr>
                <td colspan="5">گزارشی یافت نشد.</td>
            </tr>
        `;
    } else {

        currentReports.forEach(report => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${escapeHTML(report.title)}</td>
                <td>${escapeHTML(report.period)}</td>
                <td>${escapeHTML(report.updated)}</td>
                <td>${escapeHTML(report.format)}</td>

                <td>
                    <div class="table-actions">
                        <button class="action view"
                            data-id="${report.id}"
                            title="دریافت گزارش">
                            <i class="fa-light fa-download"></i>
                        </button>
                    </div>
                </td>
            `;

            reportsBody.appendChild(row);
        });
    }

    // اطلاعات تعداد ردیف‌ها
    reportsInfo.textContent = totalReports === 0
        ? "هیچ گزارشی برای نمایش وجود ندارد"
        : `نمایش ${toPersianNumber(startIndex + 1)} تا ${toPersianNumber(endIndex)} از ${toPersianNumber(totalReports)} مورد`;

    renderReportsPagination(totalPages);
}


// صفحه‌بندی
function renderReportsPagination(totalPages) {

    reportsPagination.innerHTML = "";

    if (totalPages <= 1) return;

    const prevButton = document.createElement("button");
    prevButton.className = "pagination-btn";
    prevButton.textContent = "قبلی";
    prevButton.disabled = currentPage === 1;

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderReports();
        }
    });

    reportsPagination.appendChild(prevButton);


    for (let i = 1; i <= totalPages; i++) {

        const pageButton = document.createElement("button");

        pageButton.className = "pagination-btn";
        pageButton.textContent = toPersianNumber(i);

        if (i === currentPage) {
            pageButton.classList.add("active");
        }

        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderReports();
        });

        reportsPagination.appendChild(pageButton);
    }


    const nextButton = document.createElement("button");
    nextButton.className = "pagination-btn";
    nextButton.textContent = "بعدی";
    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderReports();
        }
    });

    reportsPagination.appendChild(nextButton);
}


// جست‌وجو
reportsSearch.addEventListener("input", function () {

    const searchValue = this.value.trim().toLowerCase();

    filteredReports = reports.filter(report =>
        Object.values(report).some(value =>
            String(value).toLowerCase().includes(searchValue)
        )
    );

    currentPage = 1;
    renderReports();
});


// تغییر تعداد ردیف‌ها
reportsLimit.addEventListener("change", function () {

    rowsPerPage = Number(this.value);
    currentPage = 1;

    renderReports();
});


// مرتب‌سازی ستون‌ها
reportsTable.querySelectorAll("th[data-sort]").forEach(header => {

    header.addEventListener("click", function () {

        const column = this.dataset.sort;

        if (sortColumn === column) {
            sortDirection *= -1;
        } else {
            sortColumn = column;
            sortDirection = 1;
        }

        filteredReports.sort((a, b) => {

            return String(a[column]).localeCompare(
                String(b[column]),
                "fa"
            ) * sortDirection;

        });

        currentPage = 1;
        renderReports();
    });
});


// عملیات دریافت گزارش
reportsBody.addEventListener("click", function (event) {

    const downloadButton = event.target.closest(".action.view");

    if (!downloadButton) return;

    const reportId = Number(downloadButton.dataset.id);

    const selectedReport = reports.find(report => report.id === reportId);

    if (!selectedReport) return;

    alert(`دریافت فایل «${selectedReport.title}» هنوز به سیستم دانلود متصل نشده است.`);
});


// اجرای اولیه جدول
renderReports();