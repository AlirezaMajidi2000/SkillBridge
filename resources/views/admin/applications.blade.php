
@extends('layouts.admin')

@section('title', 'مدیریت درخواست‌ها')

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / مدیریت درخواست‌ها
    </div>

    <div class="page-head">

        <div>
            <h1>مدیریت درخواست‌ها</h1>

            <p>
                بررسی درخواست‌های ارسالی متخصصان برای فرصت‌های همکاری.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-primary" href="#">
                خروجی درخواست‌ها ＋
            </a>
        </div>

    </div>

    <div class="card">

        <div class="datatable-controls">

            <input
                type="search"
                class="datatable-search"
                placeholder="جست‌وجوی درخواست‌ها..."
            >

            <select class="datatable-limit">
                <option value="5">۵ ردیف</option>
                <option value="10">۱۰ ردیف</option>
                <option value="25">۲۵ ردیف</option>
                <option value="50">۵۰ ردیف</option>
            </select>

        </div>

        <div class="table-wrap">

            <table class="applications-table">

                <thead>
                <tr>
                    <th data-sort="name">متخصص</th>
                    <th data-sort="title">عنوان فرصت</th>
                    <th data-sort="company">شرکت</th>
                    <th data-sort="date">تاریخ ارسال</th>
                    <th data-sort="status">وضعیت</th>
                    <th>عملیات</th>
                </tr>
                </thead>

                <tbody>
                {{-- ردیف‌ها توسط JavaScript ساخته می‌شوند --}}
                </tbody>

            </table>

        </div>

        <div class="datatable-footer">

            <span class="datatable-info"></span>

            <div class="datatable-pagination"></div>

        </div>

    </div>

@endsection

@push('scripts')
    <script src="{{ asset('admin/assets/js/applications.js') }}"></script>
@endpush
