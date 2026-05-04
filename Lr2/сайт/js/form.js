// ============================================

(function() {

    var form = document.getElementById('contact-form');
    if (!form) return;

    var nameInput = document.getElementById('contact-name');
    var phoneInput = document.getElementById('contact-phone');
    var messageInput = document.getElementById('contact-message');

    var errorName = document.getElementById('error-name');
    var errorPhone = document.getElementById('error-phone');
    var errorMessage = document.getElementById('error-message');

    var formSuccess = document.getElementById('form-success');

    function validateName() {
        var value = nameInput.value.trim();
        if (value.length < 2) {
            errorName.style.display = 'block';
            nameInput.style.borderColor = '#c0392b';
            return false;
        } else {
            errorName.style.display = 'none';
            nameInput.style.borderColor = '#d4a373';
            return true;
        }
    }

    function validatePhone() {
        var value = phoneInput.value.trim();
        var digits = value.replace(/\D/g, '');
        if (digits.length < 7) {
            errorPhone.style.display = 'block';
            phoneInput.style.borderColor = '#c0392b';
            return false;
        } else {
            errorPhone.style.display = 'none';
            phoneInput.style.borderColor = '#d4a373';
            return true;
        }
    }

    function validateMessage() {
        var value = messageInput.value.trim();
        if (value.length < 5) {
            errorMessage.style.display = 'block';
            messageInput.style.borderColor = '#c0392b';
            return false;
        } else {
            errorMessage.style.display = 'none';
            messageInput.style.borderColor = '#d4a373';
            return true;
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        formSuccess.style.display = 'none';

        var isNameValid = validateName();
        var isPhoneValid = validatePhone();
        var isMessageValid = validateMessage();

        if (isNameValid && isPhoneValid && isMessageValid) {
            formSuccess.style.display = 'block';
            form.reset();

            setTimeout(function() {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });

    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim().length >= 2) {
            errorName.style.display = 'none';
            nameInput.style.borderColor = '#d4a373';
        }
    });

    phoneInput.addEventListener('input', function() {
        var digits = phoneInput.value.replace(/\D/g, '');
        if (digits.length >= 7) {
            errorPhone.style.display = 'none';
            phoneInput.style.borderColor = '#d4a373';
        }
    });

    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim().length >= 5) {
            errorMessage.style.display = 'none';
            messageInput.style.borderColor = '#d4a373';
        }
    });

})();
