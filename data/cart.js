export const cart = [];

export function addToCart(productId) {
    let matchingCartItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingCartItem = cartItem;
        }
    });
  
    let quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value, 10);
  
    if (matchingCartItem){
  
        matchingCartItem.quantity += quantity
    } else {
        cart.push({productId,quantity});
    }
  }