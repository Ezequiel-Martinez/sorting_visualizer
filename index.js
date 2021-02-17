let bars = Array.from(document.querySelectorAll(".screen__bar"));
const playBtn = document.querySelector(".nav__play-btn");
const speedSlider = document.getElementById("speed-slider");
const itemSlider = document.getElementById("item-slider");
const screen = document.querySelector(".screen");

const bar = `<div class="screen__bar"></div>`;

let speed = speedSlider.value * (-1);
let abort = false;
let stop_ = false;
let activeAlgorithm = "selection sort";

speedSlider.addEventListener("mousemove", ()=> {
    speed = speedSlider.value * (-1);
})
speedSlider.addEventListener("click", ()=> {
    speed = speedSlider.value * (-1);
})

itemSlider.addEventListener("click", updateQuantity);

playBtn.addEventListener("click", play);

document.getElementById("selection-sort-btn").addEventListener("click", ()=> {
    reset();
    activeAlgorithm = "selection sort";
});
document.getElementById("bubble-sort-btn").addEventListener("click", ()=> {
    reset();
    activeAlgorithm = "bubble sort";
});





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

    playBtn.removeEventListener("click", setStop);
    playBtn.addEventListener("click", play);
    playBtn.textContent = "Play";
}

function setRandomHeight() {
    let i = 0;

    bars.forEach(bar => {
        let randomHeight = Math.floor(Math.random() * 500) + 15;
        bar.style.order = i + bars.length;
        bar.style.height = randomHeight + "px";
        bar.textContent = randomHeight;
        i ++;
    })
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
    await sleep(speed).then(()=> {

        for (const bar in bars) {
            statusDefault(bars[bar]);
            bars[bar].classList.remove("focused");
        }

        element.classList.remove("targeted");
        element.classList.add("sorted");
    });
}

async function statusTargeted(element, element2) {
    await sleep(speed).then(()=> {
    
        element.classList.remove("focused");
        element.classList.add("targeted");

        if (element2) {
            element2.classList.remove("focused");
            element2.classList.add("targeted");
        }

    });
}

async function statusFocused(element, element2) {
    await sleep(speed).then(()=> {
        element.classList.add("focused");

        if (element2) {
            element2.classList.add("focused");
        }

    });
}

async function removeFocused(element) {
    if (element == undefined) return;

    await sleep(speed).then(()=> {
        element.classList.remove("focused");
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
    resetColors();
    abort = true;
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
}

// VALORES POR DEFECTO AL INICIAR LA PÁGINA

setRandomHeight();

bars.forEach(bar => {
    bar.textContent = bar.style.height.slice(0, -2);
})