
import { Link, useNavigate } from 'react-router-dom';
import img from './../assets/login/login.svg'
import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const SignUp = () => {
   const { createUser } = useContext(AuthContext)

    // Error show
    const [regerror, setRegerror] = useState('')
    const navigate = useNavigate();

    const handleSignUp = async(event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)

        //resetError
         setRegerror('');

        // if (password.length < 6) {
        //     setRegerror('Password should at least 6')
        //     return;
        // }
        //password uppercase check->Regular Expression
        // if (!/[A-Z]/.test(password)) {
        //     setRegerror('password should have at least one uppercase')
        //     return;
        // }
        //Special cha
        // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        //     setRegerror('password should have at least one Special Character')
        //     return;
        // }
        
        try {
            const res = await createUser(name, email, password);
            console.log("User created:", res);
            
            // ✅ Redirect user to login after successful signup
            navigate("/login"); 
    
            // ✅ Reset form after success
            // form.reset();
        } catch (err) {
            console.error("Signup failed:", err);
            setRegerror(err.response?.data?.message || "Signup failed. Try again.");
        }


        

    }

    return (
        <div className="hero lg:h-[600px] bg-black rounded-xl">
        <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
                <img src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                    <form onSubmit={handleSignUp}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className='my-4 text-center'>Already Have an Account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>

                    {
                        regerror && <p className="text-xm text-red-700 text-center font-semibold">{regerror}</p>
                    }

                </div>
            </div>
        </div>
    </div>
    );
};

export default SignUp;