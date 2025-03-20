import { useEffect, useState } from "react";
import YourSub from "./YourSub";
import UseAuth from "../../../hooks/UseAuth";



const YourCourse = () => {
    const [applica, setApplica] = useState([]); 
     //From Custom Hook
     const auth = UseAuth();
     const { user } = auth;

    const url = `http://localhost:5000/courses?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setApplica(data))
 
        // axiosSecure.get(url)
        // .then(res => setBookings(res.data))
 
    }, [url]);

    return (
        <div>
             <h1 className="text-2xl bg-black text-white p-4 text-center border-b-2 mt-4 font-semibold">My added Course Details </h1>
             <div className="grid grid-cols-2 gap-6 mt-4">
                {
                     applica.map(booking =>
                        <YourSub
                        key={booking._id}
                        booking={booking}
                      
                        ></YourSub>
                    )
                }
             </div>
        </div>
    );
};

export default YourCourse;