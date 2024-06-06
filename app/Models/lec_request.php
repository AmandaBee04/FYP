<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class lec_request extends Model
{
    protected $fillable =[
        'id', 
        'subject',
        'message',
        'lec_id'
    ];
    use HasFactory;
}
