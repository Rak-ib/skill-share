import { useNavigate } from "react-router-dom";

const AddCourseSub = ({ application }) => {
    const { courseTitle, status, _id } = application;
    const navigate = useNavigate();

    console.log("hey ", courseTitle);

    const handleNavigation = () => {
        navigate(`/dashboard/addNewCourse/${_id}`);
    };

    return (
        <>
            {status === "approved" && (
                <tr>
                    <td>{_id}</td>
                    <td>{courseTitle}</td>
                    <td className="text-green-500">{status}</td>
                    <td>
                        <button
                            className="btn btn-wide bg-black text-white"
                            onClick={handleNavigation}
                        >
                            Add New Course
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
};

export default AddCourseSub;
