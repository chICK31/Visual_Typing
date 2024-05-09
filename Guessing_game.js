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
    
    function submitGuess() {
        const guessedType = selectedType; // Type guessed by the user
        const resultText = (guessedType === currentType) ? "Good job!" : "Better luck next time!"; // Compare against currentType
        document.getElementById('game-message').textContent = resultText;
        document.getElementById('overlay').style.display = 'flex'; // Show the overlay
        document.getElementById('game-message').style.transform = 'scale(1)'; // Trigger the pop-in effect
        getRandomImage(); // Load a new image for the next round after checking the guess
    }
    
    function closeOverlay() {
        document.getElementById('overlay').style.display = 'none'; // Hide the overlay
        document.getElementById('game-message').style.transform = 'scale(0)'; // Reset scale for next time
    }
    
    

document.addEventListener('DOMContentLoaded', getRandomImage);
