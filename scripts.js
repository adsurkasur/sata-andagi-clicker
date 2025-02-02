let count = 0;
const messagesAndSounds = [
    { message: "omaigaaa", sound: "sound1.mp3" },
    { message: "amerika yaa", sound: "sound2.mp3" },
    { message: "haloo", sound: "sound3.mp3" }
];

// Initial volume values
let masterVolume = 1;
let backgroundVolume = 0.5;
let buttonVolume = 0.7;
let otherVolume = 1;

let clickMeCount = 0;

function handleClickText() {
    clickMeCount++;
    console.log(`Click me! clicked ${clickMeCount} times`);
    if (clickMeCount === 3) {
        document.querySelector('.click-text').innerText = "Hey, the button is above me!";
    }
    if (clickMeCount === 5) {
        document.querySelector('.click-text').innerText = "I'm sick of this";
    }
    if (clickMeCount === 7) {
        stopAllAudio();
        showFunOverlay();
    }
}

function stopAllAudio() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

function moveTextRandomly() {
    const textElement = document.querySelector('#funOverlay a');
    const maxX = window.innerWidth - textElement.offsetWidth;
    const maxY = window.innerHeight - textElement.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    textElement.style.position = 'absolute';
    textElement.style.left = `${randomX}px`;
    textElement.style.top = `${randomY}px`;
}

function showFunOverlay() {
    // Remove all elements from the body
    document.body.innerHTML = '';

    // Set the background to solid black
    document.body.style.backgroundColor = 'black';

    const overlay = document.createElement('div');
    overlay.id = 'funOverlay';
    overlay.className = 'fun-overlay';
    overlay.innerHTML = `
        <a href="https://example.com" target="_blank" style="position: absolute; top: 10px; left: 10px; color:rgb(40, 40, 40); text-decoration: none;">aSdtIHNpY2sgb2Ygc2F0YSBhbmRhZ2ku</a>
        <img src="fun.gif" class="fun-gif">
        <audio id="funAudio" src="fun.mp3" loop autoplay></audio>
    `;
    document.body.appendChild(overlay);

    setInterval(moveTextRandomly, 1000); // Move text every 1 second
}

// Attach the handleClickText function to the click event of the "Click me!" text
document.querySelector('.click-text').addEventListener('click', handleClickText);

// Remove the duplicate event listener for the "Click me!" text
document.querySelector('.click-text').removeEventListener('click', handleClickText);

// Function to play background music
function playBackgroundMusic() {
    var audio = document.getElementById('backgroundMusic');
    audio.play().catch(function(error) {
        console.log('Autoplay was prevented:', error);
    });
}

// Function to handle touch events for buttons
function handleTouchStart(event) {
    event.target.classList.add('active');
}

function handleTouchEnd(event) {
    event.target.classList.remove('active');
}

// Attach touch event listeners to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('touchstart', handleTouchStart);
    button.addEventListener('touchend', handleTouchEnd);
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
    otherVolume = document.getElementById('otherVolume').value;

    // Update input values based on slider values
    document.getElementById('masterVolumeInput').value = (masterVolume * 100).toFixed();
    document.getElementById('backgroundVolumeInput').value = (backgroundVolume * 100).toFixed();
    document.getElementById('buttonVolumeInput').value = (buttonVolume * 100).toFixed();
    document.getElementById('otherVolumeInput').value = (otherVolume * 100).toFixed();

    // Set the background music volume
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = backgroundVolume * masterVolume;

    saveVolumeLevels(); // Save the volume levels
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
document.getElementById('otherVolume').addEventListener('input', debounce(updateVolumes, 100));

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
    saveClickCount(); // Save the click count
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
    saveMusicState(); // Save the music state
}

// Function to create confetti
function createConfetti() {
    const confettiCount = 25;
    const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#00f', '#f00'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.setProperty('--i', i);
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
    }
}

// Function to play confetti sound
function playConfettiSound() {
    playSound('confetti.mp3', otherVolume);
}

