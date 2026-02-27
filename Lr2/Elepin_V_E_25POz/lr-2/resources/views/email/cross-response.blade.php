<x-mail::message>
# Отклик отклонен

Отклик на вакансию «{{ $position }}» был отклонен

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

С уважением,<br>
{{ config('app.name') }}
</x-mail::message>
