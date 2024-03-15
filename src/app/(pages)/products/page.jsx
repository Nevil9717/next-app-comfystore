"use client";
import React from "react";
import Card from "../../components/ui/card";
import Sidebar from "../../components/ui/sidebar";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../apollo/client/query/productQuery";
const Products = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex bg-gray-300">
      <Sidebar />
      <div className="flex flex-wrap justify-evenly ">
        {data.getProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
