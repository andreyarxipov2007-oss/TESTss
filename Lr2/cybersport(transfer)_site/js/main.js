const btnUp = document.getElementById('btnUp');
if (btnUp) {
    window.addEventListener('scroll', () => {
        btnUp.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btnUp.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}