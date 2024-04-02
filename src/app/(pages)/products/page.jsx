"use client";
import React, { useState } from "react";
import Card from "../../components/ui/card";
import Sidebar from "../../components/ui/sidebar";
import { useQuery } from "@apollo/client";
import Loader from "../../components/ui/loader";
import { GET_ALL_PRODUCTS } from "../../apollo/client/query/productQuery";
const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedBrands, setSelectedBrands] = useState();
  const [search, setSearch] = useState("");

  const { data, loading } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      input: {
        category: selectedCategories,
        brand: selectedBrands,
        search: search,
      },
    },
  });

  return (
    <div className="flex bg-gray-300">
      <Sidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        search={search}
        setSearch={setSearch}
      />
      {loading && <Loader />}
      {data && (
        <>
          {data?.getAllProducts?.length > 0 ? (
            <div className="flex flex-wrap justify-evenly ">
              {data?.getAllProducts?.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-2xl font-semibold text-gray-900 mt-10 ml-10">
              Sorry, no products matched your search.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
