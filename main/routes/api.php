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
use App\Http\Controllers\LoginController;
use App\Http\Controllers\password_resetController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [LoginController::class, 'login']);

//STUDENT (done checking YEAHHHH)
Route::get('/student/{param?}', [StudentController::class, 'getStudent']);
Route::get('/student/profile/{id}', [studentController::class, 'getStudProfile']);
Route::get('/subject/{sub_id}/getSubDetails', [studentController::class, 'getSubDetails']);
Route::get('/subject/{sub_id}/getStudentsBySubject', [studentController::class, 'getStudentsBySubject']);
Route::get('/student/dashboard/{id}', [studentController::class, 'getAssignedQuizzes']);
Route::post('/student/addStud', [studentController::class, 'addStudent']);
Route::put('/student/updateStud', [studentController::class, 'updateStud']);
Route::put('/student/{stud_id}/Profile/updatePassword', [studentController::class, 'updateStudPassword']);
Route::delete('/student/delete/{stud_id}', [studentController::class, 'deleteStud']);
Route::delete('/subject_taken/{stud_id}/{sub_id}', [studentController::class, 'removeSubject']);
Route::post('/student/{id}/uploadProfilePicture', [studentController::class, 'getStudentProfilePicture']);
Route::get('/student/{student_id}/quiz/{qs_id}/grade', [studentController::class, 'getStudentGrade']);

//LECTURER (done checking YEAHHHH)
Route::get('/lecturer/{param?}', [lecturerController::class, 'getLecturer']);
Route::get('/lecturer/profile/{id}', [lecturerController::class, 'getLecProfile']);
Route::post('/lecturer/addLec', [lecturerController::class, 'addLec']);
Route::put('/lecturer/updateLec', [lecturerController::class, 'updateLec']);
Route::put('/lecturer/{id}/Profile/updatePassword', [lecturerController::class, 'updateLecPassword']);
Route::delete('/lecturer/delete/{id}', [lecturerController::class, 'deleteLec']);
Route::post('/lecturer/{id}/uploadProfilePicture', [lecturerController::class, 'uploadProfilePicture']);
Route::get('/lecturer/{id}/profilePicture', [lecturerController::class, 'getLecturerProfilePicture']);

//ADMIN (done checking YEAHHHH)
Route::get('/admin/{param?}', [adminController::class, 'getAdmin']);
Route::get('/admin/{admin_id}/getAdminProfile', [adminController::class, 'getAdminProfile']);
Route::post('/admin/addAdmin', [adminController::class, 'addAdmin']);
Route::put('/admin/updateAdmin', [adminController::class, 'updateAdmin']);
Route::put('/admin/{admin_id}/Profile/updatePassword', [adminController::class, 'updateAdminPassword']);
Route::delete('/admin/delete/{admin_id}', [adminController::class, 'deleteAdmin']);
Route::post('/admin/{id}/uploadProfilePicture', [adminController::class, 'uploadAdminPicture']);
// Route::get('/admin/{id}/profilePicture', [adminController::class, 'getAdminProfilePicture']);

//SUBJECT (done checking YEAHHHH)
Route::get('/subject/{param?}', [subjectController::class, 'getSubject']);
Route::get('/lecturer/{lec_id}/subject/mySubject', [subjectController::class, 'mySubject']);
Route::post('/subject/addSub', [subjectController::class, 'addSub']);
Route::put('/subject/updateSub', [subjectController::class, 'updateSub']);
Route::delete('/subject/delete/{id}', [subjectController::class, 'deleteSub']);
Route::get('/subject/{id}/subjects-with-count', [SubjectController::class, 'getSubjectsAndStudentCount']);
Route::post('/subject/addStudToSub', [subjectController::class, 'addStudentToSubject']);
Route::delete('/subject/{sub_id}/student/{stud_id}', [subjectController::class, 'removeStudent']);



//QUESTION SET (done checking YEAHHHH)
Route::get('/lecturer/{id}/question_set/myQuestionSets', [question_setController::class, 'myQuestionSets']);
Route::get('/question_set/getAllQuestionSets', [question_setController::class, 'getAllQuestionSets']);
Route::get('/question_set/getAllQuestionSetsStudent/{stud_id}', [question_setController::class, 'getAllQuestionSetsStudent']);
Route::get('/lecturer/{lec_id}/question_set/getAssignedQuestionSets', [question_setController::class, 'getAssignedQuestionSets']);
Route::get('/student/{stud_id}/completed_quizzes', [question_setController::class, 'getCompletedQuizzes']);
Route::get('/question_set/getQuestionSetsBySubject/{sub_id}', [question_setController::class, 'getQuestionSetsBySubject']);
Route::get('/question_set/{lecturerId}/assignedWrittenQuiz', [question_setController::class, 'getAssignedWrittenQuizzes']);
Route::get('/lecturer/{lecturerId}/studentGradesSubject', [question_setController::class, 'getCompletedQuestionSets']);

Route::post('/question_set/addQS', [question_setController::class, 'addQS']);
Route::put('/lecturer/{id}/question_set/updateQS', [question_setController::class, 'updateQS']);
Route::delete('/question_set/delete/{id}', [question_setController::class, 'deleteQS']);
Route::get('/question_set/{id}', [question_setController::class, 'getQuestionSetById']);
Route::post('/question_set/update/{id}', [question_setController::class, 'update']);
Route::get('/question_set/{qs_id}/question_count', [question_setController::class, 'getQuestionCount']);

//QUESTION
Route::get('/question_set/{id}/question/getQuestion', [questionController::class, 'getQuestion']);
Route::post('/question/saveAnswer', [questionController::class, 'saveAnswer']);
Route::post('/question/addQues', [questionController::class, 'addQues']);
Route::put('/question/updateQues', [questionController::class, 'updateQues']);
Route::delete('/deleteQues/delete', [questionController::class, 'deleteQues']);


//LEC_REQUEST
Route::get('/request/getLecRequest', [lec_requestController::class, 'getLecRequest']);
Route::post('/request/addLecReq', [lec_requestController::class, 'addLecReq']);
Route::get('/request/getLecRequestById/{lec_id}', [lec_requestController::class, 'getLecRequestByLecId']);

//STUD_ANS
Route::get('/student/{stud_id}/question_set/{qs_id}/stud_ans/getStudAns', [stud_ansController::class, 'getStudAns']);
Route::get('/student/{stud_id}/question_set/{qs_id}/marked_questions', [stud_ansController::class, 'getMarkedQuestions']);
Route::put('/question_set/{id}/studAns/{stud_id}', [stud_ansController::class, 'markedStudAns']);
Route::post('/student/{stud_id}/question/{ques_id}/updateStudAns', [stud_ansController::class, 'updateStudAns']);

//STUD_GRADE
Route::get('/student/{id}/grades', [stud_gradeController::class, 'getStudGrade']);
Route::get('/lecturer/{qs_id}/getStudentResult', [stud_gradeController::class, 'getStudentResult']);
Route::get('/lecturer/{qs_id}/getStudentMarkedResult', [stud_gradeController::class, 'getStudentResultMarked']);
Route::post('/grades', [stud_gradeController::class, 'store']);
Route::post('/student/{stud_id}/question_set/{qs_id}/updateStudGrade', [stud_gradeController::class, 'updateStudGrade']);
Route::delete('/lecturer/{qs_id}/deleteStudentGrade/{stud_id}', [stud_gradeController::class, 'deleteStudentGrade']);

//forget password
Route::post('/forgot-password', [password_resetController::class, 'forgotPassword']);
Route::post('/reset-password', [password_resetController::class, 'resetPassword'])->name('password.reset');