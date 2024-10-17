import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './booking.css'; // Adjust the CSS file path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { addDoc, collection, Timestamp,doc,getDoc } from 'firebase/firestore'; // Firestore functions
import { db } from '../../../Firebase';
import { Link, useNavigate, useParams,Navigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners"



export default function Booking() {
    const [serviceName, setServiceName] = useState('');
    const [email, setEmail] = useState(sessionStorage.getItem("email"));
    const [name, setName] = useState(sessionStorage.getItem("name"));
    const [contact, setContact] = useState(sessionStorage.getItem("contact"));
    const [bookingDate, setBookingDate] = useState('');
    const [address, setAddress] = useState(sessionStorage.getItem("address"));
    const [bookingTime, setBookingTime] = useState('');
    const [amount, setAmount] = useState('');
    const { id } = useParams();
    const [load,setLoad]=useState(true)
    const nav = useNavigate()
    // const userId=sessionStorage.getItem("userId")



    // const [tc, setTc] = useState(false);

    useEffect(()=>{
        getData()
        setTimeout(()=>{
            setLoad(false)
        },500)
      },[])
    
   
 
    const getData = async () => {
        setLoad(true);

        const ServiceRef = doc(db, "Services", id);
        const ServiceDoc = await getDoc(ServiceRef);
        if (ServiceDoc.exists()) {
    
            let productData = ServiceDoc.data();
            setServiceName(productData.Servicename);
            setAmount(productData.Serviceprice);

        } else {
            toast.error("Data doesn't exist");
        }
    };

    if(!email){
      toast.error("Please login")
      return nav("/login")
  }

    const userId=sessionStorage.getItem("userId")
    console.log("userId",userId)
    const handleForm = (e) => {
        e.preventDefault();
        setLoad(true);
      
      if (!userId) {
        toast.error("Please Login!!");
        nav("/login");
      } else {
        
          // Add new item
          let data = {
            serviceId:id,
            user: userId,
            serviceName: serviceName,
            bookingDate: bookingDate,
            time: bookingTime,
            amount: amount,
            userName:name,
            userEmail: email,
            userContact: contact,
            created: Timestamp.now(),
            status: "Pending"

          };


          addDoc(collection(db,"Booking"),data)
          toast.success("booking Done successfully!!")
          nav("/user/history");
          setName("");
          setEmail("");
          setContact("");
          setBookingDate("");
          setBookingTime("");
          setTimeout(()=>{
            setLoad(false)
        },500)



        //   getItemCart.push(newItem);
        //   toast.success("Booking successfully!");
        //   window.location.reload()
        }
    

      }

      const today = new Date().toISOString().split('T')[0];


    return (
        <div>
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
                             Booking
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="">User</a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                 Booking
                            </li>
                        </ul>
                    </div>
                </div>
            </section>



     <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-3 text-capitalize"}>
            <div className="container min-vh-100">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <h2 className="text-center mb-4 register-animated-heading" style={{ color: '#198754' }}>Booking</h2>
                            <form onSubmit={handleForm}>
                            <div className="register-input-container">
                                    <i className="fas fa-wrench icoon "></i>
                                    <input
                                        type="text"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        placeholder="Enter service name"
                                        required readOnly
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-user icoon"></i>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter User name"
                                        required
                                    />
                                </div>
                             
                                {/* <div className="register-input-container">
                                    <i className="fas fa-envelope icoon"></i>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        required 
                                    />
                                </div> */}
                                <div className="register-input-container">
                                    <i className="fas fa-phone icoon"></i>
                                    <input
                                        type="tel"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder="Enter contact"
                                        required
                                        minLength={10}
                                        maxLength={10}
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-calendar-alt icoon"></i>
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        placeholder="Enter booking date"
                                        required
                                        min={today}
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-clock icoon"></i>
                                    <input
                                        type="time"
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                        placeholder="Enter booking time"
                                        required
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-dollar-sign icoon"></i>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        required readOnly
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-home icoon"></i>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter Address"
                                        required 
                                    />
                                </div>
                                {/* <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={tc}
                                        onChange={changeTc}
                                        required
                                    />
                                    <label className="form-check-label register-custom-label">I agree to the Terms and Conditions</label>
                                </div> */}

                                <div className="text-center">
                                  
                                    <button className="btn btn-style w-75" type="submit">
                                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Book now
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
