document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('productModal');
    const span = document.getElementsByClassName('x')[0];
    const productTriggers = document.querySelectorAll('.product-trigger');

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

            modal.style.display = 'block';
        });
    });

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
