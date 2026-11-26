
@extends('layouts.admin')

@section('title', 'داشبورد مدیریت')

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / داشبورد
    </div>

    <div class="page-head">
        <div>
            <h1>داشبورد</h1>
            <p>نمای کلی از وضعیت و فعالیت‌های سامانه آژمان.</p>
        </div>

        <div class="head-actions">
            <a class="btn btn-primary" href="{{ route('admin.reports') }}">
                ＋ گزارش جدید
            </a>
        </div>
    </div>

    {{-- آمار کلی سامانه --}}
    <div class="grid stats">

        <div class="card stat">
            <div>
                <span class="label">کل متخصص‌ها</span>
                <strong>{{$users_count}}</strong>
                <small>%X رشد نسبت به ماه قبل</small>
            </div>
            <i class="fa-light fa-users stat-icon"></i>
        </div>

        <div class="card stat">
            <div>
                <span class="label">شرکت‌های ثبت‌شده</span>
                <strong>{{$company_count}}</strong>
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

    {{-- نمودارهای آماری --}}
    <div class="grid two-col">

        <div class="card">
            <div class="section-title">
                <h2>روند ثبت‌نام کاربران</h2>
                <a href="{{ route('admin.reports') }}">
                    مشاهده گزارش
                </a>
            </div>

            <div style="font-size: 10px; color: var(--muted)">
                تعداد ثبت‌نام‌های ماهانه در سامانه
            </div>

            <div class="chart">
                <canvas id="myChart"></canvas>
            </div>
        </div>

        <div class="card">
            <div class="section-title">
                <h2>ترکیب اعضای سامانه</h2>
                <a href="{{ route('admin.users') }}">
                    مدیریت اعضا
                </a>
            </div>

            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
                padding: 20px 0;
            ">
                <div class="chart-doughnut">
                    <canvas id="myChart2"></canvas>
                </div>
            </div>
        </div>

    </div>

    <div style="height: 16px"></div>

    {{-- فعالیت‌های اخیر --}}
    <div class="grid two-col">

        <div class="card">
            <div class="section-title">
                <h2>آخرین فعالیت‌های کاربران</h2>
                <a href="{{ route('admin.applications') }}">
                    همه درخواست‌ها
                </a>
            </div>

            <div class="card">
                <div class="table-wrap">
                    <table class="datatable">

                        <thead>
                        <tr>
                            <th data-sort="name">کاربر / شرکت</th>
                            <th data-sort="field">حوزه فعالیت</th>
                            <th data-sort="time">زمان</th>
                            <th data-sort="status">وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>

                        <tbody>
                        {{-- ردیف‌ها توسط JavaScript ساخته می‌شوند --}}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>

        <div class="card recent-activities">
            <div class="section-title">
                <h2>رویدادهای اخیر</h2>
                <a href="{{ route('admin.support') }}">
                    مرکز فعالیت
                </a>
            </div>

            <div class="activity-list"></div>
        </div>

    </div>

@endsection

@push('scripts')
    <script src="{{ asset('assets/js/datatables.js') }}" defer></script>
    <script src="{{ asset('admin/assets/js/chart.js') }}"></script>
    <script src="{{ asset('admin/assets/js/admin.js') }}" defer></script>
@endpush
