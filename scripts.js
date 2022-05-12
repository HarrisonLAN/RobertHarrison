let windowW = window.innerWidth;
let height = 100;
const BACKGROUND_COLOUR = "rgb(19, 206, 102)";
const SECONDARY_COLOR = 'red';
const PRIMARY_COLOR = 'rgb(72,209,204)';
const ANIMATION_SPEED_MS = 4;
const topContainer = "arrayContainerOne"
const botContainer = "arrayContainerTwo"

function randomlyGenerate() {
  let size = windowW/4
  let inputArr=[];
  let botArray=[];
  const targetNodeTop = document.getElementById(topContainer);
  const targetNodeBot = document.getElementById(botContainer);
    for (let i =0;i < size; i++) {
      inputArr.push(randomIntFromInterval(5, height));
      addElement(topContainer,targetNodeTop,i,randomIntFromInterval(5, height));
    }
    for (let i = size; i < size*2; i++) {
      botArray.push(randomIntFromInterval(5, height));
      addElement(botContainer,targetNodeBot,i,randomIntFromInterval(5, height ));
    }
    mergeSortBottom(botArray)
    getBubbleSortAnimations(inputArr);
  }


function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function addElement (divClass,node,index,dynamicHeight) {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.className="array-bar " +divClass;
    newDiv.style.height=dynamicHeight + "px";
    newDiv.style.backgroundColor=BACKGROUND_COLOUR;
    newDiv.id=index;
    node.appendChild(newDiv);

  }

  async function getBubbleSortAnimations(inputArr){
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len -1; j++) {
        document.getElementById(j).style.backgroundColor = PRIMARY_COLOR
        document.getElementById(j+1).style.backgroundColor = PRIMARY_COLOR

          if (inputArr[j]>= inputArr[j+1]) {
            document.getElementById(j).style.backgroundColor = SECONDARY_COLOR
            document.getElementById(j+1).style.backgroundColor = SECONDARY_COLOR
            inputArr = await swap(j,inputArr,i)
          }
          document.getElementById(j).style.backgroundColor = PRIMARY_COLOR
          document.getElementById(j+1).style.backgroundColor = PRIMARY_COLOR
          
      }
  }
};



function swap(j,inputArr,i) {
  return new Promise((resolve) => {
    try{      
    document.getElementById(j).style.height = `${inputArr[j+1]}px`
    document.getElementById(j+1).style.height = `${inputArr[j]}px`

    let divID = document.getElementById(j).id;
    document.getElementById(j).id = document.getElementById(j+1).id;
    document.getElementById(j+1).id = divID;

    window.requestAnimationFrame(function() {
        setTimeout(() => {
            var temp = inputArr[j]
            inputArr[j] = inputArr[j+1];
            inputArr[j+1] = temp;
            resolve(inputArr);
        });
    });}catch(Exception){
      console.log(j + " : " + Exception)
    }
  });
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
}  function getMergeSortAnimationsDescending(array) {
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