"use client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_SINGLE_ORDER } from "../../../apollo/client/query/orderQuery";
import moment from "moment";
import Image from "next/image";

const page = ({ params }) => {
  // params.orderId = "6603fee86aec953d2574d404";
  const { data, loading, error } = useQuery(GET_SINGLE_ORDER, {
    variables: { id: params.orderId },
  });

  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const timestamp = data?.getSingleOrder?.orderDate; // Your timestamp
    const parsedDate = moment(timestamp, "x"); // Parsing the timestamp using Moment.js
    const formatted = parsedDate.format("Do MMMM YYYY [at] h:mm a"); // Formatting the date
    setFormattedDate(formatted); // Setting the formatted date state
  }, [data]);

  // data: {
  //   getSingleOrder: {
  //   paymentDetails: {
  //     amountTotal: "4860";
  //     currency: "usd";
  //     paymentMethod: "card";
  //     paymentStatus: "paid";
  //   }
  //  userId: "6603bae63703e3636a16b6c7";
  // }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-white">
          Order #{data?.getSingleOrder?._id}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-300">
          {formattedDate}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Order
            </p>
            {data?.getSingleOrder?.products?.map((product) => (
              <div
                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
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
                    {/* <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Style: </span> Italic
                        Minimal Design
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Size: </span> Small
                      </p>
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Color: </span> Light
                        Blue
                      </p>
                    </div> */}
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
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">
                    ${data?.getSingleOrder?.paymentDetails?.amountTotal}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Discount </p>
                  <p className="text-base leading-4 text-gray-600">-$0.00</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">$0.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  ${data?.getSingleOrder?.paymentDetails?.amountTotal}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className=" flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    Customer Name:-{" "}
                    {data?.getSingleOrder?.customerDetails?.name}
                  </p>
                </div>
              </div>

              <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                  {data?.getSingleOrder?.customerDetails?.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {data?.getSingleOrder?.address?.shippingAddress}{" "}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {data?.getSingleOrder?.address?.shippingAddress}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
