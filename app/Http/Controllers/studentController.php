<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\student;
use App\Models\subject;
use App\Models\subject_taken;

class studentController extends Controller
{
    //admin get student list, if provide stud_id or name, it will give you revelant student, else display all

    public function getStudent($param = null)
    {
        $stud = null;

        if(is_null($param)) 
        {
            $stud = student::select('stud_id', 'stud_name', 'stud_email', 'programme', 'faculty', 'profile_picture')->get();
        } 
        else if(is_numeric($param)) 
        {
            $stud = student::where('stud_id', 'like', '%' . $param . '%')->select('stud_id', 'stud_name', 'stud_email', 'programme', 'faculty', 'profile_picture')->get();
        } 
        else 
        {
            $stud = student::where('stud_name', 'like', '%' . $param . '%')->select('stud_id', 'stud_name', 'stud_email', 'programme', 'faculty', 'profile_picture')->get();
        }

        if($stud->isEmpty())
        {
            return response()->json(['message' => 'No student yet..'], 200);
        }
        else
        {
            return response()->json($stud, 200);
        }
        
    }

    //lecturer get student list by subject
    public function getStudentsBySubject($sub_id)
    {
        $stud = DB::table('subject_takens')
        ->join('students', 'subject_takens.stud_id', '=', 'students.stud_id')
        ->where('subject_takens.sub_id', $sub_id)
        ->select('students.*') 
        ->get();

        if($stud -> isEmpty())
        {
            return response()->json(['message' => 'No student registered to this subject yet..'], 200);
        }
        else
        {
            return response()->json($stud, 200);
        }
            
    }

    //student subject details
    public function getSubDetails($sub_id)
    {
        $stud = DB::table('subject_takens')
            ->join('students', 'subject_takens.stud_id', '=', 'students.stud_id')
            ->join('subjects', 'subject_takens.sub_id', '=', 'subjects.sub_id')
            ->join('lecturers', 'subjects.id', '=', 'lecturers.id')
            ->where('subject_takens.sub_id', $sub_id)
            ->select('students.stud_id', 'students.stud_name', 'students.stud_email', 'students.faculty', 'students.profile_picture', 'lecturers.lec_name as lecturer_lec_name')
            ->get();

        if($stud -> isEmpty())
        {
            return response()->json(['message' => 'No student registered to this subject yet..'], 200);
        }
        else
        {
            return response()->json($stud, 200);
        }
    }

    //student profile
    public function getStudProfile(Request $req, $stud_id)
    {
        $stud = DB::table('students')->where('stud_id', $stud_id)->first();

        if (!$stud) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $stud_name = $stud->stud_name;
        $stud_email = $stud->stud_email;
        $faculty = $stud->faculty;
        $programme = $stud->programme;
        $profile_picture = $stud->profile_picture;

        $sub = DB::table('subject_takens')
        ->join('subjects', 'subject_takens.sub_id', '=', 'subjects.id')
        ->where('subject_takens.stud_id', $stud_id)
        ->select('subjects.*') 
        ->get();

        return response()->json([
            'stud_id' => $stud_id,
            'stud_name' => $stud_name,
            'stud_email' => $stud_email,
            'faculty' => $faculty,
            'programme' => $programme,
            'profile_pic' => $profile_picture,
            'enrolled_subjects' => $sub
        ], 200);
    }

    //admin add new student
    public function addStud(Request $req)
    {
        // $validatedData = $req->validate([
        //     'stud_id' => 'required|string|unique:student',
        //     'stud_name' => 'required|string|max:255',
        //     'stud_password' => 'required|string|min:6|max:20',
        //     'stud_email' => 'required|email|max:20|unique:student',
        //     'programme' => 'required|string|max:255',
        //     'faculty' => 'required|string|max:255',
        //     'sub_id' => 'required|string|unique:subject',
        // ]);

        $stud = new student;
        $stud->stud_id = $req->stud_id;
        $stud->stud_name = $req->stud_name;
        $stud->stud_password = bcrypt($req->stud_password);
        $stud->stud_email = $req->stud_email;
        $stud->programme = $req->programme;
        $stud->faculty = $req->faculty;
        $stud->sub_id = $req->sub_id;

        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/students', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/students/'.$imgName);
    
            // Store the URL in the student model
            $stud->profile_picture = $linkToImg;
        }

        $existingSub = subject::find($req->sub_id);
        if (!$existingSub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }
        
        if($req->has('sub_id'))
        {
            $subjectTaken = new subject_taken;
            $subjectTaken->stud_id = $req->stud_id;
            $subjectTaken->sub_id = $req->input('sub_id');
            $subjectTaken->save();
        }

        $result = $stud->save();

        if($result)
            return response()->json(['message' => 'Student added successfully!'], 201);
        else
            return response()->json(['message' => 'Student not added! Please try again!'], 400);
    }

    //admin update student
    public function updateStud(Request $req)
    {
        $stud = student::find($req->stud_id);
        $stud->stud_name = $req->stud_name;
        if ($req->stud_password) {
            $stud->stud_password = bcrypt($req->stud_password);
        }
        $stud->stud_email = $req->stud_email;
        $stud->programme = $req->programme;
        $stud->faculty = $req->faculty;

        $existingSub = subject::find($req->sub_id);
        if (!$existingSub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }

        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/students', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/students/'.$imgName);
    
            // Store the URL in the student model
            $stud->profile_picture = $linkToImg;
        }
        
        if($req->has('sub_id'))
        {
            $subjectTaken = new subject_taken;
            $subjectTaken->stud_id = $stud->stud_id;
            $subjectTaken->sub_id = $req->input('sub_id');
            $subjectTaken->save();
        }

        $result = $stud->save();

        if($result)
        {
            return response()->json(['message' => 'Student updated successfully!'], 201);
        }
        else
        {
            return response()->json(['message' => 'Student not updated! Please try again!'], 400);
        }
            
    }

    //student change password
    public function updateStudPassword(Request $req, $stud_id)
    {

        $stud = DB::table('students')->where('stud_id', $stud_id)->first();

        if (!$stud) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        if (Hash::check($req->old_password, $stud->stud_password)) 
        {
            DB::table('students')
                ->where('stud_id', $req->stud_id)
                ->update(['stud_password' => bcrypt($req->new_password)]);

            return response()->json(['message' => 'Password updated successfully'], 201);
        } 
        else 
        {
            return response()->json(['message' => 'Old password does not match'], 400);
        }

    }

    //admin delete student
    public function deleteStud($stud_id)
    {
        $stud = student::find($stud_id);

        if (!$stud) {
            return response()->json(['message' => 'Student not found!'], 404);
        }

        $result = $stud->delete();

        if($result)
            return response()->json(['message' => 'Student deleted successfully!'], 200);
        else
            return response()->json(['message' => 'Student not deleted! Please try again!'], 400);
    }
}
