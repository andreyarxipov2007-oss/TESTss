window.addEventListener('scroll', function() {
    const btn = document.getElementById('toTopBtn');
    if (btn) {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addReview(event) {
    event.preventDefault();
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;
    if (name && text) {
        const reviewList = document.getElementById('review-list');
        const newReview = document.createElement('div');
        newReview.classList.add('review-item');
        newReview.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
        reviewList.prepend(newReview);
        document.getElementById('review-form').reset();
        alert('Спасибо за отзыв!');
    } else {
        alert('Заполните имя и текст отзыва');
    }
}