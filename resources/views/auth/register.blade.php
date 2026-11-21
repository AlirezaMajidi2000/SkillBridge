<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ایجاد حساب کاربری</title>

    <!-- style  -->
    <link rel="stylesheet" href="assets/css/login.css">
    <!-- style  -->

    <!-- font  -->
    <link rel="stylesheet" href="assets/css/fonts.css">
    <!-- font  -->


</head>
<body class="font-IRANYekan">

<main class="page-wrapper">

    <div class="register-container">

        <!-- FORM SECTION -->

        <section class="form-section">

            <div class="brand">
                <div class="brand-logo">B</div>

                <div class="brand-info">
                    <h3>Brand Name</h3>
                    <span>سامانه یکپارچه خدمات</span>
                </div>
            </div>

            <div class="form-heading font-YekanBakh">
                <h1>ایجاد حساب کاربری</h1>
                <p>
                    برای شروع، اطلاعات خود را وارد کنید و حساب کاربری
                    جدیدتان را بسازید.
                </p>
            </div>

            <form class="register-form" action="#" method="post">

                <!-- Name -->

                <div class="form-row">

                    <div class="form-group">
                        <label for="firstName font-YekanBakh">نام</label>

                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="نام خود را وارد کنید"
                            autocomplete="given-name"
                            required
                            minlength="2"
                            maxlength="50"
                        >
                    </div>

                    <div class="form-group">
                        <label for="lastName font-YekanBakh">نام خانوادگی</label>

                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="نام خانوادگی خود را وارد کنید"
                            autocomplete="family-name"
                            required
                            minlength="2"
                            maxlength="70"
                        >
                    </div>

                </div>

                <!-- Phone -->

                <div class="form-group">
                    <label for="phone font-YekanBakh">شماره موبایل</label>

                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="09123456789"
                        autocomplete="tel"
                        required
                        minlength="11"
                        maxlength="11"
                    >
                </div>

                <!-- Email -->

                <div class="form-group">
                    <label for="email font-YekanBakh">آدرس ایمیل</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        autocomplete="email"
                        required
                        minlength="6"
                        maxlength="254"
                    >
                </div>

                <!-- Password -->

                <div class="form-row">

                    <div class="form-group">
                        <label for="password font-YekanBakh">رمز عبور</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            autocomplete="new-password"
                            required
                            minlength="8"
                            maxlength="64"
                        >
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword font-YekanBakh">تکرار رمز عبور</label>

                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="رمز عبور را تکرار کنید"
                            autocomplete="new-password"
                            minlength="8"
                            required
                            minlength="8"
                            maxlength="64"
                        >
                    </div>

                </div>

                <p class="password-hint"></p>

                <!-- Terms -->

                <div class="terms">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        required
                    >

                    <label for="terms">
                        با
                        <a href="#">قوانین و مقررات</a>
                        و
                        <a href="#">حریم خصوصی</a>
                        موافقم.
                    </label>
                </div>

                <!-- Submit -->

                <button type="submit" class="register-button">
                    ایجاد حساب کاربری
                </button>

            </form>

            <div class="login-link">
                قبلاً ثبت‌نام کرده‌اید؟
                <a href="{{route('login')}}">وارد حساب خود شوید</a>
            </div>

        </section>

        <!-- VISUAL SECTION -->

        <section class="visual-section">

            <div class="visual-top">
                <div class="welcome-badge">
                    <span class="welcome-dot"></span>
                    به خانواده ما خوش آمدید
                </div>
            </div>

            <div class="visual-content">

                <h2 class="font-YekanBakh">
                    یک قدم برای شروع،
                    <br>
                    <span>یک مسیر برای رشد.</span>
                </h2>

                <p>
                    حساب کاربری خود را بسازید و به دنیایی از امکانات،
                    خدمات و فرصت‌های جدید دسترسی پیدا کنید.
                    تجربه‌ای ساده، سریع و مطمئن در انتظار شماست.
                </p>

                <!-- Decorative Card -->

                <div class="decorative-card">

                    <div class="decorative-card-header">
                        <span>تجربه‌ای ساده و هوشمند</span>

                        <div class="decorative-card-icon">
                            ✓
                        </div>
                    </div>

                    <div class="decorative-lines">

                        <div class="decorative-line">
                            <span></span>
                        </div>

                        <div class="decorative-line">
                            <span></span>
                        </div>

                        <div class="decorative-line">
                            <span></span>
                        </div>

                    </div>

                </div>

            </div>

            <div class="visual-footer">
                <span class="footer-accent"></span>
                تجربه‌ای متفاوت، شروعی تازه
            </div>

        </section>

    </div>

</main>

<!-- js  -->
<script src="assets/js/archive.js" defer></script>
<script src="assets/js/login.js" defer></script>
<!-- js  -->


</body>
</html>
