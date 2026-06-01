/* 
   Brew & Bean — JavaScript
   Скрипты: бургер-меню, фильтрация меню,
   lightbox галереи, валидация формы, анимации скролла
*/

document.addEventListener('DOMContentLoaded', () => {

    //  1. Мобильное бургер-меню 
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav__links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            navLinks.classList.toggle('nav__links--active');
        });

        // Закрытие меню при клике на ссылку
        navLinks.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('burger--active');
                navLinks.classList.remove('nav__links--active');
            });
        });
    }

    //  2. Фильтрация меню 
    const filterButtons = document.querySelectorAll('.menu-filters__btn');
    const menuCards = document.querySelectorAll('.menu-card');

    if (filterButtons.length > 0 && menuCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Обновляем активную кнопку
                filterButtons.forEach(b => b.classList.remove('menu-filters__btn--active'));
                btn.classList.add('menu-filters__btn--active');

                const category = btn.dataset.category;

                // Фильтруем карточки
                menuCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.classList.remove('menu-card--hidden');
                    } else {
                        card.classList.add('menu-card--hidden');
                    }
                });
            });
        });
    }

    //  3. Lightbox для галереи 
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');

    if (galleryItems.length > 0 && lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox__img');
        const closeBtn = lightbox.querySelector('.lightbox__close');
        const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
        const nextBtn = lightbox.querySelector('.lightbox__nav--next');
        let currentIndex = 0;

        // Собираем URL всех изображений
        const images = Array.from(galleryItems).map(item =>
            item.querySelector('img').src
        );

        function openLightbox(index) {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightbox.classList.add('lightbox--active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('lightbox--active');
            document.body.style.overflow = '';
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex];
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex];
        }

        // Клик по фото открывает lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        // Кнопки управления
        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Закрытие по клику на фон
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Управление клавиатурой
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('lightbox--active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

    //  4. Валидация формы обратной связи 
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const fields = {
            name: {
                input: document.getElementById('formName'),
                error: document.getElementById('nameError'),
                validate(value) {
                    if (!value.trim()) return 'Пожалуйста, введите ваше имя';
                    if (value.trim().length < 2) return 'Имя должно содержать не менее 2 символов';
                    return '';
                }
            },
            email: {
                input: document.getElementById('formEmail'),
                error: document.getElementById('emailError'),
                validate(value) {
                    if (!value.trim()) return 'Пожалуйста, введите email';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) return 'Введите корректный email адрес';
                    return '';
                }
            },
            message: {
                input: document.getElementById('formMessage'),
                error: document.getElementById('messageError'),
                validate(value) {
                    if (!value.trim()) return 'Пожалуйста, введите сообщение';
                    if (value.trim().length < 10) return 'Сообщение должно содержать не менее 10 символов';
                    return '';
                }
            }
        };

        // Валидация в реальном времени при потере фокуса
        Object.values(fields).forEach(field => {
            field.input.addEventListener('blur', () => {
                const errorMsg = field.validate(field.input.value);
                showFieldError(field, errorMsg);
            });

            // Убираем ошибку при вводе
            field.input.addEventListener('input', () => {
                if (field.input.classList.contains('form__input--error')) {
                    const errorMsg = field.validate(field.input.value);
                    showFieldError(field, errorMsg);
                }
            });
        });

        function showFieldError(field, message) {
            if (message) {
                field.input.classList.add('form__input--error');
                field.error.textContent = message;
                field.error.classList.add('form__error--visible');
            } else {
                field.input.classList.remove('form__input--error');
                field.error.textContent = '';
                field.error.classList.remove('form__error--visible');
            }
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Проверяем все поля
            Object.values(fields).forEach(field => {
                const errorMsg = field.validate(field.input.value);
                showFieldError(field, errorMsg);
                if (errorMsg) isValid = false;
            });

            if (isValid) {
                // Показываем сообщение об успехе
                contactForm.style.display = 'none';
                const successMsg = document.querySelector('.form__success');
                if (successMsg) {
                    successMsg.classList.add('form__success--visible');
                }
            }
        });
    }

    //  5. Анимация появления при скролле 
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        fadeElements.forEach(el => observer.observe(el));
    }

});
