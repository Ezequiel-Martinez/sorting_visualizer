async function selectionSort() {
    let aux;
    let j = 0;
    let currentBarHeight;
    let currentMinHeight;
    let currentMinIndex;

    resetColors();

    abort = false;

    // Despues de poner play, el boton funciona como stop

    playBtn.removeEventListener("click", play);
    playBtn.removeEventListener("click", retry);
    playBtn.addEventListener("click", setStop);
    playBtn.textContent = "Stop";

    for (let i = 0; i < bars.length; i ++) {

        min = bars[i];

        await statusTargeted(bars[i]); // Cambiando color

        currentMinIndex = i;

        j = i;
        
        for (j; j < bars.length; j ++) {

            // abortar la ejecución del algoritmo

            if (abort) {
                abort = false;
                playBtn.removeEventListener("click", setStop);
                playBtn.addEventListener("click", play);
                playBtn.textContent = "Play";
                resetColors();
                return;
            };

            if (stop_) {
                stop_ = false;
                playBtn.removeEventListener("click", setStop);
                playBtn.addEventListener("click", retry);
                playBtn.textContent = "Retry";
                resetColors();
                return;
            } 

            /////////////////////////////////////

            removeFocused(bars[j - 1]);
            removeFocused(bars[j + 1]);
            await statusFocused(bars[j]); // Cambiando color

            currentBarHeight = parseInt(bars[j].style.height.slice(0, -2));

            currentMinHeight = parseInt(min.style.height.slice(0, -2));

            if (currentBarHeight < currentMinHeight) {
                min = bars[j];
                currentMinIndex = j;

                await statusTargeted(bars[j]); // Cambiando color
                
                for (const bar in bars) {
                    if (bar != j) {
                        bars[bar].classList.remove("targeted");
                    }
                }
            }

        }

        // cambiando el orden de las barras en el array

        aux = bars[currentMinIndex];
        bars[currentMinIndex] = bars[i];
        bars[i] = aux;

        await statusSorted(bars[i]); // Cambiando color
        
        // cambiando el orden de las barras en flexbox (efecto visual)

        aux = bars[currentMinIndex].style.order;
        bars[currentMinIndex].style.order = bars[i].style.order;
        bars[i].style.order = aux;
    }

    // YA ESTÁ ORDENADO. REINTENTAR

    playBtn.removeEventListener("click", play);
    playBtn.removeEventListener("click", setStop);
    playBtn.addEventListener("click", retry);
    playBtn.textContent = "Retry";
}


async function bubbleSort() {
    let currentHeight;
    let currentNextHeight;
    let aux;
    let j;
    
    resetColors();

    abort = false;

    // Despues de poner play, el boton funciona como stop

    playBtn.removeEventListener("click", play);
    playBtn.removeEventListener("click", retry);
    playBtn.addEventListener("click", setStop);
    playBtn.textContent = "Stop";


    for (let i = 0; i < bars.length - 1; i ++) {
        for (j = 0; j < bars.length - i - 1; j ++) {

            // abortar la ejecución del algoritmo

            if (abort) {
                abort = false;
                playBtn.removeEventListener("click", setStop);
                playBtn.addEventListener("click", play);
                playBtn.textContent = "Play";
                resetColors();
                return;
            };

            if (stop_) {
                stop_ = false;
                playBtn.removeEventListener("click", setStop);
                playBtn.addEventListener("click", retry);
                playBtn.textContent = "Retry";
                resetColors();
                return;
            } 

            /////////////////////////////////////

            currentHeight = parseInt(bars[j].style.height.slice(0, -2));
            currentNextHeight = parseInt(bars[j + 1].style.height.slice(0, -2));

            await statusFocused(bars[j], bars[j + 1]);
            statusDefault(bars[j - 1]);

            if (currentHeight > currentNextHeight) {

                await statusTargeted(bars[j], bars[j + 1]);
                
                aux = bars[j + 1].style.order;
                bars[j + 1].style.order = bars[j].style.order;
                bars[j].style.order = aux;

                aux = bars[j + 1];
                bars[j + 1] = bars[j];
                bars[j] = aux;
            }
        }

        await statusSorted(bars[j]);
    }

    await statusSorted(bars[0]);

    // YA ESTÁ ORDENADO. REINTENTAR

    playBtn.removeEventListener("click", play);
    playBtn.removeEventListener("click", setStop);
    playBtn.addEventListener("click", retry);
    playBtn.textContent = "Retry";
}