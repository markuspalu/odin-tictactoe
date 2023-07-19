const Gameboard = (() => {
    let gameArray = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    
    const boxes = document.querySelectorAll(".box");

    const makeMove = (index, mark) => {
        gameArray[index] = mark;
        boxes[index].innerHTML = mark;
    }

    const updateArray = () => {
        console.log(gameArray);
        return gameArray;
    };

    console.log("checked and " + gameArray);
    return {gameArray, updateArray, makeMove};
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
        if (turn && Gameboard.gameArray[index] == "") {
            Gameboard.makeMove(index, mark);
            turn = false;
        }
    };

    const finalMove = () => {
        console.log("start finalMove");
        const boxes = document.querySelectorAll(".box");
        enableTurn();
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                takeTurn(box.id.slice(-1), mark);
            });
        });
    };

    return {name, mark, getName, getCounter, winOne, winGame, enableTurn, takeTurn, finalMove};
};


const markus = Player("markus", "X");
const peter = Player("peter", "O");
