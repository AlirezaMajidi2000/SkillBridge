
@extends('layouts.admin')

@section('title', 'پشتیبانی و پیام‌ها')

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / پشتیبانی و پیام‌ها
    </div>

    <div class="page-head">
        <div>
            <h1>پشتیبانی و پیام‌ها</h1>
            <p>
                رسیدگی به پیام‌ها، درخواست‌های پشتیبانی و
                گزارش‌های کاربران.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-primary" href="#">
                ایجاد تیکت ＋
            </a>
        </div>
    </div>

    <div class="card">

        <div class="datatable-controls">

            <input
                type="search"
                class="datatable-search"
                id="supportSearch"
                placeholder="جست‌وجو در پیام‌ها..."
            >

            <select class="datatable-limit" id="supportLimit">
                <option value="5">۵ ردیف</option>
                <option value="10">۱۰ ردیف</option>
                <option value="25">۲۵ ردیف</option>
                <option value="50">۵۰ ردیف</option>
            </select>

        </div>

        <div class="table-wrap">
            <table id="supportTable" class="datatable">

                <thead>
                <tr>
                    <th data-sort="id">شناسه</th>
                    <th data-sort="sender">فرستنده</th>
                    <th data-sort="subject">موضوع</th>
                    <th data-sort="date">تاریخ</th>
                    <th data-sort="priorityText">اولویت</th>
                    <th data-sort="statusText">وضعیت</th>
                </tr>
                </thead>

                <tbody></tbody>

            </table>
        </div>

        <div class="datatable-footer">
            <div class="datatable-info" id="supportInfo"></div>
            <div class="datatable-pagination" id="supportPagination"></div>
        </div>

    </div>

@endsection

@push('scripts')
    <script src="{{ asset('admin/assets/js/support.js') }}"></script>
@endpush
