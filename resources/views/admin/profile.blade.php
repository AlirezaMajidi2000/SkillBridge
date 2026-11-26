
@extends('layouts.admin')

@section('title', 'پروفایل مدیر')

@section('content')

    <div class="crumb">آژمان / پنل مدیریت / پروفایل مدیر</div>

    <div class="page-head">
        <div>
            <h1>پروفایل مدیر</h1>
            <p>
                مدیریت مشخصات حساب کاربری و تنظیمات امنیتی مدیر.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-outline" href="#">
                ↓ دریافت گزارش
            </a>
        </div>
    </div>

    <div class="grid two-col">

        <div>
            <div class="card" style="text-align: center; padding: 28px">
                <div
                    class="avatar"
                    style="
                        width: 76px;
                        height: 76px;
                        border-radius: 22px;
                        margin: auto;
                        font-size: 25px;
                    "
                >
                    م
                </div>

                <h2 style="font-size: 16px; margin: 10px 0 0">
                    مدیر سامانه
                </h2>

                <p
                    style="
                        font-size: 11px;
                        color: var(--muted);
                        margin: 0;
                    "
                >
                    مدیر کل · دسترسی کامل
                </p>

                <div style="margin-top: 16px">
                    <span class="status success">حساب فعال</span>
                </div>
            </div>

            <div style="height: 14px"></div>

            <div class="card">
                <div class="section-title">
                    <h2>اطلاعات امنیتی</h2>
                </div>

                <div class="activity">
                    <i class="bullet"></i>
                    <div>
                        <b>آخرین ورود موفق</b>
                        <small>
                            امروز، ساعت ۰۸:۴۲ · مرورگر دسکتاپ
                        </small>
                    </div>
                </div>

                <div class="activity">
                    <i class="bullet"></i>
                    <div>
                        <b>تغییر رمز عبور</b>
                        <small>۱۴۰۵/۰۸/۱۲</small>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="section-title">
                <h2>ویرایش اطلاعات مدیر</h2>
            </div>

            <div class="card">
                <div class="form-grid">

                    <div class="field">
                        <label>نام و نام خانوادگی</label>
                        <input
                            type="text"
                            placeholder="مدیر سامانه"
                        />
                    </div>

                    <div class="field">
                        <label>ایمیل</label>
                        <input
                            type="email"
                            placeholder="admin@ajman.ir"
                        />
                    </div>

                    <div class="field">
                        <label>شماره تماس</label>
                        <input
                            type="text"
                            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                        />
                    </div>

                    <div class="field">
                        <label>نام کاربری</label>
                        <input
                            type="text"
                            placeholder="admin"
                        />
                    </div>

                    <div class="field">
                        <label>رمز عبور جدید</label>
                        <input
                            type="password"
                            placeholder="در صورت نیاز وارد کنید"
                        />
                    </div>

                    <div class="field">
                        <label>تکرار رمز عبور</label>
                        <input
                            type="password"
                            placeholder="تکرار رمز عبور جدید"
                        />
                    </div>

                </div>

                <div class="form-actions">
                    <button class="btn btn-primary">
                        ذخیره تغییرات
                    </button>

                    <button class="btn btn-outline">
                        انصراف
                    </button>
                </div>
            </div>
        </div>

    </div>

@endsection
