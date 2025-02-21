// Function to scroll the carousel
     function scrollCarousel(direction) {
         const carousel = document.querySelector('.carousel');
         const scrollAmount = carousel.clientWidth;
         carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
     }
     // Function to request location permission
     function requestLocation() {
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(
                 (position) => {
                     alert(`Location: ${position.coords.latitude}, ${position.coords.longitude}`);
                 },
                 (error) => {
                     alert('Location permission denied.');
                 }
             );
         } else {
             alert('Geolocation is not supported by this browser.');
         }
     }
     // Function to initialize Google Translate
     function googleTranslateElementInit() {
         new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
     }
     // Function to toggle chat window
     function toggleChatWindow() {
         const chatWindow = document.getElementById('chatWindow');
         chatWindow.classList.toggle('open');
     }

  // Function to open the modal
function openModal() {
    document.getElementById('modal').classList.remove('hidden');
}

// Function to close the modal
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Function to get the user's location
document.getElementById('locationButton').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const location = `Latitude: ${lat}, Longitude: ${lon}`; // Can customize this format
            document.getElementById('location').value = location; // Set the location input field value
        }, function (error) {
            alert("Error getting location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Form submission (Optional - Handle form submission here)
document.getElementById('foundItemForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the usual way
    // Process form data (e.g., save, send to server)
    alert('Form Submitted!');
    closeModal(); // Close the modal after submission
});



let autocomplete;
let suggestionsContainer = document.getElementById("suggestionsContainer");

// Initialize the Google Places API Autocomplete
function initAutocomplete() {
    const input = document.getElementById("location");
    
    // Initialize the Autocomplete service
    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"], // You can modify this to include other location types
        componentRestrictions: { country: "IN" }, // Restrict to India, change as needed
        fields: ["address_components", "geometry", "name"]
    });

    autocomplete.addListener("place_changed", onPlaceChanged);
}

// Event handler when a place is selected
function onPlaceChanged() {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
        // If no geometry data, the place is invalid
        return;
    }

    const location = place.formatted_address;
    document.getElementById("location").value = location; // Set input to selected location
    suggestionsContainer.classList.add("hidden"); // Hide suggestions
}

// Function to get the user's real-time location using Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const geocoder = new google.maps.Geocoder();

            const latLng = new google.maps.LatLng(lat, lon);
            geocoder.geocode({ location: latLng }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        document.getElementById('location').value = results[0].formatted_address; // Set the location input field value
                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        }, function(error) {
            alert("Error getting location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to handle real-time location search input
function handleLocationInput() {
    const query = document.getElementById('location').value;
    if (query.length < 2) {
        suggestionsContainer.classList.add("hidden"); // Hide suggestions if input length is less than 2
        return;
    }

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query, types: ['(cities)'] }, displaySuggestions); // Get place predictions
}

// Function to display suggestions below the input field
function displaySuggestions(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
        suggestionsContainer.classList.add("hidden"); // Hide suggestions if no results
        return;
    }

    suggestionsContainer.innerHTML = ''; // Clear previous suggestions
    predictions.forEach(function(prediction) {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("p-2", "cursor-pointer", "hover:bg-gray-100", "rounded");
        suggestionItem.innerText = prediction.description;

        // Add click event listener to each suggestion
        suggestionItem.addEventListener('click', function() {
            document.getElementById('location').value = prediction.description; // Set input field value to selected suggestion
            suggestionsContainer.classList.add("hidden"); // Hide suggestions after selection
        });

        suggestionsContainer.appendChild(suggestionItem); // Append suggestion to the dropdown container
    });

    suggestionsContainer.classList.remove("hidden"); // Show suggestions dropdown
}

