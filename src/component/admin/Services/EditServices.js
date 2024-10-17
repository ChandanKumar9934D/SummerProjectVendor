import './edit.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, onSnapshot, query, updateDoc,where } from "firebase/firestore";
import { db, storage } from '../../../Firebase';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from "react-spinners";


export default function EditServices() {
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

    useEffect(() => {
        getData();
    }, []);

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
            const storageRef = ref(storage, 'Service_images/' + fileName);
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
                Servicename: name,
                Servicedescription: description,
                Serviceprice: price,
                Servicecategory: category,
                ServiceDuration: duration,
                ServiceAddress: address,
            };
            if (url) {
                data.image = url;
            }
            let ServiceRef = doc(db, "Services", id);
            await updateDoc(ServiceRef, data);
            toast.success("Data updated");
            nav("/admin/manage-services");
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
                            Edit Service
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="/categories">Home</a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                Service
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
                            <h2 className="text-center mb-4 register-animated-heading" style={{ color: '#198754' }}>Edit Category</h2>
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
                                    <i className="fas fa-edit icoon"></i>
                                    <input
                                        type="text"
                                        placeholder="Edit Category"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                {/* <div className="register-input-container">
                                    <i className="fas fa-edit icoon"></i>
                                    <input
                                        type="text"
                                        placeholder="Edit Category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div> */}
                                <div className="register-input-container">
                                    <i className="fas fa-dollar-sign icoon"></i>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter the price"
                                        required
                                        min={1}
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-clock icoon"></i>
                                    <input
                                        type="text"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        placeholder="Enter the duration"
                                        required
                                    />
                                </div>

                                <div className="register-input-container">
                                    <i className="fas fa-image icoon"></i>
                                    <input
                                        type="file"
                                        placeholder="Image"
                                        onChange={changeImage}
                                    />
                                </div>


                                <div className="register-input-container">
                                    <i className="fas fa-file-alt icoon"></i>
                                    <textarea
                                        placeholder="Category Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-style w-75" type="submit">
                                        Edit Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
