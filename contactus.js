document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
        const cardName = card.querySelector('h2').textContent; // Getting name on card
        alert('You clicked on the card of ' + cardName + '!');
    });
});
