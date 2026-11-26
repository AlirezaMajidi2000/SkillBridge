
@extends('layouts.admin')

@section('title', 'مدیریت اعلان‌ها')

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / مدیریت اعلان‌ها
    </div>

    <div class="page-head">
        <div>
            <h1>مدیریت اعلان‌ها</h1>
            <p>
                ساخت و مدیریت اطلاعیه‌های عمومی یا هدفمند برای
                اعضای سامانه.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-primary" href="#">
                ارسال اعلان جدید ＋
            </a>
        </div>
    </div>

    <div class="card">
        <div class="datatable-controls">
            <input
                type="search"
                class="datatable-search"
                id="notificationsSearch"
                placeholder="جست‌وجو در اعلان‌ها..."
            >

            <select class="datatable-limit" id="notificationsLimit">
                <option value="5">۵ ردیف</option>
                <option value="10">۱۰ ردیف</option>
                <option value="25">۲۵ ردیف</option>
                <option value="50">۵۰ ردیف</option>
            </select>
        </div>

        <div class="table-wrap">
            <table id="notificationsTable" class="datatable">
                <thead>
                <tr>
                    <th data-sort="title">عنوان اعلان</th>
                    <th data-sort="audience">مخاطبان</th>
                    <th data-sort="channel">کانال</th>
                    <th data-sort="date">تاریخ ارسال</th>
                    <th data-sort="statusText">وضعیت</th>
                    <th>عملیات</th>
                </tr>
                </thead>

                <tbody></tbody>
            </table>
        </div>

        <div class="datatable-footer">
            <div class="datatable-info" id="notificationsInfo"></div>
            <div class="datatable-pagination" id="notificationsPagination"></div>
        </div>
    </div>

@endsection

@push('scripts')
    <script src="{{ asset('admin/assets/js/notification.js') }}"></script>
@endpush
