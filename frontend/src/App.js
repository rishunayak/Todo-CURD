import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Todo from './Pages/Todo';
import AddTodo from './Pages/AddTodo';
import EditTodo from './Pages/EditTodo';
import Auth from './Auth/Auth';
import Navbar from './Pages/Navbar';

function App() {
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/todo' element={<Auth><Todo/></Auth>}/>
     </Routes>
    </>
  );
}

export default App;
