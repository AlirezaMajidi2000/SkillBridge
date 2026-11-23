<?php

namespace App\Http\Controllers\Admin;



use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DashboardController extends Controller
{

    public function index()
    {
        if (!Gate::allows('view-admin-dashboard')){
            abort(403,"شما مجوز دسترسی به این امکان را ندارید");
        }
        Gate::authorize('view-admin-dashboard');
        $users = User::with(['roles', 'permissions'])->get();
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();
        return view('admin.dashboard', compact(
            'users',
            'roles',
            'permissions'
        ));
    }
    public function assignRole($userId, $role)
    {
        $user = User::findOrFail($userId);
        $user->assignRole($role);
        return 'Role assigned successfully';
    }

    public function updateRole(Request $request , $userId)
    {
        $user = User::findOrFail($userId);

        $request->validate([
            'role' => ['required', 'exists:roles,id'],
        ]);

        $role = Role::findOrFail($request->role);

        $user->syncRoles($role);
        return back()->with('success', 'نقش کاربر با موفقیت تغییر کرد.');
    }

    public function fetchRole($role)
    {
        $user_roles = User::role($role)->get();
        return($user_roles);
    }

    public function createRole(Request $request)
    {
        $role = Role::create([
         'name' => $request->create_role,
         'guard' => 'web'
        ]);

        return 'role added'. $role->id;
    }
    public function addPermission()
    {
        return 'permission added';
    }

}
