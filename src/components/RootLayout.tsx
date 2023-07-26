import { Outlet } from "react-router-dom"
import { NavBar } from "./Navbar"


export const RootLayout=()=>{


  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}