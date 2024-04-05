import React from "react";

const page = ({ params }) => {
  return <div>page{console.log(params.categoryId)}</div>;
};

export default page;
