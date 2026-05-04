// ============================================

(function() {

    var burgerBtn = document.getElementById('burger-btn');
    var navList = document.getElementById('nav-list');
    if (burgerBtn && navList) {
        burgerBtn.addEventListener('click', function() {
            navList.classList.toggle('open');
        });
    }

    var scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var openCartFromMenu = document.getElementById('open-cart-from-menu');
    if (openCartFromMenu) {
        openCartFromMenu.addEventListener('click', function() {
            var cartModal = document.getElementById('cart-modal');
            if (cartModal) cartModal.style.display = 'flex';
        });
    }

    var faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(function(item) {
            var question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                faqItems.forEach(function(other) {
                    if (other !== item) other.classList.remove('open');
                });
                item.classList.toggle('open');
            });
        });
    }

})();
