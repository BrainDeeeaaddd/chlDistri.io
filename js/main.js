// main.js
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = [];

    // Add to cart event listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.card-title a').innerText;
            const productPrice = parseFloat(productCard.querySelector('.item-price').innerText.replace('₱', ''));
            addToCart(productName, productPrice);
            updateCartDisplay();
        });
    });

    // Add item to cart function
    function addToCart(name, price) {
        cartItems.push({ name, price });
        // Save cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Update cart display function
    function updateCartDisplay() {
        const cartItemsList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        let total = 0;

        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'cart-item';
            listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="delete-button" data-index="${index}">Delete</button>`;
            cartItemsList.appendChild(listItem);
            total += item.price;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    // Remove item from cart function
    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCartDisplay();
    }

    // Load cart items from localStorage on page load
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems.push(...JSON.parse(storedCartItems));
        updateCartDisplay();
    }

    // Product modal event listeners
    const productTriggers = document.querySelectorAll('.product-trigger');
    const productModal = document.getElementById('productModal');
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const productModalClose = document.querySelector('#productModal .close');
    const cartModalClose = document.querySelector('#cart-modal .close');
    const modalAddToCartButton = document.getElementById('modalAddToCartButton');

    productTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            const productDescription = this.getAttribute('data-description');
            const productImage = this.getAttribute('data-image');

            document.getElementById('modalProductName').innerText = productName;
            document.getElementById('modalProductPrice').innerText = productPrice;
            document.getElementById('modalProductDescription').innerText = productDescription;
            document.getElementById('modalProductImage').src = productImage;

            productModal.style.display = 'block';
        });
    });

    // Close modals
    productModalClose.onclick = () => productModal.style.display = 'none';
    cartModalClose.onclick = () => cartModal.style.display = 'none';
    window.onclick = function(event) {
        if (event.target == productModal) productModal.style.display = 'none';
        if (event.target == cartModal) cartModal.style.display = 'none';
    };

    // Cart modal event listener
    cartIcon.onclick = function() {
        cartModal.style.display = 'block';
        updateCartDisplay();
    };

    // Add to cart button in modal
    modalAddToCartButton.onclick = function() {
        const productName = document.getElementById('modalProductName').innerText;
        const productPrice = parseFloat(document.getElementById('modalProductPrice').innerText.replace('₱', ''));
        addToCart(productName, productPrice);
        productModal.style.display = 'none';
    };

    // Checkout function
    function checkout() {
        if (cartItems.length > 0) {
            alert('Thank you for your purchase! Your items will be shipped shortly.');
            cartItems.length = 0;
            updateCartDisplay();
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    }

    document.getElementById('checkout-button').addEventListener('click', checkout);
});
