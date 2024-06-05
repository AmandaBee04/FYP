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
use App\Models\student;
use App\Models\subject;

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

Route::get("/question/getQuestion", [questionController::class, 'getQuestion']);

Route::get("/questionaa_set/getQuestionSet", [question_setController::class, 'getQuestionSet']);

Route::get("/lecturer/getLecturer", [lecturerController::class, 'getLecturer']);

Route::get("/student/getStudent", [studentController::class, 'getStudent']);

Route::get("/subject/getSubject", [subjectController::class, 'getSubject']);

Route::get("/request/getLecRequest", [lec_requestController::class, 'getLecRequest']);

Route::get("/stud_ans/getStudAns", [stud_ansController::class, 'getStudAns']);

Route::get("/student/grades/{id}", [stud_gradeController::class, 'getStudGrade']);

Route::post('/login', [loginController::class, 'login']);

Route::post('/lecturer/addLec', [lecturerController::class, 'addLec']);

Route::post('/student/addStud', [studentController::class, 'addStud']);

Route::post('/subject/addSub', [subjectController::class, 'addSub']);

Route::post('/question_set/addQS', [question_setController::class, 'addQS']);

Route::post('/question/addQues', [questionController::class, 'addQues']);

Route::post('/request/addLecReq', [lec_requestController::class, 'addLecReq']);

Route::put('/lecturer/updateLec', [lecturerController::class, 'updateLec']);

Route::put('/subject/updateSub', [subjectController::class, 'updateSub']);

Route::put('/student/updateStud', [studentController::class, 'updateStud']);

Route::delete('/student/delete/{stud_id}', [studentController::class, 'deleteStud']);

Route::delete('/subject/delete/{sub_id}', [subjectController::class, 'deleteSub']);

Route::delete('/lecturer/delete/{lec_id}', [lecturerController::class, 'deleteLec']);

Route::delete('/deleteQues/delete/{id}', [questionController::class, 'deleteQues']);

Route::delete('/deleteQS/delete/{id}', [question_setController::class, 'deleteQS']);
