//Define the breathing cycle phases and duration

let breathingCycle = [
    { phase: 'inhale', duration: 5000, message: 'Breathe in deeply through your nose, feeling your lungs expanding.' },
    { phase: 'hold', duration: 5000, message: 'Pause and feel your body still.' },
    { phase: 'exhale', duration: 5000, message: 'Breathe out through your mouth, letting go of unnecessary tension.' }
];

let currentPhaseIndex = 0;
let timeoutId;

let isRunning = false;

let toggleSessionBtn = document.getElementById('toggleSession');

function toggleSession() {
    if (isRunning === false) {
        toggleSessionBtn.innerText = 'Stop Session';
        startBreathing();
        isRunning = true;


    } else {
        toggleSessionBtn.innerText = 'Start Session';
        stopBreathing();
        isRunning = false;
    }
}

function startBreathing() {
    clearTimeout(timeoutId); // stop any old loop
    currentPhaseIndex = 0; // reset to Inhale
    currentPhase();
    console.log("You've started the breathing exercise!");
};

toggleSessionBtn.addEventListener('click', toggleSession);

let displayCurrentPhase = document.getElementById('displayCurrentPhase');

function currentPhase() {

    displayCurrentPhase.innerText = breathingCycle[currentPhaseIndex].message;
    updateCircle(breathingCycle[currentPhaseIndex].phase);

    timeoutId = setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % breathingCycle.length;
        currentPhase();
    }, breathingCycle[currentPhaseIndex].duration);

};

/* Define what happens  in the UI during the hold phase:
- Create a function that displays the phase duration in seconds
- use the setInterval method to decrease the countdown every second and display that on the UI
- Once the countdown reaches 0, clear the time display
*/

let intervalId;

function holdPhaseCountdown() {
    let countdown = breathingCycle[currentPhaseIndex].duration / 1000; //set countdown variable to hold duration in seconds
    let displayCountdown = document.querySelector('#displayCountdown');
    displayCountdown.innerText = countdown; // displays count down duration

    intervalId = setInterval(() => {
        countdown--; //decrease countdown every second
        console.log(countdown);
        displayCountdown.innerText = countdown; //update the countdown value
        if (countdown === 0) {
            clearInterval(intervalId); //clear the countdown once it has reached 0. 
            displayCountdown.innerText = '';
            console.log('the timer has reached 0');
        }
    }, 1000);
}


//Update size of circle
const circle = document.querySelector('.circle');
function updateCircle(currentPhase) {
    //at inhale, scale twice the size
    if (currentPhase === 'inhale') {
        circle.classList.remove('exhale');
        circle.classList.toggle('inhale');

    } else if (currentPhase === 'hold') {
        //at hold, hold the max size and show countdown by calling the appropriate function
        holdPhaseCountdown();

    } else {
        //at exhale, remove pulse animation & return to original size
        circle.classList.remove('inhale');
        circle.classList.toggle('exhale');
    };
}

//Stop button logic to stop the breathing exercise

function stopBreathing() {
    displayCurrentPhase.innerText = 'Your session has ended.';
    displayCountdown.innerText = '';
    currentPhaseIndex = 0;
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    intervalId = null;
    circle.classList.remove('exhale');
    circle.classList.remove('inhale');
    console.log("You've stopped the breathing exercise!", intervalId);
};

