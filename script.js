const achievements = [
  { id: 1, title: "Dora", image: "./img/dora.png" },
  { id: 2, title: "Dora", image: "./img/dora1.png" },
  { id: 3, title: "Dora", image: "./img/dora2.png" },
  { id: 4, title: "Rayan", image: "./img/rayan.png" },
  { id: 5, title: "Zoraa", image: "./img/zora.png" },
  { id: 6, title: "Sally", image: "./img/sally.png" },
  { id: 7, title: "Grumpipi", image: "./img/grumpipi.png" },
  { id: 8, title: "Siinono", image: "./img/siinono.png" },
];


let activeIndex = 0;
const total = achievements.length;

const stage = document.getElementById("carousel-stage");
const dotsContainer = document.getElementById("pagination-dots");
const sliderTitle = document.getElementById("sliderTitle");

function init() {
  achievements.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.id = `card-${index}`;

    card.onclick = () => {
      activeIndex = index;
      update();
    };

    card.innerHTML = `
      <div 
        class="card-image" 
        style="background-image: url('${item.image}')">
      </div>
    `;

    stage.appendChild(card);

    const dot = document.createElement("div");
    dot.className = "dot";
    dot.onclick = () => {
      activeIndex = index;
      update();
    };
    dotsContainer.appendChild(dot);
  });

  update();
}

function update() {
  achievements.forEach((_, index) => {
    const card = document.getElementById(`card-${index}`);
    const dot = dotsContainer.children[index];

    let offset = index - activeIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    let positionClass = "hidden";
    if (offset === 0) positionClass = "active";
    else if (offset === -1) positionClass = "left";
    else if (offset === 1) positionClass = "right";
    else if (offset < -1) positionClass = "far-left";
    else if (offset > 1) positionClass = "far-right";

    card.className = `carousel-card ${positionClass}`;
    dot.className = `dot ${index === activeIndex ? "active" : ""}`;
  });

  // 🔥 ТЕКСТ ТОЛЬКО ДЛЯ АКТИВНОГО СЛАЙДА
  sliderTitle.textContent = achievements[activeIndex].title;
}


// Навигация
const next = () => {
  activeIndex = (activeIndex + 1) % total;
  update();
};

const prev = () => {
  activeIndex = (activeIndex - 1 + total) % total;
  update();
};

document.getElementById("next-btn").onclick = next;
document.getElementById("prev-btn").onclick = prev;

// Клавиатура
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

init();

let startX = 0;
let currentX = 0;
let isDragging = false;
const swipeThreshold = 50; // минимальная дистанция свайпа

stage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

stage.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});

stage.addEventListener("touchend", () => {
  if (!isDragging) return;

  const diff = currentX - startX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff < 0) {
      next(); // свайп влево
    } else {
      prev(); // свайп вправо
    }
  }

  isDragging = false;
  startX = 0;
  currentX = 0;
});

const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  document.querySelectorAll(".header_navbar_nav a").forEach((link) => {
    link.addEventListener("click", () => {
      burgerBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
}

const productsSlider = document.getElementById("productsSlider");
const productsPrev = document.getElementById("productsPrev");
const productsNext = document.getElementById("productsNext");

if (productsSlider && productsPrev && productsNext) {
  const getScrollAmount = () => {
    const card = productsSlider.querySelector(".product-card");
    if (!card) return 300;

    const gap = 20;
    return card.offsetWidth + gap;
  };

  productsNext.addEventListener("click", () => {
    productsSlider.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  productsPrev.addEventListener("click", () => {
    productsSlider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });
}