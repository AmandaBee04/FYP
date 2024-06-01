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
        'sub_id'
    ];
    
    public function grades()
    {
        return $this->hasMany(stud_grade::class, 'qs_id');
    }

    protected $table = 'question_set';
    use HasFactory;
}
