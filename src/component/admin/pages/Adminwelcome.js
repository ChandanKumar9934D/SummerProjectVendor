import { Link } from "react-router-dom";
import {ClipLoader} from "react-spinners"
import { useEffect, useState } from "react";
import { collection, getCountFromServer, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../Firebase";

export default function Adminhome(){
	const [load,setLoad]=useState(true)   
	const [allTask , setTask] = useState([])
    const [cat,setCat]=useState(0)
    const [product,setProduct]=useState(0)
    const [order,setOrder]=useState(0)
    const [placeOrder,setPlaceOrder]=useState(0)
    const [user,setUser]=useState(0)


    useEffect(()=>{
        getCount1()
        getCount2()
        getCount3()
        getCount4()
        getCount5()
    },[])
  const getCount1=async ()=>{
    const coll = collection(db, "Category");
    const snapshot = await getCountFromServer(coll);
    setCat(snapshot.data().count);
    setTimeout(()=>{
        setLoad(false)
    },700)
  }
  const getCount2=async ()=>{
    const coll1 = collection(db, "Services");
    const snapshot1 = await getCountFromServer(coll1);
    setProduct(snapshot1.data().count);
  }
    const getCount3=async ()=>{
    const col2 = collection(db, "Vendors");
    const snapshot2 = await getCountFromServer(col2);
    setUser(snapshot2.data().count);
    }
    const getCount4=async ()=>{
      const coll3 = collection(db, "Booking");
      const snapshot3 = await getCountFromServer(coll3);
      setOrder(snapshot3.data().count);
  }
    const getCount5=async ()=>{
    //   const coll3 = collection(db, "orders", where("status","Placed"));
    //   const snapshot3 = await getCountFromServer(coll3);
    //   setPlaceOrder(snapshot3.data().count);
  }


    return(
    <>

<section className="inner-banner py-5">
    <div className="w3l-breadcrumb py-lg-5">
        <div className="container pt-5 pb-sm-4 pb-2">
            <h4 className="inner-text-title font-weight-bold pt-5">
                Welcome Admin!
            </h4>
            <ul className="breadcrumbs-custom-path">
                <li>
                    <a href="">Home</a>
                </li>
                <li className="active">
                    <i className="fas fa-angle-right mx-2" />
                    Admin
                </li>
            </ul>
        </div>
    </div>
</section>

      <div className="site-section">
      <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
       <div className={load==true?"d-none":"container my-5 text-capitalize"}>
        <div className="row g-5 justify-content-center">
          <div className="col-lg-12 col-md-12 " >
	          <section id="content">
		          <main>
                <div className="row justify-content-center">
                    {/* <div className="col-md-4 p-3">
                        <div className="card text-center p-3 shadow a">
                            <div>New Orders</div>
                            <h1>{placeOrder}</h1>
                        </div>
                    </div>     */}
                    <div className="col-md-6 p-3">
                        <div className="card text-center p-3 shadow a">
                            <div>Total Category</div>
                            <h1>{cat}</h1>
                        </div>
                    </div>    
                    <div className="col-md-6 p-3">
                        <div className="card text-center p-3 shadow a">
                            <div>Total Services</div>
                            <h1>{product}</h1>
                        </div>
                    </div>    
                    <div className="col-md-6 p-3">
                        <div className="card text-center p-3 shadow a">
                            <div>Total Vendors</div>
                            <h1>{user}</h1>
                        </div>
                    </div>    
                    <div className="col-md-6 p-3">
                        <div className="card text-center p-3 shadow a">
                            <div>Total Bookings</div>
                            <h1>{order}</h1>
                        </div>
                    </div>    
                </div>

		          </main>
	          </section>
          </div>
        </div>
      </div>
      </div>

    </>
    )
}