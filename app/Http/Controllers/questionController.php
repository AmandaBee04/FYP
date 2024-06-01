<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\question;
use App\Models\question_set;


class questionController extends Controller
{
    function getQuestion()
    {
        return question::all();
    }

    function addQues(Request $req)
    {
        // $validatedData = $req->validate([
        //     'id' => 'required|integer',
        //     'question' => 'required|string|max:255',
        //     'instruction' => 'nullable|string|max:255',
        //     'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'correct_ans' => 'required|string|max:255',
        //     'ans_a' => 'required|string|max:255',
        //     'ans_b' => 'required|string|max:255',
        //     'ans_c' => 'required|string|max:255',
        //     'ans_d' => 'required|string|max:255',
        //     'qs_id' => 'required|exists:question_sets,id',
        // ]);

        if ($req->hasFile('picture')) {
            $file = $req->file('picture');
            $filePath = $file->store('pictures', 'public'); 
            // Store the file in the 'pictures' directory within the 'public' disk
        }

        $ques = new question;
        $ques->id = $req->id;
        $ques->question = $req->question;
        $ques->instruction = $req->instruction;
        $ques->picture = $req->picture ?? null; // Save the file path if a file was uploaded, else null
        $ques->correct_ans = $req->correct_ans;
        $ques->ans_a = $req->ans_a;
        $ques->ans_b = $req->ans_b;
        $ques->ans_c = $req->ans_c;
        $ques->ans_d = $req->ans_d;
        $ques->qs_id = $req->qs_id;

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
}
