import { useState, useEffect } from "react";

const currentUserId = JSON.parse(localStorage.getItem("currentUser"))["id"];
const API_URL = `http://localhost:3500/todos?userId=${currentUserId}`;

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState(false);

  function AddTodoToDb(newTodoItem) {
    const data = newTodo;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodoItem),
    };
    fetch("http://localhost:3500/todos", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("Todo updated:", data))
      .catch((error) => console.error("Error updating todo:", error));
  }
  function removeFromDb(itemToRemove) {
    const updatedTodos = todos.filter((todo) => todo.id !== itemToRemove.id);
    setTodos(updatedTodos);

    fetch(`http://localhost:3500/todos/${itemToRemove.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Todo deleted from the server.");
        } else {
          throw new Error("Failed to delete todo from the server.");
        }
      })
      .catch((error) => console.error("Error deleting todo:", error));
  }

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listTodos = await response.json();
        setTodos(listTodos);
      } catch (err) {
        console.log(err.message);
      }
    };

    (async () => await fetchTodos())();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return; // Don't add empty todos

    const newTodoItem = {
      userId: currentUserId,
      title: newTodo,
      completed: false,
      id: (todos.length + Math.random() * 1000).toString(),
    };
    console.log(todos);
    setTodos((prevTodos) => [...prevTodos, newTodoItem]); // Add new todo
    AddTodoToDb(newTodoItem);
    console.log(todos);
  };
  const handleCheckboxChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  function sortByCompleted() {
    setTodos((prevTodos) =>
      [...prevTodos].sort((a, b) => b.completed - a.completed)
    );
  }
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter todos based on search query
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <h2>Here is your To-Do list:</h2>

        <label>
          Write your todo:
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)} // Update newTodo state
          />
        </label>
        <div>
          <label>
            Search by title:
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} // Update search query
              placeholder="Search todos..."
            />
          </label>
        </div>

        <button onClick={handleAddTodo}>+</button>
      </div>
      <button onClick={sortByCompleted}>Sort by Completed</button>

      <form>
        {filteredTodos.map((todo) => (
          <div key={todo.title}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)} // Toggle completed status
              />
              {todo.title}
            </label>
            <button onClick={() => removeFromDb(todo)}>-</button>
            <button onClick={() => setEdit(true)}>edit</button>:
          </div>
        ))}
      </form>
    </>
  );
}
