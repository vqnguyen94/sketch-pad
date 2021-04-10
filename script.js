function mouseEnter() {
    //Get the square's number for fade functionality
    let x = parseInt(this.textContent);
    
    //Random mode on
    if(randomMode == true && mouseD == true){
        let color = generateRandomColor();
        this.style.backgroundColor = color;
    }
    //Fade mode on
    else if (mouseD == true && fadeMode == true){
        //Use the square's x value to determine current opacity level. Only darkens if x is a single digit
        if(x < 10){ 
            this.style.setProperty('background-color','rgba(0, 0, 0, 0.'+x+')');
            //Increment x to determine opacity level for next interation
            this.textContent = ++x;
        }
    }
    //Default color picker
    else if(mouseD == true){
        this.style.backgroundColor = penColor;
    }
}

//Similar to mouseEnter except adds functionality for coloring the initial square that is clicked
function mouseDown() {
    mouseD = true;
    let x = parseInt(this.textContent);

    if(randomMode == true){
        let color = generateRandomColor();
        this.style.backgroundColor = color;
    }
    else if(fadeMode == true){
        if( x < 10){
            this.style.setProperty('background-color','rgba(0, 0, 0, 0.'+x+')');
            this.textContent = ++x;
        }        
    } 
    else {
        this.style.backgroundColor = penColor;
    }
}
 
//Sets mouseD to false to stop coloring 
function mouseUp() {
    mouseD = false;
}

//Clears grid and reinitializes fade values back to 1
function clearGrid() {
    let gridSquares = document.querySelectorAll(".squares");
    gridSquares.forEach(item => item.style.cssText = "background: white");
    gridSquares.forEach(item => item.textContent = "1");
    maintainGridlineState(gridSquares);
}

//Maintains gridline settings for when a new grid is created or cleared
function maintainGridlineState(gridSquares) {
    if(gridlines == false){
        gridSquares.forEach(item => item.style.cssText = "border-color: rgba(0, 0, 0, 0.0);");
    }
    else{
        gridSquares.forEach(item => item.style.cssText = "border-color: rgba(0, 0, 0, 0.2);");
    }
}

//Creates new grid
function createNewGrid() {
    //Asks for grid dimensions until a valid number is entered
    let n = parseInt(prompt("Enter the number of squares per side of new grid (Max: 100):"));
    while(n > 100 || n < 1){
        n = parseInt(prompt("Error. Please enter a number between 1-100:"));
    }

    //Removes all previous grid squares
    let gridSquares = document.querySelectorAll(".squares");
    gridSquares.forEach(item => item.parentNode.removeChild(item));

    //Set new grid box dimensions
    grid.style.cssText = 'grid-template-rows: repeat(' + n + ', 1fr); grid-template-columns: repeat(' + n + ', 1fr)';
    
    //Initialize new grid
    let i;
    for(i=0; i < (n * n); i++){
        //Create a div representing each new grid square
        let div = document.createElement('div');
        div.setAttribute('class', 'squares');
        div.addEventListener("mouseenter", mouseEnter);    
        div.addEventListener("mousedown", mouseDown);
        div.addEventListener("mouseup", mouseUp);
        div.textContent = '1'; 
        grid.appendChild(div);
    }

    //Applies gridline rules based on previous gridline settings
    gridSquares = document.querySelectorAll(".squares");
    maintainGridlineState(gridSquares);
    
    //Updates the display of current grid dimensions
    dimensions.textContent = n + 'x' + n;
}


function toggleRandomButton () {
    //Toggle on
    if(randomMode == false){
        randomMode = true;
        //Highlight button
        this.style.setProperty('border-color','yellow');

        //Unhighlight any other buttons
        fadeMode = false;
        fadeButton.style.setProperty('border-color','black');
        pen.style.setProperty('border-color','black'); 
    }
    //Toggle off
    else {
        randomMode = false;
        //Unhighlight button
        this.style.setProperty('border-color','black');
    }
}

function togglefadeButton () {
    //Toggle on
    if(fadeMode == false){
        fadeMode = true;
        //Highlight button
        this.style.setProperty('border-color','yellow');
        
        //Unhighlight any other buttons
        randomMode = false;
        randomButton.style.setProperty('border-color','black');
        pen.style.setProperty('border-color','black');
    }
    //Toggle off
    else {
        fadeMode = false;
        //Unhighlight button
        this.style.setProperty('border-color','black');
    }
}


function toggleGridlines() {
    let gridSquares = document.querySelectorAll(".squares");
    //Toggle off
    if(gridlines == true){
        gridSquares.forEach(item => item.style.cssText = "border: rgba(0, 0, 0, 0.0);");
        gridlines = false;
    }
    //Toggle on
    else{
        gridSquares.forEach(item => item.style.cssText = "border-color: rgba(0, 0, 0, 0.2);");
        gridlines = true;
    }

}


function updatePenColor(event){
    //Updates pen color to color picked
    penColor = event.target.value;
    pen.style.backgroundColor = penColor;
    pen.style.setProperty('border-color','yellow');

    //Toggles off and unhighlights any other buttons
    randomButton.style.setProperty('border-color','black');
    fadeButton.style.setProperty('border-color','black');
    randomMode = false;
    fadeMode = false;
}

//Generates random hex string to use as color
function generateRandomColor() {
    let color = '#';
    for (let i = 0; i < 6; i++){
       const random = Math.random();
       const bit = (random * 16) | 0;
       color += (bit).toString(16);
    };
    return color;
}

//--------------------------MAIN------------------------------//

//Get references to elements
const grid = document.querySelector('#grid');
const createButton = document.querySelector('#create');
const clearButton = document.querySelector('#clear');
const randomButton = document.querySelector('#random');
const fadeButton = document.querySelector('#fade')
const gridlineToggle = document.querySelector('#toggle');
const dimensions = document.querySelector('#number');
const pen = document.querySelector('#color');

//Initialize pen to black, gridlines on, and other modes to off
let penColor = '#000000';
let randomMode = false;
let mouseD = false;
let fadeMode = false;
let gridlines = true;


//Attach listeners
createButton.addEventListener('click', createNewGrid);
clearButton.addEventListener('click', clearGrid);
randomButton.addEventListener('click', toggleRandomButton);
fadeButton.addEventListener('click', togglefadeButton);
gridlineToggle.addEventListener('click', toggleGridlines);
pen.addEventListener('input', updatePenColor);

//Prevents canvas from being dragged (useful since drawing requires holding down mouse)
grid.ondragstart = function () { return false; };

//Dimensions of grid are 16x16 by default
let n = 16;

//Creates the grid box dimensions
grid.style.cssText = 'grid-template-rows: repeat(' + n + ', 1fr); grid-template-columns: repeat(' + n + ', 1fr)';


//Initialize grid
let i;
for(i=0; i < (n * n); i++){
    //Create a div representing each new grid square
    let div = document.createElement('div');
    div.setAttribute('class', 'squares');  
    div.addEventListener("mouseenter", mouseEnter);
    div.addEventListener("mousedown", mouseDown);
    div.addEventListener("mouseup", mouseUp);

    //For fade functionality
    div.textContent = '1'; 
    
    grid.appendChild(div);
}




