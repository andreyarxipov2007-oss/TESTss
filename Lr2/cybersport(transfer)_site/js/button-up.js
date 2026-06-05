let btnUp = document.getElementById('btnUp');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        btnUp.style.display = 'block';
    } else {
        btnUp.style.display = 'none';
    }
});

btnUp.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});