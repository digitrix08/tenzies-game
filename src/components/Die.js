import React from "react";
import "../styles/Die.css"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
            {/* <div className={`die-dots-container dots-${props.value}`} >
                {Array(props.value).fill(<span>&bull;</span> )}
            </div> */}
        </div>
    )
}