// Handle click function
function handleClick() {
    count++;
    document.getElementById("counter").innerText = count;
    saveClickCount(); // Save the click count
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

        playSound(sound, otherVolume);
    }

    if (count % 50 === 0) {
        createConfetti();
        playConfettiSound();
    }
}

// Function to toggle the "credits" popup
function toggleCreditsPopup() {
    var popup = document.getElementById('creditsPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    if (popup.style.display === 'block') {
        bringToFront(popup);
    }
}

// Function to toggle the "to-do list" popup
function toggleTodoListPopup() {
    var popup = document.getElementById('todoListPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    if (popup.style.display === 'block') {
        bringToFront(popup);
    }
}

// Function to initialize the page
function initializePage() {
    document.getElementById("loadingScreen").style.display = "flex";

    // Check if the user is on a mobile device
    if (window.innerWidth <= 768) {
        // Disable sound playback on mobile view
        document.getElementById('backgroundMusic').remove();
        document.querySelectorAll('audio').forEach(audio => audio.remove());

        // Show mobile overlay and prevent any interactions on mobile view
        document.getElementById('mobileOverlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';
        document.getElementById('mobileOverlay').style.pointerEvents = 'all';
    } else {
        // Hide mobile overlay on desktop view
        document.getElementById('mobileOverlay').style.display = 'none';
    }

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

    const creditsPopup = document.createElement('div');
    creditsPopup.id = 'creditsPopup';
    creditsPopup.className = 'popup';
    creditsPopup.innerHTML = `
        <button class="close-credits" onclick="toggleCreditsPopup()">X</button>
        <p>Credits to all contributors and supporters of this project. Sata Andagi Wallpaper by dluu13. River Twygs bed © Nintendo. Azumanga Daioh by Kiyohiko Azuma, MediaWorks, and Shogakukan.</p>
    `;
    document.body.appendChild(creditsPopup);

    const todoListPopup = document.createElement('div');
    todoListPopup.id = 'todoListPopup';
    todoListPopup.className = 'popup';
    todoListPopup.innerHTML = `
        <button class="close-todo-list" onclick="toggleTodoListPopup()">X</button>
        <p>let's be friends!</p>
    `;
    document.body.appendChild(todoListPopup);

    // Ensure the draggable box starts at the correct position
    const rect = box.getBoundingClientRect();
    if (rect.top < headerBar.offsetHeight || rect.left < 0) {
        box.style.left = "20px";
        box.style.top = headerBar.offsetHeight + 20 + "px"; // Spawn below the header bar
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = 0; // Fade out
    setTimeout(() => {
        loadingScreen.style.display = "none"; // Hide after fade out
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = backgroundVolume * masterVolume; // Set volume based on sliders
    }, 500); // Match the transition duration
}

// Add event listener to "Continue" button to play background music
document.getElementById('continueButton').addEventListener('click', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const savedMusicState = localStorage.getItem('musicState');
    if (savedMusicState !== 'paused') {
        backgroundMusic.play();
    }
});

// Ensure the draggable box starts at the correct position on page load
window.addEventListener('load', () => {
    loadClickCount(); // Load the click count
    loadVolumeLevels(); // Load the volume levels
    loadMusicState(); // Load the music state
    initializePage();
    const rect = box.getBoundingClientRect();
    if (rect.top < headerBar.offsetHeight || rect.left < 0) {
        box.style.left = "20px";
        box.style.top = headerBar.offsetHeight + 20 + "px"; // Spawn below the header bar
    }
});

function hideGif() {
    document.getElementById("randomGif").style.display = "none";
    document.querySelector(".hide-gif-button").style.display = "none";
}

function toggleVolumeControl() {
    const volumeControlContainer = document.getElementById('volumeControlContainer');
    if (volumeControlContainer.style.display === 'none' || volumeControlContainer.style.display === '') {
        volumeControlContainer.style.display = 'block';
        // Reset position to center
        volumeControlContainer.style.top = '50%';
        volumeControlContainer.style.left = '50%';
        volumeControlContainer.style.transform = 'translate(-50%, -50%)';
    } else {
        volumeControlContainer.style.display = 'none';
    }
}

function toggleDeveloperNotesPopup() {
    const popup = document.getElementById('developerNotesPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    if (popup.style.display === 'block') {
        bringToFront(popup);
    }
}

// Function to close the draggable box
function closeDraggableBox() {
    document.getElementById("draggableBox").style.display = "none";
}

// Draggable box setup (Disable physics on touch input)
let box = document.getElementById("draggableBox");
let headerBar = document.querySelector(".header-bar");
let runningText = document.querySelector(".running-text");
let isDragging = false;
let offsetX = 0, offsetY = 0;
let velocityX = 0, velocityY = 0;
let friction = 0.95;  // Friction to slow down the box

// Handle mouse down event for dragging
box.addEventListener("mousedown", function (event) {
    isDragging = true;
    offsetX = event.clientX - box.offsetLeft;
    offsetY = event.clientY - box.offsetTop;
    box.style.cursor = "grabbing";
    velocityX = 0;  // Reset velocity when starting to drag
    velocityY = 0;
});

// Handle mouse move event for dragging
document.addEventListener("mousemove", function (event) {
    if (isDragging) {
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        // Ensure the box stays within screen boundaries
        const minX = 0;
        const maxX = window.innerWidth - box.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0); // 17px for scrollbar width if visible
        const minY = headerBar.offsetHeight; // Collide with the header bar
        const maxY = window.innerHeight - box.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight; // 17px for scrollbar height if visible and running text height

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        box.style.left = newX + "px";
        box.style.top = newY + "px";

        // Update velocity based on pointer speed
        velocityX = event.movementX;
        velocityY = event.movementY;
    }
});

