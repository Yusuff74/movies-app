import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MovieProvider } from "./MovieContext";
import MoviesTable from "./common/MoviesTable";
import Register from "./common/Regsiter";
import NewMovie from "./common/NewMovie";
import NavBar from "./common/Navbar";
import Login from "./common/Login";
import Logout from "./common/Logout";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      setUser(token);
    } catch (error) {}
  }, []);

  return (
    <React.Fragment>
      <NavBar user={user} />

      <MovieProvider>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/movies" element={<MoviesTable user={user} />} />
          <Route path="*" element={<Navigate to="/movies" replace />} />
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/register" element={<Register user={user} />} />
          <Route
            path="/movies/:movieId"
            element={!user ? <Navigate to="/login" replace /> : <NewMovie />}
          />
          <Route
            path="/movies/newmovie"
            element={!user ? <Navigate to="/login" replace /> : <NewMovie />}
          />
        </Routes>
      </MovieProvider>
    </React.Fragment>
  );
}

export default App;
