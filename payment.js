function showPopup() {
    // Get the entered email
    let email = document.querySelector('input[type="email"]').value;

    // Check if an email is entered
    if (email.trim() === "") {
        alert("Please enter your email before submitting.");
        return;
    }

    // Insert email into the modal
    document.getElementById("userEmail").innerText = email;

    // Show the popup modal
    document.getElementById("popupModal").classList.remove("hidden");
}

function closePopup() {
    // Hide the popup modal
    document.getElementById("popupModal").classList.add("hidden");
}
