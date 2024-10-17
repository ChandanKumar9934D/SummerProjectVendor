import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { toast } from 'react-toastify';
import Footer from "../Footer";
import UserHeader from "./UserHeader";

export default function UserMaster() {

    return (
        
        <>
            <UserHeader/>
            <Outlet />
            {/* tells slave page where to load */}
            <Footer />
        </>
    )
}