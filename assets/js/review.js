document.addEventListener("DOMContentLoaded", function () {
    const albumSelect = document.getElementById("album-select");
    const approvedImages = document.getElementById("approved-images");
    const deniedImages = document.getElementById("denied-images");
    const pendingImages = document.getElementById("pending-images");
    const approveBtn = document.getElementById("approve-btn");
    const denyBtn = document.getElementById("deny-btn");
    const pendingBtn = document.getElementById("pending-btn");

    const buttons = [approveBtn, denyBtn, pendingBtn];

    const albums = {
        album1: {
            approved: [
                { src: "assets/images/A1-1.jpg", alt: "Image 1" },
                { src: "assets/images/A1-2.jpg", alt: "Image 2" },
                { src: "assets/images/A1-3.jpg", alt: "Image 2" },
                { src: "assets/images/A1-4.jpg", alt: "Image 2" },
                { src: "assets/images/A1-5.jpg", alt: "Image 2" },
                // Add more images here
            ],
            denied: [
                { src: "assets/images/top-game-01.jpg", alt: "Image 3" },
                { src: "assets/images/top-game-03.jpg", alt: "Image 3" },
                
                // Add more images here
            ],
            pending: [
                { src: "assets/images/top-game-02.jpg", alt: "Image 3" },
            ]
        },
        album2: {
            approved: [
                { src: "assets/images/A2-1.jpg", alt: "Image 1" },
                { src: "assets/images/A2-2.jpg", alt: "Image 2" },
                { src: "assets/images/A2-3.jpg", alt: "Image 2" },
               
            ],
            denied: [
                { src: "assets/images/trending-01.jpg", alt: "Image 3" },
                { src: "assets/images/trending-02.jpg", alt: "Image 3" },
                { src: "assets/images/trending-03.jpg", alt: "Image 3" },
                // Add more images here
            ],
            pending: [
                { src: "assets/images/trending-04.jpg", alt: "Image 4" },
               
                // Add more images here
            ]
        },
        album3: {
            approved: [
                { src: "assets/images/A3-1.jpg", alt: "Image 1" },
                { src: "assets/images/A3-2.jpg", alt: "Image 2" },
                { src: "assets/images/A3-3.jpg", alt: "Image 2" },
                { src: "assets/images/A3-4.jpg", alt: "Image 2" },
                
                // Add more images here
            ],
            denied: [
                { src: "assets/images/categories-01.jpg", alt: "Image 3" },
                { src: "assets/images/categories-02.jpg", alt: "Image 3" },
                { src: "assets/images/categories-03.jpg", alt: "Image 3" },
                // Add more images here
            ],
            pending: [
                { src: "assets/images/categories-04.jpg", alt: "Image 4" },
                { src: "assets/images/categories-05.jpg", alt: "Image 5" },
                // Add more images here
            ]
        }
    };

    let currentAlbum = "album1"; // Default to the first album
    let currentStatus = "approved"; // Default to the "approved" status

    function displayImages(album, status) {
        const imagesContainer = {
            approved: approvedImages,
            denied: deniedImages,
            pending: pendingImages
        };
        const images = albums[album][status];
        // Hide all containers except the one for the current status
        for (const containerStatus in imagesContainer) {
            if (containerStatus === status) {
                imagesContainer[containerStatus].style.display = "block";
            } else {
                imagesContainer[containerStatus].style.display = "none";
            }
        }
        if (images && images.length > 0) {
            imagesContainer[status].innerHTML = images.map((image, index) => `
                <div class="modal-box1">
                    <img src="${image.src}" alt="${image.alt}">
                    ${getButtonsForStatus(status)}
                </div>
            `).join("");
        } else {
            imagesContainer[status].innerHTML = ""; // No matching images found for the selected status
        }
    }

    function getButtonsForStatus(status) {
        switch (status) {
            case "approved":
                return `
                    <button class="edit-button">Pending Approver</button>
                    <button class="delete-button">Denied</button>
                `;
            case "denied":
                return `
                    <button class="edit-button">Approve</button>
                    <button class="delete-button">Pending Approver</button>
                `;
            case "pending":
                return `
                    <button class="edit-button">Approve</button>
                    <button class="delete-button">Denied</button>
                `;
            default:
                return ""; // No buttons for unknown status
        }
    }

    function animateButton(btn, status) {
        btn.addEventListener("click", function () {
            // Remove "active" class from all buttons
            buttons.forEach(button => button.classList.remove("active"));

            btn.classList.add("active"); // Add "active" class to the clicked button
            currentStatus = status;
            displayImages(currentAlbum, currentStatus);
        });
    }

    albumSelect.addEventListener("change", function () {
        currentAlbum = albumSelect.value;
        displayImages(currentAlbum, currentStatus);
    });

    animateButton(approveBtn, "approved");
    animateButton(denyBtn, "denied");
    animateButton(pendingBtn, "pending");

    // Attach click event listeners for opening the modal
    attachModalOpenListeners(approvedImages, "approved");
    attachModalOpenListeners(deniedImages, "denied");
    attachModalOpenListeners(pendingImages, "pending");

    // Initial display of images
    displayImages(currentAlbum, currentStatus);
});

// Function to open the modal with an image and status
function openModal(imageSrc, status) {
    const modal = document.getElementById("myModal");
    const enlargedImage = document.getElementById("enlargedImage");
    enlargedImage.src = imageSrc;
    modal.style.display = "block";

    // Add logic here to handle the status (e.g., display status-specific buttons)
    // You can use the "status" parameter to determine the image's status.
    // For example, you can show different buttons based on the status.
}

// Function to attach click event listeners for opening the modal
function attachModalOpenListeners(imagesContainer, status) {
    imagesContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "IMG") {
            openModal(e.target.src, status);
        }
    });
}

// Close the modal when the close button is clicked
document.querySelector(".close").addEventListener("click", function () {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});

// Close the modal when the user clicks outside of it
window.addEventListener("click", function (e) {
    const modal = document.getElementById("myModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


