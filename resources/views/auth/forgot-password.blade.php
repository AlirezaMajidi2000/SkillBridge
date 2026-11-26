<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>فراموشی رمز عبور</title>
</head>
<body>

<h2>بازیابی رمز عبور</h2>

@if (session('status'))
    <p>{{ session('status') }}</p>
@endif

@if ($errors->any())
    @foreach ($errors->all() as $error)
        <p style="color:red">{{ $error }}</p>
    @endforeach
@endif

<form action="{{ route('password.email') }}" method="POST">
    @csrf

    <label for="email">آدرس ایمیل</label>

    <input
        type="email"
        id="email"
        name="email"
        value="{{ old('email') }}"
        placeholder="ایمیل خود را وارد کنید"
        required
    >

    <button type="submit">
        ارسال لینک بازیابی
    </button>
</form>

</body>
</html>
