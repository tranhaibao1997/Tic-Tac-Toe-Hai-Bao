import React from "react";
import Board from "./Board";
import FacebookLogin from 'react-facebook-login'

let current = 0

export default function Game() {
  let [history, setHistory] = React.useState([{ history: Array(9).fill(null), player: "" }]);
  let [squares, setSquare] = React.useState(Array(9).fill(null));
  let [isX, setIsX] = React.useState(true);
  //let [currentHistory, setCurrentHistory] = React.useState(0)
  let [winner, setWinner] = React.useState(null)






  function giveIndexToHigherComponent(index) {
    if (winner === null) {
      current++;
      let newArray = [...squares];



      if (newArray[index] !== null) {
        alert("This Square is Clicked");
        return;
      }
      // setSquare(history[currentHistory].history)
      let newHistory = [...history]
      //console.log(newHistory.slice(0,currentHistory),"this is new history")
      let array = newHistory.slice(0, current)
      console.log("array", array)



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
      
      //if win

      if (calculateWinner(newArray) !== null) {
        alert(`${calculateWinner(newArray)} wonnnnnnnnnn`)
        setWinner(calculateWinner(newArray))
        return;
      }
    }
    else
    {
      alert("We had the winner")
    }

  }


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null;
  }



  //Time travel function 
  function timeTravel(index) {

    setSquare(history[index].history)
    setIsX(!history[index].player)
    // setCurrentHistory(index)
    current = index
    setWinner(null)
  }
  //console.log(currentHistory)





  return (
    <>
       <FacebookLogin
        autoLoad={true}
        appId="2614278842122604"
        fields="name,email,picture"
        callback={(resp) => this.responseFacebook(resp)}
      />
      <div class="match-section">
        <Board
          squares={squares}
          giveIndexToHigherComponent={giveIndexToHigherComponent}
        ></Board>
        <div className="match-info-section">
          {winner === null ? <h1>Next Player Is :{isX ? "Dog" : "Cat"}</h1> : <h1>The Winner Is:{winner==="X" ?"Dog" :"Cat"}</h1>}
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
