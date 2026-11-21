
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ورود | SkillBridge</title>
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
    <p class="subtitle">ورود به حساب کاربری</p>

    @if (session('status'))
        <p style="color: green; text-align: center;">
            {{ session('status') }}
        </p>
    @endif

    @if ($errors->any())
        <p class="error">ایمیل یا رمز عبور واردشده صحیح نیست.</p>
    @endif

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <label for="email">ایمیل</label>
        <input id="email" type="email" name="email"
               value="{{ old('email') }}" required autofocus>
        @error('email')
        <div class="error">{{ $message }}</div>
        @enderror

        <label for="password">رمز عبور</label>
        <input id="password" type="password" name="password" required>
        @error('password')
        <div class="error">{{ $message }}</div>
        @enderror

        <label style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" name="remember" value="1"
                   style="width: auto; margin: 0;">
            مرا به خاطر بسپار
        </label>

        <button type="submit">ورود</button>
    </form>

    <div class="footer">
        حساب کاربری ندارید؟
        <a href="{{ route('register') }}">ثبت‌نام کنید</a>
    </div>
</div>

</body>
</html>
