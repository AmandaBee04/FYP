<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\question_set;
use App\Models\subject;
use App\Models\lecturer;

class question_setController extends Controller
{
    //quiztopia bank
    public function getAllQuestionSets()
    {
        $questionSets = DB::table('question_sets')
            ->orderBy('sub_id')
            ->get();

        return response()->json([$questionSets],200);
    }

    //lecturer dashboard
    public function myQuestionSets($lec_id)
    {
        $qs = DB::table('question_sets')
            ->where('lec_id', $lec_id)
            ->get();

        if ($qs->isEmpty()) 
        {
            return response()->json(['message' => 'No quiz found, please make your own quiz']);
        } 

        else 
        {
            return response()->json([$qs], 200);
        }
    }

    //get assigned quizzes
    public function getAssignedQuestionSets($assignLec_id)
    {
        $questionSets = DB::table('question_sets')
        ->join('lecturers', 'question_sets.assignLec_id', '=', 'lecturers.id')
        ->where('question_sets.assignLec_id', $assignLec_id)
        ->where('question_sets.assign', 1) 
        ->select('question_sets.*')
        ->get();

        if ($questionSets->isEmpty()) 
        {
            return response()->json(['message' => 'No assigned quiz found, please assign quiz']);
        } 

        else 
        {
            return response()->json([$questionSets], 200);
        }
    }

    //lecturer add question set
    public function addQS(Request $req)
    {
        $qs = new question_set;
        $qs->id = $req->id;
        $qs->qs_name = $req->qs_name;
        $qs->type = $req->type;
        $qs->time = $req->time;
        $qs->due_date = $req->due_date;
        $qs->assign = $req->assign;

        if ($req->assign == 1) 
        {
            $qs->assignLec_id = $req->lec_id;
        } 
        else 
        {
            $qs->assignLec_id = NULL;
        }

        $qs->total_mark = $req->total_mark;
        $qs->sub_id = $req->sub_id;
        $qs->lec_id = $req->lec_id;

        $existingSub = subject::find($req->sub_id);
        if (!$existingSub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }

        $existingLec = lecturer::find($req->lec_id);
        if (!$existingLec) {
            return response()->json(['message' => 'Lecturer not found!'], 404);
        }

        $result = $qs->save();

        if($result)
            return response()->json(['message' => 'Question set added successfully!'], 201);
        else
            return response()->json(['message' => 'Question set not added! Please try again!'], 400);
    }

    //lecturer update question set
    public function updateQS(Request $req, $id)
    {
        $qs = question_set::find($req->id);
        if (!$qs)
        {
            return response()->json(['message' => 'Question set not found!'], 404);
        }

        $qs->id = $req->id;
        $qs->qs_name = $req->qs_name;
        $qs->type = $req->type;
        $qs->time = $req->time;
        $qs->due_date = $req->due_date;
        $qs->assign = $req->assign;

        if ($req->assign == 1) 
        {
            $qs->assignLec_id = $id;
        } 
        else 
        {
            $qs->assignLec_id = NULL;
        }

        $qs->total_mark = $req->total_mark;
        $qs->sub_id = $req->sub_id;
        $qs->lec_id = $req->lec_id;

        $existingSub = subject::find($req->sub_id);
        if (!$existingSub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }

        $existingLec = lecturer::find($req->lec_id);
        if (!$existingLec) {
            return response()->json(['message' => 'Lecturer not found!'], 404);
        }

        $result = $qs->save();

        if($result)
            return response()->json(['message' => 'Question set updated successfully!'], 201);
        else
            return response()->json(['message' => 'Question set not updated! Please try again!'], 400);
    }

    //lecturer delete question set
    public function deleteQS($id)
    {
        $qs = question_set::find($id);

        if(!$qs)
        {
            return response()->json(['message' => 'Question set not found!'], 404);
        }

        $result = $qs->delete();

        if($result)
            return response()->json(['message' => 'Question set deleted successfully!'], 200);
        else
            return response()->json(['message' => 'Question set not deleted! Please try again!'], 400);

    }
}
