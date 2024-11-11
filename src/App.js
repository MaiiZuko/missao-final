import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/cadastro/RegisterForm';
import Login from './components/login/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
