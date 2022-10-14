import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom";
import AllRoutes from './AllRoutes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllquestions } from './actions/Question';
import { fetchAllUsers } from './actions/users';

function App() {
  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(fetchAllquestions())
    dispatch(fetchAllUsers())
  },[dispatch])
  
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <AllRoutes/>
      </Router>
      </div>
  );
}

export default App;
