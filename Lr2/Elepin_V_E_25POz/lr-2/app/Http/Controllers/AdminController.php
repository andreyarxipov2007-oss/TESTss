<?php

namespace App\Http\Controllers;

use App\Mail\AcceptOrderServiceEmail;
use App\Mail\CompleteOrderServiceEmail;
use App\Models\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

    public function orderService(){
        $order_services = OrderService::latest()->get();
        return view('admin.order-service', compact('order_services'));
    }

    public function accept(string $id){
        $order_service = OrderService::findOrFail($id);
        $order_service->status = 'В процессе';
        $order_service->save();

        Mail::to($order_service->user->email)->send(new AcceptOrderServiceEmail($order_service->service->name));
        
        return redirect()->back()->with('success', 'Вы взяли в обработку заказанную услугу!');
    }
    
    public function complete(string $id){
        $order_service = OrderService::findOrFail($id);
        $order_service->status = 'Услуга выполнена';
        $order_service->save();

        Mail::to($order_service->user->email)->send(new CompleteOrderServiceEmail($order_service->service->name));

        return redirect()->back()->with('success', 'Вы выполнили заказанную услугу!');
    }
}
