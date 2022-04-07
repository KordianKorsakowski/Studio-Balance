const form = document.querySelector(".section__form");
const btnClose = document.querySelector(".btn-close");
const btnMail = document.querySelector(".btn-mail");
const btnOpen = document.querySelector(".btn-open");
const btnOpen2 = document.querySelector(".btn-open2");
const toggle = document.querySelector("#toggle");

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.add("hidden");
});

btnMail.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.remove("hidden");
  toggle.checked = false;
});
btnOpen.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.remove("hidden");
});
btnOpen2.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.remove("hidden");
});

document.querySelector(".nav").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    toggle.checked = false;
  }
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

const navigation = document.querySelector(".navigation");

const header = document.querySelector(".header");
const navHeight = navigation.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigation.classList.add("sticky");
  else navigation.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currSlide = 0;
const maxSlide = slides.length - 1;

//dot

const creatDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  console.log(slide);
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activateDot(currSlide);
};

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
  activateDot(currSlide);
};
const init = function () {
  goToSlide(0);
  creatDots();
  activateDot(0);
};
init();

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
