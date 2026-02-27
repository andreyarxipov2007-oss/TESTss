<?php

namespace App\Http\Controllers;

use App\Mail\BanVacancyEmail;
use App\Mail\ResponseEmail;
use App\Models\Favorite;
use App\Models\Resume;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class VacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vacancies = Vacancy::orderBy('ban')->latest()->get();
        $resumes = Resume::where('user_id', Auth::id())->get();

        return view('vacancy.index', compact('vacancies', 'resumes'));
    }

    public function myVacancy(){
        $vacancies = Vacancy::where('user_id', Auth::id())->orderBy('ban')->latest()->get();

        return view('vacancy.my-vacancy', compact('vacancies'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('vacancy.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
                'position' => ['required', 'string', 'max:50'],
                'salary' => ['required', 'numeric'],
                'city' => ['required', 'string', 'max:255'],
                'company' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
                'experience' => ['required'],
            ],
            [
                'required' => 'Обязательное поле',
                'numeric' => 'Только числовое значение',
                'max' => 'Максимальное количество символов - 255',
                'position.max' => 'Максимальное количество символов - 50',
            ]
        );

        Vacancy::create([
            'user_id' => Auth::id(),
            'position' => $request->position,
            'salary' => $request->salary,
            'city' => $request->city,
            'company' => $request->company,
            'description' => $request->description,
            'experience' => $request->experience,
        ]);
        
        return redirect('/my-vacancies')->with('success', 'Вы создали вакансию!');
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
    public function edit(Vacancy $vacancy)
    {
        return view('vacancy.edit', compact('vacancy'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
                'position' => ['required', 'string', 'max:50'],
                'salary' => ['required', 'numeric'],
                'city' => ['required', 'string', 'max:255'],
                'company' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
                'experience' => ['required'],
            ],
            [
                'required' => 'Обязательное поле',
                'numeric' => 'Только числовое значение',
                'max' => 'Максимальное количество символов - 255',
                'position.max' => 'Максимальное количество символов - 50',
            ]
        );
        
        $vacancy = Vacancy::find($id);

        $vacancy->position = $request->position;
        $vacancy->salary = $request->salary;
        $vacancy->city = $request->city;
        $vacancy->company = $request->company;
        $vacancy->description = $request->description;
        $vacancy->experience = $request->experience;
        $vacancy->save();

        return redirect()->back()->with('success', 'Вы отредактировали вакансию!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vacancy $vacancy)
    {
        $vacancy->delete();
        return redirect()->back()->with('success', 'Вы удалили вакансию!');
    }

    public function ban(Vacancy $vacancy)
    {
        if($vacancy->ban == 0){
            $vacancy->ban = 1;
            $message = 'Вы заблокировали вакансию!';
        } else{
            $vacancy->ban = 0;
            $message = 'Вы разблокировали вакансию!';
        }

        $vacancy->save();

        Mail::to($vacancy->user->email)->send(new BanVacancyEmail($vacancy->position, $vacancy->ban));
        
        return redirect()->back()->with('success', $message);
    }

    public function search(Request $request){
        $search = $request->search;

        if(empty($search)){
            return redirect('/vacancies');
        }

        $vacancies = Vacancy::where('position', 'LIKE', '%' . $search . '%')
            ->orWhere('description', 'LIKE', '%' . $search . '%')
            ->orderBy('ban')
            ->get();
            
        $resumes = Resume::where('user_id', Auth::id())->get();

        return view('vacancy.index', compact('vacancies', 'resumes', 'search'));
    }
}
