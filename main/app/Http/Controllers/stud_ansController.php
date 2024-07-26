<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\stud_ans;
use App\Models\student;
use App\Models\question_set;
use App\Models\question;

class stud_ansController extends Controller
{
    //lecturer get student answer
    public function getStudAns($stud_id, $qs_id)
    {
        $student = student::find($stud_id);
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }

        $questionSet = question_set::find($qs_id);
        if (!$questionSet) {
            return response()->json(['message' => 'Question set not found!'], 404);
        }

        $questions = question::where('qs_id', $qs_id)->get();

        $answers = [];
        foreach ($questions as $question) {
            $answer = stud_ans::where('stud_id', $stud_id)->where('ques_id', $question->id)->get();
            if ($answer) {
                $answers[] = $answer;
            }
        }

        return response()->json(['student' => $student, 'question_set' => $questionSet, 'stud_answers' => $answers], 200);

    }

    //lecturer marking student written question
    public function markedStudAns(Request $req, $stud_id, $ques_id)
    {
        $studAns = stud_ans::where('stud_id', $stud_id)->where('ques_id', $ques_id)->get();
        if (!$studAns) {
            return response()->json(['message' => 'Student answer not found!'], 404);
        }

        $studAns->marks = $req->input('marks');

        if ($req->has('feedback')) {
            $studAns->feedback = $req->input('feedback');
        }

        $result = $studAns->save();

        if($result)
            return response()->json(['message' => 'Student answer updated successfully!'], 201);
        else
            return response()->json(['message' => 'Student answer not updated! Please try again!'], 400);
    }

    //student review marked question
    public function getMarkedQuestions($stud_id, $qs_id)
    {
        $markedQuestions = DB::table('stud_ans')
            ->join('question_sets', 'stud_anss.ques_id', '=', 'question_sets.id')
            ->where('stud_anss.stud_id', $stud_id)
            ->where('question_sets.id', $qs_id)
            ->whereNotNull('stud_anss.marks')
            ->select('stud_anss.ques_id', 'stud_anss.marks', 'stud_anss.feedback')
            ->get();

        if ($markedQuestions->isEmpty()) 
        {
            return response()->json(['message' => 'No marked questions found!'], 400);
        }

        else 
        {
            return response()->json($markedQuestions, 201);
        }
    }

    public function updateStudAns(Request $request, $stud_id, $ques_id)
{
    $validatedData = $request->validate([
        'feedback' => 'nullable|string',
        'marks' => 'required|numeric',
    ]);

    $studAns = stud_ans::where('stud_id', $stud_id)
        ->where('ques_id', $ques_id)
        ->first();

    if (!$studAns) {
        return response()->json(['message' => 'Answer not found!'], 404);
    }

    $studAns->update([
        'feedback' => $validatedData['feedback'],
        'marks' => $validatedData['marks'],
    ]);

    return response()->json(['message' => 'Answer updated successfully', 'data' => $studAns], 200);
}
}
