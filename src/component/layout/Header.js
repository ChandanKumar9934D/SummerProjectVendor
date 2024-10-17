import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
              {/* <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/user/user-category">
                  Services
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li> */}
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
            </ul>
            {/* <form action="#error" className="d-flex search-header ms-lg-2" method="GET">
              <input
                aria-label="Search"
                className="form-control"
                placeholder="Enter Keyword..."
                required
                type="search"
                style={{height:'39px'}}
              />
              <button className="btn btn-style" type="submit">
                <i className="fas fa-search " />
              </button>
            </form> */}
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
