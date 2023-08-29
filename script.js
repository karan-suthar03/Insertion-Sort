let values = [];
let states = [];
let num = 10;
let ls = 10;

function setup() {
    var canvas = createCanvas(windowWidth, 400);
    canvas.parent("canvas-container");
    num = 100;
    for (let i = 0; i < num; i++) {
        values.push(random());
        states.push(-1);
    }
    insertionSort(values);
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currentValue = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > currentValue) {

            arr[j + 1] = arr[j];
            states[j + 1] = 1;
            states[j] = 0;
            j--;
            await sleep(ls);
        }

        arr[j + 1] = currentValue;

        for (let k = i; k >= 0; k--) {
            states[k] = -1;
        }

        await sleep(ls);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    background(255);
    noStroke();
    for (let i = 0; i < values.length; i++) {
        if (states[i] == 1) {
            fill(255, 0, 0);
        } else if (states[i] == 0) {
            fill(0, 0, 255);
        } else {
            fill(0);
        }
        rect(i * width / num, height, width / num, -values[i] * height);
    }
}

let inputs = document.getElementById("inputs");
inputs.addEventListener("input", function (event) {
    if (inputs.value != 0 && inputs.value != "") {
        ls = inputs.value;
    }
});
inputs.value = ls;

function speed(x) {
    ls = ls + x;
    inputs.value = ls;
}