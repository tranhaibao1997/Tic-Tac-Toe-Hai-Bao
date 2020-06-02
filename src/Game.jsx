import React from "react";
import Board from "./Board";
import FacebookLogin from "react-facebook-login";
import Axios from "axios";

let current = 0;

export default function Game() {
  let [history, setHistory] = React.useState([
    { history: Array(9).fill(null), player: "" },
  ]);
  let [squares, setSquare] = React.useState(Array(9).fill(null));
  let [isX, setIsX] = React.useState(true);
  //let [currentHistory, setCurrentHistory] = React.useState(0)
  let [winner, setWinner] = React.useState(null);
  let [faceBookUser, setFaceBookUser] = React.useState(null);
  let [apiData, setApiData] = React.useState(null);

  React.useEffect(() => {
    getDataFromAPI();
    return () => {};
  }, []);

  function giveIndexToHigherComponent(index) {
    if (winner === null) {
      current++;
      let newArray = [...squares];

      if (newArray[index] !== null) {
        alert("This Square is Clicked");
        return;
      }
      // setSquare(history[currentHistory].history)
      let newHistory = [...history];
      //console.log(newHistory.slice(0,currentHistory),"this is new history")
      let array = newHistory.slice(0, current);
      console.log("array", array);

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
        player: isX,
      };
      setHistory([...array, historyPart]);

      //if win

      if (calculateWinner(newArray) !== null) {
        alert(`${calculateWinner(newArray)} wonnnnnnnnnn`);
        setWinner(calculateWinner(newArray));
        sendDataToAPI()
        return;
      }
    } else {
      alert("We had the winner");
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  //Time travel function
  function timeTravel(index) {
    setSquare(history[index].history);
    setIsX(!history[index].player);
    // setCurrentHistory(index)
    current = index;
    setWinner(null);
  }
  //console.log(currentHistory)

  function responseFacebook(data) {
    setFaceBookUser(data);
  }
  async function sendDataToAPI() {
    // let data = { name: faceBookUser.name, score: 10000 }.toString();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // };
    // const res = await Axios.post('http://ftw-highscores.herokuapp.com/tictactoe-dev', data, config)
    // console.log(res.data)
    let data = new URLSearchParams();
data.append("player", faceBookUser.name);
data.append("score", "Bao Tran is here with 1000000 score");
const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: data.toString(),
  json: true
  })
console.log(response)
}

  async function getDataFromAPI() {
    let url = "http://ftw-highscores.herokuapp.com/tictactoe-dev";
    let res = await Axios.get(url);
    console.log(res.data);
    setApiData(res.data.items);
  }
  console.log(faceBookUser);

  return (
    <>
      <div className="fb-info">
        {faceBookUser ? <img src={faceBookUser.picture.data.url}></img> : ""}
        {faceBookUser ? (
          <h1>
            hello <span className="fb-name">{faceBookUser.name}</span>
          </h1>
        ) : (
          ""
        )}
      </div>
      {faceBookUser ? (
        ""
      ) : (
        <FacebookLogin
          autoLoad={true}
          appId="2614278842122604"
          fields="name,email,picture"
          callback={(resp) => {
            responseFacebook(resp);
          }}
        />
      )}

      <div class="match-section">
        <Board
          squares={squares}
          giveIndexToHigherComponent={giveIndexToHigherComponent}
        ></Board>
        <div className="match-info-section">
          {winner === null ? (
            <h1>Next Player Is :{isX ? "Dog" : "Cat"}</h1>
          ) : (
            <h1>The Winner Is:{winner === "X" ? "Dog" : "Cat"}</h1>
          )}
          <div className="btn-section">
            {history.map((elm, index) => {
              return (
                <button onClick={() => timeTravel(index)}>Move {index}</button>
              );
            })}
          </div>
          <div className="dataFromAPI">
            {apiData
              ? apiData.map((item) => {
                  return (
                    <div>
                      <h5>Player:{item.player}</h5>
                      <h5>Score:{item.score}</h5>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
