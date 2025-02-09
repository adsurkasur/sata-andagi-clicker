function checkClient() {
    const isMobile = window.innerWidth <= 768;
    const mobileOverlay = document.getElementById('mobileOverlay');
    if (isMobile) {
        mobileOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';
        mobileOverlay.style.pointerEvents = 'all';
    } else {
        mobileOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.pointerEvents = 'auto';
    }
}
window.onload = checkClient;
window.onresize = checkClient;

let count = 0;
const messagesAndSounds = [
    { message: "omaigaaa", sound: "sound1.mp3" },
    { message: "amerika yaa", sound: "sound2.mp3" },
    { message: "haloo", sound: "sound3.mp3" }
];

let masterVolume = 1;
let backgroundVolume = 0.5;
let buttonVolume = 0.5;
let otherVolume = 1;

let clickMeCount = 0;

function handleClickText() {
    clickMeCount++;
    console.log(`Click me! clicked ${clickMeCount} times`);
    if (clickMeCount === 3) {
        document.querySelector('.click-text').innerText = "Hey, the button is above me!";
    }
    if (clickMeCount === 5) {
        document.querySelector('.click-text').innerText = "I'm sick of this.";
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
    document.body.innerHTML = '';
    document.body.style.backgroundColor = 'black';

    const overlay = document.createElement('div');
    overlay.id = 'funOverlay';
    overlay.className = 'fun-overlay';
    overlay.innerHTML = `
        <a href="https://rb.gy/i16ife" target="_blank" style="position: absolute; top: 10px; left: 10px; color:rgb(40, 40, 40); text-decoration: none;">aSdtIHNpY2sgb2Ygc2F0YSBhbmRhZ2ku</a>
        <img src="fun.gif" class="fun-gif">
        <audio id="funAudio" src="fun.mp3" loop autoplay></audio>
    `;
    document.body.appendChild(overlay);

    setInterval(moveTextRandomly, 1000);
}

document.querySelector('.click-text').addEventListener('click', handleClickText);

function playBackgroundMusic() {
    var audio = document.getElementById('backgroundMusic');
    audio.play().catch(function(error) {
        console.log('Autoplay was prevented:', error);
    });
}

function handleTouchStart(event) {
    event.target.classList.add('active');
}

function handleTouchEnd(event) {
    event.target.classList.remove('active');
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('touchstart', handleTouchStart);
    button.addEventListener('touchend', handleTouchEnd);
});

function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    if (popup.style.display === 'block') {
        bringToFront(popup);
    }
}

document.querySelectorAll('.developer-notes, .credits, .to-do-list, .socials, .help').forEach(element => {
    element.addEventListener('click', () => {
        let popupId = element.className.split(' ')[0];
        if (popupId === "to-do-list") {
            popupId = "todoList";
        } else {
            popupId = popupId.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); 
        }
        
        popupId += "Popup";
        togglePopup(popupId);
    });
});


function updateVolumes() {
    masterVolume = document.getElementById('masterVolume').value;
    backgroundVolume = document.getElementById('backgroundVolume').value;
    buttonVolume = document.getElementById('buttonVolume').value;
    otherVolume = document.getElementById('otherVolume').value;

    document.getElementById('masterVolumeInput').value = (masterVolume * 100).toFixed();
    document.getElementById('backgroundVolumeInput').value = (backgroundVolume * 100).toFixed();
    document.getElementById('buttonVolumeInput').value = (buttonVolume * 100).toFixed();
    document.getElementById('otherVolumeInput').value = (otherVolume * 100).toFixed();

    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = backgroundVolume * masterVolume;

    saveVolumeLevels();
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

document.getElementById('masterVolume').addEventListener('input', debounce(updateVolumes, 100));
document.getElementById('backgroundVolume').addEventListener('input', debounce(updateVolumes, 100));
document.getElementById('buttonVolume').addEventListener('input', debounce(updateVolumes, 100));
document.getElementById('otherVolume').addEventListener('input', debounce(updateVolumes, 100));

function updateFromInput(sliderId) {
    const inputValue = document.getElementById(`${sliderId}Input`).value;
    const sliderValue = inputValue / 100;

    document.getElementById(sliderId).value = sliderValue;
    updateVolumes();
}

function playSound(soundFile, volume = 1) {
    const audio = new Audio(soundFile);
    audio.volume = volume * masterVolume;
    audio.play();
}

function setRandomGif() {
    const gifArray = [
        "gif1.gif", "gif2.gif", "gif3.gif", "gif4.gif", "gif5.gif", 
        "gif6.gif", "gif7.gif", "gif8.gif", "gif9.gif", "gif10.gif",
        "gif11.gif", "gif12.gif", "gif13.gif", "gif14.gif", "gif15.gif"
    ];

    const randomIndex = Math.floor(Math.random() * gifArray.length);
    const gifSrc = gifArray[randomIndex];

    const gifElement = document.getElementById("randomGif");
    gifElement.src = gifSrc;
    gifElement.style.width = "300px";
}

setRandomGif();

function resetCounter() {
    count = 0;
    document.getElementById("counter").innerText = count;
    saveClickCount();
}

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
    saveMusicState();
}

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

