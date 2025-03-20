
import { Link, NavLink} from "react-router-dom";



import logo from './../assets/Logo-new.png'
import userpic from './../assets/user.png'
import { FaLongArrowAltRight } from "react-icons/fa";
// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
import UseAuth from "../hooks/UseAuth";


const Navbar = () => {
     const auth=UseAuth();
     const {user}=auth;
    const navItems = <>

        <li className="mr-2" ><NavLink className="hover:bg-slate-300 p-3 rounded-xl " to="/">Home</NavLink> </li>

        <li className="mr-2" ><NavLink className="hover:bg-slate-300 p-3 rounded-xl " to="/dashboard">About</NavLink> </li>
        <li className="mr-2" ><NavLink className="hover:bg-slate-300 p-3  rounded-xl " to="/">Course</NavLink> </li>
        <li className="mr-2" ><NavLink className="hover:bg-slate-300 p-3  rounded-xl " to="/demo">Demo</NavLink> </li>

        <li className="mr-2" ><NavLink className="hover:bg-slate-300 p-3 rounded-xl " to="/kkkk">About</NavLink> </li>
        <li className="mr-2" ><NavLink className="hover:bg-slate-300 p-3  rounded-xl " to="/">Course</NavLink> </li>

    </>

    return (
        <div className="navbar h-22 mb-1 p-4  bg-slate-100 rounded-xl font-bold  ">
           <div className="max-w-[1370px] mx-auto navbar">
           <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img className="h-[40px]" src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex " >
                <ul className="text-xm menu-horizontal px-1 lg:items-center  p-2 " >
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <p className="mr-2 font-thin">
                    {
                        user && <span className="mr-2  text-green-600 font-bold">{user.displayName}</span>
                    }
                </p>
                {user &&
                    <Link to='/profile'>
                        <label tabIndex={0} className="btn btn-sm btn-circle avatar mr-4">
                            <div className="w-12 rounded-full">
                                <img src={userpic} />
                            </div>
                        </label>
                    </Link>
                }
                {!user ? <NavLink to='/login'> <button className="btn btn-sm md:btn-md btn-warning">Login <FaLongArrowAltRight /></button></NavLink>:''
                //    <button onClick={handleSignOut} className="btn btn-outline btn-warning">LogOut <FaLongArrowAltRight /></button>
                //    :
                }




            </div>

           </div>
        </div>
    );
};

export default Navbar;