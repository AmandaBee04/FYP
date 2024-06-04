<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\lecturer;

class lecturerController extends Controller
{
    public function getLecturer($lec_id = null, $lec_name = null)
    {
        if($lec_id)
        {
            return lecturer::find($lec_id);
        } 
        else if($lec_name)
        {
            return lecturer::where('lec_name', $lec_name)->first();
        } 
        else 
        {
            return lecturer::all();
        }
    }

    public function addLec(Request $req)
    {
        // $validatedData = $req->validate([
        //     'lec_id' => 'required|string|unique:lecturer',
        //     'lec_name' => 'required|string|max:255',
        //     'lec_password' => 'required|string|min:6|max:255',
        //     'lec_email' => 'required|email|max:255|unique:lecturer',
        // ]);
        
        $lec = new lecturer;
        $lec->lec_id = $req->lec_id;
        $lec->lec_name = $req->lec_name;
        $lec->lec_password = bcrypt($req->lec_password);
        $lec->lec_email = $req->lec_email;
        
        $result = $lec->save();
        // $result = lecturer::create($validatedData);
        if($result)
            return response()->json(['message' => 'Lecturer added successfully!'], 201);
        else
            return response()->json(['message' => 'Lecturer not added! Please try again!'], 400);
    }

    public function updateLec(Request $req)
    {
        $lec = lecturer::find($req->lec_id);
        $lec->lec_name = $req->lec_name;
        if ($req->lec_password) {
            $lec->lec_password = bcrypt($req->lec_password);
        }
        $lec->lec_email = $req->lec_email;
        
        $result = $lec->save();
        
        if($result)
            return response()->json(['message' => 'Lecturer updated successfully!'], 201);
        else
            return response()->json(['message' => 'Lecturer not updated! Please try again!'], 400);
    }

}
