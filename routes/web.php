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
