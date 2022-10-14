import React from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSIdeBar'
import QuestionsDetails from './QuestionsDetails'

const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
      <LeftSideBar/>
      <div className="home-conatiner-2">
        <QuestionsDetails/>
          <RightSideBar/>
      </div>
        
   </div>
  )
}

export default DisplayQuestion;