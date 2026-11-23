<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            //
            ['email' => 'admin@skillbridge.test'],
            [
                'first_name' => 'مدیر',
                'last_name' => 'کل',
                'name' => 'مدیر کل',
                'phone' => '09120000001',
                'password' => Hash::make('Admin@123456'),
            ]
        );

        $admin->assignRole('Admin');

        $companies = [
            [
                'first_name' => 'مدیر',
                'last_name' => 'شرکت اول',
                'name' => 'مدیر شرکت اول',
                'email' => 'company1@skillbridge.test',
                'phone' => '09120000002',
            ],
            [
                'first_name' => 'مدیر',
                'last_name' => 'شرکت دوم',
                'name' => 'مدیر شرکت دوم',
                'email' => 'company2@skillbridge.test',
                'phone' => '09120000003',
            ],
            [
                'first_name' => 'مدیر',
                'last_name' => 'شرکت سوم',
                'name' => 'مدیر شرکت سوم',
                'email' => 'company3@skillbridge.test',
                'phone' => '09120000004',
            ],
        ];

        foreach ($companies as $company) {
            $user = User::firstOrCreate(
                ['email' => $company['email']],
                [
                    'first_name' => $company['first_name'],
                    'last_name' => $company['last_name'],
                    'name' => $company['name'],
                    'phone' => $company['phone'],
                    'password' => Hash::make('Company@123456'),
                ]
            );

            $user->assignRole('CompanyAdmin');
        }

                $specialists = [
            [
                'first_name' => 'علی',
                'last_name' => 'رضایی',
                'name' => 'علی رضایی',
                'email' => 'ali@skillbridge.test',
                'phone' => '09120000005',
            ],
            [
                'first_name' => 'محمد',
                'last_name' => 'احمدی',
                'name' => 'محمد احمدی',
                'email' => 'mohammad@skillbridge.test',
                'phone' => '09120000006',
            ],
            [
                'first_name' => 'رضا',
                'last_name' => 'کریمی',
                'name' => 'رضا کریمی',
                'email' => 'reza@skillbridge.test',
                'phone' => '09120000007',
            ],
            [
                'first_name' => 'حسین',
                'last_name' => 'محمدی',
                'name' => 'حسین محمدی',
                'email' => 'hossein@skillbridge.test',
                'phone' => '09120000008',
            ],
            [
                'first_name' => 'امیر',
                'last_name' => 'حسینی',
                'name' => 'امیر حسینی',
                'email' => 'amir@skillbridge.test',
                'phone' => '09120000009',
            ],
        ];

        foreach ($specialists as $specialist) {
            $user = User::firstOrCreate(
                ['email' => $specialist['email']],
                [
                    'first_name' => $specialist['first_name'],
                    'last_name' => $specialist['last_name'],
                    'name' => $specialist['name'],
                    'phone' => $specialist['phone'],
                    'password' => Hash::make('Specialist@123456'),
                ]
            );

            $user->assignRole('Specialist');
        }
    }
}
