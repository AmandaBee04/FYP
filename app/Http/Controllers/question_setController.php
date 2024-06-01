<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\question_set;
use App\Models\subject;

class question_setController extends Controller
{
    function getQuestionSet()
    {
        return question_set::all();
    }

    function addQS(Request $req)
    {

        $qs = new question_set;
        $qs->id = $req->id;
        $qs->qs_name = $req->qs_name;
        $qs->type = $req->type;
        $qs->time = $req->time;
        $qs->due_date = $req->due_date;
        $qs->assign = $req->assign;
        $qs->total_mark = $req->total_mark;
        $qs->sub_id = $req->sub_id;

        $existingSub = subject::find($req->sub_id);
        if (!$existingSub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }

        $result = $qs->save();

        if($result)
            return response()->json(['message' => 'Question set added successfully!'], 201);
        else
            return response()->json(['message' => 'Question set not added! Please try again!'], 400);
    }
}
