<x-mail::message>
# Отклик на вакансию

На вашу вакансию «{{ $position }}» откликнулись

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

С уважением,<br>
{{ config('app.name') }}
</x-mail::message>
