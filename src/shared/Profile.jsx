import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import userpic from '../assets/login/user.png'
import { RiLiveLine } from "react-icons/ri";
import { LuClapperboard } from "react-icons/lu";
import { SlCamrecorder } from "react-icons/sl";
import { MdOutlineFileCopy } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { FaLongArrowAltRight } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

// import { useNavigate } from "react-router-dom";



const Profile = () => {
    //from Cntex API
    const { user,logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log("profile ",user)
    const handleSignOut = async() => {
        try {
            const res= await logOut();
            console.log(res);
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const handleMycourse=()=>{
        navigate('/mycourses');
    }
    if(!user)
        return <span className="loading loading-ring loading-lg"></span>;

    return (

        <div className="flex flex-col lg:flex-row gap-12 mt-6">
            <div className="drawer lg:drawer-open  w-1/4  ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content rounded-xl">
                        {/* Sidebar content here */}
                        <li className="border-t-2 border-b-2 mb-12">
                            <div>
                                <img className="h-[50px] mr-2" src="" alt="" />
                                <p className=" font-semibold text-xl">later</p>
                            </div>
                        </li>
                        <li >
                            <p className="text-xl"><span className="mr-2"><RiLiveLine /></span> Class Joinnig</p>
                        </li>
                        <li >
                            <p className="text-xl" onClick={handleMycourse}><span className="mr-2"><LuClapperboard /></span> My Course</p>
                        </li>
                        <li >
                            <p className="text-xl"><span className="mr-2"><SlCamrecorder /></span> Recording</p>
                        </li>
                        <li >
                            <p className="text-xl"><span className="mr-2"><MdOutlineFileCopy /></span> Resourses</p>
                        </li>
                        <li >
                            <p className="text-xl"><span className="mr-2"><GiSkills /></span> Skillable</p>
                        </li>
                        <li  >
                            <button className="btn-sm btn-warning"  onClick={handleSignOut}>LogOut <FaLongArrowAltRight /></button>
                        </li>

                        <li className="border-t-2  mt-64 ">
                            <div>
                                <button className="btn  text-xl btn-warning" onClick={handleSignOut}>LogOut <IoMdLogOut /></button>
                            </div>
                        </li>

                    </ul>

                </div>
            </div>

            <div className="w-3/4">

                <div className="flex flex-col w-full border-opacity-50">
                     <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold">Profile</p>
                        <Link to='/dashboard'>
                           <button className="btn  text-xl bg-base-100">Dashboard <FaLongArrowAltRight /></button>
                        </Link>
                     </div>

                    <div className="divider">&&</div>
                    <div className="grid h-16 card bg-base-100 rounded-box place-items-center">
                        <div  className="flex gap-6">
                            <p className=" hover:bg-slate-300 p-2 rounded-xl">Account Details</p>
                             <p className=" hover:bg-slate-300 p-2 rounded-xl">Tranjaction</p>
                        </div>
                    </div>
                </div>

               
                <div className=" bg-base-100 mt-10 border-2 w-2/3 h-[700px] mx-auto rounded-2xl">
                 <p className=" font-semibold text-xl text-center mb-4 mt-2">Personal Details</p>
                 <img className="mx-auto h-[150px]" src={userpic} alt="" />
                 <button className="btn  btn-warning w-full mt-4 mb-12">Upload Your Img <FaLongArrowAltRight /></button>  
                  

                 <form className="p-4" >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Name</span>
                            </label>
                              <input type="text"  defaultValue={user.name} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Email</span>
                            </label>
                            <input type="email" defaultValue={user.email}  className="input input-bordered" />              
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Phone</span>
                            </label>
                            <input type="text" defaultValue={'019087****43'}  className="input input-bordered" />              
                        </div>
                        
                    </form>

                    <div className=" text-end">
                        <button className="btn  btn-warning w-1/3  mt-4 ">Update</button>  
                    </div>
                </div>

            </div>



        </div>


    );
};

export default Profile;