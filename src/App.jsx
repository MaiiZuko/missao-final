import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/page-icones/UserContext';
import RegisterForm from './components/cadastro/RegisterForm';
import Login from './components/login/Login';
import Home from './components/home/Home';
import UserProfile from './components/personalizar/UserProfile';
import IconPage from './components/page-icones/IconPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<RegisterForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/personalizar" element={<UserProfile />} />
            <Route path="/icones" element={<IconPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
