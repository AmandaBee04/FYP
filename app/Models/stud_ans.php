<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class stud_ans extends Model
{
    protected $fillable =[
        'id', 
        'answer',
        'remark',
        'feedback',
        'marks',
        'stud_id',
        'ques_id'
    ];

    public function question()
    {
        return $this->belongsTo(question::class, 'id');
    }

    public function grade()
    {
        return $this->hasOne(stud_grade::class, 'id');
    }   
    
    use HasFactory;
}
