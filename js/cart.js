document.addEventListener('DOMContentLoaded', (event) => {
    const productModal = document.getElementById('productModal');
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const productModalClose = document.querySelector('#productModal .close');
    const cartModalClose = document.querySelector('#cart-modal .close');
    const modalAddToCartButton = document.getElementById('modalAddToCartButton');
    const productTriggers = document.querySelectorAll('.product-trigger');
    const cartItems = [];

    // Product modal event listeners
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

    // Cart modal event listeners
    cartIcon.onclick = function() {
        cartModal.style.display = 'block';
        updateCart();
    };

    modalAddToCartButton.onclick = function() {
        const productName = document.getElementById('modalProductName').innerText;
        const productPrice = parseFloat(document.getElementById('modalProductPrice').innerText.replace('$', ''));
        addToCart(productName, productPrice);
        productModal.style.display = 'none';
    };

    // Add to cart from product cards
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.card-title a').innerText;
            const productPrice = parseFloat(productCard.querySelector('.item-price').innerText.replace('$', ''));
            addToCart(productName, productPrice);
        });
    });

    // Functions to handle cart
    function addToCart(name, price) {
        cartItems.push({ name, price });
        updateCart();
    }

    function updateCart() {
        const cartList = document.getElementById('cart-items');
        cartList.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'cart-item';
            listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="delete-button" data-index="${index}">Delete</button>`;
            cartList.appendChild(listItem);
            total += item.price;
        });

        document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCart();
    }

    function checkout() {
        if (cartItems.length > 0) {
            alert('Thank you for your purchase! Your items will be shipped shortly.');
            cartItems.length = 0;
            updateCart();
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    }

    document.getElementById('checkout-button').addEventListener('click', checkout);
});
