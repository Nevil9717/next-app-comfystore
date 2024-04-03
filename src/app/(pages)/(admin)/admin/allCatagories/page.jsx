"use client";
import React from "react";
import { GET_ALL_CATAGORIES } from "@/app/apollo/client/query/catagoriesQuery";
import { useQuery } from "@apollo/client";
const page = () => {
  const { data, loading } = useQuery(GET_ALL_CATAGORIES);
  if (loading) return <div>Loading...</div>;
  return <div>View All Brands{console.log("data", data)}</div>;
};

export default page;
