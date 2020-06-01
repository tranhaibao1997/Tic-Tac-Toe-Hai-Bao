import React from 'react'

export default function Square(props) {
    
    function changeValue(index)
    {
        props.giveIndexToHigherComponent(index)
    }
    return (
        <div className="square" onClick={()=>changeValue(props.index)}>
            {props.square}
        </div>
    )
}
