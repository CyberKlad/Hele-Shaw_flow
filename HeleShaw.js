const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');



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
        }
    }
}


// Hele-Shaw shape
drawRect(1, 1, 1500, 900, 'gray', 'black', 10);

// Water inlet pipe 
drawRect(100, 20, 20, 875, 'black');

// Right Panel Boxes
drawRect(1700, 70, 450, 450, 'white');
drawCenteredText('Sinks (Placeholder)', 1700, 70, 450, 450);

drawRect(1700, 950, 450, 450, 'white');
drawCenteredText('Source (Placeholder)', 1700, 950, 450, 450);

// Bottom Middle Box
drawRect(600, 950, 450, 450, 'white');
drawCenteredText('(Placeholder)', 600, 950, 450, 450);

// Circle Grid in Main Rectangle
drawCircleGrid(1 + 250, 1 + 40, 10, 10, 90, 90, 20);
