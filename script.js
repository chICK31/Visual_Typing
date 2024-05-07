window.onload = function() {
    const types = document.body.getAttribute('data-types').split(','); // Get types from HTML data attribute, split by comma
    types.forEach(type => {
        const typeTrimmed = type.trim();
        const folderPath = `Types/${typeTrimmed}/`;
        const galleryId = `gallery-${typeTrimmed}`;
        const gallery = document.getElementById(galleryId);

        function loadImagesForType(type) {
            fetch(`${folderPath}${type}.txt`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch names: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(text => {
                    const names = text.split('\n');
                    displayImagesAndNames(names, folderPath, type);
                })
                .catch(error => {
                    console.error(error);
                    displayImagesAndNames([], folderPath, type);
                });
        }

        function displayImagesAndNames(names, folderPath, type) {
            gallery.innerHTML = ''; // Clear previous images
            let imagesLoaded = 0;
            const totalImages = names.length;

            for (let j = 1; j <= totalImages; j++) {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');

                const img = new Image();
                img.src = `${folderPath}${j}.jpg`;
                img.alt = `Image ${j} of type ${type}`;

                const nameLabel = document.createElement('div');
                nameLabel.textContent = names[j - 1] || 'Name unavailable';

                img.onload = function() {
                    imagesLoaded++;
                    img.style.opacity = '1';
                    if (imagesLoaded === totalImages) {
                        gallery.style.opacity = '1';
                    }
                };

                img.onerror = function() {
                    imgContainer.style.display = 'none';
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        gallery.style.opacity = '1';
                    }
                };

                imgContainer.appendChild(img);
                imgContainer.appendChild(nameLabel);
                gallery.appendChild(imgContainer);
            }
        }

        loadImagesForType(typeTrimmed);
    });
};
