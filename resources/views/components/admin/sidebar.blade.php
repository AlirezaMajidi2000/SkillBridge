
<aside class="sidebar">

    <a class="brand" href="{{ route('admin.dashboard') }}">
        <span class="brand-mark">آ</span>
        <span>
            <strong>آژمان</strong>
            <small>پنل مدیریت سامانه</small>
        </span>
    </a>

    <div class="nav-label">نمای کلی</div>

    <div class="nav">
        <a class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}"
           href="{{ route('admin.dashboard') }}">
            <i class="fa-light fa-table-columns ico"></i>
            داشبورد
        </a>
    </div>

    <div class="nav-label">مدیریت اعضا</div>

    <div class="nav">
        <a class="{{ request()->routeIs('admin.users') ? 'active' : '' }}"
           href="{{ route('admin.users') }}">
            <i class="fa-regular fa-users"></i>
            کاربران
        </a>

        <a class="{{ request()->routeIs('admin.roles') ? 'active' : '' }}"
           href="{{ route('admin.roles') }}">
            <i class="fa-light fa-user-shield ico"></i>
            نقش‌ها و دسترسی‌ها
        </a>
    </div>

    <div class="nav-label">فرصت‌ها و تعاملات</div>

    <div class="nav">
        <a class="{{ request()->routeIs('admin.opportunities') ? 'active' : '' }}"
           href="{{ route('admin.opportunities') }}">
            <i class="fa-light fa-briefcase ico"></i>
            فرصت‌های همکاری
        </a>

        <a class="{{ request()->routeIs('admin.applications') ? 'active' : '' }}"
           href="{{ route('admin.applications') }}">
            <i class="fa-light fa-clipboard-list ico"></i>
            درخواست‌ها
            <span class="count">۱۲</span>
        </a>

        <a class="{{ request()->routeIs('admin.skills') ? 'active' : '' }}"
           href="{{ route('admin.skills') }}">
            <i class="fa-light fa-shapes ico"></i>
            مهارت‌ها و دسته‌بندی‌ها
        </a>
    </div>

    <div class="nav-label">ارتباط با کاربران</div>

    <div class="nav">
        <a class="{{ request()->routeIs('admin.support') ? 'active' : '' }}"
           href="{{ route('admin.support') }}">
            <i class="fa-light fa-message ico"></i>
            پشتیبانی و پیام‌ها
        </a>

        <a class="{{ request()->routeIs('admin.notifications') ? 'active' : '' }}"
           href="{{ route('admin.notifications') }}">
            <i class="fa-light fa-bell ico"></i>
            اعلان‌ها
        </a>
    </div>

    <div class="nav-label">تحلیل و پیکربندی</div>

    <div class="nav">
        <a class="{{ request()->routeIs('admin.reports') ? 'active' : '' }}"
           href="{{ route('admin.reports') }}">
            <i class="fa-light fa-chart-column ico"></i>
            گزارش‌ها
        </a>

        <a class="{{ request()->routeIs('admin.settings') ? 'active' : '' }}"
           href="{{ route('admin.settings') }}">
            <i class="fa-light fa-gear ico"></i>
            تنظیمات سامانه
        </a>

        <a class="{{ request()->routeIs('admin.profile') ? 'active' : '' }}"
           href="{{ route('admin.profile') }}">
            <i class="fa-light fa-user-tie ico"></i>
            پروفایل مدیر
        </a>
    </div>

    <div class="sidebar-bottom">
        <b>پنل مدیریت آژمان</b>
        <br>
        نسخه طراحی اولیه · رابط کاربری
    </div>

</aside>
