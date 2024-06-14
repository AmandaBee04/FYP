<?php

use App\Http\Controllers\adminController;
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


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the 'api' middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//STUDENT (done checking YEAHHHH)
Route::get('/student/{param?}', [StudentController::class, 'getStudent']);
Route::get('/student/{stud_id}/getStudentProfile', [studentController::class, 'getStudProfile']);
Route::get('/subject/{sub_id}/getSubDetails', [studentController::class, 'getSubDetails']);
Route::get('/subject/{sub_id}/getStudentsBySubject', [studentController::class, 'getStudentsBySubject']);
Route::post('/student/addStud', [studentController::class, 'addStud']);
Route::put('/student/updateStud', [studentController::class, 'updateStud']);
Route::put('/student/{stud_id}/studProfile/updatePassword', [studentController::class, 'updateStudPassword']);
Route::delete('/student/delete/{stud_id}', [studentController::class, 'deleteStud']);

//LECTURER (done checking YEAHHHH)
Route::get('/lecturer/{param?}', [lecturerController::class, 'getLecturer']);
Route::get('/lecturer/{id}/getLecturerProfile', [lecturerController::class, 'getLecProfile']);
Route::post('/lecturer/addLec', [lecturerController::class, 'addLec']);
Route::put('/lecturer/updateLec', [lecturerController::class, 'updateLec']);
Route::put('/lecturer/{id}/lecProfile/updatePassword', [lecturerController::class, 'updateLecPassword']);
Route::delete('/lecturer/delete/{id}', [lecturerController::class, 'deleteLec']);

//ADMIN (done checking YEAHHHH)
Route::get('/admin/{param?}', [adminController::class, 'getAdmin']);
Route::get('/admin/{admin_id}/getAdminProfile', [adminController::class, 'getAdminProfile']);
Route::post('/admin/addAdmin', [adminController::class, 'addAdmin']);
Route::put('/admin/updateAdmin', [adminController::class, 'updateAdmin']);
Route::put('/admin/{admin_id}/adminProfile/updateAdminPassword', [adminController::class, 'updateAdminPassword']);
Route::delete('/admin/delete/{admin_id}', [adminController::class, 'deleteAdmin']);

//SUBJECT (done checking YEAHHHH)
Route::get('/subject/{param?}', [subjectController::class, 'getSubject']);
Route::get('/lecturer/{lec_id}/subject/mySubject', [subjectController::class, 'mySubject']);
Route::post('/subject/addSub', [subjectController::class, 'addSub']);
Route::put('/subject/updateSub', [subjectController::class, 'updateSub']);
Route::delete('/subject/delete/{id}', [subjectController::class, 'deleteSub']);


//QUESTION SET (done checking YEAHHHH)
Route::get('/lecturer/{id}/question_set/myQuestionSets', [question_setController::class, 'myQuestionSets']);
Route::get('/question_set/getAllQuestionSets', [question_setController::class, 'getAllQuestionSets']);
Route::get('/lecturer/{lec_id}/question_set/getAssignedQuestionSets', [question_setController::class, 'getAssignedQuestionSets']);
Route::post('/question_set/addQS', [question_setController::class, 'addQS']);
Route::put('//lecturer/{id}/question_set/updateQS', [question_setController::class, 'updateQS']);
Route::delete('/question_set/delete/{id}', [question_setController::class, 'deleteQS']);

//QUESTION
Route::get('/question_set/{id}/question/getQuestion', [questionController::class, 'getQuestion']);
Route::post('/question/addQues', [questionController::class, 'addQues']);
Route::put('/question/updateQues', [questionController::class, 'updateQues']);
Route::delete('/deleteQues/delete/{id}', [questionController::class, 'deleteQues']);

//LEC_REQUEST
Route::get('/request/getLecRequest', [lec_requestController::class, 'getLecRequest']);
Route::post('/request/addLecReq', [lec_requestController::class, 'addLecReq']);

//STUD_ANS
Route::get('/student/{stud_id}/question_set/{qs_id}/stud_ans/getStudAns', [stud_ansController::class, 'getStudAns']);
Route::get('/student/{stud_id}/question_set/{qs_id}/marked_questions', [stud_ansController::class, 'getMarkedQuestions']);
Route::put('/question_set/{id}/studAns/{stud_id}', [stud_ansController::class, 'markedStudAns']);

//STUD_GRADE
Route::get('/student/{id}/grades', [stud_gradeController::class, 'getStudGrade']);
Route::get('/subject/{sub_id}/getStudentResult', [stud_gradeController::class, 'getStudentResult']);
