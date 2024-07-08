// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";

import CourtList from "./CourtList/CourtList";
import BookingPage from "./BookingPage/BookingPage";
import MyGames from "./MyGames/MyGames";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/courtList" element={<CourtList />} />
        <Route path="/mygames" element={<MyGames />} />
        <Route path="/booking/:courtId" element={<BookingPage />} />
      </Routes>
    </div>
  );
}

export default App;
