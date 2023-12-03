window.addEventListener('DOMContentLoaded', () => {
  // BurgerMenu

  const burgerBtn = document.querySelector('.burger');

  function changeMenuImg() {
    burgerBtn.classList.toggle('burger_active');
  }

  let windowWidth = window.innerWidth;
  const tabletWindowWidth = 768;

  const header = document.querySelector('.header');
  const menuBtnHeader = document.querySelector('.header__menu');
  const navHeader = document.querySelector('.header__nav');
  const logo = document.querySelector('.logo');

  function createDropDownMenu() {
    windowWidth = window.innerWidth;

    const dropDownMenu = document.createElement('div');
    dropDownMenu.classList.add('dropdown-menu');
    const checkDropDownMenu = document.querySelector('.dropdown-menu');

    if (windowWidth <= tabletWindowWidth) {
      dropDownMenu.append(navHeader);
      dropDownMenu.append(menuBtnHeader);

      header.append(dropDownMenu);
    } else {
      logo.after(menuBtnHeader);
      logo.after(navHeader);

      menuBtnHeader.classList.add('hidden');
      navHeader.classList.add('hidden');

      if (checkDropDownMenu) {
        checkDropDownMenu.remove();
      }
    }
  }

  if (windowWidth <= tabletWindowWidth) {
    createDropDownMenu();
  }

  window.addEventListener('resize', () => {
    createDropDownMenu();
  });

  function toggleDropDownMenu() {
    document
      .querySelector('.dropdown-menu')
      .classList.toggle('dropdown-menu_open');
  }

  const body = document.querySelector('body');

  function toggleScroll() {
    body.classList.toggle('body-no-scroll');
  }

  burgerBtn.addEventListener('click', () => {
    changeMenuImg();
    toggleDropDownMenu();
    toggleScroll();
  });

  const navLinks = document.querySelectorAll('.header__nav-link');

  navLinks.forEach((el) => {
    el.addEventListener('click', () => {
      changeMenuImg();
      toggleDropDownMenu();
      toggleScroll();
    });
  });

  // Slider

  const slides = document.querySelectorAll('.slide');
  const slidesWrapper = document.querySelector('.slider__wrapper');
  const slidesField = document.querySelector('.slider__inner');
  const widthSlidesWrapper = window.getComputedStyle(slidesWrapper).width;
  const nextSlide = document.querySelector('.slider__arrow_right');
  const prevSlide = document.querySelector('.slider__arrow_left');

  let slideIndex = 1;
  let offset = 0;

  nextSlide.addEventListener('click', () => {
    if (
      offset ===
      Number.parseInt(widthSlidesWrapper, 10) * (slides.length - 1)
    ) {
      offset = 0;
    } else {
      offset += Number.parseInt(widthSlidesWrapper, 10);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
  });

  prevSlide.addEventListener('click', () => {
    if (offset === 0) {
      offset = Number.parseInt(widthSlidesWrapper, 10) * (slides.length - 1);
    } else {
      offset -= Number.parseInt(widthSlidesWrapper, 10);
    }
    slidesField.style.transform = `translateX(+${offset}px)`;
  });
});
