// ============================================

(function() {

    var cards = document.querySelectorAll('.card[data-category]');
    var categoryBtns = document.querySelectorAll('.category-btn');

    if (cards.length === 0 || categoryBtns.length === 0) return;

    function filterCards(category) {
        for (var i = 0; i < cards.length; i++) {
            if (category === 'all' || cards[i].dataset.category === category) {
                cards[i].style.display = '';
            } else {
                cards[i].style.display = 'none';
            }
        }
    }

    for (var i = 0; i < categoryBtns.length; i++) {
        categoryBtns[i].addEventListener('click', function() {
            for (var j = 0; j < categoryBtns.length; j++) {
                categoryBtns[j].classList.remove('active');
            }
            this.classList.add('active');
            filterCards(this.dataset.category);
        });
    }

    var hash = window.location.hash.replace('#', '');
    if (hash && ['pizza', 'shawarma', 'home-food', 'drinks'].indexOf(hash) !== -1) {
        for (var i = 0; i < categoryBtns.length; i++) {
            categoryBtns[i].classList.remove('active');
            if (categoryBtns[i].dataset.category === hash) {
                categoryBtns[i].classList.add('active');
            }
        }
        filterCards(hash);
    }

    var addButtons = document.querySelectorAll('.add-to-cart');
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', function() {
            var id = parseInt(this.dataset.id);
            var name = this.dataset.name;
            var price = parseInt(this.dataset.price);
            if (typeof addToCart === 'function') {
                addToCart(id, name, price);
            }
        });
    }

})();
