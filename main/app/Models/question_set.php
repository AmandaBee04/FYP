<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question_set extends Model
{
    protected $fillable =[
        'id', 
        'qs_name',
        'type',
        'time',
        'due_date',
        'assign',
        'total_mark',
        'lec_id',
        'sub_id',
        'assignLec_id',
    ];

    public function question()
    {
        return $this->hasMany(question::class, 'qs_id');
    }

    public function stud_grade()
    {
        return $this->hasMany(student::class, 'id');
    }

    public function subjects()
    {
        return $this->belongsTo(subject::class, 'sub_id');
    }

    public function lecturer()
    {
        return $this->belongsTo(lecturer::class, 'lec_id');
    }

    public function scopeAssignedToLecturer($query, $lecturerId)
    {
        return $query->where('assign', 1)
                     ->where('assignLec_id', $lecturerId)
                     ->where('type', 'Written');
    }
    
    use HasFactory;
}
