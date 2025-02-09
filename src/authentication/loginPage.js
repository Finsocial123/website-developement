import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
        setErrorMessage(""); // Clear error message on input change
    }

    async function submitHandler(event) {
        event.preventDefault();
        
        try {
            const response = await fetch("http://saveai.tech/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-secret-code": "finsocialdigitalsystemsscretcodes$$$!!!!@@#$$"
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem("authToken", data.token); // Save token in localStorage
                toast.success("Login Successful");
                navigate("/dashboard"); // Redirect to dashboard
            } else {
                setErrorMessage(data.message || "You have entered the wrong password.");
                toast.error(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
            toast.error("Something went wrong. Please try again.");
            console.error("Login error:", error);
        }
    }
    const handleGoogleLogIn = () => {
        toast.success("Google Sign-In successful!");
        navigate("/dashboard");
      };
    
    
    return (
        <div className='flex items-center justify-center bg-gray-800 min-h-screen'>
            <div className='bg-[#0B192C] w-[700px] flex flex-col items-center justify-center mt-10 rounded-3xl min-h-screen p-10'>
                <div className='text-center text-white font-bold text-2xl'>
                    <h1>Welcome To Vulcan</h1>
                </div>
                <button 
                onClick={handleGoogleLogIn}
                className='bg-blue-700 text-white flex items-center justify-center px-20 py-2 mt-10 w-[350px] rounded-lg'>
                    <FcGoogle className='mr-2' />
                    <p>Log in with Google</p>
                </button>
                <div className='w-full flex items-center justify-center mt-5'>
                    <div className='bg-gray-600 w-[40%] h-0.5'></div>
                    <button className='rounded-full bg-gray-600 text-white px-2 mx-2'>OR</button>
                    <div className='bg-gray-600 w-[40%] h-0.5'></div>
                </div>
                <div className='mt-5 w-full flex flex-col items-center'>
                    <form onSubmit={submitHandler} className='w-full flex flex-col items-center'>
                        <label>
                            <div className='text-white'>Email<sup className='text-red-500'>*</sup></div>
                            <input
                                required
                                type='email'
                                value={formData.email}
                                onChange={changeHandler}
                                name='email'
                                className='text-white bg-[#0B192c] rounded-lg w-[300px] border-white border mt-2 p-2 text-center'
                            />
                        </label>
                        <label>
                            <div className='text-white'>Password<sup className='text-red-500'>*</sup></div>
                            <input
                                required
                                type='password'
                                value={formData.password}
                                onChange={changeHandler}
                                name='password'
                                className='text-white bg-[#0B192c] rounded-lg w-[300px] border-white border mt-2 p-2 text-center'
                            />
                        </label>
                        {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
                        <button className='text-white bg-blue-500 px-10 py-2 rounded-lg w-[300px] mt-5 font-semibold'>Log In</button>
                        <div className='flex items-center justify-center'>
                            <p className='text-gray-400 mt-5'>Don’t have an account? 
                                <button 
                                    onClick={() => navigate("/signup")}
                                    className='text-green-700 ml-1'>Sign up</button>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <p 
                        onClick={() => navigate("/forgetPassword")}
                        className='text-white cursor-pointer hover:underline'>Forgot your Password?</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
