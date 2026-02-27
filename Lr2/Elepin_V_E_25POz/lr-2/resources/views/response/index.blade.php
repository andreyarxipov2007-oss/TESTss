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
            <h1 class="text-center my-5">Отклики</h1>
        </div>
    </div>

    @if ($responses->isEmpty())
        <div class="row">
            <div class="col-12">
                <h1>У вас нет откликов...</h1>
            </div>
        </div>
    @endif

    <div class="row row-cols-1 g-4">
        @foreach ($responses as $response)
            <div class="col">
                <div class="card @if($response->vacancy->ban) opacity-50 @endif h-100">
                    <h3 class="card-header d-flex justify-content-between align-items-center fs-5">
                        <button
                            type="button"
                            class="btn btn-lg btn-link"
                            data-bs-toggle="modal"
                            data-bs-target="#VacancyModal"
                            data-position="{{ $response->vacancy->position }}"
                            data-phone="{{ $response->vacancy->user->phone }}"
                            data-email="{{ $response->vacancy->user->email }}"
                            data-salary="{{ $response->vacancy->salary }}"
                            data-city="{{ $response->vacancy->city }}"
                            data-company="{{ $response->vacancy->company }}"
                            data-description="{{ $response->vacancy->description }}"
                            data-experience="{{ $response->vacancy->experience }}"
                            data-created-at="{{ $response->vacancy->created_at }}"
                            @if ($response->vacancy->ban) disabled @endif
                        >
                            Вакансия:
                            {{ $response->vacancy->position }}
                        </button>
                        
                        <div>
                            Статус:
                            {{ $response->status }}
                        </div>
                        
                    </h3>
                    
                    <div class="card-body">
                        <h4 class="card-text d-flex justify-content-between align-items-center fs-5">
                            
                            <button
                                type="button"
                                class="btn btn-lg btn-link"
                                data-bs-toggle="modal"
                                data-bs-target="#ResumeModal"
                                data-position="{{ $response->resume->position }}"
                                data-phone="{{ $response->user->phone }}"
                                data-email="{{ $response->user->email }}"
                                data-salary="{{ $response->resume->salary }}"
                                data-education="{{ $response->resume->education }}"

                                @if (!empty($responce->resume->education_place))
                                    data-education-place="{{ $response->resume->education_place }}"
                                @endif

                                data-experience="{{ $response->resume->experience }}"
                                
                                @if (!empty($responce->resume->experience_place))
                                    data-experience-place="{{ $response->resume->experience_place }}"
                                @endif

                                data-description="{{ $response->resume->description }}"
                                data-created-at="{{ $response->resume->created_at }}"
                                @if ($response->vacancy->ban) disabled @endif
                            >
                                Резюме:
                                {{ $response->resume->position }}
                            </button>
                            <div>
                                @if (Auth::user()->status == 'Работодатель' and $response->vacancy->ban == 0)
                                    @if ($response->status == 'В ожидании')
                                        <a href="{{ route('response.check', $response->id) }}"><img width="50px" src="images/check.png" alt=""></a>
                                        <a href="{{ route('response.cross', $response->id) }}"><img width="50px" src="images/cross.png" alt=""></a>
                                    @endif
                                @endif
                            </div>
                        </h4>
                    </div>

                    <div class="card-footer">
                        <small class="text-muted">Дата отклика: {{ $response->created_at }}</small>
                    </div>
                    
                </div>
            </div>
        @endforeach
    </div>














    {{-- Модальное окно вакансий --}}
    <div class="modal fade" id="VacancyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="position" class="modal-title" id="exampleModalLabel"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    
                </div>
                <div class="modal-body">
                    <h4>Номер телефона: <span id="phone"></span></h4>
                    <h4>Электронная почта: <span id="email"></span></h4>
                    <h4>Зарплата от <span id="salary"></span> ₽</h4>
                    <h4>Город: <span id="city"></span></h4>
                    <h4>Организация: <span id="company"></span></h4>
                    <h4>Опыт работы: <span id="experience"></span></h4>
                    <h4>Описание: <span id="description"></span></h4>
                </div>
                <div class="modal-footer">
                    <p>Опубликовано: <span id="created_at"></span></p>
                </div>
            </div>
        </div>
    </div>

    {{-- Модальное окно резюме --}}
    <div class="modal fade" id="ResumeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="position" class="modal-title" id="exampleModalLabel"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4>Номер телефона: <span id="phone"></span></h4>
                    <h4>Электронная почта: <span id="email"></span></h4>
                    <h4>Желаемая зарплата: <span id="salary"></span> ₽</h4>
                    <h4>Образование: <span id="education"></span></h4>
                    <h4>Место получения образования: <span id="education_place"></span></h4>
                    <h4>Опыт работы: <span id="experience"></span></h4>
                    <h4>Место получения опыта работы: <span id="experience_place"></span></h4>
                    <h4>Описание: <span id="description"></span></h4>
                </div>
                <div class="modal-footer">
                    <p>Опубликовано: <span id="created_at"></span></p>
                </div>
            </div>
        </div>
    </div>

@endsection