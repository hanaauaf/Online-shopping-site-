const cartIcon = document.querySelector(".cart-icon");
const sidebar = document.getElementById("cart-sidebar");
const closebtn = document.querySelector(".close-btn");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = [];

function displayCart() {
    cartItemsContainer.innerHTML = "";
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.style.display = "flex";
        itemDiv.style.justifyContent = "space-between";
        itemDiv.style.alignItems = "center";
        itemDiv.style.marginBottom = "0.5rem";
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <div class="cart-controls">
                <button class="decrease">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase">+</button>
                <button class="remove">Remove</button>
            </div>
        `;
        itemDiv.querySelector(".decrease").addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }
            displayCart();
            saveCartToLocalStorage();
        });
        itemDiv.querySelector(".increase").addEventListener("click", () => {
            item.quantity++;
            displayCart();
            saveCartToLocalStorage();
        });
        itemDiv.querySelector(".remove").addEventListener("click", () => {
            cart.splice(index, 1);
            displayCart();
            saveCartToLocalStorage();
        });
        cartItemsContainer.appendChild(itemDiv);
    });
    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) cart = savedCart;
    displayCart();
}

window.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();

    document.body.addEventListener("click", (e) => {
        if (e.target.matches(".card button")) {
            const card = e.target.closest(".card");
            const name = card.querySelector("h3").innerText;
            const price = parseFloat(card.querySelector("p").innerText.replace("$", ""));
            
            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            displayCart();
            saveCartToLocalStorage();
        }
    });
});

cartIcon.addEventListener("click", () => {
    sidebar.style.right = "0";
    overlay.style.display = "block";
});

closebtn.addEventListener("click", () => {
    sidebar.style.right = "-300px";
    overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
    sidebar.style.right = "-300px";
    overlay.style.display = "none";
});

clearCartBtn.addEventListener("click", () => {
    cart = [];
    displayCart();
    saveCartToLocalStorage();
});
