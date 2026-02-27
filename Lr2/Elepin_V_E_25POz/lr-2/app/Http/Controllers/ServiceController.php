<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        if(Auth::check() and Auth::user()->status == 'Работодатель'){
            $services = Service::where('user_status', 'Работодатель')->latest()->get();
        } else{
            $services = Service::where('user_status', 'Соискатель')->latest()->get();
        }

        return view('service.index', compact('services'));
    }

    public function index_for($status)
    {
        if($status == 'employer'){
            $services = Service::where('user_status', 'Работодатель')->latest()->get();
        }
        elseif($status == 'worker'){
            $services = Service::where('user_status', 'Соискатель')->latest()->get();
        } else{
            abort(404);
        }

        return view('service.index', compact('services'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('service.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
                'name' => ['required', 'string', 'max:50'],
                'price' => ['required', 'numeric'],
                'description' => ['required', 'string', 'max:255'],
                'user_status' => ['required'],
            ],
            [
                'required' => 'Обязательное поле',
                'numeric' => 'Только числовое значение',
                'max' => 'Максимальное количество символов - 255',
                'name.max' => 'Максимальное количество символов - 50',
            ]
        );

        $service = new Service();
        $service->name = $request->input('name');
        $service->price = $request->input('price');
        $service->description = $request->input('description');
        $service->user_status = $request->input('user_status');
        $service->save();

        return redirect('/services')->with('success', 'Вы создали услугу!');
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
    public function edit(Service $service)
    {
        return view('service.edit', compact('service'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {

        $request->validate([
                'name' => ['required', 'string', 'max:50'],
                'price' => ['required', 'numeric'],
                'description' => ['required', 'string', 'max:255'],
                'user_status' => ['required'],
            ],
            [
                'required' => 'Обязательное поле',
                'numeric' => 'Только числовое значение',
                'max' => 'Максимальное количество символов - 255',
                'name.max' => 'Максимальное количество символов - 50',
            ]
        );

        $service->name = $request->name;
        $service->price = $request->price;
        $service->description = $request->description;
        $service->user_status = $request->user_status;
        $service->save();

        return redirect()->back()->with('success', 'Вы редактировали услугу!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->back()->with('success', 'Вы удалили услугу!');
    }
}
