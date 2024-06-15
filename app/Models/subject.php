<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subject extends Model
{
    protected $fillable =[
        'id', 
        'name',
        'lec_id'
    ];

    public function subject_taken()
    {
        return $this->hasMany(subject_taken::class, 'sub_id');
    }

    public function lecturer()
    {
        return $this->belongsTo(Lecturer::class);
    }

    public function questionSet()
    {
        return $this->hasMany(question_set::class, 'sub_id');
    }
    
    use HasFactory;
    public $timestamps = false;
}
