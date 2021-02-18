let bars = Array.from(document.querySelectorAll(".screen__bar"));
const playBtn = document.querySelector(".nav__play-btn");
const speedSlider = document.getElementById("speed-slider");
const itemSlider = document.getElementById("item-slider");
const screen = document.querySelector(".screen");
const sections = document.getElementsByClassName("nav__sections");

speedSlider.addEventListener("mousemove", ()=> {
    speed = speedSlider.value * (-1);
})
speedSlider.addEventListener("click", ()=> {
    speed = speedSlider.value * (-1);
})

itemSlider.addEventListener("click", updateQuantity);

playBtn.addEventListener("click", play);

document.getElementById("selection-sort-btn").addEventListener("click", function() {
    toggleActiveSection(this);
    reset();
    activeAlgorithm = "selection sort";
});
document.getElementById("bubble-sort-btn").addEventListener("click", function() {
    toggleActiveSection(this);
    reset();
    activeAlgorithm = "bubble sort";
});
document.getElementById("quicksort-btn").addEventListener("click", function() {
    toggleActiveSection(this);
    reset();
    activeAlgorithm = "quicksort";
});
document.getElementById("merge-sort-btn").addEventListener("click", function() {
    toggleActiveSection(this);
    reset();
    activeAlgorithm = "merge sort";
});


///// VARIABLES //////

const bar = `<div class="screen__bar"></div>`;

let speed = speedSlider.value * (-1);
let abort = false;
let stop_ = false;
let activeAlgorithm = "selection sort";

//////////////////////

function toggleActiveSection(element) {
    for (let i = 0; i < sections.length; i++) {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        element.className += " active";
    }
}

function setAbort() {abort = true};
function setStop() {stop_ = true};

function updateQuantity() {
    let ratio;
    let difference = itemSlider.value - bars.length;

    // Agregando o eliminando barras

    if (difference > 0) {
        for (let i = 0; i < difference; i ++) {
            screen.innerHTML += bar;
        }
    }
    else if (difference < 0) {
        for (let i = 0; i < (difference * (-1)); i ++) {
            screen.removeChild(screen.lastChild);
        }
    }

    ////////////////////////////////////

    bars = Array.from(document.querySelectorAll(".screen__bar"));

    setRandomHeight();

    abort = true; // Si es que hay un sorting en curso, abortarlo.
    stop_ = false; // Si es que hay un sorting en stop, cancelarlo.

    resetColors();

    playBtn.removeEventListener("click", setStop);
    playBtn.addEventListener("click", play);
    playBtn.textContent = "Play";
}

function setRandomHeight() {
    let i = 0;
    bars = Array.from(document.querySelectorAll(".screen__bar"));

    bars.forEach(bar => {
        let randomHeight = Math.floor(Math.random() * 500) + 15;
        bar.style.order = i + bars.length;
        bar.style.height = randomHeight + "px";
        bar.textContent = randomHeight;
        i ++;
    })

    // Displaying numbers depending on the width of the bars

    ratio = window.innerWidth / bars.length;

    if (ratio < 25) {
        bars.forEach(bar => {
            bar.textContent = "";
        })
    }
    else {
        bars.forEach(bar => {
            bar.textContent = bar.style.height.slice(0, -2);
        })
    }

    /////////////////////////////////////////////////////////
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function statusDefault(element) {
    if (element == undefined) return;

    element.classList.remove("focused");
    element.classList.remove("targeted");
}

async function statusSorted(element) {
    if (element == undefined) return;

    await sleep(speed).then(()=> {

        element.classList.remove("focused");
        element.classList.remove("targeted");
        element.classList.add("sorted");
    });
}

async function statusTargeted(element, element2) {
    await sleep(speed).then(()=> {

        if (element) {
            element.classList.remove("focused");
            element.classList.add("targeted");
        }
    
        if (element2) {
            element2.classList.remove("focused");
            element2.classList.add("targeted");
        }

    });
}

async function statusFocused(element, element2) {
    if (element == undefined) return;

    await sleep(speed).then(()=> {
        element.classList.add("focused");

        if (element2)
            element2.classList.add("focused");
    });
}

async function removeFocused(element, element2) {
    if (element == undefined) return;

    await sleep(speed).then(()=> {
        element.classList.remove("focused");

        if (element2)
            element2.classList.remove("focused");
    });
}

async function removeTargeted(element) {
    if (element == undefined) return;

    await sleep(speed).then(()=> {
        element.classList.remove("targeted");
    });
}

function resetColors() {
    for (const bar in bars) {
        bars[bar].classList.remove("targeted");
        bars[bar].classList.remove("sorted");
        bars[bar].classList.remove("focused");
    }
}

function reset() {
    playBtn.removeEventListener("click", setStop);
    playBtn.removeEventListener("click", retry);
    playBtn.addEventListener("click", play);
    playBtn.textContent = "Play";
    abort = true;
    resetColors();
    setRandomHeight();
}

function retry() {
    reset();
    play();
}

function play() {
    if (activeAlgorithm == "selection sort") 
        selectionSort();

    if (activeAlgorithm == "bubble sort")
        bubbleSort();

    if (activeAlgorithm == "quicksort")
        quickSort_wrapper(bars, 0, bars.length - 1);

    if (activeAlgorithm == "merge sort")
        mergeSort_wrapper(bars, 0, bars.length - 1, Math.floor(bars.length / 2));
}

function sortingInitializer() {
    resetColors();

    abort = false;

    // Despues de poner play, el boton funciona como stop

    playBtn.removeEventListener("click", play);
    playBtn.removeEventListener("click", retry);
    playBtn.addEventListener("click", setStop);
    playBtn.textContent = "Stop";
}

function sortingEnding() {
    // YA ESTÁ ORDENADO. REINTENTAR

    playBtn.removeEventListener("click", play);
    playBtn.removeEventListener("click", setStop);
    playBtn.addEventListener("click", retry);
    playBtn.textContent = "Retry";
}

// VALORES POR DEFECTO AL INICIAR LA PÁGINA

setRandomHeight();

bars.forEach(bar => {
    bar.textContent = bar.style.height.slice(0, -2);
})