import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"



const Navbar = () => {
  
  const [prompt,setPrompt]=useState("")
  const [menu,setMenu]=useState(false)
  const navigate=useNavigate()
  const path=useLocation().pathname
  
  // console.log(prompt)
  

  const showMenu=()=>{
    setMenu(!menu)
  }
  
   
    const {user}=useContext(UserContext)
    
  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-blue-500">
    <p className="text-xl md:text-3xl font-extrabold "><Link to="/">Blog Market</Link></p>
    {path==="/" && <div className="flex justify-center items-center space-x-0">
    <div className="flex bg-white md:w-80 h-8 items-center rounded-lg" >
    <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer mx-1 my-1"><BsSearch/></p>
    <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 w-60" placeholder="Search a post" type="text"/>
    </div>
    </div>}
    <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 text-lg font-bold">
      {user? <h2 ><Link to="/write">Write</Link></h2> :<h2><Link to="/login">Login</Link></h2>}
      {user? <div onClick={showMenu}>
        <p className="cursor-pointer relative text-2xl mx-10"><FaBars/></p>
        {menu && <Menu/>}
      </div>:<h3><Link to="/register">Register</Link></h3>}
    </div>
    <div onClick={showMenu} className="md:hidden text-lg">
      <p className="cursor-pointer relative"><FaBars/></p>
      {menu && <Menu/>}
    </div>

    </div>
  )
}

export default Navbar 