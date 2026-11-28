
document.addEventListener('DOMContentLoaded', function () {

    const table = document.querySelector('.companies-table');

    if (!table) return;

    const tbody = table.querySelector('tbody');
    const headers = table.querySelectorAll('th[data-sort]');

    const card = table.closest('.card');

    const searchInput = card.querySelector('.datatable-search');
    const limitSelect = card.querySelector('.datatable-limit');
    const info = card.querySelector('.datatable-info');
    const pagination = card.querySelector('.datatable-pagination');

    // داده‌های آزمایشی شرکت‌ها
    
    let companies = [
        {
            id: 1,
            name: 'داده‌پردازان نوین',
            email: 'info@datapardaz.ir',
            avatar: 'د',
            field: 'فناوری اطلاعات',
            representative: 'مهدی صادقی',
            date: '۱۴۰۵/۰۸/۲۸',
            dateValue: 28,
            status: 'pending'
        },
        {
            id: 2,
            name: 'پیشگامان صنعت',
            email: 'contact@pishgam.ir',
            avatar: 'پ',
            field: 'صنعت و تولید',
            representative: 'سارا نوری',
            date: '۱۴۰۵/۰۸/۲۶',
            dateValue: 26,
            status: 'success'
        },
        {
            id: 3,
            name: 'راهکار گستران',
            email: 'hello@rahkar.ir',
            avatar: 'ر',
            field: 'مشاوره',
            representative: 'علی مرادی',
            date: '۱۴۰۵/۰۸/۲۲',
            dateValue: 22,
            status: 'success'
        },
        {
            id: 4,
            name: 'نوآوران دیجیتال',
            email: 'info@noavaran.ir',
            avatar: 'ن',
            field: 'فناوری اطلاعات',
            representative: 'رضا کریمی',
            date: '۱۴۰۵/۰۸/۲۰',
            dateValue: 20,
            status: 'new'
        },
        {
            id: 5,
            name: 'توسعه صنعت آریا',
            email: 'info@arya.ir',
            avatar: 'ت',
            field: 'صنعت و تولید',
            representative: 'مریم احمدی',
            date: '۱۴۰۵/۰۸/۱۸',
            dateValue: 18,
            status: 'rejected'
        },
        {
            id: 6,
            name: 'فناوران هوشمند',
            email: 'contact@fanavaran.ir',
            avatar: 'ف',
            field: 'هوش مصنوعی',
            representative: 'محمد رضایی',
            date: '۱۴۰۵/۰۸/۱۵',
            dateValue: 15,
            status: 'pending'
        },
        {
            id: 7,
            name: 'گسترش تجارت پارس',
            email: 'info@pars.ir',
            avatar: 'گ',
            field: 'بازرگانی',
            representative: 'نگار محمدی',
            date: '۱۴۰۵/۰۸/۱۲',
            dateValue: 12,
            status: 'new'
        },
        {
            id: 8,
            name: 'پردازشگران شرق',
            email: 'info@shargh.ir',
            avatar: 'پ',
            field: 'فناوری اطلاعات',
            representative: 'امیر حسینی',
            date: '۱۴۰۵/۰۸/۱۰',
            dateValue: 10,
            status: 'success'
        }
    ];


    
    const statuses = {
        new: {
            text: 'جدید',
            class: 'new'
        },
        pending: {
            text: 'در انتظار بررسی',
            class: 'pending'
        },
        success: {
            text: 'تأییدشده',
            class: 'success'
        },
        rejected: {
            text: 'ردشده',
            class: 'rejected'
        }
    };


    let currentPage = 1;
    let rowsPerPage = 5;
    let searchValue = '';
    let sortKey = '';
    let sortDirection = 'asc';

    const persianCollator = new Intl.Collator('fa');

    // تبدیل اعداد انگلیسی به فارسی
    function toPersianNumber(number) {
        return String(number).replace(
            /\d/g,
            digit => '۰۱۲۳۴۵۶۷۸۹'[digit]
        );
    }

    // جلوگیری از ورود HTML ناخواسته
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[char]);
    }

    // فیلتر و مرتب‌سازی شرکت‌ها
    function getFilteredCompanies() {

        let result = companies.filter(company => {

            const searchableText = [
                company.name,
                company.email,
                company.field,
                company.representative,
                company.date,
                statuses[company.status].text
            ].join(' ').toLowerCase();

            return searchableText.includes(searchValue.toLowerCase());
        });

        if (sortKey) {

            result.sort((a, b) => {

                let valueA = a[sortKey];
                let valueB = b[sortKey];

                if (sortKey === 'date') {
                    valueA = a.dateValue;
                    valueB = b.dateValue;

                    return sortDirection === 'asc'
                        ? valueA - valueB
                        : valueB - valueA;
                }

                if (sortKey === 'status') {
                    valueA = statuses[a.status].text;
                    valueB = statuses[b.status].text;
                }

                const comparison = persianCollator.compare(
                    String(valueA),
                    String(valueB)
                );

                return sortDirection === 'asc'
                    ? comparison
                    : -comparison;
            });
        }

        return result;
    }

    // نمایش اطلاعات در جدول
    function renderTable() {

        const filteredCompanies = getFilteredCompanies();

        const totalCompanies = filteredCompanies.length;
        const totalPages = Math.ceil(totalCompanies / rowsPerPage);

        if (totalPages === 0) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const startIndex = (currentPage - 1) * rowsPerPage;

        const currentCompanies = filteredCompanies.slice(
            startIndex,
            startIndex + rowsPerPage
        );

        if (currentCompanies.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-message">
                        شرکتی پیدا نشد.
                    </td>
                </tr>
            `;

        } else {

            tbody.innerHTML = currentCompanies.map(company => {

                const status = statuses[company.status];

                return `
                    <tr data-company-id="${company.id}">

                        <td>
                            <div class="person">
                                <span class="mini-avatar">
                                    ${escapeHTML(company.avatar)}
                                </span>

                                <span>
                                    <b>${escapeHTML(company.name)}</b>
                                    <small>${escapeHTML(company.email)}</small>
                                </span>
                            </div>
                        </td>

                        <td>${escapeHTML(company.field)}</td>

                        <td>${escapeHTML(company.representative)}</td>

                        <td>${escapeHTML(company.date)}</td>

                        <td>
                            <select
                                class="status-select"
                                data-company-id="${company.id}"
                            >
                                ${Object.entries(statuses).map(([key, value]) => `
                                    <option
                                        value="${key}"
                                        ${company.status === key ? 'selected' : ''}
                                    >
                                        ${value.text}
                                    </option>
                                `).join('')}
                            </select>
                        </td>

                        <td>
                            <div class="actions">

                                <button
                                    class="action"
                                    type="button"
                                    data-action="view"
                                    title="نمایش"
                                >
                                    <i class="fa-light fa-eye"></i>
                                </button>

                                <button
                                    class="action"
                                    type="button"
                                    data-action="edit"
                                    title="ویرایش"
                                >
                                    <i class="fa-light fa-pen-to-square"></i>
                                </button>

                                <button
                                    class="action"
                                    type="button"
                                    data-action="delete"
                                    title="حذف"
                                >
                                    <i class="fa-light fa-trash-can"></i>
                                </button>

                            </div>
                        </td>

                    </tr>
                `;

            }).join('');
        }

        const firstItem = totalCompanies === 0 ? 0 : startIndex + 1;
        const lastItem = Math.min(startIndex + rowsPerPage, totalCompanies);

        info.textContent =
            `نمایش ${toPersianNumber(firstItem)} تا ${toPersianNumber(lastItem)} از ${toPersianNumber(totalCompanies)} شرکت`;

        renderPagination(totalPages);
    }

    // ساخت صفحه‌بندی
    function renderPagination(totalPages) {

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let buttons = `
            <button
                class="pagination-btn"
                data-page="${currentPage - 1}"
                ${currentPage === 1 ? 'disabled' : ''}
            >
                قبلی
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {

            buttons += `
                <button
                    class="pagination-btn ${currentPage === i ? 'active' : ''}"
                    data-page="${i}"
                >
                    ${toPersianNumber(i)}
                </button>
            `;
        }

        buttons += `
            <button
                class="pagination-btn"
                data-page="${currentPage + 1}"
                ${currentPage === totalPages ? 'disabled' : ''}
            >
                بعدی
            </button>
        `;

        pagination.innerHTML = buttons;
    }

    // جست‌وجو
    searchInput.addEventListener('input', function () {

        searchValue = this.value.trim();
        currentPage = 1;

        renderTable();
    });

    // تغییر تعداد ردیف‌ها
    limitSelect.addEventListener('change', function () {

        rowsPerPage = Number(this.value);
        currentPage = 1;

        renderTable();
    });

    // کلیک روی صفحه‌بندی
    pagination.addEventListener('click', function (event) {

        const button = event.target.closest('[data-page]');

        if (!button || button.disabled) return;

        currentPage = Number(button.dataset.page);

        renderTable();
    });

    // مرتب‌سازی ستون‌ها
    headers.forEach(header => {

        header.addEventListener('click', function () {

            const key = this.dataset.sort;

            if (sortKey === key) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortKey = key;
                sortDirection = 'asc';
            }

            renderTable();
        });
    });

    // تغییر وضعیت شرکت
    tbody.addEventListener('change', function (event) {

        const select = event.target.closest('.status-select');

        if (!select) return;

        const companyId = Number(select.dataset.companyId);

        const company = companies.find(
            item => item.id === companyId
        );

        if (!company) return;

        company.status = select.value;
    });

    // عملیات نمایش، ویرایش و حذف
    tbody.addEventListener('click', function (event) {

        const button = event.target.closest('[data-action]');

        if (!button) return;

        const row = button.closest('tr');

        const companyId = Number(row.dataset.companyId);

        const company = companies.find(
            item => item.id === companyId
        );

        if (!company) return;

        const action = button.dataset.action;

        // نمایش
        if (action === 'view') {

            alert(
                `نام شرکت: ${company.name}\n` +
                `ایمیل: ${company.email}\n` +
                `حوزه فعالیت: ${company.field}\n` +
                `نماینده: ${company.representative}\n` +
                `تاریخ ثبت: ${company.date}\n` +
                `وضعیت: ${statuses[company.status].text}`
            );
        }

        // ویرایش
        if (action === 'edit') {

            const newName = prompt(
                'نام جدید شرکت را وارد کنید:',
                company.name
            );

            if (newName === null || !newName.trim()) return;

            company.name = newName.trim();

            renderTable();
        }

        // حذف
        if (action === 'delete') {

            const confirmed = confirm(
                `آیا از حذف شرکت «${company.name}» مطمئن هستید؟`
            );

            if (!confirmed) return;

            companies = companies.filter(
                item => item.id !== companyId
            );

            renderTable();
        }
    });

    // دسترسی به اطلاعات جدول از بیرون
    window.adminCompaniesTable = {

        setData(data) {
            companies = data;
            currentPage = 1;
            renderTable();
        },

        addCompany(company) {
            companies.unshift(company);
            renderTable();
        },

        removeCompany(id) {
            companies = companies.filter(
                company => company.id !== id
            );

            renderTable();
        },

        refresh() {
            renderTable();
        }
    };

    // اجرای اولیه
    renderTable();

});
