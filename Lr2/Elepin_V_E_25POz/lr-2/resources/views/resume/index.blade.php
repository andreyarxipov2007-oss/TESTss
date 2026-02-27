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
            <h1 class="text-center my-5">Мои резюме</h1>
        </div>
    </div>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
        <div class="col">
            <div class="card h-100" style="min-height: 200px">
                <div class="card-body d-flex justify-content-center align-items-center text-center">
                    <h1>
                        <a href="{{ route('resume.create') }}">Создать новое резюме</a>        
                    </h1>
                </div>
            </div>
        </div>

        @foreach ($resumes as $resume)
            <div class="col">
                <div class="card h-100">
                    <h3 class="card-header d-flex justify-content-between align-items-center">
                        
                        {{ $resume->position }}

                    </h3>
                
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h3 class="card-title">Зарплата от {{ number_format($resume->salary, 0, ',', '.') }} ₽</h3>
                        <p class="card-text">Образование: {{ $resume->education }}</p>
                        @if (!empty($resume->education_place))
                        <p class="card-text">Место получения образования: {{ $resume->education_place }}</p>
                        @endif
                        <p class="card-text">Опыт работы: {{ $resume->experience }}</p>
                        @if (!empty($resume->experience_place))
                            <p class="card-text">Место получения опыта работы: {{ $resume->experience_place }}</p>
                        @endif
                        <p class="card-text">Дополнительная информация: {{ $resume->description }}</p>

                        <div class="d-flex justify-content-between">
                            <a href="{{ route('resume.edit', $resume->id) }}" style="width: 48%" class="btn btn-primary">Редактировать</a>
                            <a href="{{ route('resume.destroy', $resume->id) }}" style="width: 48%" class="btn btn-primary">Удалить</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        @endforeach
    </div>
@endsection