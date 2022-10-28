import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom";
import AllRoutes from './AllRoutes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllquestions } from './actions/Question';
import { fetchAllUsers } from './actions/users';
import ChatBot from "./Chatbot/ChatBot"
import axios from 'axios';
import { SetLocation } from './actions/Location';

function App() {
  const [latitude,setLatitude]=useState("");
  const [longitude,setLongitude]=useState("");
  const [CurrentUserLocation,setCurrentUserLocation]=useState("");

  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(fetchAllquestions())
    dispatch(fetchAllUsers())
  },[dispatch])


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position.coords)
     setLatitude(position.coords.latitude);
     setLongitude(position.coords.longitude);
    }) 
  },[])

  useEffect(()=>{
    const API_key=process.env.REACT_APP_OPEN_WEATHER_API_KEY;

     axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_key}`).then((response)=>{
      console.log(response.data[0].name);  
      console.log(response.data[0].state);
      console.log(response.data[0].country);
      setCurrentUserLocation(response.data[0].name+", "+response.data[0].state+", "+response.data[0].country)
      dispatch(SetLocation(CurrentUserLocation))
    })
  })
  
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <ChatBot/>
        <AllRoutes/>
      </Router>
      </div>
  );
}

export default App;
