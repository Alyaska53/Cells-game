const field = document.querySelector('.field');
let cells = [];

function inArray(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (num === arr[i]) return true;
  }

  return false;
}

function createRandomNumbers(randLength, min, max) {
  let randArray = [];
  let i = 0;

  if (randLength > (max - min + 1)) {
    return null;
  }

  while (i < randLength) {
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if (!inArray(randArray, rand)) {
      i++;
      randArray.push(rand);
    }
  }

  return randArray;
}


let randomNumbers = createRandomNumbers(15, 1, 15);

function createCells(arrayNumbers) {
  arrayNumbers.forEach((el, index) => {
    let div = document.createElement('div');
    div.classList.add('cell');
    div.innerHTML = el;
    placeCell(div, index);

    field.append(div);
  });

  cells = document.querySelectorAll('.cell');
}

createCells(randomNumbers);

function placeCell(cell, index) {
  if (index < 4) {
    cell.style.left = index * 108 + 10 + 'px';
  } else if (index < 8) {
    cell.style.top = 1 * 108 + 10 + 'px';
    cell.style.left = (index - 4) * 108 + 10 + 'px';
  } else if (index < 12) {
    cell.style.top = 2 * 108 + 10 + 'px';
    cell.style.left = (index - 8) * 108 + 10 + 'px';
  } else {
    cell.style.top = 3 * 108 + 10 + 'px';
    cell.style.left = (index - 12) * 108 + 10 + 'px';
  }
}

let currentTag = {
  element: '',
  startX: 0,
  startY: 0,
  startTime: 0
}

let swipeLength = 216;
let maxSwipeLength = 220;
let restraint = 30; 

field.addEventListener('mousedown', function(e) {
  currentTag.element = document.elementFromPoint(e.pageX, e.pageY);
  currentTag.startX = e.pageX;
  currentTag.startY = e.pageY;
  currentTag.startTime = new Date().getTime();

  e.preventDefault();
});

field.addEventListener('mouseup', function(e) {
  distX = e.pageX - currentTag.startX;
  distY = e.pageY - currentTag.startY;

  let purpose = document.elementFromPoint(e.pageX, e.pageY);

  if (purpose === field) {
    if (Math.abs(distX) <= swipeLength && Math.abs(distY) <= restraint) {
      if (distX > 0) {
        swipeToRight(currentTag.element);
      } else {
        swipeToLeft(currentTag.element);
      }
    } else if (Math.abs(distY) <= swipeLength && Math.abs(distX) <= restraint) {
      if (distY > 0) {
        swipeToBot(currentTag.element);
      } else {
        swipeToTop(currentTag.element);
      }
    }
  }

  e.preventDefault();
});

function swipeToLeft(el) {
  let coordX = el.offsetLeft;
  let coordY = el.offsetTop;

  el.style.left = coordX - 108 + 'px';
}

function swipeToRight(el) {
  let coordX = el.offsetLeft;
  let coordY = el.offsetTop;

  el.style.left = coordX + 108 + 'px';
}

function swipeToTop(el) {
  let coordX = el.offsetLeft;
  let coordY = el.offsetTop;

  el.style.top = coordY - 108 + 'px';
}

function swipeToBot(el) {
  let coordX = el.offsetLeft;
  let coordY = el.offsetTop;

  el.style.top = coordY + 108 + 'px';
}
