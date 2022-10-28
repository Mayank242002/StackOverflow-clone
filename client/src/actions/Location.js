export const SetLocation=(LocationData)=>async(dispatch)=>{
    try{
        dispatch({type:"SET_LOCATION",payload:LocationData})
    }
    catch(error)
    {
        console.log(error);
    }
};