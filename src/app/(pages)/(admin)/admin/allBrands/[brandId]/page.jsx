"use client";
import React from "react";

const page = ({ params }) => {
  return <div>page{console.log("params.brandId", params.brandId)}</div>;
};

export default page;
