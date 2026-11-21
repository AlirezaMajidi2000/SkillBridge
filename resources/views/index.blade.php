<!doctype html>
<html lang="fa" dir="rtl">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#eff8f5" />
        <title>دیدار فناورانه زاگرو</title>

        <!-- style  -->
        <link rel="stylesheet" href="{{asset('assets/css/styles.css')}}">
        <!-- style  -->

        <!-- font -->
        <link rel="stylesheet" href="{{asset('assets/css/fonts.css')}}">
        <!-- font -->

        <!-- icons -->
        <link rel="stylesheet" href="{{asset('assets/icon/FontAwesome.Pro.6.5.2/css/all.css')}}">
        <!-- icons -->


    </head>
    <body class="font-IRANYekan">
        <header class="header">
            <a class="brand" href="#home"
                ><span class="logo">Z</span
                ><span><b>زاگرو</b><small>هاب فناوری</small></span></a
            >
            <nav id="nav">
                <a href="#how">چطور کار می‌کند؟</a><a href="#why">ایده دیدار</a
                ><a href="#place">میزبان دیدار</a>
            </nav>
            <a class="nav-cta" href="{{route('login')}}">ورود / ثبت‌ نام <i class="fa-solid fa-right-to-bracket"></i></a>
            <button class="menu" id="menu" aria-label="منو">☰</button>
        </header>
        <main id="home">
            <section class="hero">
                <div class="hero-bg"></div>
                <div class="hero-tint"></div>
                <div class="hero-content reveal">
                    <div class="eyebrow">
                        <i></i> تجربه‌ای تازه برای ارتباط‌های تازه
                    </div>
                    <h1 class="font-YekanBakh">یک دیدار <span>ناشناس،</span> یک فرصت واقعی.</h1>
                    <p>
                        آدم‌هایی را ملاقات کن که شاید مسیر حرفه‌ای، ایده یا
                        آینده‌ات را تغییر دهند؛ بدون اینکه از قبل بدانی قرار است
                        با چه کسی روبه‌رو شوی.
                    </p>
                    <div class="actions">
                        <a class="button orange" href="#register"
                            >اولین دیدارم را درخواست می‌کنم <i class="fa-solid fa-user-group"></i></a
                        >
                    </div>
                    <div class="caption">
                        <i></i> دیدارهای حضوری در هاب فناوری زاگرو برگزار
                        می‌شوند.
                    </div>
                </div>
                <div class="next" onclick="plusSlides(1)"><i class="fa-solid fa-angle-right"></i></div>
                <div class="prev" onclick="plusSlides(-1)"><i class="fa-solid fa-angle-left"></i></div>
            </section>
            <section class="intro section reveal" id="intro">
                <div>
                    <div class="kicker">فراتر از یک آشنایی</div>
                    <h2 class="font-YekanBakh">
                        قرار نیست فقط <span>آشنا شوی.</span><br />قرار است چیزی
                        شروع شود.
                    </h2>
                    <p>
                        دیدار فناورانه زاگرو فرصتی است برای ملاقات هدفمند با
                        افراد، متخصصان و مجموعه‌های فعال در حوزه‌های فناوری و
                        نوآوری. تو علاقه‌مندی‌هایت را مشخص می‌کنی؛ ما زمینه یک
                        دیدار تازه را فراهم می‌کنیم.
                    </p>
                </div>
                <div class="orbit-art">
                    <div class="orbit orbit-1"></div>
                    <div class="orbit orbit-2"></div>
                    <div class="orbit orbit-3"></div>
                    <div class="orbit orbit-4"></div>
                    <div class="orbit-center">Z</div>
                    <span class="tag t1">ایده</span
                    ><span class="tag t2">مهارت</span
                    ><span class="tag t3">ارتباط</span
                    ><span class="tag t4">فرصت</span>
                </div>
            </section>
            <section class="how section" id="how">
                <div class="section-head reveal">
                    <div>
                        <div class="kicker">از معرفی تا دیدار</div>
                        <h2 class="font-YekanBakh">چهار قدم تا یک <span>دیدار متفاوت</span></h2>
                    </div>
                    <p>
                        فرایند ساده است؛ بخش جذاب ماجرا، کسی است که در انتهای
                        مسیر ملاقات می‌کنی.
                    </p>
                </div>
                <div class="steps">
                    <article class="step reveal">
                        <div class="step-top"><b>۰۱</b><i class="fa-solid fa-user-plus"></i></div>
                        <h3>خودت را معرفی کن</h3>
                        <p>
                            یک پروفایل کوتاه بساز و رزومه یا معرفی مختصری از
                            خودت ثبت کن.
                        </p>
                    </article>
                    <article class="step reveal">
                        <div class="step-top"><b>۰۲</b><i class="fa-solid fa-bullseye-arrow"></i></div>
                        <h3>علاقه‌ات را انتخاب کن</h3>
                        <p>
                            حوزه یا حوزه‌هایی را که دوست داری در آن‌ها ارتباط
                            تازه‌ای بسازی مشخص کن.
                        </p>
                    </article>
                    <article class="step reveal">
                        <div class="step-top"><b>۰۳</b><i class="fa-solid fa-calendar-check"></i></div>
                        <h3>منتظر پیشنهاد دیدار باش</h3>
                        <p>
                            درخواستت بررسی می‌شود و میزبان متناسب، زمان پیشنهادی
                            را اعلام می‌کند.
                        </p>
                    </article>
                    <article class="step reveal">
                        <div class="step-top"><b>۰۴</b><i class="fa-solid fa-handshake"></i></div>
                        <h3>در زاگرو ملاقات کن</h3>
                        <p>
                            در زمان توافق‌شده به هاب فناوری زاگرو بیا و گفت‌وگو
                            را آغاز کن.
                        </p>
                    </article>
                </div>
            </section>
            <section class="why section" id="why">
                <div class="why-art reveal">
                    <div class="network"></div>
                    <div class="person p1"><i class="fa-solid fa-lightbulb-on"></i></div>
                    <div class="person p2"><i class="fa-solid fa-brain-circuit"></i></div>
                    <div class="person p3"><i class="fa-solid fa-rocket-launch"></i></div>
                    <div class="person p4"><i class="fa-solid fa-sparkles"></i></div>
                    <div class="why-logo">Z</div>
                    <span class="star">✳</span>
                </div>
                <div class="why-copy reveal">
                    <div class="kicker">راز یک دیدار</div>
                    <h2 class="font-YekanBakh">مهمان دیدارت را<br /><span>از قبل نمی‌شناسی.</span></h2>
                    <p>
                        نام و هویت طرف مقابل پیش از دیدار برایت نمایش داده
                        نمی‌شود. فقط می‌دانی قرار است با فرد یا مجموعه‌ای مرتبط
                        با حوزه علاقه‌ات ملاقات کنی. همین ناشناختگی، بخشی از
                        تجربه است.
                    </p>
                    <div class="points">
                        <div><b>۰۱</b> ارتباط بر اساس علاقه و حوزه کاری</div>
                        <div><b>۰۲</b> هماهنگی زمان با میزبان و مهمان</div>
                        <div><b>۰۳</b> دیدار حضوری در یک فضای واقعی و پویا</div>
                    </div>
                </div>
            </section>
            <section class="fields section">
                <div class="section-head reveal">
                    <div>
                        <div class="kicker">
                            از علاقه تا تخصص
                        </div>
                        <h2 class="font-YekanBakh">کنجکاوی تو از کجا شروع می‌شود؟</h2>
                    </div>
                    <p>
                        از اولین تجربه تا تخصص حرفه‌ای؛ برای شروع ارتباط لازم
                        نیست همه پاسخ‌ها را بدانی.
                    </p>
                </div>
                <div class="field-grid">
                    <article class="field reveal">
                        <i class="fa-solid fa-microchip"></i><b>فناوری اطلاعات و هوش مصنوعی</b
                        ><small>AI · Software · Data</small>
                    </article>
                    <article class="field reveal">
                        <i class="fa-solid fa-gears"></i><b>صنعت و فناوری‌های نوین</b
                        ><small>Industry · Engineering</small>
                    </article>
                    <article class="field reveal">
                        <i class="fa-solid fa-rocket"></i><b>کارآفرینی و کسب‌وکار</b
                        ><small>Startup · Business</small>
                    </article>
                    <article class="field reveal">
                        <i class="fa-solid fa-chart-line"></i><b>سرمایه‌گذاری و توسعه</b
                        ><small>Investment · Growth</small>
                    </article>
                    <article class="field reveal">
                        <i class="fa-solid fa-atom"></i><b>پژوهش و نوآوری</b
                        ><small>Research · Innovation</small>
                    </article>
                    <article class="field reveal">
                        <i class="fa-solid fa-shapes"></i><b>سایر حوزه‌های تخصصی</b
                        ><small>Explore · Connect</small>
                    </article>
                </div>
            </section>
            <section class="place section" id="place">
                <div class="place-photo reveal">
                    <img class="image-one show" src="assets/image/zagro-hub.jpg" alt="ساختمان هاب فناوری زاگرو"/>
                    <img class="image-two hidden" src="assets/image/person_1.jpg" alt="شبکه سازی">
                    <img class="image-three hidden" src="assets/image/person_2.jpg" alt="تعامل حضوری">
                    <span class="photo-label"
                        ><i></i> محل برگزاری دیدارها</span
                    >
                </div>
                <div class="place-copy reveal">
                    <div class="kicker">مقصد دیدار</div>
                    <h2 class="font-YekanBakh">
                        یک دیدار واقعی،<br /><span
                            >در قلب اکوسیستم فناوری.</span
                        >
                    </h2>
                    <p>
                        دیدارها در هاب فناوری زاگرو برگزار می‌شوند؛ فضایی
                        استارتاپی برای آشنایی، گفت‌وگو، یادگیری و شکل‌گیری
                        همکاری‌های تازه.
                    </p>
                    <div class="chips">
                        <button class="chips-btn-one">فضای استارتاپی</button>
                        <button class="chips-btn-two">شبکه‌سازی</button>
                        <button class="chips-btn-three">تعامل حضوری</button>
                    </div>
                    <a class="button outline" href="#register"
                        >می‌خواهم بخشی از این فضا باشم <b>←</b></a
                    >
                </div>
            </section>
            <section class="register section reveal" id="register">
                <div class="decor decor-1"></div>
                <div class="decor decor-2"></div>
                <div class="kicker">نوبت دیدار توست</div>
                <h2 class="font-YekanBakh">
                    شاید دیدار بعدی،<br /><span>شروع یک اتفاق بزرگ باشد.</span>
                </h2>
                <p>
                    رزومه کوتاهت را ثبت کن، علاقه‌ات را انتخاب کن و برای یک
                    ملاقات متفاوت آماده شو.
                </p>
                <a
                    class="button orange big"
                    href="mailto:hello@zagro.ir?subject=درخواست%20دیدار%20فناورانه"
                    >شروع تجربه دیدار <b>←</b></a
                ><small
                    >ثبت‌نام اولیه · انتخاب حوزه علاقه · درخواست ملاقات</small
                >
            </section>
        </main>
        <footer>
            <a class="brand" href="#home"
                ><span class="logo">Z</span
                ><span><b>زاگرو</b><small>هاب فناوری</small></span></a>
                <span>دیدار فناورانه؛ راهی برای نزدیک‌تر شدن آدم‌ها و ایده‌ها.</span>
        </footer>

        <!-- js  -->
        <script src="assets/js/archive.js" defer></script>
        <script src="assets/js/app.js" defer></script>
        <!-- js  -->

    </body>
</html>
