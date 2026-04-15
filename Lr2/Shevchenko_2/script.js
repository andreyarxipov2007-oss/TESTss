const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        btn.classList.add('active');
        
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

let fishCount = 0;
const fishCountSpan = document.getElementById('fishCount');
const feedBtn = document.getElementById('feedBtn');
const resetBtn = document.getElementById('resetBtn');
const catMood = document.getElementById('catMood');

function updateMood(count) {
    if (count === 0) {
        catMood.textContent = '😐 Паштет ждёт рыбку... Покорми меня!';
    }
    else if (count < 4) {
        catMood.textContent = '🙂 Мурр... вкусно! Спасибо за рыбку!';
    }
    else if (count < 10) {
        catMood.textContent = '😺 МЯУ! Ты мой любимый человек! Дай ещё!';
    }
    else if (count < 15) {
        catMood.textContent = '😻 Обожаю тебя! Это лучший день в моей жизни!';
    }
    else if (count < 19) {
        catMood.textContent = '😸 Я самый счастливый Паштет на свете!';
    }
    else if (count < 24) {
        catMood.textContent = '😋 Ммм... рыбка за рыбкой... райское наслаждение!';
    }
    else if (count < 30) {
        catMood.textContent = '😅 Животик начинает округляться... но вкусно же!';
    }
    else if (count < 36) {
        catMood.textContent = '😣 Кажется, я переел... но не могу остановиться...';
    }
    else if (count < 43) {
        catMood.textContent = '🤢 Ой... живот болит... зачем я столько съел...';
    }
    else if (count < 48) {
        catMood.textContent = '😫 Мне плохо... больше не могу... хозяин, помоги...';
    }
    else if (count < 54) {
        catMood.textContent = '💀 Я умираю... прощай, жестокий мир...';
    }
    else {
        catMood.textContent = '💥 БАХ! Паштет лопнул от переедания! Рыбки разлетелись во все стороны... 🐟🐟🐟';
    }
}

feedBtn.addEventListener('click', () => {
    fishCount++;
    fishCountSpan.textContent = fishCount;
    updateMood(fishCount);
});

resetBtn.addEventListener('click', () => {
    fishCount = 0;
    fishCountSpan.textContent = fishCount;
    updateMood(fishCount);
});