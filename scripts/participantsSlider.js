const participantsData = [
  {
    image: "./assets/images/participant.png",
    title: "Хозе-Рауль Капабланка",
    text: "Чемпион мира по шахматам",
    id: 1,
  },
  {
    image: "./assets/images/participant.png",
    title: "Эммануил Ласкер",
    text: "Чемпион мира по шахматам",
    id: 2,
  },
  {
    image: "./assets/images/participant.png",
    title: "Александр Алехин",
    text: "Чемпион мира по шахматам",
    id: 3,
  },
  {
    image: "./assets/images/participant.png",
    title: "Арон Нимцович",
    text: "Чемпион мира по шахматам",
    id: 4,
  },
  {
    image: "./assets/images/participant.png",
    title: "Рихард Рети",
    text: "Чемпион мира по шахматам",
    id: 5,
  },
  {
    image: "./assets/images/participant.png",
    title: "Остап Бендер",
    text: "Гроссмейстер",
    id: 6,
  },
];

const carousel = document.querySelector(".participants__content");
const counerContainer = document.querySelector(".participants__counter");
const counterCurrent = counerContainer.querySelector(
  ".participants__counter-current"
);
const counterTotal = counerContainer.querySelector(
  ".participants__counter-total"
);

const getSlidesLength = () => {
  if (window.screen.width > 1040) {
    return 2;
  } else if (window.screen.width <= 1040 && window.screen.width > 790) {
    return 3;
  } else {
    return 6;
  }
};

let slidesLength = getSlidesLength();
let currentSlide = 1;

window.addEventListener("resize", () => {
  slidesLength = getSlidesLength();
  counterTotal.textContent = slidesLength;
});

counterCurrent.textContent = currentSlide;
counterTotal.textContent = slidesLength;

// Создание карточки
const createCard = (data) => {
  const card = document.createElement("article");
  card.setAttribute("class", "participants__card");

  const img = document.createElement("img");
  img.setAttribute("class", "participants__card-image");
  img.setAttribute("src", data.image);
  img.setAttribute("alt", data.title + " - " + data.text);

  const title = document.createElement("h3");
  title.setAttribute("class", "participants__card-title");
  title.textContent = data.title;

  const text = document.createElement("p");
  text.setAttribute("class", "participants__card-text");
  text.textContent = data.text;

  const button = document.createElement("button");
  button.setAttribute("class", "participants__card-button");
  const buttonValue = document.createTextNode("Подробнее");
  button.appendChild(buttonValue);

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(button);

  return card;
};

// Добавление карточек с данными
const addCards = () => {
  participantsData.forEach((participant) => {
    const card = createCard(participant);
    carousel.appendChild(card);
  });
};

addCards();

let scrollInterval = setInterval(() => handleButtonRightClick(), 4000);

const buttonLeft = document.querySelector(".participants__button_left");
const buttonRight = document.querySelector(".participants__button_right");

function handleButtonLeftClick() {
  if (carousel.scrollLeft <= 0) {
    const reverseData = participantsData.slice().reverse();
    reverseData.forEach((participant) => {
      const card = createCard(participant);
      carousel.prepend(card);
    });
  }

  carousel.scrollLeft += -carousel.clientWidth;
  currentSlide > 1 ? (currentSlide -= 1) : (currentSlide = slidesLength);
  counterCurrent.textContent = currentSlide;
}

function handleButtonRightClick() {
  if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
    const cloneData = participantsData.slice();
    cloneData.forEach((participant) => {
      const card = createCard(participant);
      carousel.append(card);
    });
  }

  carousel.scrollLeft += carousel.clientWidth;
  currentSlide < slidesLength ? (currentSlide += 1) : (currentSlide = 1);
  counterCurrent.textContent = currentSlide;
}

buttonLeft.addEventListener("click", () => {
  buttonLeft.disabled = true;
  setTimeout(() => {
    buttonLeft.disabled = false;
  }, 800);
  handleButtonLeftClick();
  clearInterval(scrollInterval);
  scrollInterval = setInterval(() => handleButtonRightClick(), 4000);
});

buttonRight.addEventListener("click", () => {
  buttonRight.disabled = true;
  setTimeout(() => {
    buttonRight.disabled = false;
  }, 800);
  handleButtonRightClick();
  clearInterval(scrollInterval);
  scrollInterval = setInterval(() => handleButtonRightClick(), 4000);
});
