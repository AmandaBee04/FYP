<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\stud_ans;


class stud_ansController extends Controller
{
    //lecturer get student answer by stud_id and question_set id
    public function getStudAns($stud_id, $qs_id)
    {
        $student = DB::table('students')->where('stud_id', $stud_id)->first();
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }

        $questionSet = DB::table('question_sets')->where('id', $qs_id)->first(['qs_name', 'total_mark']); 
        if (!$questionSet) {
            return response()->json(['message' => 'Question set not found!'], 404);
        }

        $answers = DB::table('questions')
                    ->join('stud_ans', 'questions.id', '=', 'stud_ans.ques_id')
                    ->where('questions.qs_id', $qs_id)
                    ->where('stud_ans.stud_id', $stud_id)
                    ->select('stud_ans.answer', 'stud_ans.marks', 'stud_ans.stud_id') 
                    ->get();

        if ($answers->isEmpty()) {
            return response()->json(['message' => 'Student hasn\'t answered the questions yet'], 404);
        }
        else
        {
            return response()->json([
                'question_set_name' => $questionSet->qs_name,
                'total_mark' => $questionSet->total_mark,
                'stud_answers' => $answers
            ], 200);
        }
    }

    //student input answer
    public function addStudAns(Request $req, $stud_id, $id)
    {
        $existingAnswer = stud_ans::where('stud_id', $stud_id)->where('ques_id', $id)->first();

        if ($existingAnswer) {
            return response()->json(['message' => 'You have already attempted the answer for this question!'], 404);
        }

        $studAns = new stud_ans;
        $studAns->answer = $req->answer;
        $studAns->stud_id = $stud_id;
        $studAns->ques_id = $id;

        $result = $studAns->save();

        if($result)
            return response()->json(['message' => 'Answer submitted successfully!'], 201);
        else
            return response()->json(['message' => 'Answer not submitted! Please try again!'], 400);
    }

    //lecturer marking student written question
    public function markedStudAns(Request $req, $stud_id, $ques_id)
    {
        $studAns = stud_ans::where('stud_id', $stud_id)->where('ques_id', $ques_id)->first();
        if (!$studAns) {
            return response()->json(['message' => 'Student answer not found!'], 404);
        }

        $studAns->marks = $req->input('marks');

        if ($req->has('feedback')) {
            $studAns->feedback = $req->input('feedback');
        }
        else
        {
            $studAns->feedback = NULL;
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
            ->join('question_sets', 'stud_ans.ques_id', '=', 'question_sets.id')
            ->join('questions', 'stud_ans.ques_id', '=', 'questions.id') 
            ->where('stud_ans.stud_id', $stud_id)
            ->where('question_sets.id', $qs_id)
            ->whereNotNull('stud_ans.marks')
            ->select(
                'stud_ans.ques_id',
                'stud_ans.marks',
                'stud_ans.feedback',
                'questions.question', 
                'questions.ans_a', 
                'questions.ans_b', 
                'questions.ans_c',
                'questions.ans_d', 
                'questions.correct_ans'
            )
            ->get();
    
        if ($markedQuestions->isEmpty()) 
        {
            return response()->json(['message' => 'No marked questions found!'], 400);
        }
        else 
        {
            return response()->json($markedQuestions, 200);
        }
    }
}
