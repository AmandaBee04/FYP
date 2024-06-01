<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\stud_grade;

class stud_gradeController extends Controller
{
    function getStudGrade()
    {
        return stud_grade::all();
    }
}
