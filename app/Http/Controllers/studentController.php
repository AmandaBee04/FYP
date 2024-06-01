<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\student;
use App\Models\subject;

class studentController extends Controller
{
    function getStudent($stud_id = null, $stud_name = null)
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

    function addStud(Request $req)
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
}
