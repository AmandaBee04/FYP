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

    public function students()
    {
        return $this->hasMany(subject_taken::class, 'stud_id');
    }

    use HasFactory;
    protected $primaryKey = 'stud_id';
    public $timestamps = false;
}
