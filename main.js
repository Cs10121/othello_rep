// ボードのサイズ
const boardSize = 8;

const blankStr = "　"
const firMark = "O";
const secMark = "X";

let nowTurn = false; //falseが先手
let turnButtons = [];
let isTurnd = false;

const buttons = Array.from({ length: boardSize }, () => Array.from({ length: boardSize }));

// ボードを生成
const boardElement = document.getElementById('board');

for (let row = 0; row < boardSize; row++) {
  const tr = document.createElement('tr');

  for (let col = 0; col < boardSize; col++) {
    const td = document.createElement('td');
    const button = document.createElement('button');
    button.setAttribute('data-rows', row);
    button.setAttribute('data-columns', col);
    td.appendChild(button);  // ボタンをセルに追加する行が修正されました
    tr.appendChild(td);

    // イベントリスナーを設定する際に、selected 関数を無名関数でラップしています
    button.addEventListener("click", function() {
      selected(button);
    });

    buttons[row][col] = button;
    button.textContent = blankStr;
  }

  boardElement.appendChild(tr);
}

initBoard();

function initBoard() {
    // ボードの初期化など、追加のロジックをここに追加
  const mid = Math.floor(boardSize / 2) - 1;
  buttons[mid][mid].textContent = firMark;
  buttons[mid+1][mid+1].textContent = firMark;
  buttons[mid+1][mid].textContent = secMark;
  buttons[mid][mid+1].textContent = secMark;
}

function selected(button) {
    if (button.textContent !== blankStr) {
        return;
    }

    if (nowTurn) {
        button.textContent = secMark;
    } else {
        button.textContent = firMark;
    }

    const rowIndex = parseInt(button.getAttribute('data-rows'));
    const columnIndex = parseInt(button.getAttribute('data-columns'));
    console.log(`rowIndex: ${rowIndex}, columnIndex: ${columnIndex}`);
    let nowRow = rowIndex;
    let nowCol = columnIndex;

    // 裏返す処理などを追加
    const moves = [-1, 0, 1];
    let isCanTurn = true;
    turnButtons = [];

    moves.forEach(moveRow => {
        moves.forEach(moveCol => {
            while (isCanTurn) {
                nowRow += moveRow;
                nowCol += moveCol;
                console.log(nowRow + " / " + nowCol);
                isCanTurn = checkButton(nowRow, nowCol);
            }
            turnButtons = [];
            isCanTurn = true;
            nowRow = rowIndex;
            nowCol = columnIndex;
        });
    });

    if (!isTurnd) {
        buttons[rowIndex][columnIndex].textContent = blankStr;
        return;
    }

    isTurnd = false;
    nowTurn = !nowTurn;
}

function checkButton(row, col) {
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
        return false;
    }
    
    const button = buttons[row][col];
    let content = button.textContent;

    if (content === blankStr) {
        return false;
    }

    if (!nowTurn && content === firMark){
        //turnButtonsをひっくり返す
        if (turnButtons.length > 0) {
            isTurnd = true;
        }
        turnButtons.forEach(item => {
            item.textContent = firMark;
        });
        return false;
    } else if(nowTurn && content === secMark) {
        //turnButtonsをひっくり返す
        if (turnButtons.length > 0) {
            isTurnd = true;
        }
        turnButtons.forEach(item => {
            item.textContent = secMark;
        });
        return false;
    } else {
        turnButtons.push(button);
        return true;
    }
}
