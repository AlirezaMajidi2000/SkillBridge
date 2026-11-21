<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        if ($user->hasRole('Admin')) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->hasRole('CompanyAdmin')) {
            return redirect()->route('company.dashboard');
        }

        if ($user->hasRole('Specialist')) {
            return redirect()->route('specialist.dashboard');
        }

        abort(403, 'شما نقش معتبری برای ورود ندارید.');
    }
}
