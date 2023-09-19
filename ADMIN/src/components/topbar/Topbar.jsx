import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux"
import { logout, clearUserState } from "../../redux/userRedux";
import { Link } from "react-router-dom"

export default function Topbar() {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user.currentUser)

  const handleLogOut = () => {
      localStorage.removeItem('persist:root');
      dispatch(logout())
      dispatch(clearUserState())
      window.location.href = 'http://localhost:3001/login'
  }
console.log(user);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        { user ?
            <div className="topRight">
              <div className="topbarIconContainer" onClick={handleLogOut}>
                LOGOUT
              </div>
              {/* <div className="topbarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <Language />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <Settings />
              </div> */}
              <img 
                src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                alt="" 
                className="topAvatar" />
            </div>
            :
            <div className="topbarIconContainer" >
              <Link to="/login">LOGIN</Link>            
            </div>
        }
      </div>
    </div>
  );
}
