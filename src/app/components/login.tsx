"use client";

import React from "react";
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/pages/dummy1');    
  };

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <h1 className="text-center text-primary font-bold text-5xl mt-5 mb-5">
        Niagara
      </h1>
      <h2 className="text-center text-secondary font-bold text-4xl mt-5 mb-5">
        Sign In
      </h2>
      <form className="flex flex-col items-center space-y-6" onSubmit={handleSubmit}>
        <input
          className="bg-gray-200 shadow-inner rounded-lg p-4 text-black"
          id="userName"
          type="string"
          placeholder="Enter your user"
        />
        <input
          className="bg-gray-200 shadow-inner rounded-lg p-4 text-black"
          id="password"
          type="password"
          placeholder="Enter your password"
        />

        <button
          className="bg-primary text-white rounded-lg p-4 w-1/2 flex justify-center hover:bg-secondary hover:text-primary hover:border-2 hover:border-primary font-bold m-16"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
