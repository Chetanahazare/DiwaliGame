const diyas = document.querySelectorAll('.diya');
const crackers = document.querySelectorAll('.cracker');
const startButton = document.getElementById('startButton');
const congratsOverlay = document.getElementById('congratsOverlay');
const fireworksContainer = document.getElementById('fireworks');
const rangoliCanvas = document.getElementById('rangoliCanvas');
const pencil = document.querySelector('.rangoli-pencil');
const pointsDisplay = document.getElementById('pointsDisplay');
let points = 0;

// Flags to track task completion
let diyasLit = 0;
let crackersBurst = 0;
let rangoliCompleted = false;

// Start Game
startButton.addEventListener('click', () => {
    points = 0;
    diyasLit = 0;
    crackersBurst = 0;
    rangoliCompleted = false;
    congratsOverlay.classList.remove('active');
    updatePointsDisplay(); // Reset points display
    diyas.forEach(diya => diya.classList.remove('lit'));
    crackers.forEach(cracker => cracker.classList.remove('burst'));
    clearRangoliCanvas();
    alert('Let\'s Celebrate Diwali!');
});

// Lighting Diyas
diyas.forEach(diya => {
    diya.addEventListener('click', () => {
        if (!diya.classList.contains('lit')) {
            diya.classList.add('lit');
            diyasLit += 1;
            points += 10;
            updatePointsDisplay(); // Update points display
            checkCompletion();
        }
    });
});

// Bursting Crackers
crackers.forEach(cracker => {
    cracker.addEventListener('click', () => {
        if (!cracker.classList.contains('burst')) {
            cracker.classList.add('burst');
            crackersBurst += 1;
            points += 15;
            updatePointsDisplay(); // Update points display
            createFireworks();
            checkCompletion();
        }
    });
});

// Rangoli Drawing
pencil.addEventListener('click', () => {
    const ctx = rangoliCanvas.getContext('2d');
    rangoliCanvas.addEventListener('mousedown', startDrawing);
    rangoliCanvas.addEventListener('mouseup', stopDrawing);
    rangoliCanvas.addEventListener('mousemove', draw);
    let drawing = false;

    function startDrawing(e) {
        drawing = true;
        draw(e);
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
        if (!rangoliCompleted) {
            rangoliCompleted = true;
            points += 50;
            updatePointsDisplay(); // Update points display
            checkCompletion();
        }
    }

    function draw(e) {
        if (!drawing) return;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#ff4500';
        ctx.lineTo(e.clientX - rangoliCanvas.offsetLeft, e.clientY - rangoliCanvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rangoliCanvas.offsetLeft, e.clientY - rangoliCanvas.offsetTop);
    }
});

// Clear Rangoli Canvas
function clearRangoliCanvas() {
    const ctx = rangoliCanvas.getContext('2d');
    ctx.clearRect(0, 0, rangoliCanvas.width, rangoliCanvas.height);
}

// Check Completion
function checkCompletion() {
    // Check if all diyas are lit, all crackers are burst, and rangoli is completed
    if (diyasLit === diyas.length && crackersBurst === crackers.length && rangoliCompleted) {
        congratsOverlay.classList.add('active');
    }
}

// Fireworks Animation
function createFireworks() {
    const fireworkParticle = document.createElement('div');
    fireworkParticle.classList.add('firework-particle');
    fireworksContainer.appendChild(fireworkParticle);

    fireworkParticle.style.top = `${Math.random() * 100}%`;
    fireworkParticle.style.left = `${Math.random() * 100}%`;

    setTimeout(() => {
        fireworkParticle.remove();
    }, 1000);
}

// Update Points Display
function updatePointsDisplay() {
    pointsDisplay.textContent = points;
}
