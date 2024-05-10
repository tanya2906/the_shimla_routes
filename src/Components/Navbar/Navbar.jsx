import React ,{useState}from 'react';
import './Navbar.css';
import { IoIosClose ,IoIosMore } from "react-icons/io";
const Navbar = () => {
  const[active,setActive]=useState('navBar');
  const[closeBTN,setCloseBTN]=useState('NO_close_option');
  const showNav=()=>{
    setActive('navBar activeNavBar');
    setCloseBTN('closeNavBar');
  }
  const removeNav=()=>{
    setActive('navBar');
    setCloseBTN('NO_close_option');
  }
  return (
    <section className='navbarSection'>
      <header className='header flex'>
        <div className='logoDiv'>
          <h1 id="logo">The Shimla Routes</h1>
        </div>
        <div className={active}>
          <ul className='navList flex'>
            <li className='navItem'>
              <a href="#" className='navLink'>Home</a>
            </li>
            <li className='navItem'>
              <a href="#home" className='navLink'>Check Routes</a>
            </li>
            <li className='navItem'>
              <a href="#gallery" className='navLink'>Gallery</a>
            </li>
            <li className='navItem'>
              <a href="#footer" className='navLink'>Feedback</a>
            </li>
          </ul>
          <div onClick={removeNav} className={closeBTN}>
          <IoIosClose  className='icon'/>
          </div>
        </div>
        <div onClick={showNav} className='toggleNavBar'>
        <IoIosMore className='icon'/>
        </div>
      </header>
    </section>
  )
}

export default Navbar
