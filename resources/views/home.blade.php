
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>مدیریت کاربران و دسترسی‌ها</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: Tahoma, sans-serif;
            background: #f4f6f9;
            margin: 0;
            padding: 30px;
            color: #333;
        }

        h1, h2 {
            margin-top: 0;
        }

        .container {
            max-width: 1200px;
            margin: auto;
        }

        .section {
            background: white;
            padding: 25px;
            margin-bottom: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 8px #0000000d;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            min-width: 500px;
        }

        th, td {
            padding: 13px;
            border-bottom: 1px solid #eee;
            text-align: right;
        }

        th {
            background: #f7f8fa;
        }

        .badge {
            display: inline-block;
            background: #e8f0fe;
            color: #2457a6;
            padding: 5px 10px;
            border-radius: 5px;
            margin: 3px;
            font-size: 12px;
        }

        .permission {
            background: #e8f7ed;
            color: #26733d;
        }

        .empty {
            color: #888;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>مدیریت کاربران و دسترسی‌ها</h1>
    @if (auth()->check())
    <p> {{ Auth::id()}} </p>
    <p>نام و نام خانوادگی :  {{ auth()->user()->name}} </p>
    <p> ایمیل : {{ Auth::user()->email}} </p>
    @else
    <p>ورود شناسایی نشده است</p>
    @endif
    <a href="{{ route('logout') }}" class="logout-link"
       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
        <span>خروج از حساب</span>
    </a>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>

</div>

</body>
</html>
