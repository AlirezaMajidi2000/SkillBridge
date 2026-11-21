
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ورود به حساب کاربری | زاگرو</title>

    <!-- style  -->
    <link rel="stylesheet" href="assets/css/signin.css">
    <!-- style  -->

    <!-- icon  -->
    <link rel="stylesheet" href="assets/icon/FontAwesome.Pro.6.5.2/css/all.css">
    <!-- icon  -->


</head>

<body>

    <main class="login-container">

        <!-- فرم ورود -->
        <section class="login-form-section">

            <div class="brand">
                <div class="brand-icon">
                    <i class="fa-solid fa-link"></i>
                </div>

                <div>
                    <div class="brand-name">زاگرو</div>
                    <div class="brand-caption">ZAGRO TECHNOLOGY HUB</div>
                </div>
            </div>

            <div class="form-heading">
                <h1>خوش برگشتی!</h1>
                <p>
                    برای ورود به حساب کاربری خود، اطلاعات زیر را وارد کنید.
                </p>
            </div>

            <form action="{{route('login')}}" method="POST">
                @csrf
                <div class="input-group">
                    <label for="username"> ایمیل / شماره موبایل</label>

                    <div class="input-wrapper">
                        <i class="fa-regular fa-user"></i>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="ایمیل یا شماره موبایل خود را وارد کنید"
                            autocomplete="username"
                            required
                            minlength="4"
                            maxlength="20"
                        >
                    </div>
                    <p id="userNameHint"></p>
                </div>

                <div class="input-group">
                    <label for="password">رمز عبور</label>

                    <div class="input-wrapper">
                        <i class="fa-solid fa-lock"></i>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            autocomplete="current-password"
                            required
                        >
                    </div>
                    <p id="passwordHint"></p>
                </div>

                <div class="form-options">

                    <label class="remember">
                        <input type="checkbox" name="remember">
                        مرا به خاطر بسپار
                    </label>

                    <a href="#" class="forgot-password">
                        فراموشی رمز عبور؟
                    </a>

                </div>

                <button type="submit" class="login-button">
                    ورود به حساب کاربری
                    <i class="fa-solid fa-arrow-left"></i>
                </button>

            </form>

            <div class="register-text">
                هنوز حساب کاربری ندارید؟
                <a href="{{route('register')}}">ثبت‌نام کنید</a>
            </div>

        </section>

        <!-- بخش معرفی -->
        <section class="login-visual">

            <div class="visual-decoration circle-one"></div>
            <div class="visual-decoration circle-two"></div>
            <div class="visual-dot"></div>

            <div class="visual-content">

                <div class="visual-symbol">
                    <i class="fa-solid fa-people-arrows-left-right"></i>
                </div>

                <h2>
                    ارتباطات تازه،
                    <span>فرصت‌های تازه</span>
                </h2>

                <p>
                    به زاگرو خوش آمدید؛ جایی برای ارتباط با افراد متخصص،
                    تبادل ایده‌ها و ساختن فرصت‌های جدید در دنیای فناوری و نوآوری.
                </p>

            </div>

            <div class="footer-text">
                ZAGRO TECHNOLOGY HUB
            </div>

        </section>

    </main>
    <script src="assets/js/archive.js" defer></script>
    <script src="assets/js/signin.js" defer></script>
</body>
</html>
