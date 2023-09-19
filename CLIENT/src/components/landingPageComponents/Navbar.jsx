import React, { useState } from 'react'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'


const Navbar = () => {

    const [nav, setNav] = useState(false)

    const changeBackground = () => {
        if(window.scrollY >= 50) {
            setNav(true)
        } else {
            setNav(false)
        }
    }
    window.addEventListener('scroll', changeBackground)

  return (
    <nav className={nav ? 'nave active' : 'nav'}>
        <a href='#' className='logo'>
            <img src={logo} alt='logo' />
        </a>
        <input type='checkbox' className='menu-btn' id='menu-btn'/>
        <label className='menu-icon' for='menu-btn'>
            <span className='nav-icon'></span>
        </label>
        <ul className='menu'>
            <li>
                <ScrollLink to='main' smooth={true} duration={1000} >Home</ScrollLink>
            </li>
            <li>
                <ScrollLink to='features' smooth={true} duration={1000} >Features</ScrollLink>
            </li>
            <li>
                <ScrollLink to='about' smooth={true} duration={1000} >About</ScrollLink>
            </li>
            <li>
                <ScrollLink to='presentation' smooth={true} duration={1000} >Vision</ScrollLink>
            </li>
            <li className='active'><Link to='/home' >Store</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar