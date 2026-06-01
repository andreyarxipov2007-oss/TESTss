const STORAGE_KEY = 'fastTypingUnlockedLevel';

// Глобальное состояние приложения: здесь храним текущий режим,
// прогресс пользователя и данные активной тренировки.
const state = {
  mode: 'level',
  unlockedLevel: 0,
  currentLevel: 0,
  targetText: '',
  position: 0,
  hasErrorAtCurrent: false,
  attempts: 0,
  mistakes: 0,
  isArmed: false,
  started: false,
  finished: false,
  startTime: 0,
  endTime: 0
};

// Ссылки на элементы интерфейса, с которыми работает JavaScript.
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');
const goToTrainingBtn = document.getElementById('goToTrainingBtn');

const modeLabel = document.getElementById('modeLabel');
const levelLabel = document.getElementById('levelLabel');
const trainingInstruction = document.getElementById('trainingInstruction');
const typingArea = document.getElementById('typingArea');
const startOverlay = document.getElementById('startOverlay');
const textDisplay = document.getElementById('textDisplay');

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

const retryBtn = document.getElementById('retryBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const resetProgressBtn = document.getElementById('resetProgressBtn');

const resultCard = document.getElementById('resultCard');
const resultMessage = document.getElementById('resultMessage');
const finalWpm = document.getElementById('finalWpm');
const finalCpm = document.getElementById('finalCpm');
const finalAccuracy = document.getElementById('finalAccuracy');
const finalErrors = document.getElementById('finalErrors');
const finalTime = document.getElementById('finalTime');

const customTextInput = document.getElementById('customTextInput');
const useCustomTextBtn = document.getElementById('useCustomTextBtn');
const customWarning = document.getElementById('customWarning');

// Запускаем инициализацию сразу после загрузки скрипта.
init();

// Инициализирует приложение при старте.
// Вызывается один раз при загрузке страницы.
// Нужна, чтобы проверить уровни, загрузить прогресс и подготовить интерфейс.
function init() {
  if (!Array.isArray(window.levels) || window.levels.length === 0) {
    textDisplay.textContent = 'Не удалось загрузить уровни. Проверьте levels.js.';
    return;
  }

  state.unlockedLevel = loadUnlockedLevel();
  state.currentLevel = state.unlockedLevel;

  bindEvents();
  openLevel(state.currentLevel);
  switchSection('home');
}

// Навешивает обработчики событий на кнопки, вкладки и клавиатуру.
// Вызывается из init().
// Нужна, чтобы пользователь мог переключать разделы и запускать тренировку.
function bindEvents() {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      switchSection(link.dataset.section);
    });
  });

  goToTrainingBtn.addEventListener('click', () => {
    if (state.mode !== 'level') {
      openLevel(state.unlockedLevel);
    }
    switchSection('training');
  });

  typingArea.addEventListener('click', armTraining);
  document.addEventListener('keydown', handleKeydown);

  retryBtn.addEventListener('click', restartCurrentSession);

  nextLevelBtn.addEventListener('click', () => {
    if (state.currentLevel < window.levels.length - 1) {
      openLevel(state.currentLevel + 1);
    }
  });

  resetProgressBtn.addEventListener('click', resetProgress);
  useCustomTextBtn.addEventListener('click', startCustomTraining);
}

// Переключает вкладки интерфейса (Главная, Тренировка и т.д.).
// Вызывается при клике на навигацию и в некоторых кнопках.
// Нужна, чтобы показывать только активный раздел страницы.
function switchSection(sectionId) {
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === sectionId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
}

// Открывает выбранный уровень из массива уровней.
// Вызывается при старте, переходе на следующий уровень и перезапуске.
// Нужна, чтобы загрузить текст уровня и сбросить состояние тренировки.
function openLevel(levelIndex) {
  state.mode = 'level';
  state.currentLevel = clampLevel(levelIndex);
  state.targetText = String(window.levels[state.currentLevel] || '').replace(/\r/g, '');

  modeLabel.textContent = 'Уровень';
  levelLabel.textContent = String(state.currentLevel + 1);
  trainingInstruction.textContent =
    'Нажмите на блок с текстом, затем печатайте строго по символам.';

  resetSessionState();
}

// Запускает тренировку с текстом пользователя из textarea.
// Вызывается по кнопке "Печатать" в разделе "Свой текст".
// Нужна, чтобы работать не только с уровнями, но и с любым своим текстом.
function startCustomTraining() {
  const userText = customTextInput.value.replace(/\r/g, '');

  if (!userText.trim()) {
    customWarning.classList.remove('hidden');
    return;
  }

  customWarning.classList.add('hidden');

  state.mode = 'custom';
  state.targetText = userText;

  modeLabel.textContent = 'Свой текст';
  levelLabel.textContent = '—';
  trainingInstruction.textContent =
    'Режим своего текста. Ошибки исправляйте Backspace.';

  resetSessionState();
  switchSection('training');
}

