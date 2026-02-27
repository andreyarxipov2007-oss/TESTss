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
            <h1 class="text-center my-5">Услуги</h1>
        </div>
    </div>

    @if(!Auth::check() or Auth::user()->status == 'Администратор')
        <div class="row mb-5">
            <div class="col-6 d-flex justify-content-center">
                <a class="btn btn-lg btn-link" href="{{ route('service.index_for', 'worker') }}">
                    <h1>Соискатель</h1>
                </a>
            </div>
            <div class="col-6 d-flex justify-content-center">
                <a class="btn btn-lg btn-link" href="{{ route('service.index_for', 'employer') }}">
                    <h1>Работодатель</h1>
                </a>
            </div>
        </div>
    @endif

    <div class="row row-cols-1 row-cols-sm-2 g-4">
        @foreach ($services as $service)
            <div class="col">
                <div class="card h-100">
                    <h3 class="card-header d-flex justify-content-between align-items-center fs-5">
                        
                        {{ $service->name }}

                        <div>
                            {{ number_format($service->price, 0, ',', '.') }} ₽
                        </div>

                    </h3>
                
                    <div class="card-body d-flex justify-content-between flex-column">
                        <p class="card-text">{{ $service->description }}</p>
                        <div>
                            @auth
                                @if (Auth::user()->status != 'Администратор')
                                    <a class="btn btn-primary" href="{{ route('add-order', $service->id) }}">Заказать услугу</a>
                                @else
                                    <a href="{{ route('service.edit', $service->id) }}"><img width="50px" src="{{ asset('images/edit.png') }}" alt=""></a>
                                    <a href="{{ route('service.destroy', $service->id) }}"><img width="50px" src="{{ asset('images/delete.png') }}" alt=""></a>
                                @endif
                            @endauth
                        </div>
                    </div>
                    
                </div>
            </div>
        @endforeach
    </div>
@endsection