// Handle mouse up event to stop dragging
document.addEventListener("mouseup", function () {
    isDragging = false;
    box.style.cursor = "grab";
});

// Handle touch start event for dragging (Disable physics)
box.addEventListener("touchstart", function (event) {
    isDragging = true;
    const touch = event.touches[0];
    offsetX = touch.clientX - box.offsetLeft;
    offsetY = touch.clientY - box.offsetTop;
    box.style.cursor = "grabbing";
    document.body.style.overflow = 'hidden'; // Disable scrolling
});

// Handle touch move event for dragging (Disable physics)
document.addEventListener("touchmove", function (event) {
    if (isDragging) {
        const touch = event.touches[0];
        let newX = touch.clientX - offsetX;
        let newY = touch.clientY - offsetY;

        // Ensure the box stays within screen boundaries
        const minX = 0;
        const maxX = window.innerWidth - box.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0); // 17px for scrollbar width if visible
        const minY = headerBar.offsetHeight; // Collide with the header bar
        const maxY = window.innerHeight - box.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight; // 17px for scrollbar height if visible and running text height

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        box.style.left = newX + "px";
        box.style.top = newY + "px";
    }
});

// Handle touch end event to stop dragging (Disable physics)
document.addEventListener("touchend", function () {
    isDragging = false;
    box.style.cursor = "grab";
    document.body.style.overflow = 'auto'; // Enable scrolling
});

// Start the animation loop for velocity and friction
function update() {
    if (!isDragging) {
        velocityX *= friction;  // Apply friction
        velocityY *= friction;

        // Update box position with velocity
        let newX = box.offsetLeft + velocityX;
        let newY = box.offsetTop + velocityY;

        // Prevent box from going beyond screen edges
        const minX = 0;
        const maxX = window.innerWidth - box.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0); // 17px for scrollbar width if visible
        const minY = headerBar.offsetHeight; // Collide with the header bar
        const maxY = window.innerHeight - box.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight; // 17px for scrollbar height if visible and running text height

        if (newX < minX || newX > maxX) {
            velocityX = -velocityX;  // Reverse velocity on collision
            newX = Math.max(minX, Math.min(newX, maxX));  // Keep the box within bounds
        }
        if (newY < minY || newY > maxY) {
            velocityY = -velocityY;
            newY = Math.max(minY, Math.min(newY, maxY));
        }

        box.style.left = newX + "px";
        box.style.top = newY + "px";
    }

    requestAnimationFrame(update);  // Loop the animation
}

