import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./UseContext/UserContext";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import History from "./Pages/History/History";

function App() {
  return (
    <BrowserRouter>
      <UserContext.Provider value={{}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/History" element={<History />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
