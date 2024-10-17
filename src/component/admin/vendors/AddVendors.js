import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vendor.css'; // Make sure to adjust the CSS file path as per your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection, Timestamp, onSnapshot, query, where } from 'firebase/firestore'; // Import Firestore functions
import { db, storage } from '../../../Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ClipLoader } from "react-spinners";

export default function AddVendors() {
    const [allCategory, setAllCategory] = useState([])
    const [load,setLoad]=useState(true)
    useEffect(() => {
        const que = query(collection(db, "Category"), where("status", "==", true)
        )
        onSnapshot(que, doc => {
            setAllCategory(
                doc.docs.map((el, index) => {
                    return { id: el.id, data: el.data() }
                })
            )
            setTimeout(()=>{
                setLoad(false)
            },500)
        })

    }, [])

    const changeTc = (e) => {
        setTc(e.target.checked);
    };
    const [isSubmit, setIsSubmit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [category, setCategory] = useState("");
    const [state, setState] = useState("");
    const [tc, setTc] = useState(false);
    const [file, setFile] = useState({})
    const [fileName, setFileName] = useState("")
    const [progress, setProgress] = useState(0)
    
    const [url, setUrl] = useState("") //state to store download url
    const changeImage = (e) => {
        setFileName(e.target.value)
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]) //to set file
    }
    const handleForm = (e) => {
        e.preventDefault();
        setLoad(true)

        if (!fileName) {
            toast.error("Please upload image")
            return;
        }

        const storageRef = ref(storage, 'Vendors_images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);

            },
            () => {
                //file upload successfully
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)

                });
            }
        );
    }
    useEffect(() => {
        if (!!url) {
            saveData()
        }
    }, [url])
    const saveData = async () => {
        try {
            let data = {
                Vendorname: name,
                Vendorcategory: category,
                Vendoremail: email,
                VendorPassword: password,
                Vendorcontact: contact,
                VendorAddress: address,
                status: true,
                createdAt: Timestamp.now(),
                image: url

            }
            // console.log(data);
            await addDoc(collection(db, "Vendors"), data);
            toast.success("Vendor succesfully added");
            setName("");
            setEmail("");
            setState("");
            setCategory("");
            setContact("");
            setPassword("");
            setAddress("");
            setFile({})
            setFileName("")
            setTimeout(()=>{setLoad(false)},500)

        }
        catch (err) {
            toast.error("Something went wrong!!")
            setTimeout(()=>{setLoad(false)},500)
        }
    }




    return (
        <div>
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
                            Add Vendor
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="">Home</a>
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
            <div className="container min-vh-100">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className='card'>
                            <h2 className="text-center mb-4 register-animated-heading" style={{ color: '#198754' }}>Vendor Profile</h2>
                            <form onSubmit={handleForm}>
                                <div className="register-input-container">
                                    <i className="fas fa-user icoon"></i>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-tags icoon"></i>
                                    <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                                        <option disabled selected value={""}>Choose Category</option>
                                        {
                                            allCategory.map((el, index) => (
                                                <option>{el?.data?.Categoryname}</option>
                                            ))
                                        }
                                    </select> </div>
                                <div className="register-input-container">
                                    <i className="fas fa-envelope icoon"></i>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-image icoon"></i>
                                    <input
                                        type="file"
                                        value={fileName} onChange={changeImage}

                                        placeholder="Enter the price"
                                        required
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-phone icoon"></i>
                                    <input
                                        type="tel"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder="Enter your contact number"
                                        required
                                        maxLength={10}
                                        minLength={10}
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
                                {/* <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={changeTc}
                                        required
                                    />
                                    <label className="form-check-label register-custom-label">I agree to the Terms and Conditions</label>
                                </div> */}
                                <div className="text-center">
                                    <button className="btn btn-style w-75" type="submit">
                                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Vendor
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
