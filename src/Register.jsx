import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContinueRegister from "./ContinueRegister";
export default function Resgister() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [currentId, setCurrentId] = useState();

  const [validatePassword, setValidatePassword] = useState("");
  const API_URL = "http://localhost:3500/users";
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not recived expected data");
        const listUsers = await response.json();
        setUsers(listUsers);
      } catch (err) {
        console.log(err.message);
      }
    };
    (async () => await fetchItems())();
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      console.log(parseInt(users[users.length - 1]["id"]));
      setCurrentId((parseInt(users[users.length - 1]["id"]) + 1).toString());
    }
  }, [users]);
  function userExist() {
    for (let i = 0; i < users.length; i++) {
      if (userName === users[i]) {
        return true;
      }
    }
    return false;
  }
  function addUser() {
    fetch(API_URL, {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        username: userName,
        website: password,
        id: currentId,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Converting to JSON
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => console.log(json));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userExist() && validatePassword === password) {
      setCurrentId((prev) => prev + 1);

      alert("im inserting to local storage");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: userName, password: password })
      );
      console.log(users);
      console.log(
        'users[users.length - 1]["id"]: ',
        users[users.length - 1]["id"]
      );

      addUser();
      console.log("register", users);
      navigate("/ContinueRegister");
    } else {
      alert("username of password invalid");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your user-name:
        <input
          type="text"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </label>
      <label>
        Enter your password:
        <input
          type="number"
          name="website"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Verify your password:
        <input
          type="number"
          name="verifyPassword"
          onChange={(e) => setValidatePassword(e.target.value)}
          value={validatePassword}
        />
      </label>
      <input type="submit" />
    </form>
  );
}
