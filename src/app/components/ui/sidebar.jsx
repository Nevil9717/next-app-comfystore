"use client";
import {
  GET_ALL_BRANDS,
  GET_ALL_CATEGORIES,
} from "@/app/apollo/client/query/productQuery";
import { useQuery } from "@apollo/client";
import React from "react";
import Loader from "./loader";

const Sidebar = () => {
  const { data: brandData, loading, error } = useQuery(GET_ALL_BRANDS);
  const {
    data: catagoriesData,
    loading: catagoriesLoading,
    error: catagoriesError,
  } = useQuery(GET_ALL_CATEGORIES);

  if (loading || catagoriesLoading) return <Loader />;
  if (error || catagoriesError)
    return <p>Error: {error ? error.message : catagoriesError.message}</p>;

  return (
    <div className="w-auto">
      <div className="bg-white h-full md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out">
        <div className="space-y-6 md:space-y-10 mt-10">
          <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 ">Categories</h3>

            {catagoriesData?.getCatagories?.map((category) => {
              return (
                <button
                  key={category._id}
                  className="text-gray-600 block hover:underline"
                >
                  {category.catagoriesName}
                </button>
              );
            })}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 ">Company</h3>
            <select className="text-gray-700">
              {brandData?.getBrand?.map((company) => {
                return (
                  <option key={company._id} value={company}>
                    {company.brandName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-between w-5/6">
            <h3 className="text-lg text-gray-700 ">Free Shipping</h3>
            <input type="checkbox" />
          </div>
          <button className="bg-red-600 rounded-md p-2 font-semibold">
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
