<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\stud_grade;
use App\Models\question_set;


class stud_gradeController extends Controller
{
    //student get their own grades
    public function getStudGrade($stud_id)
    {
        $grades = DB::table('stud_grades')
                    ->join('question_sets', 'stud_grades.question_sets_id', '=', 'question_sets.id')
                    ->join('subject_takens', 'question_sets.sub_id', '=', 'subject_takens.sub_id')
                    ->join('lecturers', 'subject_takens.lec_id', '=', 'lecturers.id')
                    ->where('stud_grades.stud_id', $stud_id)
                    ->select('stud_grades.grade', 'question_sets.name as question_sets_name', 'subject_takens.sub_id', 'lecturers.name as lecturer_name')
                    ->get();

        if ($grades->isEmpty()) 
        {
            return response()->json(['message' => 'No grades found, please wait for your lecturer to mark.']);
        } 
        else 
        {
            return response()->json([$grades], 201);
        }
    }

    public function getStudentResult($sub_id)
    {
        $grades = DB::table('stud_grades')
                ->join('students', 'stud_grades.stud_id', '=', 'students.stud_id')
                ->join('question_sets', 'stud_grades.question_sets_id', '=', 'question_sets.id')
                ->join('subject_takens', 'question_sets.sub_id', '=', 'subject_takens.sub_id')
                ->where('subject_takens.sub_id', $sub_id)
                ->select('students.stud_id', 'students.stud_name', 'students.stud_email', 'students.programme', 'students.faculty', 'stud_grades.grade')
                ->get();

        if ($grades->isEmpty()) 
        {
            return response()->json(['message' => 'None of your student has complete the quiz']);
        } 
        else 
        {
            return response()->json([$grades], 201);
        }
    }
}