update();  // Start the animation loop

let zIndexCounter = 1005; // Initial z-index for popups

function bringToFront(popup) {
    zIndexCounter++;
    popup.style.zIndex = zIndexCounter;
}

function toggleDeveloperNotesPopup() {
    const popup = document.getElementById('developerNotesPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    if (popup.style.display === 'block') {
        bringToFront(popup);
    }
}

function toggleCreditsPopup() {
    const popup = document.getElementById('creditsPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    if (popup.style.display === 'block') {
        bringToFront(popup);
    }
}

function toggleTodoListPopup() {
    const popup = document.getElementById('todoListPopup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    if (popup.style.display === 'block') {
        bringToFront(popup);
    }
}

// Function to make an element draggable with physics
function makeDraggable(element) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    let velocityX = 0, velocityY = 0;
    const friction = 0.95;

    element.addEventListener("mousedown", function (event) {
        isDragging = true;
        offsetX = event.clientX - element.offsetLeft;
        offsetY = event.clientY - element.offsetTop;
        element.style.cursor = "grabbing";
        velocityX = 0;
        velocityY = 0;
    });

    document.addEventListener("mousemove", function (event) {
        if (isDragging) {
            let newX = event.clientX - offsetX;
            let newY = event.clientY - offsetY;

            const minX = 0;
            const maxX = window.innerWidth - element.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
            const minY = headerBar.offsetHeight;
            const maxY = window.innerHeight - element.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            element.style.left = newX + "px";
            element.style.top = newY + "px";

            velocityX = event.movementX;
            velocityY = event.movementY;
        }
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        element.style.cursor = "grab";
    });
    
    element.addEventListener("touchstart", function (event) {
        isDragging = true;
        const touch = event.touches[0];
        offsetX = touch.clientX - element.offsetLeft;
        offsetY = touch.clientY - element.offsetTop;
        element.style.cursor = "grabbing";
        document.body.style.overflow = 'hidden';
    });
    
    document.addEventListener("touchmove", function (event) {
        if (isDragging) {
            const touch = event.touches[0];
            let newX = touch.clientX - offsetX;
            let newY = touch.clientY - offsetY;
    
            const minX = 0;
            const maxX = window.innerWidth - element.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
            const minY = headerBar.offsetHeight;
            const maxY = window.innerHeight - element.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;
    
            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));
    
            element.style.left = newX + "px";
            element.style.top = newY + "px";
        }
    });
    
    document.addEventListener("touchend", function () {
        isDragging = false;
        element.style.cursor = "grab";
        document.body.style.overflow = 'auto';
    });
    

    function update() {
        if (!isDragging) {
            velocityX *= friction;
            velocityY *= friction;

            let newX = element.offsetLeft + velocityX;
            let newY = element.offsetTop + velocityY;

            const minX = 0;
            const maxX = window.innerWidth - element.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
            const minY = headerBar.offsetHeight;
            const maxY = window.innerHeight - element.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;

            if (newX < minX || newX > maxX) {
                velocityX = -velocityX;
                newX = Math.max(minX, Math.min(newX, maxX));
            }
            if (newY < minY || newY > maxY) {
                velocityY = -velocityY;
                newY = Math.max(minY, Math.min(newY, maxY));
            }

            element.style.left = newX + "px";
            element.style.top = newY + "px";
        }

        requestAnimationFrame(update);
    }

    update();
}

