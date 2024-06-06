<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\student;
use App\Models\subject;
use App\Models\subject_taken;

class studentController extends Controller
{
    public function getStudent($stud_id = null, $stud_name = null)
    {
        if($stud_id)
        {
            return student::find($stud_id);
        }
        else if($stud_name)
        {
            return student::find($stud_name);
        }
        else
        {
            return student::all();
        }
    }

    public function addStud(Request $req, student $student)
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
        $result = $stud->save();
        
        if($req->has('sub_id'))
        {
            $subjectTaken = new subject_taken;
            $subjectTaken->stud_id = $req->stud_id;
            $subjectTaken->sub_id = $req->input('sub_id');
            $subjectTaken->save();
        }

        $existingSub = subject::find($req->sub_id);
        if (!$existingSub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }

        $result = $stud->save();

        if($result)
            return response()->json(['message' => 'Student added successfully!'], 201);
        else
            return response()->json(['message' => 'Student not added! Please try again!'], 400);
    }

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
        
        $result = $stud->save();

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
