
import React from 'react'
import { json, Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function HomeNavBar() {
    const navigate = useNavigate();
    function onclickLogout() {
        localStorage.setItem("currentUser", {});
        navigate("/");
      }
      console.log("hi")
  return (
 <nav>
    
    <button onClick={onclickLogout}>Logout</button>
      <Link to="Info">
        <button>Info</button>
      </Link>
      <Link to="Posts">
        <button>Posts</button>
      </Link>
      <Link to="Todos">
        <button>Todos</button>
      </Link>
      <Link to="Albums">
        <button>Albums</button>
      </Link>
      

 </nav>
  )
}

