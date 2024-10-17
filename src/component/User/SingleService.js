import { collection, onSnapshot, orderBy, query,where,doc,getDoc,getDocs, Timestamp} from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate, useParams,Link } from "react-router-dom"
import { db } from "../../Firebase"
import { toast } from "react-toastify"
import "./view.css"
// import { ClipLoader } from "react-spinners"
export default function SingleService(){
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [address, setAddress] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");
    const { id } = useParams();
    const [previousImage, setPreviousImage] = useState("");
    const nav = useNavigate();
    const [allCategory, setAllCategory] = useState([]);
    const [load,setLoad]=useState(true)
  

  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    const ServiceRef = doc(db, "Services", id);
    const ServiceDoc = await getDoc(ServiceRef);
    if (ServiceDoc.exists()) {

        let productData = ServiceDoc.data();
        setName(productData.Servicename);
        setPrice(productData.Serviceprice);
        setAddress(productData.Serviceprice);
        setCategory(productData.Servicecategory);
        setDescription(productData.Servicedescription);
        setDuration(productData.ServiceDuration);
        setPreviousImage(productData.image);
    } else {
        toast.error("Data doesn't exist");
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
                                 Single Services
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
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
                        {/* <h5 className="sub-title">What We Offer</h5> */}
                        <h3 className="title-style"><u>{name}</u></h3>
                        
                    </div>
                    <div className="row text-center justify-content-center">

                            <div className="col-lg-8 col-md-8 mt-4">
                                <div className="servicecard-single">
                                    <div className="grids5-info position-relative">
                                        <img
                                            alt=""
                                            className="align-left"
                                            src={previousImage}  style={{height:'250px'}}
                                        />
                                    </div>
                                    <div className="content-main-top">
                                        <h4 className="text-start">
                                            <a href="#">
                                                {name}
                                            </a>
                                        </h4>
                                        <h5 className="text-start">
                                            {category}
                                        </h5>
                                        <p className="text-start">
                                            {description}
                                        </p>
                                        <p className="text-start">
                                        <span class="badge rounded-pill text-bg-info">&#8377;{price}</span>
                                           
                                        </p>
                                        <p className="text-start">
                                        <span class="badge rounded-pill text-bg-info">Approx Time: {duration}</span>  
                                        </p>
                                        <Link
                                            className="btn btn-style mt-4"
                                          to={'/user/booking/'+id}
                                        >
                                          Book now
                                        </Link>
                
                                    </div>
                                </div>
                            </div>
                      
                    </div>
                </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

