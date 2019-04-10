const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

function assignSpace(space,owner,box) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
  
  box.push(space.id); 
  if (checkWinner(box)){
      displayWinner(owner);
  }
}

function checkWinner(box){
  if (box.length>2){
     for (let i=0;i<box.length-2;i++){
       for (let j=i+1;j<box.length-1;j++){
         for (let k=j+1;k<box.length;k++){
             let sum=parseInt(box[i])+
                 parseInt(box[j])+
                 parseInt(box[k]);
             if (sum==15){
                 return true;
             }
         }
       }
     }
  }
  return false;
}

function changeToX(event) {
  assignSpace( event.currentTarget,'x',x_box,event.currentTarget.id);
  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}
function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];
 
  assignSpace(freeSpace,'o',o_box);
  
  if (isGameOver()) {
    displayWinner();
  }
}
function isGameOver() {
  return freeBoxes.length === 0;
}
function displayWinner(winner) {
  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    header.textContent = 'You win!';
  } else if (winner === 'o'){
    header.textContent = 'Computer wins';
  } else {
    header.textContent = 'Tie';
  }
  resultContainer.appendChild(header);

  // Remove remaining event listeners
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}
const freeBoxes = [];
const o_box=[],x_box=[];
// Map of box number -> 'x' or 'o'
//const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}
