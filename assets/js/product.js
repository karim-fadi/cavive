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

const productNameElem = document.querySelector("[data-product-name]");
const totalPriceElem = document.querySelector("[data-total-price]");
const totalPriceElem2 = document.querySelector("[data-total-price2]");
const qtyElem = document.querySelector("[data-qty]");
const qtyMinusBtn = document.querySelector("[data-qty-minus]");
const qtyPlusBtn = document.querySelector("[data-qty-plus]");

// set the product default quantity
let qty = 1;

// set the product default price
let productPrice = 480;
let totalPrice = 480;

let productPriceUndiscounted = 600;
let totalPriceUndiscounted = 600;



if (productNameElem) {
  const productName = productNameElem.textContent;

  if (productName === "Reppin' Out Of Mind Hoodie") {
    productPrice = 480;
    totalPrice = 480;
    productPriceUndiscounted = 600;
    totalPriceUndiscounted = 600;

  } else if (productName === "Lost In Thoughts Hoodie") {
    productPrice = 600;
    totalPrice = 600;
    productPriceUndiscounted = 600;
    totalPriceUndiscounted = 600;

  } else if (productName === "We Don't Look Back Hoodie") {
    productPrice = 600;
    totalPrice = 600;
    productPriceUndiscounted = 600;
    totalPriceUndiscounted = 600;
  }

}

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

document.addEventListener("DOMContentLoaded", function() {
  const sizeBoxes = document.querySelectorAll('.size-box');

  sizeBoxes.forEach(box => {
    box.addEventListener('click', function() {
      // Remove 'selected' class from all size boxes
      sizeBoxes.forEach(box => {
        box.classList.remove('selected');
      });

      // Add 'selected' class to the clicked size box
      this.classList.add('selected');

      // Get the selected size
      const selectedSize = this.getAttribute('data-size');
      console.log('Selected size:', selectedSize);
    });
  });
});


// Cart System

// Array to store items in the cart
let cartItems = [];

// Function to add item to the cart and save it to local storage
const addToCart = function() {
  // Get the selected size
  const selectedSize = document.querySelector('.size-box.selected').getAttribute('data-size');
  const selectedName = productNameElem.textContent;

  if (JSON.parse(localStorage.getItem('cartItems')) === null)
  {
    cartItems = [];
  }

  else 
  {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
  }

  // Create a new cart item object
  const newItem = {
    name: selectedName,
    size: selectedSize,
    quantity: qty,
    price: totalPrice
  };

  // Add the item to the cart
  cartItems.push(newItem);

  // Save the updated cart items to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Log the cart items
  console.log('Item added to cart:', newItem);
  console.log(cartItems);
}


// Add event listener to the add to cart button
const addToCartBtn = document.querySelector("[data-add-to-cart]");
addToCartBtn.addEventListener('click', addToCart);

// Get the modal element
var modal = document.getElementById("termsModal");

// Get the link element
var link = document.querySelector(".terms");

// When the user clicks on the link, open the modal with a fade-in animation
link.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.add("fade-in");
  modal.style.display = "block";
});

// When the user clicks on the close button, close the modal
var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
  modal.classList.remove("fade-in");
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.classList.remove("fade-in");
  }
});
