async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  async function bubbleSort() {
    const inputField = document.getElementById("arrayInput");
    const arr = inputField.value.split(",").map(item => Number(item.trim()));
  
    const len = arr.length;
    let swapped;
  
    do {
      swapped = false;
  
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          swap(arr, i, i + 1);
  
          // Display the array in the animation
          displayArray(arr);
          await sleep(500); // Delay to show animation
  
          swapped = true;
        }
      }
    } while (swapped);
  }
  
  async function insertionSort() {
    const inputField = document.getElementById("arrayInput");
    const arr = inputField.value.split(",").map(item => Number(item.trim()));
  
    const len = arr.length;
  
    for (let i = 1; i < len; i++) {
      let currentElement = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > currentElement) {
        arr[j + 1] = arr[j];
        j--;
  
        // Display the array in the animation
        displayArray(arr);
        await sleep(500); // Delay to show animation
      }
  
      arr[j + 1] = currentElement;
  
      // Display the array in the animation
      displayArray(arr);
      await sleep(500); // Delay to show animation
    }
  }
  
  async function selectionSort() {
    const inputField = document.getElementById("arrayInput");
    const arr = inputField.value.split(",").map(item => Number(item.trim()));
  
    const len = arr.length;
  
    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        swap(arr, i, minIndex);
      }
  
      // Display the array in the animation
      displayArray(arr);
      await sleep(500); // Delay to show animation
    }
  }
  
  async function mergeSort(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("Input must be an array.");
    }
  
    if (arr.length <= 1) {
      return arr;
    }
  
    // Validate the array to ensure all elements are numbers
    if (!arr.every((element) => typeof element === "number" && !isNaN(element))) {
      throw new Error("Array must contain only numeric values.");
    }
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    return merge(await mergeSort(left), await mergeSort(right));
  }
  
  function merge(left, right) {
    let mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        mergedArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        mergedArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    return mergedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
  async function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    const sortedLeft = await quickSort(left);
    const sortedRight = await quickSort(right);
    const sortedArr = sortedLeft.concat(pivot, sortedRight);
  
    // Display the array in the animation
    displayArray(sortedArr);
    await sleep(500); // Delay to show animation
  
    return sortedArr;
  }
  const inputField = document.getElementById("arrayInput");
  const arr = inputField.value.split(",").map(item => Number(item.trim()));
  await quickSort(arr);
  
  function displayArray(arr) {
    const container = document.getElementById("container");
    container.innerHTML = "";
  
    const maxValue = Math.max(...arr);
    const minSize = 25; // Minimum circle size
    const maxSize = 80; // Maximum circle size
    const sizeRange = maxSize - minSize;
  
    for (let i = 0; i < arr.length; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      const circleSize = minSize + (arr[i] / maxValue) * sizeRange;
      circle.style.width = circleSize + "px";
      circle.style.height = circleSize + "px";
      circle.textContent = arr[i];
      container.appendChild(circle);
    }
  }
  
  function startAnimation() {
    const inputField = document.getElementById("arrayInput");
    const inputArray = inputField.value.split(",").map(item => Number(item.trim()));
    bubbleSort(inputArray);
  }