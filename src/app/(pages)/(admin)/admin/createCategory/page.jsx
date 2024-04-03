"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { CREATE_CATEGORY } from "../../../../apollo/client/mutation/catagoriesMutation";
import { useMutation } from "@apollo/client";

const page = () => {
  const [createCatagories] = useMutation(CREATE_CATEGORY);
  const onSubmit = async (data) => {
    await createCatagories({
      variables: {
        catagoriesName: data.catagoriesName,
      },
    });
  };
  const { register, handleSubmit } = useForm();
  return (
    <div className="container px-10 mt-5 mx-auto">
      <div className=" rounded-sm pt-10 p-8 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className=" px-6.5 py-4 ">
          <h3 className=" text-black text-3xl font-bold ">Create Category</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full  mb-5">
            <label className="text-black mb-2 block">Category Name</label>
            <input
              className="bg-white border px-2 text-black border-gray-300 w-full  text-sm py-2.5 rounded outline-blue-500"
              type={"text"}
              placeholder={"Enter Category name"}
              {...register("catagoriesName", { required: true })}
            />
          </div>
          <button
            className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-[#905353] to-[#935353] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#453227] transition-all hover:shadow-md hover:shadow-[#5f4435] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
