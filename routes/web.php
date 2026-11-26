<?php

use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Company\DashboardController as CompanyDashboardController;
use App\Http\Controllers\Specialist\DashboardController as SpecialistDashboardController;




Route::get('/', function () {
    return view('index');
});

Route::get('/home', [LandingController::class, 'index']);


use App\Models\User;


//تست سطح دسترسی
//Route::get('/specialist/{id}', function ($id) {
//
//    $user = User::findOrFail($id);
//
//    return $user;
//
//});

//تست//

Route::get('/test-role/{role}', [UserController::class, 'fetchRole']);

//تست//




Route::middleware(['auth' , 'role:Admin'])->group(function (){
    Route::put('/admin/users/{user}' , [AdminDashboardController::class, 'updateRole'])->name('admin.user.updateRole');
    Route::get('/admin/dashboard' , [AdminDashboardController::class , 'index'])->name('admin.dashboard');
    Route::get('/admin/users' , [AdminDashboardController::class , 'usersIndex'])->name('admin.users');
    Route::get('/admin/roles' , [AdminDashboardController::class , 'rolesIndex'])->name('admin.roles');
    Route::get('/admin/opportunities' , [AdminDashboardController::class , 'opportunitiesIndex'])->name('admin.opportunities');
    Route::get('/admin/applications' , [AdminDashboardController::class , 'applicationsIndex'])->name('admin.applications');
    Route::get('/admin/skills' , [AdminDashboardController::class , 'skillsIndex'])->name('admin.skills');
    Route::get('/admin/support' , [AdminDashboardController::class , 'supportIndex'])->name('admin.support');
    Route::get('/admin/notifications' , [AdminDashboardController::class , 'notificationsIndex'])->name('admin.notifications');
    Route::get('/admin/reports' , [AdminDashboardController::class , 'reportsIndex'])->name('admin.reports');
    Route::get('/admin/settings' , [AdminDashboardController::class , 'settingsIndex'])->name('admin.settings');
    Route::get('/admin/profile' , [AdminDashboardController::class , 'profileIndex'])->name('admin.profile');


    Route::post('/admin/permissions' , [AdminDashboardController::class , 'addPermission'])->name('admin.permissions.store');
    Route::post('/admin/roles' , [AdminDashboardController::class , 'createRole'])->name('admin.roles.store');




});

Route::middleware(['auth' , 'role:CompanyAdmin'])->group(function (){
    Route::get('/company/dashboard' , [CompanyDashboardController::class , 'index'])->name('company.dashboard');
});

Route::middleware(['auth' , 'role:Specialist'])->group(function (){
    Route::get('/specialist/dashboard' , [SpecialistDashboardController::class , 'index'])->name('specialist.dashboard');
});





//
//Route::get('/admin/users', [UserController::class, 'index'])
//    ->name('admin.users.index');
