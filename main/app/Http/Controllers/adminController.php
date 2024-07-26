<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\admin;
use Illuminate\Support\Facades\Log;

class adminController extends Controller
{
    //admin list
    public function getAdmin($param = null)
    {
        $admin = null;

        if(is_null($param))
        {
            $admin = DB::table('admins')->select('id', 'name', 'email', 'profile_picture')->get();
        } 
        else if(strpos($param, 'AD') === 0)
        {
            $admin = DB::table('admins')->where('id', 'like', '%' . $param . '%')->select('id', 'name', 'email', 'profile_picture')->get();
        } 
        else 
        {
            $admin = DB::table('admins')->where('name', 'like', '%' . $param . '%')->select('id', 'name', 'email', 'profile_picture')->get();
        }

        if($admin->isEmpty())
        {
            return response()->json(['message' => 'No admin yet..'], 200);
        }
        else
        {
            return response()->json($admin, 200);
        }
    }

    //admin Profile
    public function getAdminProfile($id)
    {
        $admin = DB::table('admins')->where('id', $id)->first();

        if (!$admin) {
            return response()->json(['message' => 'Lecturer not found'], 404);
        }

        $id = $admin->id;
        $name = $admin->name;
        $email = $admin->email;
        $profile_picture = $admin->profile_picture;

        return response()->json([
            'admin_id' => $id,
            'admin_name' => $name,
            'admin_email' => $email,
            'profile_pic' => $profile_picture,
        ], 200);
    }

    //Add admin
    public function addAdmin(Request $req)
    {
        
        $admin = new admin;
        $admin->id = $req->id;
        $admin->name = $req->name;
        $admin->password = bcrypt($req->password);
        $admin->email = $req->email;
        
        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/admin', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/admin/'.$imgName);
    
            // Store the URL in the adminturer model
            $admin->profile_picture = $linkToImg;
        }
        
        $result = $admin->save();
        // $result = adminturer::create($validatedData);
        if($result)
            return response()->json(['message' => 'Admin added successfully!'], 201);
        else
            return response()->json(['message' => 'Admin not added! Please try again!'], 400);
    }

    //admin update admin
    public function updateAdmin(Request $req)
    {
        $admin = admin::find($req->id);
        $admin->name = $req->name;
        if ($req->password) {
            $admin->password = bcrypt($req->password);
        }
        $admin->email = $req->email;

        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/admins', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/admins/'.$imgName);
    
            // Store the URL in the admin model
            $admin->profile_picture = $linkToImg;
        }
        
        $result = $admin->save();

        if($result)
            return response()->json(['message' => 'Admin updated successfully!'], 201);
        else
            return response()->json(['message' => 'Admin not updated! Please try again!'], 400);
    }

    //admin change password
    public function updateAdminPassword(Request $req, $id)
    {
        // Find the admin by ID
        $admin = DB::table('admins')->where('id', $id)->first();

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        // Check if the old password matches the current password
        if (Hash::check($req->old_password, $admin->password)) {
            // Log that the old password matched
            Log::info('Old password matched for admin ID: ' . $id);

            // Update the password
            $updated = DB::table('admins')
                ->where('id', $id)
                ->update(['password' => bcrypt($req->new_password)]);

            // Log the update status
            if ($updated) {
                Log::info('Password updated successfully for admin ID: ' . $id);
                return response()->json(['message' => 'Password updated successfully'], 201);
            } else {
                Log::error('Failed to update password for admin ID: ' . $id);
                return response()->json(['message' => 'Failed to update password'], 500);
            }
        } else {
            // Log the failed password check
            Log::warning('Old password does not match for admin ID: ' . $id);
            return response()->json(['message' => 'Old password does not match'], 400);
        }
    }

    
    //admin delete admin
    public function deleteAdmin($id)
    {
        $admin = admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin not found!'], 404);
        }

        $result = $admin->delete();

        if($result)
            return response()->json(['message' => 'admin deleted successfully!'], 200);
        else
            return response()->json(['message' => 'Admin not deleted! Please try again!'], 400);
    }

    public function uploadAdminPicture(Request $request, $id)
{
    $request->validate([
        'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $admin = Admin::find($id);

    if (!$admin) {
        return response()->json(['message' => 'Admin not found'], 404);
    }

    if ($request->hasFile('profile_picture')) {
        $file = $request->file('profile_picture');
        $filePath = $file->store('profile_pictures/admin', 'public');

        // Generate a URL to the stored picture
        $imgName = basename($filePath);
        $linkToImg = asset('storage/profile_pictures/admin/' . $imgName);

        // Store the URL in the admin model
        $admin->profile_picture = $linkToImg;
        $admin->save();

        return response()->json(['message' => 'Profile picture uploaded successfully!', 'profile_picture' => $linkToImg], 200);
    }

    return response()->json(['message' => 'Profile picture upload failed!'], 400);
}
    


}
