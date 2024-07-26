<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\lecturer;
use App\Models\student;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetEmail;
use App\Mail\PasswordResetSuccessEmail;


class password_resetController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $lecturer = Lecturer::where('email', $request->email)->first();
        $student = Student::where('stud_email', $request->email)->first();

        if ($lecturer || $student) {

            // Check if there's already a token for this email
            $existingToken = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

            if ($existingToken && now()->lessThan($existingToken->expires_at)) {
                return response()->json([
                    'message' => 'A password reset request has already been made. Please check your email.',
                    'code' => 400,
                ], 400);
            }

            // Generate a unique token
            $token = Str::random(20);

            // Debugging: Check the type of $token
            if (is_array($token)) {
                throw new \Exception('Token is an array');
            }

            $expirationTimestamp = now()->addMinutes(15);

            // Store the token in the database
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => now(),
                'expires_at' => $expirationTimestamp,
            ]);

            $resetLink = 'http://localhost:5173/Login/Reset_Password?token=' . $token;

            // Debugging: Check the reset link
            if (is_array($resetLink)) {
                throw new \Exception('Reset link is an array');
            }

            if ($lecturer) {
                $userName = $lecturer->name;
                $email = $lecturer->email;
                $userType = 'lecturer';
            } else {
                $userName = $student->stud_name; 
                $email = $student->stud_email;
                $userType = 'student';
            }


            Mail::to($email)->send(new PasswordResetEmail($resetLink, $userName));

            // Return a consistent response
            return response()->json([
                'message' => 'Your password reset link has been sent.',
                'code' => 200,
                'user_type' => $userType,
                'user_name' => $userName,
                'reset_link' => $resetLink,
            ], 200);
        }

        // If user not found, return an error
        return response()->json([
            'message' => 'User not found, please make sure use your school email',
            'code' => 404,
        ], 404);
    }

    public function resetPassword(Request $request)
    {
        DB::table('password_reset_tokens')
        ->where('expires_at', '<', now()->subMinutes(30))
        ->delete();

        // Validate the token and find the associated email
        $tokenData = DB::table('password_reset_tokens')
            ->where('token', $request->token)
            ->first();

        if (!$tokenData) {
            return response()->json([
                'message' => 'Invalid token',
                'code' => 400,
            ], 400);
        }

        if (now()->greaterThan($tokenData->expires_at)) {
            
            return response()->json([
                'message' => 'Token has expired',
                'code' => 400,
            ], 400);
        }

        // Determine user type (lecturer or student)
        $lecturer = Lecturer::where('email', $tokenData->email)->first();
        $student = Student::where('stud_email', $tokenData->email)->first();

        if (!$lecturer && !$student) {
            return response()->json([
                'message' => 'User not found',
                'code' => 404,
            ], 404);
        }

        if ($lecturer) {
            $lecturer->password = Hash::make($request->password);
            $lecturer->save();

            // Clean up the used token
            DB::table('password_reset_tokens')
                ->where('token', $request->token)
                ->delete();

            Mail::to($lecturer->email)->send(new PasswordResetSuccessEmail($lecturer->name));

            return response()->json([
                'message' => 'Password reset successful',
                'code' => 200,
            ], 200);
        } else {
            $student->password = Hash::make($request->password);
            $student->save();

            // Clean up the used token
            DB::table('password_reset_tokens')
                ->where('token', $request->token)
                ->delete();

            Mail::to($student->stud_email)->send(new PasswordResetSuccessEmail($student->stud_name));

            return response()->json([
                'message' => 'Password reset successful',
                'code' => 200,
            ], 200);
        }
    }
}
