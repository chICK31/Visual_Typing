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

    const baseUrl = 'https://chick31.github.io/Visual_Typing/'; // Base URL for local development
    const buttonsContainer = document.getElementById('buttons');
    const gallery = document.getElementById('gallery');

    // Create links for categories
    Object.keys(categories).forEach(category => {
        const link = document.createElement('a');
        link.className = 'button';
        link.textContent = category;
        link.href = `${baseUrl + category}`;
        link.onclick = function(event) {
            event.preventDefault(); // Prevent default link behavior
            history.pushState({ path: this.path }, '', this.href);
            gallery.innerHTML = '';
            categories[category].forEach(loadImagesForType);
        };
        buttonsContainer.appendChild(link);
    });

    // Create links for individual types
    personalityTypes.forEach(type => {
        const link = document.createElement('a');
        link.className = 'button';
        link.textContent = type;
        link.href = `${baseUrl + type}`;
        link.onclick = function(event) {
            event.preventDefault(); // Prevent default link behavior
            history.pushState({ path: this.path }, '', this.href);
            gallery.innerHTML = '';
            loadImagesForType(type);
        };
        buttonsContainer.appendChild(link);
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
        gallery.innerHTML = '';  // Clear the gallery before adding new images
        gallery.style.opacity = '0';  // Start with gallery invisible
    
        let imagesLoaded = 0;  // To track how many images have successfully loaded
    
        names.forEach((name, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            const img = new Image();
            img.src = `${folderPath}${index + 1}.jpg`;
            img.alt = `Image ${index + 1} from ${type}`;
    
            img.onload = () => {
                imagesLoaded++;
                const nameLabel = document.createElement('div');
                nameLabel.textContent = name || 'Name unavailable';
                imgContainer.appendChild(img);
                imgContainer.appendChild(nameLabel);
                gallery.appendChild(imgContainer);  // Append only after image is loaded
    
                // Check if it's the first image to load and then set a timeout to change the opacity of the gallery
                if (imagesLoaded === 1) {
                    setTimeout(() => {
                        gallery.style.opacity = '1';  // Fade in the gallery after a brief delay
                    }, 100);  // 100 milliseconds delay
                }
            };
    
            img.onerror = () => {
                console.error('Failed to load image:', img.src);
                imgContainer.style.display = 'none';  // Optionally handle error visibility
            };
        });
    }
    
    

    
}
