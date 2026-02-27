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
            <h1 class="text-center my-5">Редактирование вакансии</h1>
        </div>
    </div>

    <form action="{{ route('vacancy.update', $vacancy->id) }}" method="POST">
        @csrf
        @method('patch')
        <div class="mb-3">
            <label for="position" class="form-label">Должность</label>
            <input value="{{ $vacancy->position }}" name="position" type="text" class="form-control @error('position') is-invalid @enderror" id="position">
            @error('position')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="salary" class="form-label">Зарплата</label>
            <input value="{{ $vacancy->salary }}" name="salary" type="text" class="form-control @error('salary') is-invalid @enderror" id="salary">
            @error('salary')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="city" class="form-label">Город</label>
            <input value="{{ $vacancy->city }}" name="city" type="text" class="form-control @error('city') is-invalid @enderror" id="city">
            @error('city')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="company" class="form-label">Компания</label>
            <input value="{{ $vacancy->company }}" name="company" type="text" class="form-control @error('company') is-invalid @enderror" id="company">
            @error('company')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Дополнительная информация</label>
            <input value="{{ $vacancy->description }}" name="description" type="text" class="form-control @error('description') is-invalid @enderror" id="description">
            @error('description')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="experience" class="form-label">Опыт работы</label>
            <select name="experience" class="form-select @error('experience') is-invalid @enderror" id="experience">
                <option disabled>-- Выберите опыт работы --</option>
                <option @if($vacancy->experience == 'Без опыта') selected @endif value="Без опыта">Без опыта</option>  
                <option @if($vacancy->experience == 'До 3 лет') selected @endif value="До 3 лет">До 3 лет</option>  
                <option @if($vacancy->experience == 'От 3 до 6 лет') selected @endif value="От 3 до 6 лет">От 3 до 6 лет</option>  
                <option @if($vacancy->experience == 'Более 6 лет') selected @endif value="Более 6 лет">Более 6 лет</option>  
            </select>
            @error('experience')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <button type="submit" class="btn btn-primary">Отправить</button>
    </form>
@endsection