// Function to make an element draggable without physics
function makeDraggableWithoutPhysics(element) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    element.addEventListener("mousedown", function (event) {
        isDragging = true;
        offsetX = event.clientX - element.offsetLeft;
        offsetY = event.clientY - element.offsetTop;
        element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (event) {
        if (isDragging) {
            let newX = event.clientX - offsetX;
            let newY = event.clientY - offsetY;

            const minX = 0;
            const maxX = window.innerWidth - element.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
            const minY = headerBar.offsetHeight;
            const maxY = window.innerHeight - element.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            element.style.left = newX + "px";
            element.style.top = newY + "px";
        }
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        element.style.cursor = "grab";
    });

    element.addEventListener("touchstart", function (event) {
        isDragging = true;
        const touch = event.touches[0];
        offsetX = touch.clientX - element.offsetLeft;
        offsetY = touch.clientY - element.offsetTop;
        element.style.cursor = "grabbing";
        document.body.style.overflow = 'hidden';
    });

    document.addEventListener("touchmove", function (event) {
        if (isDragging) {
            const touch = event.touches[0];
            let newX = touch.clientX - offsetX;
            let newY = touch.clientY - offsetY;

            const minX = 0;
            const maxX = window.innerWidth - element.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
            const minY = headerBar.offsetHeight;
            const maxY = window.innerHeight - element.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            element.style.left = newX + "px";
            element.style.top = newY + "px";
        }
    });

    document.addEventListener("touchend", function () {
        isDragging = false;
        element.style.cursor = "grab";
        document.body.style.overflow = 'auto';
    });
}

// Apply draggable functionality to all popup elements and draggableBox
window.addEventListener('load', () => {
    initializePage();
    const popups = document.querySelectorAll('.popup, #draggableBox');
    popups.forEach(popup => makeDraggable(popup));
    // Remove draggable functionality for volume control container
    // makeDraggableWithoutPhysics(document.getElementById('volumeControlContainer'));
});

// Load the click count from local storage
function loadClickCount() {
    const savedCount = localStorage.getItem('clickCount');
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        document.getElementById("counter").innerText = count;
    }
}

// Save the click count to local storage
function saveClickCount() {
    localStorage.setItem('clickCount', count);
}

// Load the volume levels from local storage
function loadVolumeLevels() {
    const savedMasterVolume = localStorage.getItem('masterVolume');
    const savedBackgroundVolume = localStorage.getItem('backgroundVolume');
    const savedButtonVolume = localStorage.getItem('buttonVolume');
    const savedOtherVolume = localStorage.getItem('otherVolume');

    if (savedMasterVolume !== null) masterVolume = parseFloat(savedMasterVolume);
    if (savedBackgroundVolume !== null) backgroundVolume = parseFloat(savedBackgroundVolume);
    if (savedButtonVolume !== null) buttonVolume = parseFloat(savedButtonVolume);
    if (savedOtherVolume !== null) otherVolume = parseFloat(savedOtherVolume);

    document.getElementById('masterVolume').value = masterVolume;
    document.getElementById('backgroundVolume').value = backgroundVolume;
    document.getElementById('buttonVolume').value = buttonVolume;
    document.getElementById('otherVolume').value = otherVolume;

    document.getElementById('masterVolumeInput').value = (masterVolume * 100).toFixed();
    document.getElementById('backgroundVolumeInput').value = (backgroundVolume * 100).toFixed();
    document.getElementById('buttonVolumeInput').value = (buttonVolume * 100).toFixed();
    document.getElementById('otherVolumeInput').value = (otherVolume * 100).toFixed();
}

// Save the volume levels to local storage
function saveVolumeLevels() {
    localStorage.setItem('masterVolume', masterVolume);
    localStorage.setItem('backgroundVolume', backgroundVolume);
    localStorage.setItem('buttonVolume', buttonVolume);
    localStorage.setItem('otherVolume', otherVolume);
}

// Load the music state from local storage without playing it
function loadMusicState() {
    const savedMusicState = localStorage.getItem('musicState');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (savedMusicState === 'paused') {
        backgroundMusic.pause();
        musicToggle.innerText = "Play Music";
    } else {
        musicToggle.innerText = "Pause Music";
    }
}

// Save the music state to local storage
function saveMusicState() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicState = backgroundMusic.paused ? 'paused' : 'playing';
    localStorage.setItem('musicState', musicState);
}
