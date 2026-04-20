const canvas = document.getElementById('interface_canvas');
const ctx = canvas.getContext('2d');
const points = [];
let hovP = null, hovB = null, paused = true;
window.placeMode = 'idle';

const buttons = [
    {id: 'sink', x: 50, y: 800, width: 350, height: 120, text: 'Sinks (Placeholder)', color1: 'white', color2: 'lightgray'},
    {id: 'clear', x: 50, y: 1100, width: 350, height: 80, text:'Clear (Placeholder)', color1: 'white', color2: 'lightgray'},
    {id: 'source', x: 425, y: 800, width: 350, height: 120, text: 'Source(Placeholder)', color1: 'white', color2: 'lightgray'},
    {id: 'pause', x: 425, y: 950, width: 350, height: 120, text: 'Pause (Placeholder)', color1: 'white', color2: 'lightgray'},
    {id: 'play', x: 50, y: 950, width: 350, height: 120, text: 'Play (Placeholder)', color1: 'white', color2: 'lightgray'},
    {id: 'header', x: 95 , y: 20, width: 600, height: 50, text: 'PAUSED', color1: 'white', color2: 'white'},
];
const head = buttons.find(i => i.id === 'header');


// Draws a filled rectangle with an outline
function drawRect(x, y, width, height, fillColor, strokeColor = null, strokeWidth = null) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);

    if (strokeColor && strokeWidth !== null) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeRect(x, y, width, height);
    }
}

// The text inside each of the squares
function drawCenteredText(text, x, y, width, height, fontSize = 40) {
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    ctx.fillStyle = 'black';
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, centerX, centerY);
}

// Draw the 10x10 grid of circles
function drawCircleGrid(startX, startY, cols, rows, gapX, gapY, radius) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = startX + col * gapX;
            const y = startY + row * gapY;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            points.push({x, y, radius, state: 'none', row, col});
        }
    }
}

canvas.addEventListener('mousemove', (e) =>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if(paused){
        hovP = null, hovB = null;
        for(const point of points){
            const dx = x - point.x;
            const dy = y - point.y;
            if(Math.sqrt(dx * dx + dy * dy) <= point.radius){
                hovP = point;
                break;
            }
        }
    }
    for(const button of buttons){
        if(x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height){
            hovB = button;
            break;
        }
    }
    if(hovP){
        console.log("Point Hovered:", hovP);
    }
   drawCanvas();
})

canvas.addEventListener('click', (e) =>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hovB = null;
    for(const button of buttons){
         if(x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height){
            hovB = button;
            click(button);
            break;
        }
    }
    
})

function click(button){
    switch(button.id){
        case 'play':
            console.log('Play clicked');
            paused = false;
            break;
        case 'pause':
            console.log('Pause clicked');
            paused = true;
            break;
        case 'sink':
            console.log('(edit mode) sink clicked');
            paused = true;
            window.placeMode = (window.placeMode === 'sink') ? 'idle' : 'sink';
            break;
        case 'source':
            console.log('(edit mode) source clicked');
            paused = true;
            window.placeMode = (window.placeMode === 'source') ? 'idle' : 'source';
            break;
        case 'clear':
            console.log('clear pressed');
            break;
    }
    drawCanvas();
}

// Circle Grid in Main Rectangle
drawCircleGrid(100, 100, 10, 10, 65, 65, 20);

//Handles pause/play interactions with buttons
function pauseHandling(){
    if(paused){
        head.text = 'PAUSED';
        for(const button of buttons){
                if(button.id == 'pause') button.color1 = 'gray';
                if(button.id == 'sink' || button.id == 'source' || button.id == 'play'|| button.id == 'clear'){
                    button.color1 = 'white';
                    button.color2 = 'lightgray';
                }
            }
    }
    else{
        head.text = 'PLAYING';
        for(const button of buttons){
                if(button.id == 'pause') button.color1 = 'white';
                if(button.id == 'play'|| button.id == 'clear'){
                    button.color1 = 'gray';
                    button.color2 = 'gray';
                }
            }
    }
}

function drawCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pauseHandling();
    // Hele-Shaw shape
    // drawRect(1, 1, 800, 800, 'gray', 'black', 10);

    // Water inlet pipe 
    // drawRect(100, 20, 20, 875, 'black');

    // draw controls/buttons 
   for(const button of buttons){
        const color = (button === hovB) ? button.color2 : button.color1;
        drawRect(button.x, button.y, button.width,button.height, color);
        drawCenteredText(button.text, button.x, button.y, button.width, button.height);
   }
   //redraw points 
    for (const point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);

        if (point.state === 'source') {
            ctx.fillStyle = 'blue';        // source = blue
        } else if (point.state === 'sink') {
            ctx.fillStyle = 'red';         // sink = red
        } else {
            ctx.fillStyle = (point === hovP) ? 'yellow' : 'white'; // hover or empty
        }

        ctx.fill();
    }

}

drawCanvas();

window.points = points;
window.buttons = buttons;
window.drawCanvas = drawCanvas;


