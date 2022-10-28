import React from "react";
import "./HomeMainBar.css";
import QuestionList from "./QuestionList";
import {Link,useLocation,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";


const HomeMainBar=()=>{

    var user=null;
    const navigate=useNavigate();
    
    const checkAuth=()=>{
        if (user==null)
        {
            alert("Please login or sigin to ask a question");
            navigate("/Auth");
        }
        else{
            navigate("/AskQuestion");
        }
    }
    user=useSelector((state)=>state.currentUserReducer);
    const questionsList=useSelector((state)=>state.questionsReducer)
    
    
        const location = useLocation();

    return(
        <div className="main-bar">
            <div className="main-bar-header">
                {
                    location.pathname === "/"?<h1>Top Questions</h1>:<h1>All Questions</h1>
                }
                <button className="ask-btn" onClick={checkAuth}>Ask Question</button>
            </div>
            <div>
                {
                    questionsList.data==null?
                    <h1>Loading....</h1>:
                    <>
                       <p>{questionsList.data.length} questions</p>
                       <QuestionList questionsList={questionsList.data}/>
                    </>
                }
            </div>
            
            

        </div>
    );
}


export default HomeMainBar;