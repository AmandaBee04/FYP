<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class admin extends Model
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

    public $timestamps = false;
    use HasFactory;
    //test
}
