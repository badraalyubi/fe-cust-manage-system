import React from 'react'
import Topmenu from '../Components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../services/utils';

const Main = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn()) {
      return navigate('/dashboard');
    }
    return navigate('/login');
  }, [])
  return (
    <>
      <Topmenu />
      <Outlet />
    </>
  )
}

export default Main;