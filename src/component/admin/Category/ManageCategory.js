import { Link } from 'react-router-dom';
import './manage.css';
import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore"

import { useEffect, useState } from "react"
import { db } from "../../../Firebase"
import { toast } from 'react-toastify';
import moment from "moment"
import { ClipLoader } from "react-spinners";

export default function ManageCategory() {
  const [data,setData]=useState([])
  const [load,setLoad]=useState(true)

  //useEffect(fn,[dependency])
  useEffect(()=>{
      //on load data fetch 
      const que=query(collection(db,"Category")
      // , where("categoryName","==","test")
      // ,limit(5)
      // ,orderBy("categoryName","desc")
  )
      //query is used to add where condition or limit or order by
      onSnapshot(que, doc=>{
          //onSnapshot- realtime updates because it listen to the changes
          // console.log(doc);
          setData(
              doc.docs.map((el,index)=>{
                   console.log({id:el.id, data:el.data()} );
                  return {id:el.id, data:el.data()} 
              })
          )
      })
      setTimeout(()=>{
        setLoad(false)
      },1000)
      //[{id:----, data:{categoryName:---, status:---}},{},{}]
      console.log(data, "data is");
  },[])
  const getDate=(date)=>{
      // console.log(date);
      let date1=date?.toDate()
      // console.log(date1);
      return moment(date1).format("MMMM Do, YYYY")
  }
  const updateStatus=async (id,status)=>{
    // console.log(id, status);
    try{
    const docRef=doc(db,"Category",id)
    let data={
      status:status
    }
   await updateDoc(docRef,data)
   toast.success("Status updated")
   setTimeout(()=>{
    setLoad(false)
},700)
  }
  catch(err){
    console.log(err);
    setTimeout(()=>{
      setLoad(false)
  },700)
    toast.error("Internal server error")
  }
  }
  
  
  return (
    <div className='manage'>
      <section className="inner-banner py-5">
        <div className="w3l-breadcrumb py-lg-5">
          <div className="container pt-5 pb-sm-4 pb-2">
            <h4 className="inner-text-title font-weight-bold pt-5 mb-3 mt-3">
              Manage Category
            </h4>
            <ul className="breadcrumbs-custom-path">
              <li>
                <a href="">
                  Home
                </a>
              </li>
              <li className="active">
                <i className="fas fa-angle-right mx-2" />
                Category
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>

     <div className={load==true?"d-none":"container my-5 text-capitalize"}>

      <div className="category-table-container">
        <h1 style={{ color: '#198754' }} className='text-center mb-4'>Manage Category</h1>
        <table border='1'>
          <thead>
            <tr>
              <th><i className="fas fa-list"></i> S. No.</th>
              <th><i className="fas fa-tag"></i> Category Name</th>
             
              <th><i className="fas fa-image"></i> Image</th>
              <th><i className="fas fa-toggle-on"></i> status</th>
              <th><i className="fas fa-edit"></i> Edit</th>
              <th><i className="fas fa-exchange-alt"></i> Status Control</th>

              
            </tr>
          </thead>
          <tbody>{
          // ? null check- 
                       data?.map((el,index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{el?.data?.Categoryname}</td>
                            <td><img src={el?.data?.image} alt={el?.data?.Categoryname} style={{ width: '80px', height: '80px', objectFit: 'cover' }} /></td>


                           <td>
  {el?.data?.status 
    ? <><i className="fas fa-check-circle" style={{ color: 'green', marginRight: '5px' }}></i> Enable</> 
    : <><i className="fas fa-times-circle" style={{ color: 'red', marginRight: '5px' }}></i> Disable</>}
</td>

                           <td>
                <Link to={"/admin/edit-page/"+el.id} className="btn-style edit-btn">
                  <i className="fas fa-edit"></i> Edit
                </Link>
              </td>
              
              <td>
                              {
                                el?.data?.status==true?
                                <button className="btn btn-style delete-btn" onClick={()=>{
                                  updateStatus(el.id,false)
                                }}>Disable</button>
                                :
                                <button className="btn btn-style delete-btn"
                                onClick={()=>{
                                  updateStatus(el.id,true)
                                }}
                                >Enable</button>
                              }
                            </td>
                        </tr>
                       )) 
                    }
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

