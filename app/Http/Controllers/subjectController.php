<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\subject;
use App\Models\lecturer;

class subjectController extends Controller
{
    public function getSubject($sub_id = null, $sub_name = null)
    {
        if($sub_id)
        {
            return subject::find($sub_id);
        }
        else if($sub_name)
        {
            return subject::find($sub_name);
        }
        else
        {
            return subject::all();
        }
    }

    public function addSub(Request $req)
    {   
        // $validatedData = $req->validate([
        //     'sub_id' => 'required|string|unique:subject',
        //     'sub_name' => 'required|string|max:255',
        //     'lec_id' => 'required|string|unique:lecturer',
        // ]);

        $sub = new subject;
        $sub->sub_id = $req->sub_id;
        $sub->sub_name = $req->sub_name;
        $sub->lec_id = $req->lec_id;

        $existingLec = lecturer::find($req->lec_id);
        if (!$existingLec) {
            return response()->json(['message' => 'Lecturer not found!'], 404);
        }

        $result = $sub->save();
        if($result)
            return response()->json(['message' => 'Subject added successfully!'], 201);
        else
            return response()->json(['message' => 'Subject not added! Please try again!'], 400);
    }

    public function updateSub(Request $req)
    {
        $sub = subject::find($req->sub_id);
        $sub->sub_name = $req->sub_name;
        $sub->lec_id = $req->lec_id;

        $existingLec = lecturer::find($req->lec_id);
        if (!$existingLec) {
            return response()->json(['message' => 'Lecturer not found!'], 404);
        }
        
        $result = $sub->save();
        // $result = lecturer::create($validatedData);
        if($result)
            return response()->json(['message' => 'Subject updated successfully!'], 201);
        else
            return response()->json(['message' => 'Subject not updated! Please try again!'], 400);
    }
}
