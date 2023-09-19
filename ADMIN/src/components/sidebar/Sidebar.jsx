import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  Assignment,
  AssignmentReturned,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/articles" className="link">
              <li className="sidebarListItem">
                <Assignment className="sidebarIcon" />
                Articles
              </li>
            </Link>
            <Link to="/suggestions" className="link">
              <li className="sidebarListItem">
                <AssignmentReturned className="sidebarIcon" />
                Suggestions
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}