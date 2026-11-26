
@extends('layouts.admin')

@section('title', 'مدیریت کاربران')

@push('styles')
    <link rel="stylesheet" href="{{ asset('admin/assets/css/users.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/assets/css/modals.css') }}">
@endpush

@section('content')

    <div class="crumb">
        آژمان / پنل مدیریت / مدیریت کاربران
    </div>

    <div class="page-head">

        <div>
            <h1>مدیریت کاربران</h1>

            <p>
                مشاهده، بررسی و مدیریت حساب کاربران،
                متخصص‌ها و شرکت‌های عضو سامانه.
            </p>
        </div>

        <div class="head-actions">

            <button
                class="btn btn-primary"
                type="button"
                id="addUserBtn"
            >
                افزودن کاربر جدید ＋
            </button>

        </div>

    </div>

    <div class="card">

        <div class="datatable-controls">

            <input
                type="search"
                class="datatable-search"
                placeholder="جست‌وجوی کاربران..."
            >

            <select
                class="user-filter"
                id="userTypeFilter"
            >
                <option value="all">همه کاربران</option>
                <option value="specialist">متخصص‌ها</option>
                <option value="company">شرکت‌ها</option>
                <option value="admin">مدیرها</option>
            </select>

            <select class="datatable-limit">

                <option value="5">۵ ردیف</option>
                <option value="10">۱۰ ردیف</option>
                <option value="25">۲۵ ردیف</option>
                <option value="50">۵۰ ردیف</option>

            </select>

        </div>

        <div class="table-wrap">

            <table class="users-table">

                <thead>

                <tr>

                    <th>ردیف</th>

                    <th data-sort="name">
                        نام
                    </th>

                    <th data-sort="username">
                        نام کاربری
                    </th>

                    <th data-sort="role">
                        نقش
                    </th>

                    <th data-sort="date">
                        تاریخ عضویت
                    </th>

                    <th data-sort="status">
                        وضعیت
                    </th>

                    <th>
                        عملیات
                    </th>

                </tr>

                </thead>

                <tbody></tbody>

            </table>

        </div>

        <div class="datatable-footer">

            <span class="datatable-info"></span>

            <div class="datatable-pagination"></div>

        </div>

    </div>

@endsection

@section('modals')

    <div class="edit_modal"></div>

    <div class="show_modal"></div>

    <div class="delete_modal"></div>

@endsection

@php
    $usersData = $users->map(function ($user) {
        return [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'name' => $user->name,
            'phone' => $user->phone,
            'email' => $user->email,
            'username' => $user->email,
            'role' => $user->getRoleNames()->first(),
            'date' => $user->created_at->format('Y/m/d'),
            'dateValue' => $user->created_at->timestamp,
            'status' => 'success',
        ];
    })->values();
@endphp

@push('scripts')

    <script>
        window.usersData = {{ Illuminate\Support\Js::from($usersData) }};
    </script>


    <script src="{{ asset('admin/assets/js/users.js') }}"></script>
@endpush
