// --- СКРИПТ 1: Переключение вкладок ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// --- СКРИПТ 2: Приветствие ---
const greetBtn = document.getElementById('greet-btn');
const greetOutput = document.getElementById('greet-output');

greetBtn.addEventListener('click', () => {
    const messages = [
        "Привет! Горы зовут!",
        "Время планировать новое путешествие!",
        "Не забудьте проверить снаряжение!",
        "Лучший вид открывается после самого трудного подъема."
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    greetOutput.textContent = randomMsg;
});

// --- СКРИПТ 3: Счетчик и Форма ---
let expeditionCount = 1550;
const countDisplay = document.getElementById('exp-count');
const countBtn = document.getElementById('count-btn');

countDisplay.textContent = expeditionCount;

countBtn.addEventListener('click', () => {
    expeditionCount++;
    countDisplay.textContent = expeditionCount;
    countDisplay.style.color = '#e74c3c';
    setTimeout(() => countDisplay.style.color = 'inherit', 300);
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    formStatus.textContent = `Спасибо, ${name}! Заявка отправлена.`;
    formStatus.style.color = '#27ae60';
    contactForm.reset();
    setTimeout(() => formStatus.textContent = '', 5000);
});

// --- СКРИПТ 4: Интерактивные маршруты и Модальное окно ---

// База данных маршрутов (объект)
const routesData = {
    alps: {
        title: "Тур по Альпам",
        desc: "Недельное путешествие через Францию, Италию и Швейцарию. Вас ждут ледники, уютные шале и невероятные панорамы Монблана. Подходит для людей со средней физической подготовкой.",
        color: "#a8d5ba"
    },
    everest: {
        title: "Базовый лагерь Эвереста",
        desc: "Экспедиция мечты в Непал. 14 дней треккинга через леса Кхумбу к подножию самой высокой горы мира. Требуется хорошая выносливость и акклиматизация.",
        color: "#f9d5bb"
    },
    caucasus: {
        title: "Домбай и Архыз",
        desc: "Идеальный вариант для начала. 5 дней живописных долин, водопадов и горных озер Карачаево-Черкесии. Комфортные условия и вкусная национальная кухня.",
        color: "#bbd5f9"
    }
};

const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close-modal');
const routeButtons = document.querySelectorAll('.route-btn');

// Открытие модального окна
routeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const routeKey = btn.getAttribute('data-route');
        const data = routesData[routeKey];

        if (data) {
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            
           	 // Находим картинку внутри той карточки, на которую нажали
		const cardImg = btn.parentElement.parentElement.querySelector('img').src;

		// Вставляем картинку в модальное окно
		modalImage.innerHTML = `<img src="${cardImg}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">`;
		modalImage.style.backgroundColor = 'transparent'; // Убираем цветной фон
            
            modalOverlay.style.display = 'flex';
        }
    });
});

// Закрытие модального окна (крестик)
closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Закрытие модального окна (клик вне области контента)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Кнопка "Забронировать" внутри модального окна
document.querySelector('.book-btn').addEventListener('click', () => {
    alert('Функция бронирования скоро будет доступна! Перейдите во вкладку Заявки, чтобы оставить заявку.');
    modalOverlay.style.display = 'none';
    // Автоматический переход на вкладку контактов
    document.querySelector('[data-tab="contact"]').click();
});