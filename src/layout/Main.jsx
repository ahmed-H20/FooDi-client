import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import '../App.css';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../components/Loading';


const Main = () => {
  const {loading} = useContext(AuthContext)
  return (
    <div>
      {
        loading ? 
        <Loading/>
        :
        <div>
          <Nav/>
          <Outlet/>
          <Footer/>
        </div>
      }
    </div>
    
  )
}

export default Main;
