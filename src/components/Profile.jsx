/* eslint-disable react/prop-types */
import React, { useCallback, useContext } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import UserProfile from '../pages/dashboard/UserProfile'
import useCart from '../hooks/useCart'

const Profile = ({ user }) => {
  const {SignOUt} = useContext(AuthContext)
  const navigate = useNavigate();
  const [cart] = useCart();
  const handleLogOut = () => {
    SignOUt().then(() => {
      
    }).catch((error) => {
      console.log(error)
    });
    alert ("logout success!")
    navigate("/signup", {replace: true})
  }
  return (
    <div>       
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
            user.photoURL
            ?
            <img
            alt=""
            src={user.photoURL} />
            :
            <img
            alt=""
            src= "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"/>
          }
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile">          
            Profile
          </Link>
        </li>
        <li><a>Order</a></li>
        <li><a>Settings</a></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </div> 
    </div>
    
    
  )
}

export default Profile
