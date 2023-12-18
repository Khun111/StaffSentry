import logo from './favicon.svg'
import Image from 'next/image'
import './styles.css'
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <nav className="nav">
      <div className="logo_con">
        <Image
          src={logo}
          alt="App logo"
          className='logo'
        />
        <h3>StaffSentry</h3>
      </div>
      <ul className="nav-list">
        <li className="list-item"><a href="">Home</a></li>
        <li className="list-item"><a href="">About</a></li>
        <li className="list-item"><a href="">Contact</a></li>
      </ul>
      
      {session ? <button><h4><a href="/api/auth/signout">Sign Out</a></h4></button> : <button><h4><a href="#signin">Sign In</a></h4></button>}
    </nav>
  )
}