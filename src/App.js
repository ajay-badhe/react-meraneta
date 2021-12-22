import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Call from './Screens/Call';
import AddCall from './Screens/AddCall';
import RegisterList from './Screens/register/RegisterList';
import AddRegister from './Screens/register/AddRegister';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> :
        <Route path="/" element={<Login />} />
        <Route path="/call" element={<Call />} />
        <Route path="/addCall" element={<AddCall />} />
        <Route path="/register/list" element={<RegisterList />} />
        <Route path="/addRegister" element={<AddRegister />} />
        <Route path={`/register/edit/:id`} element={<AddRegister />} />





      </Routes>
    </Router>
  );
}

export default App;
