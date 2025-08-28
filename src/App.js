import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterScreen from './RegisterScreen.jsx';
import LoginScreen from './LoginScreen.jsx';
import DashboardScreen from './DashboardScreen.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </Router>
  );
}
export default App;
