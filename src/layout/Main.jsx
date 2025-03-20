import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";


const Main = () => {
    return (
        <div className="mx-auto">
            <div className="fixed top-0 z-10 w-full  ">
                <Navbar />
            </div>
            <div className="pt-20">
                <Outlet />
            </div>
            {/* <Footer />
            <ToastContainer /> */}
        </div>
    );
};

export default Main;