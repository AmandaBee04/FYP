<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\student;
use App\Models\subject;
use App\Models\subject_taken;
use App\Models\question_set;
use App\Models\stud_grade;
use App\Models\stud_ans;
use Illuminate\Support\Facades\Log;

class studentController extends Controller
{
    //admin get student list, if provide stud_id or name, it will give you revelant student, else display all

    public function getStudent($param = null)
    {
        $stud = null;

        if(is_null($param)) 
        {
            $stud = student::select('id', 'stud_name', 'stud_email', 'programme', 'faculty', 'profile_picture')->get();
        } 
        else if(is_numeric($param)) 
        {
            $stud = student::where('id', 'like', '%' . $param . '%')->select('id', 'stud_name', 'stud_email', 'programme', 'faculty', 'profile_picture')->get();
        } 
        else 
        {
            $stud = student::where('stud_name', 'like', '%' . $param . '%')->select('id', 'stud_name', 'stud_email', 'programme', 'faculty', 'profile_picture')->get();
        }

        if($stud->isEmpty())
        {
            return response()->json(['message' => 'No student yet..'], 200);
        }
        else
        {
            return response()->json($stud, 200);
        }
        
    }

    //lecturer get student list by subject
    public function getStudentsBySubject($sub_id)
    {
        $subject = DB::table('subjects')
            ->where('id', $sub_id)
            ->first();

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $students = DB::table('subject_takens')
            ->join('students', 'subject_takens.stud_id', '=', 'students.id')
            ->where('subject_takens.sub_id', $sub_id)
            ->select('students.*')
            ->get();

        return response()->json([
            'subject' => $subject,
            'students' => $students
        ], 200);
    }

    //student subject details
    public function getSubDetails($sub_id)
    {
        $stud = DB::table('subject_takens')
            ->join('students', 'subject_takens.stud_id', '=', 'students.stud_id')
            ->join('subjects', 'subject_takens.sub_id', '=', 'subjects.sub_id')
            ->join('lecturers', 'subjects.id', '=', 'lecturers.id')
            ->where('subject_takens.sub_id', $sub_id)
            ->select('students.stud_id', 'students.stud_name', 'students.stud_email', 'students.faculty', 'students.profile_picture', 'lecturers.lec_name as lecturer_lec_name')
            ->get();

        if($stud -> isEmpty())
        {
            return response()->json(['message' => 'No student registered to this subject yet..'], 200);
        }
        else
        {
            return response()->json($stud, 200);
        }
    }

    //student profile
    public function getStudProfile(Request $req, $id)
    {
        $stud = DB::table('students')->where('id', $id)->first();
    
        if (!$stud) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $stud_name = $stud->stud_name;
    $stud_email = $stud->stud_email;
    $faculty = $stud->faculty;
    $programme = $stud->programme;
    $profile_picture = $stud->profile_picture;
    
        $sub = DB::table('subject_takens')
        ->join('subjects', 'subject_takens.sub_id', '=', 'subjects.id')
        ->where('subject_takens.stud_id', $id) // Ensure 'stud_id' is updated to 'id' here
        ->select('subjects.id', 'subjects.name') // Select only needed fields
        ->get();

            Log::info('Enrolled subjects:', ['subjects' => $sub]);
    
        return response()->json([
            'id' => $id,
            'stud_name' => $stud->stud_name,
            'stud_email' => $stud->stud_email,
            'faculty' => $stud->faculty,
            'programme' => $stud->programme,
            'profile_pic' => $stud->profile_picture,
            'enrolled_subjects' => $sub // Ensure this matches the expected structure in frontend
        ], 200);
    }

    public function getAssignedQuizzes($id)
    {
        $subjectTakens = subject_taken::where('stud_id', $id)->get();

        $assignedQuizzes = [];

        foreach ($subjectTakens as $subjectTaken) {
            $subId = $subjectTaken->sub_id;

            $quizzes = question_set::select('question_sets.*', DB::raw('COUNT(questions.id) as question_count'), 'lecturers.name as lec_name')
                ->leftJoin('questions', 'question_sets.id', '=', 'questions.qs_id')
                ->leftJoin('lecturers', 'question_sets.assignLec_id', '=', 'lecturers.id')
                ->where('question_sets.sub_id', $subId)
                ->where('question_sets.assign', 1)
                ->groupBy('question_sets.id')
                ->get();

            $assignedQuizzes = array_merge($assignedQuizzes, $quizzes->toArray());
        }

        return response()->json($assignedQuizzes);
    }

    //admin add new student
    public function addStudent(Request $req)
    {
        $stud = new student;
        $stud->id = $req->id;
        $stud->stud_name = $req->stud_name;
        $stud->password = bcrypt($req->password);
        $stud->stud_email = $req->stud_email;
        $stud->programme = $req->programme;
        $stud->faculty = $req->faculty;
        $stud->sub_id = $req->sub_id;

        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/students', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/students/'.$imgName);
    
