import { collection, onSnapshot, orderBy, query,where,doc,getDoc,getDocs, Timestamp} from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate, useParams,Link } from "react-router-dom"
import { db } from "../../Firebase"
import { toast } from "react-toastify"
import moment from "moment";
import "../User/view.css"
import { ClipLoader } from "react-spinners"
export default function ViewReviews(){
  const [data,setData]=useState([])
  const [load,setLoad]=useState(true)
  const [vendorDetails, setVendorDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
 


  const nav=useNavigate()

  const {id}=useParams()
  useEffect(()=>{
    getData()
  },[id])

  useEffect(() => {
    const que = query(collection(db, "Vendors"), where("status", "==", true));
    onSnapshot(que, doc => {
      setVendorDetails(doc.docs.map(el => ({ id: el.id, data: el.data() })));
      console.log(vendorDetails)
    });
    setTimeout(()=>{
      setLoad(false)
    },1000)
  }, []);


useEffect(() => {
  const que = query(collection(db, "users"));
  onSnapshot(que, doc => {
    setUserDetails(doc.docs.map(el => ({ id: el.id, data: el.data() })));
  });
}, []);


  const getData = async () => {
    setLoad(true); // Set loading to true when starting the data fetch
  
    if (id) {
      try {
        const productsRef = collection(db,'Reviews');
        // console.log(productsRef);
        const q = query(productsRef, where('bookingId', '==', id));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          toast.error("No data found for this Booking.");
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
      toast.error("Booking is not specified.");
      nav("/admin/booking"); // Navigate to shop if no category is specified
    }
  };

  const getStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="bi bi-star-fill text-warning"></span>);
    }

    // Add half star if applicable
    if (hasHalfStar) {
        stars.push(<span key="half" className="bi bi-star-half text-warning"></span>);
    }

    // Add empty stars to make a total of 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="bi bi-star text-muted"></span>);
    }

    return stars;
};
const getDate = (date) => {
    // console.log(date);
    let date1 = date?.toDate()
    // console.log(date1);
    return moment(date1).format("MMMM Do, YYYY")
  }


  return(
    <div>
    <section className="inner-banner py-5">
        <div className="w3l-breadcrumb py-lg-5">
            <div className="container pt-5 pb-sm-4 pb-2">
                <h4 className="inner-text-title font-weight-bold pt-5">
                    Reviews
                </h4>
                <ul className="breadcrumbs-custom-path">
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li className="active">
                        <i className="fas fa-angle-right mx-2" />
                        Reviews
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-3 text-capitalize"}>
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
          
                <h3 className="title-style">Customer Reviews</h3>
                
            </div>
            <div className="row text-center justify-content-center">
            {data?.map((el) => {
            const vendor = vendorDetails.find(v => v.id === el.vendorId);
            const user = userDetails.find(u => u.id === el.user);
            return (
                <div className="col-lg-10 col-md-6 mt-4" key={el.id}>
                <div className="servicecard-single text-start border-start border-success">
                    <div className="content-main-top">
                    <h4>
                        <a href="#">
                        {el?.serviceName}
                        </a>
                    </h4>
                    <p className="">
                        {el?.reviews}
                    </p>
                    <p className="">
                        {getStarRating(el?.ratings)}
                        <br />
                        {getDate(el?.created)}
                        {/* Displaying the vendor details instead of just the vendorId */}
                        {vendor ? (
                        <>  
                            <h5><u>Vendor Details</u></h5>
                            <p>{vendor.data.Vendorname}</p>
                            <p>{vendor.data.VendorAddress}</p>
                            <p>{vendor.data.Vendorcontact},{vendor.data.Vendoremail}</p>

                            {/* Add more vendor details as needed */}
                        </>
                        ) : (
                        <p>Vendor details not available</p>
                        )}

                        {user ? (
                        <>
                            <p className="badge text-bg-info">Posted By: {user.data.name}</p>

                        </>
                        ) : (
                        <p>User details not available</p>
                        )}
                    </p>
                    </div>
                </div>
                </div>
            );
            })}

            </div>
        </div>
               
            </div>
        </div>
    </div>
</div>
</div>
  )
}