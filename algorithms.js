async function selectionSort() {
    let aux;
    let j = 0;
    let currentBarHeight;
    let currentMinHeight;
    let currentMinIndex;

    if (abort) {
        abort = false;
    }

    if (!stop_) {
        playBtn.removeEventListener("click", selectionSort);
        playBtn.removeEventListener("click", reset);
        playBtn.textContent = "Stop";
        playBtn.addEventListener("click", setStop);
    }

    for (let i = 0; i < bars.length; i ++) {

        min = bars[i];

        await statusTargeted(bars[i]);

        currentMinIndex = i;

        j = i;
        
        for (j; j < bars.length; j ++) {

            if (abort) {
                abort = false;
                playBtn.removeEventListener("click", setStop);
                playBtn.addEventListener("click", selectionSort);
                playBtn.textContent = "Play";
                return;
            };

            if (stop_) {
                stop_ = false;
                playBtn.removeEventListener("click", setStop);
                playBtn.addEventListener("click", reset);
                playBtn.textContent = "Retry";
                return;
            } 

            await statusFocused(bars[j]);

            currentBarHeight = parseInt(bars[j].style.height.slice(0, -2));

            currentMinHeight = parseInt(min.style.height.slice(0, -2));

            if (currentBarHeight < currentMinHeight) {
                min = bars[j];
                currentMinIndex = j;

                await statusTargeted(bars[j]);
            }

        }

        // cambiando el orden de las barras en el array

        aux = bars[currentMinIndex];
        bars[currentMinIndex] = bars[i];
        bars[i] = aux;

        await statusSorted(bars[i]);
        
        // cambiando el orden de las barras en flexbox (efecto visual)

        aux = bars[currentMinIndex].style.order;
        bars[currentMinIndex].style.order = bars[i].style.order;
        bars[i].style.order = aux;
    }

    // YA ESTÁ ORDENADO. REINTENTAR

    playBtn.removeEventListener("click", selectionSort);
    playBtn.removeEventListener("click", setStop);
    playBtn.addEventListener("click", reset);
    playBtn.textContent = "Retry";
}