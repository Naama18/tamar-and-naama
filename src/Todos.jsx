import { useState } from "react";

const currentUserId = localStorage.getItem("id");
const API_URL = `https://jsonplaceholder.typicode.com/todos?userId=${currentUserId}`;
const [todos, setTodos] = useState();
useEffect(() => {
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Did not recived expected data");
      const listUsers = await response.json();
      setTodos(listUsers);
    } catch (err) {
      console.log(err.message);
    }
  };
  (async () => await fetchTodos())();
}, []);

console.log(listUsers);
