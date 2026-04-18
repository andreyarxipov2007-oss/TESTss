const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const deleteSettingsBtn = document.getElementById("deleteSettingsBtn");

const avatarList = document.querySelectorAll(".avatar");
const currentAvatar = document.getElementById("currentAvatar");

const basePath = "..//images/avatars/";
var pathToCurrentAvatar = "";

usernameInput.addEventListener("input", ActivateSaveBtn);
phoneInput.addEventListener("input", ActivateSaveBtn);
emailInput.addEventListener("input", ActivateSaveBtn);

// проверка параметров ввода данных и активация кнопки сохранения изменений
function ActivateSaveBtn(){
    if(usernameInput.value != localStorage.getItem("username") ||
        phoneInput.value != localStorage.getItem("phone") ||
        emailInput.value != localStorage.getItem("email") ||
        GetFileName(currentAvatar.src) != GetFileName(localStorage.getItem("pathToCurrentAvatar"))){
            
        saveSettingsBtn.style.display = "inline-block";
        }

    else saveSettingsBtn.style.display = "none";
}

// загрузка настроек при открытии страницы
function LoadSettings(){
    usernameInput.value = localStorage.getItem("username") || "";
    phoneInput.value = localStorage.getItem("phone") || "";
    emailInput.value = localStorage.getItem("email") || "";
    currentAvatar.src = localStorage.getItem("pathToCurrentAvatar") || "..//images/avatars/avatar1.png";

    ActivateSaveBtn();
}

// проверка заполнения полей
function CheckFillFields(){
    if(usernameInput.value == "" || usernameInput.value == null){
        alert("Имя пользователя не заполнено!");
        return false;
    }

    if(phoneInput.value == "" || phoneInput.value == null){
        alert("Телефон не указан!");
        return false;
    }

    if(phoneInput.value.length != 12 || phoneInput.value[0] != '+'){
        alert("Номер телефона указан неверно! Укажите в формате +7(000)000-00-00");
        return false;
    }

    if(emailInput.value == "" || emailInput.value == null){
        alert("Электронная почта не указана!");
        return false;
    }

    if(!emailInput.value.includes("@")){
        alert("Неверный адрес электронной почты!");
        return false;
    }

    return true;
}

// сохранение настроек
saveSettingsBtn.addEventListener("click", function(){
    if(!CheckFillFields())
        return;

    localStorage.setItem("username", usernameInput.value);
    localStorage.setItem("phone", phoneInput.value);
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("pathToCurrentAvatar", pathToCurrentAvatar);
    alert("Настройки успешно сохранены!");
    LoadSettings();
});

// удаление настроек
deleteSettingsBtn.addEventListener("click", function(){
    if(confirm("Вы действительно хотите очистить все данные? Отменить это действие будет невозможно")){
        localStorage.clear();
        alert("Все данные очищены!");
        LoadSettings();
    }
});

// получение имени файла из абсолютного пути
function GetFileName(path){
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
}

// перебор аватарок
avatarList.forEach(img => {
    // обрабочик на выбор аватара
    img.addEventListener("click", () => {
        const fileName = GetFileName(img.src);
        pathToCurrentAvatar = basePath + fileName;
        currentAvatar.src = pathToCurrentAvatar;
        
        ActivateSaveBtn();
    })
});

// Загрузить настройки при загрузке страницы
window.onload = function() {
    LoadSettings();
};