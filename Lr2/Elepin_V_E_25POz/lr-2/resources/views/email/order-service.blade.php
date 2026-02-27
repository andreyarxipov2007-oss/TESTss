<x-mail::message>
# Заказанная услуга

Была заказанна услуга «{{ $name }}»

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

С уважением,<br>
{{ config('app.name') }}
</x-mail::message>
