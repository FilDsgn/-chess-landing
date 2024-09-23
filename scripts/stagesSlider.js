const carousel = document.querySelector(".stages__content-wrapper");
const firstSlide = carousel.querySelectorAll(".stages__item")[0];
const buttonLeft = document.querySelector(".stages__button_left");
const buttonRight = document.querySelector(".stages__button_right");
const dotsContainer = document.querySelector(".stages__dots-container");

let slidesLength = Math.round(carousel.scrollWidth / carousel.clientWidth);
let currentSlide = 1;

// Блокировка кнопок навигации
const checkButtonsDisable = () => {
  if (carousel.scrollLeft <= 0) {
    buttonLeft.classList.add("carousel-navigation__btn_disabled");
    buttonLeft.disabled = true;
  } else {
    buttonLeft.classList.remove("carousel-navigation__btn_disabled");
    buttonLeft.disabled = false;
  }

  if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
    buttonRight.classList.add("carousel-navigation__btn_disabled");
    buttonRight.disabled = true;
  } else {
    buttonRight.classList.remove("carousel-navigation__btn_disabled");
    buttonRight.disabled = false;
  }
};

// Установка активного слайда
const setActiveDot = () => {
  dotsContainer.querySelectorAll(".carousel-navigation__dot").forEach((i) => {
    if (i.attributes.id.value === currentSlide.toString()) {
      i.classList.add("carousel-navigation__dot_active");
    } else {
      i.classList.remove("carousel-navigation__dot_active");
    }
  });
};

// Создание точек
const createDots = () => {
  for (let i = 1; i <= slidesLength; i++) {
    const dotItem = document.createElement("div");
    dotItem.setAttribute("class", "carousel-navigation__dot");
    dotItem.setAttribute("id", i);
    dotsContainer.appendChild(dotItem);
  }
};

buttonLeft.addEventListener("click", () => {
  buttonLeft.disabled = true;
  setTimeout(() => {
    checkButtonsDisable();
  }, 800);
  carousel.scrollLeft += -carousel.clientWidth;
  if (currentSlide > 1) currentSlide -= 1;
});

buttonRight.addEventListener("click", () => {
  buttonRight.disabled = true;
  setTimeout(() => {
    checkButtonsDisable();
  }, 800);
  carousel.scrollLeft += carousel.clientWidth;
  if (currentSlide < slidesLength) currentSlide += 1;
});

createDots();
setActiveDot();
checkButtonsDisable();

window.addEventListener("resize", () => {
  const prevSlidesLength = slidesLength;
  slidesLength = Math.round(carousel.scrollWidth / carousel.clientWidth);

  if (slidesLength !== prevSlidesLength) {
    while (dotsContainer.firstChild) {
      dotsContainer.removeChild(dotsContainer.firstChild);
    }
    createDots();
    setActiveDot();
    checkButtonsDisable();
  }
});

carousel.addEventListener("scrollend", () => {
  setActiveDot();
});
