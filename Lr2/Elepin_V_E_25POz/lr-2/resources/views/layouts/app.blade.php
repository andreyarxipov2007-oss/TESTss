<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="{{ URL::asset("css/style.css") }}">
    <script src="{{ URL::asset('js/jquery-3.7.0.min.js') }}"></script>
    <script src="{{ URL::asset('js/jquery.mask.min.js') }}"></script>
    <script src="{{ URL::asset('js/modal.js') }}"></script>
    <script src="{{ URL::asset('js/mask.js') }}"></script>

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{-- {{ config('app.name', 'Laravel') }} --}}
                    <img width="50px" src="{{ asset('images/logo.png') }}" alt="">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">
                        
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->

                        @if (Route::has('vacancy.index'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('vacancy.index') }}">{{ __('Вакансии') }}</a>
                            </li>
                        @endif

                        @if (Route::has('service.index'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('service.index') }}">{{ __('Услуги') }}</a>
                            </li>
                        @endif

                        @guest

                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Регистрация') }}</a>
                                </li>
                            @endif

                            @if (Route::has('login'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Вход') }}</a>
                                </li>
                            @endif

                        @else

                            
                        
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->status }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    @if (Auth::user()->status == 'Администратор')
                            
                                        {{-- <a class="dropdown-item" href="">{{ __('Админ панель') }}</a> --}}
                                        
                                        
                                        <a class="dropdown-item" href="{{ route('service.create') }}">Добавить услугу</a> 
                                        <a class="dropdown-item" href="{{ route('admin.order-service') }}">Заказанные услуги</a> 
                                    @else
                                        
                                        {{-- <a class="dropdown-item" href="{{ route('lk.index') }}">{{ __('Личный кабинет') }}</a> --}}
                                        
                                        <a class="dropdown-item" href="{{ route('favorite.index') }}">Избранные вакансии</a>    
            
                                        @if(Auth::user()->status == "Соискатель")
                                            <a class="dropdown-item" href="{{ route('resume.index') }}">Мои резюме</a>    
                                        @else    
                                            <a class="dropdown-item" href="{{ route('vacancy.my-vacancy') }}">Мои вакансии</a>    
                                        @endif

                                        <a class="dropdown-item" href="{{ route('response.index') }}">Отклики</a>

                                        <a class="dropdown-item" href="{{ route('order-service.index') }}">Заказанные услуги</a>    
                                    
                                    @endif
                                    
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Выйти') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                    
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            <div class="container">
                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>
