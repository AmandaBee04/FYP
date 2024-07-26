<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\question_set;
use App\Models\subject;
use App\Models\lecturer;
use App\Models\question;
use App\Models\stud_grade;

class question_setController extends Controller
{
    //quiztopia bank
    public function getAllQuestionSets()
{
    $questionSets = DB::table('question_sets')
        ->leftJoin('questions', 'question_sets.id', '=', 'questions.qs_id')
        ->leftJoin('subjects', 'question_sets.sub_id', '=', 'subjects.id')
        ->leftJoin('lecturers', 'question_sets.lec_id', '=', 'lecturers.id')
        ->select('question_sets.*', 'subjects.name as subject_name', 'lecturers.name as lecturer_name', DB::raw('COUNT(questions.id) as question_count'))
        ->groupBy('question_sets.id', 'subjects.name', 'lecturers.name')
        ->orderBy('question_sets.sub_id')
        ->get();

    return response()->json($questionSets, 200);
}

public function getAllQuestionSetsStudent($stud_id)
{
    // Get all completed quizzes for the student
    $completedQuizzes = DB::table('stud_grades')
        ->where('stud_id', $stud_id)
        ->pluck('qs_id'); 

    // Get all subjects taken by the student
    $subjectsTaken = DB::table('subject_takens')
        ->where('stud_id', $stud_id)
        ->pluck('sub_id');

    // Get all question sets
    $questionSets = DB::table('question_sets')
        ->leftJoin('questions', 'question_sets.id', '=', 'questions.qs_id')
        ->leftJoin('subjects', 'question_sets.sub_id', '=', 'subjects.id')
        ->leftJoin('lecturers', 'question_sets.lec_id', '=', 'lecturers.id')
        ->where('question_sets.type', 'Multiple Question')
        ->where(function($query) use ($subjectsTaken, $completedQuizzes) {
            $query->whereNotIn('question_sets.sub_id', $subjectsTaken)
                  ->orWhere(function($query) use ($subjectsTaken) {
                      $query->whereIn('question_sets.sub_id', $subjectsTaken)
                            ->where('question_sets.assign', 0);
                  })
                  ->orWhereIn('question_sets.id', $completedQuizzes);
        })
        ->select('question_sets.*', 'subjects.name as subject_name', 'lecturers.name as lecturer_name', DB::raw('COUNT(questions.id) as question_count'))
        ->groupBy('question_sets.id', 'subjects.name', 'lecturers.name')
        ->orderBy('question_sets.sub_id')
        ->get();

    return response()->json($questionSets, 200);
}



    //lecturer dashboard
    public function myQuestionSets($lec_id)
    {
        $qs = DB::table('question_sets')
        ->leftJoin('questions', 'question_sets.id', '=', 'questions.qs_id')
        ->select(
            'question_sets.*',
            'lecturers.name as lecturer_name',
            DB::raw('COUNT(questions.id) as question_count')
        )
        ->join('lecturers', 'question_sets.lec_id', '=', 'lecturers.id')
        ->where('question_sets.lec_id', $lec_id)
        ->groupBy('question_sets.id')
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

    public function getCompletedQuizzes($stud_id)
{
    $completedQuizzes = DB::table('stud_grades')
        ->where('stud_id', $stud_id)
        ->pluck('qs_id'); // Only retrieve the question set IDs

    return response()->json($completedQuizzes, 200);
}

    //lecturer add question set
    public function addQS(Request $req)
    {
        $qs = new question_set;
        // $qs->id = $req->id;
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
            return response()->json(['message' => 'Question set added successfully!', 'id' => $qs->id], 201);
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

        $qs->question()->delete();
        $result = $qs->delete();

        if($result)
            return response()->json(['message' => 'Question set deleted successfully!'], 200);
        else
            return response()->json(['message' => 'Question set not deleted! Please try again!'], 400);

    }

    public function getQuestionSetsBySubject($sub_id)
    {
        $questionSets = question_set::with('subjects')
                        ->withCount('question')
                        ->where('sub_id', $sub_id)
                        ->orderBy('id')
                        ->get();

        return response()->json($questionSets, 200);
    }

     public function getQuestionSetById($id)
    {
        // Find the question set by ID and load related subjects and lecturer
        $questionSet = question_set::with('subjects', 'lecturer')->find($id);

        // Check if the question set exists
        if (!$questionSet) {
            return response()->json(['message' => 'Question set not found!'], 404);
        }

        // Return the question set details as JSON response
        return response()->json($questionSet, 200);
    }

    public function update(Request $request, $id)
{
    $qs = question_set::find($id);
    if (!$qs) {
        return response()->json(['message' => 'Question set not found!'], 404);
    }

    $qs->fill($request->only([
        'due_date',
        'assign',
        'assignLec_id'
    ]));

    

    $result = $qs->save();

    if ($result) {
        return response()->json(['message' => 'Question set updated successfully!'], 201);
    } else {
        return response()->json(['message' => 'Question set not updated! Please try again!'], 400);
    }
}

public function getAssignedWrittenQuizzes($lecturerId)
{
    $assignedWrittenQuizzes = question_set::where('assign', 1)
        ->where('assignLec_id', $lecturerId)
        ->where('type', 'Written')
        ->get();
    return response()->json($assignedWrittenQuizzes);
}


public function getCompletedQuestionSets($lecturerId)
{
    // Get all question set ids from stud_grade
    $studGradeQuestionSetIds = stud_grade::where('marked', 1)
                                          ->pluck('qs_id')
                                          ->toArray();

    // Get all question sets where assign is 1 and assignLec_id matches the lecturer id
    // OR where id is in studGradeQuestionSetIds and assignLec_id matches the lecturer id
    $questionSets = question_set::where(function ($query) use ($lecturerId) {
        $query->where('assign', 1)
              ->where('assignLec_id', $lecturerId);
    })->orWhere(function ($query) use ($lecturerId, $studGradeQuestionSetIds) {
        $query->whereIn('id', $studGradeQuestionSetIds)
              ->where('assignLec_id', $lecturerId);
    })->get();

    foreach ($questionSets as $questionSet) {
        $questionSet->stud_grade_count = stud_grade::where('qs_id', $questionSet->id)
                                                   ->where('marked', 1)
                                                   ->count();
        // Fetch the subject's name using the subjects relationship
        $questionSet->subject_name = $questionSet->subjects->name;
    }

    return response()->json($questionSets);
}

public function getQuestionCount($qs_id)
    {
        $questionCount = question_set::withCount('question')
            ->where('id', $qs_id)
            ->first();

        if (!$questionCount) {
            return response()->json(['message' => 'Question set not found'], 404);
        }

        return response()->json(['question_count' => $questionCount->question_count], 200);
    }


}
