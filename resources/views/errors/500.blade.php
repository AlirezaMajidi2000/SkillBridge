<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>500 | آژمان</title>
    <link rel="stylesheet" href="{{ asset('admin/style.css') }}">
</head>
<body>
<main class="login-page">
    <section class="login-card" style="text-align:center">
        <div class="brand" style="justify-content:center">
            <span class="brand-mark">آ</span>
            <span>
                    <strong>آژمان</strong>
                    <small>پنل مدیریت سامانه</small>
                </span>
        </div>
        <div style="font-size:64px;font-weight:800;color:var(--primary)">500</div>
        <div style="font-size:28px">⚠</div>
        <h1>خطای سرور</h1>
        <p>در پردازش درخواست مشکلی رخ داده است.</p>
        <a class="btn btn-primary" href="{{ route('admin.dashboard') }}">بازگشت به داشبورد</a>
    </section>
</main>
</body>
</html>
