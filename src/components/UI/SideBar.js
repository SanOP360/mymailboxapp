// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate=useNavigate();
    const componseEmail=()=>{
        navigate('/Home')
    }
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          <Link to="/sent">Sent</Link>
        </li>
      </ul>
      <button className="compose-btn" onClick={componseEmail}>Compose</button>
    </aside>
  );
};

export default Sidebar;
