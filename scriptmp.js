// Data Produk
const products = [
    { id: 1, name: "Bunga Mawar", price: 450000, image: "MAWAR.jpg" },
    { id: 2, name: "Tanaman Hias 2", price: 150000, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Tanaman Buah 1", price: 200000, image: "https://via.placeholder.com/200" },
    { id: 4, name: "Tanaman Herbal 1", price: 50000, image: "https://via.placeholder.com/200" },
];

// Keranjang Belanja
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi untuk menampilkan produk
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="viewDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">Rp ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id}, event)">Tambahkan ke Keranjang</button>
        </div>
    `).join("");
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId, event) {
    event.stopPropagation(); // Mencegah event bubbling
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
}

// Fungsi untuk menampilkan keranjang
function displayCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i> Hapus</button>
        </div>
    `).join("");

    updateTotalPrice();
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Fungsi untuk memperbarui total harga
function updateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById("totalPrice").textContent = `Rp ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk mencari produk
function searchProduct() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Fungsi untuk melihat detail produk
function viewDetail(productId) {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "detail.html";
}

// Inisialisasi
if (window.location.pathname.includes("index.html")) {
    displayProducts();
} else if (window.location.pathname.includes("cart.html")) {
    displayCart();
}