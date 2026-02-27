@extends('layouts.app')
@section('content')

    <div class="row">
        <div class="col-12">
            <h1 class="text-center my-5">Создание резюме</h1>
        </div>
    </div>

    <form action="{{ route('resume.store') }}" method="POST">
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
            <label for="education" class="form-label">Образование</label>
            <select name="education" class="form-select @error('education') is-invalid @enderror" id="education">
                <option disabled @if(!old('education')) selected @endif>-- Выберите образование --</option>
                <option @if(old('education') == 'Основное') selected @endif value="Основное">Основное</option>  
                <option @if(old('education') == 'Среднее') selected @endif value="Среднее">Среднее</option>  
                <option @if(old('education') == 'Среднее профессиональное') selected @endif value="Среднее профессиональное">Среднее профессиональное</option>  
                <option @if(old('education') == 'Высшее') selected @endif value="Высшее">Высшее</option>  
                <option @if(old('education') == 'Бакалавр') selected @endif value="Бакалавр">Бакалавр</option>  
                <option @if(old('education') == 'Магистр') selected @endif value="Магистр">Магистр</option>  
                <option @if(old('education') == 'Кандидат наук') selected @endif value="Кандидат наук">Кандидат наук</option>  
                <option @if(old('education') == 'Доктор наук') selected @endif value="Доктор наук">Доктор наук</option>  
            </select>
            @error('education')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="education_place" class="form-label">Место получения образование</label>
            <input name="education_place" placeholder="Необязательное поле" type="text" class="form-control @error('education_place') is-invalid @enderror" id="education_place" value="{{ old('education_place') }}" autocomplete="education_place">
            @error('education_place')
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

        <div class="mb-3">
            <label for="experience_place" class="form-label">Место получения опыта работы</label>
            <input name="experience_place" placeholder="Необязательное поле" type="text" class="form-control @error('experience_place') is-invalid @enderror" id="experience_place" value="{{ old('experience_place') }}" autocomplete="experience_place">
            @error('experience_place')
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

        <button type="submit" class="btn btn-primary">Отправить</button>
    </form>
@endsection