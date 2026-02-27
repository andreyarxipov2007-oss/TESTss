<?php

namespace App\Http\Controllers;

use App\Mail\OrderServiceEmail;
use App\Mail\ResponseEmail;
use App\Models\OrderService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrderServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order_services = OrderService::where('user_id', Auth::id())->latest()->get();

        return view('order-service.index', compact('order_services'));
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

    public function addOrder($id){
        $order_service = OrderService::create([
            'user_id' => Auth::id(),
            'service_id' => $id,
        ]);

        $admins = User::where('status', 'Администратор')->get();
        Mail::to($admins)->send(new OrderServiceEmail($order_service->service->name));

        return redirect('/order-service')->with('success', 'Вы заказали услугу!');
    }

}
