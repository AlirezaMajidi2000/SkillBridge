<?php

namespace App\Http\Controllers\Admin;



use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Validation\Rule;

class DashboardController extends Controller
{

    public function index()
    {
        if (!Gate::allows('view-admin-dashboard')){
            abort(403,"شما مجوز دسترسی به این امکان را ندارید");
        }
        $users = User::with(['roles', 'permissions'])->get();
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();
//روش 1

        $users_count = User::whereHas('roles',function ($q){
            $q->where('name' , 'Specialist');
        })->count();

        //روش 2

        $company_count = User::role('CompanyAdmin')->count();

        return view('admin.dashboard', compact(
            'users',
            'roles',
            'permissions',
            'users_count',
            'company_count',
        ));
    }


    public function usersIndex()
    {
        Gate::authorize('view-admin-dashboard');
        $users = User::with('roles')->latest()->get();
        return view('admin.users', compact('users'));
    }

    public function rolesIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.roles');
    }

    public function opportunitiesIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.opportunities');
    }

    public function applicationsIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.applications');
    }
    public function skillsIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.skills');
    }
    public function supportIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.support');
    }
    public function notificationsIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.notifications');
    }
    public function reportsIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.reports');
    }
    public function settingsIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.settings');
    }
    public function profileIndex()
    {
        Gate::authorize('view-admin-dashboard');
        return view('admin.profile');
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
    public function addPermission(Request $request)
    {
        $permission = Permission::create([
            'name' => $request->create_role,
            'guard' => 'web'
        ]);
        return 'permission'.$permission->name. 'added';
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => [
                'required',
                'string',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role' => ['required', 'exists:roles,name,guard_name,web'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['username'],
        ]);

        $user->syncRoles($validated['role']);

        return back()->with('success', 'اطلاعات کاربر با موفقیت ویرایش شد.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'کاربر با موفقیت حذف شد.');
    }
}
