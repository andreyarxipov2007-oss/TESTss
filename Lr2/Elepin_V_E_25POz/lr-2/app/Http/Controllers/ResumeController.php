<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resumes = Resume::where('user_id', Auth::id())->latest()->get();
        return view('resume.index', compact('resumes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('resume.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
                'position' => ['required', 'string', 'max:50'],
                'salary' => ['required', 'numeric'],
                'education' => ['required'],
                'education_place' => ['max:100'],
                'experience' => ['required'],
                'experience_place' => ['max:100'],
                'description' => ['required', 'string', 'max:255'],
            ],
            [
                'required' => 'Обязательное поле',
                'numeric' => 'Только числовое значение',
                'max' => 'Максимальное количество символов - 100',
                'position.max' => 'Максимальное количество символов - 50',
                'description.max' => 'Максимальное количество символов - 255',
            ]
        );

        $resume = new Resume();
        $resume->user_id = Auth::id();
        $resume->position = $request->input('position');
        $resume->salary = $request->input('salary');
        $resume->education = $request->input('education');
        $resume->education_place = $request->input('education_place');
        $resume->experience = $request->input('experience');
        $resume->experience_place = $request->input('experience_place');
        $resume->description = $request->input('description');
        $resume->save();

        return redirect('/resumes')->with('success', 'Вы создали резюме!');
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
    public function edit(Resume $resume)
    {
        return view('resume.edit', compact('resume'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
                'position' => ['required', 'string', 'max:50'],
                'salary' => ['required', 'numeric'],
                'education' => ['required'],
                'education_place' => ['max:100'],
                'experience' => ['required'],
                'experience_place' => ['max:100'],
                'description' => ['required', 'string', 'max:255'],
            ],
            [
                'required' => 'Обязательное поле',
                'numeric' => 'Только числовое значение',
                'max' => 'Максимальное количество символов - 100',
                'position.max' => 'Максимальное количество символов - 50',
                'description.max' => 'Максимальное количество символов - 255',
            ]
        );
        
        $resume = Resume::find($id);

        $resume->position = $request->position;
        $resume->salary = $request->salary;
        $resume->education = $request->education;
        $resume->education_place = $request->education_place;
        $resume->experience = $request->experience;
        $resume->experience_place = $request->experience_place;
        $resume->description = $request->description;
        $resume->save();

        return redirect()->back()->with('success', 'Вы отредактировали резюме!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resume $resume)
    {
        $resume->delete();
        return redirect()->back()->with('success', 'Вы удалили резюме!');
    }
}
