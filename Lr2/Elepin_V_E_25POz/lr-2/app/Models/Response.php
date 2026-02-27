<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{


    public function vacancy() {  
        return $this->belongsTo(Vacancy::class, 'vacancy_id', 'id');  
    }

    public function resume() {  
        return $this->belongsTo(Resume::class, 'resume_id', 'id');  
    }

    public function user() {  
        return $this->belongsTo(User::class, 'user_id', 'id');  
    }
}
