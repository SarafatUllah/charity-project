// page leader animation
window.addEventListener("load", function () {
  const elements = document.querySelectorAll(`.overlay`);
  const loaderWrapper = document.querySelector(`.loader-wrap`);
  elements.forEach((element) => {
    elements.forEach((element) => {
      element.style.left = "100%";
      element.style.transform = "translate3d(0px, 0px, 0px)";
    });
  });
  setTimeout(() => {
    loaderWrapper.style.display = "none";
  }, 1200);
});
// Header menu animation
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navIndicator = document.querySelector(".nav-indicator");
  const navIndicatorSmall = document.querySelector(".nav-indicator-small");

  function moveIndicator(activeLink) {
    const { left, width } = activeLink.getBoundingClientRect();
    const parentLeft =
      activeLink.parentElement.parentElement.getBoundingClientRect().left;

    navIndicator.style.width = `${width}px`; // Match width of active item
    navIndicator.style.transform = `translateX(${left - parentLeft}px)`; // Move smoothly
    navIndicatorSmall.style.width = `${width - 15}px`; // Match width of active item
    navIndicatorSmall.style.transform = `translateX(${
      left - parentLeft + 8
    }px)`;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      moveIndicator(this);
    });
  });

  // Move indicator and set active class on click
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      document.querySelector(".nav-link.active")?.classList.remove("active");
      this.classList.add("active");
      moveIndicator(this);
    });
  });

  // Set initial position on page load
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    moveIndicator(activeLink);
  }
});

const menuToggle = document.getElementById("menu-toggle");
const menuList = document.getElementById("menu-list");

menuToggle.addEventListener("click", () => {
  menuList.classList.toggle("show");
});

// Fixed header
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  const headerTemp = this.document.getElementById("header-temp");
  console.log(window.scrollY, "window.scrollY");
  if (window.scrollY > 180) {
    // After scrolling 180px
    header.classList.add("sticky-header");
    headerTemp.classList.add("block");
    headerTemp.classList.remove("hidden");
    menuList.classList.remove("show");
  } else {
    menuList.classList.remove("show");
    header.classList.remove("sticky-header");
    headerTemp.classList.add("hidden");
    headerTemp.classList.remove("block");
  }
});
let firstLoad = true;
// Initialize Swiper
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    loop: true,
    effect: "slide",
    speed: 1500,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      init: function () {
        animateSlide(this.slides[this.activeIndex], firstLoad);
        firstLoad = false; // Mark that first load is done
      },
      slideChangeTransitionStart: function () {
        // Remove animations from all slides
        this.slides.forEach((slide) => resetAnimations(slide));
        const activeSlide = this.slides[this.activeIndex];
        animateSlide(activeSlide); // show text immediately
      },
      // slideChangeTransitionEnd: function () {
      //   animateSlide(this.slides[this.activeIndex]);
      // },
    },
  });

  function animateSlide(slide, isFirstLoad = false) {
    const elements = slide.querySelectorAll("[data-animate]");
    const initialDelay = isFirstLoad ? 1200 : 700;

    elements.forEach((el, index) => {
      const animationType = el.getAttribute("data-animate");
      el.style.opacity = "0";
      // el.classList.remove("fade-up", "fade-down", "fade-left", "fade-right");
      el.classList.remove("fade-up", "fade-down", "fade-left");
      setTimeout(() => {
        el.classList.add(`fade-${animationType}`);
        el.style.animationDelay = `${index * 0.3}s`;
      }, initialDelay);
    });
  }

  function resetAnimations(slide) {
    const elements = slide.querySelectorAll("[data-animate]");
    elements.forEach((el) => {
      el.classList.remove("fade-up", "fade-down", "fade-left");
      el.style.opacity = "0";
    });
  }

  // 👉 Custom button event listeners:
  document.querySelector(".custom-next-btn").addEventListener("click", () => {
    swiper.slidePrev();
  });

  document.querySelector(".custom-prev-btn").addEventListener("click", () => {
    swiper.slideNext();
  });

  // const swiper = new Swiper(".swiper", {
  //   // Enable loop
  //   // direction: 'vertical',
  //   loop: true,

  //   // Use fade effect
  //   effect: "fade",
  //   speed: 1000,

  //   // Configure pagination
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },

  //   // Configure navigation arrows
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },

  //   // Configure autoplay
  //   // autoplay:
  //   // {
  //   //   delay: 5000,
  //   //   disableOnInteraction: false,
  //   // },
  // });
});
