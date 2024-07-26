<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class student extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id', 
        'stud_name',
        'password',
        'stud_email',
        'programme',
        'faculty',
        'profile_picture',
        'sub_id'
    ];

    protected $hidden = [
        'password'
    ];

    public function subject_taken()
    {
        return $this->hasMany(subject_taken::class, 'stud_id');
    }

    public function stud_grade()
    {
        return $this->hasMany(student::class, 'id');
    }


    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($student) {
            $student->subject_taken()->delete();
        });
    }


    use HasFactory;
    // protected $primaryKey = 'stud_id';
    public $timestamps = false;
}
