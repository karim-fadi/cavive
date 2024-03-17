'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNav);



/**
 * slider funtionality
 */

const slider = document.querySelector("[data-slider]");
const nextBtn = document.querySelector("[data-next]");
const prevBtn = document.querySelector("[data-prev]");

// set the slider default position
let sliderPos = 0;

// set the number of total slider items
const totalSliderItems = 3;

// make next slide btn workable
const slideToNext = function () {

  sliderPos++;
  slider.style.transform = `translateX(-${sliderPos}00%)`;

  sliderEnd();

}

addEventOnElem(nextBtn, "click", slideToNext);

// make prev slide btn workable
const slideToPrev = function () {

  sliderPos--;
  slider.style.transform = `translateX(-${sliderPos}00%)`;

  sliderEnd();

}

addEventOnElem(prevBtn, "click", slideToPrev);



// check when slider is end then what should slider btn do
function sliderEnd() {
  if (sliderPos >= totalSliderItems - 1) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }

  if (sliderPos <= 0) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
}

sliderEnd();



/**
 * product quantity functionality
 */

const totalPriceElem = document.querySelector("[data-total-price]");
const totalPriceElem2 = document.querySelector("[data-total-price2]");
const qtyElem = document.querySelector("[data-qty]");
const qtyMinusBtn = document.querySelector("[data-qty-minus]");
const qtyPlusBtn = document.querySelector("[data-qty-plus]");

// set the product default quantity
let qty = 1;

// set the product default price
let productPrice = 450;

let productPriceUndiscounted = 600;
let totalPriceUndiscounted = 600;

// set the initial total price
let totalPrice = 450;

const increaseProductQty = function () {
  qty++;
  totalPrice = qty * productPrice;
  totalPriceUndiscounted = qty * productPriceUndiscounted;

  qtyElem.textContent = qty;
  totalPriceElem.textContent = `EGP ${totalPrice}.00`;
  totalPriceElem2.textContent = `EGP ${totalPriceUndiscounted}.00`;
}

addEventOnElem(qtyPlusBtn, "click", increaseProductQty);

const decreaseProductQty = function () {
  if (qty > 1) qty--;
  totalPrice = qty * productPrice;
  totalPriceUndiscounted = qty * productPriceUndiscounted;

  qtyElem.textContent = qty;
  totalPriceElem.textContent = `EGP ${totalPrice}.00`;
  totalPriceElem2.textContent = `EGP ${totalPriceUndiscounted}.00`;
}

addEventOnElem(qtyMinusBtn, "click", decreaseProductQty);