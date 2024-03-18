document.addEventListener('DOMContentLoaded', function() {
    // Function to display cart items
    function displayCartItems() {
      // Get the cart container
      const cartItemsContainer = document.querySelector('.cart-items');
  
      // Clear previous items
      cartItemsContainer.innerHTML = '';
  
      // Retrieve cart items from local storage
      let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Check if there are stored cart items
      if (storedCartItems.length > 0) {
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
  