"use client";
import React from "react";
import { GET_ORDER_BY_ADMIN } from "../../../../apollo/client/query/orderQuery";
import { useQuery } from "@apollo/client";

const page = () => {
  const { data, loading } = useQuery(GET_ORDER_BY_ADMIN);
  if (loading) return <div>Loading...</div>;
  return <div>All orders By Admin{console.log("data", data)}</div>;
};

export default page;
