<?php

namespace App\Http\Controllers;

use App\Mail\CheckResponseEmail;
use App\Mail\CrossResponseEmail;
use App\Mail\ResponseEmail;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->status == 'Работодатель'){
            $responses = Response::with('vacancy')
            ->latest()
            ->get()
            ->filter(function($response) {
                return $response->vacancy->user_id == Auth::id();
            })
            ->sortBy(function($response) {
                return $response->vacancy->ban;
            });
        }

        if(Auth::user()->status == 'Соискатель'){
            $responses = Response::with('vacancy')->where('user_id', Auth::id())->latest()->get()->sortBy(function($response){
                return $response->vacancy->ban;
            });
        }

        return view('response.index', compact('responses'));
    }

    public function cross(Response $response){
        $response->status = 'Отклонен';
        $response->save();

        Mail::to($response->user->email)->send(new CrossResponseEmail($response->vacancy->position));

        return redirect()->back()->with('success', 'Вы отклонили отклик на вакансию!');
    }
    
    public function check(Response $response){
        $response->status = 'Принят';
        $response->save();

        Mail::to($response->user->email)->send(new CheckResponseEmail($response->vacancy->position));
    
        return redirect()->back()->with('success', 'Вы приняли отклик на вакансию!');
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
        $request->validate([
                'resume_id' => ['required'],
            ],
            [
                'required' => 'Обязательное поле',
            ]
        );

        $response = new Response();
        $response->user_id = Auth::id();
        $response->vacancy_id = $request->vacancy_id;
        $response->resume_id = $request->resume_id;
        $response->save();

        Mail::to($response->vacancy->user->email)->send(new ResponseEmail($response->vacancy->position));

        return redirect()->back()->with('success', 'Вы откликнулись на вакансию!');
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
}
