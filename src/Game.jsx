import React from "react";
import Board from "./Board";

export default function Game() {
  let [history, setHistory] = React.useState([]);
  let [squares, setSquare] = React.useState(Array(9).fill(null));
  let [isX, setIsX] = React.useState(true);
  function giveIndexToHigherComponent(index) {
    console.log(index);
    let newArray = [...squares];
    if (newArray[index] !== null) {
      alert("This Square is Clicked");
      return;
    }
    if (isX) {
      newArray[index] = "X";
      setIsX(false);
    } else {
      newArray[index] = "O";
      setIsX(true);
    }

    setSquare(newArray);
    setHistory([...history, newArray]);
  }
  console.log(squares);
  console.log(history);
  function timeTravel(elm,index)
  {
      
      let newArray=[...history]
      setHistory(newArray.slice(0,index))
      setSquare(elm)
  }
  return (
    <>
      <Board
        squares={squares}
        giveIndexToHigherComponent={giveIndexToHigherComponent}
      ></Board>
      {history.map((elm,index)=>{return(
          <button onClick={()=>timeTravel(elm,index)}>Move {index}</button>
      )})}
    </>
  );
}
