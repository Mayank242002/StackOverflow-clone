import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import {auth} from "./FirebaseConfig";


export const setUpRecaptcha=(number)=>{
 const recaptchaVerifier=new RecaptchaVerifier('recaptcha-container', {}, auth);
 recaptchaVerifier.render();
 return signInWithPhoneNumber(auth,number,recaptchaVerifier);
}