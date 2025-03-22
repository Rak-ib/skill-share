



const AdminSub = ({ application, onStatusChange }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">{application.fullName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-700"><strong>Course Title:</strong> {application.courseTitle}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {application.email}</p>
                    <p className="text-gray-700"><strong>Duration:</strong> {application.duration}</p>
                    <p className="text-gray-700"><strong>Price:</strong> ${application.price}</p>
                    <p className="text-gray-700"><strong>LinkedIn:</strong> 
                        <a href={application.linkedInProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500"> View Profile</a>
                    </p>
                    <p className="text-gray-700"><strong>Bank Details:</strong> {application.bankAccountDetails}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Documents</h3>
                    <img src={application.governmentID} alt="Gov ID" className="w-40 rounded-lg my-2" />
                    <video controls className="w-full rounded-lg mt-2">
                        <source src={application.demoVideo} type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Status Section */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Status</h3>
                <span className={`badge ${application.status === "pending" ? "badge-warning" : application.status === "approved" ? "badge-success" : "badge-error"}`}>
                    {application.status}
                </span>

                <div className="mt-3 space-x-3">
                    <button className="btn btn-success" onClick={() => onStatusChange(application._id, "approved")}>Approve</button>
                    <button className="btn btn-error" onClick={() => onStatusChange(application._id, "rejected")}>Reject</button>
                </div>
            </div>
        </div>
    );
};

export default AdminSub;
