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


Route::middleware(['auth' , 'role:Admin'])->group(function (){
    Route::get('/admin/dashboard' , [AdminDashboardController::class , 'index'])->name('admin.dashboard');
});

Route::middleware(['auth' , 'role:Company'])->group(function (){
    Route::get('/company/dashboard' , [CompanyDashboardController::class , 'index'])->name('company.dashboard');
});

Route::middleware(['auth' , 'role:Specialist'])->group(function (){
    Route::get('/specialist/dashboard' , [SpecialistDashboardController::class , 'index'])->name('specialist.dashboard');
});



Route::put('/admin/users/{user}' , [UserController::class, 'updateRole'])->name('admin.user.updateRole');


//
//Route::get('/admin/users', [UserController::class, 'index'])
//    ->name('admin.users.index');
