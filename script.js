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
        const boxes = document.querySelectorAll(".box");
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
        } else if (mark === "O") {
            player2.counter++;
        }
        Gameboard.restartGame();
        if (player1.counter == 3 || player2.counter == 3) {
            winGame();
        }
    };

    const winGame = () => {
        console.log("winner winner!");
        alert("Games are over!")
    };

    const takeTurn = (index, mark) => {
        console.log("start takeTurn");
        makeMove(index, mark);
    };

    const checkTie = () => {
        if (Gameboard.gameArray.every(cell => cell !== "")) {
            player1.counter++;
            player2.counter++;

            boxes.forEach(box => box.classList.add('disabled'));
            setTimeout(() => {
                Gameboard.restartGame(); ///////////////////////////////////////////////
                boxes.forEach(box => box.classList.remove('disabled'));
              }, 2000);
              
        };

            if (player1.counter == 3 && player2.counter == 3) {
                alert("it's a tie! Game over!");
            }
    }    

    const boxes = document.querySelectorAll(".box");
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
            const boxes = document.querySelectorAll(".box");
            const boxClickHandler = (event) => {
                const box = event.target;

                
                if (Gameboard.gameArray[box.id.slice(-1)] === "") {
                    takeTurn(box.id.slice(-1), mark);
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    resolve();
                    boxes.forEach(box => box.removeEventListener('click', boxClickHandler));
                }
            };
        
                boxes.forEach(box => {
                    box.addEventListener('click', boxClickHandler);
                });

            });
            // Reminder:
            // 1. We run finalMove()
            // 2. We set addEventListener to every box, with click to activate boxClickHandler
            // 3. When boxClickHandler finishes running, we removeEventListener from ALL boxes
            
        };

    return {name, mark, getName, getCounter, winOne, winGame, takeTurn, finalMove, makeMove, counter};
};

let player1;
let player2;

const submitButton = document.querySelector(".submitButton");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
submitButton.addEventListener("click", () => {
    if (name1.value != "" && name2.value != "") {
        player1 = Player(name1.value, "X");
        console.log(player1);
        player2 = Player(name2.value, "O");
        console.log(player2);
        screen1.style.display = "none";
        screen2.style.display = "flex";
        playGames()
    }
})


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