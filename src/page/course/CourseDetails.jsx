import { useLoaderData, useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import video from '../../assets/image/Videos-green.svg'
import { MdSlowMotionVideo } from "react-icons/md";
import { FaArrowAltCircleDown, FaArrowLeft, FaArrowRight, FaDotCircle, FaPhone, FaVideo } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiPagesLine } from "react-icons/ri";
import EachModule from "./EachModule";
import { LuDot } from "react-icons/lu";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { GiStarGate } from "react-icons/gi";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";







const CourseDetails = () => {
   const searchData = new URLSearchParams(window.location.search)
   const message = searchData.get('message')
   console.log(message);
   // const [luck, setLuck] = useState(0)
   var luck=false;

   //  console.log("hello it's me :",user.email);
   // const {email}=user;
   // console.log(user);
   // if(email)
   // console.log(email);

   const { course_id } = useParams();
   const course = useLoaderData();
   const { user, loading } = useContext(AuthContext);
   // console.log(user);
   const [Email, setEmail] = useState(course.students);

   if (user) {
      const { email } = user
      if (Email.includes(email)) {
         // setLuck(1)
         luck=true;
         
      }
      else {
         if (message == 'Successful') {
            course.students = [...Email, email];
            console.log('Email add hoice', course.students);
            fetch(`http://localhost:5000/courses/${course._id}`, {
               method: "PUT",
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(course)
            })
               .then(res => res.json())
               .then(data => {
                  console.log("updated data:", data)
                  // setLuck(true)
                  luck=true;
               })
         }
      }
   }
   const { course_image, course_name, starting_date, price, Modules, num_mod, instructors } = course;
   const pay = async () => {
      try {
         const { data } = await axios.post('http://localhost:5000/api/bkash/payment/create', { amount: price, orderId: 1,course:course.price }, { withCredentials: true })
         // console.log("accca ekhane",data);
         if(!luck)
         window.location.href = data.bkashURL
         
      } catch (error) {
         console.log(error)
      }
   }
   // console.log(course_id);

   // console.log(course);
   console.log(course);
   //  const course = [];
   //  AllCourses.forEach(c=>{
   //      if(c.course_id == course_id)
   //      {
   //          course.push(c);
   //      }
   //  })

   //  const [Instructors,setInstructors]=useEffect(instructors);
   //  setInstructors(instructors)




   console.log(course);
   console.log(course_image);
   console.log("The whole Modules =", Modules);

   return (
      <div className=" max-w-[1370px] pl-[30px] mx-auto mt-16  ">

         <div className="block lg:hidden">
            <img src={course_image} alt="" />
         </div>

         <div className="flex  flex-col  md:flex-row gap-5 ">
            {/* left side */}
            <div className=" w-[100%] md:w-3/5">
               <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl mt-8 lg:mt-2">{course_name}</h1>
               <p className="my-4">সবচেয়ে গোছানো ও আপডেটেড কারিকুলামে বাংলা ভাষায় লারাভেল ডেভেলপার হবার বেস্ট জার্নি অপেক্ষা করছে আপনার জন্য। সাথে আছেন বেস্ট দুইজন মেন্টর- হাসিন হায়দার ও রাব্বিল হাসান রুপম</p>

               <div className="flex border-l-2 border-orange-500 flex-row gap-16 bg-white rounded-r-2xl px-3 w-[90%] md:w-3/5 py-7 mt-5">
                  <div>
                     <div className="flex flex-row gap-2 items-center">
                        <SlCalender className="text-lg text-orange-500 font-bold"></SlCalender>
                        <p>শুরু হবে</p>
                     </div>
                     <div>{starting_date}</div>
                  </div>

                  <div className="border-l-4 border-orange-500"></div>

                  <div className="">
                     <div className="flex flex-row gap-2 items-center ">
                        <SlCalender className="text-lg text-orange-500 font-bold"></SlCalender>
                        <p>ক্লাস শিডিউল</p>
                     </div>
                     <div>রবি,মঙ্গল (রাত ৯:০০ - ১০:৩০) </div>
                  </div>

               </div>

               <div className="flex justify-between border-l-2 border-green-400 flex-row gap-16 bg-white rounded-r-2xl px-3 w-[90%] md:w-3/5 py-7 mt-5">
                  <div>
                     <img alt="" />
                  </div>



                  <div>
                     <button className="btn bg-base-200">
                        <MdSlowMotionVideo className="text-xl"></MdSlowMotionVideo>
                        Open video
                     </button>
                  </div>

               </div>


               {/* study plan.. */}
               <div className="flex flex-row gap-4 md:gap-8 items-center mt-20">
                  <h2 className="text-3xl font-black">স্টাডি প্ল্যান</h2>
                  <div className="flex flex-row md:gap-4 text-gray-700 text-sm items-center">
                     <p>{num_mod} টি মডিউল</p>
                     <p className="flex flex-row items-center"><LuDot className="text-2xl mt-1 font-thin"></LuDot>৪৮ টি লাইভ ক্লাস</p>
                     <p className="flex flex-row items-center"><LuDot className="text-2xl mt-1 font-thin"></LuDot>১৬ টি এসাইনমেন্ট</p>

                  </div>
               </div>

               <div className="px-1 py-4 space-y-5">

                  {
                     Modules.map(mod => <EachModule module={mod} luck={luck} key={mod.module_id}></EachModule>)
                  }

               </div>

               {/* instructor */}
               <div className="mt-16">
                  <h2 className="font-bold text-3xl mb-5">Instructor</h2>


                  <div className="px-4 border-l-4 border-orange-400 rounded-s-lg rounded-r-lg bg-red-100 py-4">
                     <h2 className="flex flex-row gap-2 items-center text-xl font-medium"><img src="https://cdn.ostad.app/public/upload/2023-07-24T09-18-22.697Z-image%2047.png" alt="" />Lead Instructor</h2>
                     <p>ok boss{instructors[0].instructor_name}</p>

                     {
                        instructors.map((instructor, index) =>
                           <div key={index} className="flex flex-row gap-4 bg-white my-4 rounded-xl px-4 py-2 items-center">
                              <div className="avatar">
                                 <div className="w-24 rounded-full">
                                    <img src={instructor.instructor_image} alt={instructor.instructor_name} />
                                 </div>
                              </div>
                              <div>
                                 <h2 className="font-bold text-lg">{instructor.instructor_name}</h2>
                                 <h2>{instructor.instructor_specialties}</h2>
                              </div>
                           </div>
                        )
                     }






                  </div>


                  {/* support instructor */}



               </div>

               <div className="mt-16">
                  <h2 className="font-bold text-3xl mb-5">About Course</h2>
                  <div className="border-b border-gray-300 mb-3"></div>


                  <p>সফটওয়ার ইঞ্জিনিয়ার নিয়োগ দেওয়ার ক্ষেত্রে দেশি বা বিদেশি টেক কোম্পানিগুলো কোডিং ইন্টারভিউ নিয়ে থাকেন যেখানে মূলত ক্যান্ডিডেটের প্রবলেম সলভিং এবিলিটি যাচাই করা হয়ে থাকে। আর এ কোয়েশ্চনগুলো ম্যাক্সিমাম ক্ষেত্রেই থাকে ডাটা স্ট্রাকচার এবং অ্যালগরিদমকে কেন্দ্র করে। আর এসব কোডিং ইন্টারভিউ ক্র্যাক করার জন্য দরকার আলাদা প্রস্তুতি। আর তাই ওস্তাদ নিয়ে এলো বাংলাদেশের প্রথম “Cracking Coding Interview” লাইভ কোর্স।
                     আর ইন্সট্রাকশনে আছেন বাংলাদেশের প্রোগ্রামিং শেখানোর পথিকৃৎ তামিম শাহরিয়ার সুবিন ভাই। </p>
               </div>

            </div>


            {/* right side */}
            <div className="w-full md:w-2/5  " >
               <img className="hidden lg:block" src={course_image} alt="" />
               {/* <img className="opacity-0  lg:opacity-100" src={course_image} alt="" /> */}

               <div style={{ position: "sticky", top: "100px" }} className=" border-t border-s border-r border-b border-gray-300 h-[500px] rounded-b-xl ">
                  <div className="px-4">
                     <h2 className="font-bold text-4xl text-left mt-16 flex flex-row items-center5  text-orange-400"><span>৳</span>{price}</h2>
                     {/* <button className="btn py-8 text-xl  pb-8 w-full bg-yellow-400">Enroll Now -</button> */}
                     {!luck && <button onClick={pay} className="btn hover:bg-yellow-500 bg-yellow-400 w-full h-16 mt-8 text-xl font-semibold">Enroll Now <FaArrowRight className="font-light"></FaArrowRight> </button>
}
                     <div className=" mt-8 px-4 ">
                        <h2 className="font-bold text-xl">এই কোর্সে আপনি পাচ্ছেন</h2>
                        <div className="flex flex-row gap-5 mt-4">

                           <div>
                              <p>১৬ সপ্তাহের স্টাডিপ্ল্যান</p>
                              <p>Leetcode easy to medium প্রবলেমস</p>
                              <p>ভিডিও রিসোর্স</p>
                              <p>অ্যাসেসমেন্ট</p>
                           </div>
                           <div>
                              <p>১৬ সপ্তাহের স্টাডিপ্ল্যান</p>
                              <p>Leetcode easy to medium প্রবলেমস</p>
                              <p>ভিডিও রিসোর্স</p>
                              <p>অ্যাসেসমেন্ট</p>
                           </div>

                        </div>


                     </div>
                  </div>

                  <div className="flex flex-row gap-4 mt-8 border-t border-gray-300 w-full justify-center items-center ">
                     <h2 className="mt-4 text-orange-500 font-semibold flex flex-row gap-2 items-center text-medium"><FaPhoneVolume></FaPhoneVolume>Call:017893499 <span className="text-black">
                        (10 am to 10 pm)</span></h2>

                  </div>

               </div>



            </div>

         </div>


      </div>
   );
};

export default CourseDetails;