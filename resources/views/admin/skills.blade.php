
@extends('layouts.admin')

@section('title', 'مهارت‌ها و دسته‌بندی‌ها')

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / مهارت‌ها و دسته‌بندی‌ها
    </div>

    <div class="page-head">
        <div>
            <h1>مهارت‌ها و دسته‌بندی‌ها</h1>
            <p>
                تعریف و سامان‌دهی حوزه‌های تخصصی و مهارت‌های
                قابل انتخاب در پروفایل‌ها.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-primary" href="#">
                افزودن مهارت ＋
            </a>
        </div>
    </div>

    <div class="card">

        <div class="datatable-controls">

            <input
                type="text"
                class="datatable-search"
                id="skillsSearch"
                placeholder="جست‌وجو در مهارت‌ها..."
            >

            <select class="datatable-limit" id="skillsLimit">
                <option value="5">۵ ردیف</option>
                <option value="10">۱۰ ردیف</option>
                <option value="25">۲۵ ردیف</option>
                <option value="50">۵۰ ردیف</option>
            </select>

        </div>

        <div class="table-wrap">
            <table id="skillsTable" class="datatable">

                <thead>
                <tr>
                    <th>عنوان مهارت</th>
                    <th>دسته‌بندی</th>
                    <th>تعداد متخصص</th>
                    <th>وضعیت</th>
                    <th>آخرین ویرایش</th>
                    <th>عملیات</th>
                </tr>
                </thead>

                <tbody></tbody>

            </table>
        </div>

        <div class="datatable-footer">
            <span class="datatable-info" id="skillsInfo"></span>
            <div class="datatable-pagination" id="skillsPagination"></div>
        </div>

    </div>

@endsection

@push('scripts')
    <script src="{{ asset('admin/assets/js/skills.js') }}"></script>
@endpush
