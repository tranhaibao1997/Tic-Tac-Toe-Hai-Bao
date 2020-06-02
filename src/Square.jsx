import React from 'react'

export default function Square(props) {
    
    function changeValue(index)
    {
        props.giveIndexToHigherComponent(index)
    }
    return (
        <div className="square" onClick={()=>changeValue(props.index)}>
           <div className="XAndO">{props.square===null ? ""  :( props.square==="X" ?<img src="https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"></img> :<img src="https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif"></img>)}</div> 
        </div>
    )
}
