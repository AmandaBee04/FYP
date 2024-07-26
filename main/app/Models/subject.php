<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subject extends Model
{
    protected $primaryKey = 'id'; // Specify that 'id' is the primary key
    protected $keyType = 'string'; // Specify that the primary key is a string
    public $incrementing = false;

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
        return $this->belongsTo(Lecturer::class, 'lec_id');
    }

    public function questionSet()
    {
        return $this->hasMany(question_set::class, 'id');
    }
    
    use HasFactory;
    public $timestamps = false;
}
