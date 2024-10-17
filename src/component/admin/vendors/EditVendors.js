
import './editV.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, onSnapshot, query, updateDoc,where } from "firebase/firestore";
import { db, storage } from '../../../Firebase';
import  { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from "react-spinners";


export default function EditServices() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
    const [file, setFile] = useState(null);
   const [load,setLoad]=useState(true)
    const [fileName, setFileName] = useState("");
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");
    const { id } = useParams();
    const [previousImage, setPreviousImage] = useState("");
    const nav = useNavigate();
    const [allCategory, setAllCategory] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const ServiceRef = doc(db, "Vendors", id);
        const ServiceDoc = await getDoc(ServiceRef);
        if (ServiceDoc.exists()) {
       

            let productData = ServiceDoc.data();
            setName(productData.Vendorname);
            setEmail(productData.Vendoremail);
            setPassword(productData.VendorPassword);
            setAddress(productData.VendorAddress);
            setCategory(productData.Vendorcategory);
            setContact(productData.Vendorcontact);
            setPreviousImage(productData.image);
            setTimeout(()=>{
                setLoad(false)
            },500)
        } else {
            toast.error("Data doesn't exist");
            setTimeout(()=>{
                setLoad(false)
            },500)
        }
    };

    useEffect(() => {
        const que=query(collection(db,"Category"),where("status","==",true)
    )
        onSnapshot(que, doc => {
            setAllCategory(
                doc.docs.map((el, index) => {
                    return { id: el.id, data: el.data() };
                })
            );
            setTimeout(()=>{
                setLoad(false)
            },500)
        });
    }, []);

    const changeImage = (e) => {
        setFileName(e.target.value);
        setFile(e.target.files[0]);
    };

    const handleForm = (e) => {
        e.preventDefault();
        setLoad(true)
        if (!fileName) {
            saveData();
        } else {
            const storageRef = ref(storage, 'Vendor_images/' + fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                    });
                }
            );
        }
    };

    useEffect(() => {
        if (url) {
            saveData();
        }
    }, [url]);

    const saveData = async () => {
        try {
            let data = {
              Vendorname: name,
              Vendoremail: email,
              VendorPassword: password,
              Vendorcategory: category,
              Vendorcontact: contact,
              VendorAddress: address,
            };
            if (url) {
                data.image = url;
            }
            let ServiceRef = doc(db, "Vendors", id);
            await updateDoc(ServiceRef, data);
            toast.success("Data updated");
            nav("/admin/manage-vendors");
        } catch (err) {
            toast.error("Something went wrong!!");
            setTimeout(()=>{setLoad(false)},500)

        }
    };

    return (
        <div>
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
                            Edit Vendor
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="/categories">Vendor</a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                Edit
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
            <div className={load==true?"d-none":"container my-5 text-capitalize"}>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md">
                        <div className="card p-4">
                            <h2 className="text-center mb-4 register-animated-heading" style={{ color: '#198754' }}>Edit Vendor</h2>
                            <img
                                src={previousImage}
                                alt="Previous"
                                style={{
                                    height: "100px",
                                    width: "130px",
                                    borderRadius: "15px",
                                    display: "block",


                                }}
                                className='mb-3 mx-auto'
                            />


                            <form onSubmit={handleForm}>
                                <div className="register-input-container">
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
                                        <option disabled selected value={""}>Choose one</option>
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
                                <div className="text-center">
                                    <button className="btn btn-style w-75" type="submit">
                                        Edit Vendor
                                    </button>
                                </div>
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