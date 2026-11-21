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
            ['email' => 'admin@skillbridge.test'],
            [
                'name' => 'مدیر کل',
                'password' => Hash::make('Admin@123456'),
            ]
        );

        $admin->assignRole('Admin');


        $companies = [
            [
                'name' => 'مدیر شرکت اول',
                'email' => 'company1@skillbridge.test',
            ],
            [
                'name' => 'مدیر شرکت دوم',
                'email' => 'company2@skillbridge.test',
            ],
            [
                'name' => 'مدیر شرکت سوم',
                'email' => 'company3@skillbridge.test',
            ],
        ];

        foreach ($companies as $company) {
            $user = User::firstOrCreate(
                ['email' => $company['email']],
                [
                    'name' => $company['name'],
                    'password' => Hash::make('Company@123456'),
                ]
            );

            $user->assignRole('CompanyAdmin');
        }


        $specialists = [
            ['name' => 'علی رضایی', 'email' => 'ali@skillbridge.test'],
            ['name' => 'محمد احمدی', 'email' => 'mohammad@skillbridge.test'],
            ['name' => 'رضا کریمی', 'email' => 'reza@skillbridge.test'],
            ['name' => 'حسین محمدی', 'email' => 'hossein@skillbridge.test'],
            ['name' => 'امیر حسینی', 'email' => 'amir@skillbridge.test'],
        ];

        foreach ($specialists as $specialist) {
            $user = User::firstOrCreate(
                ['email' => $specialist['email']],
                [
                    'name' => $specialist['name'],
                    'password' => Hash::make('Specialist@123456'),
                ]
            );

            $user->assignRole('Specialist');
        }
    }
}
