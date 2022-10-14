import * as api from "../api"
import { setCurrentUser } from "./currentUser";

//Redux Thunk is middleware that allows you to return functions, rather than just actions, within Redux. This allows for delayed actions, including working with promises.
export const signup=(authData,navigate)=>async (dispatch)=>{
    try{
       const {data}= await api.signUp(authData)
       dispatch({type:'AUTH',data})
       dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
       navigate("/")
    }
    catch(error){
       console.log(error)
    }
};

export const login=(authData,navigate)=>async (dispatch)=>{
    try{
       const {data}= await api.logIn(authData)
       dispatch({type:'AUTH',data})
       dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
       navigate("/")
    }
    catch(error){
       console.log(error)
    }
};
