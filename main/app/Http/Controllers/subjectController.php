<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\subject;
use App\Models\lecturer;
use App\Models\student;
use App\Models\subject_taken;
use Illuminate\Support\Facades\Log;

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

            // Handle the relationship manually if needed
            subject_taken::where('sub_id', $id)->delete();
            student::where('sub_id', $id)->update(['sub_id' => null]);

            $result = $sub->delete();

            if($result) {
                return response()->json(['message' => 'Subject deleted successfully!'], 200);
            } else {
                return response()->json(['message' => 'Subject not deleted! Please try again!'], 400);
            }
        }


    public function getSubjectsAndStudentCount($lecturerId)
    {
        $subjects = subject::withCount('subject_taken')
            ->where('lec_id', $lecturerId)
            ->get();

            \Log::info($subjects);

        return response()->json($subjects);
    }

    public function addStudentToSubject(Request $request)
    {

        // Logic to insert into subject_taken table
        subject_taken::create([
            'stud_id' => $request->input('student_id'),
            'sub_id' => $request->input('subject_id'),
        ]);

        return response()->json(['message' => 'Student added to subject successfully']);
    }

    public function removeStudent($sub_id, $stud_id)
{
    // Find the subject_taken record
    $subjectTaken = subject_taken::where('sub_id', $sub_id)
                                 ->where('stud_id', $stud_id)
                                 ->first();

    if (!$subjectTaken) {
        return response()->json(['message' => 'Student not found in this subject'], 404);
    }

    // Delete the record
    $subjectTaken->delete();

    return response()->json(['message' => 'Student removed from subject successfully']);
}

}
