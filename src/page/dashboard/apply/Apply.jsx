import { useState } from "react";
import USeAxioseSecure from "../../../hooks/USeAxioseSecure";
import UseAuth from "../../../hooks/UseAuth";

const CLOUDINARY_UPLOAD_PRESET = "kcig1ito";
const CLOUDINARY_CLOUD_NAME = "dcao1wljw";

const Apply = () => {
    const auth = UseAuth();
    const { user } = auth;
    const axiosSecure = USeAxioseSecure();

    // State to store uploaded URLs
    const [governmentIDUrl, setGovernmentIDUrl] = useState("");
    const [courseThumbnailUrl, setCourseThumbnailUrl] = useState("");
    const [demoVideoUrl, setDemoVideoUrl] = useState("");
    const [syllabusPdfUrl, setSyllabusPdfUrl] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle File Upload (Image/Video/PDF)
    const handleFileUpload = async (event, setFileUrl, type) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        // Determine the upload URL based on file type
        const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${
            type === "pdf" ? "raw" : type
        }/upload`;

        try {
            const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("data",data)
            if (data.secure_url) {
                setFileUrl(data.secure_url);
            }
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!governmentIDUrl || !courseThumbnailUrl || !syllabusPdfUrl) {
            alert("Please upload all required files before submitting!");
            return;
        }

        const form = event.target;
        const newApplication = {
            email: user.email,
            fullName: form.fullName.value,
            mobileNumber: form.mobileNumber.value,
            governmentID: governmentIDUrl,
            linkedInProfile: form.linkedInProfile.value,
            course: form.course.value,
            courseDescription: form.courseDescription.value,
            price: parseFloat(form.price.value),
            duration: form.duration.value,
            syllabus: syllabusPdfUrl, // Now storing the PDF URL instead of text
            demoVideo: demoVideoUrl || "",
            courseThumbnail: courseThumbnailUrl,
            bankAccountDetails: form.bankAccountDetails.value,
            agreementSigned: form.agreementSigned.checked,
            status: "pending"
        };

        try {
            const res = await axiosSecure.post('/apply', newApplication);
            if (res.data.insertedId) {
                alert("Application Submitted Successfully!");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    return (
        <div>
            <h1 className="text-4xl text-center border-b-2 mt-4 font-semibold">Application Form</h1>

            <div className="bg-black p-10 mt-6 rounded-xl">
                <h2 className="text-center text-2xl mb-6 text-white font-semibold">Apply to Teach</h2>

                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Other form fields */}
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Full Name</span></label>
                            <input type="text" name="fullName" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Email</span></label>
                            <input type="email" name="email" value={user.email} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Mobile Number</span></label>
                            <input type="text" name="mobileNumber" className="input input-bordered" pattern="[0-9]{11}" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">LinkedIn Profile (Optional)</span></label>
                            <input type="url" name="linkedInProfile" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Course Name</span></label>
                            <input type="text" name="course" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Course Description</span></label>
                            <textarea name="courseDescription" className="input input-bordered" minLength="50" required></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Price</span></label>
                            <input type="number" name="price" className="input input-bordered" min="0" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">{'Duration (e.g., 6 weeks)'}</span></label>
                            <input type="text" name="duration" className="input input-bordered" required />
                        </div>

                        {/* Syllabus PDF Upload */}
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Syllabus Outline (Upload PDF)</span></label>
                            <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, setSyllabusPdfUrl, "pdf")} className="file-input" />
                            {syllabusPdfUrl && <a href={syllabusPdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2">View Syllabus</a>}
                        </div>

                        {/* Government ID Upload */}
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Government ID</span></label>
                            <input type="file" onChange={(e) => handleFileUpload(e, setGovernmentIDUrl, "image")} className="file-input" />
                            {governmentIDUrl && <img src={governmentIDUrl} alt="Gov ID" className="mt-2 w-20 h-20 rounded" />}
                        </div>

                        {/* Course Thumbnail Upload */}
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Course Thumbnail</span></label>
                            <input type="file" onChange={(e) => handleFileUpload(e, setCourseThumbnailUrl, "image")} className="file-input" />
                            {courseThumbnailUrl && <img src={courseThumbnailUrl} alt="Course Thumbnail" className="mt-2 w-20 h-20 rounded" />}
                        </div>

                        {/* Demo Video Upload */}
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Demo Video (Optional)</span></label>
                            <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, setDemoVideoUrl, "video")} className="file-input" />
                            {demoVideoUrl && (
                                <video controls className="mt-2 w-40">
                                    <source src={demoVideoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? "Uploading..." : "Submit Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Apply;
