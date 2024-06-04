<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\questionController;
use App\Http\Controllers\question_setController;
use App\Http\Controllers\lecturerController;
use App\Http\Controllers\studentController;
use App\Http\Controllers\subjectController;
use App\Http\Controllers\lec_requestController;
use App\Http\Controllers\stud_ansController;
use App\Http\Controllers\stud_gradeController;
use App\Http\Controllers\loginController;
use App\Models\lecturer;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/getQuestion", [questionController::class, 'getQuestion']);

Route::get("/getQuestionSet", [question_setController::class, 'getQuestionSet']);

Route::get("/getLecturer", [lecturerController::class, 'getLecturer']);

Route::get("/getStudent", [studentController::class, 'getStudent']);

Route::get("/getSubject", [subjectController::class, 'getSubject']);

Route::get("/getLecRequest", [lec_requestController::class, 'getLecRequest']);

Route::get("/getStudAns", [stud_ansController::class, 'getStudAns']);

Route::get("/grades/{qs_id}", [stud_gradeController::class, 'getStudGrade']);

Route::post('/login', [loginController::class, 'login']);

Route::post('/addLec', [lecturerController::class, 'addLec']);

Route::post('/addStud', [studentController::class, 'addStud']);

Route::post('/addSub', [subjectController::class, 'addSub']);

Route::post('/addQS', [question_setController::class, 'addQS']);

Route::post('/addQues', [questionController::class, 'addQues']);

Route::post('/addLecReq', [lec_requestController::class, 'addLecReq']);

Route::put('/updateLec', [lecturerController::class, 'updateLec']);

Route::put('/updateSub', [lecturerController::class, 'updateSub']);

Route::put('/updateStud', [lecturerController::class, 'updateStud']);