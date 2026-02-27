<x-mail::message>
# Вакансия заблокирована

Ваша вакансия «{{ $position }}» была @if($ban) заблокирована @else разблокирована @endif

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

С уважением,<br>
{{ config('app.name') }}
</x-mail::message>
