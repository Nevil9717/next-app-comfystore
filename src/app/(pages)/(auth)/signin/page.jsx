"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };
  return (
    <div className="font-[sans-serif] text-[#333] mt-4 p-4 relative">
      <div className="max-w-md w-full mx-auto relative z-50">
        <div className="border border-gray-300 bg-white rounded-md p-8">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold">Sign In</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-sm mb-2 block">Email Id</label>
                <input
                  type="email"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            </div>
            <p className="text-sm mt-6 text-center">
              Don't have account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <img
        src="https://readymadeui.com/bg-effect.svg"
        className="absolute inset-0 w-full h-full z-0 opacity-40"
      />
    </div>
  );
};

export default page;
