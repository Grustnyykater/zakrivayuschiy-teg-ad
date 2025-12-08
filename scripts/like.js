const popup = document.getElementById("popup-id");
const openButton = document.querySelector(".button__popup-open");
const closeButton = document.querySelector(".button__popup-close");

// Открытие попапа
if (openButton) {
  openButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    popup.showModal();
  });
}

// Закрытие попапа
if (closeButton) {
  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    popup.close();
  });
}

// Полная защита от submit
document.addEventListener("submit", (event) => {
  event.preventDefault();
});

const likeHeartArray = document.querySelectorAll(".like-icon");
const likeButtonArray = document.querySelectorAll(".card__like-button");
const iconButtonArray = document.querySelectorAll(".card__icon-button");

iconButtonArray.forEach((iconButton, index) => {
  iconButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
  });
});

likeButtonArray.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleIsLiked(likeHeartArray[index], button);
  });
});

function toggleIsLiked(heart, button) {
  if (!heart || !button) return;
  heart.classList.toggle("is-liked");
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  const textElement = button.querySelector(".button__text");
  if (!textElement) return;

  setTimeout(() => {
    textElement.textContent = heart.classList.contains("is-liked")
      ? "Unlike"
      : "Like";
  }, 500);
}
