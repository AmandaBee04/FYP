<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\subject;
use App\Models\lecturer;
use App\Models\student;
use App\Models\lec_sub_takens;

class subjectController extends Controller
{
    //Admin get subject list
    public function getSubject($param = null)
    {
        $sub = null;

        if(is_null($param))
        {
            $sub = DB::table('subjects')
                ->select('subjects.*')
                ->get();
        } 
        else if(preg_match("/^[a-zA-Z]{3}\d{4}$/", $param))
        {
            $sub = DB::table('subjects')
                ->where('subjects.id', $param)
                ->select('subjects.*')
                ->get();
        } 
        else 
        {
            $sub = DB::table('subjects')
                ->where('subjects.name', 'like', '%' . $param . '%')
                ->select('subjects.*')
                ->get();
        }

        if($sub->isEmpty())
        {
            return response()->json(['message' => 'No subject yet..'], 200);
        }
        else
        {
            return response()->json($sub, 200);
        }
    }

    //subjects teach by specific lecturer(lecturer page)
    public function mySubject($lec_id)
    {
        $sub = DB::table('subjects')
            ->where('lec_id', $lec_id)
            ->get();

            if($sub->isEmpty())
            {
                return response()->json(['message' => 'No subject yet..'], 200);
            }
            else
            {
                return response()->json($sub, 200);
            }
    }

    //admin add new subject
    public function addSub(Request $req)
    {   
        // $validatedData = $req->validate([
        //     'sub_id' => 'required|string|unique:subject',
        //     'sub_name' => 'required|string|max:255',
        //     'lec_id' => 'required|string|unique:lecturer',
        // ]);

        $sub = new subject;
        $sub->id = $req->id;
        $sub->name = $req->name;
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

    //admin update subject
    public function updateSub(Request $req)
    {
        $sub = subject::find($req->id);
        $sub->name = $req->name;
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

    //admin delete subject
    public function deleteSub($id)
    {
        $sub = subject::find($id);

        if (!$sub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }

        $result = $sub->delete();

        if($result)
            return response()->json(['message' => 'Subject deleted successfully!'], 200);
        else
            return response()->json(['message' => 'Subject not deleted! Please try again!'], 400);
    }
}
