<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Vacancy extends Model
{


    protected $fillable = [
        'user_id',
        'position',
        'salary',
        'city',
        'company',
        'description',
        'experience',
    ];

    public function isFavorite($id){
        $favorite = Favorite::where([
            ['vacancy_id', $id], 
            ['user_id', Auth::id()]
        ])->first();

        if(empty($favorite)){
            return false;
        } else{
            return true;
        }
    }

    public function isResponse($id){
        $response = Response::where([
            ['vacancy_id', $id], 
            ['user_id', Auth::id()]
        ])->first();

        if(empty($response)){
            return false;
        } else{
            return true;
        }
    }


    public function countFavorite($id){
        $count = Favorite::where('vacancy_id', $id)->count();
        return $count;
    }

    public function user() {  
        return $this->belongsTo(User::class, 'user_id', 'id');  
    }
}
