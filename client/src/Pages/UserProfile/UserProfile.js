import React from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { useState } from 'react'

import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import Aavtar from '../../components/Aavtar/Aavtar'
import './UserProfile.css'
import ProfileBio from './ProfileBio'
import EditProfileForm from "./EditProfileForm"



const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    var currentProfile = users.filter((user) => user._id === id)[0]
    var currentUser = useSelector((state) => state.currentUserReducer)
    if (id[0]==='+')
        currentProfile=currentUser.result;
    const CurrentUserLocation=useSelector((state)=>state.locationReducer)
    console.log(CurrentUserLocation)

    if (typeof(currentUser)=="string")
      currentUser=JSON.parse(currentUser)
         
    const [Switch, setSwitch] = useState(false)

  return (
    <div className='home-container-1'>
    <LeftSideBar />
    <div className="home-container-2">
        <section>
            <div className="user-details-container">
                <div className='user-details'>
                    <Aavtar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                        {currentProfile?.name.charAt(0).toUpperCase()}
                    </Aavtar>
                    <div className="user-name">
                        <h1>{currentProfile?.name}</h1>
                        <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                    </div>
                </div>
                {
                    currentUser?.result._id === id && id[0]!=='+' && (
                       
                        <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                            <FontAwesomeIcon icon={faPen} /> Edit Profile
                        </button>

                    ) 
                }
            </div>
            {
                    currentUser?.result._id === id && (
                       <div>
                        <h4>User Current Location</h4>
                        <p>{CurrentUserLocation}</p>
                       </div>
                    ) 
                }
            <>
                {
                    Switch ? (
                        <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                    ) : (
                        <ProfileBio currentProfile={currentProfile}/>
                    )
                }
            </>
        </section>
    </div>
</div>
      )
}

export default UserProfile