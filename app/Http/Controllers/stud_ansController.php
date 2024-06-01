<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\stud_ans;

class stud_ansController extends Controller
{
    function getStudAns()
    {
        return stud_ans::all();
    }
}
