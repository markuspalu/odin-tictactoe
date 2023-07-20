const Gameboard = (() => {
    let gameArray = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const checkArray = (mark) => {
        if ((Gameboard.gameArray[0] == mark && Gameboard.gameArray[1] == mark && Gameboard.gameArray[2] == mark) ||
           (Gameboard.gameArray[3] == mark && Gameboard.gameArray[4] == mark && Gameboard.gameArray[5] == mark) ||
           (Gameboard.gameArray[6] == mark && Gameboard.gameArray[7] == mark && Gameboard.gameArray[8] == mark) ||
            
           (Gameboard.gameArray[0] == mark && Gameboard.gameArray[3] == mark && Gameboard.gameArray[6] == mark) ||
           (Gameboard.gameArray[1] == mark && Gameboard.gameArray[4] == mark && Gameboard.gameArray[7] == mark) ||
           (Gameboard.gameArray[2] == mark && Gameboard.gameArray[5] == mark && Gameboard.gameArray[8] == mark) ||

           (Gameboard.gameArray[0] == mark && Gameboard.gameArray[4] == mark && Gameboard.gameArray[8] == mark) ||
           (Gameboard.gameArray[2] == mark && Gameboard.gameArray[4] == mark && Gameboard.gameArray[6] == mark)) {
            return true;
           } else {
            return false;
           }
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
        player1.finalMove();
    }
    return {gameArray, checkArray, restartGame};
})();


const Player = (name, mark) => {
    let turn = false;
    let counter = 0;
    const getName = () => console.log("name is " + name);
    const getCounter = () => console.log("current counter is "+ counter);

    const winOne = () => {
        counter++;
        console.log("Won game and counter is " + counter);
        player1.finalMove();
        Gameboard.restartGame();
        if (counter == 3) {
            winGame();
        }
    };

    const winGame = () => {
        console.log("winner winner!");
        alert("Games are over!")
    };

    const enableTurn = () => {
        turn = true;
    };

    const takeTurn = (index, mark) => {
        console.log("start takeTurn");
        makeMove(index, mark);
        turn = false;
        console.log(name + " turn is now " + turn);
    };

    const boxes = document.querySelectorAll(".box");
    const makeMove = (index, mark) => {
        Gameboard.gameArray[index] = mark;
        boxes[index].innerHTML = mark;
        if (Gameboard.checkArray(mark) == true) {
            boxes.forEach(box => box.classList.add('disabled'));
            setTimeout(() => {
                winOne(),
                boxes.forEach(box => box.classList.remove('disabled'));
              }, 2000);
        };
        if (mark == "X") {
            peter.finalMove()
        } else {
            player1.finalMove()
        }
    }
    
    const finalMove = () => {
        return new Promise((resolve) => {
            const boxes = document.querySelectorAll(".box");
            enableTurn();

            const boxClickHandler = (event) => {
                const box = event.target;

                console.log(name + " turn is " + turn);
                if (turn && Gameboard.gameArray[box.id.slice(-1)] === "") {
                    takeTurn(box.id.slice(-1), mark);
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

    return {name, mark, getName, getCounter, winOne, winGame, enableTurn, takeTurn, finalMove, makeMove};
};

const player1 = Player("markus", "X");
const peter = Player("peter", "O");

Gameboard.restartGame();