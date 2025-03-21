import { 
    useEffect,
     useState } from "react";
import AdminSub from "./AdminSub";
import axios from "axios";

const Admin = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/applications/apply",{withCredentials:true});
            console.log("fetched ",data)
            setApplications(data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const handleStatusChange = async (appId, newStatus) => {
        try {
            await axios.put(`/api/applications/${appId}`, { status: newStatus });
            fetchApplications();
            setSelectedApplication(prev => prev && prev._id === appId ? { ...prev, status: newStatus } : prev);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    if(applications==[])
        return <span className="loading loading-ring loading-lg"></span>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard - Applications</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Applications List */}
                <div className="bg-white p-4 rounded-lg shadow-md md:col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Applications</h2>
                    <ul>
                        {applications.map((app) => (
                            <li
                                key={app._id}
                                className={`p-3 cursor-pointer rounded-md flex justify-between items-center
                                     ${
                                    selectedApplication?._id === app._id ? 
                                    "bg-blue-100" : "hover:bg-gray-200"
                                }`}
                                
                                onClick={() => setSelectedApplication(app)}
                            >
                                <span>
                                    <strong>{app.fullName}</strong> - {app.courseTitle}
                                </span>
                                <span
                                    className={`badge ${app.status === "pending" ? "badge-warning" : app.status === "approved" ? "badge-success" : "badge-error"}`}
                                >
                                    {app.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Application Details */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                    {selectedApplication ? (
                        <AdminSub application={selectedApplication} onStatusChange={handleStatusChange} />
                    ) : (
                        <p className="text-gray-600 text-center">Click an application to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
