// СЕКЦИЯ FAQ - АККОРДЕОН
const headers = document.querySelectorAll('.accordion-header'); 
headers.forEach(header => {  
  header.addEventListener('click', function() {
    const item = this.parentElement;
    item.classList.toggle('active');
  });
});


//СЕКЦИЯ УСЛУГИ - СЛАЙДЕР
const slides = document.querySelectorAll('.slider');
let start = 0; // индекс первой показываемой карточки

function show() {
  slides.forEach((slide, index) => {
    slide.style.display = (index >= start && index < start + 4) ? 'flex' : 'none';
  });
}

show(); // показать первые 4

document.getElementById('next').onclick = () => {
  if (start < slides.length - 4) start++; 
  show();
};

document.getElementById('prev').onclick = () => {
  if (start > 0) start--; 
  show();
};