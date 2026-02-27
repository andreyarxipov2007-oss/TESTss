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
            <h1 class="text-center my-5">Мои вакансии</h1>
        </div>
    </div>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
        <div class="col">
            <div class="card h-100" style="min-height: 400px">
                <div class="card-body d-flex align-items-center justify-content-center text-center">
                    <h1><a href="{{ route('vacancy.create') }}">Добавить новую вакансию</a></h1>
                </div>   
            </div>
        </div>

        @foreach ($vacancies as $vacancy)
            <div class="col">
                <div class="card h-100 @if($vacancy->ban) opacity-50 @endif">
                    <h3 class="card-header d-flex justify-content-between align-items-center">
                        
                        {{ $vacancy->position }}

                    </h3>
                
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h3 class="card-title">Зарплата от {{ number_format($vacancy->salary, 0, ',', '.') }} ₽</h3>
                        <p class="card-text">Город: {{ $vacancy->city }}</p>
                        <p class="card-text">Организация: {{ $vacancy->company }}</p>
                        <p class="card-text">Опыт: {{ $vacancy->experience }}</p>
                        <p class="card-text">Описание: {{ $vacancy->description }}</p>
                        
                        <div class="d-flex justify-content-between">
                            <a href="{{ route('vacancy.edit', $vacancy->id) }}" style="width: 48%" class="btn @if ($vacancy->ban) disabled @endif btn-primary">Редактировать</a>
                            <a href="{{ route('vacancy.destroy', $vacancy->id) }}" style="width: 48%" class="btn @if ($vacancy->ban) disabled @endif btn-primary">Удалить</a>
                        </div>
                        
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Опубликовано: {{ $vacancy->created_at }}</small>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Добавило человек в избранное: {{ $vacancy->countFavorite($vacancy->id) }}</small>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@endsection