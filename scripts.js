let count = 0;
const messagesAndSounds = [
    { message: "omagaaa", sound: "sound1.mp3" },
    { message: "amerika ya", sound: "sound2.mp3" },
    { message: "halo", sound: "sound3.mp3" }
];

// Initial volume values
let masterVolume = 1;
let backgroundVolume = 0.3;
let buttonVolume = 0.3;
let messageVolume = 0.5;

// Function to play background music
function playBackgroundMusic() {
    var audio = document.getElementById('backgroundMusic');
    audio.play().catch(function(error) {
        console.log('Autoplay was prevented:', error);
    });
}

// Add event listeners for user interaction
['click', 'mouseover', 'keydown', 'touchstart'].forEach(event => {
    document.addEventListener(event, function() {
        playBackgroundMusic();
    }, { once: true });
});

function togglePopup() {
    var popup = document.getElementById('developerNotesPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
}

// Function to update all volumes based on controls
function updateVolumes() {
    masterVolume = document.getElementById('masterVolume').value;
    backgroundVolume = document.getElementById('backgroundVolume').value;
    buttonVolume = document.getElementById('buttonVolume').value;
    messageVolume = document.getElementById('messageVolume').value;

    // Update input values based on slider values
    document.getElementById('masterVolumeInput').value = (masterVolume * 100).toFixed();
    document.getElementById('backgroundVolumeInput').value = (backgroundVolume * 100).toFixed();
    document.getElementById('buttonVolumeInput').value = (buttonVolume * 100).toFixed();
    document.getElementById('messageVolumeInput').value = (messageVolume * 100).toFixed();

    // Set the background music volume
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = backgroundVolume * masterVolume;
}

// Debounce function for volume control
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Attach debounced volume update to sliders
document.getElementById('masterVolume').addEventListener('input', debounce(updateVolumes, 100));
document.getElementById('backgroundVolume').addEventListener('input', debounce(updateVolumes, 100));
document.getElementById('buttonVolume').addEventListener('input', debounce(updateVolumes, 100));
document.getElementById('messageVolume').addEventListener('input', debounce(updateVolumes, 100));

// Function to update volume from number input
function updateFromInput(sliderId) {
    const inputValue = document.getElementById(`${sliderId}Input`).value;
    const sliderValue = inputValue / 100;

    document.getElementById(sliderId).value = sliderValue;
    updateVolumes();
}

// Function to play a sound using HTML Audio
function playSound(soundFile, volume = 1) {
    const audio = new Audio(soundFile);
    audio.volume = volume * masterVolume;  // Adjust based on master volume
    audio.play();
}

// Function to play a message sound with boosted volume
function playMessageSound(soundFile, volume = 1) {
    const audio = new Audio(soundFile);
    audio.volume = volume * masterVolume * 2;  // Boost volume by 2 times
    audio.play();
}

// Randomly choose a GIF and set it as the source for the GIF image
function setRandomGif() {
    const gifArray = [
        "gif1.gif", "gif2.gif", "gif3.gif", "gif4.gif", "gif5.gif", "gif6.gif"
    ];

    const randomIndex = Math.floor(Math.random() * gifArray.length);
    const gifSrc = gifArray[randomIndex];

    // Set the source of the random GIF
    document.getElementById("randomGif").src = gifSrc;
}

// Call the setRandomGif function when the page loads
setRandomGif();

// Reset counter function
function resetCounter() {
    count = 0;
    document.getElementById("counter").innerText = count;
}

// Toggle music function
function toggleMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.innerText = "Pause Music";
    } else {
        backgroundMusic.pause();
        musicToggle.innerText = "Play Music";
    }
}

// Handle click function
function handleClick() {
    count++;
    document.getElementById("counter").innerText = count;
    playSound('click-sound.mp3', buttonVolume);

    if (count % 10 === 0) {
        const randomIndex = Math.floor(Math.random() * messagesAndSounds.length);
        const { message, sound } = messagesAndSounds[randomIndex];

        const messageElement = document.createElement("p");
        messageElement.classList.add("message");
        messageElement.innerText = message;

        const randomX = Math.random() * (window.innerWidth - 200);
        const randomY = Math.random() * (window.innerHeight - 100);
        messageElement.style.left = `${randomX}px`;
        messageElement.style.top = `${randomY}px`;

        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.style.opacity = 1;
            messageElement.style.transform = "translateY(-50px)"; // Float upwards
        }, 100);

        setTimeout(() => {
            messageElement.style.opacity = 0;
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 1000);
        }, 2000);

        playMessageSound(sound, messageVolume);
    }
}

// Function to initialize the page
function initializePage() {
    document.getElementById("loadingScreen").style.display = "flex";
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play().catch(function(error) {
        console.log('Autoplay was prevented:', error);
    });
    document.getElementById('continueButton').style.display = 'block'; // Show continue button
    document.querySelector("#loadingScreen p").innerText = "Loading finished!"; // Update loading text

    const developerNotesPopup = document.createElement('div');
    developerNotesPopup.id = 'developerNotesPopup';
    developerNotesPopup.className = 'popup';
    developerNotesPopup.innerHTML = `
        <button class="close-developer-notes" onclick="toggleDeveloperNotesPopup()">X</button>
        <p>I wonder if the amounts of clicks here can be converted into $SANDAGI. By the way this website is created by adsurkasur.</p>
    `;
    document.body.appendChild(developerNotesPopup);

    // Automatically hide loading screen after 5 seconds
    setTimeout(hideLoadingScreen, 5000);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = 0; // Fade out
    setTimeout(() => {
        loadingScreen.style.display = "none"; // Hide after fade out
    }, 500); // Match the transition duration
}

function hideGif() {
    document.getElementById("randomGif").style.display = "none";
    document.querySelector(".hide-gif-button").style.display = "none";
}

function toggleVolumeControl() {
    const volumeControlContainer = document.getElementById('volumeControlContainer');
    if (volumeControlContainer.style.display === 'none' || volumeControlContainer.style.display === '') {
        volumeControlContainer.style.display = 'block';
    } else {
        volumeControlContainer.style.display = 'none';
    }
}

function toggleDeveloperNotesPopup() {
    const popup = document.getElementById('developerNotesPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
}
