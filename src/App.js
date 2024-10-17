import logo from './logo.svg';
import './App.css';
import About from './component/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Service from './component/Services';
import Contact from './component/Contact';
import First from './component/First';
import Master from './component/Master';

import Register from './component/auth/Register';
import { ToastContainer } from 'react-toastify';
import Login from './component/auth/Login';
import Adminmaster from './component/layout/admin/Adminmaster';
import Adminwelcome from './component/admin/pages/Adminwelcome';
import AddCategory from './component/admin/Category/AddCategory';
import CategoryForm from './component/admin/Category/ManageCategory';
import AddVendors from './component/admin/vendors/AddVendors';
import AddServices from './component/admin/Services/Addservices';
import ManageCategory from './component/admin/Category/ManageCategory';
import EditCatgory from './component/admin/Category/EditCategory';
import ManageService from './component/admin/Services/ManageService';
import ManageVendors from './component/admin/vendors/ManageVendors';
import EditVendors from './component/admin/vendors/EditVendors';

import ViewService from './component/User/ViewServices';
import ViewCategory from './component/User/ViewCategory';
import UserMaster from './component/layout/user/UserMaster';
import Booking from './component/User/booking/Booking';
import EditServices from './component/admin/Services/EditServices';
import SingleService from './component/User/SingleService';
import BookingHistory from './component/User/booking/BookingHistory';
import ViewBookings from './component/admin/ViewBookings';
import AddReview from './component/User/AddReview';
import ViewReviews from './component/admin/ViewReviews';
import AllotVendors from './component/admin/AllotVendors';




function App() {
  return (
<>
<BrowserRouter>
<Routes>
{/* <Route path='/' element={<Master/>}>
<Route path="/" element={<First/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/user/user-category" element={<ViewCategory/>}/>
<Route path="/user/singleservice/:id" element={<SingleService/>}/>
<Route path="/user/user-services/:category" element={<ViewService/>}/>

<Route path="/service" element={<Service/>}/>
<Route path="/Contact" element={<Contact/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
</Route> */}

<Route path="/admin" element={<Adminmaster/>}>
<Route path="/admin" element={<Adminwelcome/>}/>
<Route path="/admin/add-category" element={<AddCategory/>}/>
<Route path="/admin/manage-category" element={<ManageCategory/>}/>
<Route path="/admin/add-vendors" element={<AddVendors/>}/>
<Route path="/admin/manage-services" element={<ManageService/>}/>
<Route path="/admin/manage-vendors" element={<ManageVendors/>}/>
<Route path="/admin/add-services" element={<AddServices/>}/>
<Route path='/admin/edit-services/:id' element={<EditServices/>}/>
<Route path="/admin/edit-page/:id" element={<EditCatgory/>}/>
<Route path="/admin/edit-vendors/:id" element={<EditVendors/>}/>
<Route path="/admin/booking" element={<ViewBookings/>}/>
<Route path="/admin/allotVendor/:id" element={<AllotVendors/>}/>
<Route path="/admin/reviews/:id" element={<ViewReviews/>}/>

</Route>


<Route path='/' element={<UserMaster/>}>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/" element={<First/>}/>
<Route path="/user/user-category" element={<ViewCategory/>}/>
<Route path="/user/singleservice/:id" element={<SingleService/>}/>
<Route path="/user/user-services/:category" element={<ViewService/>}/>
<Route path="/user/booking/:id" element={<Booking/>}/>
<Route path="/user/history" element={<BookingHistory/>}/>
<Route path="/user/addreview/:id" element={<AddReview/>}/>
</Route>


</Routes>
</BrowserRouter>
<ToastContainer/>
</>
  );
}

export default App;
