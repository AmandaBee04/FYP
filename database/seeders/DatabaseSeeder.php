<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\admin;
use App\Models\lecturer;
use App\Models\student;
use App\Models\subject;
use App\Models\question;
use App\Models\question_set;
use App\Models\lec_request;
use App\Models\stud_ans;
use App\Models\stud_grade;
use App\Models\subject_taken;
use App\Models\lec_sub_takens;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        admin::create([
            "id" => "AD0001",
            "name" => "Amanda Bee",
            "password" => bcrypt('Amanda0001'),
	        "profile_picture" => "",
            "email" => "AD0001@mmu.edu.my"
        ]);

        admin::create([
            "id" => "AD0002",
            "name" => "Junn Chang",
            "password" => bcrypt('Junn0002'),
	        "profile_picture" => "",
            "email" => "AD0002@mmu.edu.my"
        ]);

        admin::create([
            "id" => "AD0003",
            "name" => "Pragash Varman",
            "password" => bcrypt('0003@MMU'),
	        "profile_picture" => "",
            "email" => "AD0003@mmu.edu.my"
        ]);

        lecturer::create([
            "id" => "MU0001",
            "name" => "Ruzanna",
            "password" => bcrypt('0001@MMU'),
	        "profile_picture" => "",
            "email" => "MU0001@mmu.edu.my"
        ]);

        lecturer::create([
            "id" => "MU0002",
            "name" => "Rubiah",
            "password" => bcrypt('0002@MMU'),
	        "profile_picture" => "",
            "email" => "MU0002@mmu.edu.my"
        ]);

        lecturer::create([
            "id" => "MU0003",
            "name" => "Mar Syazana",
            "password" => bcrypt('0003@MMU'),
	        "profile_picture" => "",
            "email" => "MU0003@mmu.edu.my"
        ]);

        lecturer::create([
            "id" => "MU0004",
            "name" => "Lee Kian Chin",
            "password" => bcrypt('0004@MMU'),
	        "profile_picture" => "",
            "email" => "MU0004@mmu.edu.my"
        ]);

        lecturer::create([
            "id" => "MU0005",
            "name" => "Chua Sook Ling",
            "password" => bcrypt('0005@MMU'),
	        "profile_picture" => "",
            "email" => "MU0005@mmu.edu.my"
        ]);

        subject::create([
            "id" => "CMA4223",
            "name" => "Intro to Probability and Statistics",
            "lec_id" => "MU0003"
        ]);

        subject::create([
            "id" => "DCP5301",
            "name" => "Data Structure & Algorithms",
            "lec_id" => "MU0001"
        ]);

        subject::create([
            "id" => "DCP5101",
            "name" => "Program Design",
            "lec_id" => "MU0004"
        ]);

        subject::create([
            "id" => "DCP5201",
            "name" => "Object Oriented Programming",
            "lec_id" => "MU0001"
        ]);

        subject::create([
            "id" => "DMA5301",
            "name" => "Discrete Structures",
            "lec_id" => "MU0005"
        ]);

        student::create([
            "stud_id" => "12212001",
            "stud_name" => "Prego Pregi",
            "stud_password" => bcrypt('Prego001'),
            "stud_email" => "12212001@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
	        "profile_picture" => "",
            "sub_id" => "CMA4223"
        ]);

        student::create([
            "stud_id" => "12212002",
            "stud_name" => "Yappi",
            "stud_password" => bcrypt('Yappi002'),
            "stud_email" => "12212002@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
	        "profile_picture" => "",
            "sub_id" => "CMA4223"
        ]);

        student::create([
            "stud_id" => "12212003",
            "stud_name" => "Lisa Black",
            "stud_password" => bcrypt('Lisa003'),
            "stud_email" => "12212003@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
	        "profile_picture" => "",
            "sub_id" => "DCP5101"
        ]);

        student::create([
            "stud_id" => "12212004",
            "stud_name" => "Jisoo Black",
            "stud_password" => bcrypt('Jisoo004'),
            "stud_email" => "12212004@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
	        "profile_picture" => "",
            "sub_id" => "DCP5101"
        ]);

        student::create([
            "stud_id" => "12212005",
            "stud_name" => "Jennie Black",
            "stud_password" => bcrypt('Jennie005'),
            "stud_email" => "12212005@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
	        "profile_picture" => "",
            "sub_id" => "DCP5101"
        ]);

        student::create([
            "stud_id" => "12212006",
            "stud_name" => "Rose Black",
            "stud_password" => bcrypt('Rose006'),
            "stud_email" => "12212006@student.mmu.edu.my",
            "programme" => "Diploma in Information Technology",
            "faculty" => "FCI",
	        "profile_picture" => "",
            "sub_id" => "DCP5101"
        ]);
        

        question_set::create([
            "id" => "1",
            "qs_name" => "Introduction of Statistics",
            "type" => "Multiple Question",
            "time" => "50",
            "due_date" => "2024-12-22",
            "assign" => "0",
            "total_mark" => "100",
	        "lec_id" => "MU0003",
            "sub_id" => "CMA4223"
        ]);

        question_set::create([
            "id" => "2",
            "qs_name" => "Introduction To C++",
            "type" => "Multiple Question",
            "time" => "50",
            "due_date" => "2024-12-24",
            "assign" => "0",
            "total_mark" => "100",
	        "lec_id" => "MU0001",
            "sub_id" => "DCP5201"
        ]);

        question::create([
            "id" => "1",
            "question" => "2 + 4 = ?",
            "marks" => 2,
            "picture" => "",
            "correct_ans" => "ans_b",
            "ans_a" => "0",
            "ans_b" => "6",
            "ans_c" => "8",
            "ans_d" => "7",
	        "feedback" => "",
            "qs_id" => "1"
        ]);

        question::create([
            "id" => "2",
            "question" => "What is C++",
            "marks" => 2,
            "picture" => "",
            "correct_ans" => "ans_d",
            "ans_a" => "I don't know",
            "ans_b" => "C++ is C++",
            "ans_c" => "C++ is same as C",
            "ans_d" => "C++ is an object-oriented language.",
	        "feedback" => "",
            "qs_id" => "2"
        ]);

        stud_ans::create([
            "id" => "1",
            "answer" => "ans_b",
            "feedback" => "good",
            "marks" => 2,
            "stud_id" => "12212001",
            "ques_id" => "1"
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
