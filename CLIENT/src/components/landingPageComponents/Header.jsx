import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div id='main'>
        <Navbar />
        <div className='name'>
            <h1><span>Build your Game</span> with confidence and creativity</h1>
            <p className='details'>A passionate game development studio, crafting engaging and immersive experiences for players worldwide!</p>
            {/* <a href='#' className='cv-btn'>Download</a> */}
        </div>
    </div>
  )
}

export default Header