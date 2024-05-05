window.onload = function() {
    const personalityTypes = [
        "INTJ", "INTP", "ENTJ", "ENTP",
        "INFJ", "INFP", "ENFJ", "ENFP",
        "ISTJ", "ISFJ", "ESTJ", "ESFJ",
        "ISTP", "ISFP", "ESTP", "ESFP"
    ];

    const buttonsContainer = document.getElementById('buttons');
    const gallery = document.getElementById('gallery');

    personalityTypes.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type;
        button.onclick = function() {
            gallery.innerHTML = ''; // Clear the gallery first for transition
            loadImagesForType(type);
        };
        buttonsContainer.appendChild(button);
    });

    function loadImagesForType(type) {
        const folderPath = `Types/${type}/`;
        fetch(`${folderPath}${type}.txt`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch names: ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                const names = text.split('\n');
                displayImagesAndNames(names, folderPath, type); // Pass type here
            })
            .catch(error => {
                console.error(error);
                displayImagesAndNames([], folderPath, type); // Pass type here
            });
    }

    function displayImagesAndNames(names, folderPath, type) { // Include type as a parameter
        let imagesLoaded = 0;
        const totalImages = 200; // Total number of images you expect in each folder

        for (let j = 1; j <= totalImages; j++) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container'); // For styling purposes
            const img = new Image();
            img.src = `${folderPath}${j}.jpg`;
            img.alt = `Image ${j} from ${type}`;
            img.style.opacity = '0'; // Start images as invisible
            img.style.transition = 'opacity 1s ease'; // Smooth transition for opacity

            const nameLabel = document.createElement('div'); // Div for the name
            nameLabel.textContent = names[j - 1] || 'Name unavailable'; // Use the corresponding name or a placeholder

            img.onload = function() {
                imagesLoaded++;
                img.style.opacity = '1'; // Set the opacity of the loaded image
                if (imagesLoaded === totalImages) {
                    gallery.style.opacity = '1'; // Make sure the gallery is visible after all images have loaded
                }
            };

            img.onerror = function() {
                imgContainer.style.display = 'none'; // Hide images that fail to load
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    gallery.style.opacity = '1'; // Make sure the gallery is visible even if some images failed
                }
            };

            imgContainer.appendChild(img);
            imgContainer.appendChild(nameLabel); // Append the name below the image
            gallery.appendChild(imgContainer);
        }
    }
};
