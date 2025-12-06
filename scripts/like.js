/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

// Предотвращаем перезагрузку для кнопок "Сохранить на память" и "ОК" (НАИЛУЧШИЙ способ)
document.addEventListener('DOMContentLoaded', function() {
  // Ищем кнопки по тексту
  document.querySelectorAll('button').forEach(button => {
    const text = button.textContent.trim();
    if (text.includes('Сохранить на память') || text.includes('ОК')) {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation(); // дополнительная защита
      });
    }
  });
  
  // Блокируем все формы (на всякий случай)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    });
  });
});

// КОД ЛАЙКОВ с классами из комментария (исправленный)
const likeHeartArray = document.querySelectorAll('.like-icon');
const likeButtonArray = document.querySelectorAll('.card__like-button');
const iconButtonArray = document.querySelectorAll('.card__icon-button');

iconButtonArray.forEach((iconButton, index) => {
  iconButton.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
  });
});

likeButtonArray.forEach((button, index) => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleIsLiked(likeHeartArray[index], button);
  });
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  if ([...heart.classList].includes('is-liked')) {
    setTimeout(() => {
      const textElement = button.querySelector('.button__text');
      if (textElement) {
        textElement.textContent = 'Unlike';
      }
    }, 500);
  } else {
    setTimeout(() => {
      const textElement = button.querySelector('.button__text');
      if (textElement) {
        textElement.textContent = 'Like';
      }
    }, 500);
  }
}
