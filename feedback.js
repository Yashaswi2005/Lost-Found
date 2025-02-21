
            function selectEmoji(emoji) {    
                const emojis = document.querySelectorAll('.emoji');
                emojis.forEach(e => e.classList.remove('selected'));
                emoji.classList.add('selected');
            }
    

            document.getElementById("signupForm").addEventListener("submit", function(event) {
                event.preventDefault(); // Prevent form submission and page reload
                
                // Get form field values
                const username = document.querySelector("input[name='username']").value;
                const email = document.querySelector("input[name='email']").value;
                const password = document.querySelector("input[name='password']").value;
                
                // Validate that all fields are filled
                if (username && email && password) {
                    // Redirect to main.html after successful form submission
                    window.location.href = "main.html"; // Redirect to main.html
                } else {
                    alert("Please fill in all the fields!"); // Alert if any field is empty
                }
            });
            