<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $favorites = Favorite::with('vacancy')->where('user_id', Auth::id())->latest()->get()->sortBy(function($favorite){
            return $favorite->vacancy->ban;
        });
        $resumes = Resume::where('user_id', Auth::id())->get();

        return view('favorite.index', compact('favorites', 'resumes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function addFavorite($id){
        $favorite = Favorite::where([
            ['vacancy_id', $id], 
            ['user_id', Auth::id()]
        ])->first();

        if(empty($favorite)){
            Favorite::create([
                'user_id' => Auth::id(),
                'vacancy_id' => $id,
            ]);
            // dd($favorite);
        } else{
            $favorite->delete();
        }

        return redirect()->back()->with('success', 'Вы добавили вакансию в избранное!');
    }
}
