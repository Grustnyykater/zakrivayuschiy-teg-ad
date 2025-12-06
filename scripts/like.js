/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

// Предотвращаем перезагрузку страницы для всех кнопок в формах
document.addEventListener('DOMContentLoaded', () => {
  // Блокируем все кнопки submit в формах
  document.querySelectorAll('form button, form input[type="submit"]').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
  
  // Блокируем кнопки без type (по умолчанию submit)
  document.querySelectorAll('form button:not([type])').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
  
  // Специально для кнопок "Сохранить на память" и "ОК"
  document.querySelectorAll('button').forEach(button => {
    const text = button.textContent || button.innerText;
    if (text.includes('Сохранить') || text.includes('на память') || text.includes('ОК')) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
      });
    }
  });
});

// Код лайков с исправлениями
const likeHeartArray = document.querySelectorAll('.like-icon');
const likeButtonArray = document.querySelectorAll('.card__like-button');
const iconButtonArray = document.querySelectorAll('.card__icon-button');

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = (event) => {
    event.preventDefault();
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
  };
});

likeButtonArray.forEach((button, index) => {
  button.onclick = (event) => {
    event.preventDefault();
    toggleIsLiked(likeHeartArray[index], button);
  };
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  if ([...heart.classList].includes('is-liked')) {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Unlike'),
      500
    );
  } else {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Like'),
      500
    );
  }
}
