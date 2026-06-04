// Скрипт 1: Переключение вкладок
function showTab(tabId, btn) {
  // Скрываем все вкладки
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tab) {
    tab.classList.add('hidden');
  });

  // Убираем active со всех кнопок
  var buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(function(b) {
    b.classList.remove('active');
  });

  // Показываем нужную вкладку
  document.getElementById(tabId).classList.remove('hidden');

  // Делаем нажатую кнопку активной
  btn.classList.add('active');
}


// Скрипт 2: Корзина
var cart = [];

function addToCart(name, price) {
  // Ищем, есть ли уже такой товар
  var existing = cart.find(function(item) {
    return item.name === name;
  });

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: name, price: price, qty: 1 });
  }

  renderCart();
}

function renderCart() {
  var list     = document.getElementById('cart-list');
  var empty    = document.getElementById('cart-empty');
  var total    = document.getElementById('cart-total');
  var clearBtn = document.getElementById('clear-btn');

  list.innerHTML = '';

  if (cart.length === 0) {
    empty.style.display    = 'block';
    total.style.display    = 'none';
    clearBtn.style.display = 'none';
    return;
  }

  empty.style.display    = 'none';
  total.style.display    = 'block';
  clearBtn.style.display = 'inline-block';

  var sum = 0;

  cart.forEach(function(item) {
    sum += item.price * item.qty;
    var li = document.createElement('li');
    li.textContent = item.name + ' × ' + item.qty + ' — ' + (item.price * item.qty).toLocaleString('ru-RU') + ' ₽';
    list.appendChild(li);
  });

  document.getElementById('total-price').textContent = sum.toLocaleString('ru-RU') + ' ₽';
}

function clearCart() {
  cart = [];
  renderCart();
}


// Скрипт 3: Валидация и отправка формы
function sendForm(event) {
  event.preventDefault();

  var name    = document.getElementById('name').value.trim();
  var email   = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var msg     = document.getElementById('form-msg');

  // Проверяем, заполнены ли поля
  if (!name || !email || !message) {
    msg.style.color   = 'red';
    msg.textContent   = 'Пожалуйста, заполните все поля!';
    return;
  }

  // Простая проверка формата e-mail
  if (!email.includes('@') || !email.includes('.')) {
    msg.style.color = 'red';
    msg.textContent = 'Введите корректный e-mail!';
    return;
  }

  // Успех
  msg.style.color = 'green';
  msg.textContent = '✅ Сообщение отправлено! Мы свяжемся с вами.';
  document.getElementById('contact-form').reset();
}