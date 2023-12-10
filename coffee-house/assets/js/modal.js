window.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const products = document.querySelectorAll('.tabs__product');

  function createModal(cards, numberCard) {
    modal.innerHTML = '';
    for (let i = 0; i < cards.length; i += 1) {
      if (numberCard === i) {
        modal.innerHTML += `<div class="modal__content">
        <div class="modal__img"></div>
        <div class="modal__information">
          <div class="modal__title">
            ${cards[i].name}
          </div>
          <p class="modal__description">
            ${cards[i].description}
          </p>
          <span class="modal__choice">Size</span>
          <div class="tabs__flex-container tabs__flex-container_modal">
            <div class="tabs__tab">
              <div class="tabs__tab-icon">S</div>
              <div class="tabs__tab-name">${cards[i].sizes.s.size}</div>
            </div>
            <div class="tabs__tab">
              <div class="tabs__tab-icon">M</div>
              <div class="tabs__tab-name">${cards[i].sizes.m.size}</div>
            </div>
            <div class="tabs__tab">
              <div class="tabs__tab-icon">L</div>
              <div class="tabs__tab-name">${cards[i].sizes.l.size}</div>
            </div>
          </div>
          <span class="modal__choice">Additives</span>
          <div class="tabs__flex-container tabs__flex-container_modal">
            <div class="tabs__tab">
              <div class="tabs__tab-icon">1</div>
              <div class="tabs__tab-name">${cards[i].additives[0].name}</div>
            </div>
            <div class="tabs__tab">
              <div class="tabs__tab-icon">2</div>
              <div class="tabs__tab-name">${cards[i].additives[1].name}</div>
            </div>
            <div class="tabs__tab">
              <div class="tabs__tab-icon">3</div>
              <div class="tabs__tab-name">${cards[i].additives[2].name}</div>
            </div>
          </div>
          <div class="modal__total">
            <span class="modal__text">Total:</span>
            <span class="modal__price">$${cards[i].price}</span>
          </div>
          <p class="modal__sale">The cost is not final. Download our mobile app to see the final price and place your
            order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
          <div class="modal__close">Close</div>
        </div>
      </div>`;
      }
    }
  }

  let requestProducts;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../../assets/products.json', true);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      requestProducts = JSON.parse(xhr.responseText);
    } else {
      console.log('Error');
    }
  };

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
      let index;
      products.forEach((el, i) => {
        if (el === e.target.closest('.tabs__product')) {
          index = i;
        }
      });
      createModal(requestProducts, index);
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
  let startPrice = +Number.parseFloat(price.innerHTML.slice(1), 10);
  const STEP_SIZE = 0.5;

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

  function updatePrice() {
    price.innerHTML = `$${startPrice.toFixed(2)}`;
  }

  optionsContainersFirst.addEventListener('click', (e) => {
    const target = e.target;
    const prevClick = checkSelectedBtn(optionsFirst);

    if (target.closest('.tabs__tab')) {
      optionsFirst.forEach((btn, i) => {
        if (target.closest('.tabs__tab') === btn) {
          btn.classList.add('tabs__tab_select');
          if (prevClick < i) {
            for (let j = 0; j < i - prevClick; j += 1) {
              startPrice += STEP_SIZE;
            }
            price.innerHTML = `$${startPrice.toFixed(2)}`;
          } else if (prevClick > i) {
            for (let j = 0; j < prevClick - i; j += 1) {
              startPrice -= STEP_SIZE;
            }
          }
        } else {
          btn.classList.remove('tabs__tab_select');
        }
      });
    }

    updatePrice();
  });

  optionsContainersSecond.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.tabs__tab')) {
      optionsSecond.forEach((btn) => {
        if (target.closest('.tabs__tab') === btn) {
          if (!target.closest('.tabs__tab_select-modal')) {
            btn.classList.add('tabs__tab_select-modal');
            startPrice += STEP_SIZE;
          } else {
            btn.classList.remove('tabs__tab_select-modal');
            startPrice -= STEP_SIZE;
          }
        }
      });
    }

    updatePrice();
  });
});
