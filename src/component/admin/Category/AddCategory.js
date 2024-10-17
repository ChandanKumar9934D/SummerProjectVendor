import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCategory.css';
import { addDoc,collection,Timestamp} from 'firebase/firestore';
import { db,storage } from '../../../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { ClipLoader } from "react-spinners"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function AddCategory() {
    const[category,setCategory]=useState("")
    const[description,setDescription]=useState("")
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [progress,setProgress]=useState(0)
    const [url,setUrl]=useState("") //state to store download url
    const [load,setLoad]=useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setLoad(false)
        },500)
   },[])
    const changeImage=(e)=>{
        setFileName(e.target.value)
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]) //to set file
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoad(true)
        if(!fileName){
            toast.error("Please upload image")
            return;
        }
        
        const storageRef = ref(storage, 'Category_images/'+fileName);

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
            Categoryname:category,
            Categorydescrption:description,
            status:true,
            createdAt:Timestamp.now(),
            image:url
            
        }
        // console.log(data);
        await addDoc(collection(db,"Category"),data)
        toast.success("Data added")
        setCategory("")
        setDescription("")
        setFile({})
        setFileName("")
        setTimeout(()=>{
            setLoad(false)
        },500)
       
    }
    catch(err){
        toast.error("Something went wrong!!")
        setTimeout(()=>{
            setLoad(false)
        },500)
    }
    }
 
   

    return (
        <div className='Category'>
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
                            Add Category
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="">
                                    Home
                                </a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                Add Category
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>

            <div className={load==true?"d-none":"container text-capitalize"}>

            <div className="container my-5">
                <div className="row">
                <div className="col-md-6">
                        
                          
                        <img src="/assets/images/Notebook.gif" alt="Placeholder" className="img-fluid" style={{height:'470px', width:'600px'}} />
                   
                </div>
                    <div className="col-md-6">
                        <div className="card p-4">
                            <h2 className="text-center mb-4 register-animated-heading" style={{color:'#198754'}}>Add Category</h2>
                            <form onSubmit={handleSubmit}>
                           
                                <div className="register-input-container">
                                    <i className="fas fa-edit icoon"></i>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)} 
                                        placeholder="Add Category"
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
                                    <i className="fas fa-file-alt icoon"></i>
                                    <textarea 
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)}
                                        placeholder="Category Description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-style w-75"
                                        type="submit"
                                    >  <FontAwesomeIcon icon={faPlus} className="me-2" />
                                        Add Category
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

