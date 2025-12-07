/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

const likeHeartArray = document.querySelectorAll('.like-icon');
const likeButtonArray = document.querySelectorAll('.card__like-button');
const iconButtonArray = document.querySelectorAll('.card__icon-button');

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = () => {
    if (likeHeartArray[index] && likeButtonArray[index]) {
      toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
    }
  };
});

likeButtonArray.forEach((button, index) => {
  button.onclick = () => {
    if (likeHeartArray[index]) {
      toggleIsLiked(likeHeartArray[index], button);
    }
  };
});

function toggleIsLiked(heart, button) {
  if (!heart || !button) return;
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  const textElement = button.querySelector('.button__text');
  if (!textElement) return;

  if (heart.classList.contains('is-liked')) {
    setTimeout(() => {
      textElement.textContent = 'Unlike';
    }, 500);
  } else {
    setTimeout(() => {
      textElement.textContent = 'Like';
    }, 500);
  }
}
