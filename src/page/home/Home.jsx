import Footer from "../../shared/Footer";
import Courses from "../course/Courses";
import Banner from "./banner/Banner";
import Contact from "./contact/Contact";
import Slider from "./slider/Slider";


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Slider></Slider>
            <Courses></Courses>
            <Contact></Contact>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;