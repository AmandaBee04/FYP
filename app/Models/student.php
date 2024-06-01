<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    protected $fillable =[
        'stud_id', 
        'stud_name',
        'stud_password',
        'stud_email',
        'programme',
        'faculty',
        'sub_id'
    ];

    protected $hidden = [
        'stud_password'
    ];

    use HasFactory;
    protected $table = 'student';
    public $timestamps = false;
}
