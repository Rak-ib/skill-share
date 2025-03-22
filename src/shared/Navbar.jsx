import { Link, NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import logo from "./../assets/Logo-new.png";
import userpic from "./../assets/user.png";
import UseAuth from "../hooks/UseAuth";
import { useSocket } from "../provider/SocketProvider";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const auth = UseAuth();
    const { user } = auth;
    const { notifications: realTimeNotifications } = useSocket(); // Get real-time notifications from socket context
    const [notifications, setNotifications] = useState([]);

    // Fetch notifications from the backend
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:5000/notifications/notification", {
                    withCredentials: true,
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        if (user?._id) {
            fetchNotifications();
        }
    }, [user?._id]);

    // Combine real-time notifications with fetched notifications
    const allNotifications = [...realTimeNotifications, ...notifications].slice(0, 10); // Show latest 10

    return (
        <div className="navbar h-22 mb-1 p-4 bg-slate-100 rounded-xl font-bold">
            <div className="max-w-[1370px] mx-auto navbar">
                <div className="navbar-start">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        <img className="h-[40px]" src={logo} alt="Logo" />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="text-xm menu-horizontal px-1 lg:items-center p-2">
                        <li className="mr-2">
                            <NavLink className="hover:bg-slate-300 p-3 rounded-xl" to="/">Home</NavLink>
                        </li>
                        <li className="mr-2">
                            <NavLink className="hover:bg-slate-300 p-3 rounded-xl" to="/dashboard">Dashboard</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end flex items-center">
                    {/* Notifications Bell Icon */}
                    <div className="relative">
                        <button className="btn btn-circle">
                            🔔
                            {allNotifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {allNotifications.length}
                                </span>
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {allNotifications.length > 0 && (
                            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2">
                                {allNotifications.map((notif, index) => (
                                    <div key={index} className="border-b p-2">
                                        {notif.message} {notif.isRead ? "(Read)" : "(Unread)"}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    {user && (
                        <Link to="/profile">
                            <label tabIndex={0} className="btn btn-sm btn-circle avatar mr-4">
                                <div className="w-12 rounded-full">
                                    <img src={userpic} alt="User" />
                                </div>
                            </label>
                        </Link>
                    )}

                    {/* Login Button */}
                    {!user ? (
                        <NavLink to="/login">
                            <button className="btn btn-sm md:btn-md btn-warning">
                                Login <FaLongArrowAltRight />
                            </button>
                        </NavLink>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Navbar;