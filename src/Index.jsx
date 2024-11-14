import { useState } from "react";
import LogIn from "./LogIn";
import Resgister from "./Register";

export default function Index() {
  const [displayRegister, setDisplayRegister] = useState(false);
  const [displayLogIn, setDisplayLogIn] = useState(false);
  return (
    <>
      <h1>Welcome to our Website!</h1>
      <button onClick={() => setDisplayLogIn(true)}>Log In</button>
      {displayLogIn && <LogIn />}
      <button onClick={() => setDisplayRegister(true)}>Register</button>
      {displayRegister && <Resgister />}
    </>
  );
}
