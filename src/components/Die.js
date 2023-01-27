import React from "react";
import "../styles/Die.css";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    };
    
    return (
        <div
            className={`die-face face-${props.value}`}
            style={styles}
            onClick={props.holdDice}
        >
            {Array(props.value).fill(<span className="dot"></span>)}
        </div>
    );
}
