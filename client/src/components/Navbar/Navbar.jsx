import React,{useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Aavtar from "../Aavtar/Aavtar";
import {useSelector,useDispatch} from "react-redux";
import "./Navbar.css"
import { setCurrentUser } from "../../actions/currentUser";
import decode from "jwt-decode"


const Navbar=()=>{
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  var currentUser = useSelector((state) => state.currentUserReducer)

  if (typeof(currentUser)=="string")
      currentUser=JSON.parse(currentUser)

  var user=useSelector((state)=>(state.currentUserReducer));
  if (typeof(user)==="string")
      user=JSON.parse(user);

   
  useEffect(()=>{

   const token=user?.token;
   if (token)
   {
    const decodedToken=decode(token);
    if (decodedToken.exp*100< new Date().getTime())
       handleLogout();
   }
    
    
     dispatch(setCurrentUser(localStorage.getItem('Profile')))
  },[dispatch])

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
    navigate("/");
    dispatch(setCurrentUser(null));
  }

    return (
        <nav className="main-nav">
           <div className="navbar">
             <Link to="/" className="nav-item nav-logo">
                <img src={logo} alt="logo" />
             </Link>
             <Link to="/about" className="nav-item nav-btn">About</Link>
             <Link to="/Products" className="nav-item nav-btn">Products</Link>
             <Link to="/Teams" className="nav-item nav-btn">Teams</Link>
             <form action="">
              <input type="text" placeholder="search" />
              <img src={search} alt="search" width="18" className="search-icon" />
             </form>
             {user === null?
             <Link to="/Auth" className="nav-item nav-links">Log in</Link>:
             <>             
               <Aavtar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${currentUser.result._id}`} style={{color:"white", textDecoration:'none'}}>{user.result.name.charAt(0)}</Link></Aavtar>
             <button className="nav-item nav-links" onClick={handleLogout}>Log out</button>
             </>
             }        
           </div>
        </nav>
    )
}


export default Navbar;