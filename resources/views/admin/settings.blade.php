
@extends('layouts.admin')

@section('title', 'تنظیمات سامانه')

@section('content')

    <div class="crumb">آژمان / پنل مدیریت / تنظیمات سامانه</div>

    <div class="page-head">
        <div>
            <h1>تنظیمات سامانه</h1>
            <p>
                مدیریت اطلاعات پایه، ثبت‌نام، امنیت و تنظیمات
                عمومی.
            </p>
        </div>

        <div class="head-actions">
            <a class="btn btn-outline" href="#">
                ↓ دریافت گزارش
            </a>
        </div>
    </div>

    <div class="notice">
        این بخش برای پیکربندی اطلاعات عمومی و رفتارهای پایه
        سامانه در نظر گرفته شده است.
    </div>

    <div class="grid two-col">

        <div>
            <div class="section-title">
                <h2>اطلاعات عمومی سامانه</h2>
            </div>

            <div class="card">
                <div class="form-grid">

                    <div class="field">
                        <label>نام سامانه</label>
                        <input
                            type="text"
                            placeholder="آژمان"
                        />
                    </div>

                    <div class="field">
                        <label>عنوان صفحه اصلی</label>
                        <input
                            type="text"
                            placeholder="ارتباط متخصصان و شرکت‌ها"
                        />
                    </div>

                    <div class="field">
                        <label>ایمیل پشتیبانی</label>
                        <input
                            type="email"
                            placeholder="support@example.com"
                        />
                    </div>

                    <div class="field">
                        <label>شماره تماس</label>
                        <input
                            type="text"
                            placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
                        />
                    </div>

                    <div class="field full">
                        <label>توضیحات سامانه</label>
                        <textarea
                            placeholder="معرفی کوتاه پلتفرم..."
                        ></textarea>
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

        <div>
            <div class="section-title">
                <h2>تنظیمات ثبت‌نام و امنیت</h2>
            </div>

            <div class="card">
                <div class="form-grid">

                    <div class="field">
                        <label>وضعیت ثبت‌نام متخصصان</label>
                        <select>
                            <option>فعال</option>
                            <option>فعال</option>
                            <option>غیرفعال</option>
                        </select>
                    </div>

                    <div class="field">
                        <label>وضعیت ثبت‌نام شرکت‌ها</label>
                        <select>
                            <option>فعال</option>
                            <option>فعال</option>
                            <option>غیرفعال</option>
                        </select>
                    </div>

                    <div class="field">
                        <label>تأیید حساب شرکت</label>
                        <select>
                            <option>نیازمند بررسی مدیر</option>
                            <option>فعال</option>
                            <option>غیرفعال</option>
                        </select>
                    </div>

                    <div class="field">
                        <label>حداکثر حجم فایل رزومه</label>
                        <input
                            type="text"
                            placeholder="۱۰ مگابایت"
                        />
                    </div>

                    <div class="field full">
                        <label>قوانین و توضیحات</label>
                        <textarea
                            placeholder="متن قوانین سامانه..."
                        ></textarea>
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
