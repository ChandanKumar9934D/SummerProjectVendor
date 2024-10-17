import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Adminheader from "./Adminheader";
import Footer from "../Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Adminmaster(){
    const email=sessionStorage.getItem("email")
    if(!email){
        toast.error("Please login")
        return <Navigate to={"/login"}/>
    }
    return(
        <>
         <Adminheader/>
         <Outlet/>
        {/* tells slave page where to load */}
     <Footer/>
        </>
    )
}