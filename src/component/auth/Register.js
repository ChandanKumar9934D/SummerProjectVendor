import React, { useState,useEffect} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app,db,auth } from '../../Firebase';
import { setDoc,doc,collection ,Timestamp,getDoc} from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners"
import { FaUser } from 'react-icons/fa';


export default function Register() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [tc, setTc] = useState(false);


  const [load,setLoad]=useState(true)
  useEffect(()=>{
      setTimeout(()=>{
          setLoad(false)
      },500)
 },[])
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
    span.style.transform = 'translate(-50%, -50%) scale(0)';}
  const saveData = async (userId) => {
    try {
      let data = {
        name:name,
        email: email,
        address: address,
        contact: contact,
        state: state,
        userType: 2,
        status: true,
        createdAt: Timestamp.now()
      }
      await setDoc(doc(db, "users",userId), data)
    } catch (err) {
      console.log(err);
    }

  }
  const changeTc = (e) => {
    setTc(e.target.checked);
  };
  const nav = useNavigate()
  const handleForm = (e) => {
    e.preventDefault()
   
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentails) => {
        let userId=userCredentails.user.uid
        console.log(userCredentails);
        saveData(userId)
        toast.success("User register successfully")
      //   // nav('/login')
      return signInWithEmailAndPassword(auth, email, password)
      })
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
         toast.success("You've successfully logged in")
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
    const signUpgoogle=()=>{
      const provider=new GoogleAuthProvider()
      signInWithPopup(auth,provider)
      .then((userCredentails)=>{
        console.log(userCredentails);
      }).catch((err)=>{
        toast.error(err.message)
        console.log(err);
      })
    }  
  return (
    <div>
      <section className="inner-banner py-5">
        <div className="w3l-breadcrumb py-lg-5">
          <div className="container pt-5 pb-sm-4 pb-2">
            <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
              Register
            </h4>
            <ul className="breadcrumbs-custom-path">
              <li>
                <a href="">
                  Login
                </a>
              </li>
              <li className="active">
                <i className="fas fa-angle-right mx-2" />
                Register
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
<div className={load==true?"d-none":"map spad"}>
      <div className="container min-vh-100">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className='card p-4'> 
            <h2 className="text-center mb-4 register-animated-heading">Sign Up</h2>
            <form onSubmit={handleForm} >
            <div className="register-input-container ">
                <i className="fas fa-envelope icoon"></i>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="register-input-container ">
                <i className="fas fa-envelope icoon"></i>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="register-input-container">
                <i className="fas fa-lock icoon"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="register-input-container">
                <i className="fas fa-phone icoon"></i>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your contact"
                  minLength={10}
                  maxLength={10}
                  required
                />
              </div>
              <div className="register-input-container">
                <i className="fas fa-home icoon"></i>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  required
                ></textarea>
              </div>
              {/* <div className="register-input-container">
                <i className="fas fa-map-marker-alt icoon"></i>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option disabled selected value="">Select State</option>
                  <option>Punjab</option>
                  <option>Haryana</option>
                  <option>Gujarat</option>
                </select>
              </div> */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={changeTc}
                  required
                />
                <label className="form-check-label register-custom-label">I agree to the Terms and Conditions</label>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-style w-75"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              <h6 className='text-center mt-3 mb-3'> Or </h6>
              <div className="text-center">
                  <button
                    className="btn btn-lg btn-block btn-outline-dark text-uppercase position-relative w-75"
                    style={googleButtonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    type="button"
                    onClick={signUpgoogle}
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

            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}









