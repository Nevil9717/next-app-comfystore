"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CREATE_ORDER } from "../../apollo/client/mutation/orderMutation";
import { GET_CART } from "../../apollo/client/query/productQuery";
import { createCheckoutSession, redirectToCheckout } from "../../api/stripe";
const page = () => {
  let cartItems = [];
  const { data: cartData, loading, error } = useQuery(GET_CART);
  const [createOrder] = useMutation(CREATE_ORDER);
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
  }, [cartData]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { sessionId } = await createCheckoutSession();
    redirectToCheckout(sessionId);
    // createOrder({
    //   variables: {
    //     input: {
    //       orderItems: cartItems,
    //       paymentMethod: {
    //         cardNumber: data.cardNumber,
    //         cvv: parseInt(data.cvv),
    //         exp: data.exp,
    //       },
    //       personalDetail: {
    //         email: data.email,
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         phone: data.phone,
    //       },
    //       shippingAddress: {
    //         city: data.city,
    //         streetAddress: data.streetAddress,
    //         state: data.state,
    //         zipCode: data.zipCode,
    //       },
    //     },
    //   },
    // });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="font-[sans-serif] bg-white p-4">
      <div className="mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">
            Checkout
          </h2>
        </div>
        <div className="mt-12 flex">
          <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* <div>
                <h3 className="text-xl font-bold text-[#333]">01</h3>
                <h3 className="text-xl font-bold text-[#333]">
                  Personal Details
                </h3>
              </div> */}
              {/* <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="First name"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("firstName", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("lastName", { required: true })}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("email", { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="Phone number"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("phone", { required: true })}
                  />
                </div>
              </div> */}
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {/* <div>
                <h3 className="text-xl font-bold text-[#333]">02</h3>
                <h3 className="text-xl font-bold text-[#333]">
                  Shopping Address
                </h3>
              </div> */}
              {/* <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Street address"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("streetAddress", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("city", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("state", { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="Zip Code"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("zipCode", { required: true })}
                  />
                </div>
              </div> */}
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {/* <div>
                <h3 className="text-xl font-bold text-[#333]">03</h3>
                <h3 className="text-xl font-bold text-[#333]">
                  Payment method
                </h3>
              </div> */}
              {/* <div className="md:col-span-2">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-center">
                    <label
                      htmlFor="card"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://readymadeui.com/images/visa.webp"
                        className="w-12"
                        alt="card1"
                      />
                      <img
                        src="https://readymadeui.com/images/american-express.webp"
                        className="w-12"
                        alt="card2"
                      />
                      <img
                        src="https://readymadeui.com/images/master.webp"
                        className="w-12"
                        alt="card3"
                      />
                    </label>
                  </div>
                </div>
                <div className="grid sm:grid-cols-4 gap-6 mt-6">
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Card number"
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                      {...register("cardNumber", { required: true })}
                    />
                  </div>
                  <input
                    type="number"
                    placeholder="EXP."
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("exp", { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="CVV"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    {...register("cvv", { required: true })}
                  />
                </div>
              </div> */}
            </div>
            <div className="flex flex-wrap justify-end gap-4 mt-12">
              {/* <button
                type="button"
                className="px-6 py-3.5 text-sm bg-transparent border-2 text-[#333] rounded-md hover:bg-gray-100"
              >
                Pay later
              </button> */}
              <button
                type="submit"
                className="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Pay now
              </button>
            </div>
          </form>
          <div className="w-1/4">
            <div className="lg:border-l lg:pl-8">
              <h3 className="text-xl font-bold text-[#333]">Summary</h3>
              <ul className="text-[#333] mt-6 space-y-4">
                <li className="flex flex-wrap gap-4 text-sm">
                  Discount (20%){" "}
                  <span className="ml-auto font-bold">$4.00</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Tax <span className="ml-auto font-bold">$4.00</span>
                </li>
                <li className="flex flex-wrap gap-4 text-base font-bold border-t pt-4">
                  Total <span className="ml-auto">$52.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
