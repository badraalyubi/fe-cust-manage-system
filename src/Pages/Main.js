import React from 'react'
import Topmenu from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <Topmenu />
      <Outlet />
    </>
  )
}

export default Main;