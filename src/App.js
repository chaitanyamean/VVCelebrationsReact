import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Dashboard from './Dashboard';

import { Link } from "react-router-dom";
import { BrowserRouter,  Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* <Route path="invoices" element={<Invoices />} /> */}
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
