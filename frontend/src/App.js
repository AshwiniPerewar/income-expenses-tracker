import './App.css';
import Login from './components/Forms/Login';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Forms/Register';
import AddTransaction from './components/Forms/AddTransaction.jsx';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/add-transaction" element={<AddTransaction/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
