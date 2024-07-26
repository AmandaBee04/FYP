<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class stud_grade extends Model
{
    protected $fillable =[
        'id', 
        'grade',
        'score',
        'stud_id',
        'qs_id',
        'marked',
    ];
    
    public function student()
    {
        return $this->belongsTo(student::class, 'stud_id');
    }

    public function question_set()
    {
        return $this->belongsTo(question_set::class, 'qs_id');
    }

    use HasFactory;
}
