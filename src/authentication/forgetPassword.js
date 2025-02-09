import React from "react";

import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgetPassword=()=>
{
    const navigate=useNavigate();
    const notify=()=>
    {
        toast.success("Email sent successfully");
    };
    return(
        <div className="bg-black h-screen">
        <div className="flex items-center justify-center ">
            <div className="flex  flex-col items-center justify-center bg-[#0B192C] w-[700px] mt-[100px] rounded-lg mb-6 ">
                <div>
                    {/*<img src={logo} alt="logo" className="w-[200px] h-[30px] mt-10"></img>*/}
                </div>
                <div>
                    <h1 className="text-white text-2xl font-semibold mt-4">Sign in to Finsocial</h1>
                </div>
                <div>
                    <input type="email" placeholder="Email" className="w-[350px] rounded-lg mt-10 bg-[#10192C] border border-white h-8 text-white"></input>
                </div>
                <Link to="/forgetPassword">
                    <button 
                    onClick={notify}
                    className="text-white border border-white px-15 py-1  mt-5 w-[350px] rounded-2xl bg-purple-500">Send email to reset password</button>
                </Link>
                <div>
                    <p 
                    onClick={()=>navigate("/")}
                    className="text-gray-500 hover:text-white hover:cursor-pointer mt-5">Go Back</p>
                </div>

                <div>
                    <p 
                    
                    className="text-white mt-10">Don't have an account ? <button
                    onClick={()=>navigate("/signup")}
                     className="text-green-600">Sign up</button></p>
                </div>
                <div>
                        <p className='text-gray-500 mt-8 mb-[100px]'>By signing up, you agree to the <button className="text-greenLight">Terms of Service</button> and <button className="text-greenLight">
                            Privacy Policy</button></p>
                    </div>

            </div>
        </div>
        </div>
    )
}
export default ForgetPassword;