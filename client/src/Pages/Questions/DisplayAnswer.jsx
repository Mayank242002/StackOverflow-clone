import React from 'react'
import { Link } from 'react-router-dom'
import Aavtar from '../../components/Aavtar/Aavtar'
import "./Questions.css"
import moment from 'moment'
import { useLocation,useParams } from 'react-router-dom'
import copy from "copy-to-clipboard"
import { useSelector,useDispatch } from 'react-redux'
import { deleteAnswer } from '../../actions/Question'

const DisplayAnswer = ({question}) => {
    const location=useLocation();
    const {id}=useParams();
    const dispatch=useDispatch();

    const handleShare=()=>{
        copy("http://stack-overflow-mayank.netlify.com"+location.pathname);
        alert("Copied");
    }

    var user=useSelector((state)=>state.currentUserReducer);

    if (typeof(user)==="string")
      user=JSON.parse(user);

    const handleDelete=(answerId,noOfAnswers)=>{
        dispatch(deleteAnswer(id,answerId,noOfAnswers-1));
    }

    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={handleShare}>Share</button>
                                {
                                    user?.result?._id===ans?.userId && (<button type='button' onClick={()=>handleDelete(ans._id,question.noOfAnswers)}>Delete</button>)
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Aavtar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{ans.userAnswered.charAt(0).toUpperCase()}</Aavtar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer