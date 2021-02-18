async function selectionSort() {
    sortingInitializer();

    let aux;
    let j = 0;
    let currentBarHeight;
    let currentMinHeight;
    let currentMinIndex;


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

        removeFocused(bars[j - 1]);

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

    sortingEnding();
}


async function bubbleSort() {
    sortingInitializer();

    let currentHeight;
    let currentNextHeight;
    let aux;
    let j;
    

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
        statusDefault(bars[j - 1]);
    }

    await statusSorted(bars[0]);

    sortingEnding();
}


async function quickSort_partition(arr, low, high) {
    let pivot = parseInt(arr[high].style.height.slice(0, -2));
    let i = low - 1;
    let aux;

    bars.forEach(bar => {
        statusDefault(bar);
    })

    await statusTargeted(arr[high]);

    for (let j = low; j < high; j++) {

        // abortar la ejecución del algoritmo

        if (abort) {
            playBtn.removeEventListener("click", setStop);
            playBtn.addEventListener("click", play);
            playBtn.textContent = "Play";
            resetColors();
            return;
        };

        if (stop_) {
            playBtn.removeEventListener("click", setStop);
            playBtn.addEventListener("click", retry);
            playBtn.textContent = "Retry";
            return;
        } 

        /////////////////////////////////////

        removeTargeted(arr[i]);
        removeTargeted(arr[j - 1]);

        removeFocused(arr[j - 1], arr[j + 1]);

        await statusFocused(arr[j]);

        if (parseInt(arr[j].style.height.slice(0, -2)) < pivot) {
            i++;

            // dos veces para añadir delay
            await statusTargeted(arr[i], arr[j]);
            await statusTargeted(arr[i], arr[j]);

            aux = arr[j].style.order;
            arr[j].style.order = arr[i].style.order;
            arr[i].style.order = aux;

            aux = arr[j];
            arr[j] = arr[i];
            arr[i] = aux;
        }
    }

    aux = arr[i + 1].style.order;
    arr[i + 1].style.order = arr[high].style.order;
    arr[high].style.order = aux;

    aux = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = aux;

    await statusSorted(arr[i + 1]);

    return i + 1;
}

async function quickSort_wrapper(arr, low, high) {
    sortingInitializer();

    await quickSort(arr, low, high);
    
    if (abort == false)
        sortingEnding();

    abort = false;
    stop_ = false;
}


async function quickSort(arr, low, high) {
    if (low < high && abort == false && stop_ == false) {

        let pivot;

        if (abort == false && stop_ == false)
            pivot = await quickSort_partition(arr, low, high);

            if (abort == false && stop_ == false)
            await quickSort(arr, low, pivot - 1);

            if (abort == false && stop_ == false)
            await quickSort(arr, pivot + 1, high);
    }

    if (abort == false && stop_ == false)
        statusSorted(arr[high]);
}

async function merge(arr, left, medium, right) {
    
}


async function mergeSort(arr, left, right) {
    if (left < right) {
        // Es lo mismo que "(left + right) / 2" pero evita overflow.
        let medium = left + ((right - left) / 2);

    }
}