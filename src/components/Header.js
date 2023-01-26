import React from 'react'

function Header() {
    return (
        <header style={{
            width: '100vw',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            fontSize: '30px',
            backgroundColor: '#0f0f0f',
            color: 'white',
        }}>
            <div>Memory Game</div>
        </header>
    )
}

export default Header