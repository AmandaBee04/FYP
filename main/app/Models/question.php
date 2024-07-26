<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question extends Model
{
    protected $fillable =[
        'id', 
        'question',
        'marks',
        'picture',
        'correct_ans',
        'ans_a',
        'ans_b',
        'ans_c',
        'ans_d',
        'feedback',
        'qs_id',
    ];

    public function questionSet()
    {
        return $this->belongsTo(question_set::class, 'qs_id');
    }

    public function studAns()
    {
        return $this->hasMany(stud_ans::class, 'id');
    }

    use HasFactory;
}
