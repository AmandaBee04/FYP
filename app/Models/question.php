<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question extends Model
{
    protected $fillable =[
        'id', 
        'question',
        'instruction',
        'picture',
        'correct_ans',
        'ans_a',
        'ans_b',
        'ans_c',
        'ans_d',
        'qs_id'
    ];
    protected $table = 'question';

    use HasFactory;
}
