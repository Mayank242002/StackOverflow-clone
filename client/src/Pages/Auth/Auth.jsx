import React from "react";
import { useState } from "react";
import "./Auth.css";
import favicon from "../../assets/favicon.png";
import Aboutauth from "./Aboutauth";
import {signup,login} from "../../actions/auth.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth=()=>{

   const[IsSignUp,setIsSignUp]=useState(false);
   const[name,setName]=useState('');
   const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   
   const navigate=useNavigate();
   const dispatch=useDispatch();

   const handleSwitch=()=>{
        setIsSignUp(!setIsSignUp);
   }

   const handleSubmit=(e)=>{
    e.preventDefault();
    if (!name && !password)
      alert("Please enter name and password");
    if (IsSignUp)
    {
      if (!name)
         alert("Please enter Your Name");
      dispatch(signup({name,email,password},navigate));
    }
    else
      dispatch(login({email,password},navigate));

   }
   
   return (
      <section className="auth-section">
         {IsSignUp && <Aboutauth/>}
       <div className="auth-container-2">
         {!IsSignUp && <img src={favicon} alt="login-logo" className="login-logo"/>}
         <form onSubmit={handleSubmit}>
         { IsSignUp && 
            <label>
              <h4>Display Name</h4>
              <input type="text" id="name" name="name" onChange={(event)=>{setName(event.target.value)}}/>
             </label>
         }
            <label htmlFor="email">
               <h4>Email</h4>
               <input type="email" id="email" name="email" onChange={(event)=>{setEmail(event.target.value)}}/>
            </label>
            <label htmlFor="password">
               <div  style={{display:"flex", justifyContent:"space-between"}}>
                <h4>Password</h4>
                {!IsSignUp && <p style={{ color: "#007ac6", fontSize:'13px'}}>forgot password?</p>}
               </div>
               <input type="password" id="password" name="password" onChange={(event)=>{setPassword(event.target.value)}}/>
               { IsSignUp && <p style={{ color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight<br />characters, including at least 1 letter and 1<br /> number.</p> }
            </label>
            {
                        IsSignUp && (
                            <label htmlFor='check'>
                                <input type="checkbox" id='check'/>
                                <p style={{ fontSize:"13px"}}>Opt-in to receive occasional,<br />product updates, user research invitations,<br />company announcements, and digests.</p>
                            </label>
                        )
            }
            <button type="submit" className="auth-btn">{IsSignUp?'Sign Up':'Log In'}</button>
            {
                        IsSignUp && (
                            <p style={{ color: "#666767", fontSize:"13px"}}>
                                By clicking “Sign up”, you agree to our 
                                <span style={{ color: "#007ac6"}}> terms of<br /> service</span>,
                                <span style={{ color: "#007ac6"}}> privacy policy</span> and 
                                <span style={{ color: "#007ac6"}}> cookie policy</span>
                            </p>
                        )
             }
         </form>
         <p>{IsSignUp?"Already have an account":"Don't have an account"}</p>
         <button className="handle-switch-btn" onClick={handleSwitch}>{IsSignUp?'Log in':'Sign up'}</button>
       </div>
      </section>
   );

   }
export default Auth;