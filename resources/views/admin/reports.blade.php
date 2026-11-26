
@extends('layouts.admin')

@section('title', 'گزارش‌ها و تحلیل‌ها')

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / گزارش‌ها و تحلیل‌ها
    </div>

    <div class="page-head">
        <div>
            <h1>گزارش‌ها و تحلیل‌ها</h1>
            <p>
                تحلیل عملکرد سامانه و مشاهده شاخص‌های کلیدی برای
                تصمیم‌گیری.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-outline" href="#">
                ↓ دریافت گزارش
            </a>
        </div>
    </div>

    <div class="grid stats">
        <div class="card stat">
            <div>
                <span class="label">کل متخصص‌ها</span>
                <strong>۲,۴۸۶</strong>
                <small>۱۲٪ رشد نسبت به ماه قبل</small>
            </div>
            <i class="fa-light fa-users stat-icon"></i>
        </div>

        <div class="card stat">
            <div>
                <span class="label">شرکت‌های ثبت‌شده</span>
                <strong>۳۴۸</strong>
                <small>۸٪ رشد نسبت به ماه قبل</small>
            </div>
            <i class="fa-light fa-building stat-icon"></i>
        </div>

        <div class="card stat">
            <div>
                <span class="label">فرصت‌های فعال</span>
                <strong>۱۲۶</strong>
                <small>۲۴ فرصت جدید</small>
            </div>
            <i class="fa-light fa-briefcase stat-icon"></i>
        </div>

        <div class="card stat">
            <div>
                <span class="label">درخواست‌های بررسی‌نشده</span>
                <strong>۵۸</strong>
                <small>نیازمند پیگیری</small>
            </div>
            <i class="fa-light fa-clipboard-list stat-icon"></i>
        </div>
    </div>

    <div class="grid two-col">

        <div class="card">
            <div class="section-title">
                <h2>روند رشد اعضا</h2>
            </div>

            <div class="chart">
                <canvas id="myChart"></canvas>
            </div>
        </div>

        <div class="card">
            <div class="section-title">
                <h2>شاخص‌های عملکرد</h2>
            </div>

            <div style="margin: 17px 0">
                <div
                    style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        margin-bottom: 6px;
                    "
                >
                    <b>تکمیل پروفایل متخصصان</b>
                    <span>۷۸٪</span>
                </div>

                <div class="progress">
                    <i style="width: 78%"></i>
                </div>
            </div>

            <div style="margin: 17px 0">
                <div
                    style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        margin-bottom: 6px;
                    "
                >
                    <b>تأیید شرکت‌ها</b>
                    <span>۸۶٪</span>
                </div>

                <div class="progress">
                    <i style="width: 86%"></i>
                </div>
            </div>

            <div style="margin: 17px 0">
                <div
                    style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        margin-bottom: 6px;
                    "
                >
                    <b>پاسخ‌گویی به تیکت‌ها</b>
                    <span>۹۲٪</span>
                </div>

                <div class="progress">
                    <i style="width: 92%"></i>
                </div>
            </div>

            <div style="margin: 17px 0">
                <div
                    style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        margin-bottom: 6px;
                    "
                >
                    <b>تبدیل درخواست به همکاری</b>
                    <span>۳۴٪</span>
                </div>

                <div class="progress">
                    <i style="width: 34%"></i>
                </div>
            </div>
        </div>

    </div>

    <div style="height: 16px"></div>

    <div class="card">
        <div class="section-title">
            <h2>گزارش‌های قابل دریافت</h2>
        </div>

        <div class="card">

            <div class="datatable-controls">
                <div class="datatable-search">
                    <input
                        type="text"
                        id="reportsSearch"
                        placeholder="جست‌وجو در گزارش‌ها..."
                    >
                </div>

                <div class="datatable-limit">
                    <select id="reportsLimit">
                        <option value="5">۵ ردیف</option>
                        <option value="10">۱۰ ردیف</option>
                        <option value="25">۲۵ ردیف</option>
                        <option value="50">۵۰ ردیف</option>
                    </select>
                </div>
            </div>

            <div class="table-wrap">
                <table id="reportsTable" class="datatable">
                    <thead>
                    <tr>
                        <th data-sort="title">عنوان گزارش</th>
                        <th data-sort="period">بازه زمانی</th>
                        <th data-sort="updated">آخرین به‌روزرسانی</th>
                        <th data-sort="format">فرمت</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>

                    <tbody></tbody>
                </table>
            </div>

            <div class="datatable-footer">
                <div class="datatable-info" id="reportsInfo"></div>
                <div class="datatable-pagination" id="reportsPagination"></div>
            </div>

        </div>
    </div>

@endsection

@push('scripts')
    <script src="{{ asset('admin/assets/js/chart.js') }}" defer></script>
    <script src="{{ asset('admin/assets/js/reports.js') }}" defer></script>
@endpush
