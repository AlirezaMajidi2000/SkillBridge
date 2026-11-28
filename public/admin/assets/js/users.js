
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. DOM Elements
    // ============================================

    const table = document.querySelector('.users-table');

    if (!table) return;

    const tbody = table.querySelector('tbody');
    const headers = table.querySelectorAll('th[data-sort]');
    const card = table.closest('.card');

    const searchInput = card?.querySelector('.datatable-search');
    const limitSelect = card?.querySelector('.datatable-limit');
    const info = card?.querySelector('.datatable-info');
    const pagination = card?.querySelector('.datatable-pagination');

    const userFilter = document.querySelector('#userTypeFilter');
    const addUserBtn = document.querySelector('#addUserBtn');

    const showModal = document.querySelector('.show_modal');
    const editModal = document.querySelector('.edit_modal');
    const deleteModal = document.querySelector('.delete_modal');

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

    if (!tbody || !searchInput || !limitSelect || !info || !pagination) {
        console.error('عناصر اصلی جدول کاربران پیدا نشدند.');
        return;
    }


    // ============================================
    // 2. Users Data
    // ============================================

    let users = Array.isArray(window.usersData)
        ? window.usersData
        : [];


    // ============================================
    // 3. Roles & Statuses
    // ============================================

    const roleNames = {
        Specialist: 'متخصص',
        CompanyAdmin: 'شرکت',
        Admin: 'مدیر'
    };

    const statuses = {
        new: {
            text: 'جدید',
            class: 'new'
        },

        pending: {
            text: 'در انتظار',
            class: 'pending'
        },

        success: {
            text: 'تأیید شده',
            class: 'success'
        },

        rejected: {
            text: 'نیازمند اصلاح',
            class: 'rejected'
        }
    };


    // ============================================
    // 4. Table States
    // ============================================

    let currentPage = 1;
    let rowsPerPage = Number(limitSelect.value) || 5;

    let searchValue = '';
    let selectedRole = 'all';

    let sortKey = '';
    let sortDirection = 'asc';

    const persianCollator = new Intl.Collator('fa');


    // ============================================
    // 5. Helper Functions
    // ============================================

    function toPersianNumber(number) {

        return String(number).replace(
            /\d/g,
            digit => '۰۱۲۳۴۵۶۷۸۹'[digit]
        );

    }


    function escapeHTML(value) {

        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[char]);

    }


    function getAvatar(name) {

        return String(name || '').trim().charAt(0) || '؟';

    }


    function getUserStatus(user) {

        return statuses[user.status] || statuses.success;

    }


    function normalizeUser(user) {

        return {
            ...user,
            id: user.id,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim(),
            phone: user.phone || '',
            email: user.email || '',
            // username: user.username || user.email || '',
            role: user.role || '',
            date: user.date || '',
            dateValue: user.dateValue || 0,
            status: statuses[user.status] ? user.status : 'success'
        };

    }


    function getCsrfToken() {

        if (!csrfToken) {
            throw new Error('توکن امنیتی CSRF در صفحه پیدا نشد.');
        }

        return csrfToken;

    }


    async function sendRequest(url, method, body = null) {

        const options = {
            method: method,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {

            let message = data.message || 'عملیات با خطا مواجه شد.';

            if (data.errors) {

                message = Object.values(data.errors)
                    .flat()
                    .join('\n');

            }

            throw new Error(message);

        }

        return data;

    }


    function resetTableFilters() {

        selectedRole = 'all';
        searchValue = '';
        currentPage = 1;

        if (userFilter) {
            userFilter.value = 'all';
        }

        searchInput.value = '';

    }


    function isDuplicateEmail(email, userId = null) {

        return users.some(item => {

            return item.email.toLowerCase() === email.toLowerCase()
                && String(item.id) !== String(userId);

        });

    }


    function isDuplicatePhone(phone, userId = null) {

        return users.some(item => {

            return item.phone === phone
                && String(item.id) !== String(userId);

        });

    }


    // ============================================
    // 6. Filtering & Sorting
    // ============================================

    function getFilteredUsers() {

        let result = users.filter(user => {

            const roleMatch =
                selectedRole === 'all' ||
                user.role === selectedRole;

            const status = getUserStatus(user);

            const searchableText = [
                user.name,
                // user.username,
                user.email,
                user.phone,
                roleNames[user.role],
                user.date,
                status.text
            ].join(' ').toLowerCase();

            const searchMatch = searchableText.includes(
                searchValue.toLowerCase()
            );

            return roleMatch && searchMatch;

        });


        if (sortKey) {

            result.sort((a, b) => {

                let valueA = a[sortKey];
                let valueB = b[sortKey];

                if (sortKey === 'date') {

                    valueA = a.dateValue || 0;
                    valueB = b.dateValue || 0;

                    return sortDirection === 'asc'
                        ? valueA - valueB
                        : valueB - valueA;

                }


                if (sortKey === 'role') {

                    valueA = roleNames[a.role] || '';
                    valueB = roleNames[b.role] || '';

                }


                if (sortKey === 'status') {

                    valueA = getUserStatus(a).text;
                    valueB = getUserStatus(b).text;

                }


                const comparison = persianCollator.compare(
                    String(valueA ?? ''),
                    String(valueB ?? '')
                );

                return sortDirection === 'asc'
                    ? comparison
                    : -comparison;

            });

        }

        return result;

    }


    // ============================================
    // 7. Render Table
    // ============================================

    function renderTable() {

        const filteredUsers = getFilteredUsers();

        const totalUsers = filteredUsers.length;

        const totalPages = Math.ceil(totalUsers / rowsPerPage);

        if (totalPages === 0) {

            currentPage = 1;

        } else if (currentPage > totalPages) {

            currentPage = totalPages;

        }


        const startIndex = (currentPage - 1) * rowsPerPage;

        const currentUsers = filteredUsers.slice(
            startIndex,
            startIndex + rowsPerPage
        );


        if (currentUsers.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-message">
                        کاربری پیدا نشد.
                    </td>
                </tr>
            `;

        } else {

            tbody.innerHTML = currentUsers.map((user, index) => {

                const status = getUserStatus(user);

                return `

                    <tr data-user-id="${escapeHTML(user.id)}">

                        <td>
                            ${toPersianNumber(startIndex + index + 1)}
                        </td>

                        <td>
                            <div class="person">

                                <span class="mini-avatar">
                                    ${escapeHTML(getAvatar(user.name))}
                                </span>

                                <span>
                                    <b>${escapeHTML(user.name)}</b>
                                </span>

                            </div>
                        </td>

                        <td>
                            ${escapeHTML(user.username)}
                        </td>

                        <td>
                            ${escapeHTML(roleNames[user.role] || 'نامشخص')}
                        </td>

                        <td>
                            ${escapeHTML(user.date)}
                        </td>

                        <td>

                            <select
                                class="status-select"
                                data-user-id="${escapeHTML(user.id)}"
                            >

                                ${Object.entries(statuses).map(([key, value]) => `

                                    <option
                                        value="${key}"
                                        ${user.status === key ? 'selected' : ''}
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


        const firstItem = totalUsers === 0
            ? 0
            : startIndex + 1;

        const lastItem = Math.min(
            startIndex + rowsPerPage,
            totalUsers
        );

        info.textContent =
            `نمایش ${toPersianNumber(firstItem)} تا ` +
            `${toPersianNumber(lastItem)} از ` +
            `${toPersianNumber(totalUsers)} کاربر`;

        renderPagination(totalPages);

    }


    // ============================================
    // 8. Pagination
    // ============================================

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


    // ============================================
    // 9. Search
    // ============================================

    searchInput.addEventListener('input', function () {

        searchValue = this.value.trim();

        currentPage = 1;

        renderTable();

    });


    // ============================================
    // 10. User Type Filter
    // ============================================

    if (userFilter) {

        userFilter.addEventListener('change', function () {

            selectedRole = this.value;

            currentPage = 1;

            renderTable();

        });

    }


    // ============================================
    // 11. Rows Limit
    // ============================================

    limitSelect.addEventListener('change', function () {

        rowsPerPage = Number(this.value) || 5;

        currentPage = 1;

        renderTable();

    });


    // ============================================
    // 12. Pagination Click
    // ============================================

    pagination.addEventListener('click', function (event) {

        const button = event.target.closest('[data-page]');

        if (!button || button.disabled) return;

        currentPage = Number(button.dataset.page);

        renderTable();

    });


    // ============================================
    // 13. Sorting
    // ============================================

    headers.forEach(header => {

        header.addEventListener('click', function () {

            const key = this.dataset.sort;

            if (sortKey === key) {

                sortDirection =
                    sortDirection === 'asc' ? 'desc' : 'asc';

            } else {

                sortKey = key;

                sortDirection = 'asc';

            }

            renderTable();

        });

    });


    // ============================================
    // 14. Change User Status
    // ============================================

    tbody.addEventListener('change', function (event) {

        const select = event.target.closest('.status-select');

        if (!select) return;

        const user = users.find(
            item => String(item.id) === String(select.dataset.userId)
        );

        if (!user) return;

        // فعلاً فقط در آرایه جاوااسکریپت تغییر می‌کند.
        // برای ذخیره وضعیت در دیتابیس باید Route و Controller جداگانه اضافه شود.

        user.status = select.value;

    });


    // ============================================
    // 15. Modal Helpers
    // ============================================

    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove('show');

        modal.innerHTML = '';

    }


    function closeAllModals() {

        [showModal, editModal, deleteModal].forEach(modal => {
            closeModal(modal);
        });

    }


    // ============================================
    // 16. View User
    // ============================================

    function openViewModal(user) {

        if (!showModal) return;

        const status = getUserStatus(user);

        showModal.classList.add('show');

        showModal.innerHTML = `

            <div class="view-modal-content">

                <div class="modal-header">

                    <h3>اطلاعات کاربر</h3>

                    <button
                        class="modal-close"
                        type="button"
                        aria-label="بستن"
                    >
                        <i class="fa-light fa-xmark"></i>
                    </button>

                </div>

                <div class="modal-body">

                    <div class="modal-item">
                        <span class="modal-label">نام</span>
                        <span class="modal-value">
                            ${escapeHTML(user.name)}
                        </span>
                    </div>

                    <div class="modal-item">
                        <span class="modal-label">شماره موبایل</span>
                        <span class="modal-value">
                            ${escapeHTML(user.phone || 'ثبت نشده')}
                        </span>
                    </div>

                    <div class="modal-item">
                        <span class="modal-label">ایمیل</span>
                        <span class="modal-value">
                            ${escapeHTML(user.email || 'ثبت نشده')}
                        </span>
                    </div>

                    <div class="modal-item">
                        <span class="modal-label">نقش</span>
                        <span class="modal-value">
                            ${escapeHTML(roleNames[user.role] || 'نامشخص')}
                        </span>
                    </div>

                    <div class="modal-item">
                        <span class="modal-label">تاریخ عضویت</span>
                        <span class="modal-value">
                            ${escapeHTML(user.date)}
                        </span>
                    </div>

                    <div class="modal-item">
                        <span class="modal-label">وضعیت</span>
                        <span class="modal-value">
                            ${escapeHTML(status.text)}
                        </span>
                    </div>

                </div>

            </div>

        `;


        showModal.querySelector('.modal-close')
            .addEventListener('click', function () {

                closeModal(showModal);

            });

    }


    // ============================================
    // 17. Add / Edit User Modal
    // ============================================

    function openUserForm(user = null) {

        if (!editModal) return;

        const isEdit = user !== null;

        const modalTitle = isEdit
            ? 'ویرایش اطلاعات کاربر'
            : 'افزودن کاربر جدید';


        editModal.classList.add('show');

        editModal.innerHTML = `

            <div class="edit-modal-content">

                <div class="edit-modal-header">

                    <h3>${modalTitle}</h3>

                    <button
                        type="button"
                        class="edit-modal-close"
                        aria-label="بستن"
                    >
                        <i class="fa-light fa-xmark"></i>
                    </button>

                </div>


                <form class="edit-modal-form">

                    <div class="edit-form-group">

                        <label for="editFirstName">نام</label>

                        <input
                            type="text"
                            id="editFirstName"
                            value="${escapeHTML(user?.first_name || '')}"
                            placeholder="نام را وارد کنید"
                            required
                        >

                    </div>


                    <div class="edit-form-group">

                        <label for="editLastName">نام خانوادگی</label>

                        <input
                            type="text"
                            id="editLastName"
                            value="${escapeHTML(user?.last_name || '')}"
                            placeholder="نام خانوادگی را وارد کنید"
                            required
                        >

                    </div>


                    <div class="edit-form-group">

                        <label for="editPhone">شماره موبایل</label>

                        <input
                            type="tel"
                            id="editPhone"
                            value="${escapeHTML(user?.phone || '')}"
                            placeholder="شماره موبایل را وارد کنید"
                            required
                        >

                    </div>


                    <div class="edit-form-group">

                        <label for="editEmail">ایمیل</label>

                        <input
                            type="email"
                            id="editEmail"
                            value="${escapeHTML(user?.email || '')}"
                            placeholder="ایمیل را وارد کنید"
                            required
                        >

                    </div>


                    ${!isEdit ? `

                        <div class="edit-form-group">

                            <label for="editPassword">رمز عبور</label>

                            <input
                                type="password"
                                id="editPassword"
                                placeholder="رمز عبور را وارد کنید"
                                minlength="8"
                                required
                            >

                        </div>

                    ` : ''}


                    <div class="edit-form-group">

                        <label for="editRole">نقش کاربر</label>

                        <select id="editRole" required>

                            <option
                                value="Specialist"
                                ${user?.role === 'Specialist' ? 'selected' : ''}
                            >
                                متخصص
                            </option>

                            <option
                                value="CompanyAdmin"
                                ${user?.role === 'CompanyAdmin' ? 'selected' : ''}
                            >
                                شرکت
                            </option>

                            <option
                                value="Admin"
                                ${user?.role === 'Admin' ? 'selected' : ''}
                            >
                                مدیر
                            </option>

                        </select>

                    </div>


                    <div class="edit-modal-actions">

                        <button
                            type="button"
                            class="edit-cancel-btn"
                        >
                            انصراف
                        </button>

                        <button
                            type="submit"
                            class="edit-save-btn"
                        >
                            ${isEdit ? 'تأیید تغییرات' : 'افزودن کاربر'}
                        </button>

                    </div>

                </form>

            </div>

        `;


        // ----------------------------------------
        // Close Modal
        // ----------------------------------------

        function handleClose() {

            closeModal(editModal);

        }


        editModal.querySelector('.edit-modal-close')
            .addEventListener('click', handleClose);


        editModal.querySelector('.edit-cancel-btn')
            .addEventListener('click', handleClose);


        // ----------------------------------------
        // Submit Form
        // ----------------------------------------

        const form = editModal.querySelector('.edit-modal-form');

        form.addEventListener('submit', async function (event) {

            event.preventDefault();

            const firstName = editModal
                .querySelector('#editFirstName')
                .value.trim();

            const lastName = editModal
                .querySelector('#editLastName')
                .value.trim();

            const phone = editModal
                .querySelector('#editPhone')
                .value.trim();

            const email = editModal
                .querySelector('#editEmail')
                .value.trim();

            const password = isEdit
                ? null
                : editModal.querySelector('#editPassword').value;

            const role = editModal
                .querySelector('#editRole')
                .value;


            if (!firstName || !lastName || !phone || !email || !role) {

                alert('لطفاً تمام فیلدهای ضروری را تکمیل کنید.');

                return;

            }


            if (isDuplicateEmail(email, user?.id)) {

                alert('این ایمیل قبلاً ثبت شده است.');

                return;

            }


            if (isDuplicatePhone(phone, user?.id)) {

                alert('این شماره موبایل قبلاً ثبت شده است.');

                return;

            }


            const requestData = {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                role: role
            };


            if (!isEdit) {
                requestData.password = password;
            }


            const submitButton = form.querySelector('[type="submit"]');

            submitButton.disabled = true;


            try {

                let data;

                if (isEdit) {

                    // ویرایش کاربر

                    data = await sendRequest(
                        `/admin/users/${user.id}`,
                        'PUT',
                        requestData
                    );

                } else {

                    // افزودن کاربر

                    data = await sendRequest(
                        '/admin/users',
                        'POST',
                        requestData
                    );

                }


                if (!data.user) {

                    throw new Error(
                        'اطلاعات کاربر در پاسخ سرور دریافت نشد.'
                    );

                }


                const savedUser = normalizeUser(data.user);


                if (isEdit) {

                    // جایگزینی اطلاعات کاربر ویرایش‌شده

                    const index = users.findIndex(
                        item => String(item.id) === String(user.id)
                    );

                    if (index !== -1) {

                        users[index] = savedUser;

                    }

                } else {

                    // اضافه کردن کاربر جدید به ابتدای آرایه

                    users.unshift(savedUser);

                }


                resetTableFilters();

                renderTable();

                closeModal(editModal);

                alert(
                    data.message ||
                    (isEdit
                        ? 'اطلاعات کاربر با موفقیت ویرایش شد.'
                        : 'کاربر با موفقیت اضافه شد.')
                );


            } catch (error) {

                console.error(error);

                alert(error.message || 'ارتباط با سرور برقرار نشد.');

            } finally {

                submitButton.disabled = false;

            }

        });

    }


    // ============================================
    // 18. Delete User
    // ============================================

    function openDeleteModal(user) {

        if (!deleteModal) return;

        deleteModal.classList.add('show');

        deleteModal.innerHTML = `

            <div class="delete-modal-content">

                <div class="delete-modal-icon">
                    <i class="fa-light fa-trash-can"></i>
                </div>

                <div class="delete-modal-header">

                    <h3>تأیید حذف کاربر</h3>

                    <button
                        type="button"
                        class="delete-modal-close"
                        aria-label="بستن"
                    >
                        <i class="fa-light fa-xmark"></i>
                    </button>

                </div>

                <div class="delete-modal-body">

                    <p>
                        آیا از حذف این کاربر اطمینان دارید؟
                    </p>

                    <div class="delete-specialist-name">
                        ${escapeHTML(user.name)}
                    </div>

                    <span class="delete-warning">
                        پس از حذف، اطلاعات این کاربر از فهرست شما حذف خواهد شد.
                    </span>

                </div>

                <div class="delete-modal-actions">

                    <button
                        type="button"
                        class="delete-cancel-btn"
                    >
                        انصراف
                    </button>

                    <button
                        type="button"
                        class="delete-confirm-btn"
                    >
                        <i class="fa-light fa-trash-can"></i>
                        حذف کاربر
                    </button>

                </div>

            </div>

        `;


        function handleClose() {

            closeModal(deleteModal);

        }


        deleteModal.querySelector('.delete-modal-close')
            .addEventListener('click', handleClose);


        deleteModal.querySelector('.delete-cancel-btn')
            .addEventListener('click', handleClose);


        // ----------------------------------------
        // Confirm Delete
        // ----------------------------------------

        deleteModal.querySelector('.delete-confirm-btn')
            .addEventListener('click', async function () {

                const confirmButton = this;

                confirmButton.disabled = true;

                try {
                    console.log('User ID:', user.id);
                    console.log('Delete URL:', `/admin/users/${user.id}`);
                    const data = await sendRequest(
                        `/admin/users/${user.id}`,
                        'DELETE'
                    );


                    users = users.filter(
                        item => String(item.id) !== String(user.id)
                    );

                    renderTable();

                    closeModal(deleteModal);

                    alert(data.message || 'کاربر با موفقیت حذف شد.');


                } catch (error) {

                    console.error(error);

                    alert(error.message || 'حذف کاربر انجام نشد.');

                    confirmButton.disabled = false;

                }

            });

    }


    // ============================================
    // 19. Table Actions
    // ============================================

    tbody.addEventListener('click', function (event) {

        const button = event.target.closest('[data-action]');

        if (!button) return;


        const row = button.closest('tr');

        if (!row) return;


        const userId = row.dataset.userId;

        const user = users.find(
            item => String(item.id) === String(userId)
        );

        if (!user) return;


        const action = button.dataset.action;


        if (action === 'view') {

            openViewModal(user);

        } else if (action === 'edit') {

            openUserForm(user);

        } else if (action === 'delete') {

            openDeleteModal(user);

        }

    });


    // ============================================
    // 20. Add New User
    // ============================================

    if (addUserBtn) {

        addUserBtn.addEventListener('click', function () {

            openUserForm();

        });

    }


    // ============================================
    // 21. Close Modal By Clicking Outside
    // ============================================

    [showModal, editModal, deleteModal].forEach(modal => {

        if (!modal) return;

        modal.addEventListener('click', function (event) {

            if (event.target === modal) {

                closeModal(modal);

            }

        });

    });


    // ============================================
    // 22. Public Table API
    // ============================================

    window.adminUsersTable = {

        setData(data) {

            users = Array.isArray(data)
                ? data.map(normalizeUser)
                : [];

            currentPage = 1;

            renderTable();

        },


        addUser(user) {

            users.unshift(normalizeUser(user));

            currentPage = 1;

            renderTable();

        },


        removeUser(id) {

            users = users.filter(
                user => String(user.id) !== String(id)
            );

            renderTable();

        },


        refresh() {

            renderTable();

        },


        getData() {

            return [...users];

        }

    };


    // ============================================
    // 23. Initial Render
    // ============================================

    users = users.map(normalizeUser);

    renderTable();

});
