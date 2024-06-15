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
                    ->join('question_sets', 'stud_grades.qs_id', '=', 'question_sets.id')
                    ->join('subjects', 'question_sets.sub_id', '=', 'subjects.id') 
                    ->join('lecturers', 'subjects.lec_id', '=', 'lecturers.id')
                    ->where('stud_grades.stud_id', $stud_id)
                    ->select(
                        'subjects.name as Subject', 
                        'question_sets.qs_name as qs_name',
                        'lecturers.name as Lecturer name',
                        'stud_grades.Score',
                        'stud_grades.Grade'
                    )->get();

        if ($grades->isEmpty()) 
        {
            return response()->json(['message' => 'No grades found, please wait for your lecturer to mark.']);
        } 
        else 
        {
            return response()->json([$grades], 200);
        }
    }

    //lecturer get student grade
    public function getStudentResult($sub_id)
    {
        $grades = DB::table('stud_grades')
                ->distinct()
                ->join('students', 'stud_grades.stud_id', '=', 'students.stud_id')
                ->join('question_sets', 'stud_grades.qs_id', '=', 'question_sets.id')
                ->join('subject_takens', 'question_sets.sub_id', '=', 'subject_takens.sub_id')
                ->where('subject_takens.sub_id', $sub_id)
                ->select('students.stud_id', 'students.stud_name', 'students.stud_email', 'students.programme', 'students.faculty', 'stud_grades.score', 'stud_grades.grade')
                ->get();

        if ($grades->isEmpty()) 
        {
            return response()->json(['message' => 'None of your student has complete the quiz']);
        } 
        else 
        {
            return response()->json([$grades], 200);
        }
    }
}
