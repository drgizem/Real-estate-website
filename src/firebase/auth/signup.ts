import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {auth} from "../firebase"


export default async function signup(email:string,password:string,name:string){
  let result=null
  let error=null
  try{
    result=await createUserWithEmailAndPassword(auth,email,password)
    .then(()=>{
      updateProfile(auth.currentUser!,{
        displayName:name
      })
    })
  }catch(e){
    error=e
  }
  return {result,error}
}