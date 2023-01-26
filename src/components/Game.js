import React, { useState, useEffect } from 'react'
import './Game.css'


let usedColors = []

function Game() {
    let colors = ['red','blue','yellow','green','darkorange','cyan','teal','violet','lime']    

    const [colorState, setColorState] = useState(colors.map(color => color))
    const [score, setScore] = useState(-2)
    const [bestScore, setBestScore] = useState(0)

    //scrambles colors arr
    function changeColor(e) {
        grabColor(e)
        setColorState(prevColorState => {
            return prevColorState.map((color, index) => {
                return colors[(colors.indexOf(color) + 4) % colors.length]
            })
        })
    }

    //grabColorOnClick
    function grabColor(e) {
        let clickedSquareColor = e.target.style.backgroundColor
        if (usedColors.includes(clickedSquareColor)) {
            usedColors = []
            setScore(-1)
        } else {
            usedColors.push(clickedSquareColor)
        }
    }

    useEffect(() => {
        setScore(prevScore => prevScore + 1)

        //get bestScore
        if (score >= bestScore) {
            setBestScore(score + 1)
        } else {
            setBestScore(bestScore)
        }
    }, [colorState])

    return (
        <div>
            <div id="scoreboard">
                <div className="score">SCORE: {score}</div>
                <div className="score">BEST SCORE: {bestScore}</div>
            </div>
            <div id="container">
                <div id="grid">
                    {colorState.map((color, index) => (
                        <button key={index} className='square' onClick={changeColor} style={{backgroundColor: color}}></button>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Game