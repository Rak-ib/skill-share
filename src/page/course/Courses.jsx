import img1 from '../../assets/image/card1.jpg'
import img2 from '../../assets/image/card2.jpg'
import img3 from '../../assets/image/card3.jpg'
import img4 from '../../assets/image/card4.jpeg'
// import img1 from '../../assets/image/card5.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

import { FaLongArrowAltRight } from "react-icons/fa";
import Course from './Course';
import bg from '../../assets/image/bg.svg'
import { useEffect, useState } from 'react';

const Courses = () => {

    const [All_Courses, setAll_Courses] = useState([]);
    // useEffect(()=>{
    //      fetch('http://localhost:5000/courses')
    //      .then(res=>res.json())
    //      .then(data=>{
    //       console.log('i am form courses.jsx');
    //       console.log(data);
    //       setAll_Courses(data)
    //      })
    // },[])






    console.log(All_Courses);
    return (
        < div  data-aos="fade-right"  data-aos-duration="1000"   className='mb-8 px-10 max-w-[1370px] mx-auto md:mb-10'>
            <div  className='flex flex-row items-center  justify-center mt-24 mb-8'>
              <h1 className='text-2xl md:text-4xl font-bold text-center p-2 md:pb-4 '>Our Courses</h1>
              <img src={bg}  className="font-bold" width="38" height="38" alt="" />
            </div>
             {/* <hr className="w-1/3 mx-auto border-t mb-6 border-black md:pb-8" /> */}

 

           
            
          <div   className='grid  grid-cols-1 px-2 md:px-10 lg:px-0 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {
                
               All_Courses.map(course=> <Course key={course.course_id} c={course}></Course>)
            }

        

        </div>

      </div>
    );
};

export default Courses;