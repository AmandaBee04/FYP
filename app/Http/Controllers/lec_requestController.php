<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\lec_request;
use App\Models\lecturer;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewRequestEmail;
use Illuminate\Support\Facades\DB;

class lec_requestController extends Controller
{
    //admin get all request
    public function getLecRequest()
{
    $requests = DB::table('lec_requests')
        ->join('lecturers', 'lec_requests.lec_id', '=', 'lecturers.id')
        ->select('lec_requests.*', 'lecturers.name as lecturer_name')
        ->get();

    return response()->json($requests, 200);
}

    //lecturer add request
    public function addLecReq(Request $req)
    {

        $lec_req = new lec_request();
        $lec_req->id = $req->id;
        $lec_req->subject = $req->subject;
        $lec_req->message = $req->message;
        $lec_req->lec_id = $req->lec_id;

        $existingLec = lecturer::find($req->lec_id);
        if (!$existingLec) {
            return response()->json(['message' => 'Lecturer not found!'], 404);
        }

        $result = $lec_req->save();
        
        if($result) {
            // Mail::to('AM0001@mmu.edu.my')->send(new NewRequestEmail($lec_req));
            return response()->json(['message' => 'Request sent!'], 201);
        } else {
            return response()->json(['message' => 'Request not sent! Please try again!'], 400);
        }
    }

    public function getLecRequestByLecId($lec_id)
    {
        $requests = lec_request::where('lec_id', $lec_id)->get();
        return response()->json($requests);
    }

}


