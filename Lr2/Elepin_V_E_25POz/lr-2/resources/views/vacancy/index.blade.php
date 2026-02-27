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
            <h1 class="text-center my-5">Вакансии</h1>
        </div>
    </div>

    
    <div class="row mb-5">
        <div class="col-12">
            <form action="{{ route('vacancy.search') }}" class="d-flex">
                  <input class="form-control me-2" name="search" type="search" placeholder="Поиск..." aria-label="Search">
                  <button class="btn btn-outline-primary" type="submit">Найти</button>
            </form>
            @isset($search)
                <div>Результат поиска: "{{ $search }}"</div>
                <a href="{{ route('vacancy.index') }}">Сбросить поиск</a>
            @endisset
        </div>
    </div>

    @if ($vacancies->isEmpty())
        <div class="row">
            <div class="col-12">
                <h1>Вакансии не найдены...</h1>
            </div>
        </div>
    @endif

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
        @foreach ($vacancies as $vacancy)
            <div class="col">
                <div class="card h-100 @if($vacancy->ban) opacity-50 @endif">
                    <h3 class="card-header d-flex justify-content-between align-items-center">
                        
                        {{ $vacancy->position }}
                        
                        @auth
                            @if (Auth::user()->status != 'Администратор' and $vacancy->ban == 0)
                                <a href="{{ route('add-favorite', $vacancy->id) }}">
                                    @if ($vacancy->isFavorite($vacancy->id))
                                        <img style="height: 50px" src="{{ asset('images/blue_heart.png') }}" alt="">    
                                    @else
                                        <img style="height: 50px" src="{{ asset('images/black_heart.png') }}" alt="">
                                    @endif
                                </a>
                            @endif

                            @if(Auth::user()->status == 'Администратор')
    
                                <a href="{{ route('vacancy.ban', $vacancy->id) }}">
                                    @if ($vacancy->ban)
                                        <img style="height: 50px" src="{{ asset('images/check.png') }}" alt="">       
                                    @else
                                        <img style="height: 50px" src="{{ asset('images/ban.png') }}" alt="">       
                                    @endif
                                </a>
                            
                            @endif
                        @endauth

                    </h3>
                
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h3 class="card-title">Зарплата от {{ number_format($vacancy->salary, 0, ',', '.') }} ₽</h3>
                        <p class="card-text">Город: {{ $vacancy->city }}</p>
                        <p class="card-text">Организация: {{ $vacancy->company }}</p>
                        <p class="card-text">Опыт: {{ $vacancy->experience }}</p>
                        <p class="card-text">Описание: {{ $vacancy->description }}</p>
                        
                        <div class="d-flex justify-content-between">
                            <button
                                style="width: 48%"
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#ContactModal"
                                data-name="{{ $vacancy->user->name }}"
                                data-surname="{{ $vacancy->user->surname }}"
                                data-patronymic="{{ $vacancy->user->patronymic }}"
                                data-phone="{{ $vacancy->user->phone }}"
                                data-email="{{ $vacancy->user->email }}"
                                @if ($vacancy->ban) disabled @endif
                            >
                                Контакты
                            </button>
                            @auth

                                @if(Auth::user()->status == 'Соискатель')

                                    <button
                                        style="width: 48%"
                                        type="button"
                                        class="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#ResponseModal"
                                        data-vacancy-id="{{ $vacancy->id }}"
                                        @if ($vacancy->isResponse($vacancy->id) or $vacancy->ban) disabled @endif
                                    >
                                        Откликнуться
                                    </button>
                                    
                                @endif

                            @endauth
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












    {{-- Модальное окно для контактов --}}
    <div class="modal fade" id="ContactModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="fio" class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4 id="phone"></h4>
                    <h4 id="email"></h4>
                </div>
            </div>
        </div>
    </div>

    {{-- Модальное окно для откликов --}}
    <div class="modal fade" id="ResponseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Выберите подходящее резюме</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="{{ route('response.store') }}" method="POST">
                        @csrf
                    
                        <div class="mb-3">
                            <label for="resume_id" class="form-label">Резюме</label>
                            <select name="resume_id" class="form-select @error('resume_id') is-invalid @enderror" id="resume_id">
                                <option disabled selected>-- Выберите резюме --</option>
                                @foreach ($resumes as $resume)
                                    <option value="{{ $resume->id }}">{{ $resume->position }} ({{ number_format($resume->salary, 0, ',', '.')}} ₽)</option>
                                
                                @endforeach  
                            </select>
                            @error('resume_id')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    
                        <input type="hidden" id="vacancy_id" name="vacancy_id">
                    
                        <button type="submit" class="btn btn-primary">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection