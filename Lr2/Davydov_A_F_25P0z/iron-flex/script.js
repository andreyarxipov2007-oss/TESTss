// СКРИПТ 1: УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ
const modal = document.getElementById('order-modal');

function openOrder(plan) {
    if (modal) {
        document.getElementById('plan-text').innerText = "Выбран тариф: " + plan;
        modal.style.display = 'flex';
        const phoneInput = document.getElementById('phone');
        if (phoneInput) phoneInput.value = "+7 ";
    }
}

function closeOrder() {
    if (modal) modal.style.display = 'none';
}

// Закрытие по клику вне окна
window.onclick = function(event) {
    if (event.target === modal) {
        closeOrder();
    }
}

function send() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value.length < 18) {
        alert("Пожалуйста, введите номер телефона полностью!");
    } else {
        alert("Заявка успешно отправлена! Мы скоро свяжемся с вами.");
        closeOrder();
    }
}

// СКРИПТ 2: МАСКА ДЛЯ ВВОДА ТЕЛЕФОНА
const phoneField = document.getElementById('phone');

if (phoneField) {
    phoneField.addEventListener('input', function(e) {
        // Все нецифровые символы
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        
        // Если стерли первую цифру, оставляем дефолтный префикс
        if (!x[2]) {
            e.target.value = "+7 ";
            return;
        }
        
        // Красивый вывод: +7 (XXX) XXX-XX-XX
        e.target.value = "+7 (" + x[2] + (x[3] ? ") " + x[3] : "") + (x[4] ? "-" + x[4] : "") + (x[5] ? "-" + x[5] : "");
    });
}

// СКРИПТ 3: КАЛЬКУЛЯТОР ВЫГОДЫ
const slider = document.getElementById('range-slider');
const monthsDisplay = document.getElementById('m-count');
const resultDisplay = document.getElementById('res-val');

function calculateDiscount() {
    if (!slider || !monthsDisplay || !resultDisplay) return;
    
    const months = slider.value;
    monthsDisplay.innerText = months;
    
    // Формула: скидка 500 рублей за каждый выбранный месяц
    const discountAmount = months * 500;
    
    // Вывод с разделением тысяч
    resultDisplay.innerText = discountAmount.toLocaleString('ru-RU') + " ₽";
}

// Изменения ползунка
if (slider) {
    slider.addEventListener('input', calculateDiscount);
    calculateDiscount(); // Вызываем один раз при загрузке страницы
}

