
import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import {Routes,Route} from "react-router-dom";
import Signup from './Components/Signup';

function App() {
  return (
  <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      
      </Routes>
  </>
  );
}


export default App;
