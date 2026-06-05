let faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    let question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});