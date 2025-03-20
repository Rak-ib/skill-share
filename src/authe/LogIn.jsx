import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from './../assets/login/login.svg'
// import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
//import USeAxioseSecure from '../hooks/USeAxioseSecure';


const LogIn = () => {

    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const [regerror, setRegerror] = useState('')

    const handleLogin =async( event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        setRegerror('');


        try {
            const res=await signIn(email,password);
            console.log("login successfull",res);
            navigate(location?.state ? location.state : '/login');

                if (!location.state) {
                    navigate('/')
                }
        } catch (error) {
            console.log("login failed", error)
        }
            
    }

    return (
        <div className="hero  lg:h-[600px] bg-black rounded-xl">
        <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
                <img src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    {/* <p className="text-center"><button onClick={hadleGoogleSign} className="btn btn-link md:text-xm text-orange-700">Google-Login!</button></p> */}
                    {/* <p className="text-center"><button onClick={hadleGoogleSign} className="btn  md:text-xm  text-green-600"><span className=' text-3xl'><FcGoogle /></span> Google-Login!</button></p> */}

                    {
                       regerror && <p className="text-xm text-red-700 text-center">{regerror}</p>
                    }

                    <p className='my-4 text-center'>New to Skill share <Link className='text-orange-600 font-bold' to="/signup">Sign Up</Link> </p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default LogIn;