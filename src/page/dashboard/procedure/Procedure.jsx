import { IoIosCheckmarkCircle } from "react-icons/io";
const Procedure = () => {
    return (
        <div>
            <h1 className="text-4xl text-center border-b-2 mt-4 font-semibold">Procedure for Add New Course</h1>
            <p  className="text-2xl mt-2 flex items-center font-semibold text-teal-600"  > <IoIosCheckmarkCircle></IoIosCheckmarkCircle>If you can Add a New Course please Follow this step: </p>
            <div className="text-center mt-8">
                <ul className="text-xl">
                    <li>1. Apply for Add Course to Admin.</li>
                    <li> 2. Please wait till Your application can Approved.</li>
                    <li>3. After Approved You Can Add New Course.</li>
                </ul>
            </div>
        </div>
    );
};

export default Procedure;