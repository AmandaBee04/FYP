<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\student;

class RehashStudentPasswords extends Command
{
    protected $signature = 'rehash:student-passwords';
    protected $description = 'Rehash student passwords to Bcrypt';

    public function handle()
    {
        $students = student::all();
        foreach ($students as $student) {
            if (!Hash::needsRehash($student->stud_password)) {
                $student->stud_password = Hash::make($student->stud_password);
                $student->save();
            }
        }

        $this->info('Student passwords rehashed successfully.');
    }
}
