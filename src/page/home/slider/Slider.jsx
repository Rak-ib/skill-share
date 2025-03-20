import { useEffect,useState } from 'react';
import img1 from '../../../assets/img1/1.png'
import img2 from '../../../assets/img1/2.png'
import img3 from '../../../assets/img1/3.png'
import img4 from '../../../assets/img1/4.png'
import img5 from '../../../assets/img1/5.png'
import { Link } from 'react-router-dom';

const Slider = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    { id: 1, content: 'Critical Thinking', image: img1 },
    { id: 2, content: 'Case Study', image: img2 },
    { id: 3, content: 'web dev', image: img3 },
    { id: 4, content: 'Item 4', image: img4 },
    { id: 5, content: 'Item 5', image: img5 },
    // Add more items as needed
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []); // Run effect only once when component mounts

  const updateCarousel = () => {
    const translateValue = -currentIndex * 100 + '%';
    return { transform: `translateX(${translateValue})`, transition: 'transform 0.5s ease' };
  };






    return (
        <div className=" px-20 py-20 text-center bg-gradient-to-r from-blue-500 to-cyan-500 ...">
              <h1 className='text-3xl p-4 text-white font-medium'>Select Your <span className=' font-black text-orange-500'>Favourite </span>Category & Start Learning.</h1>
           
   <div className='flex flex-row gap-0 mt-4'>

      
             <div className={`py-10 `} style={{ display: 'flex', overflow: 'hidden', width: '600px', margin: 'auto' }}>
                  {items.map((item) => (
                    <div className='bg-white shadow-2xl hover:border-8 hover:border-yellow-600  flex flex-col justify-between rounded-2xl mx-4 md:mx-10' key={item.id} style={{ minWidth: '50%', boxSizing: 'border-box', ...updateCarousel() }}>
                      {/* Your content for each item goes here */}
                      <Link to="/"><img src={item.image} alt={item.content} style={{ width: '100%' }} /></Link>
                      <h2 className='my-4 text-xl font-bold'>{item.content}</h2>
                    </div>
                  ))}
             </div>
     

   </div>

             

   
        </div>
    );
};

export default Slider;