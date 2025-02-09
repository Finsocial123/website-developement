import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const SIGNUP_URL = "http://saveai.tech/api/auth/signup";
  
  const SECRET_KEY = "finsocialdigitalsystemsscretcodes$$$!!!!@@#$$";

  // Handle form input changes
  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // Handle Sign-Up
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret-code": SECRET_KEY,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Sign up successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Sign-Up Error:", error);
      toast.error("Sign up failed!");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    toast.success("Google Sign-In successful!");
    navigate("/dashboard");
  };


  
  return (
    <div className="bg-black">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-[#0B192C] w-[700px] mt-10 rounded-lg mb-6 min-h-screen">
          <p className="text-white font-semibold text-2xl mt-5">
            Sign up for Vulcan
          </p>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="border border-white text-white flex items-center justify-center px-20 py-1 mt-5 w-[350px] rounded-2xl"
          >
            <FcGoogle className="mr-2" />
            <p>Sign up with Google</p>
          </button>

          <div className="mt-5 h-0.5 bg-gray-600 w-[350px]"></div>

          {/* Username/Email/Password Form */}
          <div className="mt-5">
            <form onSubmit={submitHandler}>
              <div className="flex flex-col items-center justify-center">
                <label>
                  <div className="text-white">Email<sup className="text-red-500">*</sup></div>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={changeHandler}
                    name="email"
                    className="text-white bg-[#0B192c] rounded-2xl w-[350px] border-white border mt-2 px-3 py-1"
                  />
                </label>

                <label>
                  <div className="text-white mt-2">Username<sup className="text-red-500">*</sup></div>
                  <input
                    required
                    type="text"
                    value={formData.username}
                    onChange={changeHandler}
                    name="username"
                    className="text-white bg-[#0B192c] rounded-2xl w-[350px] border-white border mt-2 px-3 py-1"
                  />
                </label>

                <label>
                  <div className="text-white mt-2">Password<sup className="text-red-500">*</sup></div>
                  <input
                    required
                    type="password"
                    value={formData.password}
                    onChange={changeHandler}
                    name="password"
                    className="text-white bg-[#0B192c] rounded-2xl w-[350px] border-white border mt-2 px-3 py-1"
                  />
                </label>
              </div>

              {/* Sign-Up Button */}
              <div className="flex items-center justify-center">
                <button className="text-white bg-purple-500 px-10 py-2 rounded-2xl w-[350px] mt-5 font-semibold">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