// Полностью сбрасывает текущее состояние тренировки.
// Вызывается перед новым запуском уровня/своего текста и при перезапуске.
// Нужна, чтобы начать набор с нуля и очистить прошлый результат.
function resetSessionState() {
  state.position = 0;
  state.hasErrorAtCurrent = false;
  state.attempts = 0;
  state.mistakes = 0;
  state.isArmed = false;
  state.started = false;
  state.finished = false;
  state.startTime = 0;
  state.endTime = 0;

  typingArea.classList.add('blurred');
  startOverlay.classList.remove('hidden');

  resultCard.classList.add('hidden');
  nextLevelBtn.classList.add('hidden');

  renderText();
  updateProgress();
}

// Активирует тренировку после клика по блоку текста.
// Вызывается по событию click на typingArea.
// Нужна как "подтверждение старта", чтобы случайные нажатия не считались вводом.
function armTraining() {
  if (state.finished || !state.targetText) {
    return;
  }

  state.isArmed = true;
  typingArea.classList.remove('blurred');
  startOverlay.classList.add('hidden');
  typingArea.focus();
}

// Обрабатывает каждое нажатие клавиши во время тренировки.
// Вызывается глобально по keydown.
// Нужна для проверки введённых символов, учёта ошибок и завершения сессии.
function handleKeydown(event) {
  const isTrainingOpen = document.getElementById('training').classList.contains('active');

  // Обрабатываем клавиши только когда открыта тренировка,
  // она активирована кликом и ещё не завершена.
  if (!isTrainingOpen || !state.isArmed || state.finished) {
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (event.key === 'Backspace') {
    event.preventDefault();
    handleBackspace();
    return;
  }

  const typedChar = normalizeKey(event);
  if (typedChar === null) {
    return;
  }

  event.preventDefault();

  // Старт таймера фиксируем только с первого реального символа.
  if (!state.started) {
    state.started = true;
    state.startTime = Date.now();
  }

  const expectedChar = state.targetText[state.position];
  state.attempts += 1;

  // Правильный символ сдвигает позицию вперёд,
  // неправильный оставляет позицию и помечает ошибку в текущей точке.
  if (typedChar === expectedChar) {
    state.position += 1;
    state.hasErrorAtCurrent = false;

    if (state.position === state.targetText.length) {
      finishSession();
      return;
    }
  } else {
    state.hasErrorAtCurrent = true;
    state.mistakes += 1;
  }

  renderText();
  updateProgress();
}

// Обрабатывает Backspace в процессе тренировки.
// Вызывается из handleKeydown(), когда пользователь нажимает Backspace.
// Нужна, чтобы исправить текущую ошибку или вернуться на символ назад.
function handleBackspace() {
  if (!state.started || state.finished) {
    return;
  }

  if (state.hasErrorAtCurrent) {
    state.hasErrorAtCurrent = false;
  } else if (state.position > 0) {
    state.position -= 1;
  }

  renderText();
  updateProgress();
}

// Завершает тренировку и считает итоговую статистику.
// Вызывается автоматически, когда пользователь допечатывает весь текст.
// Нужна для вывода WPM/CPM/точности, а также для разблокировки следующего уровня.
function finishSession() {
  state.finished = true;
  state.endTime = Date.now();

  renderText();
  updateProgress();

  const elapsedSeconds = Math.max(1, Math.round((state.endTime - state.startTime) / 1000));
  const minutes = elapsedSeconds / 60;
  const correctChars = state.targetText.length;

  // Формулы статистики: 5 символов = 1 слово,
  // точность считаем по отношению правильных попыток ко всем попыткам.
  const wpm = Math.round((correctChars / 5) / minutes);
  const cpm = Math.round(correctChars / minutes);
  const accuracy = state.attempts > 0
    ? ((state.attempts - state.mistakes) / state.attempts) * 100
    : 100;

  showResult({
    wpm,
    cpm,
    accuracy,
    errors: state.mistakes,
    elapsedSeconds
  });

  if (state.mode === 'level') {
    unlockNextLevel();

    if (state.currentLevel < window.levels.length - 1) {
      nextLevelBtn.classList.remove('hidden');
    }
  }
}

// Выводит результат тренировки в карточку статистики.
// Вызывается из finishSession().
// Нужна, чтобы пользователь видел скорость, точность, ошибки и время.
function showResult(stats) {
  finalWpm.textContent = String(stats.wpm);
  finalCpm.textContent = String(stats.cpm);
  finalAccuracy.textContent = `${stats.accuracy.toFixed(1)}%`;
  finalErrors.textContent = String(stats.errors);
  finalTime.textContent = formatTime(stats.elapsedSeconds);

  if (stats.accuracy >= 95) {
    resultMessage.textContent = 'Отлично!';
  } else if (stats.accuracy >= 85) {
    resultMessage.textContent = 'Хороший результат.';
  } else {
    resultMessage.textContent = 'Попробуйте ещё раз, чтобы улучшить скорость.';
  }

  resultCard.classList.remove('hidden');
}

// Перезапускает текущую тренировку по кнопке "Ещё раз".
// Вызывается по клику на retryBtn.
// Нужна, чтобы начать этот же уровень/текст заново без смены режима.
function restartCurrentSession() {
  if (state.mode === 'level') {
    openLevel(state.currentLevel);
  } else {
    modeLabel.textContent = 'Свой текст';
    levelLabel.textContent = '—';
    resetSessionState();
  }
}

// Сбрасывает прогресс уровней в localStorage.
// Вызывается по кнопке "Сбросить прогресс".
// Нужна, чтобы начать прохождение уровней сначала.
function resetProgress() {
  const shouldReset = window.confirm('Сбросить прогресс уровней?');
  if (!shouldReset) {
    return;
  }

  state.unlockedLevel = 0;
  localStorage.setItem(STORAGE_KEY, '0');

  if (state.mode === 'level') {
    openLevel(0);
  }
}

// Разблокирует следующий уровень и сохраняет прогресс.
// Вызывается после успешного завершения уровня в finishSession().
// Нужна, чтобы пользователь не терял достигнутый прогресс после перезагрузки страницы.
function unlockNextLevel() {
  const nextLevel = state.currentLevel + 1;

  if (nextLevel >= window.levels.length) {
    return;
  }

  if (nextLevel > state.unlockedLevel) {
    state.unlockedLevel = nextLevel;
    localStorage.setItem(STORAGE_KEY, String(state.unlockedLevel));
  }
}

// Отрисовывает тренировочный текст посимвольно с нужными классами.
// Вызывается после изменений позиции, ошибок и при сбросе сессии.
// Нужна, чтобы визуально показывать текущий символ, прогресс и ошибки.
function renderText() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < state.targetText.length; i += 1) {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = state.targetText[i];

    // Символы до текущей позиции считаем правильными.
    // Текущий символ подсвечиваем отдельно и красим в error/pending.
    if (i < state.position) {
      span.classList.add('correct');
    } else if (i === state.position && !state.finished) {
      span.classList.add(state.hasErrorAtCurrent ? 'error' : 'pending');
      span.classList.add('current');
    } else {
      span.classList.add('pending');
    }

    fragment.appendChild(span);
  }

  textDisplay.innerHTML = '';
  textDisplay.appendChild(fragment);
}

