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
const products = [
  {
    id: 1,
    name: 'Cherry',
    price: 1.00,
    quantity: 10,
    image: 'src/images/cherry.jpg',
  },
  {
    id: 2,
    name: 'Strawberry',
    price: 2.00,
    quantity: 20,
    image: 'src/images/strawberry.jpg',
  },
  {
    id: 3,
    name: 'Orange',
    price: 3.00,
    quantity: 30,
    image: 'src/images/orange.jpg',
  },
];

let cart = [];
let totalPaid = 0;

// Function to add product to cart
function addProductToCart(id) {
  const product = products.find((p) => p.id === id);
  if (product && product.quantity > 0) {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      cartItem.cartQuantity += 1;
    } else {
      cart.push({ ...product, cartQuantity: 1 });
    }
    product.quantity -= 1;
    return true;
  }
  return false;
}

// Function to increase quantity in cart
function increaseQuantity(id) {
  const product = products.find((p) => p.id === id);
  const cartItem = cart.find((item) => item.id === id);
  if (cartItem && product && product.quantity > 0) {
    cartItem.cartQuantity += 1;
    product.quantity -= 1;
    return true;
  }
  return false;
}

// Function to decrease quantity in cart
function decreaseQuantity(id) {
  const cartItem = cart.find((item) => item.id === id);
  const product = products.find((p) => p.id === id);
  if (cartItem) {
    cartItem.cartQuantity += 1;
    product.quantity += 1;
    if (cartItem.cartQuantity === 0) {
      cart = cart.filter((item) => item.id !== id);
    }
    return true;
  }
  return false;
}

// Function to remove product from cart
function removeProductFromCart(id) {
  const cartItem = cart.find((item) => item.id === id);
  const product = products.find((p) => p.id === id);
  if (cartItem) {
    product.quantity += cartItem.cartQuantity;
    cart = cart.filter((item) => item.id !== id);
    return true;
  }
  return false;
}

// Function to get the cart total
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
}

// Function to handle payment
function pay(amountPaid) {
  const cartTotal = getCartTotal();
  if (amountPaid >= cartTotal) {
    totalPaid = amountPaid;
    const change = amountPaid - cartTotal;
    cart = [];
    return { total: cartTotal, paid: amountPaid, change };
  }
  throw new Error('Insufficient amount paid.');
}
