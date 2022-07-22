let board = [
    ['','',''],
    ['','',''],
    ['','',''],
];

let w;
let h;

let playerX = 'X';
let playerO = 'O';

let currentPlayer = playerX;

function setup() {
    var canvas = createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    canvas.parent('canvas-holder');
    
}

function equals3(a, b, c) {
    return (a == b && b == c && a != '');
}

function checkWinner() {
    let winner = null;
    // vertical (matrix is opposite from c++)
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }
    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }
    // diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }
    
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }
    if (winner == null && openSpots == 0) {
        return 'Tie';
    }
    else if (winner == playerX || winner == playerO){
        return winner;
    }

}

function mousePressed() {
    if (currentPlayer == playerX) {
        // human make turn
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        // if valid turn
        if (board[i][j] == '') {
            board[i][j] = playerX;
            currentPlayer = playerO;
        }
    }
    else if (currentPlayer == playerO) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        // if valid turn
        if (board[i][j] == '') {
            board[i][j] = playerO;
            currentPlayer = playerX;
        }
    }
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
            if (spot == playerX) {
                noFill();
                let xr = w/4;
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }
            else if (spot == playerO) {
                noFill();
                ellipse(x, y, w/2);
            }
            text(spot, x, y);
        }
    }
    let result = checkWinner();
    if (result != null) {
        if (result == playerX) {
            document.getElementById("winnerX").style.opacity = 1;
        }
        else if (result == playerO) {
            document.getElementById("winnerO").style.opacity = 1;
        }
        else {
            document.getElementById("winnerTie").style.opacity = 1;
        }
        noLoop();
    }
}