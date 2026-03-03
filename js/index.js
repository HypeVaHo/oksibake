const baseImagePath = "./assets/";
const showcaseData = [
  {
    id: 1,
    title: "Пирожок с повидлом - от 80 ₽ за шт.",
    description: "Пирожки с повидлом - это гармоничное сочетание традиционной рецептуры, натуральных ингридиентов и неповторимого вкуса домашней выпечки. Нежное дрожжевое тесто и вкуснейшее повидло пирожков придутся по вкусу и взрослым и детям.",
    image: "pirozhok.jpg",
    tags: ["Пирожки", "С начинкой", "Выпечка"]
  },
  {
    id: 2,
    title: "Булочка сахарная - от 50 ₽ за шт.",
    description: "Булочка с сахаром - простое, но невероятно притягательное сладкое угощение. Сахарные кристаллики приятно похрустывают на зубах, а нежный аромат сливочного масла так и манит. Обязательно порадуйте свою семью такой домашней выпечкой.",
    image: "bulkasax.jpg",
    tags: ["Булочки", "Сахарная", "Выпечка"]
  },
  {
    id: 3,
    title: "Смаженка с колбасой и сыром - от 60 ₽ за шт.",
    description: "Смаженки - это вкуснейшая выпечка с сочной колбасной начинкой, залитая сметаной или майонезом с яйцом. Мягчайшее тесто, румяная корочка и ароматная начинка.",
    image: "smazhenka.jpg",
    tags: ["Смаженка", "С начинкой", "Выпечка"]
  },
  {
    id: 4,
    title: "Булочка с повидлом - от 50 ₽ за шт.",
    description: "Булочка с повидлом - любимая выпечка детей и взрослых к завтраку или чаепитию с любимыми.",
    image: "bulkapovidlo.jpg",
    tags: ["Булочки", "С начинкой", "Выпечка"]
  },
  {
    id: 5,
    title: "Ватрушка королевская - от 450 ₽",
    description: "Ватрушка королевская. Нежное воздушное тесто и натуральный фермерский творог - прекрасное сочетание для сытного завтрака или полдника. Ватрушку можно запивать молоком, кефиром, чаем или кофе, она послужит достойным угощением для гостей.",
    image: "vatrushka.jpg",
    tags: ["Пирог", "С начинкой", "Выпечка"]
  },
  {
    id: 6,
    title: "Булочка с заварным кремом - от 60 ₽ за шт.",
    description: "Булочка с заварным кремом - это выпечка из воздушного дрожжевого теста с начинкой из нежного заварного крема.",
    image: "bulkakrem.jpg",
    tags: ["Булочки", "С начинкой", "Выпечка"]
  },
  {
    id: 7,
    title: "Булочка Симмит - от 40 ₽ за шт.",
    description: "Булочка Симмит - это не просто хлеб! Это источник энергии и хорошего настроения на весь день! Хрустящий кунжут, румяная корочка и сливочный мякиш! Добавьте к нему чай, кофе, яичницу или салат.",
    image: "bulkasimmit.jpg",
    tags: ["Булочки", "Кунжут", "Выпечка"]
  },
  {
    id: 8,
    title: "Пампушка чесночная - от 25 ₽ за шт.",
    description: "Пампушка с чесноком - занимает особое место не только в рецептурных сборниках, но и на наших столах, ведь она универсальна: отлично подходит к супам, салатам, даже как самостоятельная закуска. Готовится с чесноком из дрожжевого теста, а затем поливается чесночным соусом.",
    image: "pampushka.jpg",
    tags: ["Булочка", "С чесноком", "Выпечка"]
  }
];

let showcaseIndex = 0;
const showcaseCarousel = document.getElementById("showcaseCarousel");
const showcaseIndicators = document.getElementById("showcaseIndicators");
const showcasePrev = document.getElementById("showcasePrev");
const showcaseNext = document.getElementById("showcaseNext");

const createShowcaseCard = (item, index) => {
  const node = document.createElement("article");
  node.className = "showcase-item";
  node.dataset.index = String(index);
  node.innerHTML = `
        <div class="showcase-card">
          <div class="showcase-number">0${item.id}</div>
          <div class="showcase-image">
            <img src="${baseImagePath}${item.image}" alt="${item.title}">
          </div>
          <h3 class="showcase-title">${item.title}</h3>
          <p class="showcase-desc">${item.description}</p>
          <div class="showcase-tech">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        </div>
      `;
  return node;
};

