import { useState, useEffect } from "react";

export default function ContinueRegister() {
  const [inputs, setInputs] = useState({});
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();

  const [userUrl, setUserUrl] = useState();
  useEffect(() => {
    console.log("1");
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3500/users");
        if (!response.ok) throw Error("Did not recived expected data");
        console.log(response);
        const listUsers = await response.json();
        setUsers(listUsers);
        console.log(users);
        console.log(2);
      } catch (err) {
        console.log(err.message);
      }
    };
    (async () => await fetchItems())();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
    console.log(users);
  };

  useEffect(() => {
    if (users.length > 0) {
      console.log("Last user ID:", users[users.length - 1].id);
      setUserUrl(
        "http://localhost:3500/users/" +
          users[users.length - 1]["id"].toString()
      );
    }
  }, [users]);

  function updateUser() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: users[users.length - 1].username,
        name: name,
        email: email,
        phone: phone,
        address: { city: city },
      }),
    };
    console.log(userUrl);
    fetch(userUrl, requestOptions).then((response) => response.json());
    console.log("updated!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Enter your email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Enter your phone number:
        <input
          type="number"
          name="telephone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label>
        Enter your city:
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}
