"use client";
import React from "react";
import { GET_ALL_CATAGORIES } from "@/app/apollo/client/query/catagoriesQuery";
import { useQuery } from "@apollo/client";
import Link from "next/link";
const page = () => {
  const { data, loading } = useQuery(GET_ALL_CATAGORIES);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container px-10 mt-5 mx-auto">
      <div className=" rounded-sm p-8 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className=" text-black text-3xl font-bold text-center mb-2">
          Categories
        </h3>
        <table className="table-auto w-full text-left">
          <thead className="mb-2 ">
            <tr>
              <th className="text-black border border-slate-600 p-3">
                Category Name
              </th>
              <th className="text-black border border-slate-600 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.getAllCatagories?.map((category) => (
              <tr key={category._id}>
                <td className="text-black border border-slate-600 p-2">
                  {category.catagoriesName}
                </td>
                <td className="text-black border border-slate-600 p-2">
                  <Link
                    href={`/admin/allCatagories/${category._id}`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded"
                  >
                    Update
                  </Link>
                  <Link
                    href={`/`}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
