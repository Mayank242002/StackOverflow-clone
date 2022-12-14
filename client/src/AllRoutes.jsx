import React from "react";
import { Route, Routes } from 'react-router';
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import Questions from "./Pages/Questions/Questions";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";
import LoginWithOtp from "./Pages/Auth/LoginWithOtp";

const AllRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Auth" element={<Auth/>}/>
            <Route path="/Questions" element={<Questions/>}></Route>
            <Route path="/AskQuestion" element={<AskQuestion/>}></Route>
            <Route path="/Questions/:id" element={<DisplayQuestion/>}></Route>
            <Route path="/Tags" element={<Tags/>}/>
            <Route path="/Users" element={<Users/>}/>
            <Route path="/Users/:id" element={<UserProfile/>}/>
            <Route path="/LoginWithOtp" element={<LoginWithOtp/>}></Route>
        </Routes>
    );
}

export default AllRoutes;