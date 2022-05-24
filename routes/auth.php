<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [EmailVerificationPromptController::class, '__invoke'])
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

Route::get('/auth/redirect', function () {
    return Socialite::driver('twitter')->redirect();
});

Route::get('callback', function () {
    try {
        $user = Socialite::driver('twitter')->user();
    }catch (Exception $e) {
        Log::info($e);
        redirect('/');
        return;
    }
    Log::info($user->getId()); // id-str
    Log::info($user->getName());  // これが名前
    Log::info($user->getNickname()); // @xxx
    Log::info($user->getEmail());  // メールアドレスは取得できない系？
    Log::info($user->getAvatar());  // icon url

    $token = $user->token;
    $tokenSecret = $user->tokenSecret;
    Log::info($token);
    Log::info($tokenSecret);

    $userDetail = Socialite::driver('twitter')->userFromTokenAndSecret($token, $tokenSecret);
    Log::info('---- 2 ----');
    Log::info($userDetail->getId()); // id-str
    Log::info($userDetail->getName());  // これが名前
    Log::info($userDetail->getNickname()); // @xxx
    Log::info($userDetail->getEmail());  // メールアドレスは取得できない系？
    Log::info($userDetail->getAvatar());  // icon url;

    // TODO: ID を保存して同じだったらアレするをアレする。
});
