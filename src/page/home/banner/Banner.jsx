import img from '../../../assets/image/banner.jpeg'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const Banner = () => {
    return (
         
        <div className=' relative mb-8 md:mb-1'>
              <img className='w-full' src={img} alt="" />
           
           
      <div className='  lg:pb-10'>
      <div   data-aos="fade-up"  data-aos-duration="1000" className=' absolute top-5 md:top-1/3 lg:top-1/2 left-10 md:left-28'>
                <div className=' mt-5  '>  
                    <h1><span className=' text-base md:text-4xl lg:text-5xl'>Enhanced Your</span> <br></br>
                    <span className='text-xl md:text-5xl lg:text-6xl font-semibold'>Learning</span></h1>
                    <div className='flex gap-4 md:flex-row font-semibold mt-4 mb-9 md:mt-8 items-center pb-32 '>
                        <p>Popular</p>
                        <button className="btn btn-sm md:btn-md  text-white text-thin  btn-warning">GRE </button>
                        <button className="btn btn-sm md:btn-md  btn-warning text-white">IELTS </button>
                        <button className="btn btn-sm md:btn-md btn-warning text-white">Python </button>
                    </div>
                </div>
      </div>
           </div>
        </div>
    );
};

export default Banner;