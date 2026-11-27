
<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>فراموشی رمز عبور | زاگرو</title>

    <link rel="stylesheet" href="assets/css/forgotpassword.css">
    <link rel="stylesheet" href="assets/css/fonts.css">
    <link rel="stylesheet" href="assets/icon/FontAwesome.Pro.6.5.2/css/all.css">
</head>

<body class="font-IRANYekan">

    <main class="forgot-page">

        <section class="forgot-card">

            <a href="/" class="brand">
                <span class="logo">Z</span>

                <span class="brand-name">
                    <b>زاگرو</b>
                    <small>هاب فناوری</small>
                </span>
            </a>

            <div class="icon-wrapper">
                <i class="fa-light fa-lock-keyhole"></i>
            </div>

            <div class="page-heading">
                <h2>بازیابی رمز عبور</h2>

                <p>
                    ایمیل ثبت‌نامی خود را وارد کنید تا لینک
                    بازیابی رمز عبور برای شما ارسال شود.
                </p>
            </div>

            @if (session('status'))
                <div class="status-message">
                    {{ session('status') }}
                </div>
            @endif

            @if ($errors->any())
                <div class="error-message">
                    @foreach ($errors->all() as $error)
                        <p>{{ $error }}</p>
                    @endforeach
                </div>
            @endif

            <form action="{{ route('password.email') }}" method="POST" class="forgot-form">
                @csrf

                <div class="form-group">

                    <label for="email">آدرس ایمیل</label>

                    <div class="input-wrapper">
                        <i class="fa-light fa-envelope"></i>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value="{{ old('email') }}"
                            placeholder="ایمیل خود را وارد کنید"
                            required
                        >
                    </div>

                </div>

                <button type="submit" class="submit-btn">
                    ارسال لینک بازیابی
                    <i class="fa-light fa-arrow-left"></i>
                </button>

            </form>

            <a href="{{ route('login') }}" class="back-link">
                <i class="fa-light fa-arrow-right"></i>
                بازگشت به صفحه ورود
            </a>

        </section>

        <div class="page-decoration">
            <div class="decoration-circle circle-one"></div>
            <div class="decoration-circle circle-two"></div>
            <div class="decoration-circle circle-three"></div>
        </div>

    </main>

</body>
</html>
