import React from 'react'
import { Link } from 'react-router-dom';
import "./topbar.css"

const TopBar = () => {

  return (
    <div className='top'>
        <div className='topLeft'>
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-twitter"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>
        <div className='topCenter'>
            <ul className='topList'>
                <li className='topListItem'>
                    <Link className='link' to='/'>HOME</Link>
                </li>
                <li className='topListItem'>
                    <Link className='link' to='/'>ABOUT</Link>
                </li>
                <li className='topListItem'>
                    <Link className='link' to='/'>CONTACT</Link>
                </li>
            </ul>
        </div>
        <div className='topRight'>
                {/* <Link className='link' to='/settings'>{ <img className='topImg' src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=''></img> }</Link>
                <ul className='topList'>
                    <li className='topListItem'>
                        <Link className='link' to='/login'>LOGIN</Link>
                    </li>
                    <li className='topListItem'>
                        <Link className='link' to='/register'>REGISTER</Link>
                    </li>
                </ul>
            <i className="topSearchIcon fa-sharp fa-solid fa-magnifying-glass"></i> */}
        </div>
    </div>
  )
}

export default TopBar
