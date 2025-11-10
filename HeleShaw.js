const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const points = [];
let hovP = null, hovB = null, paused = false;

const buttons = [
    {id: 'sink', x: 1700, y: 70, width: 450, height: 450, text: 'Sinks (Placeholder)'},
    {id: 'source', x: 1700, y: 950, width: 450, height: 450, text: 'Source(Placeholder)'},
    {id: 'pause', x: 200, y: 950, width: 450, height: 450, text: 'Pause (Placeholder)'},
    {id: 'play', x: 800, y: 950, width: 450, height: 450, text: 'Play (Placeholder)'},
];

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
            points.push({x, y, radius});
        }
    }
}

canvas.addEventListener('mousemove', (e) =>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hovP = null, hovB = null;
    for(const point of points){
        const dx = x - point.x;
        const dy = y - point.y;
        if(Math.sqrt(dx * dx + dy * dy) <= point.radius){
            hovP = point;
            break;
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
        break;
        case 'source':
        console.log('(edit mode) source clicked');
        paused = true;
        break;
    }

}

// Circle Grid in Main Rectangle
drawCircleGrid(1 + 250, 1 + 40, 10, 10, 90, 90, 20);


function drawCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Hele-Shaw shape
    drawRect(1, 1, 1500, 900, 'gray', 'black', 10);

    // Water inlet pipe 
    drawRect(100, 20, 20, 875, 'black');
    /*
    // Right Panel Boxes
    drawRect(1700, 70, 450, 450, 'white');
    drawCenteredText('Sinks (Placeholder)', 1700, 70, 450, 450);

    drawRect(1700, 950, 450, 450, 'white');
    drawCenteredText('Source (Placeholder)', 1700, 950, 450, 450);

    // Bottom Middle Box
    drawRect(200, 950, 450, 450, 'white');
    drawCenteredText('Pause (Placeholder)', 200, 950, 450, 450);

    //Play button ??
    drawRect(800, 950, 450, 450, 'white');
    drawCenteredText('Play (Placeholder)', 800, 950, 450, 450);
    */

    // draw controls/buttons 
   for(const button of buttons){
        const color = (button === hovB) ? 'lightgray' : 'white';
        drawRect(button.x, button.y, button.width,button.height, color);
        drawCenteredText(button.text, button.x, button.y, button.width, button.height);
   }
   //redraw points 
    for (const point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = (point === hovP) ? 'yellow' : 'white'; // hovered circle yellow
        ctx.fill();
    }
}

