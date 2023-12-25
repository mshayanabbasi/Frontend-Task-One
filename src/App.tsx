import React from "react";
import "./App.css";
import Users from "./pages/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="bg-c_E4E5E6 min-h-screen">
      <Users />
      <ToastContainer />
    </div>
  );
};

export default App;
