let bars = Array.from(document.querySelectorAll(".screen__bar"));
const playBtn = document.querySelector(".nav__play-btn");
const speedSlider = document.getElementById("speed-slider");
const itemSlider = document.getElementById("item-slider");
const screen = document.querySelector(".screen");

const bar = `<div class="screen__bar"></div>`;

let speed = speedSlider.value * (-1);
let abort = false;
let stop_ = false;

speedSlider.addEventListener("mousemove", ()=> {
    speed = speedSlider.value * (-1);
})
speedSlider.addEventListener("click", ()=> {
    speed = speedSlider.value * (-1);
})

// itemSlider.addEventListener("mousemove", updateQuantity);
itemSlider.addEventListener("click", updateQuantity);

playBtn.addEventListener("click", selectionSort);

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
    ratio = window.innerWidth / bars.length;

    setRandomHeight();

    abort = true;
    stop_ = false;

    // Reseting colors to default

    for (const bar in bars) {
    bars[bar].classList.remove("targeted");
    bars[bar].classList.remove("sorted");
    bars[bar].classList.remove("focused");
    };

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

}

function setRandomHeight() {
    let i = 0;

    bars.forEach(bar => {
        let randomHeight = Math.floor(Math.random() * 500) + 15;
        bar.style.order = i + bars.length;
        bar.style.height = randomHeight + "px";
        i ++;
    })
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function statusDefault(element) {
    if(element == undefined) return;

    element.classList.remove("focused");
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

async function statusTargeted(element) {
    await sleep(speed).then(()=> {

        for (const bar in bars) {
            statusDefault(bars[bar]);
            bars[bar].classList.remove("targeted");
        }

        element.classList.remove("focused");
        element.classList.add("targeted");
    });
}

async function statusFocused(element) {

    if (speed != 0) {

        await sleep(speed).then(()=> {
    
            for (const bar in bars) {
                statusDefault(bars[bar]);
            }
    
            element.classList.add("focused");
        });
    }

    for (const bar in bars) {
        statusDefault(bars[bar]);
    }

    element.classList.add("focused");

}

function reset() {
    for (const bar in bars) {
        bars[bar].classList.remove("targeted");
        bars[bar].classList.remove("sorted");
        bars[bar].classList.remove("focused");
    }

    setRandomHeight();
    selectionSort();
}


setRandomHeight();

bars.forEach(bar => {
    bar.textContent = bar.style.height.slice(0, -2);
})