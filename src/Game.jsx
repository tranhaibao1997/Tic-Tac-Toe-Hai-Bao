import React from "react";
import Board from "./Board";

let current = 0 

export default function Game() {
  let [history, setHistory] = React.useState([{ history: Array(9).fill(null), player: "" }]);
  let [squares, setSquare] = React.useState(Array(9).fill(null));
  let [isX, setIsX] = React.useState(true);
  //let [currentHistory, setCurrentHistory] = React.useState(0)
  





  function giveIndexToHigherComponent(index) {
    current ++;
    let newArray = [...squares];
    if (newArray[index] !== null) {
      alert("This Square is Clicked");
      return;
    }
   // setSquare(history[currentHistory].history)
    let newHistory=[...history]
    //console.log(newHistory.slice(0,currentHistory),"this is new history")
    let array = newHistory.slice(0,current)
    console.log("array",array)


   
    if (isX) {
      newArray[index] = "X";
      setIsX(false);
    } else {
      newArray[index] = "O";
      setIsX(true);
    }

    setSquare(newArray);
    let historyPart = {
      history: newArray,
      player: isX
    }
    setHistory([...array, historyPart]);
  }


  console.log(history)



  //Time travel function 
  function timeTravel(index) {

    setSquare(history[index].history)
    setIsX(!history[index].player)
    // setCurrentHistory(index)
    current= index
  }
  //console.log(currentHistory)





  return (
    <>
      <div class="match-section">
        <Board
          squares={squares}
          giveIndexToHigherComponent={giveIndexToHigherComponent}
        ></Board>
        <div className="match-info-section">
          <h1>Next Player Is :{isX ? "Dog" : "Cat"}</h1>
          <div className="btn-section">
            {history.map((elm, index) => {
              return (
                <button onClick={() => timeTravel(index)}>Move {index}</button>
              )
            })}
          </div>

        </div>
      </div>


    </>
  );
}
