<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = [
        'user_id',
        'vacancy_id',
    ];

    public function vacancy() {  
        return $this->belongsTo(Vacancy::class, 'vacancy_id', 'id');  
    }

    
}
