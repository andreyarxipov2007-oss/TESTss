// ============================================

var cart = JSON.parse(localStorage.getItem('imperiaCart')) || [];

function addToCart(id, name, price) {
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            existing = cart[i];
            break;
        }
    }

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCartUI();
}

function removeFromCart(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            if (cart[i].quantity > 1) {
                cart[i].quantity--;
            } else {
                cart.splice(i, 1);
            }
            break;
        }
    }

    updateCartUI();
}

function clearCartAll() {
    cart = [];
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem('imperiaCart', JSON.stringify(cart));

    var totalSum = 0;
    for (var i = 0; i < cart.length; i++) {
        totalSum += cart[i].price * cart[i].quantity;
    }

    var cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.innerText = totalSum;
    }

    var cartList = document.getElementById('cart-list');
    var cartTotalSpan = document.getElementById('cart-total');

    if (!cartList || !cartTotalSpan) return;

    if (cart.length === 0) {
        cartList.innerHTML = '<li style="text-align: center; padding: 16px; background: #ecd6b9; border-radius: 30px;">🛒 Корзина пуста. Добавьте вкусняшки!</li>';
        cartTotalSpan.innerText = '0 ₽';
        return;
    }

    var html = '';
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        html += '<li class="cart-item">';
        html += '<span class="cart-item-name">' + item.name + ' x' + item.quantity + '</span>';
        html += '<div class="cart-item-controls">';
        html += '<span class="cart-item-price">' + (item.price * item.quantity) + ' ₽</span>';
        html += '<button class="cart-item-remove" data-id="' + item.id + '">−</button>';
        html += '</div>';
        html += '</li>';
    }
    cartList.innerHTML = html;

    var removeButtons = document.querySelectorAll('.cart-item-remove');
    for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function(e) {
            e.stopPropagation();
            var id = parseInt(this.dataset.id);
            removeFromCart(id);
        });
    }

    cartTotalSpan.innerText = totalSum + ' ₽';
}

(function() {
    updateCartUI();

    var openCartBtn = document.getElementById('open-cart');
    var cartModal = document.getElementById('cart-modal');
    var closeCartBtn = document.getElementById('close-cart');
    var clearCartBtn = document.getElementById('clear-cart');
    var checkoutBtn = document.getElementById('checkout-btn');
    var orderFormContainer = document.getElementById('order-form-container');
    var deliveryForm = document.getElementById('delivery-form');

    if (openCartBtn && cartModal) {
        openCartBtn.addEventListener('click', function() {
            cartModal.style.display = 'flex';
            if (orderFormContainer) {
                orderFormContainer.style.display = 'none';
            }
        });
    }

    if (closeCartBtn && cartModal) {
        closeCartBtn.addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
    }

    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            clearCartAll();
        });
    }

    if (checkoutBtn && orderFormContainer) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Корзина пуста! Добавьте блюда для заказа.');
                return;
            }
            orderFormContainer.style.display = 'block';
        });
    }

    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (cart.length === 0) {
                alert('Ваша корзина пуста');
                return;
            }

            alert('Спасибо! Ваш заказ принят. Скоро с вами свяжется оператор для подтверждения. Приятного аппетита!');

            clearCartAll();
            if (cartModal) cartModal.style.display = 'none';
            deliveryForm.reset();
            if (orderFormContainer) orderFormContainer.style.display = 'none';
        });
    }
})();