const updateShowcase = () => {
  const items = document.querySelectorAll(".showcase-item");
  const dots = document.querySelectorAll(".showcase-dot");
  const total = items.length;
  const isMobile = window.innerWidth <= 640;
  const isTablet = window.innerWidth <= 980;
  let spacing1 = 420;
  let spacing2 = 650;
  let spacing3 = 820;
  if (isTablet) {
    spacing1 = 340;
    spacing2 = 530;
    spacing3 = 690;
  }
  if (isMobile) {
    spacing1 = 280;
    spacing2 = 420;
    spacing3 = 560;
  }

  items.forEach((card, index) => {
    let offset = index - showcaseIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    const abs = Math.abs(offset);
    const side = offset < 0 ? -1 : 1;

    card.style.transform = "";
    card.style.opacity = "";
    card.style.zIndex = "";

    if (abs === 0) {
      card.style.transform = "translate(-50%, -50%) translateZ(0) scale(1)";
      card.style.opacity = "1";
      card.style.zIndex = "10";
    } else if (abs === 1) {
      card.style.transform = `translate(-50%, -50%) translateX(${side * spacing1}px) translateZ(-220px) rotateY(${-side * 28}deg) scale(0.86)`;
      card.style.opacity = "0.8";
      card.style.zIndex = "6";
    } else if (abs === 2) {
      card.style.transform = `translate(-50%, -50%) translateX(${side * spacing2}px) translateZ(-380px) rotateY(${-side * 38}deg) scale(0.72)`;
      card.style.opacity = "0.45";
      card.style.zIndex = "4";
    } else if (abs === 3) {
      card.style.transform = `translate(-50%, -50%) translateX(${side * spacing3}px) translateZ(-520px) rotateY(${-side * 44}deg) scale(0.62)`;
      card.style.opacity = "0.25";
      card.style.zIndex = "2";
    } else {
      card.style.transform = "translate(-50%, -50%) translateZ(-500px) scale(0.5)";
      card.style.opacity = "0";
      card.style.zIndex = "1";
    }
  });

  dots.forEach((dot, i) => dot.classList.toggle("active", i === showcaseIndex));
};

const nextShowcase = () => {
  showcaseIndex = (showcaseIndex + 1) % showcaseData.length;
  updateShowcase();
};

const prevShowcase = () => {
  showcaseIndex = (showcaseIndex - 1 + showcaseData.length) % showcaseData.length;
  updateShowcase();
};

if (showcaseCarousel && showcaseIndicators) {
  showcaseData.forEach((item, index) => {
    showcaseCarousel.appendChild(createShowcaseCard(item, index));
    const dot = document.createElement("button");
    dot.className = "showcase-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Слайд ${index + 1}`);
    dot.addEventListener("click", () => {
      showcaseIndex = index;
      updateShowcase();
    });
    showcaseIndicators.appendChild(dot);
  });
  updateShowcase();
}

if (showcasePrev) showcasePrev.addEventListener("click", prevShowcase);
if (showcaseNext) showcaseNext.addEventListener("click", nextShowcase);

// Инструкция: дополнительно управление слайдером с клавиатуры.
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") prevShowcase();
  if (event.key === "ArrowRight") nextShowcase();
});

window.addEventListener("resize", updateShowcase);
// Анимация появления блоков при прокрутке страницы
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));

// Небольшая интерактивность: мягкий эффект наклона карточки в hero-блоке
const heroCard = document.querySelector(".hero-card");
if (heroCard) {
  heroCard.addEventListener("mousemove", (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
  });
}

// Уведомление для кнопок заказа (временная заглушка)
const devOrderButtons = [
  document.getElementById("orderNowBtn"),
  document.getElementById("makeOrderBtn")
];

const devOrderMessage = "Заказ в разработке. Пишите в Max / WhatsApp / Telegram.";
let devToastTimer = null;

const showDevToast = (message) => {
  let toast = document.getElementById("devToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "devToast";
    toast.className = "dev-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");

  if (devToastTimer) {
    clearTimeout(devToastTimer);
  }

  devToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
};

devOrderButtons.forEach((btn) => {
  if (!btn) return;

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    showDevToast(devOrderMessage);
  });
});
