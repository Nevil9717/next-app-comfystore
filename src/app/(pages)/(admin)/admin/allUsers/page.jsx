"use client";
import React from "react";
import { ALL_USERS } from "../../../../apollo/client/query/userQuery";
import { useQuery } from "@apollo/client";

const page = () => {
  // const { data, loading } = useQuery(ALL_USERS);
  
  // if (loading) return <div>Loading...</div>;
  return (
    <div className="container px-10 mt-5 mx-auto">
      <div className=" rounded-sm pt-10 p-8 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className=" px-6.5 py-4">
          <h3 className=" text-black text-3xl font-bold ">User's List</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black xl:pl-11">
                  Name
                </th>
                <th className="px-4 py-4 font-medium text-black">Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
