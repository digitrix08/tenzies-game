import React from "react";
import Die from "./components/Die";
import { allNewDice, generateNewDie } from "./utils";
import Confetti from "./components/Confetti";
import "./styles/App.css";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [rolls, setRolls] = React.useState(0);
    const [highScore, setHighScore] = React.useState(function () {
        return 0 || parseInt(localStorage.getItem("highScore"));
    });

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
        }
    }, [dice]);

    React.useEffect(() => {
        // eslint-disable-next-line
        if (highScore === 0 || (rolls !== 0 && rolls < highScore)) {
            localStorage.setItem("highScore", rolls);
            setHighScore(rolls);
        }
        // eslint-disable-next-line
    }, [tenzies]);

    function rollDice() {
        setRolls((prevRoll) => prevRoll + 1);
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld ? die : generateNewDie();
                })
            );
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setRolls(0);
        }
    }

    function holdDice(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="text">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="score-container">
                <p className="text">Number of Rolls: {rolls}</p>
                <p className="text">Top Score: {highScore}</p>
            </div>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}
