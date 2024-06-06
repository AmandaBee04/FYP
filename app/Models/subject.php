<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subject extends Model
{
    protected $fillable =[
        'sub_id', 
        'sub_name',
        'lec_id'
    ];

    public function subjects()
    {
        return $this->hasMany(subject_taken::class, 'sub_id');
    }
    
    use HasFactory;
    protected $primaryKey = 'sub_id';
    public $timestamps = false;
}
