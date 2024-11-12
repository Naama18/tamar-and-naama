import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resgister from "./Register";
import ContinueRegister from "./ContinueRegister";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resgister />}></Route>
          <Route
            path="/ContinueRegister"
            element={<ContinueRegister />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
