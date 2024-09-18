import React from "react";
import ToDo_List from "./Components/ToDo_List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

function App() {
  return (
    <>
      <ToDo_List />
      <ToastContainer />
    </>
  );
}

export default App;

