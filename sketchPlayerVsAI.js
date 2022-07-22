let board = [
    ['','',''],
    ['','',''],
    ['','',''],
];

let w;
let h;

let human = 'X';
let AI = 'O';

let currentPlayer = human;

function setup() {
    var canvas = createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    canvas.parent('canvas-holder');
    // add if you want AI to go first
    // bestMove();
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
    else if (winner == human || winner == AI){
        return winner;
    }
}

function mousePressed() {
    if (currentPlayer == human) {
        // human make turn
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        // if valid turn
        if (board[i][j] == '') {
            board[i][j] = human;
            currentPlayer = AI;
            bestMove();
        }
    }
}

function bestMove() {
    // AI to make its turn
    let bestScore = -10000;
    let bestMoveRow;
    let bestMoveColumn;
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            // is the spot available?
            if (board[i][j] == '') {
                board[i][j] = AI;
                let score = minimax(board, 0, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMoveRow = i;
                    bestMoveColumn = j;
                }
            }
        }
    }
    board[bestMoveRow][bestMoveColumn] = AI;
    currentPlayer = human;
}

// lookup table
function scores(c) {
    if (c == 'X') {
        let num = -1;
        return num;
      }
      else if (c == 'O') {
        let num = 1;
        return num;
      }
      else { // tie
        let num = 0;
        return num;
      }
}

function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result != null) {
        let value = scores(result);
        return value;
    }

    if (isMaximizing) {
        let bestScore = -10000;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                if (board[i][j] == '') {
                    board[i][j] = AI;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    else {
        let bestScore = 10000;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                // is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
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
            if (spot == human) {
                noFill();
                let xr = w/4;
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }
            else if (spot == AI) {
                noFill();
                ellipse(x, y, w/2);
            }
            text(spot, x, y);
        }
    }
    let result = checkWinner();
    if (result != null) {
        if (result == human) {
            document.getElementById("winnerX").style.opacity = 1;
        }
        else if (result == AI) {
            document.getElementById("winnerO").style.opacity = 1;
        }
        else {
            document.getElementById("winnerTie").style.opacity = 1;
        }
        noLoop();
    }
}





