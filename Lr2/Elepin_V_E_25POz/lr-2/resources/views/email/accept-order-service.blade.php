<x-mail::message>
# Услуга в процессе

Заказанная вами услуга «{{ $name }}» в процессе

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

С уважением,<br>
{{ config('app.name') }}
</x-mail::message>