            // Store the URL in the student model
            $stud->profile_picture = $linkToImg;
        }

        $existingSub = subject::find($req->sub_id);
        if (!$existingSub) {
            return response()->json(['message' => 'Subject not found!'], 404);
        }
        
        

        $result = $stud->save();

        if($req->has('sub_id'))
        {
            $subjectTaken = new subject_taken;
            $subjectTaken->stud_id = $req->id;
            $subjectTaken->sub_id = $req->input('sub_id');
            $subjectTaken->save();
        }

        if($result)
            return response()->json(['message' => 'Student added successfully!'], 201);
        else
            return response()->json(['message' => 'Student not added! Please try again!'], 400);
    }



    //admin update student
    public function updateStud(Request $req)
    {
        $stud = student::find($req->id);
        $stud->stud_name = $req->stud_name;
        if ($req->password) {
            $stud->password = bcrypt($req->password);
        }
        $stud->stud_email = $req->stud_email;
        $stud->programme = $req->programme;
        $stud->faculty = $req->faculty;

        if ($req->hasFile('profile_picture')) 
        {
            $file = $req->file('profile_picture');
            $filePath = $file->store('profile_pictures/students', 'public'); 

            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/students/'.$imgName);

            // Store the URL in the student model
            $stud->profile_picture = $linkToImg;
        }
        
        $result = $stud->save();

        

        if($req->has('subjects'))
        {
            subject_taken::where('stud_id', $stud->id)->delete();
            foreach($req->subjects as $subject) {
                $existingSub = subject::find($subject['sub_id']);
                if ($existingSub) {
                    $subjectTaken = new subject_taken;
                    $subjectTaken->stud_id = $stud->id; // Make sure this matches your field name
                    $subjectTaken->sub_id = $subject['sub_id'];
                    $subjectTaken->save();
                }
            }
        }

        if($result)
        {
            return response()->json(['message' => 'Student updated successfully!'], 201);
        }
        else
        {
            return response()->json(['message' => 'Student not updated! Please try again!'], 400);
        }
    }

    //student change password
    public function updateStudPassword(Request $req, $id)
    {

        $stud = DB::table('students')->where('id', $id)->first();

        if (!$stud) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        if (Hash::check($req->old_password, $stud->password)) 
        {
            DB::table('students')
                ->where('id', $id)
                ->update(['password' => bcrypt($req->new_password)]);

            return response()->json(['message' => 'Password updated successfully'], 201);
        } 
        else 
        {
            return response()->json(['message' => 'Old password does not match'], 400);
        }

    }

    //admin delete student
    public function deleteStud($stud_id)
    {
        $stud = student::find($stud_id);

        if (!$stud) {
            return response()->json(['message' => 'Student not found!'], 404);
        }

        $result = $stud->delete();

        if($result)
            return response()->json(['message' => 'Student deleted successfully!'], 200);
        else
            return response()->json(['message' => 'Student not deleted! Please try again!'], 400);
    }

    public function removeSubject($stud_id, $sub_id)
    {
        $subjectTaken = subject_taken::where('stud_id', $stud_id)->where('sub_id', $sub_id)->first();
        if ($subjectTaken) {
            $subjectTaken->delete();
            return response()->json(['message' => 'Subject removed successfully'], 200);
        }
        return response()->json(['message' => 'Subject not found'], 404);
    }

    public function getStudentProfilePicture(Request $request, $id)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        $student = student::find($id);
    
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filePath = $file->store('profile_pictures/students', 'public'); 
    
            // Generate a URL to the stored picture
            $imgName = basename($filePath);
            $linkToImg = asset('/storage/profile_pictures/students/'.$imgName);
    
            // Store the URL in the lecturer model
            $student->profile_picture = $linkToImg;
            $student->save();
    
            return response()->json(['message' => 'Profile picture uploaded successfully!', 'profile_picture' => $linkToImg], 200);
        }
    
        return response()->json(['message' => 'Profile picture upload failed!'], 400);
    }

    // public function getSubjectByStudent($id)
    // {
    //     $student = DB::table('students')
    //         ->where('id', $id)
    //         ->first();

    //     if (!$student) {
    //         return response()->json(['message' => 'Student not found'], 404);
    //     }

    //     $subjects = DB::table('subject_takens')
    //         ->join('students', 'subject_takens.stud_id', '=', 'students.id')
    //         ->where('subject_takens.stud_id', $id)
    //         ->select('students.*')
    //         ->get();

    //     return response()->json([
    //         'subject' => $subject,
    //         'students' => $students
    //     ], 200);
    // }


    // public function getStudentGrade($student_id, $qs_id) {
    //     $grades = DB::table('stud_ans')
    //         ->where('stud_id', $student_id)
    //         ->whereIn('ques_id', function($query) use ($qs_id) {
    //             $query->select('id')
    //                 ->from('questions')
    //                 ->where('qs_id', $qs_id);
    //         })
    //         ->sum('marks');
    
    //     $studGrade = stud_grade::updateOrCreate(
    //         ['stud_id' => $student_id, 'qs_id' => $qs_id],
    //         ['score' => $grades, 'grade' => $grades / 10] // Assuming grade is calculated this way
    //     );
    
    //     return response()->json($studGrade, 200);
    // }


    public function getStudentGrade($student_id, $qs_id)
{
    // Fetch the student's score
    $grades = DB::table('stud_ans')
            ->where('stud_id', $student_id)
            ->whereIn('ques_id', function($query) use ($qs_id) {
                $query->select('id')
                    ->from('questions')
                    ->where('qs_id', $qs_id);
            })
            ->sum('marks');

    // Fetch the total marks of the question set
    $questionSet = DB::table('question_sets')
        ->where('id', $qs_id)
        ->first();

    // Assuming total_mark is a field in question_sets table
    $totalMarks = $questionSet->total_mark;

    return response()->json([
        'score' => $grades,
        'total_mark' => $totalMarks,
    ]);
}
    
}


