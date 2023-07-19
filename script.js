


// // For X
// boxes.forEach(box => {
//     box.addEventListener('click', () => {
//         if (box.innerHTML === "") {
//             box.innerHTML = 'X';
//         }
//     })
// })

// // For O
// boxes.forEach(box => {
//     box.addEventListener('click', () => {
//         if (box.innerHTML === "") {
//             box.innerHTML = 'O';
//         }
//     })
// })


const Gameboard = (() => {
    let gameArray = [
        "X", "O", "O",
        "X", "X", "O",
        "O", "X", "X"
    ];
    return {gameArray};
})();

const Player = (name, mark) => {
    let turn = true;
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

    const whosTurn = (otherPlayer) => {
        console.log(otherPlayer)
        const boxes = document.querySelectorAll(".box");
        if (turn == true) {
            boxes.forEach(box => {
                box.addEventListener('click', () => {
                    if (box.innerHTML === "") {
                        console.log("changed");
                        box.innerHTML = mark;
                        turn = false;
                        whosTurn();
                    }
                });
            });
        } else {
            return ;
        }
    };

    return {name, mark, getName, getCounter, winOne, winGame, whosTurn, turn};
};

const markus = Player("markus", "O");
const peter = Player("peter", "X");

console.log(markus.name);
peter.whosTurn(markus);








// markus.getName();
// markus.getCounter();
// markus.winOne();
// markus.winOne();
// markus.winOne();