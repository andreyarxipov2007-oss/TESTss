@extends('layouts.app')
@section('content')

    @if(session('success'))  
        <div class="alert alert-success fade show d-flex justify-content-between align-items-center">  
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>  
    @endif

    <div class="row">
        <div class="col-12">
            <h1 class="text-center my-5">Заказанные услуги</h1>
        </div>
    </div>

    @if ($order_services->isEmpty())
        <div class="row">
            <div class="col-12">
                <h1>У вас нет заказанных услуг...</h1>
            </div>
        </div>
    @endif

    <div class="row row-cols-1 row-cols-sm-2 g-4">
        @foreach ($order_services as $order)
            <div class="col">
                <div class="card h-100">
                    <h3 class="card-header d-flex justify-content-between align-items-center fs-5">
                        
                        {{ $order->service->name }}
                        
                        <div>
                            Статус:
                            {{ $order->status }} 
                        </div>
                        
                    </h3>
                    
                    <div class="card-body"> 
                        <p class="card-text">{{ $order->service->description }}</p>
                    </div>
                    
                    <div class="card-footer">
                        <small class="text-muted">Дата заказа: {{ $order->created_at }}</small>
                    </div>
                    
                </div>
            </div>
        @endforeach
    </div>

@endsection