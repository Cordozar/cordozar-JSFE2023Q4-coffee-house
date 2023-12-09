window.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const body = document.querySelector('body');

  function closeModal() {
    modal.classList.add('hidden');
    body.classList.remove('body-no-scroll');
  }

  closeModal();

  function openModal() {
    modal.classList.remove('hidden');
    body.classList.add('body-no-scroll');
  }

  const closeBtn = document.querySelector('.modal__close');
  const productsParent = document.querySelector('.tabs__products');

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__content')) {
      closeModal();
    }
  });

  productsParent.addEventListener('click', (e) => {
    if (e.target.closest('.tabs__product')) {
      openModal();
    }
  });

  const optionsContainersFirst = modal.querySelectorAll(
    '.tabs__flex-container'
  )[0];
  const optionsContainersSecond = modal.querySelectorAll(
    '.tabs__flex-container'
  )[1];
  let optionsFirst = optionsContainersFirst.querySelectorAll('.tabs__tab');
  const optionsSecond = optionsContainersSecond.querySelectorAll('.tabs__tab');

  optionsFirst[0].classList.add('tabs__tab_select');

  const price = modal.querySelector('.modal__price');
  let startPrice = +Number.parseInt(price.innerHTML.slice(1), 10);

  function checkSelectedBtn() {
    optionsFirst = optionsContainersFirst.querySelectorAll('.tabs__tab');
    let result;
    for (let i = 0; i < optionsFirst.length; i += 1) {
      if (optionsFirst[i].classList.contains('tabs__tab_select')) {
        result = i;
      }
    }
    return result;
  }

  optionsContainersFirst.addEventListener('click', (e) => {
    const target = e.target;
    const prevClick = checkSelectedBtn(optionsFirst);

    if (target.closest('.tabs__tab')) {
      optionsFirst.forEach((btn, i) => {
        if (target.closest('.tabs__tab') === btn) {
          btn.classList.add('tabs__tab_select');
          if (prevClick < i) {
            // console.log(`Текущая кнопка ${i}`);
            // console.log(`Предыдущая кнопка ${prevClick}`);
            for (let j = 0; j < i - prevClick; j += 1) {
              startPrice += 0.5;
            }
            price.innerHTML = `$${startPrice.toFixed(2)}`;
          } else if (prevClick > i) {
            for (let j = 0; j < prevClick - i; j += 1) {
              startPrice -= 0.5;
            }
            price.innerHTML = `$${startPrice.toFixed(2)}`;
          }
        } else {
          btn.classList.remove('tabs__tab_select');
        }
      });
    }
  });

  // optionsContainersSecond.addEventListener('click', (e) => {
  //   const target = e.target;

  //   if (target.closest('.tabs__tab')) {
  //     optionsSecond.forEach((btn) => {
  //       if (target.closest('.tabs__tab') === btn) {
  //         btn.classList.toggle('tabs__tab_select');
  //         if (btn.classList.contains('tabs__tab_select')) {
  //           lowerPrice(1);
  //         } else {
  //           raisePrice(1);
  //         }
  //       }
  //     });
  //   }
  // });
});
