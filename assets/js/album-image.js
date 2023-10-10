   

        // Get a reference to the select element and image container
        const albumSelect = document.getElementById("album-select");
        const imageContainer = document.getElementById("image-gallery");

        // Define an object with image URLs for each album
        const albumImages = {
            album1: ['assets/images/A1-1.jpg', 'assets/images/A1-2.jpg', 'assets/images/A1-3.jpg','assets/images/A1-4.jpg','assets/images/A1-5.jpg','assets/images/A1-6.jpg'],
            album2: ['assets/images/A2-1.jpg', 'assets/images/A2-2.jpg', 'assets/images/A2-3.jpg'],
            album3: ['assets/images/A3-3.jpg',  'assets/images/A3-1.jpg','assets/images/A3-4.jpg'],
        };

        // Function to display an image in an enlarged view
        function displayEnlarged(imageUrl) {
            const enlargedContainer = document.getElementById("enlargedContainer");
            const enlargedImage = document.getElementById("enlargedImage");

            enlargedImage.src = imageUrl;
            enlargedContainer.style.display = "flex";

            // Close the enlarged view when clicking on it
            enlargedContainer.addEventListener("click", function () {
                enlargedContainer.style.display = "none";
            });
        }

        // Event listener for when the user selects an album
        albumSelect.addEventListener("change", function () {
            const selectedAlbum = albumSelect.value;
            const selectedImages = albumImages[selectedAlbum];

            // Clear the previous images
            imageContainer.innerHTML = "";

            // Display the images for the selected album
            selectedImages.forEach(imageUrl => {
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.alt = "Album Image";

                // Add a click event listener to the image for enlargement
                imgElement.addEventListener("click", function () {
                    displayEnlarged(imageUrl);
                });

                imageContainer.appendChild(imgElement);
            });
        });

        // Trigger the event initially to display images for the default selected album
        albumSelect.dispatchEvent(new Event("change"));



        