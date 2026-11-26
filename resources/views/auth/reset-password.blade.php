<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تعیین رمز عبور جدید</title>
</head>
<body>

<h2>تعیین رمز عبور جدید</h2>

@if ($errors->any())
    @foreach ($errors->all() as $error)
        <p style="color:red">{{ $error }}</p>
    @endforeach
@endif

<form action="{{ route('password.update') }}" method="POST">
    @csrf

    <input type="hidden" name="token" value="{{ $request->route('token') }}">

    <input
        type="hidden"
        name="email"
        value="{{ request()->email }}"
    >

    <div>
        <label>رمز عبور جدید</label>
        <input
            type="password"
            name="password"
            required
        >
    </div>

    <div>
        <label>تکرار رمز عبور جدید</label>
        <input
            type="password"
            name="password_confirmation"
            required
        >
    </div>

    <button type="submit">
        تغییر رمز عبور
    </button>

</form>

</body>
</html>
