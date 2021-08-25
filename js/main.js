"use strict";
const modal = document.querySelector('.modal');
const buttonPrimary = document.querySelector('.button-primary')
const homeImage = document.querySelector('.home-image');
const pathFloor = homeImage.querySelectorAll('path');
const counter = document.querySelector('.counter');
const counterUp = document.querySelector('.counter-up');
const counterDown = document.querySelector('.counter-down');
const modalCounter = document.querySelector('.modal-counter');
const modalImageSvg = document.querySelector('.modal-image-svg');
const pathApartment = modalImageSvg.querySelectorAll('path');
const flatItem = document.querySelectorAll('.flat-link');
let currentFloor = 2;

const addZero = n => n < 10 ? "0" + n : n;

const opacity = () => {
  pathFloor.forEach(item => {
    item.style.opacity = 0;
    if (item.dataset.floor === `${counter.textContent}`) {
      item.style.opacity = 1;
    }
  });
};
opacity();

const openModal = () => {
  modalCounter.textContent = counter.textContent;
  modal.classList.add('is-open');
}
const closeModal = () => {
  modal.classList.remove('is-open');
}

const forEachFunction = (target, addClass) => {
  for (let i = 0; i < flatItem.length; i++) {
    const text = flatItem[i].textContent.match(target.dataset.number);
    if (addClass === 'add') {
      if (text !== null) {
        flatItem[i].classList.add('flat-link-hover');
      }
    }
    if (addClass === 'remove') {
      flatItem[i].classList.remove('flat-link-hover')
    }
  }
};

const apartmentEach = (target, addClass) => {
  for (let i = 0; i < pathApartment.length; i++) {
    const text = target.textContent.match(pathApartment[i].dataset.number);
    if (addClass === 'add') {
      if (text !== null) {
        pathApartment[i].style.opacity = 1;
      }
    }
    if (addClass === 'remove') {
      pathApartment[i].style.opacity = 0;
    }
  }
}

pathFloor.forEach(item => {
  item.addEventListener("mouseover", event => {
    currentFloor = item.dataset.floor;
    counter.textContent = currentFloor;
    opacity();
  });
  item.addEventListener('click', event => {
    openModal();
  });
});
//кнопка на етаж выше
counterUp.addEventListener('click', event => {
  const counterValue = counter.textContent;

  if (+counterValue < 18) {
    counter.textContent = addZero(+counterValue + 1);
    opacity();
  }
});
//кнопка на этаж ниже
counterDown.addEventListener('click', event => {
  const counterValue = counter.textContent;
  if (+counterValue > 2) {
    counter.textContent = addZero(+counterValue - 1);
    opacity();
  }
});

//открываем модальное окно по клику накнопку
buttonPrimary.addEventListener('click', event => {
  event.preventDefault();
  openModal();
});

//закрываем модальное окно по клику накнопку и на подложку
modal.addEventListener('click', event => {
  event.preventDefault();
  const target = event.target;
  if (target.closest('.modal-close-button') || !target.closest('.modal-dialog')) {
    closeModal();
  }
});


const addListener = (elements, callBack) => {
  elements.forEach(item => {
    item.addEventListener("mouseover", event => {
      const target = event.target;
      callBack(target, 'add');
    });
    item.addEventListener("mouseout", event => {
      const target = event.target;
      callBack(target, 'remove');
    });
  });
};

addListener(pathApartment, forEachFunction);
addListener(flatItem, apartmentEach);
