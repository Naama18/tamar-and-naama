import React from "react";
import { json, Link, Outlet } from "react-router-dom";
import HomeNavBar from "./HomeNavBar";

export default function Home() {
 
  const current = JSON.parse(localStorage.getItem("currentUser"));
  console.log(current);

  console.log(current);
  return (
    <>
    <HomeNavBar/>
      <h1>hello {current.username}! </h1>
      <Outlet/>

    
      
      <Outlet />
    </>
  );
}
