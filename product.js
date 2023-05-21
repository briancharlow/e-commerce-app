const productDetailsContainer =
  document.getElementById('product-details');
const addToCartButton = document.getElementById('add-to-cart');
const product = JSON.parse(sessionStorage.getItem('product'));

if (product) {
  displayProductDetails(product);
} else {
  productDetailsContainer.textContent = 'Product not found.';
}

addToCartButton.addEventListener('click', () => {
  addToCart(product);
});

function displayProductDetails(product) {
  const image = document.createElement('img');
  image.src = product.image;
  productDetailsContainer.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = product.title;
  productDetailsContainer.appendChild(title);

  const price = document.createElement('p');
  price.textContent = `$${product.price}`;
  productDetailsContainer.appendChild(price);
}

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(product);
  localStorage.setItem('cart', JSON.stringify(cartItems));

  updateCartCount(cartItems.length);
}
