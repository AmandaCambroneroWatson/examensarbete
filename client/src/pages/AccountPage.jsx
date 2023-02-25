
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { UserContext } from '../context/UserContext'
import AccommodationsPage from './AccommodationsPage';

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'account';
  }

  async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);

  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
return (
  <div>
    <AccountNav/>
    {subpage === 'account' && (
      <div className="text-center max-w-lg mx-auto text-neutral-800">
        Welcome to your account page: {user.name} <br />
        Account information: <br />
         Name: {user.name} <br />
         Email: {user.email}:<br />
        <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
      </div>
    )}
    {subpage === 'accommodations' && (
      <AccommodationsPage/>
    )}
  </div>
)
}
