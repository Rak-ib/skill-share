import { useEffect, useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import AddCourseSub from "./AddCourseSub";



const AddCourse = () => {
    const [myappli, setMyappli] = useState([]);
    //From Custom Hook
    const auth = UseAuth();
    const { user } = auth;

   const url = `http://localhost:5000/apply?email=${user?.email}`;
   useEffect(() => {
       fetch(url)
           .then(res => res.json())
           .then(data => setMyappli(data))

       // axiosSecure.get(url)
       // .then(res => setBookings(res.data))

   }, [url]);


    return (
        <div className="  text-center mt-10">
            {/* <button className="btn btn-wide bg-black text-white ">Add New Course</button> */}
            <h1 className="text-2xl bg-black text-white p-4 text-center border-b-2 mt-4 font-semibold">Approved Course Application List </h1>
            <div className="mt-2">
        <div >
            {/* <div className="text-center">
                 <h1 className="bg-black p-4 text-2xl font-semibold text-white"> Admin Pannel</h1>
            </div> */}
            <div className="overflow-x-auto w-full mt-12 ">
                <table className="table w-full">
                    {/* head */}
                    <thead className="text-2xl font-semibold  text-black">
                        <tr>
                            <th>
                            
                                CourseID
                                {/* <label>
                                    <input type="checkbox" className="checkbox" />
                                </label> */}
                            </th>
                            <th>ContentName</th>
                            <th>Status</th>
                            <th>Add Course</th>
                            {/* <th>Date</th>
                            <th>Price</th>
                            <th>Status</th> */}
                        </tr>
                    </thead>
                    <tbody className="text-xl border-t-4">
                        {
                            myappli.map(booking => <AddCourseSub
                            
                                key={booking._id}
                                booking={booking}
                                //handleBookingConfirm={handleBookingConfirm}
                            ></AddCourseSub>)

                        }

                    </tbody>

                </table>
            </div>
        </div>
       </div>

        </div>
    );
};

export default AddCourse;