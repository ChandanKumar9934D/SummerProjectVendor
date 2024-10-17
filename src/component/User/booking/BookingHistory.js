import { Link } from 'react-router-dom';
import '../../admin/Services/manageS.css';
import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import {db} from "../../../Firebase"
import moment from "moment"
import { Modal, Button } from 'react-bootstrap';
import ReviewModal from '../AddReview';
import { ClipLoader } from "react-spinners"


const BookingHistory = () => {
  const [data, setData] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedServiceName, setSelectedServiceName] = useState(null);
  const [vendorDetails, setVendorDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false); 
  const [allCategory, setAllCategory] = useState([]);
  const [reviewStatus, setReviewStatus] = useState("True");
  const [load,setLoad]=useState(true)


//   useEffect(()=>{
// setTimeout(()=>{
//   setLoad(false)
// },1000)


// },[])

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    const que = query(collection(db, 'Booking'), where("user", "==", userId), orderBy('created', 'desc'));
    onSnapshot(que, (querySnapshot) => {
      setData(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });

  }, [db]);


  useEffect(() => {
    const fetchReviewStatus = async (bookingId) => {
      const reviewQuery = query(collection(db, 'Reviews'), where("bookingId", "==", bookingId));
      onSnapshot(reviewQuery, (querySnapshot) => {
        const status = {};
        querySnapshot.forEach(doc => {
          status[bookingId] = doc.data().status; 
        });
        setReviewStatus(prevStatus => ({ ...prevStatus, ...status }));
      });
    };
  
    data.forEach(item => {
      fetchReviewStatus(item.id);
    });

    setTimeout(()=>{
      setLoad(false)
    },1000)

  }, [data]);
  
console.log("Review Status: ", reviewStatus);
console.log("Selected Booking ID: ", selectedBookingId);
console.log("Review Status for Selected Booking: ", reviewStatus[selectedBookingId]);



  useEffect(() => {
    const que = query(collection(db, "Vendors"), where("status", "==", true));
    onSnapshot(que, doc => {
      setAllCategory(doc.docs.map(el => ({ id: el.id, data: el.data() })));
    });
  }, [db]);

  // const getDate = (date) => {
  //   let date1 = date?.toDate();
  //   return moment(date1).format("MMMM Do, YYYY");
  // };

  const viewVendorDetails = (vendorId, id, serviceName) => {
    const vendor = allCategory.find(vendor => vendor.id === vendorId);
    setVendorDetails(vendor);
    setSelectedBookingId(id);
    setSelectedServiceName(serviceName);
    setShowModal(true);
  };

  const handleReview = () => {
    setShowModal(false);
    setShowReviewModal(true);
  };

  return (
    <div className='manage'>
      <section className="inner-banner py-5">
        <div className="w3l-breadcrumb py-lg-5">
          <div className="container pt-5 pb-sm-4 pb-2">
            <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
              History
            </h4>
            <ul className="breadcrumbs-custom-path">
              <li>
                <Link to="/login">Booking</Link>
              </li>
              <li className="active">
                <i className="fas fa-angle-right mx-2" />
                History
              </li>
            </ul>
          </div>
        </div>
      </section>


      <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>

      <div className= {load==true?"d-none":"category-table-container my-5 text-capitalize"}>
        <h1 style={{ color: '#198754' }} className='text-center mb-4'>Booking History</h1>
        <table border='1'>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Service Name</th>
              <th>Booking Details</th>
              <th>Price</th>
              <th>Status</th>
              <th>Vendor</th>
            </tr>
          </thead>
          <tbody>
                 {
                    data?.length>0?
                    data?.map(
                    (el,index)=>(

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.data?.serviceName}</td>
                  <td>Date: {el?.data?.bookingDate}
                    <br />Time: {el?.data?.time}</td>
                  <td>&#8377;{el?.data?.amount}</td>
                  <td>
                    {el?.data?.status === "Pending" && (
                      <i className="fas fa-clock" style={{ color: 'black', marginRight: '5px' }}>{el?.data?.status}</i>
                    )}
                    {el?.data?.status === "Approve" && (
                      <i className="fas fa-check-circle" style={{ color: 'green', marginRight: '5px' }}>{el?.data?.status}</i>
                    )}
                    {el?.data?.status === "Decline" && (
                      <i className="fas fa-times-circle" style={{ color: 'crimson', marginRight: '5px' }}>{el?.data?.status}</i>
                    )}
                    {el?.data?.status === "In Progress" && (
                      <i className="fas fa-clock" style={{ color: '#16325B', marginRight: '5px' }}>{el?.data?.status}</i>
                    )}
                    {el?.data?.status === "Completed" && (
                      <i>{el?.data?.status}</i>
                    )}
                  </td>
                  <td>
                    {el?.data?.vendorId ? (
                      <button
                        className="btn btn-dark mx-2 fas fa-eye"
                        onClick={() => viewVendorDetails(el?.data?.vendorId, el?.id, el?.data?.serviceName)}
                      >
                      </button>
                    ) : (
                      <>
                        {(el?.data?.status === "Pending" || el?.data?.status === "Decline") && (
                          <p>Booking Request<br />Haven't approved!!</p>
                        )}
                      </>
                    )}
                  </td>
                </tr>
                                 )
                                )
                                :
                                <tr>
                                    <td colSpan={6}>No Data found!!</td>
                                </tr>
                                }
          </tbody>
        </table>

        {/* Modal Integration */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Vendor Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h5>Service Name: {selectedServiceName}</h5> */}
            {/* <h6>Booking ID: {selectedBookingId}</h6> */}
            {/* <hr /> */}
            {/* <h5>Vendor Information:</h5> */}
            {vendorDetails ? (
              <div>
            <img src={vendorDetails?.data?.image} alt={vendorDetails?.data?.Servicename} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <h4 className='mt-3'><strong>{vendorDetails?.data?.Vendorcategory}</strong></h4>
            <p><strong>Name:</strong> {vendorDetails?.data?.Vendorname}</p>
            <p><strong>Email:</strong> {vendorDetails?.data?.Vendoremail}</p>
            <p><strong>Contact:</strong> {vendorDetails?.data?.Vendorcontact}</p>
                {/* Add other vendor details as needed */}
              </div>
            ) : (
              <p>No vendor details available.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
            {reviewStatus[selectedBookingId] !== "False" && (
                            <Button variant="primary" onClick={() => handleReview(true)}>Add Review</Button>
                        )}
            {/* <Button variant="primary" onClick={() =>handleReview()}>Add Review</Button> */}
         
          </Modal.Footer>
        </Modal>

              {/* Review Modal */}
         <ReviewModal
          show={showReviewModal}
          handleClose={() => setShowReviewModal(false)}
          bookingId={selectedBookingId}
          serviceName={selectedServiceName}
          vendorId={vendorDetails?.id}
          // status={data.find(item => item.id === selectedBookingId)?.data?.status}
         
        /> 

      </div>
    </div>
  );
};

export default BookingHistory;
