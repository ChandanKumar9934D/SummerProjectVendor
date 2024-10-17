import React, { useEffect } from 'react';
import './Admin.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from '../../../Firebase';

export default function Adminheader() {
  const email = sessionStorage.getItem("email");
  const nav = useNavigate();
  const logout=()=>{
    if(window.confirm("Do you really want to logout?")){
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

    return () => {
      toggleSwitch.removeEventListener('change', switchTheme, false);
    };
  }, []);

  return (
    <header className="fixed-top" id="site-header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">
            <span>V</span>endor<span>E</span>ase <i className="bi bi-house-gear-fill"></i>
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon fa icon-expand fa-bars" />
            <span className="navbar-toggler-icon fa icon-close fa-times" />
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/admin/add-category">Add Category</Link></li>
                  <li><Link className="dropdown-item" to="/admin/manage-category">Manage Category</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/admin/add-services">Add Services</Link></li>
                  <li><Link className="dropdown-item" to="/admin/manage-services">Manage Services</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Vendors
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/admin/add-vendors">Add Vendors</Link></li>
                  <li><Link className="dropdown-item" to="/admin/manage-vendors">Manage Vendors</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/booking">Booking</Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                   Booking
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/admin/booking">Booking</Link></li>
                  <li><Link className="dropdown-item" to="/admin/rating">Rating</Link></li>
                  <li><Link className="dropdown-item" to="/admin/review">Review</Link></li>
                  <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                </ul>
              </li> */}
              <li className="nav-item">
                {!email ? (
                  <Link to="/login" >
                    <span className="fa fa-user nav-link"/> Login
                  </Link>
                ) : (
                  <a onClick={logout} >
                    <span className="fa fa-user nav-link"/> Logout
                  </a>
                )}
              </li>
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
