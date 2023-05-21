const productsContainer = document.getElementById('products');
const categoriesContainer = document.getElementById('categories');
const cartIcon = document.createElement('div');
cartIcon.className = 'cart-icon';
cartIcon.textContent = '0';
document.body.appendChild(cartIcon);

// Fetch all categories
fetch('https://fakestoreapi.com/products/categories')
  .then(response => response.json())
  .then(categories => {
    displayCategories(categories);
    fetchProducts();
  });

// Display all categories
function displayCategories(categories) {
  categoriesContainer.innerHTML = '';

  const allCategoryButton = document.createElement('button');
  allCategoryButton.textContent = 'All';
  allCategoryButton.classList.add('category-button', 'active');
  allCategoryButton.addEventListener('click', () => {
    filterProductsByCategory(null);
    toggleActiveCategoryButton(allCategoryButton);
  });
  categoriesContainer.appendChild(allCategoryButton);

  categories.forEach(category => {
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category;
    categoryButton.classList.add('category-button');
    categoryButton.addEventListener('click', () => {
      filterProductsByCategory(category);
      toggleActiveCategoryButton(categoryButton);
    });
    categoriesContainer.appendChild(categoryButton);
  });
}

// Fetch products
function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      displayProducts(products);
    });
}

// Display filtered products
function filterProductsByCategory(category) {
  if (category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => response.json())
      .then(products => {
        displayProducts(products);
      });
  } else {
    fetchProducts();
  }
}

// Display all products
function displayProducts(products) {
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-item';

    const image = document.createElement('img');
    image.src = product.image;
    card.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = product.title;
    card.appendChild(title);

    const category = document.createElement('p');
    category.textContent = `Category: ${product.category}`;
    card.appendChild(category);

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
    card.appendChild(price);

    card.addEventListener('click', () => {
      showProductDetails(product);
    });

    productsContainer.appendChild(card);
  });
}

// Display single product details
function showProductDetails(product) {
  sessionStorage.setItem('product', JSON.stringify(product));
  window.location.href = 'product.html';
}

// Update cart icon count
function updateCartCount(count) {
  cartIcon.textContent = count;
}

// Handle cart functionality
cartIcon.addEventListener('click', () => {
  window.location.href = 'cart.html';
});

// Toggle active category button
function toggleActiveCategoryButton(activeButton) {
  const categoryButtons = document.querySelectorAll('.category-button');
  categoryButtons.forEach(button => {
    button.classList.remove('active');
  });
  activeButton.classList.add('active');
}
