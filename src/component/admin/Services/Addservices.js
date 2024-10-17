import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addDoc, collection, onSnapshot, query, Timestamp,where} from 'firebase/firestore'; // Import Firestore functions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './Service.css'; 
import { db, storage } from '../../../Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ClipLoader } from "react-spinners";


export default function AddServices() {
    const [allCategory,setAllCategory]=useState([])
    const [load,setLoad]=useState(true)
    useEffect(()=>{
        const que=query(collection(db,"Category"),where("status","==",true)
    )
        onSnapshot(que, doc=>{
            setAllCategory(
                doc.docs.map((el,index)=>{
                    return {id:el.id, data:el.data()} 
                })
            )
            setTimeout(()=>{
                setLoad(false)
            },500)
        })
    },[])
  
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [address, setAddress] = useState("");
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [progress,setProgress]=useState(0)
    const [url,setUrl]=useState("") //state to store download url
    const changeImage=(e)=>{
        setFileName(e.target.value)
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]) //to set file
    }
    
    const handleForm=(e)=>{
        e.preventDefault();
        setLoad(true)
        if(!fileName){
            toast.error("Please upload image")
            return;
        }
        
        const storageRef = ref(storage, 'Service_images/'+fileName);

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

    useEffect(()=>{
        if(!!url){
            saveData()
        }
    },[url])
    const saveData=async ()=>{
        try{
        let data={
            Servicename: name,
            Servicedescription: description,
            Serviceprice: price,
            Servicecategory: category,
            ServiceDuration: duration,
            ServiceAddress: address,
            status: true,
            createdAt: Timestamp.now(),
            image:url
            
        }
        // console.log(data);
        await addDoc(collection(db,"Services"),data)
        toast.success("Data added")
        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setDuration("");
        setAddress("");
        setFile({})
        setFileName("")
        setTimeout(()=>{setLoad(false)},500)
       
    }
    catch(err){
        toast.error("Something went wrong!!")
        setTimeout(()=>{setLoad(false)},500)
    }
    }
   

    return (
        <div className='services'>
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
                            Add Service
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="">
                                 Home
                                </a>
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

            <div className="container min-vh-100">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className='card p-4'>
                            <h2 className="text-center mb-4 register-animated-heading" style={{color:'#198754'}}>Add Service</h2>
                            <form onSubmit={handleForm}>
                                <div className="register-input-container">
                                    <i className="fas fa-user icoon"></i>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Service name"
                                        required
                                    />
                                </div>
                                <div className="register-input-container">
                                    <i className="fas fa-tags icoon"></i>
                                    <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                                        <option disabled selected value={""}>Choose one</option>
                                        {
                                            allCategory.map((el,index)=>(
                                                <option>{el?.data?.Categoryname}</option>
                                            ))
                                        }
                                    </select> </div>
                                <div className="register-input-container">
                                    <i className="fas fa-info-circle icoon"></i>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter the description"
                                        required
                                    ></textarea>
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
                                {/* <div className="register-input-container">
                                    <i className="fas fa-home icoon"></i>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your address"
                                        required
                                    ></textarea>
                                </div> */}
                                <div className="text-center">
                                    <button
                                        className="btn btn-style w-75"
                                        type="submit"
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Service
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

