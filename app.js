let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turnIndicator");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnIndicator.innerText = "Player O's turn";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#ff5722";
      turnO = false;
      turnIndicator.innerText = "Player X's turn";
    } else {
      box.innerText = "X";
      box.style.color = "#3f51b5";
      turnO = true;
      turnIndicator.innerText = "Player O's turn";
    }
    box.disabled = true;
    checkWinner();
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 Player ${winner} wins! 🎉`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  pattern.forEach((idx) => boxes[idx].classList.add("winner"));
};

const showDraw = () => {
  msg.innerText = "🤝 It's a Draw!";
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return;
    }
  }

  // Check for draw
  let filled = [...boxes].every((box) => box.innerText !== "");
  if (filled) {
    showDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);