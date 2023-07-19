const Gameboard = (() => {
    let gameArray = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const checkArray = () => {
        if (gameArray[0] == "X" && gameArray[1] == "X" && gameArray[2] == "X") {console.log ("first three X")};
        if (gameArray[6] == "X" && gameArray[7] == "X" && gameArray[8] == "X") {console.log ("last three X")}; 
    };

    const boxes = document.querySelectorAll(".box");
    const makeMove = (index, mark) => {
        gameArray[index] = mark;
        boxes[index].innerHTML = mark;
        checkArray();
    }

    console.log("checked and " + gameArray);
    return {gameArray, makeMove, checkArray};
})();


const Player = (name, mark) => {
    let turn = false;
    let counter = 0;
    const getName = () => console.log("name is " + name);
    const getCounter = () => console.log("current counter is "+ counter);
    
    const winOne = () => {
        counter++;
        console.log(counter);
        if (counter == 3) {
            winGame();
        }
    };

    const winGame = () => {
        console.log("winner winner!");
    };

    const enableTurn = () => {
        turn = true;
    };

    const takeTurn = (index, mark) => {
        console.log("start takeTurn");
        Gameboard.makeMove(index, mark);
        turn = false;
    };
    
    const finalMove = () => {
        return new Promise((resolve) => {
            console.log("start finalMove");
            const boxes = document.querySelectorAll(".box");
            enableTurn();

            const boxClickHandler = (event) => {
                const box = event.target;

                console.log("box clicked");
                console.log(turn);
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

    return {name, mark, getName, getCounter, winOne, winGame, enableTurn, takeTurn, finalMove};
};

const markus = Player("markus", "X");
const peter = Player("peter", "O");

const playAlternateTurns = async () => {
    for (let i = 0; i < 20; i++) {
        await markus.finalMove();
        await peter.finalMove();
    }
};

playAlternateTurns();