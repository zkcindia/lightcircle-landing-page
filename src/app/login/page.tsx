"use client";

import React, { useState } from "react";
import {handleLogin} from './../../service/apiAuth'
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter()
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [username,setUserName]=useState('');
  const [password,setPassword] = useState('')

  const toggleMode = (e:any) => {
    e.preventDefault();
    setIsSigningIn(!isSigningIn);
    setError("");
    setAgreed(false);
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    try {
      if (!isSigningIn && !agreed) {
        setError("You must agree to the terms of service.");
        return;
      }
      const data ={
        email:username,
        password:password
      }
      const response = await handleLogin(data);
      if(response.status){
         localStorage.setItem("token", response.data);
        router.push('/admin')
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setError("");

    }
    // alert(isSigningIn ? "Signing in..." : "Account created!");
  };

  return (
    <main className="w-full bg-white py-32 px-4 md:px-0 flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto shadow-2xl shadow-[#D1B399] rounded-lg overflow-hidden min-h-[600px]">
        {/* Form Section */}
        <div className="flex flex-col justify-center px-8 py-20 md:px-16">
          <h1 className="text-3xl font-semibold mb-8 text-black">
            {isSigningIn ? "Sign in" : "Sign up"}
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isSigningIn && (
              <div>
                <label className="block text-sm font-medium mb-1 text-black">
                  Name
                </label>
                <input
                  type="text"
                  
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Email Address
              </label>
              <input
                type="email"
                value={username}
                onChange={(e)=>setUserName(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                placeholder="6+ characters"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>

            {!isSigningIn && (
              <div className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="mr-2 cursor-pointer"
                />
                <span className="text-black">
                  I agree to all the statements included in the{" "}
                  <a
                    href="#"
                    className="text-green-600 underline cursor-pointer"
                  >
                    terms of service
                  </a>
                </span>
              </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900 transition cursor-pointer"
            >
              {isSigningIn ? "Sign in" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-10">
            {isSigningIn ? (
              <span className="text-sm text-black">
                Don’t have an account?{" "}
                <a
                  href="#"
                  onClick={toggleMode}
                  className="text-black font-medium underline cursor-pointer"
                >
                  Sign up
                </a>
              </span>
            ) : (
              <span className="text-sm text-black">
                Already a member?{" "}
                <a
                  href="#"
                  onClick={toggleMode}
                  className="text-black font-medium underline cursor-pointer"
                >
                  Sign in
                </a>
              </span>
            )}
          </div>
        </div>

        {/* Right Image/Content */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gray-50 p-12">
          <img
            src="/images/lightlog.avif"
            alt="light"
            className="max-h-[60%] object-contain shadow-2xl shadow-[#D1B399] rounded"
          />
          <div className="mt-10 text-center px-8">
            <h2 className="text-3xl font-light text-black mb-2">
              Access your home’s best{" "}
              <span className="text-green-600">shared</span> spaces
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
