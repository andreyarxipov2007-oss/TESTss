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
            <h1 class="text-center my-5">Редактирование услуги</h1>
        </div>
    </div>

    <form action="{{ route('service.update', $service->id) }}" method="POST">
        @csrf
        @method('patch')
        <div class="mb-3">
            <label for="name" class="form-label">Название</label>
            <input value="{{ $service->name }}" name="name" type="text" class="form-control @error('name') is-invalid @enderror" id="name">
            @error('name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">Цена</label>
            <input value="{{ $service->price }}" name="price" type="text" class="form-control @error('price') is-invalid @enderror" id="price">
            @error('price')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Описание</label>
            <input value="{{ $service->description }}" name="description" type="text" class="form-control @error('description') is-invalid @enderror" id="description">
            @error('description')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3">
            <label for="user_status" class="form-label">Для кого услуга</label>
            <select name="user_status" class="form-select @error('user_status') is-invalid @enderror" id="user_status">
                <option disabled>-- Выберите для кого услуга --</option>
                <option @if($service->user_status == 'Работодатель') selected @endif value="Работодатель">Работодатель</option>  
                <option @if($service->user_status == 'Соискатель') selected @endif value="Соискатель">Соискатель</option>  
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