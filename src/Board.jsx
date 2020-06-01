import React from "react";
import Square from "./Square";

export default function Board(props) {
  function giveIndexToHigherComponent(index) {
    props.giveIndexToHigherComponent(index);
  }

  return (
    <>
      <ul>
        {props.squares.map((square, index) => {
          return (
            <Square
              index={index}
              square={square}
              giveIndexToHigherComponent={giveIndexToHigherComponent}
            ></Square>
          );
        })}
      </ul>
    </>
  );
}
