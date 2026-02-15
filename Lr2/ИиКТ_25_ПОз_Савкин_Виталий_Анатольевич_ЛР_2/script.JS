// ======== ПЕРЕКЛЮЧЕНИЕ МЕЖДУ СТРАНИЦАМИ ========
const pageButtons = document.querySelectorAll('.page-button');
const pages = document.querySelectorAll('.page');

pageButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем активный класс у всех кнопок
        pageButtons.forEach(btn => btn.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        // Получаем id страницы
        const pageId = this.getAttribute('data-page');
        
        // Скрываем все страницы
        pages.forEach(page => page.classList.remove('active'));
        
        // Показываем нужную страницу
        document.getElementById(pageId).classList.add('active');
    });
});

// ======== СТРАНИЦА 1: Переключение цвета ========
const colorSwitch = document.getElementById('colorSwitch');
const colorDisplay = document.getElementById('colorDisplay');
const cards = document.querySelectorAll('.card');
let isWhite = true; // белый фон сейчас

if (colorSwitch) {
    colorSwitch.addEventListener('click', function() {
        if (isWhite) {
            // Делаем черный фон
            cards.forEach(card => {
                card.classList.add('black');
            });
            colorDisplay.textContent = 'Сейчас: черный фон';
            isWhite = false;
        } else {
            // Делаем белый фон
            cards.forEach(card => {
                card.classList.remove('black');
            });
            colorDisplay.textContent = 'Сейчас: белый фон';
            isWhite = true;
        }
    });
}

// ======== СТРАНИЦА 2: Счетчик нажатий ========
const btns = document.querySelectorAll('.big-btn');
const counterSpan = document.getElementById('counter');
const resetBtn = document.getElementById('resetCounter');
let count = 0;

if (btns.length > 0) {
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            count++;
            if (counterSpan) {
                counterSpan.textContent = count;
            }
            
            // Визуальный эффект
            this.style.backgroundColor = '#fff';
            this.style.color = '#000';
            setTimeout(() => {
                this.style.backgroundColor = '#000';
                this.style.color = '#fff';
            }, 100);
        });
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        count = 0;
        counterSpan.textContent = '0';
    });
}

// ======== СТРАНИЦА 3: Изменение размера ========
const smallBtn = document.getElementById('smallSize');
const mediumBtn = document.getElementById('mediumSize');
const largeBtn = document.getElementById('largeSize');
const boxes = document.querySelectorAll('.box');

function removeSizeClasses() {
    boxes.forEach(box => {
        box.classList.remove('small', 'medium', 'large');
    });
}

if (smallBtn) {
    smallBtn.addEventListener('click', function() {
        removeSizeClasses();
        boxes.forEach(box => {
            box.classList.add('small');
        });
    });
}

if (mediumBtn) {
    mediumBtn.addEventListener('click', function() {
        removeSizeClasses();
        boxes.forEach(box => {
            box.classList.add('medium');
        });
    });
}

if (largeBtn) {
    largeBtn.addEventListener('click', function() {
        removeSizeClasses();
        boxes.forEach(box => {
            box.classList.add('large');
        });
    });
}

// Добавляем средний размер по умолчанию при загрузке
window.addEventListener('load', function() {
    if (boxes.length > 0) {
        boxes.forEach(box => {
            box.classList.add('medium');
        });
    }
});