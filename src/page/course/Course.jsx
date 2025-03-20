import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import CourseDetails from './CourseDetails';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Course = ({c}) => {

    const {_id,course_id,course_name,course_image}=c;
    console.log(course_name);

    const navigate = useNavigate();

    const handleCourseDetails =()=>{
        console.log("mama",course_id,_id);
        navigate(`/courses/${course_id}`);
    }

    return (
        <div>
            
            <div  className="card card-compact bg-base-100 shadow-xl hover:shadow-gray-500 hover:scale-95 hover:cursor-pointer transition ease-in-out delay-150">
                <figure><img className='h-[200px] bg-green-400 w-full'  src={course_image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title  text-xl">{course_name}</h2>
                    <div className="card-actions justify-end">
                    <button onClick={handleCourseDetails} className="btn  btn-warning  mt-4 ">Details <FaLongArrowAltRight /></button> 
                    </div>
                </div>
            </div>  

        </div>
    );
};

export default Course;