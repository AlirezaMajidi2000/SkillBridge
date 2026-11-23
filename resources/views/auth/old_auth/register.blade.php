<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ثبت‌نام | SkillBridge</title>
    <style>
        * { box-sizing: border-box; }

        body {
            margin: 0;
            font-family: Tahoma, sans-serif;
            background: #f3f6fb;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .auth-card {
            background: white;
            width: 100%;
            max-width: 420px;
            padding: 35px;
            border-radius: 14px;
            box-shadow: 0 8px 30px rgba(0,0,0,.07);
        }

        h2 { text-align: center; color: #243b64; }
        .subtitle { text-align: center; color: #777; margin-bottom: 28px; }

        label { display: block; margin-bottom: 8px; font-size: 14px; }

        input {
            width: 100%;
            padding: 12px;
            border: 1px solid #dce2eb;
            border-radius: 8px;
            margin-bottom: 18px;
            font-size: 14px;
        }

        input:focus { outline: none; border-color: #3867d6; }

        button {
            width: 100%;
            padding: 13px;
            border: none;
            border-radius: 8px;
            background: #3867d6;
            color: white;
            font-size: 15px;
            cursor: pointer;
        }

        button:hover { background: #2854bb; }
        .footer { text-align: center; margin-top: 22px; font-size: 14px; }
        a { color: #3867d6; text-decoration: none; }
        .error { color: #dc3545; font-size: 12px; margin-top: -12px; margin-bottom: 12px; }
    </style>
</head>
<body>

<div class="auth-card">
    <h2>SkillBridge</h2>
    <p class="subtitle">ایجاد حساب کاربری متخصص</p>

    <form method="POST" action="{{ route('register') }}">
        @csrf

        <label for="name">نام و نام خانوادگی</label>
        <input id="name" type="text" name="name"
               value="{{ old('name') }}" required autofocus>
        @error('name')
        <div class="error">{{ $message }}</div>
        @enderror

        <label for="email">ایمیل</label>
        <input id="email" type="email" name="email"
               value="{{ old('email') }}" required>
        @error('email')
        <div class="error">{{ $message }}</div>
        @enderror

        <label for="password">رمز عبور</label>
        <input id="password" type="password" name="password" required>
        @error('password')
        <div class="error">{{ $message }}</div>
        @enderror

        <label for="password_confirmation">تکرار رمز عبور</label>
        <input id="password_confirmation" type="password"
               name="password_confirmation" required>

        <button type="submit">ثبت‌نام</button>
    </form>

    <div class="footer">
        قبلاً ثبت‌نام کرده‌اید؟
        <a href="{{ route('login') }}">ورود به حساب</a>
    </div>
</div>

</body>
</html>

