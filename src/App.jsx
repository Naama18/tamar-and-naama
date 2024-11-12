import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogIn from "./LogIn";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts"
import Info from "./Info";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="Home" element={<Home />} >
          <Route path="Info" element={<Info />} />
          <Route path="Posts" element={<Posts />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
