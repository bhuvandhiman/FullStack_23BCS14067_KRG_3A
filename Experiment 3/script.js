const products = [
  { name: "Laptop", category: "electronics", price: 39999 },
  { name: "T-Shirt", category: "clothing", price: 400 },
  { name: "Wireless Mouse", category: "electronics", price: 999 },
  { name: "Jeans", category: "clothing", price: 1750 },
  { name: "Smartwatch", category: "accessories", price: 1249 },
  { name: "Headphones", category: "electronics", price: 1999 },
  { name: "Hoodie", category: "clothing", price: 1500 },
  { name: "Leather Belt", category: "accessories", price: 999 }
];

const filterSelect = document.getElementById('filter');
const productsContainer = document.getElementById('products-container');

function renderProducts(productsToRender) {
  if (productsToRender.length === 0) {
    productsContainer.innerHTML = '<p class="no-results">No products found in this category.</p>';
    return;
  }
  productsContainer.innerHTML = productsToRender.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p class="category">${p.category}</p>
      <p class="price">${p.price}</p> 
    </div>
  `).join(''); 
}

filterSelect.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  
  const filteredProducts = selectedCategory === 'all' 
    ? products
    : products.filter(p => p.category === selectedCategory);
  
  renderProducts(filteredProducts);
});

renderProducts(products);