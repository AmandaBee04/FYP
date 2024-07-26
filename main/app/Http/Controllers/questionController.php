<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\question;
use App\Models\question_set;
use App\Models\stud_ans;


class questionController extends Controller
{
    //display all question by question set
    public function getQuestion($qs_id)
    {
        $questions = DB::table('questions')
        ->where('qs_id', $qs_id)
        ->get();

        if ($questions->isEmpty()) 
        {
            return response()->json(['message' => 'No question found, please add new question']);
        } 

        else 
        {
            return response()->json([$questions], 200);
        }
    }

    //lecturer add question
    public function addQues(Request $req)
    {
        

        $ques = new question;
        $ques->id = $req->id;
        $ques->question = $req->question;
        $ques->marks = $req->marks;
        $ques->picture = $req->picture ?? null; // Save the file path if a file was uploaded, else null
        $ques->correct_ans = $req->correct_ans;
        $ques->ans_a = $req->ans_a;
        $ques->ans_b = $req->ans_b;
        $ques->ans_c = $req->ans_c;
        $ques->ans_d = $req->ans_d;
        $ques->feedback = $req->feedback;
        $ques->qs_id = $req->qs_id;

        if ($req->hasFile('picture')) {
            $file = $req->file('questions');
            $filePath = $file->store('question/pictures', 'public'); 
        }

        $existingQS = question_set::find($req->qs_id);
        if (!$existingQS) {
            return response()->json(['message' => 'Question set not found!'], 404);
        }
        
        $result = $ques->save();

        if($result)
            return response()->json(['message' => 'Question added successfully!'], 201);
        else
            return response()->json(['message' => 'Question not added! Please try again!'], 400);
    }

    //lecturer update question
    public function updateQues(Request $req)
    {
        $questions = $req->input('questions');

        foreach ($questions as $questionData) {
            if (isset($questionData['id']) && strpos($questionData['id'], 'new-') === 0) {
                // This is a new question
                $question = new Question;
            } else {
                // This is an existing question
                $question = Question::find($questionData['id']);
                if (!$question) {
                    return response()->json(['message' => 'Question not found!'], 404);
                }
            }
    
            $question->question = $questionData['question'] ?? '';
            $question->marks = $questionData['marks'] ?? 1;
            $question->picture = $questionData['picture'] ?? null;
            $question->correct_ans = $questionData['correct_ans'] ?? '';
            $question->ans_a = $questionData['ans_a'] ?? '';
            $question->ans_b = $questionData['ans_b'] ?? '';
            $question->ans_c = $questionData['ans_c'] ?? '';
            $question->ans_d = $questionData['ans_d'] ?? '';
            $question->feedback = $questionData['feedback'] ?? '';
            $question->qs_id = $questionData['qs_id'];
    

        if ($req->hasFile('picture')) {
            $file = $req->file('questions');
            $filePath = $file->store('question/pictures', 'public'); 
            $ques->picture = $filePath;
        }

        $existingQS = question_set::find($question['qs_id']);
        if (!$existingQS) {
            return response()->json(['message' => 'Question set not found!'], 404);
        }
        
        $question->save();
    }

    return response()->json(['message' => 'Questions updated successfully!'], 200);
}

    //lecturer delete question
    public function deleteQues(Request $request)
    {
        $questionIds = $request->input('questionsToDelete');
    
        if (empty($questionIds)) {
            return response()->json(['message' => 'No questions to delete'], 400);
        }
    
        $result = question::whereIn('id', $questionIds)->delete();
    
        if ($result) {
            return response()->json(['message' => 'Questions deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Questions not deleted! Please try again!'], 400);
        }
    }
    

    public function saveAnswer(Request $request) {
        $validatedData = $request->validate([
            'stud_id' => 'required',
            'ques_id' => 'required',
            'answer' => 'required',
            'marks' => 'required',
            // Add other fields to validate if needed...
        ]);
    
        $studAns = stud_ans::create([
            'stud_id' => $validatedData['stud_id'],
            'ques_id' => $validatedData['ques_id'],
            'answer' => $validatedData['answer'],
            'marks' => $validatedData['marks'],
            'remark' => $validatedData['marks'] > 0 ? 'Correct' : 'Incorrect'
        ]);
    
        return response()->json($studAns, 201);
    }
}
