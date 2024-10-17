import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc,query,where,getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";


const AllotVendors = () => {
  const { id } = useParams() // Get the id from URL params
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [load,setLoad]=useState(true)
  const nav = useNavigate();
  console.log("bookingId",id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the booking details to get serviceId
        const bookingDocRef = doc(db, 'Booking', id);
        console.log("bool",id)
       
        const bookingDoc = await getDoc(bookingDocRef);
        if (bookingDoc.exists()) {
          const bookingData = bookingDoc.data();
          const serviceId = bookingData.serviceId;
          console.log("service",serviceId)
          setServiceName(bookingData.serviceName)
          // Fetch the service category by serviceId
          const serviceDocRef = doc(db, 'Services', serviceId);
          const serviceDoc = await getDoc(serviceDocRef);
          if (serviceDoc.exists()) {
            const serviceData = serviceDoc.data();
            setServiceCategory(serviceData.Servicecategory);
            console.log(serviceCategory)

            // Fetch vendors by the service category
            const vendorsQuery = query(
              collection(db, 'Vendors'),
              where('status', '==', true),
              where('Vendorcategory', '==', serviceData.Servicecategory)
            );
            const vendorSnapshot = await getDocs(vendorsQuery);
            const vendorsData = vendorSnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }));
              setVendors(vendorsData);
          }  
          
            setTimeout(()=>{
                setLoad(false)
              },500)
        } else {
          toast.error('Booking not found');
          nav('/admin/booking'); // Navigate back to view bookings if not found
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, [id, nav]);

  const handleVendorChange = (e) => {
    setSelectedVendor(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingDocRef = doc(db, 'Booking', id);
      await updateDoc(bookingDocRef, {
        vendorId: selectedVendor,
      });
      toast.success('Vendor allotted successfully!');
      nav('/admin/booking'); // Navigate back to view bookings
    } catch (error) {
      console.error('Error allotting vendor:', error);
      toast.error('Error allotting vendor');
    }
  };

  return (
    <div>

<section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
                            Allot Vendor
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="/categories">Home</a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                Vendor
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

<ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
            <div className={load==true?"d-none":"container my-5 text-capitalize"}>
           
                <div className="row">
                    <div className="col-md">
                        <div className="card p-4">
                            <h2 className="text-center mb-4 register-animated-heading" style={{ color: '#198754' }}>Allot Vendor</h2>
  

                            <form onSubmit={handleFormSubmit}>

                            <div className="register-input-container">
                                    <i className="fas fa-edit icoon"></i>
                                    <input
                                        type="text"
                                        value={serviceName}
                                        // onChange={(e) => setDuration(e.target.value)}
                                        // placeholder="Enter the duration"
                                        required
                                        readOnly
                                    />
                                </div>
                            <div className="register-input-container">
                                    <i className="fas fa-user icoon"></i>
                                    
                                    <select id="vendor" value={selectedVendor} onChange={handleVendorChange} required>
                                    <option value="" disabled>Select a vendor</option>
                                    {vendors.length > 0 ? (
                                    vendors.map((vendor) => (
                                        <option key={vendor.id} value={vendor.id}>
                                        {vendor.data.Vendorname}
                                        </option>
                                    ))
                                    ) : (
                                    <option value="" disabled>No vendors available</option>
                                    )}
                                   </select>
                                    </div>


                                <div className="text-center">
                                    <button className="btn btn-style w-75" type="submit">
                                        Allot Vendor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default AllotVendors;
