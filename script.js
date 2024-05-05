window.onload = function() {
    const categories = {
        'Body Temple': ["INTP", "ENTJ", "ISFP", "ESFJ"],
        'Mind Temple': ["ISTP", "ESTJ", "INFP", "ENFJ"],
        'Soul Temple': ["ISTJ", "ESTP", "INFJ", "ENFP"],
        'Heart Temple': ["ENTP", "INTJ", "ESFP", "ISFJ"],
        'Crusaders': ["ENTP", "INTP", "ESFJ", "ISFJ"],
        'Wayfarers': ["ENTJ", "INTJ", "ESFP", "ISFP"],
        'Templars': ["ESTP", "INFJ", "ENFJ", "ISTP"],
        'Philosophers': ["ESTJ", "INFP", "ENFP", "ISTJ"]
    };

    const personalityTypes = [
        "ESTJ", "ESTP", "ENTJ", "ENFJ",
        "ESFJ", "ESFP", "ENTP", "ENFP",
        "ISTJ", "ISTP", "INTJ", "INFJ",
        "ISFJ", "ISFP", "INTP", "INFP"
    ];

    const baseUrl = 'https://chick31.github.io/Visual_Typing/'; // Adjust this to your GitHub Pages URL
    const buttonsContainer = document.getElementById('buttons');
    const gallery = document.getElementById('gallery');

    // Create buttons
    [...Object.keys(categories), ...personalityTypes].forEach(type => {
        const button = document.createElement('button');
        button.textContent = type;
        button.onclick = function() {
            history.pushState({ path: this.path }, '', baseUrl + type);
            gallery.innerHTML = ''; // Clear the gallery
            loadImagesForType(type);
        };
        buttonsContainer.appendChild(button);
    });

    function loadImagesForType(type) {
        const folderPath = `Types/${type}/`;
        fetch(`${folderPath}${type}.txt`)
            .then(response => response.text())
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
        let imagesLoaded = 0;
        const totalImages = names.length; // Use the actual number of names if known or another logic to determine count

        for (let j = 1; j <= totalImages; j++) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            const img = new Image();
            img.src = `${folderPath}${j}.jpg`;
            img.alt = `Image ${j} from ${type}`;
            img.style.opacity = '0';
            img.style.transition = 'opacity 1s ease';

            const nameLabel = document.createElement('div');
            nameLabel.textContent = names[j - 1] || 'Name unavailable';

            img.onload = () => {
                imagesLoaded++;
                img.style.opacity = '1';
                if (imagesLoaded === totalImages) {
                    gallery.style.opacity = '1';
                }
            };

            img.onerror = () => {
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
};
