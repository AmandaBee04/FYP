<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\stud_grade;
use App\Models\stud_ans;
use App\Models\question;
use App\Models\question_set;


class stud_gradeController extends Controller
{
    //student get their own grades
    public function getStudGrade($stud_id)
{
    $grades = DB::table('stud_grades')
                ->join('question_sets', 'stud_grades.qs_id', '=', 'question_sets.id')
                ->join('subject_takens', 'question_sets.sub_id', '=', 'subject_takens.sub_id')
                ->join('subjects', 'subject_takens.sub_id', '=', 'subjects.id')
                ->join('lecturers', 'question_sets.lec_id', '=', 'lecturers.id')
                ->where('stud_grades.stud_id', $stud_id)
                ->where(function($query) {
                    $query->where('question_sets.type', 'Multiple Question')
                          ->orWhere('stud_grades.marked', 1);
                })
                ->select('stud_grades.grade', 'stud_grades.score', 'question_sets.qs_name as question_sets_name', 'subjects.name as subject_name', 'subjects.id as subject_id','lecturers.name as lecturer_name', DB::raw('(select count(*) from questions where questions.qs_id = question_sets.id) as total_questions'), 'question_sets.type as type', 'question_sets.id as qs_id', 'question_sets.total_mark as total_mark')
                ->groupBy('stud_grades.id')
                ->get();

    if ($grades->isEmpty()) 
    {
        return response()->json(['message' => 'No grades found, please wait for your lecturer to mark.']);
    } 
    else 
    {
        return response()->json($grades, 200);
    }
}


    public function getStudentResult($qs_id)
{
    $grades = DB::table('stud_grades')
            ->join('students', 'stud_grades.stud_id', '=', 'students.id')
            ->join('question_sets', 'stud_grades.qs_id', '=', 'question_sets.id')
            ->where('question_sets.id', $qs_id)
            ->select('students.id', 'students.stud_name', 'students.stud_email', 'students.programme', 'students.faculty', 'stud_grades.grade', 'stud_grades.score', 'question_sets.total_mark')
            
            ->get();

    if ($grades->isEmpty()) 
    {
        return response()->json(['message' => 'None of your students have completed the quiz'], 404);
    } 
    else 
    {
        return response()->json($grades, 200);
    }
}

public function getStudentResultMarked($qs_id)
{
    $grades = DB::table('stud_grades')
            ->join('students', 'stud_grades.stud_id', '=', 'students.id')
            ->join('question_sets', 'stud_grades.qs_id', '=', 'question_sets.id')
            ->where('question_sets.id', $qs_id)
            ->where('stud_grades.marked', 1)  // Add this line to filter by marked field
            ->select(
                'students.id',
                'students.stud_name',
                'students.stud_email',
                'students.programme',
                'students.faculty',
                'stud_grades.grade',
                'stud_grades.score',
                'stud_grades.marked',
                'question_sets.total_mark'
            )
            ->get();

    if ($grades->isEmpty()) 
    {
        return response()->json(['message' => 'None of your students have completed the quiz'], 404);
    } 
    else 
    {
        return response()->json($grades, 200);
    }
}



    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'grade' => 'required|numeric',
            'score' => 'required|numeric',
            'stud_id' => 'required|integer|exists:students,id',
            'qs_id' => 'required|integer|exists:question_sets,id',
        ]);

        // Create a new stud_grade record
        $studGrade = stud_grade::create([
            'grade' => $request->input('grade'),
            'score' => $request->input('score'),
            'stud_id' => $request->input('stud_id'),
            'qs_id' => $request->input('qs_id'),
            'marked' => $request->input('marked'),  // Set marked to 1
        ]);

        return response()->json([
            'message' => 'Grade saved successfully',
            'data' => $studGrade
        ], 201);
    }

        public function updateStudGrade(Request $request, $stud_id, $qs_id)
    {
        $validatedData = $request->validate([
            'grade' => 'required|numeric',
            'score' => 'required|numeric',
        ]);

        $studGrade = stud_grade::where('stud_id', $stud_id)
            ->where('qs_id', $qs_id)
            ->first();

        if (!$studGrade) {
            return response()->json(['message' => 'Grade not found!'], 404);
        }

        $studGrade->update([
            'grade' => $validatedData['grade'],
            'score' => $validatedData['score'],
            'marked' => 1,
        ]);

        return response()->json(['message' => 'Grade updated successfully', 'data' => $studGrade], 200);
    }


    public function deleteStudentGrade($qs_id, $stud_id)
    {
        try {
            // Get the stud_grade record to be deleted
            $studGrade = stud_grade::where('qs_id', $qs_id)
                                  ->where('stud_id', $stud_id)
                                  ->first();
    
            if (!$studGrade) {
                return response()->json(['message' => 'Student grade not found'], 404);
            }
    
            // Find all questions related to the question set
            $questions = question::where('qs_id', $qs_id)->get();
    
            foreach ($questions as $question) {
                // Delete related stud_ans records for this student
                stud_ans::where('ques_id', $question->id)
                       ->where('stud_id', $stud_id)
                       ->delete();
            }
    
            // Delete the stud_grade record
            $studGrade->delete();
    
            return response()->json(['message' => 'Student grade and related answers deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete student grade'], 500);
        }
    }
    
}
