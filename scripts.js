let windowW = window.innerWidth;
let height = 100;
const BACKGROUND_COLOUR = "rgb(19, 206, 102)";
const SECONDARY_COLOR = 'red';
const PRIMARY_COLOR = 'rgb(72,209,204)';
const ANIMATION_SPEED_MS = 0.75;
let topArray = [];
let botArray = [];
const containerOne = "arrayContainerOne"
const containerTwo = "arrayContainerTwo"

function randomlyGenerate() {
    let size = windowW/4 
    for (let i =0;i < size; i++) {
      topArray.push(randomIntFromInterval(5, height));
      addElement(containerOne,i,randomIntFromInterval(5, height));
    }
    for (let i = size; i < size*2; i++) {
      botArray.push(randomIntFromInterval(5, height));
      addElement(containerTwo,i,randomIntFromInterval(5, height ));
    }
    mergeSort(topArray);
    mergeSortBottom(botArray);
  }


function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
}

function addElement (container,index,dynamicHeight) {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.className="array-bar " + container;
    newDiv.style.height=dynamicHeight + "px";
    newDiv.style.backgroundColor=BACKGROUND_COLOUR;
    newDiv.id=index;


    document.getElementById(container).appendChild(newDiv);

  }

  function mergeSort(array) {
    let animations = getMergeSortAnimationsAscending(array);
        for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = document.getElementById(barOneIdx).style;
        const barTwoStyle = document.getElementById(barTwoIdx).style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = document.getElementById(barOneIdx).style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
   function mergeSortBottom(array) {
    let animations = getMergeSortAnimationsDescending(array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        let [barOneIdx, barTwoIdx] = animations[i];
        barOneIdx += array.length;
        barTwoIdx += array.length;
        const barOneStyle = document.getElementById(barOneIdx).style;
        const barTwoStyle = document.getElementById(barTwoIdx).style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          let [barOneIdx, newHeight] = animations[i];
          barOneIdx += array.length
          const barOneStyle = document.getElementById(barOneIdx).style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

function getMergeSortAnimationsAscending(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelperAscending(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelperAscending(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelperAscending(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelperAscending(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMergeAscending(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMergeAscending(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  function getMergeSortAnimationsDescending(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelperDescending(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

  function mergeSortHelperDescending(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelperDescending(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelperDescending(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMergeDescending(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMergeDescending(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] >= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  let timer;
  function displayHeading(){
    const element = document.getElementById("heroHeading");
      var currentOp = getComputedStyle(element).getPropertyValue("opacity");
      if(currentOp >= 1) {clearInterval(timer);}
      currentOp = Number(currentOp)+ 0.1
      console.log(currentOp)
      element.style.opacity = currentOp;
  }
  function runTime() 
  {
    randomlyGenerate();
    setTimeout(delayedTime, 8000);
  }
  function delayedTime(){
    timer = setInterval(displayHeading, 1000);
  }
  