
<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>تعیین رمز عبور جدید</title>
    <link rel="stylesheet" href="{{ asset('assets/css/resetpassword.css') }}">

    <link rel="stylesheet" href="{{ asset('assets/css/fonts.css') }}">

    <link rel="stylesheet" href="{{ asset('assets/icon/FontAwesome.Pro.6.5.2/css/all.css') }}">
</head>

<body class="font-IRANYekan">

    <main class="reset-page">

        <div class="page-decoration">
            <span class="decoration-circle circle-one"></span>
            <span class="decoration-circle circle-two"></span>
            <span class="decoration-circle circle-three"></span>
        </div>

        <section class="reset-card">

            <div class="brand">
                <div class="logo">A</div>

                <div class="brand-name">
                    <b>آژمان</b>
                    <small>سامانه دیدار فناورانه زاگرو</small>
                </div>
            </div>

            <div class="icon-wrapper">
                <i class="fa-light fa-lock"></i>
            </div>

            <div class="page-heading">
                <h2>تعیین رمز عبور جدید</h2>
                <p>
                    برای حفظ امنیت حساب کاربری خود،
                    رمز عبور جدیدی انتخاب کنید.
                </p>
            </div>

            @if ($errors->any())
                <div class="error-message">
                    @foreach ($errors->all() as $error)
                        <p>{{ $error }}</p>
                    @endforeach
                </div>
            @endif

            <form action="{{ route('password.update') }}"
                  method="POST"
                  class="reset-form">

                @csrf

                <input type="hidden" name="token"
                    value="{{ $request->route('token') }}">

                <input type="hidden" name="email"
                    value="{{ request()->email }}">

                <div class="form-group">

                    <label>رمز عبور جدید</label>

                    <div class="input-wrapper">
                        <i class="fa-light fa-lock"></i>

                        <input
                            type="password"
                            name="password"
                            placeholder="رمز عبور جدید را وارد کنید"
                            required
                        >
                    </div>

                </div>

                <div class="form-group">

                    <label>تکرار رمز عبور جدید</label>

                    <div class="input-wrapper">
                        <i class="fa-light fa-lock-keyhole"></i>

                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="رمز عبور جدید را تکرار کنید"
                            required
                        >
                    </div>

                </div>

                <button type="submit" class="submit-btn">
                    <span>تغییر رمز عبور</span>
                    <i class="fa-light fa-arrow-left"></i>
                </button>

            </form>

        </section>

    </main>

</body>
</html>
