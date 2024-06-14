<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class lecturer extends Model
{
    protected $fillable =[
        'id', 
        'name',
        'password',
        'profile_picture',
        'email'
    ];

    protected $hidden = [
        'password'
    ];

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function lecRequest()
    {
        return $this->hasMany(lec_request::class, 'id');
    }

    public function questionSet()
    {
        return $this->hasMany(question_set::class, 'id');
    }
    
    use HasFactory;
    public $timestamps = false;

}
