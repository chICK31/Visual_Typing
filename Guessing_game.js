let currentType = '';  // This will store the type of the current image being guessed
const types = ['INTJ', 'ENTJ', 'INTP', 'ENTP', 'INFJ', 'ENFJ', 'INFP', 'ENFP', 'ISTJ', 'ESTJ', 'ISFJ', 'ESFJ', 'ISTP', 'ESTP', 'ISFP', 'ESFP'];
const basePath = 'Types/';

async function getRandomImage() {
        const type = types[Math.floor(Math.random() * types.length)];
        const path = `${basePath}${type}/${type}.txt`;
        try {
            const response = await fetch(path);
            const textContent = await response.text();
            const lines = textContent.trim().split(/\r\n|\n/); // Split the content into lines
            const maxNumber = lines.length; // Count the lines to determine the number of images available
            if (maxNumber === 0) {
                throw new Error("No lines found in the .txt file, ensure it's formatted correctly");
            }
            const number = Math.floor(Math.random() * maxNumber) + 1; // Generate numbers from 1 to maxNumber
            const imagePath = `${basePath}${type}/${number}.jpg`;
            currentType = type; // Save the current type being displayed
            document.getElementById('personImage').src = imagePath;
        } catch (error) {
            console.error('Failed to fetch or parse the line count:', error);
            document.getElementById('personImage').src = 'path/to/default/image.jpg'; // Fallback image path if an error occurs
        }
    }
    
    

    function selectType(type) {
        selectedType = type; // This is the type guessed by the user
    
        // Remove 'selected' class from all buttons
        const buttons = document.querySelectorAll('.button-glow');
        buttons.forEach(button => {
            button.classList.remove('selected');
        });
    
        // Add 'selected' class to the clicked button
        event.target.classList.add('selected');
    }
    
    let selectedType = '';  // This variable will store the guessed type by the user

    function submitGuess() {
        const guessedType = selectedType; // Type guessed by the user
        // Update resultText to include both the guessed type and the correct type when the guess is wrong
        const resultText = guessedType === currentType
            ? `<h1>Right Answer!</h1> <span style="color: green;">${currentType}</span>.`
            : `<h1>Wrong Answer.</h1> <span style="color: red;">${guessedType}</span> <span style="color: green;">${currentType}</span>.`;
        
        document.getElementById('game-message').innerHTML = resultText; // Use innerHTML to render HTML inside
        document.getElementById('overlay').style.display = 'flex'; // Show the overlay
        document.getElementById('game-message').style.transform = 'scale(1)'; // Trigger the pop-in effect
        
        // Reset the guessed type and the selected state of the button
        selectedType = '';
        resetButtonStates();
        
        getRandomImage(); // Load a new image for the next round after checking the guess
    }
    
    
    
    function resetButtonStates() {
        const buttons = document.querySelectorAll('.button-glow');
        buttons.forEach(button => {
            button.classList.remove('selected');
        });
    }
    
    
    
    
    function closeOverlay() {
        document.getElementById('overlay').style.display = 'none'; // Hide the overlay
        document.getElementById('game-message').style.transform = 'scale(0)'; // Reset scale for next time
    }
    
    

document.addEventListener('DOMContentLoaded', getRandomImage);
