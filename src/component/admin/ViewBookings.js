import { Link, useNavigate} from 'react-router-dom';
import '../admin/Services/manageS.css';
import { collection, deleteDoc, doc,addDoc, limit, onSnapshot, orderBy, query, updateDoc, where,getDocs,getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { db } from "../../Firebase"
import moment from "moment"
import VendorDetailsModal from './vendorDetails';
import { ClipLoader } from "react-spinners";



export default function ViewBookings() {
  const [data, setData] = useState([])
  const [services, setServices] = useState([]);
  const [allCategory,setAllCategory]=useState([])
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [load,setLoad]=useState(true)
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedVendors, setSelectedVendors] = useState({});
  const [filteredVendors, setFilteredVendors] = useState({});




  const viewVendorDetails = (vendorId) => {
    // Fetch vendor details using the vendorId
    const vendor = allCategory.find(vendor => vendor.id === vendorId);
    setVendorDetails(vendor);
    setShowModal(true);
  };




  useEffect(()=>{
      const que=query(collection(db,"Vendors"),where("status","==",true)
  )
      onSnapshot(que, doc=>{
          setAllCategory(
              doc.docs.map((el,index)=>{
                  return {id:el.id, data:el.data()} 
              })
          )
      })
  },[])




  useEffect(() => {
    //on load data fetch 
    const que = query(collection(db, "Booking"),orderBy("created","desc")
      // , where("categoryName","==","test")
      // ,limit(5)
      // ,orderBy("categoryName","desc")
    )
    //query is used to add where condition or limit or order by
    onSnapshot(que, doc => {
      //onSnapshot- realtime updates because it listen to the changes
      // console.log(doc);
      setData(
        doc.docs.map((el, index) => {
          // console.log({id:el.id, data:el.data()} );
          return { id: el.id, data: el.data() }
        })
      )
    })
    //[{id:----, data:{categoryName:---, status:---}},{},{}]
    // console.log(data, "data is");
    setTimeout(()=>{
      setLoad(false)
    },1000)
  }, [])
  const getDate = (date) => {
    // console.log(date);
    let date1 = date?.toDate()
    // console.log(date1);
    return moment(date1).format("MMMM Do, YYYY")
  }


  const fetchServiceCategoryByServiceId = async (serviceId) => {
    try {
      // Step 1: Get the service document by its serviceId
      const serviceDocRef = doc(db, "Services", serviceId)
      const serviceDoc = await getDoc(serviceDocRef);
  
      if (serviceDoc.exists()) {
        const serviceData = serviceDoc.data();
        return serviceData.Servicecategory; // Return Servicecategory (which is the category name)
      } else {
        console.log("No service found for the given serviceId.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching service category: ", error);
      return null;
    }
  };


  // Function to fetch vendors based on category name (Servicecategory)
const fetchVendorsByCategory = async (Servicecategory) => {
  try {
    const vendorsQuery = query(
      collection(db, "Vendors"),
      where("status", "==", true), // Assuming 'status' is used to filter active vendors
      where("Vendorcategory", "==", Servicecategory) // Only fetch vendors matching the service category
    );
    
    const vendorSnapshot = await getDocs(vendorsQuery);
    const vendors = vendorSnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
    }));

    


    return vendors;
  } catch (error) {
    console.error("Error fetching vendors: ", error);
    return [];
  }
};


  

  const updateStatus = async (id, status) => {
    // console.log(id, status);
    try {
      const docRef = doc(db, "Booking", id)
      let data = {
        status: status
      }
      await updateDoc(docRef, data)
      toast.success("Status updated")
    }
    catch (err) {
      console.log(err);
      toast.error("Internal server error")
    }
  }
  const nav = useNavigate()
  const handleForm = async (e, bookingId) => {

    const selectedVendor = selectedVendors[bookingId]; 
    // const selectedCategory = selectedCategories[bookingId];
    e.preventDefault();
    // console.log("event",e)
    
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      toast.error("Please Login!!");
      nav("/login");
      return;
    }
  
    try {
      // Update the specific booking with the selected vendor
      const bookingDocRef = doc(db, "Booking", bookingId);
      const bookingDoc = await getDoc(bookingDocRef);

      if (bookingDoc.exists()) {
        const bookingData = bookingDoc.data();
        const serviceId = bookingData.serviceId;
  

        const serviceCategory = await fetchServiceCategoryByServiceId(serviceId);
        console.log('selected serviceId', serviceCategory)
  

        const vendors = await fetchVendorsByCategory(serviceCategory);
        
        console.log("Service Category:", serviceCategory);
        console.log("Filtered Vendors for bookingId:", bookingId, vendors);
        setFilteredVendors((prev) => ({
          ...prev,
          [bookingId]: vendors, // Store vendors for this booking ID
        }));
  
  
        // Proceed to update the booking with the selected vendor and category

      await updateDoc(bookingDocRef, {
        vendorId:  selectedVendor,
        // serviceId: selectedCategory  // Update with selected vendor
      });
  
      toast.success("Vendor allotted successfully!!");
    } else {
      toast.error("Booking not found");
    }
  }
    catch (error) {
      console.error("Error allotting vendor: ", error);
      toast.error("Internal server error");
    } finally {
      setLoad(false); // End loading state
    }
  };

  const handleVendorChange = (e, bookingId) => {
    console.log("event",bookingId,e)
    setSelectedVendors((prev) => ({
      ...prev,
      [bookingId]: e.target.value, // Update the category for the specific booking
    }));
  };
 
  


  return (
    <div className='manage'>
      <section className="inner-banner py-5">
        <div className="w3l-breadcrumb py-lg-5">
          <div className="container pt-5 pb-sm-4 pb-2">
            <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
               Booking
            </h4>
            <ul className="breadcrumbs-custom-path">
              <li>
                <Link to="/login">Users</Link>
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

      <div className= {load==true?"d-none":"category-table-container my-3 text-capitalize"}>
        <h1 style={{ color: '#198754' }} className='text-center mb-4'>All Bookings</h1>
        <table border='1'>
          <thead>
            <tr>
              <th><i className="fas fa-hashtag"></i> S. No.</th>
              <th><i className="fas fa-concierge-bell"></i>Service Name</th>
              <th><i className="fas fa-tags"></i>Booking Details</th>
              <th><i className="fas fa-dollar-sign"></i> Price</th>
              {/* <th><i className="fas fa-image"></i> Image</th> */}
              <th><i className="fas fa-toggle-on"></i> status</th>
              <th><i className="fas fa-user"></i> User Details</th>
              
              <th><i className="fas fa-exchange-alt"></i>Action</th>
              <th><i className="fas fa-plus"></i>Vendor</th>
            </tr>
          </thead>
          <tbody>
            {
              // ? null check- 
              data?.map((el, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.data?.serviceName}</td>
                  <td>Date: {el?.data?.bookingDate}
                    <br></br>Time: {el?.data?.time}</td>
                  <td>&#8377;{el?.data?.amount}</td>
                  {/* <td><img src={el?.data?.image} alt={el?.data?.Servicename} style={{ width: '80px', height: '80px', objectFit: 'cover' }} /></td> */}

                  <td>
                   {el?.data?.status === "Pending" ? (
                        <i className="fas fa-clock" style={{ color: 'black', marginRight: '5px' }}>{el?.data?.status}</i>
                    ) : null}
                    {el?.data?.status === "Approve" ? (
                        <i className="fas fa-check-circle" style={{ color: 'green', marginRight: '5px' }}>{el?.data?.status}</i>
                    ) : null}
                    {el?.data?.status === "Decline" ? (
                        <i className="fas fa-times-circle" style={{ color: 'crimson', marginRight: '5px' }}>{el?.data?.status}</i>
                    ) : null}
                    {el?.data?.status === "Completed" ? (
                        <i>{el?.data?.status}</i>
                    ) : null}
                  </td>

                  <td>
                    {el?.data?.userName}<br></br>
                    {el?.data?.userEmail}<br></br>
                    {el?.data?.userContact}                    
                  </td>
                  <td>
                {el?.data?.status=="Pending"?<>
                <button className='btn btn-outline-success' onClick={()=>{
                    updateStatus(el?.id,"Approve")
                }}>Approve</button>
                <button className='btn btn-outline-danger mx-2 ' onClick={()=>{
                    updateStatus(el?.id,"Decline")
                }}>Decline</button>
                </>
                :el?.data?.status=="Approve"
                ?
                <button className='btn btn-outline-info mx-2 ' onClick={()=>{
                    updateStatus(el?.id,"Completed")
                }}>Complete</button>
                :
                el?.data?.status
                }
                </td>

                <td>
  {el?.data?.vendorId ? (
    <div className='d-flex justify-content-center gap-3'>
      <button
        className="btn btn-dark fas fa-eye"
        onClick={() => viewVendorDetails(el?.data?.vendorId)}
      >
        {/* View Vendor Details */}
      </button>
      <Link to={'/admin/reviews/'+el.id}>
      <button className='btn btn-primary'>View Review</button>
      </Link>
    </div>
  ) : (
    <>
      {el?.data?.status === "Approve" && (
         <Link className='d-flex justify-content-center' to={'/admin/allotVendor/'+el.id}>
          <button className='btn btn-success fas fa-plus p-2'>Allot Vendor</button>
         </Link>
      )}
      {(el?.data?.status === "Pending"||el?.data?.status === "Decline") && (

        <p className='d-flex justify-content-center'>Booking Request 
        <br></br>Haven't approved!!</p>
        
      )}
    </>
  )}
</td>


                </tr>
              ))
            }
          </tbody>
        </table>
        <VendorDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        vendorDetails={vendorDetails}
      />

      </div>
    </div>
    
  );
}
