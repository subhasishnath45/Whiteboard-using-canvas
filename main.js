(function() {
  // getting canvas element from DOM.
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // setting the 2d context for the canvas.
  const context = canvas.getContext('2d');
  // getting all elements from our DOM
  let counterPlusElem = document.querySelector('#increase');
  let counterMinusElem = document.querySelector('#decrease');
  let sizeElem = document.getElementById('size');
  let colorElem = document.querySelector('#color');
  let eraserElem = document.querySelector('#eraser');
  let clearElem = document.querySelector('#clear');
  // getting size element value from the dom
  let size = sizeElem.innerText;



  let color = colorElem.value;
  // while selecting new color in the color input,
  // we will change the color variable value.
  colorElem.addEventListener("input", function(){
    color = colorElem.value;
    // console.log(color);
  }, false);

  // x and y will hold the co-ordinates of the cursor while drawing 
  // on canvas.
  let x;
  let y;
  // we will make the default 
  let isPressed = false;
  let isEraserPressed = false;
  // while we press the LMB.
  canvas.addEventListener('mousedown', (e)=>{
    isPressed = true;
    // The offsetX property returns the x-coordinate of the mouse pointer, relative to the target element (Here our canvas element).
    // The offsetY property returns the y-coordinate of the mouse pointer, relative to the target element.
    x = e.offsetX;
    y = e.offsetY;
    // console.log(isPressed,x,y);
  });

  // when we release the LMB.
  canvas.addEventListener('mouseup', (e)=>{
    isPressed = false;
    x = undefined;
    y = undefined;
    // console.log(isPressed,x,y);
  });
  // When we move the mouse
  canvas.addEventListener('mousemove', (e)=>{
  // When isPressed is true,
  // meaning, we are moving the mouse and at the same time holding LMB.
  if(isPressed) {
    
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    // console.log(x2,y2);

    // let's draw the Circle.
    drawCircle(x2, y2);
    // Also draw the line to avoid any space among the circles
    // while drawing quickly.
    drawLine(x,y,x2,y2);
    // Now we need to update the x and y point values.
    x = x2;
    y = y2;
  }
  });
  const drawCircle = (x,y)=>{
    // we will begin a path using beginPath()
    context.beginPath();
    // The arc() method creates an arc/curve (used to create circles, or parts of circles).
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    // x = The x-coordinate of the center of the circle.
    // y = The y-coordinate of the center of the circle.
    // r = The radius of the circle
    // We have omitted the last argument, which is false by default.
    context.arc(x, y, size/2, 0, 2 * Math.PI);
    // We use the fillStyle property to fill with another color/gradient.
    context.fillStyle = color;
    // The fill() method fills the current drawing (path).
    context.fill();
  }
  // drawCircle(100, 200);
  

  // x1, y1 will represent ctx.moveTo() co-ordinates.
  // x2, y2 will represent ctx.lineTo() co-ordinates.
  const drawLine = (x1, y1, x2, y2)=>{
    // we will begin a path using beginPath() again.
    context.beginPath();
    // ctx.moveTo() will have the starting co-ordinates of the line.
    context.moveTo(x1, y1);
    // ctx.lineTo() will indicate the ending co-ordinates of the line.
    context.lineTo(x2, y2);
    // strokeStyle property is used to the color that will be used for the stroke.
    context.strokeStyle = color;
    // The lineWidth property sets or returns the current line width, in pixels.
    context.lineWidth = size;
    // We use the stroke() method to actually draw the path on the canvas.
    context.stroke();
  }
  // drawLine(0,0,150,200);

  // Function for Erasing the drawing.
  const erase = () => {
    if(!isEraserPressed){
      isEraserPressed = true;
      eraserElem.style.border = '5px solid #00ff00';
      eraserElem.style.fontSize = '1rem';
      context.globalCompositeOperation = 'destination-out';
    }else{
      isEraserPressed = false;
      eraserElem.style.border = 'none';
      eraserElem.style.fontSize = '1.5rem';
      context.globalCompositeOperation = 'source-over';
    }
    // console.log(context.globalCompositeOperation);

    return context.globalCompositeOperation;
  }

   // Function for Erasing the drawing.
  const reset = () => {
    // Accessing the Global context.
    // The clearRect() method clears the specified pixels within a given rectangle.
    // In this case, the entire canvas width and height.
    // Thus everything will be cleared at once.
    context.clearRect(0, 0, canvas.width, canvas.height);
    // resetting will also deselect the eraser if it's selected.
    // thus we will be able to draw again immediately after reset.
    isEraserPressed = false;
    eraserElem.style.border = 'none';
    eraserElem.style.fontSize = '1.5rem';
    context.globalCompositeOperation = 'source-over';
    // We will also reset to the default black color.
    color = '#000000';
    colorElem.value = color;
  }
  // incrementing the size. (in the end)
  counterPlusElem.addEventListener("click",()=>{
    size++;
    document.getElementById('size').innerText = size;
  });
  // decrementing the size. (in the end)
  counterMinusElem.addEventListener("click",()=>{
    size--;
    document.getElementById('size').innerText = size;
  });
  // Selecting the easer and erasing the pixels of our drawing and 
  eraserElem.addEventListener('click', erase, false);

  // Resetting the entire Canvas.
  clearElem.addEventListener('click', reset, true);
})();