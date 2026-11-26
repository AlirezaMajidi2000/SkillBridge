
@extends('layouts.admin')

@section('title', 'فرصت‌های همکاری')

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / فرصت‌های همکاری
    </div>

    <div class="page-head">
        <div>
            <h1>فرصت‌های همکاری</h1>
            <p>
                مدیریت فرصت‌های شغلی، پروژه‌ها و همکاری‌های
                منتشرشده.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-primary" href="#">
                ایجاد فرصت ＋
            </a>
        </div>
    </div>

    <div class="card">
        <div class="datatable-controls">
            <input
                type="text"
                class="datatable-search"
                id="opportunitiesSearch"
                placeholder="جست‌وجو در فرصت‌ها..."
            >

            <select class="datatable-limit" id="opportunitiesLimit">
                <option value="5">۵ ردیف</option>
                <option value="10">۱۰ ردیف</option>
                <option value="25">۲۵ ردیف</option>
                <option value="50">۵۰ ردیف</option>
            </select>
        </div>

        <div class="table-wrap">
            <table id="opportunitiesTable" class="datatable">
                <thead>
                <tr>
                    <th data-sort="title">عنوان فرصت</th>
                    <th data-sort="company">شرکت منتشرکننده</th>
                    <th data-sort="type">نوع همکاری</th>
                    <th data-sort="deadline">مهلت</th>
                    <th data-sort="applicants">متقاضیان</th>
                    <th data-sort="status">وضعیت</th>
                </tr>
                </thead>

                <tbody></tbody>
            </table>
        </div>

        <div class="datatable-footer">
            <span class="datatable-info" id="opportunitiesInfo"></span>

            <div class="datatable-pagination" id="opportunitiesPagination"></div>
        </div>
    </div>

@endsection

@push('scripts')
    <script src="{{ asset('admin/assets/js/opportunities.js') }}"></script>
@endpush
