import React, { useState, useEffect } from 'react'
import './Game.css'

let easyArr = ['red','blue','yellow','green','darkorange','cyan','teal','violet','lime']
let hardArr = ['coral','crimson','chocolate','darkorange','firebrick','indianred','lightsalmon','orangered','sandybrown']
let impossibleArr = ['azure','darkgray','dimgray','gray','floralwhite','lightgray','lightslategray','slategray','silver']

let colors = ['red','blue','yellow','green','darkorange','cyan','teal','violet','lime']
let usedColors = []

function Game() {    

    const [colorState, setColorState] = useState(colors.map(color => color))
    const [score, setScore] = useState(-2)
    const [bestScore, setBestScore] = useState(0)
    const [difficulty, setDifficulty] = useState('easy')

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

    useEffect(() => {
        if (difficulty === 'easy') {
            setScore(-1)
            setBestScore(0)
            colors = easyArr
            setColorState(easyArr.map(color => color))
        } else if (difficulty === 'hard') {
            setScore(-1)
            setBestScore(0)
            colors = hardArr
            setColorState(hardArr.map(color => color))
        } else if (difficulty === 'impossible') {
            setScore(-1)
            setBestScore(0)
            colors = impossibleArr;
            setColorState(impossibleArr.map(color => color))
        }
    }, [difficulty])


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
            <div id="diff">
                <select onClick={(e) => {setDifficulty(e.target.value)}} name="difficulty" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="hard">Hard</option>
                    <option value="impossible">Impossible</option>
                </select>
            </div>
        </div>

    )
}

export default Game