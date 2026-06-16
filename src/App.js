import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./UseContext/UserContext";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import History from "./Pages/History/History";
import loadingpage from "../src/Loading/Loading";
import ErrorHandling from "../src/ErrorHandling/ErrorHandling";

function App() {
  const [loadingpage, setLoadingpage] = useState(false);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loadingpage, setLoadingpage }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/History" element={<History />} />
          <Route path="/ErrorHandling" element={<ErrorHandling />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
