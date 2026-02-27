@extends('layouts.app')
@section('content')

    <div class="row">
        <div class="col-12">
            <h1 class="text-center my-5">Создание вакансии</h1>
        </div>
    </div>

    <form action="{{ route('vacancy.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="position" class="form-label">Должность</label>
            <input name="position" type="text" class="form-control @error('position') is-invalid @enderror" id="position" value="{{ old('position') }}" autocomplete="position">
            @error('position')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="salary" class="form-label">Зарплата</label>
            <input name="salary" type="text" class="form-control @error('salary') is-invalid @enderror" id="salary" value="{{ old('salary') }}" autocomplete="salary">
            @error('salary')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="city" class="form-label">Город</label>
            <input name="city" type="text" class="form-control @error('city') is-invalid @enderror" id="city" value="{{ old('city') }}" autocomplete="city">
            @error('city')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="company" class="form-label">Компания</label>
            <input name="company" type="text" class="form-control @error('company') is-invalid @enderror" id="company" value="{{ old('company') }}" autocomplete="company">
            @error('company')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Дополнительная информация</label>
            <input name="description" type="text" class="form-control @error('description') is-invalid @enderror" id="description" value="{{ old('description') }}" autocomplete="description">
            @error('description')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="experience" class="form-label">Опыт работы</label>
            <select name="experience" class="form-select @error('experience') is-invalid @enderror" id="experience">
                <option disabled @if(!old('experience')) selected @endif>-- Выберите опыт работы --</option>
                <option @if(old('experience') == 'Без опыта') selected @endif value="Без опыта">Без опыта</option>  
                <option @if(old('experience') == 'До 3 лет') selected @endif value="До 3 лет">До 3 лет</option>  
                <option @if(old('experience') == 'От 3 до 6 лет') selected @endif value="От 3 до 6 лет">От 3 до 6 лет</option>  
                <option @if(old('experience') == 'Более 6 лет') selected @endif value="Более 6 лет">Более 6 лет</option>  
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