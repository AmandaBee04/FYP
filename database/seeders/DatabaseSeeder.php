<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\lecturer;
use App\Models\student;
use App\Models\subject;
use App\Models\question;
use App\Models\question_set;
use App\Models\lec_request;
use App\Models\stud_ans;
use App\Models\stud_grade;
use App\Models\subject_taken;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        lecturer::create([
            "lec_id" => "MU0001",
            "lec_name" => "Ruzanna",
            "lec_password" => bcrypt('0001@MMU'),
            "lec_email" => "MU0001@mmu.edu.my"
        ]);

        lecturer::create([
            "lec_id" => "MU0002",
            "lec_name" => "Rubiah",
            "lec_password" => bcrypt('0002@MMU'),
            "lec_email" => "MU0002@mmu.edu.my"
        ]);

        lecturer::create([
            "lec_id" => "MU0003",
            "lec_name" => "Mar Syazana",
            "lec_password" => bcrypt('0003@MMU'),
            "lec_email" => "MU0003@mmu.edu.my"
        ]);

        subject::create([
            "sub_id" => "CMA4223",
            "sub_name" => "Intro to Probability and Statistics",
            "lec_id" => "MU0003"
        ]);

        subject::create([
            "sub_id" => "DCP5301",
            "sub_name" => "Data Structure & Algorithms",
            "lec_id" => "MU0001"
        ]);

        student::create([
            "stud_id" => "12212001",
            "stud_name" => "Prego Pregi",
            "stud_password" => bcrypt('Prego001'),
            "stud_email" => "12212001@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
            "sub_id" => "CMA4223"
        ]);

        student::create([
            "stud_id" => "12212002",
            "stud_name" => "Yappi",
            "stud_password" => bcrypt('Yappi002'),
            "stud_email" => "12212002@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
            "sub_id" => "CMA4223"
        ]);

        question_set::create([
            "id" => "1",
            "qs_name" => "Introduction of Statistics",
            "type" => "Multiple Question",
            "time" => "50",
            "due_date" => "2024-12-22",
            "assign" => "0",
            "total_mark" => "100",
            "sub_id" => "CMA4223"
        ]);

        question::create([
            "id" => "1",
            "question" => "2 + 4 = ?",
            "instruction" => "Calculate",
            "picture" => "",
            "correct_ans" => "ans_b",
            "ans_a" => "0",
            "ans_b" => "6",
            "ans_c" => "8",
            "ans_d" => "7",
            "qs_id" => "1"
        ]);

        lec_request::create([
            "id" => "1",
            "subject" => "Request new subject",
            "message" => "Request new subject DIT5551 e-commerce",
            "lec_id" => "MU0002"
        ]);

        subject_taken::create([
            "id" => "1",
            "stud_id" => "12212001",
            "sub_id" => "CMA4223"
        ]);

        subject_taken::create([
            "id" => "2",
            "stud_id" => "12212002",
            "sub_id" => "CMA4223"
        ]);
    }
}
