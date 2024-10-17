import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from '../../../Firebase';
import {
  collection, limit, onSnapshot, query, where
} from 'firebase/firestore';

import { useState } from "react"
import { db } from "../../../Firebase"
export default function UserHeader() {

  // Should log "test@example.com"

  const email = sessionStorage.getItem("email")
  const nav = useNavigate()
  console.log(sessionStorage.getItem("email"));
  const logout = () => {
    if (window.confirm("Do you really want to logout?")) {
      auth.signOut()
      sessionStorage.clear()
      toast.success("Logout successfully")
      nav("/login")
    }
  }
  useEffect(() => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);

      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
      }
    }

    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    // Cleanup event listener on component unmount
    return () => {
      toggleSwitch.removeEventListener('change', switchTheme, false);
    };
  }, []);
  const [allCategory, setAllCategory] = useState([])
  useEffect(() => {
    const que = query(collection(db, "Category"), where("status", "==", true),limit(5)
    )
    onSnapshot(que, doc => {
      setAllCategory(
        doc.docs.map((el, index) => {
          return { id: el.id, data: el.data() }
        })
      )
    })
  }, [])

  return (
    <header className="fixed-top" id="site-header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">
            <span>V</span>endor<span>E</span>ase <i class="bi bi-house-gear-fill "></i>
          </Link>

          <button
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler collapsed"
            data-bs-target="#navbarScroll"
            data-bs-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon fa icon-expand fa-bars" />
            <span className="navbar-toggler-icon fa icon-close fa-times" />
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <Link aria-current="page" className="nav-link" to="/">
                  Home
                </Link>
                </li>
            
{/* 
               <li className="nav-item">
                  <Link aria-current="page" className="nav-link" to="/user/user-category">
                  Services
                  </Link>
               </li>  */}

               <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href=""
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                     Category
                </a>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                 <li className='text-dark'> <Link className="dropdown-item"  to={'/user/user-category/'}>All Category</Link></li>

                  {allCategory.map((el, index) => (
                    <li key={el.id}>
                      <Link className="dropdown-item" to={`/user/user-services/${el?.data?.Categoryname}`}>
                        {el?.data?.Categoryname}
                      </Link>

                    </li>
                  ))}
                </ul>
               </li>
            


    

             
                {!email ? (
                  <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Don't Have an account? Register Here
                    </Link>
                  </li>
                  </>
                ) : (
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/user/history">
                 History
              </Link>
            </li>
                  <li className="nav-item">
                  <a className='text-dark' onClick={logout} aria-current="page">
                    <span className="fa fa-user" /> Logout
                  </a>
                  </li>
                </>
                )}
          

            </ul>
          </div>
          <div className="cont-ser-position">
            <nav className="navigation">
              <div className="theme-switch-wrapper">
                <label className="theme-switch" htmlFor="checkbox">
                  <input id="checkbox" type="checkbox" />
                  <div className="mode-container">
                    <i className="gg-sun" />
                    <i className="gg-moon" />
                  </div>
                </label>
              </div>
            </nav>
          </div>
        </nav>
      </div>
    </header>
  );
}
