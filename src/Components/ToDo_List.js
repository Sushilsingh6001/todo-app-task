import React, { useState, useEffect } from "react";
import FilterData from "./FilterData";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ToDo_List = () => {
  const [filteredTodos, setFilteredTodos] = useState([])
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");
  const [filter, setFilter] = useState("all");
  const [filterPri, setFilterPri] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  // Add new task
  const addTodo = () => {
    if (input.trim()) {
      const newTodo = { text: input.trim(), completed: false, priority, show: true };
      const newTodos = [...todos, newTodo];
      newTodos.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      setTodos(newTodos);
      setInput("");
      localStorage.setItem("todos", JSON.stringify(newTodos));
      toast.success("Task added!");
    }
  };
  console.log(todos, 'todostodostodos')
  // Toggle task completion
  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Delete a single task
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    toast.error("Task deleted!");
  };

  // Delete all tasks
  const deleteAllTodos = () => {
    setTodos([]);
    localStorage.setItem("todos", JSON.stringify([]));
    toast.info("All tasks deleted!");
  };
  useEffect(() => {
    let updatedTodos = todos.map((todo) => {
      // Default show value
      todo.show = true;

      // Apply the filter for "completed" or "active"
      if (filter === "active") {
        todo.show = !todo.completed; // Show only active (incomplete) todos
      } else if (filter === "completed") {
        todo.show = todo.completed;  // Show only completed todos
      }

      // Apply the filter for "priority"
      if (filterPri === "high" && todo.show) {
        todo.show = todo.priority === "high"; // Show only high-priority todos
      } else if (filterPri === "medium" && todo.show) {
        todo.show = todo.priority === "medium"; // Show only medium-priority todos
      } else if (filterPri === "low" && todo.show) {
        todo.show = todo.priority === "low"; // Show only low-priority todos
      }

      return todo; // Return the updated todo object
    });

    console.log('updatedTodos', updatedTodos);
    setFilteredTodos(updatedTodos); // Update state with the modified todos
  }, [filter, filterPri, todos]);


  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  console.log(filteredTodos)
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
      <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">To-Do List</h1>
            <button
              onClick={toggleTheme}
              className="text-white bg-black rounded-full p-1 dark:text-black dark:bg-white flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>{" "}
              /
              < svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg >
            </button>
          </div>

          {/* Input Section */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>

          <div className="flex justify-between items-center">
            {/* Filter Section */}
            <FilterData setFilter={setFilter} filter={filter} setFilterPri={setFilterPri} filterPri={filterPri} />

            {/* Delete All Button */}
            <button
              onClick={deleteAllTodos}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete All
            </button>
          </div>

          {/* To-Do List */}
          <ul className="space-y-3">
            <AnimatePresence>
              {filteredTodos.map((todo, index) => (
                todo.show &&
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  style={{
                    backgroundColor: todo.completed
                      ? "rgb(253 164 175)"
                      : "inherit",
                  }}
                  className={`flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-md shadow ${todo.priority === "high"
                    ? "border-l-4 border-red-500"
                    : todo.priority === "medium"
                      ? "border-l-4 border-yellow-500"
                      : "border-l-4 border-green-500"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span
                    className="flex-grow ml-2"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text} ({todo.priority})
                  </span>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div >
  );
};

export default ToDo_List;
