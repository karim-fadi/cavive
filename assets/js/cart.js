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


document.addEventListener('DOMContentLoaded', function() {
    // Function to display cart items
    function displayCartItems() {
      // Get the cart container
      const cartItemsContainer = document.querySelector('.cart-items');
      var checkoutSection = document.querySelector('.checkout-section');
  
      // Clear previous items
      cartItemsContainer.innerHTML = '';
  
      // Retrieve cart items from local storage
      let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Check if there are stored cart items
      if (storedCartItems.length > 0) {
        checkoutSection.style.display = 'block';
        // Iterate through each cart item
        storedCartItems.forEach(function(item, index) {
          // Create cart item element
          const cartItemElement = document.createElement('div');
          cartItemElement.classList.add('cart-item');
  
          // Construct HTML for cart item
          cartItemElement.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-details">
              <span>Size: ${item.size}</span>
              <span>Quantity: ${item.quantity}</span>
              <span>Price: EGP ${item.price.toFixed(2)}</span><br>
              <button class="remove-item-btn" data-index="${index}">Remove</button>
            </div>
          `;
  
          // Append cart item to cart container
          cartItemsContainer.appendChild(cartItemElement);
        });
      } else {
        // If no items in cart, display a message
        checkoutSection.style.display = 'none';
        const emptyCartMessage = document.createElement('div');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyCartMessage);
      }
  
      // Calculate and display total price
      displayTotalPrice(storedCartItems);
  
      // Add event listeners for remove item buttons
      const removeItemButtons = document.querySelectorAll('.remove-item-btn');
      removeItemButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
          const index = event.target.getAttribute('data-index');
          removeCartItem(index);
        });
      });
    }
  
    // Function to remove a cart item
    function removeCartItem(index) {
      let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      storedCartItems.splice(index, 1); // Remove item at given index
      localStorage.setItem('cartItems', JSON.stringify(storedCartItems)); // Update local storage
      displayCartItems(); // Refresh cart display
    }
  
    // Function to calculate and display total price
    function displayTotalPrice(cartItems) {
      const totalPriceElement = document.getElementById('total-price-value');
  
      // Calculate total price
      let totalPrice = 0;
      if (cartItems && cartItems.length > 0) {
        totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
      }
  
      // Display total price
      totalPriceElement.textContent = 'EGP ' + totalPrice.toFixed(2);
    }
  
    // Call the function to display cart items when the page loads
    displayCartItems();
  });


  function checkForm() {
    var form = document.getElementById('checkout-form');
    var inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    var allValid = true;

    inputs.forEach(function(input) {
        // Validate email
        if (input.type === 'email') {
            if (!isValidEmail(input.value)) {
                allValid = false;
                input.nextElementSibling.textContent = 'Please enter a valid email address.';
            } else {
                input.nextElementSibling.textContent = '';
            }
        }
        // Validate phone number
        else if (input.type === 'tel') {
            if (!isValidPhoneNumber(input.value)) {
                allValid = false;
                input.nextElementSibling.textContent = 'Please enter a valid phone number.';
            } else {
                input.nextElementSibling.textContent = '';
            }
        }
        // Check if input is empty
        else if (input.value === '') {
            allValid = false;
            input.nextElementSibling.textContent = 'This field is required.';
        } else {
            input.nextElementSibling.textContent = '';
        }
    });

    var submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = !allValid;
}

// Call the checkForm function whenever there's a change in the form fields
document.getElementById('checkout-form').addEventListener('input', checkForm);

// Initially check form to disable the submit button if necessary
checkForm();


// Get the modal element
var modal = document.getElementById("termsModal");

// Get the link element
var link = document.querySelector(".terms");

// When the user clicks on the link, open the modal with a fade-in animation
link.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.add("fade-in");
  modal.style.display = "block";

  var headerTop = document.querySelector('.header-top');
  headerTop.style.zIndex = '0';
});

// When the user clicks on the close button, close the modal
var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
  modal.classList.remove("fade-in");
  var headerTop = document.querySelector('.header-top');
  headerTop.style.zIndex = '4';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.classList.remove("fade-in");
    var headerTop = document.querySelector('.header-top');
    headerTop.style.zIndex = '4';
  }
});
