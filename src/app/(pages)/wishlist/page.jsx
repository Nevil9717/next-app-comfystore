"use client";
import { ADD_TO_CART } from "../../apollo/client/mutation/cartMutation";
import {
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "@/app/apollo/client/mutation/wishlistMutation";
import { GET_WISHLIST_BY_USER } from "@/app/apollo/client/query/wishlistQuery";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_WISHLIST_BY_USER);
  const [deleteFromWishlist] = useMutation(REMOVE_FROM_WISHLIST);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [clearWishlist] = useMutation(CLEAR_WISHLIST);
  const handleRemoveFromCart = (productId) => {
    deleteFromWishlist({
      variables: { productId },
    }).then(() => refetch());
  };
  const handleAddToCart = (
    productId,
    productName,
    productPrice,
    productImage
  ) => {
    addToCart({
      variables: {
        input: {
          productId,
          productName,
          productPrice,
          productImage,
          productQuantity: 1,
        },
      },
    })
      .then(() => {
        deleteFromWishlist({
          variables: { productId },
        }).then(() => {
          refetch();
          router.push("/cart");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearWishlist = () => {
    clearWishlist().then(() => refetch());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="mx-auto contain er px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
      <div className="flex flex-col justify-start items-start">
        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white ">
            Wishlist
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
            {data?.getWishlistByUser?.products?.length} items
          </p>
        </div>
        <div className="mt-10 mb-5 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
          {data?.getWishlistByUser?.products?.map((product) => (
            <div className="flex flex-col" key={product?._id}>
              <div className="relative">
                <Image
                  src={product?.pictures?.[0]}
                  alt={product?.productName}
                  width={400}
                  height={400}
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex justify-center items-center">
                  <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">
                    {product?.productName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start mt-6">
                <div>
                  <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">
                    {product?.sku}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                    {product?.description}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                    ${product?.price}
                  </p>
                </div>
                <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                  <div className="w-full">
                    <button
                      className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => handleRemoveFromCart(product?._id)}
                    >
                      Remove from cart
                    </button>
                  </div>
                  <div className="w-full">
                    <button
                      className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() =>
                        handleAddToCart(
                          product?._id,
                          product?.productName,
                          product?.price,
                          product?.pictures[0]
                        )
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {data?.getWishlistByUser?.products?.length > 0 && (
          <button
            className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handleClearWishlist}
          >
            Clear Wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default page;
