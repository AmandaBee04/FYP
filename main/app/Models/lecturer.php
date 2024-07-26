<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class lecturer extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;
    
    protected $fillable = [
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
        return $this->hasMany(Subject::class, 'id');
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