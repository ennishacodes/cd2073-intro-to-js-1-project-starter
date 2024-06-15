/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

/* Create a function called emptyCart that empties the products from the cart */

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
// script.js

// Global variables
let products = [
    { id: 1, name: 'Apple', price: 1.00, quantity: 10, image: 'assets/images/apple.jpg' },
    { id: 2, name: 'Banana', price: 0.50, quantity: 15, image: 'assets/images/banana.jpg' },
    { id: 3, name: 'Orange', price: 1.20, quantity: 20, image: 'assets/images/orange.jpg' }
];

let cart = [];
let totalPaid = 0;

// Function to display products
function displayProducts() {
    const productsDiv = document.querySelector('.products');
    productsDiv.innerHTML = ''; // Clear previous content
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Available: ${product.quantity}</p>
            <button onclick="addProductToCart(${product.id})">Add to Cart</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

// Function to display cart
function displayCart() {
    const cartDiv = document.querySelector('.cart');
    cartDiv.innerHTML = ''; // Clear previous content
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name}">
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.cartQuantity}</p>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="removeProductFromCart(${item.id})">Remove</button>
        `;
        cartDiv.appendChild(cartItemDiv);
    });
    updateCartTotal();
}

// Function to update cart total
function updateCartTotal() {
    const cartTotalDiv = document.querySelector('.cart-total');
    let total = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    cartTotalDiv.innerText = `Total: $${total.toFixed(2)}`;
}

// Function to add product to cart
function addProductToCart(id) {
    const product = products.find(p => p.id === id);
    if (product && product.quantity > 0) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.cartQuantity++;
        } else {
            cart.push({ ...product, cartQuantity: 1 });
        }
        product.quantity--;
        displayProducts();
        displayCart();
    }
}

// Function to increase quantity in cart
function increaseQuantity(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    if (cartItem && product && product.quantity > 0) {
        cartItem.cartQuantity++;
        product.quantity--;
        displayProducts();
        displayCart();
    }
}

// Function to decrease quantity in cart
function decreaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    const product = products.find(p => p.id === id);
    if (cartItem) {
        cartItem.cartQuantity--;
        product.quantity++;
        if (cartItem.cartQuantity === 0) {
            cart = cart.filter(item => item.id !== id);
        }
        displayProducts();
        displayCart();
    }
}

// Function to remove product from cart
function removeProductFromCart(id) {
    const cartItem = cart.find(item => item.id === id);
    const product = products.find(p => p.id === id);
    if (cartItem) {
        product.quantity += cartItem.cartQuantity;
        cart = cart.filter(item => item.id !== id);
        displayProducts();
        displayCart();
    }
}

// Function to handle payment
function pay() {
    const amountPaid = parseFloat(document.querySelector('.received').value);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    if (amountPaid >= cartTotal) {
        totalPaid = amountPaid;
        displayReceipt(cartTotal);
        cart = [];
        displayProducts();
        displayCart();
    } else {
        alert('Insufficient amount paid.');
    }
}

// Function to display receipt
function displayReceipt(total) {
    const receiptDiv = document.querySelector('.pay-summary');
    receiptDiv.innerHTML = `
        <p>Total: $${total.toFixed(2)}</p>
        <p>Paid: $${totalPaid.toFixed(2)}</p>
        <p>Change: $${(totalPaid - total).toFixed(2)}</p>
    `;
}

// Event listener for the pay button
document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();
    pay();
});

// Initial display
displayProducts();
displayCart();
