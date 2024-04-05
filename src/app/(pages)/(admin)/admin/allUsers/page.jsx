"use client";
import React from "react";
import { ALL_USERS } from "../../../../apollo/client/query/userQuery";
import { useQuery } from "@apollo/client";
import Link from "next/link";

const page = () => {
  const { data, loading } = useQuery(ALL_USERS);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container px-10 mt-5 mx-auto">
      <div className=" rounded-sm p-8 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className=" text-black text-3xl font-bold text-center mb-2">
          User's List
        </h3>

        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="text-black border border-slate-600 p-3">Name</th>
              <th className="text-black border border-slate-600 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.getUsers?.map((user) => (
              <tr key={user.id}>
                <td className="text-black border border-slate-600 p-2">
                  {user.firstName + " " + user.lastName}
                </td>
                <td className="text-black border border-slate-600 p-2">
                  <Link
                    href={`/`}
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
