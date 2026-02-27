@extends('layouts.app')
@section('content')

    <div class="row">
        <div class="col-12">
            <h1 class="text-center my-5">Создание услуги</h1>
        </div>
    </div>

    <form action="{{ route('service.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Название</label>
            <input name="name" type="text" class="form-control @error('name') is-invalid @enderror" id="name" value="{{ old('name') }}" autocomplete="name">
            @error('name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">Цена</label>
            <input name="price" type="text" class="form-control @error('price') is-invalid @enderror" id="price" value="{{ old('price') }}" autocomplete="price">
            @error('price')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Описание</label>
            <input name="description" type="text" class="form-control @error('description') is-invalid @enderror" id="description" value="{{ old('description') }}" autocomplete="description">
            @error('description')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="user_status" class="form-label">Для кого услуга</label>
            <select name="user_status" class="form-select @error('user_status') is-invalid @enderror" id="user_status">
                <option disabled @if(!old('user_status')) selected @endif>-- Выберите для кого услуга --</option>
                <option @if(old('user_status') == 'Работодатель') selected @endif value="Работодатель">Работодатель</option>  
                <option @if(old('user_status') == 'Соискатель') selected @endif value="Соискатель">Соискатель</option>  
            </select>
            @error('user_status')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <button type="submit" class="btn btn-primary">Отправить</button>
    </form>
@endsection