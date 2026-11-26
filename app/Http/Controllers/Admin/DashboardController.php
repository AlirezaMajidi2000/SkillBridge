<?php

namespace App\Http\Controllers\Admin;



use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

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

    public function getRoles()
    {
        Gate::authorize('view-admin-dashboard');

        $roles = Role::with('permissions')
            ->where('guard_name', 'web')
            ->get();

        return response()->json($roles);
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
        Gate::authorize('view-admin-dashboard');

        $validated = $request->validate([
            'role' => ['required', 'string', 'max:255'],

            'englishName' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z][a-zA-Z0-9_-]*$/',
                Rule::unique('roles', 'name')
                    ->where('guard_name', 'web'),
            ],

            'permissions' => ['required', 'array', 'min:1'],

            'permissions.*' => [
                'required',
                'string',
                'in:users.create,users.delete,users.view,users.edit,roles.create,roles.delete,roles.view'
            ],
        ]);

        $role = DB::transaction(function () use ($validated) {

            $role = Role::create([
                'name' => $validated['englishName'],
                'display_name' => $validated['role'],
                'guard_name' => 'web',
            ]);

            $permissions = [];

            foreach ($validated['permissions'] as $permissionName) {

                $permissions[] = Permission::firstOrCreate([
                    'name' => $permissionName,
                    'guard_name' => 'web',
                ]);
            }

            $role->syncPermissions($permissions);

            return $role;
        });

        return response()->json([
            'message' => 'نقش با موفقیت ثبت شد.',
            'role' => $role->load('permissions'),
        ], 201);
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
        Gate::authorize('view-admin-dashboard');

        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],

            'last_name' => ['required', 'string', 'max:255'],

            'phone' => [
                'required',
                'string',
                Rule::unique('users', 'phone')->ignore($user->id),
            ],

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],

            'role' => [
                'required',
                Rule::exists('roles', 'name')->where('guard_name', 'web'),
            ],
        ]);

        $user->update([
            'first_name' => $validated['first_name'],

            'last_name' => $validated['last_name'],

            'name' => $validated['first_name'] . ' ' . $validated['last_name'],

            'phone' => $validated['phone'],

            'email' => $validated['email'],
        ]);

        $user->syncRoles([$validated['role']]);

        return response()->json([
            'message' => 'اطلاعات کاربر با موفقیت ویرایش شد.',

            'user' => [
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
            ],
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'کاربر با موفقیت حذف شد.');
    }


    public function deleteRole(Role $role)
    {
        Gate::authorize('view-admin-dashboard');

        if ($role->name === 'Admin') {
            return response()->json([
                'message' => 'امکان حذف نقش مدیر اصلی وجود ندارد.'
            ], 403);
        }

        $role->delete();

        return response()->json([
            'message' => 'نقش با موفقیت حذف شد.'
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('view-admin-dashboard');

        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'unique:users,phone'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'exists:roles,name,guard_name,web'],
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'name' => $validated['first_name'] . ' ' . $validated['last_name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        return response()->json([
            'message' => 'کاربر با موفقیت ایجاد شد.',

            'user' => [
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
            ],
        ], 201);
    }
}
