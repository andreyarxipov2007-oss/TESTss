// 1 Авто слайдер
let slideIndex = 0;
const slides = document.querySelectorAll('#autoSlider .slide');
if (slides.length) {
    setInterval(() => {
        slides.forEach(s => s.classList.remove('active'));
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }, 4000);
}

// 2 Ручной слайдер
let manualIndex = 0;
const images = document.querySelectorAll('#manualSlider img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.getElementById('dots');

function updateManual() {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === manualIndex);
    });
    const dotsAll = document.querySelectorAll('.dot');
    dotsAll.forEach((dot, i) => {
        dot.classList.toggle('active', i === manualIndex);
    });
}

if (images.length) {
    images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => { manualIndex = i; updateManual(); };
        dots.appendChild(dot);
    });
    prevBtn.onclick = () => { manualIndex = (manualIndex - 1 + images.length) % images.length; updateManual(); };
    nextBtn.onclick = () => { manualIndex = (manualIndex + 1) % images.length; updateManual(); };
    updateManual();
}

// 3 Модальное окно для абонементов
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>Узнать стоимость</h3>
        <input type="text" id="userName" placeholder="Ваше имя">
        <input type="tel" id="userPhone" placeholder="Номер телефона">
        <button class="btn" id="submitBtn">Отправить</button>
    </div>
`;
document.body.appendChild(modal);

window.showModal = () => {
    modal.style.display = 'flex';
};

modal.querySelector('.close').onclick = () => {
    modal.style.display = 'none';
};

modal.querySelector('#submitBtn').onclick = () => {
    modal.style.display = 'none';
    document.getElementById('userName').value = '';
    document.getElementById('userPhone').value = '';
};

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
};