<x-mail::message>
# Услуга выполнена

Заказанная вами услуга «{{ $name }}» выполнена

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

С уважением,<br>
{{ config('app.name') }}
</x-mail::message>
