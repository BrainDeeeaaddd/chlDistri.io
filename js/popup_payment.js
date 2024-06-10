function showPopup(paymentType, name, number) {
    document.getElementById('payment-title').innerText = paymentType;
    document.getElementById('name').value = name;
    document.getElementById('number').value = number;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function saveChanges() {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    alert(`Saved changes:\nName: ${name}\nNumber: ${number}`);
    closePopup();
}
