import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

import Login from './Components/Login';
import Protected from './Components/Protected';

import Register from './Components/Register';



function App() {
  return (
    <Router>
      <div className="App">
        {/* This header can be shown globally */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        {/* Routed content will replace this */}
        <main>
          <Routes>

            
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/protected" element={<Protected />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('/api/home/')
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message || 'Loading...'}</p>
    </div>
  );
}

function TestLogin() {
  return <h1>Login to Your Account</h1>;
}

export default App;

