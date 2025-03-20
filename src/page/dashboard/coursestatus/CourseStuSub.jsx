import { FaTrashAlt } from "react-icons/fa";


const CourseStuSub = ({ booking}) => {
    const {con_name,status,date}=booking;
    return (
        <tr>
        <th>
           <FaTrashAlt className="text-red-600"></FaTrashAlt>
            {/* <button  className="btn btn-sm btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button> */}
        </th>
        {/* <td>
            <div className="avatar">
                <div className="rounded w-24 h-24">
                    {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
                </div>
            </div>
        </td> */}
        {/* <td>
            {service}
        </td> */}
        <td>{con_name}</td>
        <td>{date}</td>
        <th className="text-xl">
            {
                status === 'confirm' ? <span className="font-bold text-primary">Approved</span> 
                :<button className="btn text-xm border-2 bg-black text-white ">Pending</button>
            }
        </th>
       
        </tr>
    );
};

export default CourseStuSub;