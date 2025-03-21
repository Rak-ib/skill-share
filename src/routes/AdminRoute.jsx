import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
   const { user, loading } = useContext(AuthContext);
   
       //go to location(Ami jei tai jete chai)
       
       const location = useLocation();
       console.log(location.pathname)
   
       if (loading) {
           return <span className="loading loading-ring loading-lg"></span>;
       }
   
       if (user&&user.role=="admin") {
           console.log("from private route bro",user.role)
           return children;
       }
   
       return <Navigate state={location.pathname} to="/profile"></Navigate>
};

export default AdminRoute;