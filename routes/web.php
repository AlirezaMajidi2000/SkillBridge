<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function () {
    return 'سلام، اولین route من در Laravel!';
});
Route::get('/home', function (){
    return view('home');
});

Route::put('/admin/users/{user}' , [UserController::class, 'updateRole'])->name('admin.user.updateRole');


Route::get('/admin/users', [UserController::class, 'index'])
    ->name('admin.users.index');
