<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Gate;
class UserController extends Controller
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
        return view('index', compact(
            'users',
            'roles',
            'permissions'
        ));
    }
    public function updateRole()
    {

        echo 'hello world';

    }
}
