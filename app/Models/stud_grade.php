<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class stud_grade extends Model
{
    
    public function questionSet()
    {
        return $this->belongsTo(question_set::class, 'id');
    }

    protected $table = 'stud_grade';
    use HasFactory;
}
