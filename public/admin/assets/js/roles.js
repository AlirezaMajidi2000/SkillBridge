
document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // 1. DOM Elements
    // ============================================

    const tableBody = document.getElementById("accessTableBody");
    const searchInput = document.getElementById("accessSearch");
    const limitSelect = document.getElementById("accessLimit");
    const tableInfo = document.getElementById("accessTableInfo");
    const pagination = document.getElementById("accessPagination");

    const sidebar = document.getElementById("accessSidebar");
    const sidebarBody = sidebar?.querySelector(".access-sidebar-body");
    const sidebarFooter = sidebar?.querySelector(".access-sidebar-footer");

    const openBtn = document.getElementById("openAccessSidebar");
    const cancelBtn = document.getElementById("cancelAccess");
    const saveBtn = document.getElementById("saveAccess");

    const roleInput = document.getElementById("accessRoleInput");
    const englishNameInput = document.getElementById("accessEnglishName");

    // بررسی وجود عناصر ضروری صفحه
    if (
        !tableBody ||
        !searchInput ||
        !limitSelect ||
        !tableInfo ||
        !pagination ||
        !sidebar ||
        !openBtn ||
        !cancelBtn ||
        !saveBtn ||
        !roleInput ||
        !englishNameInput
    ) {
        console.error("عناصر مورد نیاز صفحه نقش‌ها پیدا نشدند.");
        return;
    }


    // ============================================
    // 2. API URLs
    // ============================================

    const rolesDataUrl = window.rolesDataUrl;
    const rolesStoreUrl = window.rolesStoreUrl;
    const rolesDeleteUrl = window.rolesDeleteUrl;

    const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
    )?.getAttribute("content");


    // ============================================
    // 3. State
    // ============================================

    let roles = [];

    let currentPage = 1;
    let rowsPerPage = Number(limitSelect.value) || 5;
    let searchTerm = "";

    let sortColumn = "number";
    let sortDirection = "asc";

    let isFormActive = false;
    let isSaving = false;
    let isDeleting = false;

    let permissionDraft = {
        users: [],
        roles: []
    };

    const persianCollator = new Intl.Collator("fa", {
        numeric: true,
        sensitivity: "base"
    });


    // ============================================
    // 4. Permission Labels
    // ============================================

    const permissionLabels = {
        users: {
            title: "مدیریت کاربران",
            permissions: {
                create: "ایجاد کاربر",
                delete: "حذف کاربر",
                view: "نمایش کاربر",
                edit: "ویرایش کاربر"
            }
        },

        roles: {
            title: "مدیریت نقش‌ها",
            permissions: {
                create: "ایجاد نقش",
                delete: "حذف نقش",
                view: "نمایش نقش"
            }
        }
    };


    // ============================================
    // 5. Utility Functions
    // ============================================

    function toPersian(value) {
        return String(value).replace(
            /\d/g,
            digit => "۰۱۲۳۴۵۶۷۸۹"[digit]
        );
    }


    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => {

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


    function normalizeText(value) {
        return String(value ?? "").trim().toLowerCase();
    }


    function getPermissionCount(role) {
        return (
            role.permissions.users.length +
            role.permissions.roles.length
        );
    }


    function getRoleById(id) {
        return roles.find(role => role.id === Number(id));
    }


    function clonePermissions(permissions) {
        return {
            users: [...permissions.users],
            roles: [...permissions.roles]
        };
    }


    function showError(message) {
        alert(message || "خطایی رخ داده است.");
    }


    async function readJsonResponse(response) {

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(
                data.message || "ارتباط با سرور با مشکل مواجه شد."
            );
        }

        return data;
    }


    function getRequestHeaders() {

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        if (csrfToken) {
            headers["X-CSRF-TOKEN"] = csrfToken;
        }

        return headers;
    }


    // ============================================
    // 6. Convert Laravel Data To UI Data
    // ============================================

    function normalizeRole(role) {

        const permissionNames = (role.permissions || []).map(
            permission => {
                return typeof permission === "string"
                    ? permission
                    : permission.name;
            }
        );

        return {
            id: Number(role.id),

            role: role.display_name || role.name,

            englishName: role.name,

            permissions: {
                users: permissionNames
                    .filter(name => name.startsWith("users."))
                    .map(name => name.substring("users.".length)),

                roles: permissionNames
                    .filter(name => name.startsWith("roles."))
                    .map(name => name.substring("roles.".length))
            }
        };
    }


    // ============================================
    // 7. Load Roles From Database
    // ============================================

    async function loadRoles() {

        if (!rolesDataUrl) {
            console.error("rolesDataUrl تعریف نشده است.");
            showError("آدرس دریافت نقش‌ها تنظیم نشده است.");
            return;
        }

        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="access-empty">
                    در حال دریافت اطلاعات...
                </td>
            </tr>
        `;

        try {

            const response = await fetch(rolesDataUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            const data = await readJsonResponse(response);

            const roleList = Array.isArray(data)
                ? data
                : data.roles;

            if (!Array.isArray(roleList)) {
                throw new Error("ساختار پاسخ سرور معتبر نیست.");
            }

            roles = roleList.map(normalizeRole);

            currentPage = 1;

            renderTable();

        } catch (error) {

            console.error("Load Roles Error:", error);

            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="access-empty">
                        دریافت اطلاعات نقش‌ها ناموفق بود.
                    </td>
                </tr>
            `;

            showError(error.message);
        }
    }


    // ============================================
    // 8. Form Activation
    // ============================================

    function openRoleForm() {

        isFormActive = true;

        sidebarBody.hidden = false;
        sidebarFooter.hidden = false;

        roleInput.value = "";
        englishNameInput.value = "";

        permissionDraft = {
            users: [],
            roles: []
        };

        document.querySelectorAll(
            "[data-permission], [data-select-all]"
        ).forEach(input => {

            input.checked = false;
            input.indeterminate = false;

        });

        updateSelectAll();

        openBtn.innerHTML =
            '<i class="fa-light fa-plus"></i> تعیین نقش کاربر';

        roleInput.focus();
    }


    function closeRoleForm() {

        isFormActive = false;

        sidebarBody.hidden = true;
        sidebarFooter.hidden = true;

        roleInput.value = "";
        englishNameInput.value = "";

        permissionDraft = {
            users: [],
            roles: []
        };

        document.querySelectorAll(
            "[data-permission], [data-select-all]"
        ).forEach(input => {

            input.checked = false;
            input.indeterminate = false;

        });

        updateSelectAll();
    }


    openBtn.addEventListener("click", function () {

        if (!isFormActive) {
            openRoleForm();
        }

    });


    cancelBtn.addEventListener("click", function () {
        closeRoleForm();
    });


    // ============================================
    // 9. Permission Selection
    // ============================================

    function updateSelectAll() {

        ["users", "roles"].forEach(group => {

            const checkboxes = [
                ...document.querySelectorAll(
                    `[data-permission="${group}"]`
                )
            ];

            const selectAll = document.querySelector(
                `[data-select-all="${group}"]`
            );

            const summary = document.querySelector(
                `[data-summary="${group}"]`
            );

            if (!selectAll || !summary) return;

            const checkedCount = checkboxes.filter(
                checkbox => checkbox.checked
            ).length;

            selectAll.checked =
                checkboxes.length > 0 &&
                checkedCount === checkboxes.length;

            selectAll.indeterminate =
                checkedCount > 0 &&
                checkedCount < checkboxes.length;

            summary.textContent =
                `${toPersian(checkedCount)} از ${toPersian(checkboxes.length)} دسترسی انتخاب شده است`;

        });
    }


    document.querySelectorAll(
        "[data-permission]"
    ).forEach(checkbox => {

        checkbox.addEventListener("change", updateSelectAll);

    });


    document.querySelectorAll(
        "[data-select-all]"
    ).forEach(selectAll => {

        selectAll.addEventListener("change", function () {

            const group = this.dataset.selectAll;

            document.querySelectorAll(
                `[data-permission="${group}"]`
            ).forEach(checkbox => {

                checkbox.checked = this.checked;

            });

            updateSelectAll();
        });
    });


    function readPermissionDraft() {

        const permissions = {
            users: [],
            roles: []
        };

        document.querySelectorAll(
            "[data-permission]"
        ).forEach(checkbox => {

            if (checkbox.checked) {

                permissions[
                    checkbox.dataset.permission
                    ].push(checkbox.value);

            }

        });

        return permissions;
    }


    // ============================================
    // 10. Save New Role With AJAX
    // ============================================

    saveBtn.addEventListener("click", async function () {

        if (isSaving) return;

        const roleName = roleInput.value.trim();
        const englishName = englishNameInput.value.trim();

        if (!roleName) {
            showError("لطفاً نام نقش را وارد کنید.");
            roleInput.focus();
            return;
        }

        if (!englishName) {
            showError("لطفاً عنوان انگلیسی نقش را وارد کنید.");
            englishNameInput.focus();
            return;
        }

        if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(englishName)) {
            showError(
                "عنوان انگلیسی باید با حرف انگلیسی شروع شود و فقط شامل حروف، اعداد، خط تیره یا زیرخط باشد."
            );
            englishNameInput.focus();
            return;
        }


        // بررسی تکراری نبودن نقش

        const duplicate = roles.some(role => {

            return (
                normalizeText(role.role) === normalizeText(roleName) ||
                normalizeText(role.englishName) === normalizeText(englishName)
            );

        });

        if (duplicate) {
            showError("این نقش یا عنوان انگلیسی قبلاً ثبت شده است.");
            return;
        }


        // دریافت دسترسی‌های انتخاب‌شده

        const permissions = readPermissionDraft();

        if (
            permissions.users.length === 0 &&
            permissions.roles.length === 0
        ) {
            showError("حداقل یک دسترسی برای این نقش انتخاب کنید.");
            return;
        }


        // تبدیل دسترسی‌ها به نام کامل مورد انتظار سرور

        const permissionNames = [
            ...permissions.users.map(permission => `users.${permission}`),
            ...permissions.roles.map(permission => `roles.${permission}`)
        ];


        if (!rolesStoreUrl) {
            showError("آدرس ثبت نقش تنظیم نشده است.");
            return;
        }


        try {

            isSaving = true;
            saveBtn.disabled = true;

            const response = await fetch(rolesStoreUrl, {
                method: "POST",

                headers: getRequestHeaders(),

                body: JSON.stringify({
                    role: roleName,
                    englishName: englishName,
                    permissions: permissionNames
                })
            });

            const data = await readJsonResponse(response);

            closeRoleForm();

            await loadRoles();

            alert(data.message || "نقش جدید با موفقیت ثبت شد.");

        } catch (error) {

            console.error("Create Role Error:", error);

            showError(error.message);

        } finally {

            isSaving = false;
            saveBtn.disabled = false;

        }

    });


    // ============================================
    // 11. Search & Filtering
    // ============================================

    function getFilteredRoles() {

        const normalizedSearch = normalizeText(searchTerm);

        const filtered = roles.filter(role => {

            const searchableText = [
                role.role,
                role.englishName
            ].join(" ").toLowerCase();

            return searchableText.includes(normalizedSearch);
        });


        filtered.sort((a, b) => {

            let valueA;
            let valueB;

            if (sortColumn === "number") {

                valueA = a.id;
                valueB = b.id;

            } else if (sortColumn === "role") {

                valueA = a.role;
                valueB = b.role;

            } else {

                valueA = a.englishName;
                valueB = b.englishName;

            }

            let result;

            if (
                typeof valueA === "number" &&
                typeof valueB === "number"
            ) {

                result = valueA - valueB;

            } else {

                result = persianCollator.compare(
                    String(valueA),
                    String(valueB)
                );

            }

            return sortDirection === "asc"
                ? result
                : -result;

        });

        return filtered;
    }


    searchInput.addEventListener("input", function () {

        searchTerm = this.value;

        currentPage = 1;

        renderTable();

    });


    limitSelect.addEventListener("change", function () {

        rowsPerPage = Number(this.value) || 5;

        currentPage = 1;

        renderTable();

    });


    // ============================================
    // 12. Render Table
    // ============================================

    function renderTable() {

        const filteredRoles = getFilteredRoles();

        const totalRoles = filteredRoles.length;

        const totalPages = Math.ceil(
            totalRoles / rowsPerPage
        );


        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }

        if (totalPages === 0) {
            currentPage = 1;
        }


        const startIndex = (currentPage - 1) * rowsPerPage;

        const displayedRoles = filteredRoles.slice(
            startIndex,
            startIndex + rowsPerPage
        );


        tableBody.innerHTML = "";


        if (displayedRoles.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="access-empty">
                        <i class="fa-light fa-folder-open"></i>
                        <p>
                            ${searchTerm
                ? "نقشی با این مشخصات پیدا نشد."
                : "هنوز هیچ نقشی در سامانه ثبت نشده است."
            }
                        </p>
                    </td>
                </tr>
            `;

        } else {

            displayedRoles.forEach((role, index) => {

                const row = document.createElement("tr");

                row.innerHTML = `

                    <td>
                        ${toPersian(startIndex + index + 1)}
                    </td>

                    <td>
                        <span class="access-role">
                            ${escapeHTML(role.role)}
                        </span>
                    </td>

                    <td>
                        ${escapeHTML(role.englishName)}
                    </td>

                    <td>

                        <div class="access-actions">

                            <button
                                class="access-action"
                                type="button"
                                data-action="view"
                                data-id="${role.id}"
                                title="مشاهده دسترسی‌ها"
                            >
                                <i class="fa-light fa-eye"></i>
                            </button>

                            <button
                                class="access-action"
                                type="button"
                                data-action="delete"
                                data-id="${role.id}"
                                title="حذف نقش"
                            >
                                <i class="fa-light fa-trash"></i>
                            </button>

                        </div>

                    </td>

                `;

                tableBody.appendChild(row);

            });

        }


        const from = totalRoles === 0
            ? 0
            : startIndex + 1;

        const to = Math.min(
            startIndex + rowsPerPage,
            totalRoles
        );

        tableInfo.textContent =
            `نمایش ${toPersian(from)} تا ${toPersian(to)} از ${toPersian(totalRoles)} نقش`;


        renderPagination(totalPages);
    }


    // ============================================
    // 13. Pagination
    // ============================================

    function renderPagination(totalPages) {

        pagination.innerHTML = "";


        const previous = document.createElement("button");

        previous.type = "button";
        previous.className = "pagination-btn";

        previous.innerHTML =
            '<i class="fa-light fa-chevron-right"></i>';

        previous.disabled = currentPage <= 1;

        previous.addEventListener("click", function () {

            if (currentPage > 1) {

                currentPage--;

                renderTable();

            }

        });

        pagination.appendChild(previous);


        for (let page = 1; page <= totalPages; page++) {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "pagination-btn";

            button.textContent = toPersian(page);

            if (page === currentPage) {

                button.classList.add("active");

                button.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            button.addEventListener("click", function () {

                currentPage = page;

                renderTable();

            });

            pagination.appendChild(button);

        }


        const next = document.createElement("button");

        next.type = "button";
        next.className = "pagination-btn";

        next.innerHTML =
            '<i class="fa-light fa-chevron-left"></i>';

        next.disabled = currentPage >= totalPages;

        next.addEventListener("click", function () {

            if (currentPage < totalPages) {

                currentPage++;

                renderTable();

            }

        });

        pagination.appendChild(next);
    }


    // ============================================
    // 14. Sorting
    // ============================================

    document.querySelectorAll(
        ".access-table th[data-sort]"
    ).forEach(header => {

        header.addEventListener("click", function () {

            const column = this.dataset.sort;

            if (sortColumn === column) {

                sortDirection =
                    sortDirection === "asc"
                        ? "desc"
                        : "asc";

            } else {

                sortColumn = column;

                sortDirection = "asc";

            }


            document.querySelectorAll(
                ".access-table th i"
            ).forEach(icon => {

                icon.className = "fa-light fa-sort";

            });


            let icon = this.querySelector("i");

            if (!icon) {

                icon = document.createElement("i");

                this.appendChild(icon);

            }

            icon.className = sortDirection === "asc"
                ? "fa-light fa-sort-up"
                : "fa-light fa-sort-down";


            renderTable();

        });

    });


    // ============================================
    // 15. Permission Details Modal
    // ============================================

    function createPermissionModal() {

        if (document.getElementById("rolePermissionModal")) {
            return;
        }

        const modal = document.createElement("div");

        modal.id = "rolePermissionModal";

        modal.innerHTML = `

            <div class="role-modal-backdrop" data-close-modal></div>

            <div class="role-modal-box" role="dialog" aria-modal="true">

                <div class="role-modal-header">

                    <div>
                        <span class="access-sidebar-caption">
                            ROLE PERMISSIONS
                        </span>

                        <h3 id="roleModalTitle">دسترسی‌های نقش</h3>
                    </div>

                    <button
                        type="button"
                        class="access-close"
                        data-close-modal
                        aria-label="بستن"
                    >
                        <i class="fa-light fa-xmark"></i>
                    </button>

                </div>

                <div class="role-modal-body" id="roleModalBody"></div>

                <div class="role-modal-footer">

                    <button
                        type="button"
                        class="access-cancel"
                        data-close-modal
                    >
                        بستن
                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(modal);


        modal.addEventListener("click", function (event) {

            if (event.target.closest("[data-close-modal]")) {
                closePermissionModal();
            }

        });
    }


    function openPermissionModal(role) {

        createPermissionModal();

        const modal = document.getElementById("rolePermissionModal");

        const title = document.getElementById("roleModalTitle");

        const body = document.getElementById("roleModalBody");


        title.textContent =
            `${role.role} - ${role.englishName}`;


        body.innerHTML = "";

        let totalPermissions = 0;


        Object.keys(permissionLabels).forEach(groupKey => {

            const group = permissionLabels[groupKey];

            const selectedPermissions = role.permissions[groupKey] || [];

            const groupBox = document.createElement("div");

            groupBox.className = "role-modal-group";


            let permissionsHTML = "";

            selectedPermissions.forEach(permission => {

                const permissionName =
                    group.permissions[permission];

                if (!permissionName) return;

                totalPermissions++;

                permissionsHTML += `

                    <div class="role-modal-permission">

                        <i class="fa-light fa-circle-check"></i>

                        <span>${escapeHTML(permissionName)}</span>

                    </div>

                `;

            });


            if (selectedPermissions.length === 0) {

                permissionsHTML = `
                    <div class="role-modal-empty">
                        هیچ دسترسی‌ای برای این بخش ثبت نشده است.
                    </div>
                `;

            }


            groupBox.innerHTML = `

                <h4>${group.title}</h4>

                ${permissionsHTML}

            `;

            body.appendChild(groupBox);

        });


        if (totalPermissions === 0) {

            body.innerHTML = `
                <div class="role-modal-empty">
                    این نقش هیچ دسترسی‌ای ندارد.
                </div>
            `;

        }


        modal.classList.add("show");
    }


    function closePermissionModal() {

        const modal = document.getElementById("rolePermissionModal");

        if (modal) {
            modal.classList.remove("show");
        }
    }


    // ============================================
    // 16. Delete Confirmation Modal
    // ============================================

    function createDeleteModal() {

        if (document.getElementById("roleDeleteModal")) {
            return;
        }

        const modal = document.createElement("div");

        modal.id = "roleDeleteModal";

        modal.innerHTML = `

            <div class="role-delete-backdrop" data-close-delete></div>

            <div class="role-delete-box" role="dialog" aria-modal="true">

                <div class="role-delete-icon">
                    <i class="fa-light fa-trash-can"></i>
                </div>

                <div class="role-delete-header">

                    <h3>تأیید حذف نقش</h3>

                    <button
                        type="button"
                        class="role-delete-close"
                        data-close-delete
                        aria-label="بستن"
                    >
                        <i class="fa-light fa-xmark"></i>
                    </button>

                </div>

                <div class="role-delete-body">

                    <p>آیا از حذف این نقش اطمینان دارید؟</p>

                    <div class="role-delete-name" id="roleDeleteName"></div>

                    <span class="role-delete-warning">
                        پس از حذف، این نقش از سامانه حذف خواهد شد.
                    </span>

                </div>

                <div class="role-delete-footer">

                    <button
                        type="button"
                        class="role-delete-cancel"
                        data-close-delete
                    >
                        انصراف
                    </button>

                    <button
                        type="button"
                        class="role-delete-confirm"
                        data-confirm-delete
                    >
                        <i class="fa-light fa-trash-can"></i>
                        حذف نقش
                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(modal);


        modal.addEventListener("click", async function (event) {

            if (event.target.closest("[data-close-delete]")) {
                closeDeleteModal();
            }


            if (event.target.closest("[data-confirm-delete]")) {

                if (isDeleting) return;

                const roleId = Number(modal.dataset.roleId);

                await deleteRole(roleId);

            }

        });
    }


    function openDeleteModal(role) {

        createDeleteModal();

        const modal = document.getElementById("roleDeleteModal");

        const roleName = document.getElementById("roleDeleteName");

        modal.dataset.roleId = role.id;

        roleName.textContent = role.role;

        modal.classList.add("show");
    }


    function closeDeleteModal() {

        const modal = document.getElementById("roleDeleteModal");

        if (modal) {
            modal.classList.remove("show");
        }
    }


    // ============================================
    // 17. Delete Role With AJAX
    // ============================================

    async function deleteRole(roleId) {

        if (!rolesDeleteUrl) {
            showError("آدرس حذف نقش تنظیم نشده است.");
            return;
        }

        const role = getRoleById(roleId);

        if (!role) {
            showError("نقش مورد نظر پیدا نشد.");
            return;
        }


        try {

            isDeleting = true;

            const confirmButton = document.querySelector(
                "#roleDeleteModal [data-confirm-delete]"
            );

            if (confirmButton) {
                confirmButton.disabled = true;
            }


            const deleteUrl = rolesDeleteUrl.replace(
                ":id",
                String(roleId)
            );


            const response = await fetch(deleteUrl, {

                method: "DELETE",

                headers: getRequestHeaders()

            });


            const data = await readJsonResponse(response);

            closeDeleteModal();

            await loadRoles();

            alert(data.message || "نقش با موفقیت حذف شد.");

        } catch (error) {

            console.error("Delete Role Error:", error);

            showError(error.message);

        } finally {

            isDeleting = false;

            const confirmButton = document.querySelector(
                "#roleDeleteModal [data-confirm-delete]"
            );

            if (confirmButton) {
                confirmButton.disabled = false;
            }

        }
    }


    // ============================================
    // 18. Table Actions
    // ============================================

    tableBody.addEventListener("click", function (event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;


        const roleId = Number(button.dataset.id);

        const action = button.dataset.action;

        const role = getRoleById(roleId);

        if (!role) return;


        if (action === "view") {
            openPermissionModal(role);
        }


        if (action === "delete") {
            openDeleteModal(role);
        }

    });


    // ============================================
    // 19. Collapsible Permission Groups
    // ============================================

    document.querySelectorAll(
        ".access-group-header"
    ).forEach(header => {

        header.addEventListener("click", function () {

            const group = this.closest(".access-group");

            if (group) {
                group.classList.toggle("open");
            }

        });

    });


    // ============================================
    // 20. Initial Setup
    // ============================================

    closeRoleForm();

    loadRoles();

});
