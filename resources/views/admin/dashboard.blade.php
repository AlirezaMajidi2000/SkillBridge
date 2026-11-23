<!doctype html>
<html lang="fa" dir="rtl">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>داشبورد | پنل مدیریت آژمان</title>

        <!-- style  -->
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="../assets/css/datatables.css">
        <!-- <link rel="stylesheet" href="../assets/css/datatables.min.css"> -->
        <!-- style  -->

        <!-- icons -->
        <link rel="stylesheet" href="../assets/icon/FontAwesome.Pro.6.5.2/css/all.css">
        <!-- icons -->

    </head>
    <body>
        <div class="app">
            <aside class="sidebar">
                <a class="brand" href="index.html"
                    ><span class="brand-mark">آ</span
                    ><span
                        ><strong>آژمان</strong
                        ><small>پنل مدیریت سامانه</small></span
                    ></a
                >
                <div class="nav-label">نمای کلی</div>
                <div class="nav">
                    <a class="active" href="index.html"
                        ><i class="fa-light fa-table-columns ico"></i>داشبورد</a
                    >
                </div>
                <div class="nav-label">مدیریت اعضا</div>
                <div class="nav">
                    <a class="" href="users.html">
                    <i class="fa-regular fa-users"></i>
                    کاربران
                </a><a class="" href="roles.html"
                        ><i class="fa-light fa-user-shield ico"></i>نقش‌ها و دسترسی‌ها</a
                    >
                </div>
                <div class="nav-label">فرصت‌ها و تعاملات</div>
                <div class="nav">
                    <a class="" href="opportunities.html"
                        ><i class="fa-light fa-briefcase ico"></i>فرصت‌های همکاری</a
                    ><a class="" href="applications.html"
                        ><i class="fa-light fa-clipboard-list ico"></i>درخواست‌ها<span
                            class="count"
                            >۱۲</span
                        ></a
                    ><a class="" href="skills.html"
                        ><i class="fa-light fa-shapes ico"></i>مهارت‌ها و دسته‌بندی‌ها</a
                    >
                </div>
                <div class="nav-label">ارتباط با کاربران</div>
                <div class="nav">
                    <a class="" href="support.html"
                        ><i class="fa-light fa-message ico"></i>پشتیبانی و پیام‌ها</a
                    ><a class="" href="notifications.html"
                        ><i class="fa-light fa-bell ico"></i>اعلان‌ها</a
                    >
                </div>
                <div class="nav-label">تحلیل و پیکربندی</div>
                <div class="nav">
                    <a class="" href="reports.html"
                        ><i class="fa-light fa-chart-column ico"></i>گزارش‌ها</a
                    ><a class="" href="settings.html"
                        ><i class="fa-light fa-gear ico"></i>تنظیمات سامانه</a
                    ><a class="" href="profile.html"
                        ><i class="fa-light fa-user-tie ico"></i>پروفایل مدیر</a
                    >
                </div>
                <div class="sidebar-bottom">
                    <b>پنل مدیریت آژمان</b><br />نسخه طراحی اولیه · رابط کاربری
                </div>
            </aside>
            <main class="main">
                <header class="topbar">
                    <div class="search">
                        <span>⌕</span
                        ><input placeholder="جستجو در پنل مدیریت..." />
                    </div>
                    <div class="top-actions">
                        <a class="top-icon" href="notifications.html"
                            ><i class="fa-light fa-bell"></i><i class="dot"></i></a
                        ><a class="top-icon" href="support.html"><i class="fa-light fa-message"></i></a>
                        <div class="admin">
                            <span class="avatar">م</span>
                            <div><b>مدیر سامانه</b><small>مدیر کل</small></div>
                        </div>
                    </div>
                </header>
                <section class="content">
                    <div class="crumb">آژمان / پنل مدیریت / داشبورد</div>
                    <div class="page-head">
                        <div>
                            <h1>داشبورد</h1>
                            <p>نمای کلی از وضعیت و فعالیت‌های سامانه آژمان.</p>
                        </div>
                        <div class="head-actions">
                            <a class="btn btn-primary" href="reports.html"
                                >＋ گزارش جدید</a
                            >
                        </div>
                    </div>
                    <div class="grid stats">
                        <div class="card stat">
                            <div>
                                <span class="label">کل متخصص‌ها</span
                                ><strong>۲,۴۸۶</strong
                                ><small>۱۲٪ رشد نسبت به ماه قبل</small>
                            </div>
                            <i class="fa-light fa-users stat-icon"></i>
                        </div>
                        <div class="card stat">
                            <div>
                                <span class="label">شرکت‌های ثبت‌شده</span
                                ><strong>۳۴۸</strong
                                ><small>۸٪ رشد نسبت به ماه قبل</small>
                            </div>
                            <i class="fa-light fa-building stat-icon"></i>
                        </div>
                        <div class="card stat">
                            <div>
                                <span class="label">فرصت‌های فعال</span
                                ><strong>۱۲۶</strong><small>۲۴ فرصت جدید</small>
                            </div>
                            <i class="fa-light fa-briefcase stat-icon"></i>
                        </div>
                        <div class="card stat">
                            <div>
                                <span class="label">درخواست‌های بررسی‌نشده</span
                                ><strong>۵۸</strong
                                ><small>نیازمند پیگیری</small>
                            </div>
                            <i class="fa-light fa-clipboard-list stat-icon"></i>
                        </div>
                    </div>
                    <div class="grid two-col">
                        <div class="card">
                            <div class="section-title">
                                <h2>روند ثبت‌نام کاربران</h2>
                                <a href="reports.html">مشاهده گزارش</a>
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
                                <a href="users.html">مدیریت اعضا</a>
                            </div>
                            <div
                                style="
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
                    <div class="grid two-col">
                        <div class="card">
                            <div class="section-title">
                                <h2>آخرین فعالیت‌های کاربران</h2>
                                <a href="applications.html">همه درخواست‌ها</a>
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
                                            <!-- ردیف‌ها توسط JavaScript ساخته می‌شوند -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="card recent-activities">
                            <div class="section-title">
                                <h2>رویدادهای اخیر</h2>
                                <a href="support.html">مرکز فعالیت</a>
                            </div>

                            <div class="activity-list"></div>
                        </div>
                    </div>
                </section>
                <footer class="footer">
                    © آژمان · پنل مدیریت سامانه ارتباط متخصصان و شرکت‌ها
                </footer>
            </main>
        </div>
        <script src="../assets/js/datatables.js" defer></script>
        <!-- <script src="../assets/js/datatables.min.js" defer></script> -->
        <script src="assets/js/chart.js" src=""></script>
        <script src="assets/js/admin.js" defer></script>
    </body>
</html>
