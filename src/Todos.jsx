import { useState, useEffect } from "react";
// if (localStorage.getItem("currentUser") !== null ) {
//   const currentUserId = JSON.parse(localStorage.getItem("currentUser"))["id"];
//   const API_URL = `http://localhost:3500/todos?userId=${currentUserId}`;
// } else {
//   const API_URL = `http://localhost:3500/todos`;
// }

export default function Todos() {
  const currentUserId = JSON.parse(localStorage.getItem("currentUser"))["id"];
  const API_URL = `http://localhost:3500/todos?userId=${currentUserId}`;
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track the index of the todo being edited
  const [editedTitle, setEditedTitle] = useState(""); // Store the title of the todo being edited

  function AddTodoToDb(newTodoItem) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodoItem),
    };
    fetch("http://localhost:3500/todos", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("Todo added:", data))
      .catch((error) => console.error("Error adding todo:", error));
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
    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return; // Don't add empty todos

    const newTodoItem = {
      userId: currentUserId,
      title: newTodo,
      completed: false,
      id: (todos.length + Math.random() * 1000).toString(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodoItem]); // Add new todo
    AddTodoToDb(newTodoItem);
    setNewTodo(""); // Clear input field after adding
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

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value); // Update the title being edited
  };

  const handleEditSubmit = (todo) => {
    // Update the todo in the list with the new title
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, title: editedTitle } : item
    );
    setTodos(updatedTodos);
    setEditIndex(null); // Stop editing
    setEditedTitle(""); // Clear the edited title
    fetch(`http://localhost:3500/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, title: editedTitle }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Todo updated:", data))
      .catch((error) => console.error("Error updating todo:", error));
  };

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
<br/>
        <button onClick={handleAddTodo}>+</button>
        <button onClick={sortByCompleted}>Sort by Completed</button>
      </div>

     

      <form>
        {filteredTodos.map((todo, index) => (
          <div  class="todoClass" key={todo.title}>
            {editIndex === index ? (
              <div>
                <label>
                  <input
                    type="text"
                    value={editedTitle} // Use the editedTitle state for the input
                    onChange={handleEditChange} // Update the title being edited
                  />
                </label>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleEditSubmit(todo); // Submit the edited title
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                  {todo.title}
                </label>
                <br/>
                <button onClick={() => removeFromDb(todo)}>-</button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setEditIndex(index);
                    setEditedTitle(todo.title);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </form>
    </>
  );
}