function playConfettiSound() {
    playSound('confetti.mp3', otherVolume);
}

function handleClick() {
    count++;
    document.getElementById("counter").innerText = count;
    saveClickCount();
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
            messageElement.style.transform = "translateY(-50px)";
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

function initializePage() {
    document.getElementById("loadingScreen").style.display = "flex";

    if (window.innerWidth <= 768) {
        document.getElementById('backgroundMusic').remove();
        document.querySelectorAll('audio').forEach(audio => audio.remove());

        document.getElementById('mobileOverlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';
        document.getElementById('mobileOverlay').style.pointerEvents = 'all';
    } else {
        document.getElementById('mobileOverlay').style.display = 'none';
    }

    document.getElementById('continueButton').style.display = 'block';
    document.querySelector("#loadingScreen p").innerText = "Loading finished!";

    const developerNotesPopup = document.createElement('div');
    developerNotesPopup.id = 'developerNotesPopup';
    developerNotesPopup.className = 'popup';
    developerNotesPopup.innerHTML = `
        <button class="close-developer-notes" onclick="togglePopup('developerNotesPopup')">X</button>
        <p>I want to add more to this website. You are a player. This website is just the beginning.</p>
    `;
    document.body.appendChild(developerNotesPopup);

    const creditsPopup = document.createElement('div');
    creditsPopup.id = 'creditsPopup';
    creditsPopup.className = 'popup';
    creditsPopup.innerHTML = `
        <button class="close-credits" onclick="togglePopup('creditsPopup')">X</button>
        <p>Credits to all contributors and supporters of this project. Sata Andagi Wallpaper by dluu13. Azumanga Daioh by Kiyohiko Azuma.</p>
    `;
    document.body.appendChild(creditsPopup);

    const todoListPopup = document.createElement('div');
    todoListPopup.id = 'todoListPopup';
    todoListPopup.className = 'popup';
    todoListPopup.innerHTML = `
        <button class="close-todo-list" onclick="togglePopup('todoListPopup')">X</button>
    `;
    document.body.appendChild(todoListPopup);

    const socialsPopup = document.createElement('div');
    socialsPopup.id = 'socialsPopup';
    socialsPopup.className = 'popup';
    socialsPopup.innerHTML = `
        <button class="close-socials" onclick="togglePopup('socialsPopup')">X</button>
        <p>Follow us on:</p>
        <ul>
            <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
            <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
        </ul>
    `;
    document.body.appendChild(socialsPopup);

    const rect = box.getBoundingClientRect();
    if (rect.top < headerBar.offsetHeight || rect.left < 0) {
        box.style.left = "20px";
        box.style.top = headerBar.offsetHeight + 20 + "px";
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
        loadingScreen.style.display = "none";
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = backgroundVolume * masterVolume;
    }, 500);
}

document.getElementById('continueButton').addEventListener('click', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const savedMusicState = localStorage.getItem('musicState');
    if (savedMusicState !== 'paused') {
        backgroundMusic.play();
    }
    hideLoadingScreen();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        const backgroundMusic = document.getElementById('backgroundMusic');
        const savedMusicState = localStorage.getItem('musicState');
        if (savedMusicState !== 'paused') {
            backgroundMusic.play();
        }
        hideLoadingScreen();
    } else if (event.key === 'v' || event.key === 'V') {
        toggleVolumeControl();
    } else if (event.key === 'p' || event.key === 'P') {
        toggleMusic();
    }
    if (event.key === 'w' || event.key === 'W') {
        const box = document.getElementById("draggableBox");
        if (box) {
            box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
        }
    }
});

