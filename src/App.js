import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";


import './App.css';

import Login from './login'
import SignUp from './SignUp'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<Login />} />
        {/* <SignIn /> */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter> 
  );
}





export default App;
