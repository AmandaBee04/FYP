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
        'sub_id'
    ];

    public function question()
    {
        return $this->hasMany(question::class);
    }

    public function subjects()
    {
        return $this->belongsTo(subject::class);
    }

    public function lecturer()
    {
        return $this->belongsTo(lecturer::class);
    }
    
    use HasFactory;
}
