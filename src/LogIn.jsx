import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usersArray, setUsersArray] = useState([]);
  useEffect(() => {
    async function checkLogIn(url) {
      try {
        let response = await fetch(url);
        if (!response.ok) throw Error("Did not recived expected data");
        let data = await response.json();
        setUsersArray(data);
      } catch (error) {
        alert(error);
      }
    }
    (async () => await checkLogIn("http://localhost:3500/users"))();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let exist = false;
    for (let i = 0; i < usersArray.length; i++) {
      if (
        username === usersArray[i].username &&
        password === usersArray[i].website
      ) {
        localStorage.setItem("currentUser", JSON.stringify(usersArray[i]));
        exist = true;
      }
    }
    if (!exist) {
      alert("שם משתמש או סיסמא שגויים");
    } else {
      alert("נכנס בהצלחה");
      navigate("/Home");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Enter password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </label>
        <br/>
        <input type="submit" />
      </form>
    </>
  );
}
