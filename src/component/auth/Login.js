import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { auth, db } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc,getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import { ClipLoader } from "react-spinners"


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load,setLoad]=useState(true)


    useEffect(()=>{
setTimeout(()=>{
  setLoad(false)
},1000)


},[])

  const nav=useNavigate()
  const handleForm=(e)=>{
    e.preventDefault()
   signInWithEmailAndPassword(auth, email, password)
   .then(async (userCredentails)=>{
    let user_id=userCredentails.user.uid
   const docRef= doc(db,"users",user_id)
   let docData=await getDoc(docRef)
   if(docData.exists()){
    const userData=docData.data()
    sessionStorage.setItem("name",userData.name)
    sessionStorage.setItem("email",userData.email)
    sessionStorage.setItem("contact",userData.contact)
    sessionStorage.setItem("address",userData.address)
    sessionStorage.setItem("userId",user_id)
    sessionStorage.setItem("userType",userData.userType)
    if(userData.userType==1){
      console.log(userData);
      toast.success(
        <div>
          <FaUser style={{ marginRight: '8px', color: '#198754' } } />
          WELCOME ADMIN
        </div>)
      nav("/admin")
    }else{
      toast.success("Welcome back! You've successfully logged in")
      nav("/")
    }
   }else{
    toast.error("No data found")
   }
   }).catch((err)=>{
    console.log(err);
    toast.error(err.message)
   })
  }


  const linkStyle = {
    color: '#198754',
    textDecoration: 'none',
  };

  const buttonStyle = {
    backgroundColor: '#198754',
    color: '#fff',
    borderRadius: '30px',
    padding: '12px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const googleButtonStyle = {
    backgroundColor: '#fff',
    color: '#198754',
    borderRadius: '30px',
    padding: '12px 20px',
    border: '2px solid #198754',
    cursor: 'pointer',
    fontSize: '16px',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const glowEffect = {
    position: 'absolute',
    content: '""',
    top: '50%',
    left: '50%',
    width: '300%',
    height: '300%',
    background: 'rgba(25, 135, 84, 0.5)',
    borderRadius: '50%',
    zIndex: '0',
    transition: 'all 0.6s ease',
    transform: 'translate(-50%, -50%) scale(0)',
  };

  const handleMouseEnter = (e) => {
    const button = e.currentTarget;
    const span = button.querySelector('span');
    span.style.width = `${button.offsetWidth * 2}px`;
    span.style.height = `${button.offsetWidth * 2}px`;
    span.style.transform = 'translate(-50%, -50%) scale(1)';
  };

  const handleMouseLeave = (e) => {
    const button = e.currentTarget;
    const span = button.querySelector('span');
    span.style.width = '0';
    span.style.height = '0';
    span.style.transform = 'translate(-50%, -50%) scale(0)';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      {/* Inner Banner Section */}
      <section className="inner-banner py-5">
        <div className="w3l-breadcrumb py-lg-5">
          <div className="container pt-5 pb-sm-4 pb-2">
            <h4 className="inner-text-title font-weight-bold pt-5">Login</h4>
            <ul className="breadcrumbs-custom-path">
              <li>
                <a href="">Home</a>
              </li>
              <li className="active">
                <i className="fas fa-angle-right mx-2" />
                About
              </li>
            </ul>
          </div>
        </div>
      </section>


      <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
<div className={load==true?"d-none":"map spad"}>

      {/* Login Section */}
      <section className="login-section py-5">
        <div className="container">
          <div className="row">
            {/* Left Box with Image */}
            <div className="col-md-6 d-flex align-items-center">
              <img
                src="assets/images/computer.png"
                className="img-fluid"
                style={{ maxWidth: '100%' }}
              />
            </div>

            {/* Right Box with Login Form */}
            <div className="col-md-6">
              <div className="login-form-container p-4 rounded shadow">
                <h2 className="text-center mb-4" style={{ color: '#198754' }}>
                  Welcome Back!
                </h2>

                <form onSubmit={handleForm}>
                  {/* Email Input */}
                  <div className="login-input-container">
                    <i className="fas fa-envelope icoon"></i>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="inputEmail"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="login-input-container">
                    <i className="fas fa-lock icoon"></i>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="inputPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Remember Me Checkbox and Forgot Password Link */}
                  {/* <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberCheck"
                      />
                      <label
                        htmlFor="rememberCheck"
                        className="form-check-label"
                      >
                        Remember Me
                      </label>
                    </div>
                    <Link to="#" style={linkStyle}>
                      Forgot Password?
                    </Link>
                  </div> */}

                  {/* Login Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-lg btn-block text-uppercase position-relative w-75"
                      style={buttonStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      Login
                      <span style={glowEffect}></span>
                    </button>
                  </div>
                </form>

            
                <p className="text-center mt-1 mb-1">Or</p>

                <div className="text-center">
                  <button
                    className="btn btn-lg btn-block btn-outline-dark text-uppercase position-relative w-75"
                    style={googleButtonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src="assets/images/google.png"
                      alt="Google Logo"
                      className="me-2"
                      style={{ width: '20px' }}
                    />
                    Sign In with Google
                    <span style={glowEffect}></span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center mt-4">
                  Don't have an account?{' '}
                  <Link to="/register" style={linkStyle}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
