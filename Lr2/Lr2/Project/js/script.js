// получаем элементы из html
const noteInput = document.getElementById("noteInput");
const addEditButton = document.getElementById("addButton");
const notesList = document.getElementById("notesList");
const scrollUpButton = document.getElementById("scrollUpButton");
const scrollDownButton = document.getElementById("scrollDownButton");

var isSelectNote = false;
var indexSelectNote = -1;
var lastLi = null;

// загружаем массив заметок из localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// клик по одно из заметок
function ClickNote(li){
    // если ни одна заметка не выбрана
    if(!isSelectNote){
        noteInput.value = note.replace(/<br>/g, "\n");
        addEditButton.textContent = "Изменить";
        li.style.background = "#f0f0f0";
        isSelectNote = true;
    } 
    // если какая-то заметка уже выбрана
    else{
        // если повторно нажали на выбранную заметку
        if(indexSelectNote == index){
            noteInput.value = "";
            addEditButton.textContent = "Добавить";
            li.style.background = "#fff";
            isSelectNote = false;
        }
        // если нажали на другую заметку, не ту, которая выбрана сейчас
        else{
            noteInput.value = note.replace(/<br>/g, "\n");
            lastLi.style.background = "#fff";                
            li.style.background = "#f0f0f0";
            isSelectNote = true;
        }            
    }

    indexSelectNote = index; // сохраняем индекс текущего элемента
    lastLi = li; // сохраняем текущий li, чтобы потом можно было снять с него выделение
}

// отображение заметок
function ShowNotes(){
    notesList.innerHTML = "";

    // перебор элементов массива заметок из localStorage
    notes.forEach((note, index) => {
        // содержит текст заметки
        var noteDiv = document.createElement('div');
        noteDiv.innerHTML = note;

        // кнопка удаления заметки
        const deleteBtn = document.createElement("img");
        deleteBtn.src = "..//images/" + "delete.png";
        deleteBtn.className = "deleteBtn";
        deleteBtn.onclick = () => DeleteNote(index);

        // контейнер для кнопок
        const buttons = document.createElement("div");
        buttons.appendChild(deleteBtn);

        // элемент из списка выводимых заметок
        var li = document.createElement("li");
        li.className = "note";
        li.appendChild(noteDiv);
        li.appendChild(buttons);

        // клик по одной из заметок
        li.addEventListener("click", function(){
            // если ни одна заметка не выбрана
            if(!isSelectNote){
                noteInput.value = note.replace(/<br>/g, "\n");
                addEditButton.textContent = "Изменить";
                li.style.background = "#f0f0f0";
                li.style.borderBlockColor = "#000000";
                isSelectNote = true;
            } 
            // если какая-то заметка уже выбрана
            else{
                // если повторно нажали на выбранную заметку
                if(indexSelectNote == index){
                    noteInput.value = "";
                    addEditButton.textContent = "Добавить";
                    li.style.background = "#fff";
                    li.style.borderBlockColor = "#ccc";
                    isSelectNote = false;
                }
                // если нажали на другую заметку, не ту, которая выбрана сейчас
                else{
                    noteInput.value = note.replace(/<br>/g, "\n");
                    lastLi.style.background = "#fff";  
                    lastLi.style.borderBlockColor = "#ccc";              
                    li.style.background = "#f0f0f0";
                    li.style.borderBlockColor = "#000000";
                    isSelectNote = true;
                }            
            }

            indexSelectNote = index; // сохраняем индекс текущего элемента
            lastLi = li; // сохраняем текущий li, чтобы потом можно было снять с него выделение
        });

        // добавили элемент списка с заметкой в общий список заметок
        notesList.appendChild(li);
    });
}

// сохранение измений в массиве заметок и обновление списка
function RefreshNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
    ShowNotes();
}

// проверка правильности ввода текста заметки
function CheckCorrectNote(text){
    if(text == ""){
        alert("Поле с текстом заметки не может быть пустым");
        return false;
    }

    return true;
}

// проверка текста заметки на уникальность
function CheckUniqNote(text, index=-1, isEdit){
    // при создании заметки
    if(!isEdit && notes.includes(text)){
        alert("Такая заметка уже существует");
        return false;
    }

    // при редактировании заметки учитываем, что такая заметка уже есть и 
    // необходимо понять, не собираемся ли мы сделать ее копией другой заметки
    if (isEdit && notes.some((note, i) => note == text && i !== index)) {
        alert("Такая заметка уже существует");
        return false;
    }

    return true;
}

// создание заметки
addEditButton.addEventListener("click", function(){
    if(addEditButton.textContent == "Добавить"){
        AddNote();
    }
    else{
        EditNote(indexSelectNote);
    }
});

// создание заметки
function AddNote(){
    const text = noteInput.value.replace(/\n/g, "<br>");

    // проверка на правильность ввода текста заметки
    if(!CheckCorrectNote(text))
        return;

    // проверка на уникальность заметки
    if(!CheckUniqNote(text, false))
        return;

    if(text != null){
        notes.push(text);
        noteInput.value = "";
        RefreshNotes();
    }
}

// редактирование заметки
function EditNote(index){
    const newText = noteInput.value.replace(/\n/g, "<br>");

    // проверка правильности ввода текста заметки
    if(!CheckCorrectNote(newText))
        return;

    // проверка на уникальность заметки
    if(!CheckUniqNote(newText, index, true))
        return;

    if(newText != null){
        notes[index] = newText;
        noteInput.value = "";
        isSelectNote = false;
        addEditButton.textContent = "Добавить"
        RefreshNotes();
    }
}

// удаление заметки
function DeleteNote(index){
    if(confirm("Вы действительно хотите удалить заметку?")){
        notes.splice(index, 1);
        RefreshNotes();
    }
}

// прокрутить скролл вверх
scrollUpButton.addEventListener("click", function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth" // плавная прокрутка
    })
})

// прокрутить скролл вниз
scrollDownButton.addEventListener("click", function(){
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth" // плавная прокрутка
    })
})

ShowNotes();
