const marquee_items = [
  "Дело помощи утопающим — дело рук самих утопающих!",
  "Шахматы двигают вперед не только культуру, но и экономику!",
  "Лед тронулся, господа присяжные заседатели!",
];

document.querySelectorAll(".marquee").forEach((marquee) => {
  const marqueeContainer = document.createElement("div");
  marqueeContainer.setAttribute("class", "marquee__container");

  const marqueeContent = document.createElement("div");
  marqueeContent.setAttribute("class", "marquee__content");

  marquee_items.forEach((item) => {
    const marquee_item = document.createElement("span");
    marquee_item.setAttribute("class", "marquee__item");

    marquee_item.textContent = item;

    marqueeContent.appendChild(marquee_item);
  });

  marqueeContainer.appendChild(marqueeContent);
  marquee.appendChild(marqueeContainer);

  const marqueeContentClone = marqueeContent.cloneNode(true);
  marqueeContentClone.setAttribute("aria-hidden", "true");
  marqueeContainer.appendChild(marqueeContentClone);
});
