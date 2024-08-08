import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  const [authtoken, setAuthtoken] = useState(
    localStorage.getItem("authtoken") || ""
  );
  console.log(authtoken);

  useEffect(() => {
    localStorage.setItem("authtoken", authtoken);
  }, [authtoken]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthtoken={setAuthtoken} />} />
        <Route
          path="/signup"
          element={<SignUp setAuthtoken={setAuthtoken} />}
        />
        <Route
          path="/home"
          element={authtoken ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={authtoken ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
