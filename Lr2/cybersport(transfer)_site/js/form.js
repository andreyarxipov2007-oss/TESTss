let form = document.getElementById('reviewForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let message = document.getElementById('message').value;
    
    if (name && message) {
        alert('Спасибо, ' + name + '! Ваш отзыв отправлен!');
        form.reset();
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});