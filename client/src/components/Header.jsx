import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export default function Header() {
  const {user} = useContext(UserContext);
  return (
      <header className="sticky md:flex md:items-center md:justify-between">
          <Link to={'/'} className="relative flex items-center h-10 cursor-pointer my-auto">
        <div className="bg-primary text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                    </svg>
                </div>
                <span className="font-bold text-xl">ACW Accommodations</span>
      </Link>
      
      <Link to={user?'/account':'/login'} className="flex items-center gap-1  rounded-full py-2 px-4 ">
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
       
        {user ? user.name : (
          <div className="navItems">

            {!user && <Link to="/register"><button className="bg-neutral-200 rounded-2xl p-2">Sign up</button></Link>}
            <Link to="/login"><button className="ml-2 bg-neutral-200 rounded-2xl p-2">Login</button></Link>
          </div>
        )}
      </Link>
    </header>
  );
}