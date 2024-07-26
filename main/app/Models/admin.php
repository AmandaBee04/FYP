<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class admin extends Authenticatable
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

    public $timestamps = false;
    use HasFactory;
}
