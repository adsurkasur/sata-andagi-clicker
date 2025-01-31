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
    var popup = document.getElementById('popup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
}

function closeDraggableBox() {
    var box = document.getElementById('draggableBox');
    box.style.display = 'none';
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
