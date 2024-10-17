import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function Master(){
    return(
        <>
         <Header/>
         <Outlet/>
        {/* tells slave page where to load */}
     <Footer/>
        </>
    )
}