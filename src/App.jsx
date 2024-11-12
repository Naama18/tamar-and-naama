import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogIn from "./LogIn";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Resgister from "./Register";
import ContinueRegister from "./ContinueRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Resgister />} />
        <Route path="ContinueRegister" element={<ContinueRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
