import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogIn from "./LogIn";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Info from "./Info";
import HomeNavBar from "./HomeNavBar";
import Resgister from "./Register";
import ContinueRegister from "./ContinueRegister";

function App() {
  // const [showNavBar, setShowNavBar]=useState(true)
  return (
    <BrowserRouter>
      {/* {showNavBar&&<HomeNavBar/>} */}
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="Home" element={<Home />}>
          <Route path="Info" element={<Info />} />
          <Route path="Posts" element={<Posts />} />
        </Route>
        <Route path="Register" element={<Resgister />} />
        <Route path="Continue Register" element={<ContinueRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
