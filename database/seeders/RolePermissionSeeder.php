<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'manage-users',
            'manage-companies',
            'manage-roles',
            'manage-permissions',
            'manage-referrals',
            'manage-interview-requests',
            'view-referred-specialists',
            'view-specialist-resume',
            'send-interview-request',
            'manage-company-profile',
            'manage-own-profile',
            'manage-own-resume',
            'manage-own-skills',
            'view-own-interview-requests',
            'respond-to-interview-request',
            'view-similar-specialists',
            'view-own-score',
            'manage-scoring-criteria',
            'manage-user-scores',
            'view-reports',
            'view-activity-logs',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $admin = Role::firstOrCreate([
            'name' => 'Admin',
            'guard_name' => 'web',
        ]);

        $companyAdmin = Role::firstOrCreate([
            'name' => 'CompanyAdmin',
            'guard_name' => 'web',
        ]);

        $specialist = Role::firstOrCreate([
            'name' => 'Specialist',
            'guard_name' => 'web',
        ]);

        $admin->syncPermissions(Permission::all());

        $companyAdmin->syncPermissions([
            'view-referred-specialists',
            'view-specialist-resume',
            'send-interview-request',
            'manage-company-profile',
            'view-own-interview-requests',
        ]);

        $specialist->syncPermissions([
            'manage-own-profile',
            'manage-own-resume',
            'manage-own-skills',
            'view-own-interview-requests',
            'respond-to-interview-request',
            'view-similar-specialists',
            'view-own-score',
        ]);

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
