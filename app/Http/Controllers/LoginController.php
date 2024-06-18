<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Log;
use App\Models\student;
use App\Models\lecturer;
use App\Models\admin;


class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $id = $credentials['id'];
        $password = $credentials['password'];

        // Determine the guard and fields based on the ID format using strpos
        $role = '';
        if (is_numeric($id)) {
            // Numerical ID - Student
            $guard = 'students';
            $emailField = 'id';
            $passwordField = 'password';
            $role = 'student';
        } elseif (strpos($id, 'MU') === 0) {
            // ID starts with MU - Lecturer
            $guard = 'lecturers';
            $emailField = 'id';
            $passwordField = 'password';
            $role = 'lecturer';
        } elseif (strpos($id, 'AD') === 0) {
            // ID starts with AD - Admin
            $guard = 'admins';
            $emailField = 'id';
            $passwordField = 'password';
            $role = 'admin';
        } else {
            return response(['error' => 'Invalid ID format'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Attempt to authenticate the user using the determined guard
        if (!Auth::guard($guard)->attempt([$emailField => $id, 'password' => $password])) {
            Log::error('Login attempt failed for user: ' . $id);
            return response(['error' => 'Incorrect ID or password'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = Auth::guard($guard)->user();

        // Generate a new plain text token
        $plainTextToken = $user->createToken($user->id)->plainTextToken;
        Log::info('Plain text token created for user: ' . $user->id, ['token' => $plainTextToken]);

        // Encrypt the plain text token
        $encryptedToken = Crypt::encryptString($plainTextToken);
        Log::info('Encrypted token for user: ' . $user->id, ['token' => $encryptedToken]);

        // Create JWT payload
        $payload = [
            'sub' => $user->id,
            'data' => $encryptedToken,
            'exp' => now()->addHours(1)->timestamp // Optional expiration time
        ];

        // Encode the payload into a JWT
        $jwt = JWT::encode($payload, config('app.jwt_key'), 'HS256');
        Log::info('JWT created for user: ' . $user->id, ['jwt' => $jwt]);

        // Create the cookie with the JWT (optional)
        $cookie = cookie('jwt', $jwt, 60); // Cookie expires in 60 minutes

        // Return the JWT and role in the response body
        return response(['message' => 'Login successful', 'jwt' => $jwt, 'role' => $role])->withCookie($cookie);
    }
}