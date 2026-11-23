<?php

namespace App\Providers;
use App\Http\Responses\LoginResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\ServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Fortify;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(
            LoginResponseContract::class,
            LoginResponse::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Gate::define('view-admin-dashboard' , function (User $user){
            return $user->hasRole('Admin');
        });


        Fortify::authenticateUsing(function (Request $request) {

            $login = trim($request->input('login'));

            $field = filter_var($login, FILTER_VALIDATE_EMAIL)
                ? 'email'
                : 'phone';

            $user = User::where($field, $login)->first();

            if ($user && Hash::check($request->password, $user->password)) {
                return $user;
            }

            return null;
        });

    }
}
