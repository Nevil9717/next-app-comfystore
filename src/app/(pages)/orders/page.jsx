"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ORDER_BY_USER } from "../../apollo/client/query/orderQuery";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const { data, loading } = useQuery(GET_ORDER_BY_USER);
  const router = useRouter();
  if (loading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
      {console.log("data:", data)}
      <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
        Customer’s Orders List
      </p>
      <div className="mt-10">
        {data?.getOrdersByUser?.map((order) => {
          return (
            <div
              className="border-2 border-sky-500 rounded-lg m-5 p-5"
              key={order._id}
            >
              {order?.products?.length > 0 && (
                <>
                  <h1
                    className="text-3xl text-gray-800 hover:text-red-500 cursor-pointer"
                    onClick={() => router.push(`orders/${order._id}`)}
                  >
                    Order No:- {order._id}
                  </h1>
                  {order?.products?.map((product) => (
                    <div
                      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                      key={product.productId}
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <Image
                          className="w-full hidden md:block"
                          width={200}
                          height={200}
                          src={product?.productImage}
                          alt={product?.productName}
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                            {product?.productName}
                          </h3>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base xl:text-lg leading-6">
                            <span className="text-red-500 ">
                              ${product.productPrice}
                            </span>
                          </p>
                          <p className="text-base xl:text-lg leading-6 text-gray-800">
                            Qty: {product.productQuantity}
                          </p>
                          <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                            $ {product?.productPrice * product?.productQuantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <button
                className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-[#795744] to-[#936a53] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#453227] transition-all hover:shadow-md hover:shadow-[#5f4435] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => router.push(`orders/${order._id}`)}
              >
                View More Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
