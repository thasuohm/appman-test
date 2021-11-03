import React from 'react'

const BottomBar = (props) =>  {
    return (
        <div className="bottomContainer">
        <div className="bottomBar"/>
        <div className="circleBottom hoverCursor" onClick={props.openModal}>+</div>
        </div>
    )
}

export default BottomBar
