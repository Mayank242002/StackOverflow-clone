import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { setUpRecaptcha } from '../../Firebase/Firebase'
import "./LoginWithOtp.css";
import { useAsyncError, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import {login} from "../../actions/auth.js";

const LoginWithOtp = () => {
    const [number,setNumber]=useState("");
    const [otp,setOtp]=useState("");
    const [flag,setFlag]=useState(false);
    const [confirmObj,setconfirmObj]=useState("");
    const [id,setId]=useState("");
   
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const flagforotp=true;

    const getOtp=async (e)=>{
      e.preventDefault();
      if (number==="" || number===undefined) return;
      try{
        const response = await setUpRecaptcha(number);
        setconfirmObj(response);
        setFlag(true);
        setId(number);
      }catch(error)
      {
        console.log(error);
      }
    }


    const verifyOtp=async (e)=>{
      e.preventDefault();
      if (otp==="" || otp===null)return;
      try{
        await confirmObj.confirm(otp);
        console.log("successfuly logged in")
        dispatch(login({number,id,flagforotp},navigate))
      }catch(error)
      {
        console.log(error);
      }
    }
    
  return (
    <div  className='auth-section'>
    <div className='auth-container-2'>    
        <h4>Phone Login</h4>
       <form onSubmit={getOtp} style={{display:!flag?"block":"none"}}>
       <PhoneInput
          placeholder="Enter phone number"
          value={number}
          defaultCountry="IN"
          onChange={setNumber}/>
          <div id='recaptcha-container'></div>
          <button type="submit" className="auth-btn">Send OTP</button>
         </form>

      <form onSubmit={verifyOtp} style={{display:flag?"block":"none"}}>
          <input type="text" placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)} />
          <button type="submit" className="auth-btn">Verify OTP</button>
         </form>
      
    </div> 
    </div>
      
  )
}

export default LoginWithOtp;