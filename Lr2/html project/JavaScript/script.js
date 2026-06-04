//Скрипт 1.Скрытые ответы//
document.addEventListener("DOMContentLoaded", () => {
 const faqItems = document.querySelectorAll('.faq_item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
//Скрипт 2.Визуал карточек//
document.querySelectorAll('.review_card').forEach(card => {
    card.onmouseover = () => {
        card.style.transform = 'translateY(-10px)';
        card.style.backgroundColor = '#e3f2fd'; 
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        card.style.transition = '0.4s ease'; 
    };
    card.onmouseout = () => {
        card.style.transform = 'translateY(0)';
        card.style.backgroundColor = '#ffffff'; 
        card.style.boxShadow = 'none';
    };
});
//Скрипт 3.Показывает сколько осталось мест//
document.querySelectorAll('.service_card').forEach(card => {
        const seats = Math.floor(Math.random() * 5) + 1;
        const info = document.createElement('p');
        info.style = 'color: #677ab1; font-size: 14px; font-weight: bold; margin-bottom: 10px;';
        info.innerText = `🔥 Мест осталось: ${seats}`;
        
        const btn = card.querySelector('.service_btn');
        if (btn) btn.before(info);
    });
}); 