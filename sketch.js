let board = [
    ['','',''],
    ['','',''],
    ['','',''],
];

let w;
let h;

let players = ['X', 'O'];
let human = 'X';
let AI = 'O';

let currentPlayer = human;

function setup() {
    var canvas = createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    canvas.parent('canvas-holder');
}

function draw() {
    background(220);

    line(w, 0, w, height);
    line(w*2, 0, w*2, height);
    line(0, h, width, h);
    line(0, h*2, width, h*2);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i + w/2;
            let y = h * j + h/2;
            let spot = board[i][j];
            textSize(32);
            strokeWeight(4);
            if (spot == players[0]) {
                noFill();
                let xr = w/4;
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }
            else if (spot == players[1]) {
                noFill();
                ellipse(x, y, w/2);
            }
            text(spot, x, y);
        }
    }
}