window.addEventListener('load', () => {
    loadClickCount();
    loadVolumeLevels();
    loadMusicState();
    initializePage();
    const rect = box.getBoundingClientRect();
    if (rect.top < headerBar.offsetHeight || rect.left < 0) {
        box.style.left = "20px";
        box.style.top = headerBar.offsetHeight + 20 + "px";
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
        volumeControlContainer.style.top = '50%';
        volumeControlContainer.style.left = '50%';
        volumeControlContainer.style.transform = 'translate(-50%, -50%)';
    } else {
        volumeControlContainer.style.display = 'none';
    }
}

function closeDraggableBox() {
    document.getElementById("draggableBox").style.display = "none";
}

let box = document.getElementById("draggableBox");
let headerBar = document.querySelector(".header-bar");
let runningText = document.querySelector(".running-text");
let isDragging = false;
let offsetX = 0, offsetY = 0;
let velocityX = 0, velocityY = 0;
let friction = 0.95;

box.addEventListener("mousedown", function (event) {
    isDragging = true;
    offsetX = event.clientX - box.offsetLeft;
    offsetY = event.clientY - box.offsetTop;
    box.style.cursor = "grabbing";
    velocityX = 0;
    velocityY = 0;
});

document.addEventListener("mousemove", function (event) {
    if (isDragging) {
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        const minX = 0;
        const maxX = window.innerWidth - box.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
        const minY = headerBar.offsetHeight;
        const maxY = window.innerHeight - box.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        box.style.left = newX + "px";
        box.style.top = newY + "px";

        velocityX = event.movementX;
        velocityY = event.movementY;
    }
});

document.addEventListener("mouseup", function () {
    isDragging = false;
    box.style.cursor = "grab";
});

box.addEventListener("touchstart", function (event) {
    isDragging = true;
    const touch = event.touches[0];
    offsetX = touch.clientX - box.offsetLeft;
    offsetY = touch.clientY - box.offsetTop;
    box.style.cursor = "grabbing";
    document.body.style.overflow = 'hidden';
});

document.addEventListener("touchmove", function (event) {
    if (isDragging) {
        const touch = event.touches[0];
        let newX = touch.clientX - offsetX;
        let newY = touch.clientY - offsetY;

        const minX = 0;
        const maxX = window.innerWidth - box.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
        const minY = headerBar.offsetHeight;
        const maxY = window.innerHeight - box.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        box.style.left = newX + "px";
        box.style.top = newY + "px";
    }
});

document.addEventListener("touchend", function () {
    isDragging = false;
    box.style.cursor = "grab";
    document.body.style.overflow = 'auto';
});

function update() {
    if (!isDragging) {
        velocityX *= friction;
        velocityY *= friction;

        let newX = box.offsetLeft + velocityX;
        let newY = box.offsetTop + velocityY;

        const minX = 0;
        const maxX = window.innerWidth - box.offsetWidth - (document.documentElement.scrollHeight > window.innerHeight ? 17 : 0);
        const minY = headerBar.offsetHeight;
        const maxY = window.innerHeight - box.offsetHeight - (document.documentElement.scrollWidth > window.innerWidth ? 17 : 0) - runningText.offsetHeight;

        if (newX < minX || newX > maxX) {
            velocityX = -velocityX;
            newX = Math.max(minX, Math.min(newX, maxX));
        }
        if (newY < minY || newY > maxY) {
            velocityY = -velocityY;
            newY = Math.max(minY, Math.min(newY, maxY));
        }

        box.style.left = newX + "px";
        box.style.top = newY + "px";
    }

    requestAnimationFrame(update);
}

update();

let zIndexCounter = 1005;

function bringToFront(popup) {
    zIndexCounter++;
    popup.style.zIndex = zIndexCounter;
}

function makeDraggable(element) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    let velocityX = 0, velocityY = 0;
    const friction = 0.95;

    element.style.position = 'absolute'; // Ensure it does not follow screen scrolls

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

function makeDraggableWithoutPhysics(element) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    element.style.position = 'absolute'; // Ensure it does not follow screen scrolls

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

window.addEventListener('load', () => {
    initializePage();
    const popups = document.querySelectorAll('.popup, #draggableBox');
    popups.forEach(popup => makeDraggable(popup));
    makeDraggable(document.getElementById('helpPopup'));
});

function loadClickCount() {
    const savedCount = localStorage.getItem('clickCount');
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        document.getElementById("counter").innerText = count;
    }
}

function saveClickCount() {
    localStorage.setItem('clickCount', count);
}

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

function saveVolumeLevels() {
    localStorage.setItem('masterVolume', masterVolume);
    localStorage.setItem('backgroundVolume', backgroundVolume);
    localStorage.setItem('buttonVolume', buttonVolume);
    localStorage.setItem('otherVolume', otherVolume);
}

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

function saveMusicState() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicState = backgroundMusic.paused ? 'paused' : 'playing';
    localStorage.setItem('musicState', musicState);
}
