import Header from "./layout/Header";
import { ClipLoader } from "react-spinners";
import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import moment from "moment";



export default function First() {

  const [data,setData]=useState([])
  const [load,setLoad]=useState(true)


  useEffect(()=>{
    var qry= query(collection(db,"Category"))

onSnapshot(qry, doc=>{
    setData(doc.docs.map((el,index)=>{
        return(
            {id:el.id, data:el.data()}
        )
      
    }))
    console.log(data)
})
setTimeout(()=>{
  setLoad(false)
},1000)


},[])

  return (
    <div>

      <section className="banner-19">
        <div className="banner-layer">
          <video
            autoPlay
            id="myVideo"
            loop
            muted
          >
            <source
              src="assets/videos/video.mp4"
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
          <div className="main-content-top">
            <div className="container">
              <div className="main-content">
                <h4>
                Convenient Online Home Services


                </h4>
                <p className="mt-3">

                Explore our expert home service solutions, ensuring your needs are met with care and precision.
                </p>
                <a
                  className="btn btn-style mt-md-5 mt-4"
                  href=""
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 text-capitalize"}>
      <section className="w3l-bottom-grids-6 py-5">
        <div className="container pt-lg-5 pt-md-4 pt-2">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="area-box">
                <i className="fas fa-stopwatch-20" />
                <h4>
                  <a
                    className="title-head"
                    href=""
                  >
                    Save Time and Money
                  </a>
                </h4>
                <p className="">
                  Experience convenience and savings with our services. We ensure efficiency and quality, so you can spend your time and money on what matters most.


                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-md-0 mt-4">
              <div className="area-box">
                <i className="fas fa-comments-dollar" />
                <h4>
                  <a
                    className="title-head"
                    href=""
                  >
                    Pay Online in Seconds
                  </a>
                </h4>
                <p className="">
                  Experience the convenience of fast and secure online payments. Our streamlined system ensures your transactions are quick, easy, and hassle-free.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-lg-0 mt-4">
              <div className="area-box">
                <i className="fas fa-thumbs-up" />
                <h4>
                  <a
                    className="title-head"
                    href=""
                  >
                    Satisfaction Guarantee
                  </a>
                </h4>
                <p className="">
                  We are committed to your satisfaction. Enjoy peace of mind with our top-quality services, designed to meet your needs and exceed your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w3l-about-2 py-5">
        <div className="container py-lg-5 py-md-4 py-2">
          <div className="row justify-content-between align-items-center pb-lg-5">
            <div className="col-lg-6 about-2-secs-right mb-lg-0 mb-5">
              <div className="image-box inverse position-relative">
                <div className="image-box__static">
                  <img
                    alt=""
                    height="459"
                    src="assets/images/ac.avif"
                    width="364"
                  />
                </div>
                <div className="image-box__float">
                  <img
                    alt=""
                    height="459"
                    src="assets/images/plumbing.jpg"
                    width="364"
                  />
                </div>

              </div>
            </div>
            <div className="col-lg-6 about-2-secs-left ps-lg-5 mt-lg-4 mt-5">
              <h5 className="sub-title">
                More than 25 Years of Experience
              </h5>
              <h3 className="title-style">
                We are passionate about our services
              </h3>
              <p className="mt-4">
                We uphold and practice the highest standards, free from any blame or fault, committed to delivering exceptional and reliable home services
              </p>
              <ul className="mt-4 list-style-lis">
                <li>
                  <i className="fas fa-check-circle" />
                  100% Customer Satisfaction
                </li>
                <li>
                  <i className="fas fa-check-circle" />
                  Free Collection & Delivery
                </li>
                <li>
                  <i className="fas fa-check-circle" />
                  Affordable Prices
                </li>
              </ul>
              <a
                className="btn btn-style mt-5"
                href=""
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="w3l-grids-block-5 pb-5 pt-md-2 pt-4">
        <div className="container pb-lg-5 pb-md-4 pb-2">
          <div
            className="title-main text-center mx-auto mb-md-5 mb-4"
            style={{
              maxWidth: '500px'
            }}
          >
            <h5 className="sub-title">
              What We Offer
            </h5>
            <h3 className="title-style">
              Our Services
            </h3>
          </div>
          <div className="row text-center justify-content-center">
          {data?.filter(el=>el?.data?.status==true).splice(0,3).map(
            (el,index)=>(
            <div className="col-lg-4 col-md-6 mt-lg-0 mt-4">
              <div className="servicecard-single">
                <div className="grids5-info position-relative">
                <img
                        className="flex-shrink-0 img-fluid rounded"
                        src= {el?.data?.image}
                        alt=""
                       
                      />
                </div>
                <div className="content-main-top">
                  <h4>
                    <a href="">
                    {el?.data?.Categoryname?.toUpperCase()}
                    </a>
                  </h4>
                  <p className="scrollable-text">
                    {el?.data?.Categorydescrption}
                     
                  </p>
                  <a
                    className="btn btn-style mt-4"
                    href="/user/user-category"
                  >
                    More
                  </a>
                </div>
              </div>
            </div>
             ))}
          </div>
        </div>
      </div>
      <section className="home-block-3 py-xl-4 py-2">
        <div className="row m-0 align-items-center">
          <div className="col-lg-6 left-w3l-img p-0">
            <img
              alt="card-image"
              className="img-fluid"
              src="assets/images/about3.jpg"
            />
          </div>
          <div className="col-lg-6 right-w3l-img mt-lg-0 mt-sm-4 mt-5">
            <div className="p-xl-5 p-sm-4 mx-xl-3">
              <h5 className="sub-title">
                Get 30% Discount
              </h5>
              <h3 className="title-style">
                Book Our Home Services
              </h3>
              <p className="sub-title mt-3">
              Our home services offer dependable and trustworthy solutions tailored to meet your needs. Whether it's cleaning, maintenance, or repairs, we ensure top-quality results with every visit.
              </p>
              <div className="row mt-5 pt-xl-4">
                <div className="col-sm-6 icon-style">
                  <i className="fas fa-tshirt" />
                  <div className="ab-detail">
                    <h4 className="title-head mb-sm-3 mb-2">
                      <a href="">
                      Thorough Home Care
                      </a>
                    </h4>
                    <p>
                    Our team provides comprehensive home care services, ensuring every corner of your house is spotless and well-maintained. 
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 icon-style mt-sm-0 mt-4">
                  <i className="fas fa-shipping-fast" />
                  <div className="ab-detail">
                    <h4 className="title-head mb-sm-3 mb-2">
                      <a href="">
                        Fast Delivery
                      </a>
                    </h4>
                    <p>
                    Our skilled professionals are committed to completing tasks efficiently, ensuring minimal disruption to your daily routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w3l-feature-8 py-5">
        <div className="container py-md-5 py-4">
          <div
            className="title-main text-center mx-auto mb-md-5 mb-4"
            style={{
              maxWidth: '500px'
            }}
          >
            <h5 className="sub-title">
              Pickup & Deliver
            </h5>
            <h3 className="title-style">
              How We Works
            </h3>
          </div>
          <div className="row features text-center justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="feature-body p-xl-4">
                <div className="feature-images position-relative">
                <i className="fas fa-search" /> 

                  <span>
                    1
                  </span>
                </div>
                <div className="feature-info mt-4">
                  <h3 className="feature-title">
                    <a href="">
                    Browse and Select Services

                    </a>
                  </h3>
                  <p className="feature-text">
                  Users explore various home services, reading descriptions and reviews to find the perfect match for their needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-md-0 mt-5">
              <div className="feature-body p-xl-4">
                <div className="feature-images position-relative">
                <i className="fas fa-calendar-check" />
                  <span>
                    2
                  </span>
                </div>
                <div className="feature-info mt-4">
                  <h3 className="feature-title">
                    <a href="">
                    Schedule and Book
                    </a>
                  </h3>
                  <p className="feature-text">
                  Users book their chosen service at a convenient time, ensuring a hassle-free appointment process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-lg-0 mt-5">
              <div className="feature-body p-xl-4">
                <div className="feature-images position-relative">
                <i className="fas fa-comments" />
                  <span>
                    3
                  </span>
                </div>
                <div className="feature-info mt-4">
                  <h3 className="feature-title">
                    <a href="">
                     service and Feedback
                    </a>
                  </h3>
                  <p className="feature-text">
                  After the service is completed, users provide feedback, helping maintain and improve service quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a
              className="btn btn-style mt-5"
              href="/user/user-category"
            >
              Book Our Services Now
            </a>
          </div>
        </div>
      </section>



    </div>
    </div>
  )
}