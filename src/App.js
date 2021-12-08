import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Call from './Screens/Call';
import AddCall from './Screens/AddCall';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/call" element={<Call />} />
        <Route path="/addCall" element={<AddCall />} />
      </Routes>
    </Router>
  );
}

export default App;
