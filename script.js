const Gameboard = (() => {
    let gameArray = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const checkArray = (mark) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (Gameboard.gameArray[a] === mark && Gameboard.gameArray[b] === mark && Gameboard.gameArray[c] === mark) {
                return true;
            }
        }
    
        return false;
    };

    const restartGame = () => {
        console.log("restarting game");
        Gameboard.gameArray = [
        "", "", "",
        "", "", "",
        "", "", ""
        ];
        
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = "";
        }
    }
    return {gameArray, checkArray, restartGame};
})();


const Player = (name, mark) => {
    let currentPlayer = null;
    let counter = 0;
    const getName = () => console.log("name is " + name);
    const getCounter = () => console.log("current counter is "+ counter);

    const winOne = () => {
        if (mark === "X") {
            player1.counter++;
            updateCounter1()
        } else if (mark === "O") {
            player2.counter++;
            updateCounter2()
        }
        
        setTimeout(() => {
            if (player1.counter == 3) {
                winGame(player1);
            } else if (player2.counter == 3) {
                winGame(player2);
            };
        }, 2000);

        
        Gameboard.restartGame();
    };

    const winGame = (player) => {
        screen2.style.display = "none";
        screen3.style.display = "flex";
        if (player == "tie") {
            whoWon.innerHTML = "It is a tie between " + player1.name + " and " + player2.name + "!";
        } else {
            whoWon.innerHTML = "Congratulations " + player.name + "!!!";
        }
    };

    const checkTie = () => {
        if (Gameboard.gameArray.every(cell => cell !== "")) {
            player1.counter++;
            player2.counter++;
            boxes.forEach(box => box.classList.add('disabled'));
    
            setTimeout(() => {
                updateCounter1()
                updateCounter2()
                Gameboard.restartGame();
                boxes.forEach(box => box.classList.remove('disabled'));
                if (player1.counter == 3 && player2.counter == 3) {
                    setTimeout(() => {
                        winGame("tie");
                    }, 2000);
                } else {
                    if (player1.counter == 3) {
                        setTimeout(() => {
                            winGame(player1);
                        }, 2000);
                    } else if (player2.counter == 3) {
                        setTimeout(() => {
                            winGame(player2);
                        }, 2000);
                    };
                }

              }, 2000);
            }
        };
      

    const makeMove = (index, mark) => {
        Gameboard.gameArray[index] = mark;
        boxes[index].innerHTML = mark;
        checkTie();
        
        if (Gameboard.checkArray(mark) == true) {
            boxes.forEach(box => box.classList.add('disabled'));
            setTimeout(() => {
                winOne(),
                boxes.forEach(box => box.classList.remove('disabled'));
              }, 2000);
        };

    }
    
    const finalMove = () => {
        if (!currentPlayer) {
            currentPlayer = mark === "X" ? player1 : player2;
        }
        return new Promise((resolve) => {
            const boxClickHandler = (event) => {
                const box = event.target;

                
                if (Gameboard.gameArray[box.id.slice(-1)] === "") {
                    makeMove(box.id.slice(-1), mark);
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    resolve();
                    boxes.forEach(box => box.removeEventListener('click', boxClickHandler));
                }
            };
        
                boxes.forEach(box => {
                    box.addEventListener('click', boxClickHandler);
                });

            });
        };

    return {name, mark, getName, getCounter, winOne, winGame, finalMove, makeMove, counter};
};

let player1;
let player2;

const boxes = document.querySelectorAll(".box");
const submitButton = document.querySelector(".submitButton");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const screen3 = document.querySelector(".screen3");
const whoWon = document.querySelector(".whoWon");
const maincontainer2 = document.querySelector(".maincontainer2");
const player1class = document.querySelector(".player1");
const player2class = document.querySelector(".player2");
const playerName1 = document.querySelector(".playerName1");
const playerName2 = document.querySelector(".playerName2");
const playerCounter1 = document.querySelector(".playerCounter1");
const playerCounter2 = document.querySelector(".playerCounter2");

submitButton.addEventListener("click", () => {
    if (name1.value != "" && name2.value != "") {
        player1 = Player(name1.value, "X");
        player2 = Player(name2.value, "O");
        screen1.style.display = "none";
        screen2.style.display = "flex";

        maincontainer2.classList.add("zoom-in2");
        player1class.classList.add("zoom-left");
        player2class.classList.add("zoom-right");
        setTimeout(() => {
          maincontainer2.classList.remove("zoom-in2");
          player1class.classList.remove("zoom-left");
          player2class.classList.remove("zoom-right");
        }, 1000);
        playGames()
        runSecondScreen()
    }
})

const runSecondScreen = () => {
    playerName1.innerHTML = player1.name;
    playerName2.innerHTML = player2.name;

}

const updateCounter1 = () => {
    playerCounter1.innerHTML = player1.counter;
    playerCounter1.classList.add("zoom-in");
    setTimeout(() => {
      playerCounter1.classList.remove("zoom-in");
    }, 1000);
}

const updateCounter2 = () => {
    playerCounter2.innerHTML = player2.counter;
    playerCounter2.classList.add("zoom-in");
    setTimeout(() => {
      playerCounter2.classList.remove("zoom-in");
    }, 1000);
}

const startGame = async () => {
    while (true) {
        await player1.finalMove();
        
        if (Gameboard.checkArray(player1.mark) || Gameboard.checkArray(player2.mark) || Gameboard.gameArray.every(cell => cell !== "")) {
            break;
        }
        await player2.finalMove(); // skip on new game
    }
};

const playGames = async() => {
    for (let i = 0; i < 100; i++) {
        await startGame();
    }
}

