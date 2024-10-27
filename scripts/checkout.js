import { calculateCartQuantity, cart, changeFromCart, removeFromCart,  } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach( (cartItem) => {
    const productId = cartItem.productId;

    let  matchingProduct;

    products.forEach((product) => {
        if (product.id === productId){
            matchingProduct = product;
        }
    });

checkoutNumber();

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
                Update
                </span>
                <div class="js-update-input-element-${matchingProduct.id}"></div>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `
});

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach( (link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-container-${productId}`);
            checkoutNumber();
            container.remove();
        });
    });

document.querySelectorAll('.js-update-link')
    .forEach( (link) => {
        const productId = link.dataset.productId;
        link.addEventListener('click', () => {
            quantityInput(productId);
        })
    })

function checkoutNumber(){
    document.querySelector('.js-checkout-number')
        .innerHTML = `${calculateCartQuantity()} items`;
}

function quantityInput(productId){
    document.querySelector(`.js-update-link`).addEventListener('click', () => {
        // Create and inject the input and save button dynamically
        document.querySelector(`.js-update-input-element-${productId}`).innerHTML = `
            <input class="quantity-input js-quantity-input-${productId}">
            <span class="save-quantity-link link-primary js-save-span-${productId}">Save</span>
        `;
    
        // Now the element exists, you can safely add the event listener:
        document.querySelector(`.js-save-span-${productId}`)
            .addEventListener('click', (event) => {
                const newQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;
                changeFromCart(productId, newQuantity);
            });
    });
    

}

