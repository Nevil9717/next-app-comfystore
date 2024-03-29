"use client";
import Button from "@/app/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "@/app/apollo/client/query/productQuery";
import { ADD_TO_CART } from "../../../apollo/client/mutation/productMutation";
import { ADD_TO_WISHLIST } from "../../../apollo/client/mutation/wishlistMutation";

const ProductById = ({ params }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: params.id },
  });
  const [count, setCount] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const router = useRouter();

  const [addToCart] = useMutation(ADD_TO_CART);
  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);
  useEffect(() => {
    setMainImage(data?.getSingleProduct?.pictures[0]);
  }, [data]);

  const handleAddToCart = () => {
    addToCart({
      variables: {
        input: {
          productId: data?.getSingleProduct?._id,
          productName: data?.getSingleProduct?.productName,
          productPrice: data?.getSingleProduct?.price,
          productImage: data?.getSingleProduct?.pictures[0],
          productQuantity: count,
        },
      },
    })
      .then(() => {
        router.push("/cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddToWishlist = () => {
    addToWishlist({
      variables: {
        productId: params.id,
      },
    })
      .then(() => {
        router.push("/wishlist");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Link href="/products">
        <Button text="Back to Products" />
      </Link>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-64 md:h-80 rounded-lg bg-gray-600 mb-4">
              <div className="h-64 md:h-80 rounded-lg bg-gray-600 mb-4 flex items-center justify-center">
                <Image
                  className="w-full h-full rounded-lg"
                  src={mainImage}
                  alt="Product Image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className={`grid grid-flow-col`}>
              {data?.getSingleProduct?.pictures?.map((image) => (
                <Image
                  key={image}
                  className="rounded-lg px-1 h-full"
                  src={image}
                  alt={"Image"}
                  width={300}
                  height={300}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-white text-2xl md:text-3xl">
              {data?.getSingleProduct?.productName}
            </h2>
            <p className="text-gray-500 text-sm">
              By {data?.getSingleProduct?.brand?.brandName}
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">
                    {data?.getSingleProduct?.price}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>

            <p className="text-gray-500">
              {data?.getSingleProduct?.description}
            </p>

            <div className="flex py-4 space-x-10 text-xl">
              <button onClick={() => setCount(count > 1 ? count - 1 : 1)}>
                -
              </button>
              <p>{count}</p>
              <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <button
              className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-[#795744] to-[#936a53] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#453227] transition-all hover:shadow-md hover:shadow-[#5f4435] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-[#905353] to-[#935353] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#453227] transition-all hover:shadow-md hover:shadow-[#5f4435] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={handleAddToWishlist}
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
