<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question_set extends Model
{
    use HasFactory;

    protected $fillable =[
        'id', 
        'qs_name',
        'type',
        'time',
        'due_date',
        'assign',
        'total_mark',
        'sub_id'
    ];
}
