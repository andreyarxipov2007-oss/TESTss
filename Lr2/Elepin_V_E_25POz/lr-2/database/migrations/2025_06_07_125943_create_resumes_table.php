<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); 
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('position', 50);
            $table->bigInteger('salary');
            $table->enum('education', ['Основное','Среднее','Среднее профессиональное','Высшее','Бакалавр','Магистр','Кандидат наук','Доктор наук']);
            $table->string('education_place', 100)->nullable();
            $table->enum('experience', ['Без опыта','До 3 лет','От 3 до 6 лет','Более 6 лет']);
            $table->string('experience_place', 100)->nullable();
            $table->string('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
