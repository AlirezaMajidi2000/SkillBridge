const myChart = document.getElementById('myChart')
const myChart2 = document.getElementById('myChart2')

// نمودار ستونی ثبت نام ماهانه

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

// نمودار دایره ای ثبت نام ماهانه

new Chart (myChart2 , {
    type : "doughnut",
    data : {
        labels : ["متخصص ها" , "شرکت ها" , "سایر اعضا"],
        datasets : [{
            label : "تعداد ثبت نام های ماهانه",
            data : [12 , 20 , 22],
            backgroundColor: [
                'rgba(0, 82, 54, 0.9)',
                'rgba(107, 196, 166, 0.9)',
                'rgba(254, 152, 42, 0.9)'
            ],

            borderColor: [
                'rgb(0, 82, 54)',
                'rgb(107, 196, 166)',
                'rgb(254, 152, 42)'
            ],
            borderWidth: 2,
            yAxisID : "infoY"
        },
    ]
    },
})

// datatable 

document.addEventListener('DOMContentLoaded', function () {

    const table = document.querySelector('.datatable');

    if (!table) return;

    const tbody = table.querySelector('tbody');
    const headers = table.querySelectorAll('th[data-sort]');

    // داده‌های آزمایشی کاربران
    // بعداً این آرایه با اطلاعات API بک‌اند جایگزین می‌شود.
    let users = [
        {
            id: 1,
            name: 'نگار احمدی',
            description: 'طراح تجربه کاربری',
            avatar: 'ن',
            field: 'طراحی محصول',
            time: '۳ روز پیش',
            timeValue: 3,
            status: 'جدید',
            statusClass: 'info'
        },
        {
            id: 2,
            name: 'شرکت داده‌پردازان',
            description: 'حساب شرکتی',
            avatar: 'د',
            field: 'توسعه نرم‌افزار',
            time: 'امروز',
            timeValue: 0,
            status: 'در انتظار',
            statusClass: 'pending'
        },
        {
            id: 3,
            name: 'علی رضایی',
            description: 'توسعه‌دهنده فرانت‌اند',
            avatar: 'ع',
            field: 'برنامه‌نویسی',
            time: 'دیروز',
            timeValue: 1,
            status: 'تأییدشده',
            statusClass: 'success'
        },
        {
            id: 4,
            name: 'علی رضایی',
            description: 'توسعه‌دهنده فرانت‌اند',
            avatar: 'ع',
            field: 'برنامه‌نویسی',
            time: 'دیروز',
            timeValue: 1,
            status: 'تأییدشده',
            statusClass: 'success'
        },
        {
            id: 5,
            name: 'علی رضایی',
            description: 'توسعه‌دهنده فرانت‌اند',
            avatar: 'ع',
            field: 'برنامه‌نویسی',
            time: 'دیروز',
            timeValue: 1,
            status: 'تأییدشده',
            statusClass: 'success'
        },
        {
            id: 6,
            name: 'علی رضایی',
            description: 'توسعه‌دهنده فرانت‌اند',
            avatar: 'ع',
            field: 'برنامه‌نویسی',
            time: 'دیروز',
            timeValue: 1,
            status: 'تأییدشده',
            statusClass: 'success'
        }
    ];

    let currentPage = 1;
    let rowsPerPage = 5;
    let searchValue = '';
    let sortKey = '';
    let sortDirection = 'asc';

    const collator = new Intl.Collator('fa');

    // ساخت کنترل‌های جدول
    const controls = document.createElement('div');
    controls.className = 'datatable-controls';

    controls.innerHTML = `
        <input
            type="search"
            class="datatable-search"
            placeholder="جست‌وجوی کاربران..."
        >

        <select class="datatable-limit">
            <option value="5">۵ ردیف</option>
            <option value="10">۱۰ ردیف</option>
            <option value="25">۲۵ ردیف</option>
            <option value="50">۵۰ ردیف</option>
        </select>
    `;

    table.parentNode.insertBefore(controls, table);

    const footer = document.createElement('div');
    footer.className = 'datatable-footer';

    footer.innerHTML = `
        <span class="datatable-info"></span>
        <div class="datatable-pagination"></div>
    `;

    table.insertAdjacentElement('afterend', footer);

    const searchInput = controls.querySelector('.datatable-search');
    const limitSelect = controls.querySelector('.datatable-limit');
    const info = footer.querySelector('.datatable-info');
    const pagination = footer.querySelector('.datatable-pagination');

    // جلوگیری از ورود HTML ناخواسته در اطلاعات
    function escapeHTML(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[char]);
    }

    // فیلتر کردن کاربران
    function getFilteredUsers() {
        let result = users.filter(user => {
            const searchable = [
                user.name,
                user.description,
                user.field,
                user.time,
                user.status
            ].join(' ').toLowerCase();

            return searchable.includes(searchValue.toLowerCase());
        });

        // مرتب‌سازی
        if (sortKey) {
            result.sort((a, b) => {
                let first = a[sortKey];
                let second = b[sortKey];

                if (sortKey === 'time') {
                    first = a.timeValue;
                    second = b.timeValue;
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

    // نمایش ردیف‌های جدول
    function renderTable() {
        const filteredUsers = getFilteredUsers();

        const totalUsers = filteredUsers.length;
        const totalPages = Math.ceil(totalUsers / rowsPerPage);

        if (totalPages > 0 && currentPage > totalPages) {
            currentPage = totalPages;
        }

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        const visibleUsers = filteredUsers.slice(start, end);

        tbody.innerHTML = '';

        if (visibleUsers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5">کاربری پیدا نشد.</td>
                </tr>
            `;
        } else {
            visibleUsers.forEach(user => {
                tbody.insertAdjacentHTML('beforeend', `
                    <tr data-user-id="${escapeHTML(user.id)}">
                        <td>
                            <div class="person">
                                <span class="mini-avatar">
                                    ${escapeHTML(user.avatar)}
                                </span>
                                <span>
                                    <b>${escapeHTML(user.name)}</b>
                                    <small>${escapeHTML(user.description)}</small>
                                </span>
                            </div>
                        </td>

                        <td>${escapeHTML(user.field)}</td>

                        <td>${escapeHTML(user.time)}</td>

                        <td>
                            <select class="status-select" data-user-id="${escapeHTML(user.id)}">
                                <option value="new" ${user.statusClass === 'info' ? 'selected' : ''}>جدید</option>
                                <option value="pending" ${user.statusClass === 'pending' ? 'selected' : ''}>در انتظار</option>
                                <option value="success" ${user.statusClass === 'success' ? 'selected' : ''}>تأییدشده</option>
                                <option value="rejected" ${user.statusClass === 'rejected' ? 'selected' : ''}>ردشده</option>
                            </select>
                        </td>

                        <td>
                            <div class="actions">
                                <button class="action" type="button" data-action="view" title="نمایش">
                                    <i class="fa-light fa-eye"></i>
                                </button>

                                <button class="action" type="button" data-action="edit" title="ویرایش">
                                    <i class="fa-light fa-pen-to-square"></i>
                                </button>

                                <button class="action" type="button" data-action="delete" title="حذف">
                                    <i class="fa-light fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `);
            });
        }

        // اطلاعات تعداد رکوردها
        info.textContent = totalUsers === 0
            ? 'هیچ کاربری وجود ندارد'
            : `نمایش ${start + 1} تا ${Math.min(end, totalUsers)} از ${totalUsers} کاربر`;

        renderPagination(totalPages);
    }

    tbody.addEventListener('change', function (event) {

        if (!event.target.classList.contains('status-select')) return;

        const userId = Number(event.target.dataset.userId);
        const newStatus = event.target.value;

        const user = users.find(user => user.id === userId);

        if (!user) return;

        const statuses = {
            new: {
                status: 'جدید',
                statusClass: 'info'
            },
            pending: {
                status: 'در انتظار',
                statusClass: 'pending'
            },
            success: {
                status: 'تأییدشده',
                statusClass: 'success'
            },
            rejected: {
                status: 'ردشده',
                statusClass: 'rejected'
            }
        };

        user.status = statuses[newStatus].status;
        user.statusClass = statuses[newStatus].statusClass;

    });
    
    tbody.addEventListener('click', function (event) {

        const button = event.target.closest('[data-action]');

        if (!button) return;

        const row = button.closest('tr');
        const userId = Number(row.dataset.userId);

        const user = users.find(user => user.id === userId);

        if (!user) return;

        const action = button.dataset.action;

        // نمایش
        if (action === 'view') {
            alert(`نام: ${user.name}\nحوزه فعالیت: ${user.field}\nوضعیت: ${user.status}`);
        }

        // ویرایش
        if (action === 'edit') {
            const newName = prompt('نام جدید کاربر را وارد کنید:', user.name);

            if (newName === null || !newName.trim()) return;

            user.name = newName.trim();

            renderTable();
        }

        // حذف
        if (action === 'delete') {
            const confirmDelete = confirm(`آیا از حذف ${user.name} مطمئن هستید؟`);

            if (!confirmDelete) return;

            users = users.filter(item => item.id !== userId);

            renderTable();
        }

    });

    // ساخت صفحه‌بندی

    function toPersianNumber(number) {
        return String(number).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
    }

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

            if (active) button.classList.add('active');

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

    // مرتب‌سازی با کلیک روی عنوان ستون
    headers.forEach(header => {
        header.style.cursor = 'pointer';

        header.addEventListener('click', function () {
            const key = this.dataset.sort;

            if (sortKey === key) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortKey = key;
                sortDirection = 'asc';
            }

            currentPage = 1;
            renderTable();
        });
    });

    // نمایش اولیه
    renderTable();

    // امکان دسترسی به داده‌ها و به‌روزرسانی جدول
    window.adminDataTable = {
        setData(newUsers) {
            users = newUsers;
            currentPage = 1;
            renderTable();
        },

        addUser(user) {
            users.push(user);
            renderTable();
        },

        removeUser(id) {
            users = users.filter(user => user.id !== id);
            renderTable();
        },

        refresh() {
            renderTable();
        }
    };

});

// Recent Activities

document.addEventListener('DOMContentLoaded', function () {

    const activityList = document.querySelector('.activity-list');

    if (!activityList) return;

    // داده‌های آزمایشی فعالیت‌ها
    let activities = [
        {
            id: 1,
            title: 'ثبت‌نام شرکت جدید',
            description: 'شرکت نوآوران',
            time: '۱۰ دقیقه پیش'
        },
        {
            id: 2,
            title: 'ارسال درخواست همکاری',
            description: 'نگار احمدی',
            time: '۴۵ دقیقه پیش'
        },
        {
            id: 3,
            title: 'تأیید پروفایل متخصص',
            description: 'محمد کریمی',
            time: '۲ ساعت پیش'
        },
        {
            id: 4,
            title: 'ایجاد فرصت همکاری',
            description: 'گروه فناوری آتی',
            time: 'دیروز'
        }
    ];

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

    // نمایش فعالیت‌ها
    function renderActivities() {

        activityList.innerHTML = '';

        if (activities.length === 0) {
            activityList.innerHTML = `
                <p class="empty-activities">
                    هنوز فعالیتی ثبت نشده است.
                </p>
            `;
            return;
        }

        activities.forEach(activity => {

            activityList.insertAdjacentHTML('beforeend', `
                <div class="activity" data-activity-id="${escapeHTML(activity.id)}">
                    <i class="bullet"></i>

                    <div>
                        <b>${escapeHTML(activity.title)}</b>
                        <small>
                            ${escapeHTML(activity.description)}
                            · ${escapeHTML(activity.time)}
                        </small>
                    </div>
                </div>
            `);

        });
    }

    // نمایش اولیه
    renderActivities();

    // امکان مدیریت فعالیت‌ها
    window.recentActivities = {

        setData(newActivities) {
            activities = newActivities;
            renderActivities();
        },

        addActivity(activity) {
            activities.unshift(activity);
            renderActivities();
        },

        refresh() {
            renderActivities();
        }

    };

});