<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class lecturer extends Model
{
    protected $fillable =[
        'lec_id', 
        'lec_name',
        'lec_password',
        'lec_email'
    ];

    protected $hidden = [
        'lec_password'
    ];

    use HasFactory;
    protected $primaryKey = 'lec_id';
    public $timestamps = false;

}
