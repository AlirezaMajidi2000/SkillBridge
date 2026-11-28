
// Applications DataTable

document.addEventListener('DOMContentLoaded', function () {

    const table = document.querySelector('.applications-table');

    if (!table) return;

    const tbody = table.querySelector('tbody');
    const headers = table.querySelectorAll('th[data-sort]');

    // داده‌های آزمایشی درخواست‌ها
    let applications = [
        {
            id: 1,
            name: 'نگار احمدی',
            avatar: 'ن',
            code: 'AJ-1028',
            title: 'طراح رابط کاربری',
            company: 'راهکار گستران',
            date: '۱۴۰۵/۰۸/۲۹',
            dateValue: 14050829,
            status: 'جدید',
            statusClass: 'info'
        },
        {
            id: 2,
            name: 'علی رضایی',
            avatar: 'ع',
            code: 'AJ-1024',
            title: 'توسعه‌دهنده فرانت‌اند',
            company: 'داده‌پردازان',
            date: '۱۴۰۵/۰۸/۲۸',
            dateValue: 14050828,
            status: 'در حال بررسی',
            statusClass: 'pending'
        },
        {
            id: 3,
            name: 'سارا محمدی',
            avatar: 'س',
            code: 'AJ-1018',
            title: 'کارشناس بازاریابی',
            company: 'پیشگامان صنعت',
            date: '۱۴۰۵/۰۸/۲۶',
            dateValue: 14050826,
            status: 'پذیرفته‌شده',
            statusClass: 'success'
        },
        
    ];

    let currentPage = 1;
    let rowsPerPage = 5;
    let searchValue = '';
    let sortKey = '';
    let sortDirection = 'asc';

    const collator = new Intl.Collator('fa');

    const controls = table.closest('.card').querySelector('.datatable-controls');
    const footer = table.closest('.card').querySelector('.datatable-footer');

    const searchInput = controls.querySelector('.datatable-search');
    const limitSelect = controls.querySelector('.datatable-limit');
    const info = footer.querySelector('.datatable-info');
    const pagination = footer.querySelector('.datatable-pagination');

    // تبدیل اعداد انگلیسی به فارسی
    function toPersianNumber(number) {
        return String(number).replace(
            /\d/g,
            digit => '۰۱۲۳۴۵۶۷۸۹'[digit]
        );
    }

    // جلوگیری از ورود HTML ناخواسته
    function escapeHTML(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[char]);
    }

    // وضعیت‌های درخواست
    const statuses = {
        new: {
            status: 'جدید',
            statusClass: 'info'
        },
        reviewing: {
            status: 'در حال بررسی',
            statusClass: 'pending'
        },
        accepted: {
            status: 'پذیرفته‌شده',
            statusClass: 'success'
        },
        rejected: {
            status: 'ردشده',
            statusClass: 'rejected'
        }
    };

    // فیلتر و مرتب‌سازی
    function getFilteredApplications() {

        let result = applications.filter(application => {

            const searchable = [
                application.name,
                application.code,
                application.title,
                application.company,
                application.date,
                application.status
            ].join(' ').toLowerCase();

            return searchable.includes(searchValue.toLowerCase());

        });

        if (sortKey) {

            result.sort((a, b) => {

                let first = a[sortKey];
                let second = b[sortKey];

                if (sortKey === 'date') {
                    first = a.dateValue;
                    second = b.dateValue;

                    return sortDirection === 'asc'
                        ? first - second
                        : second - first;
                }

                const comparison = collator.compare(
                    String(first ?? ''),
                    String(second ?? '')
                );

                return sortDirection === 'asc'
                    ? comparison
                    : -comparison;

            });

        }

        return result;
    }

    // نمایش جدول
    function renderTable() {

        const filteredApplications = getFilteredApplications();

        const totalUsers = filteredApplications.length;
        const totalPages = Math.ceil(totalUsers / rowsPerPage);

        if (totalPages > 0 && currentPage > totalPages) {
            currentPage = totalPages;
        }

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        const visibleApplications = filteredApplications.slice(start, end);

        tbody.innerHTML = '';

        if (visibleApplications.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6">درخواستی پیدا نشد.</td>
                </tr>
            `;

        } else {

            visibleApplications.forEach(application => {

                tbody.insertAdjacentHTML('beforeend', `
                    <tr data-application-id="${escapeHTML(application.id)}">

                        <td>
                            <div class="person">
                                <span class="mini-avatar">
                                    ${escapeHTML(application.avatar)}
                                </span>

                                <span>
                                    <b>${escapeHTML(application.name)}</b>
                                    <small>شناسه: ${escapeHTML(application.code)}</small>
                                </span>
                            </div>
                        </td>

                        <td>${escapeHTML(application.title)}</td>

                        <td>${escapeHTML(application.company)}</td>

                        <td>${escapeHTML(application.date)}</td>

                        <td>
                            <select
                                class="status-select"
                                data-application-id="${escapeHTML(application.id)}"
                            >
                                <option value="new"
                                    ${application.statusClass === 'info' ? 'selected' : ''}>
                                    جدید
                                </option>

                                <option value="pending"
                                    ${application.statusClass === 'pending' ? 'selected' : ''}>
                                    در حال بررسی
                                </option>

                                <option value="success"
                                    ${application.statusClass === 'success' ? 'selected' : ''}>
                                    پذیرفته‌شده
                                </option>

                                <option value="rejected"
                                    ${application.statusClass === 'rejected' ? 'selected' : ''}>
                                    ردشده
                                </option>
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
                `);

            });

        }

        // اطلاعات تعداد درخواست‌ها
        info.textContent = totalUsers === 0
            ? 'هیچ درخواستی وجود ندارد'
            : `نمایش ${toPersianNumber(start + 1)} تا ${toPersianNumber(Math.min(end, totalUsers))} از ${toPersianNumber(totalUsers)} مورد`;

        renderPagination(totalPages);
    }

    // صفحه‌بندی
    function renderPagination(totalPages) {

        pagination.innerHTML = '';

        if (totalPages <= 1) return;

        function createButton(text, page, disabled = false, active = false) {

            const button = document.createElement('button');

            button.type = 'button';

            button.textContent = /^\d+$/.test(text)
                ? toPersianNumber(text)
                : text;

            button.classList.add('pagination-btn');

            if (active) button.classList.add('active');

            if (disabled) button.classList.add('disabled');

            button.disabled = disabled;

            button.addEventListener('click', () => {

                currentPage = page;
                renderTable();

            });

            pagination.appendChild(button);
        }

        createButton('قبلی', currentPage - 1, currentPage === 1);

        for (let page = 1; page <= totalPages; page++) {

            createButton(
                String(page),
                page,
                false,
                page === currentPage
            );

        }

        createButton(
            'بعدی',
            currentPage + 1,
            currentPage === totalPages
        );
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

    // مرتب‌سازی
    headers.forEach(header => {

        header.style.cursor = 'pointer';

        header.addEventListener('click', function () {

            const key = this.dataset.sort;

            if (sortKey === key) {

                sortDirection = sortDirection === 'asc'
                    ? 'desc'
                    : 'asc';

            } else {

                sortKey = key;
                sortDirection = 'asc';

            }

            currentPage = 1;

            renderTable();

        });

    });

    // تغییر وضعیت درخواست
    tbody.addEventListener('change', function (event) {

        if (!event.target.classList.contains('status-select')) return;

        const applicationId = Number(event.target.dataset.applicationId);

        const newStatus = event.target.value;

        const application = applications.find(
            item => item.id === applicationId
        );

        if (!application || !statuses[newStatus]) return;

        application.status = statuses[newStatus].status;

        application.statusClass = statuses[newStatus].statusClass;

    });

    // عملیات جدول
    tbody.addEventListener('click', function (event) {

        const button = event.target.closest('[data-action]');

        if (!button) return;

        const row = button.closest('tr');

        const applicationId = Number(row.dataset.applicationId);

        const application = applications.find(
            item => item.id === applicationId
        );

        if (!application) return;

        const action = button.dataset.action;

        // نمایش
        if (action === 'view') {

            alert(
                `متخصص: ${application.name}\n` +
                `شناسه: ${application.code}\n` +
                `عنوان فرصت: ${application.title}\n` +
                `شرکت: ${application.company}\n` +
                `تاریخ ارسال: ${application.date}\n` +
                `وضعیت: ${application.status}`
            );

        }

        // ویرایش
        if (action === 'edit') {

            const newTitle = prompt(
                'عنوان فرصت را ویرایش کنید:',
                application.title
            );

            if (newTitle === null || !newTitle.trim()) return;

            application.title = newTitle.trim();

            renderTable();

        }

        // حذف
        if (action === 'delete') {

            const confirmDelete = confirm(
                `آیا از حذف درخواست ${application.name} مطمئن هستید؟`
            );

            if (!confirmDelete) return;

            applications = applications.filter(
                item => item.id !== applicationId
            );

            renderTable();

        }

    });

    // نمایش اولیه
    renderTable();

    // مدیریت اطلاعات جدول
    window.adminApplicationsTable = {

        setData(newApplications) {
            applications = newApplications;
            currentPage = 1;
            renderTable();
        },

        addApplication(application) {
            applications.unshift(application);
            renderTable();
        },

        removeApplication(id) {
            applications = applications.filter(
                item => item.id !== id
            );
            renderTable();
        },

        refresh() {
            renderTable();
        }

    };

});
