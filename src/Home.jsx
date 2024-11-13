import React from "react";
import { json, Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("currentUser"));
  console.log(current);

  function onclickLogout() {
    localStorage.setItem("currentUser", {});
    navigate("/");
  }

  function onclickPosts() {
    navigate("/Posts");
  }
  console.log(current);
  return (
    <>
      <h1>hello {current.username}! </h1>

      <Link to="/Info">
        <button>Info</button>
      </Link>

      <button onClick={onclickLogout}>Logout</button>
      <Outlet />
    </>
  );
}
