import React from 'react'
import logo from '../../images/logo.png'
import { Link as ScrollLink } from 'react-scroll'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {


    const location = useLocation();
    console.log(location)

    const [nav, setNav] = React.useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  React.useEffect(() => {
    if (location.pathname === '/welcome') {
      window.addEventListener('scroll', changeBackground);
    } else {
        window.removeEventListener('scroll', changeBackground)
    }
  }, [location]);

    // const [nav, setNav] = React.useState(false)

    // const changeBackground = () => {
    //     if(window.scrollY >= 50) {
    //         setNav(true)
    //     } else {
    //         setNav(false)
    //     }
    // }
    // window.addEventListener('scroll', changeBackground)

  return (
    <>
    <nav className={nav ? "nav active" : "nav"}>
        <Link to='/' className='logo' smooth={true} duration={2000} >
            <img src={logo} alt='logo' />
        </Link>
        <input className='menu-btn' type='checkbox' id='menu-btn'/>
        <label className='menu-icon' for='menu-btn'>
            <span className='nav-icon'></span>
        </label>  
        
        <ul className='menu'>
            <li><ScrollLink to='features' smooth={true} duration={1000} ><Link to='/' className='links'>Features</Link></ScrollLink></li>
            <li><ScrollLink to='presentaion' smooth={true} duration={1000} ><Link to='/' className='links'>Offers</Link></ScrollLink></li>
            <li><ScrollLink to='about' smooth={true} duration={1000} ><Link to='/' className='links'>About</Link></ScrollLink></li>
            <li><Link to='/home' className='links'>BLOG</Link></li>
        </ul>
    </nav>
    {/* <div id='main'>
        <div className='name'>
            <h2>STEP UP YOUR</h2>
            <h1><span>GAMING SKILLS</span> WITH US</h1>
            <p className='details'>Develop your gaming skills with our game</p>
            <div className='header-btns'>
                <a href='#' className='header-btn'>Check our Game</a>
            </div>
        </div>
    </div> */}

    </>
  )
}

export default Navbar