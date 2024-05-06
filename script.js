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
        "INTJ", "INTP", "ENTJ", "ENTP",
        "INFJ", "INFP", "ENFJ", "ENFP",
        "ISTJ", "ISFJ", "ESTJ", "ESFJ",
        "ISTP", "ISFP", "ESTP", "ESFP"
    ];

    const buttonsContainer = document.getElementById('buttons');
    const gallery = document.getElementById('gallery');

    // Create category buttons using document fragment
    const fragment = document.createDocumentFragment();
    Object.keys(categories).concat(personalityTypes).forEach(type => {
        const button = document.createElement('button');
        button.textContent = type;
        fragment.appendChild(button);
    });
    buttonsContainer.appendChild(fragment);

    // Event delegation for buttons
    buttonsContainer.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const type = target.textContent;
            gallery.innerHTML = '';
            if (categories[type]) {
                categories[type].forEach(loadImagesForType);
            } else {
                loadImagesForType(type);
            }
        }
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
                displayImagesAndNames(names, folderPath, type);
            })
            .catch(error => {
                console.error(error);
                displayImagesAndNames([], folderPath, type);
            });
    }

    function displayImagesAndNames(names, folderPath, type) {
        const totalImages = names.length; // Dynamic number of images
        names.forEach((name, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');

            const img = new Image();
            img.src = `${folderPath}${index + 1}.jpg`;
            img.alt = `Image ${index + 1} from ${type}`;
            img.style.opacity = '0';
            img.style.transition = 'opacity 1s ease';

            const nameLabel = document.createElement('div');
            nameLabel.textContent = name || 'Name unavailable';

            img.onload = img.onerror = function() {
                img.style.opacity = '1'; // Set opacity on load or error
                imgContainer.style.display = img.complete && img.naturalHeight !== 0 ? 'block' : 'none'; // Hide on error
                gallery.appendChild(imgContainer);
            };

            imgContainer.appendChild(img);
            imgContainer.appendChild(nameLabel);
        });
    }
};
