<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\stud_grade;
use App\Models\question_set;


class stud_gradeController extends Controller
{
    function getStudGrade($qs_id)
    {
        $questionSet = question_set::find($qs_id);
        if (!$questionSet) {
            return response()->json(['message' => 'Question set not found!'], 404);
        }

        $grades = $questionSet->grades;

        return response()->json($grades, 200);
    }

}
