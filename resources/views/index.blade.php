
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

    {{-- بخش کاربران --}}
    <div class="section">
        <h2>کاربران سیستم</h2>

        <table>
            <thead>
            <tr>
                <th>شناسه</th>
                <th>نام</th>
                <th>ایمیل</th>
                <th>نقش‌ها</th>
                <th>دسترسی‌های مستقیم</th>
            </tr>
            </thead>

            <tbody>
            @forelse($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>

                    <td>
                        <form action="{{Route("admin.user.updateRole", $user->id)}}" method="post">
                            @csrf
                            @method('PUT')
                            <select name="role">
                                @foreach($roles as $role)
                                    <option value="{{ $role->name }}"
                                        @selected($user->roles->contains('id', $role->id))>
                                        {{ $role->name }}
                                    </option>
                                @endforeach
                            </select>

                            <button>ثبت</button>
                        </form>
                    </td>

                    <td>
                        @forelse($user->permissions as $permission)
                            <span class="badge permission">
                                    {{ $permission->name }}
                                </span>
                        @empty
                            <span class="empty">بدون دسترسی مستقیم</span>
                        @endforelse
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5">کاربری ثبت نشده است.</td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>

    {{-- بخش نقش‌ها --}}
    <div class="section">
        <h2>نقش‌های سیستم و دسترسی‌های آن‌ها</h2>

        <table>
            <thead>
            <tr>
                <th>شناسه</th>
                <th>نام نقش</th>
                <th>دسترسی‌ها</th>
            </tr>
            </thead>

            <tbody>
            @forelse($roles as $role)
                <tr>
                    <td>{{ $role->id }}</td>
                    <td>{{ $role->name }}</td>

                    <td>
                        @forelse($role->permissions as $permission)
                            <span class="badge permission">
                                    {{ $permission->name }}
                                </span>
                        @empty
                            <span class="empty">بدون دسترسی</span>
                        @endforelse
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3">نقشی ثبت نشده است.</td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>

    {{-- بخش تمام دسترسی‌ها --}}
    <div class="section">
        <h2>تمام دسترسی‌های تعریف‌شده</h2>

        <table>
            <thead>
            <tr>
                <th>شناسه</th>
                <th>نام دسترسی</th>
                <th>Guard</th>
            </tr>
            </thead>

            <tbody>
            @forelse($permissions as $permission)
                <tr>
                    <td>{{ $permission->id }}</td>
                    <td>{{ $permission->name }}</td>
                    <td>{{ $permission->guard_name }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="3">دسترسی‌ای ثبت نشده است.</td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>

</div>

</body>
</html>
