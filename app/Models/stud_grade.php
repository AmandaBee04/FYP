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
        'studAns_id'
    ];
    
    public function stud_ans()
    {
        return $this->belongsTo(stud_ans::class, 'id');
    }

    use HasFactory;
}
