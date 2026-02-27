<x-mail::message>
# Отклик приянт

Отклик на вакансию «{{ $position }}» был принят

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

С уважением,<br>
{{ config('app.name') }}
</x-mail::message>
