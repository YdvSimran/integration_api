import  React, { useState } from "react";
import { BrowserRouter as Router , Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/homepage";
import CreatePassword from "./pages/CreatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import OTPGenerator from "./pages/OTPGenerator";

function App() {
  const [user,setUser]=useState();
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/create-password" element={<CreatePassword/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/otp-generator" element={<OTPGenerator/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
