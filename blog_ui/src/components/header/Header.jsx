import React from 'react'
import "./header.css"
import headerImg from '../../images/headerImg.png'

const Header = () => {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSm'>Echoes of the Fallen</span>
        <span className='headerTitleLg'>Carthage Legacy</span>
      </div>
      <img
        className='headerImg'
        src={headerImg}
        alt=''
      />
    </div>
  )
}

export default Header