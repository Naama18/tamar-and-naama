import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Resgister() {
  const navigate = useNavigate();
  const [toNavigate, setToNavigate] = useState(true);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [currentId, setCurrentId] = useState(8);

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
  function userExist() {
    for (let i = 0; i < users.length; i++) {
      if (name === users[i]) {
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
        username: name,
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
        "current-user",
        JSON.stringify({ name: name, password: password })
      );
      console.log(users);
      console.log(
        'users[users.length - 1]["id"]: ',
        users[users.length - 1]["id"]
      );

      addUser();
      navigate("/ContinueRegister");
      setToNavigate(true);
    } else {
      alert("username of password invalid");
      setToNavigate(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your user-name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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