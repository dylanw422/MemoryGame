import React, { useState, useEffect } from 'react'
import './Game.css'


let usedColors = []
let colors = ['red','blue','yellow','green','darkorange','cyan','teal','violet','lime']

function Game() {    

    const [colorState, setColorState] = useState(colors.map(color => color))
    const [score, setScore] = useState(-1)
    const [bestScore, setBestScore] = useState(0)

    //scrambles colors arr
    function scramble() {
        colors.sort(() => Math.floor(Math.random() - 0.5))
    }

    //changes colors of squares
    function changeColor(e) {
        grabColor(e)
        scramble()
        setColorState(prevColorState => {
            return prevColorState.map((color, index) => {
                return colors[(colors.indexOf(color) + 1) % colors.length]
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