// Обновляет процент выполнения и ширину прогресс-бара.
// Вызывается после каждого изменения позиции или сброса.
// Нужна, чтобы пользователь видел, сколько текста уже пройдено.
function updateProgress() {
  const progress = state.targetText.length > 0
    ? Math.round((state.position / state.targetText.length) * 100)
    : 0;

  progressBar.style.width = `${progress}%`;
  progressText.textContent = `Прогресс: ${progress}%`;
}

// Преобразует нажатую клавишу в символ для сравнения с текстом.
// Вызывается внутри handleKeydown().
// Нужна, чтобы корректно обрабатывать Enter/Tab и отбрасывать служебные клавиши.
function normalizeKey(event) {
  if (event.key === 'Enter') {
    return '\n';
  }

  if (event.key === 'Tab') {
    return '\t';
  }

  if (event.key.length === 1) {
    return event.key;
  }

  return null;
}

// Загружает сохранённый уровень из localStorage.
// Вызывается в init() при старте приложения.
// Нужна, чтобы продолжать обучение с последнего открытого уровня.
function loadUnlockedLevel() {
  const raw = Number(localStorage.getItem(STORAGE_KEY));

  if (!Number.isInteger(raw) || raw < 0) {
    return 0;
  }

  return Math.min(raw, window.levels.length - 1);
}

// Ограничивает индекс уровня допустимыми границами.
// Вызывается в openLevel() перед загрузкой уровня.
// Нужна, чтобы нельзя было открыть несуществующий или пока закрытый уровень.
function clampLevel(levelIndex) {
  if (!Number.isInteger(levelIndex)) {
    return 0;
  }

  if (levelIndex < 0) {
    return 0;
  }

  if (levelIndex > state.unlockedLevel) {
    return state.unlockedLevel;
  }

  return Math.min(levelIndex, window.levels.length - 1);
}

// Форматирует секунды в вид ММ:СС.
// Вызывается при выводе финальной статистики.
// Нужна для удобного отображения общего времени тренировки.
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
