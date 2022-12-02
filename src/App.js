import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
