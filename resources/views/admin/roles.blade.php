
@extends('layouts.admin')

@section('title', 'مدیریت دسترسی‌ها')

@push('styles')
    <link rel="stylesheet" href="{{ asset('admin/assets/css/roles.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/assets/css/modals.css') }}">
@endpush

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / نقش‌ها و دسترسی‌ها
    </div>

    <div class="page-head">
        <div>
            <h1>مدیریت دسترسی‌ها</h1>
            <p>
                مدیریت کاربران و تعیین مجوزهای دسترسی به بخش‌های مختلف سامانه.
            </p>
        </div>
    </div>

    <!-- Access Layout -->
    <div class="access-layout">

        <!-- Right Side: Access DataTable -->
        <section class="content access-page">

            <div class="card access-card">

                <div class="section-title access-section-title">
                    <div>
                        <h2>کاربران سامانه</h2>
                        <p>مدیریت مجوزها و سطح دسترسی کاربران</p>
                    </div>
                </div>

                <!-- DataTable Controls -->
                <div class="datatable-controls access-table-controls">

                    <div class="access-search-box">

                        <i class="fa-light fa-magnifying-glass"></i>

                        <input
                            type="search"
                            id="accessSearch"
                            class="datatable-search"
                            placeholder="جستجوی نام یا نام کاربری..."
                        >

                    </div>

                    <select id="accessLimit" class="datatable-limit">
                        <option value="5">۵ ردیف</option>
                        <option value="10">۱۰ ردیف</option>
                        <option value="25">۲۵ ردیف</option>
                        <option value="50">۵۰ ردیف</option>
                    </select>

                </div>

                <!-- Table -->
                <div class="table-wrap access-table-wrap">

                    <table class="datatable access-table">

                        <thead>
                        <tr>
                            <th data-sort="number">ردیف</th>
                            <th data-sort="role">نقش</th>
                            <th data-sort="username">عنوان انگلیسی</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>

                        <tbody id="accessTableBody"></tbody>

                    </table>

                </div>

                <!-- Table Footer -->
                <div class="datatable-footer">

                    <span class="datatable-info" id="accessTableInfo"></span>

                    <div class="datatable-pagination" id="accessPagination"></div>

                </div>

            </div>

        </section>

    </div>

    <!-- Left Side: Permission Sidebar -->
    <div class="access-layout">

        <aside class="access-sidebar" id="accessSidebar">

            <!-- Sidebar Header -->
            <div class="access-sidebar-header">

                <div>
                    <span class="access-sidebar-caption">
                        ACCESS MANAGEMENT
                    </span>

                    <h3>تعیین دسترسی نقش</h3>

                    <p>
                        نقش جدید را تعریف کنید و مجوزهای موردنظر را انتخاب کنید.
                    </p>
                </div>

                <button
                    class="btn btn-primary"
                    id="openAccessSidebar"
                    type="button"
                >
                    <i class="fa-light fa-plus"></i>
                    تعیین نقش کاربر
                </button>

            </div>

            <!-- Sidebar Body -->
            <div class="access-sidebar-body">

                <!-- User Selection -->
                <div class="access-user-box">

                    <input
                        type="text"
                        id="accessRoleInput"
                        placeholder="نقش کاربر (مثلاً مدیر)"
                    >

                    <input
                        type="text"
                        id="accessEnglishName"
                        placeholder="نام انگلیسی (مثلاً Admin)"
                    >

                </div>

                <!-- User Management -->
                <div class="access-group open" data-group="users">

                    <button class="access-group-header" type="button">

                        <div class="access-group-title">

                            <span class="access-group-icon">
                                <i class="fa-light fa-users"></i>
                            </span>

                            <span>
                                <strong>مدیریت کاربران</strong>
                                <small>مدیریت حساب‌های کاربری سامانه</small>
                            </span>

                        </div>

                        <i class="fa-light fa-chevron-down access-chevron"></i>

                    </button>

                    <div class="access-group-content">

                        <label class="access-select-all">

                            <span>
                                <i class="fa-light fa-check-double"></i>
                                انتخاب همه دسترسی‌ها
                            </span>

                            <input type="checkbox" data-select-all="users">

                        </label>

                        <label class="access-permission">
                            <span>
                                <i class="fa-light fa-user-plus"></i>
                                ایجاد کاربر
                            </span>
                            <input type="checkbox" data-permission="users" value="create">
                        </label>

                        <label class="access-permission">
                            <span>
                                <i class="fa-light fa-user-minus"></i>
                                حذف کاربر
                            </span>
                            <input type="checkbox" data-permission="users" value="delete">
                        </label>

                        <label class="access-permission">
                            <span>
                                <i class="fa-light fa-eye"></i>
                                نمایش کاربر
                            </span>
                            <input type="checkbox" data-permission="users" value="view">
                        </label>

                        <label class="access-permission">
                            <span>
                                <i class="fa-light fa-user-pen"></i>
                                ویرایش کاربر
                            </span>
                            <input type="checkbox" data-permission="users" value="edit">
                        </label>

                        <div class="access-summary" data-summary="users"></div>

                    </div>

                </div>

                <!-- Role Management -->
                <div class="access-group" data-group="roles">

                    <button class="access-group-header" type="button">

                        <div class="access-group-title">

                            <span class="access-group-icon">
                                <i class="fa-light fa-shield-halved"></i>
                            </span>

                            <span>
                                <strong>مدیریت نقش‌ها</strong>
                                <small>مدیریت نقش‌ها و سطوح دسترسی</small>
                            </span>

                        </div>

                        <i class="fa-light fa-chevron-down access-chevron"></i>

                    </button>

                    <div class="access-group-content">

                        <label class="access-select-all">

                            <span>
                                <i class="fa-light fa-check-double"></i>
                                انتخاب همه دسترسی‌ها
                            </span>

                            <input type="checkbox" data-select-all="roles">

                        </label>

                        <label class="access-permission">
                            <span>
                                <i class="fa-light fa-plus"></i>
                                ایجاد نقش
                            </span>
                            <input type="checkbox" data-permission="roles" value="create">
                        </label>

                        <label class="access-permission">
                            <span>
                                <i class="fa-light fa-trash"></i>
                                حذف نقش
                            </span>
                            <input type="checkbox" data-permission="roles" value="delete">
                        </label>

                        <label class="access-permission">
                            <span>
                                <i class="fa-light fa-eye"></i>
                                نمایش نقش
                            </span>
                            <input type="checkbox" data-permission="roles" value="view">
                        </label>

                        <div class="access-summary" data-summary="roles"></div>

                    </div>

                </div>

            </div>

            <!-- Sidebar Footer -->
            <div class="access-sidebar-footer">

                <button class="access-cancel" id="cancelAccess" type="button">
                    انصراف
                </button>

                <button class="access-save" id="saveAccess" type="button">
                    <i class="fa-light fa-check"></i>
                    ثبت دسترسی‌ها
                </button>

            </div>

        </aside>

    </div>

@endsection

@push('scripts')

    <script>
        window.rolesDataUrl = "{{ route('admin.roles.data') }}";
        window.rolesStoreUrl = "{{ route('admin.roles.store') }}";
        window.rolesDeleteUrl = "{{ route('admin.roles.destroy', ':id') }}";
    </script>

    <script src="{{ asset('admin/assets/js/roles.js') }}"></script>

@endpush

