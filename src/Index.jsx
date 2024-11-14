import { useState } from "react";
import LogIn from "./LogIn";
import Resgister from "./Register";
import "./index.css"

export default function Index() {
  const [displayRegister, setDisplayRegister] = useState(false);
  const [displayLogIn, setDisplayLogIn] = useState(false);
  return (
   
    <div class="indexContainer">
      <h1>Welcome to our Website!</h1>
      <button onClick={() => {setDisplayLogIn(true);
        setDisplayRegister(false)}}>Log In</button>
      {displayLogIn && <LogIn />}
      <button onClick={() => {setDisplayRegister(true);
      setDisplayLogIn(false)}

      }>Register</button>
      {displayRegister && <Resgister />}
      </div>
  
  );
}
