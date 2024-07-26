<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\lecturer;

class lecturerController extends Controller
{
    //admin get lecturer list, if provide lec_id or name, it will give you revelant lecturer, else display all
    public function getLecturer($param = null)
    {
        $lec = null;

        if(is_null($param))
        {
            $lec = DB::table('lecturers')->select('id', 'name', 'email', 'profile_picture')->get();
        } 
        else if(strpos($param, 'MU') === 0)
        {
            $lec = DB::table('lecturers')->where('id', 'like', '%' . $param . '%')->select('id', 'name', 'email', 'profile_picture')->get();
        } 
        else 
        {
            $lec = DB::table('lecturers')->where('name', 'like', '%' . $param . '%')->select('id', 'name', 'email', 'profile_picture')->get();
        }

        if($lec->isEmpty())
        {
            return response()->json(['message' => 'No lecturer yet..'], 200);
        }
        else
        {
            return response()->json($lec, 200);
        }
    }

    //lecturer profile
    public function getLecProfile($id)
    {
        $lec = DB::table('lecturers')->where('id', $id)->first();

        if (!$lec) {
            return response()->json(['message' => 'Lecturer not found'], 404);
        }

        $name = $lec->name;
        $email = $lec->email;
        $profile_picture = $lec->profile_picture;

        $subjects = DB::table('subjects')
        ->where('lec_id', $id)
        ->select('subjects.*') 
        ->get();

        return response()->json([
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'profile_pic' => $profile_picture,
            'taught_subjects' => $subjects
        ], 200);
    }

    //admin add lecturer
    public function addLec(Request $req)
    {
        
        $lec = new lecturer;
        $lec->id = $req->id;
        $lec->name = $req->name;
        $lec->password = bcrypt($req->password);
        $lec->email = $req->email;
        
        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/lecturers', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/lecturers/'.$imgName);
    
            // Store the URL in the lecturer model
            $lec->profile_picture = $linkToImg;
        }
        
        $result = $lec->save();
        // $result = lecturer::create($validatedData);
        if($result)
            return response()->json(['message' => 'Lecturer added successfully!'], 201);
        else
            return response()->json(['message' => 'Lecturer not added! Please try again!'], 400);
    }

    //admin update lecturer
    public function updateLec(Request $req)
    {
        $id = $req->id;
        $lec = Lecturer::where('id', $id)->first();
        $lec->name = $req->name;
        if ($req->password) {
            $lec->password = bcrypt($req->password);
        }
        $lec->email = $req->email;

        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/lecturers', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/lecturers/'.$imgName);
    
            // Store the URL in the lecturer model
            $lec->profile_picture = $linkToImg;
        }
        
        $result = $lec->save();

        if($result)
            return response()->json(['message' => 'Lecturer updated successfully!'], 201);
        else
            return response()->json(['message' => 'Lecturer not updated! Please try again!'], 400);
    }

    //lecturer change password
    public function updateLecPassword(Request $req, $id)
    {

        $lec = DB::table('lecturers')->where('id', $id)->first();

        if (Hash::check($req->old_password, $lec->password)) 
        {
            DB::table('lecturers')
                ->where('id', $id)
                ->update(['password' => bcrypt($req->new_password)]);

            // Return a success message
            return response()->json(['message' => 'Password updated successfully'], 201);
        } 
        else 
        {
            // Return an error message
            return response()->json(['message' => 'Old password does not match'], 400);
        }

    }

    //admin delete lecturer
    public function deleteLec($id)
    {
        $lec = lecturer::find($id);

        if (!$lec) {
            return response()->json(['message' => 'Lecturer not found!'], 404);
        }

        $result = $lec->delete();

        if($result)
            return response()->json(['message' => 'Lecturer deleted successfully!'], 200);
        else
            return response()->json(['message' => 'Lecturer not deleted! Please try again!'], 400);
    }

    public function uploadProfilePicture(Request $request, $id)
{
    $request->validate([
        'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $lecturer = Lecturer::find($id);

    if ($request->hasFile('profile_picture')) {
        $file = $request->file('profile_picture');
        $filePath = $file->store('profile_pictures/lecturers', 'public'); 

        // Generate a URL to the stored picture
        $imgName = basename($filePath);
        $linkToImg = asset('/storage/profile_pictures/lecturers/'.$imgName);

        // Store the URL in the lecturer model
        $lecturer->profile_picture = $linkToImg;
        $lecturer->save();

        return response()->json(['message' => 'Profile picture uploaded successfully!', 'profile_picture' => $linkToImg], 200);
    }

    return response()->json(['message' => 'Profile picture upload failed!'], 400);
}

public function getLecturerProfilePicture($id)
{
    $lecturer = Lecturer::find($id);

    if ($lecturer && $lecturer->profile_picture) {
        return response()->json(['profile_picture' => $lecturer->profile_picture], 200);
    }

    return response()->json(['message' => 'Profile picture not found'], 404);
}

}


