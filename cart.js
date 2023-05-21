const cartItemsContainer = document.getElementById('cart-items');

// Fetch cart items
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

if (cartItems.length === 0) {
  cartItemsContainer.textContent = 'Your cart is empty.';
} else {
  displayCartItems(cartItems);
}

// Display cart items
function displayCartItems(cartItems) {
  cartItemsContainer.innerHTML = '';

  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const image = document.createElement('img');
    image.src = item.image;
    cartItem.appendChild(image);

    const details = document.createElement('div');
    details.className = 'item-details';

    const title = document.createElement('h4');
    title.textContent = item.title;
    details.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `$${item.price}`;
    details.appendChild(price);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeCartItem(index);
    });
    details.appendChild(removeButton);

    cartItem.appendChild(details);

    cartItemsContainer.appendChild(cartItem);
  });
}

// Remove item from cart
function removeCartItem(index) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));

  displayCartItems(cartItems);
  updateCartCount(cartItems.length);
}
