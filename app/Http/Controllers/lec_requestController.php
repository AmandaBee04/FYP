<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appeal;

class RequestController extends Controller
{
    public function getAppeal()
    {
        return Appeal::all();
    }
}
