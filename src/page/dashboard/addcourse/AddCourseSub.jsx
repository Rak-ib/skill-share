import { Link } from "react-router-dom";


const AddCourseSub = ({ booking }) => {
    const { con_name, status, _id } = booking;
    return (

        <>
            {status == 'confirm' &&
                <tr>
                    <td>{_id}</td>
                    <td>{con_name}</td>

                    <td className=" text-green-500"> Approved

                    </td>

                    <td><button  className="btn btn-wide bg-black text-white ">

                        <Link to={`/addnewcourse/${_id}`}>
                        Add New Course</Link>



                    </button></td>
                </tr>
            }
        </>

    );
};

export default AddCourseSub;