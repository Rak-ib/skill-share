import { GoLocation, } from 'react-icons/go';
import { FcCallback } from 'react-icons/fc';
import {BsFillCalendarDateFill  } from 'react-icons/bs';


const Contact = () => {
    return (
        <div className="flex flex-col   space-y-4 md:flex-row md:justify-around bg-black   p-12 rounded-xl text-white font-semibold">
            <div className='flex items-center gap-4'>
                <div data-aos="flip-left">
                  <BsFillCalendarDateFill className='text-3xl' ></BsFillCalendarDateFill>
                </div>
                <div>
                    <p>We are open monday-friday</p>
                    <h1>7:00 am - 9:00 pm</h1>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div data-aos="flip-left">
                   <FcCallback className='text-3xl'></FcCallback>
                </div>
                <div>
                    <p>Have a question?</p>
                    <h1>+2546 251 2658</h1>
                </div>
            </div>
            <div  className='flex items-center gap-4'> 
                <div data-aos="flip-left">
                    <GoLocation className='text-3xl'></GoLocation>
                </div>
                <div>
                    <p>Need a repair? our address</p>
                    <h1>Liza Street, New York</h1>
                </div>
            </div>
        </div>
    );
};

export default Contact;