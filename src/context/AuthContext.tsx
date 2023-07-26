import { createContext, useContext, useEffect, useState } from "react";
import { Filter, User } from "../types";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase/firebase"


export const AuthContext=createContext({
  email:"",
  name:"",
  uid:"",
  query:{} as Filter
})

export const useAuthContext=()=>useContext(AuthContext)

export const AuthContextProvider=({children}:{ children: React.ReactNode })=>{
  const[user,setUser]=useState<User>(JSON.parse(localStorage.getItem("user") || "null") || {
    email:"",
    name:"",
    uid:"",
    query:{
      room:"",
      bathroom:"",
      price:"",
      parking:"",
      pet:"",
      type:""
    }
  })
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser({
          email:user.email!,
          name:user.displayName!,
          uid:user.uid,
          query:{} as Filter
        })
      }else{
        setUser({
          email:"",
          name:"",
          uid:"",
          query:{} as Filter
        })
      }
      setLoading(false)
    })
    return ()=>unsubscribe()
  },[])
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user))
  },[user])


  return(
    <AuthContext.Provider value={user}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}