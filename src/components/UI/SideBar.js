// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const navigate=useNavigate();
    const composeEmail=()=>{
        navigate('/Home')
    }
    const unreadCount = useSelector((state) => state.email.unreadCount);
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/inbox">Inbox {unreadCount > 0 && `(${unreadCount})`}</Link> 
        </li>
        <li>
          <Link to="/sent">Sent</Link>
        </li>
      </ul>
      <button className="compose-btn" onClick={composeEmail}>Compose</button>
    </aside>
  );
};
  


export default Sidebar;
