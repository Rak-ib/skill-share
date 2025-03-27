import { useState, useEffect } from "react";
import UseAuth from "../../../hooks/UseAuth";
import AddCourseSub from "./AddCourseSub";
import axios from "axios";

const AddCourse = () => {
    const [applications, setApplication] = useState([]);
    const auth = UseAuth();
    const { user } = auth;

    const checkUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/applications/apply/user?email=${user?.email}`, {
                withCredentials: true
            });
            console.log('response',response.data)
            setApplication(response.data);
        } catch (error) {
            console.log(error); // User is not logged in or token expired
        }
    };

    useEffect(() => {
        console.log("i am from add course")
        if (user) {
            checkUser();
        }
    }, [user]);

    if (!user) {
        return <span className="loading loading-ring loading-lg"></span>;
    }

    return (
        <div className="text-center mt-10">
            <h1 className="text-2xl bg-black text-white p-4 text-center border-b-2 mt-4 font-semibold">Approved Course Application List</h1>
            <div className="mt-2">
                <div>
                    <div className="overflow-x-auto w-full mt-12">
                        <table className="table w-full">
                            <thead className="text-2xl font-semibold text-black">
                                <tr>
                                    <th>CourseID</th>
                                    <th>ContentName</th>
                                    <th>Status</th>
                                    <th>Add Course</th>
                                </tr>
                            </thead>
                            <tbody className="text-xl border-t-4">
                                {applications.map(application => (
                                    <AddCourseSub key={application._id} application={application} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;