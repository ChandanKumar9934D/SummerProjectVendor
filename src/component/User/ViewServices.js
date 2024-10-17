import { collection, onSnapshot, orderBy, query,where,doc,getDoc,getDocs, Timestamp} from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate, useParams,Link } from "react-router-dom"
import { db } from "../../Firebase"
import { toast } from "react-toastify"
import "./view.css"
import { ClipLoader } from "react-spinners"
export default function Product(){
  const [data,setData]=useState([])
  const [load,setLoad]=useState(true)
  const nav=useNavigate()

  const {category}=useParams()
  useEffect(()=>{
    getData()
  },[category])

  const getData = async () => {
    setLoad(true); // Set loading to true when starting the data fetch
  
    if (category) {
      try {
        const productsRef = collection(db,'Services');
        // console.log(productsRef);
        const q = query(productsRef, where('Servicecategory', '==', category));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          toast.error("No data found for this category.");
        } else {
          const productsList = [];
          querySnapshot.forEach(doc => {
            productsList.push({ id: doc.id, ...doc.data() });
          });
          setData(productsList);
          console.log("data is:",data)
        }
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
      } finally {
        setLoad(false); // Always set loading to false when done
      }
    } else {
      toast.error("Category is not specified.");
      nav("/user/user-category"); // Navigate to shop if no category is specified
    }
  };



  
    return (
        <div>
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5">
                            Services
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="">Home</a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                Services
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

      <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 text-capitalize"}>
            <div className="w3l-grids-block-5 py-5">
                <div className="container py-lg-5 py-md-4 py-2">
                   
                    <div className="row text-center justify-content-center">
                    <div className="container py-lg-5 py-md-4 py-2">
                    <div
                        className="title-main text-center mx-auto mb-md-5 mb-4"
                        style={{
                            maxWidth: '500px'
                        }}
                    >
                        <h5 className="sub-title">What We Offer</h5>
                        <h3 className="title-style">Our Services</h3>
                        
                    </div>
                    <div className="row text-center justify-content-center">
                    {
                    data?.length>0 ?
                    data?.filter(el=>el?.status==true).map(
                     (el,index)=>( 

                            <div className="col-lg-4 col-md-6 mt-4">
                                <div className="servicecard-single">
                                    <div className="grids5-info position-relative">
                                        <img
                                            alt={el?.Servicename}
                                            className="img-fluid"
                                            src={el?.image}  style={{  objectFit: 'cover' ,height:'250px'}}
                                        />
                                    </div>
                                    <div className="content-main-top">
                                        <h4>
                                            <a href="#">
                                                {el?.Servicename}
                                            </a>
                                        </h4>
                                        <p className="scrollable-text">
                                            {el?.Servicedescription}
                                        </p>
                                        <Link
                                            className="btn btn-style mt-4"
                                          to={'/user/booking/'+el.id}
                                        >
                                          Book now
                                        </Link>
                                        <Link
                                            className="btn btn-style mt-4 ms-3"
                                          to={'/user/singleservice/'+el?.id}
                                        >
                                          Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                          )) : <p>No Data available</p>
                        }
                    </div>
                </div>
                       
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

