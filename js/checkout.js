document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expDate = document.getElementById('exp-date').value;
    const cvv = document.getElementById('cvv').value;

    if (name && email && address && city && state && zip && cardName && cardNumber && expDate && cvv) {
        alert('Order placed successfully!');
    } else {
        alert('Please fill out all fields.');
    }
});
