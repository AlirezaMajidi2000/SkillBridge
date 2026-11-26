<!doctype html>
<html lang="fa" dir="rtl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <title>@yield('title', 'پنل مدیریت آژمان')</title>

    <link rel="stylesheet" href="{{ asset('admin/style.css') }}">

    <link rel="stylesheet" href="{{ asset('assets/icon/FontAwesome.Pro.6.5.2/css/all.css') }}">

    @stack('styles')
</head>

<body>

<div class="app">

    <x-admin.sidebar />

    <main class="main">

        <x-admin.header />

        <section class="content">

            @yield('content')

        </section>

        <footer class="footer">
            © آژمان · پنل مدیریت سامانه ارتباط متخصصان و شرکت‌ها
        </footer>

    </main>

</div>
@yield('modals')

@stack('scripts')

</body>
</html>
