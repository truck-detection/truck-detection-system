import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screen/Login";
import Main from "./screen/Main";
import Signup from "./screen/Signup";
import ForgotUserid from "./screen/ForgotUserid";
import ForgotPw from "./screen/ForgotPw";
import Email from "./screen/Email";
import List from "./screen/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/user/sign-up" element={<Signup />} />
        <Route path="/user/find-id" element={<ForgotUserid />} />
        <Route path="/user/reset-password" element={<ForgotPw />} />
        <Route path="/user/confirm-sign-up" element={<Email />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;