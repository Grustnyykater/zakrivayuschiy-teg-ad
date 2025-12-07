document.addEventListener('DOMContentLoaded', () => {
  // Варианты текста, которые мы считаем «не должны приводить к перезагрузке»
  const STOP_TEXT_VARIANTS = [
    'сохранить на память',
    'сохранить запись',
    'сохранить',
    'сохранить в память',
    'ок',
    'ok',
    'о к' // на случай странных пробелов
  ];

  // Функция проверки текста (учитываем input.value и button.innerText)
  function nodeTextForCheck(el) {
    if (!el) return '';
    if (el.tagName === 'INPUT') return (el.value || '').trim().toLowerCase();
    return (el.innerText || el.textContent || '').trim().toLowerCase();
  }

  // Делегированный перехват кликов — используем capture, чтобы поймать раньше нативного поведения
  document.addEventListener('click', function (event) {
    const clicked = event.target;
    // Ищем ближайший интерактивный элемент, который может вести к навигации/submit
    const actionable = clicked.closest('button, input[type="submit"], a, [role="button"]');
    if (!actionable) return;
    const text = nodeTextForCheck(actionable);
    if (STOP_TEXT_VARIANTS.some(v => text.includes(v))) {
      // Перехватываем навигацию / submit
      event.preventDefault();
      event.stopPropagation();
      // Дополнительно: если это <a href>, убираем href для этой сессии
      if (actionable.tagName === 'A' && actionable.hasAttribute('href')) {
        // временно предотвращаем навигацию (не меняем HTML)
        // nothing else
      }
    }
  }, /* useCapture */ true);

  // Перехватываем любые сабмиты форм (Enter внутри input и т.п.)
  document.addEventListener('submit', function (event) {
    // Всегда предотвращаем submit (если вам нужно позволять некоторые сабмиты, сюда можно добавить фильтр)
    event.preventDefault();
    event.stopPropagation();
  }, /* useCapture */ true);

  // --- КОД ЛАЙКОВ: связываем элементы в рамках карточек, чтобы избежать ошибок индексов ---
  // Предполагается, что каждая карточка имеет контейнер .card (если в вашей разметке другой класс - замените)
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const heart = card.querySelector('.like-icon');
    const likeButton = card.querySelector('.card__like-button');
    const iconButton = card.querySelector('.card__icon-button');

    // Защита: если нет heart — пропустить карточку
    if (!heart) return;

    // Функции переключения состояния
    function toggleIsLikedLocal() {
      heart.classList.toggle('is-liked');
      setButtonTextLocal(heart, likeButton || iconButton);
    }

    if (iconButton) {
      iconButton.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        toggleIsLikedLocal();
      });
    }

    if (likeButton) {
      likeButton.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        toggleIsLikedLocal();
      });
    }
  });

  // Местные реализации, с проверкой наличия
  function setButtonTextLocal(heart, button) {
    if (!heart || !button) return;
    const textElement = button.querySelector('.button__text');
    if (!textElement) return;
    // Небольшая задержка, если нужна анимация
    setTimeout(() => {
      if ([...heart.classList].includes('is-liked')) {
        textElement.textContent = 'Unlike';
      } else {
        textElement.textContent = 'Like';
      }
    }, 500);
  }
});

