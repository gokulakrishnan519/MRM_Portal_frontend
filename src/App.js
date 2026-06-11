import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./UseContext/UserContext";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <UserContext.Provider value={{}}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
