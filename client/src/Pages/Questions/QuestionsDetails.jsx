import React,{useState} from 'react'
import {Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import upvote from "../../assets/sort-up.svg"
import downvote from "../../assets/sort-down.svg"
import Aavtar from '../../components/Aavtar/Aavtar'
import DisplayAnswer from "./DisplayAnswer"
import "./Questions.css";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteQuestion, postAnswer,Votequestion } from '../../actions/Question'
import moment from "moment";
import copy from "copy-to-clipboard"




const QuestionsDetails = () => {

  const [Answer,setAnswer]=useState("");

  const {id}=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const url="http://localhost:3000"

  const questionsList=useSelector((state)=>state.questionsReducer)
  var user=useSelector((state)=>state.currentUserReducer);

  if (typeof(user)==="string")
      user=JSON.parse(user);

    
  const handlePostAns=(e,answerLength)=>{
     e.preventDefault();
     if (user===null)
     {
        alert("Please sign up or login");
        navigate("/Auth");
     }
     else if (Answer==="")
        alert('Enter an answer before submitting')
     else
        dispatch(postAnswer({id,noOfAnswers:answerLength+1, answerBody:Answer, userAnswered:user.result.name,userId:user?.result?._id}));
  }

  const handleShare=()=>{
    copy(url+location.pathname);
    alert("Copied");
  }

  const handleDelete=()=>{
    dispatch(deleteQuestion(id,navigate))
  }

  const handleUpvote=()=>{
   dispatch(Votequestion(id,"Upvote",user.result._id))
  }

  const handleDownvote=()=>{
    dispatch(Votequestion(id,"Downvote",user.result._id))
  }

  return (
    <div className='question-details-page'>
      {
         questionsList.data===null?
         <h1>Loading...</h1>:
         <>
          {
            questionsList.data.filter((question)=>(question._id===id)).map((question)=>(
                <div key={question._id}>
                <section className='question-details-container'>
                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className="question-votes">
                                            <img src={upvote} alt="" width='18' className='votes-icon' onClick={handleUpvote} />
                                            <p>{question.upVote.length- question.downVote.length}</p>
                                            <img src={downvote} alt="" width='18' className='votes-icon' onClick={handleDownvote}/>
                                        </div>
                                        <div style={{width: "100%"}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className="question-details-tags">
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className="question-actions-user">
                                                <div>
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {
                                                        user?.result?._id===question?.userId && (<button type='button' onClick={handleDelete}>Delete</button>)
                                                    }
                                                    
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                    <Aavtar backgroundColor="orange" px='8px' py='5px' borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Aavtar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} Answers</h3>
                                            <DisplayAnswer key={question._id} question={question}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Answer</h3>
                                    <form onSubmit={(e)=>{handlePostAns(e,question.answer.length)}}>
                                        <textarea name="" id="" cols="30" rows="10" onChange={(e)=>(setAnswer(e.target.value))}></textarea><br />
                                        <input type="Submit" className='post-ans-btn' value='Post Your Answer'/>
                                    </form>
                                    <p>
                                        Browse other Question tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                            ))
                                        } or 
                                        <Link to='/AskQuestion' style={{textDecoration: "none", color:"#009dff"}}> ask your own question.</Link>
                                    </p>
                                </section>
              </div>
              ))}

         </>

      }
    </div>
  )
}

export default QuestionsDetails