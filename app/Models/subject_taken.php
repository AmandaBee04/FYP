<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subject_taken extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable =[
        'sub_id',
        'stud_id' 
    ];

    public function stud()
    {
        return $this->belongsTo(student::class, 'stud_id');
    }

    public function sub()
    {
        return $this->belongsTo(subject::class, 'sub_id');
    }
}
