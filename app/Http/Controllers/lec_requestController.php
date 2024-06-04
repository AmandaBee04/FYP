<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\lec_request;
use App\Models\lecturer;

class lec_requestController extends Controller
{
    public function getLecRequest()
    {
        return lec_request::all();
    }

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

        if($result)
            return response()->json(['message' => 'Request sent!'], 201);
        else
            return response()->json(['message' => 'Request not sent! Please try again!'], 400);
    }

}
