//Define the breathing cycle phases and duration

let breathingCycle = [
    { name: 'inhale', duration: 4000 },
    { name: 'hold', duration: 4000 },
    { name: 'exhale', duration: 4000, }
];

let currentPhaseIndex = 0;
let timeoutId;

let startButton = document.getElementById('startButton');


function startBreathing() {
    clearTimeout(timeoutId); // stop any old loop
    currentPhaseIndex = 0; // reset to Inhale
    startButton.disabled = true;
    currentPhase();
    console.log("You've started the breathing exercise!");
};

startButton.addEventListener('click', startBreathing);

let displayCurrentPhase = document.getElementById('displayCurrentPhase');

function currentPhase() {

    displayCurrentPhase.innerText = breathingCycle[currentPhaseIndex].name;

    timeoutId = setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % breathingCycle.length;
        currentPhase();
    }, breathingCycle[currentPhaseIndex].duration);

};

let stopButton = document.getElementById('stopButton');

stopButton.addEventListener('click', stopBreathing);

function stopBreathing() {
    startButton.disabled = false;
    displayCurrentPhase.innerText = '';
    currentPhaseIndex = 0;
    clearTimeout(timeoutId);
    console.log("You've stopped the breathing exercise!");
};

