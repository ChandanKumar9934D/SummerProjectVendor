import { collection, onSnapshot, query,where} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { useParams,Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./view.css"

export default function ViewCategory() {
    const [data, setData] = useState([]);
    const { categoryName } = useParams();
    const [load,setLoad]=useState(true)


    useEffect(() => {
        const que = query(collection(db, "Category"),where("status","==",true)
    );
        onSnapshot(que, snapshot => {
            setData(
                snapshot.docs.map((el) => {
                    console.log({ id: el.id, data: el.data() });
                    return { id: el.id, data: el.data() };
                })
            );
        });
        setTimeout(()=>{
            setLoad(false)
          },1000)
        // console.log(data, "data is");
    }, []);

    return (
        <div>
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5">
                            Categories
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="">
                                    Home
                                </a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                Categories
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <ClipLoader cssOverride={{display:"block",margin:"40vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 text-capitalize"}>
            <div className="w3l-grids-block-5 py-5">
                <div className="container py-lg-5 py-md-4 py-2">
                    <div
                        className="title-main text-center mx-auto mb-md-5 mb-4"
                        style={{
                            maxWidth: '500px'
                        }}
                    >
                        <h5 className="sub-title">
                            Explore Our Categories
                        </h5>
                        <h3 className="title-style">
                            Browse by Categories
                        </h3>
                    </div>
                    <div className="row text-center justify-content-center">
                    {
                    data?.length>0 ?
                    data?.filter(el=>el?.data?.status==true).map(
                     (el,index)=>( 
                            <div className="col-lg-4 col-md-6 mt-4" key={el.id} >
                                <div className="servicecard-single" style={{height:'500px'}}>
                                    <div className="grids5-info position-relative">
                                        <img
                                            alt={el.data.categoryName}
                                            className="img-fluid"
                                            src={el?.data?.image}  style={{  objectFit: 'cover',height:'250px' }}
                                        />
                                    </div>
                                    <div className="content-main-top">
                                        <h4>
                                            <a href="#">
                                                {el.data.Categoryname}
                                            </a>
                                        </h4>
                                        <p className="scrollable-text">
                                            {el.data.Categorydescrption}
                                        </p>
                                        <Link to={"/user/user-services/"+el?.data?.Categoryname}>
                                        <a
                                            className="btn btn-style mt-4"
                                            href="#"

                                        >
                                            
                                            View Services
                                            
                                        </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                               )) : <p>No Data available</p>
                            }
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

