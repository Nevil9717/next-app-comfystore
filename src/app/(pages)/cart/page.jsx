"use client";
import React, { use, useEffect } from "react";
import { GET_CART } from "../../apollo/client/query/productQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CLEAR_CART,
  DELETE_FROM_CART,
  UPDATE_CART,
} from "../../apollo/client/mutation/productMutation";
import { redirectToCheckout } from "../../api/stripe";
import { CREATE_SESSION_ID } from "../../apollo/client/mutation/userMutation";

const Cart = () => {
  const { data, loading, error, refetch } = useQuery(GET_CART);
  const [deleteFromCart] = useMutation(DELETE_FROM_CART);
  const [updateCartQuantity] = useMutation(UPDATE_CART);
  const [clearCart] = useMutation(CLEAR_CART);
  const [createPaymentSession] = useMutation(CREATE_SESSION_ID);
  const router = useRouter();
  let cartItems = [];
  const handleDelete = (productId) => {
    deleteFromCart({
      variables: {
        productId,
      },
    }).then(() => {
      refetch();
    });
  };
  useEffect(() => {
    cartData?.getCart?.map((item) => {
      cartItems.push({
        productId: item.productId,
        productImage: item.productImage,
        productName: item.productName,
        productPrice: item.productPrice,
        productQuantity: item.productQuantity,
      });
    });
    refetch();
  }, [data]);
  const handlePlus = (productId, productQuantity) => {
    if (productQuantity < 5) {
      updateCartQuantity({
        variables: {
          productId,
          productQuantity: productQuantity + 1,
        },
      }).then(() => {
        refetch();
      });
    }
  };
  const handleMinus = (productId, productQuantity) => {
    if (productQuantity > 1) {
      updateCartQuantity({
        variables: {
          productId,
          productQuantity: productQuantity - 1,
        },
      }).then(() => {
        refetch();
      });
    } else {
      deleteFromCart({
        variables: {
          productId,
        },
      }).then(() => {
        refetch();
      });
    }
  };
  const handleCheckout = async () => {
    const createdSessionID = await createPaymentSession();
    const sessionId = createdSessionID?.data?.createPaymentSession?.sessionId;
    redirectToCheckout(sessionId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="h-screen bg-black pt-20">
      {data?.getCart?.length ? (
        <>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {data?.getCart?.map((item) => {
                return (
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    key={item.productId}
                  >
                    <Image
                      src={item.productImage}
                      height={150}
                      width={150}
                      alt={item.productName}
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.productName}
                        </h2>
                        <h2 className="text-lg font-bold text-gray-900">
                          $ {item.productPrice}
                        </h2>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button
                            className="rounded-l text-black bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() =>
                              handleMinus(
                                item?.productId,
                                item?.productQuantity
                              )
                            }
                          >
                            -
                          </button>

                          <p className="bg-white text-center text-black">
                            {item?.productQuantity}
                          </p>
                          <button
                            className="rounded-r bg-gray-100 text-black py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() =>
                              handlePlus(item?.productId, item?.productQuantity)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center space-x-4 text-black">
                          <p className="text-sm">
                            $ {item?.productPrice * item?.productQuantity}
                          </p>
                          <button
                            className="text-red-500"
                            onClick={() => handleDelete(item?.productId)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  $
                  {data.getCart.reduce((total, item) => {
                    return total + item.productQuantity * item.productPrice;
                  }, 0)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$0.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold text-black">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold text-black ">
                    ${" "}
                    {data.getCart.reduce((total, item) => {
                      return total + item.productQuantity * item.productPrice;
                    }, 0)}{" "}
                    USD
                  </p>
                  <p className="text-sm text-gray-700">including Tax</p>
                </div>
              </div>
              <button
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                onClick={handleCheckout}
              >
                Check out
              </button>
            </div>
          </div>
          <button
            className="block mx-auto bg-red-500 text-white px-4 py-2 mt-6 mb-5 rounded-lg"
            onClick={() =>
              clearCart().then(() => {
                refetch();
              })
            }
          >
            Clear Cart
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">Your cart is empty</h1>
          <br />
          <button
            className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-[#795744] to-[#936a53] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#453227] transition-all hover:shadow-md hover:shadow-[#5f4435] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-32"
            onClick={() => {
              router.push("/products");
            }}
          >
            Fill it
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
