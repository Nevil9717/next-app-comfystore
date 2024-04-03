"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_PRODUCT } from "../../../../apollo/client/mutation/productMutation";
import { GET_ALL_BRANDS } from "../../../../apollo/client/query/brandQuery";
import { GET_ALL_CATAGORIES } from "../../../../apollo/client/query/catagoriesQuery";
import { UploadButton } from "../../../../utils/uploadthing";

const page = () => {
  const { data: brandData, loading: brandLoading } = useQuery(GET_ALL_BRANDS);
  const { data: catagoriesData, loading: catagoriesLoading } =
    useQuery(GET_ALL_CATAGORIES);
  const [imageArray, setImageArray] = useState([]);

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    data.pictures = imageArray;
    data.stock = parseInt(data.stock);
    data.price = parseInt(data.price);
    createProduct({
      variables: {
        input: data,
      },
    }).then((res) => {
      console.log("🚀 ~ onSubmit ~ res", res);
    });
  };

  const removeImgFromState = (url) => {
    setImageArray(imageArray.filter((img) => img !== url));
  };
  return (
    <div className="container px-10 mt-5 mx-auto">
      <div className=" rounded-sm pt-10 p-8 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className=" px-6.5 py-4 ">
          <h3 className=" text-black text-3xl font-bold ">
            Create New Product
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full  mb-5">
            <label className="text-black mb-2 block">Product Name</label>
            <input
              className="bg-white border px-2 text-black border-gray-300 w-full  text-sm py-2.5 rounded outline-blue-500"
              type={"text"}
              placeholder={"Enter product name"}
              {...register("productName", { required: true })}
            />
          </div>
          <div className="full">
            <label className="text-black mb-2 block">Description</label>
            <textarea
              rows={6}
              className="bg-white border text-black border-gray-300 px-2 w-full text-sm py-2.5 rounded outline-blue-500"
              type={"text"}
              placeholder={"Type product description"}
              {...register("description", { required: true })}
            />
          </div>

          <div className="flex w-3/4 mb-5">
            <div className="w-1/2 pr-5">
              <label className="text-black mb-2 block px-4 py-2.5">Price</label>
              <input
                className="bg-white border w-full text-black border-gray-300 text-sm px-4 py-2.5 rounded outline-blue-500"
                type={"number"}
                placeholder={"Enter product price"}
                {...register("price", { required: true })}
              />
            </div>
            <div className="w-1/2 pl-5">
              <label className="text-black mb-2 block px-4 py-2.5">Stock</label>
              <input
                className="bg-white border w-full text-black border-gray-300 text-sm px-4 py-2.5 rounded outline-blue-500"
                type={"number"}
                placeholder={"Enter available stock"}
                {...register("stock", { required: true })}
              />
            </div>
          </div>
          {/* Option select */}
          <div className="flex w-3/4 mb-5">
            <div className=" w-2/4 pr-5">
              <label className="text-black mb-2 block pr-4 py-2.5">Brand</label>
              <select
                className="bg-white border text-black w-full border-gray-300 text-sm px-4 py-2.5 rounded outline-blue-500"
                required={true}
                {...register("brand", { required: true })}
              >
                <option value={""}>Select Brand</option>
                {brandLoading && <option value={""}>Loading...</option>}
                {brandData?.getAllBrands?.length > 0 &&
                  brandData?.getAllBrands?.map((brand) => (
                    <option value={brand._id} key={brand._id}>
                      {brand?.brandName}
                    </option>
                  ))}
              </select>
            </div>

            <div className=" w-2/4 pl-5">
              <label className="text-black mb-2 block pr-4 py-2.5">
                Category
              </label>
              <select
                className="bg-white w-full border border-gray-300 text-sm px-4 py-2.5 text-black rounded outline-blue-500"
                required={true}
                {...register("category", { required: true })}
              >
                <option value={""}>Select Category</option>
                {catagoriesLoading && <option value={""}>Loading...</option>}
                {catagoriesData?.getAllCatagories?.length > 0 &&
                  catagoriesData?.getAllCatagories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category?.catagoriesName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="w-1/2 mb-10">
            <label className="block py-2.5 mb-2  text-black">SKU</label>
            <input
              className={
                "bg-white border px-2 text-black border-gray-300 w-full  text-sm py-2.5 rounded outline-blue-500"
              }
              type={"text"}
              placeholder={"Enter sku"}
              {...register("sku", { required: true })}
            />
          </div>

          <div className="mb-6 col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
              <div className="  px-7 py-4 ">
                <h3 className="font-medium text-black">
                  Select Product's Images*
                </h3>
              </div>
              <div className="p-7">
                <UploadButton
                  appearance={{ button: "px-3 py-2" }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageArray([...imageArray, res[0].url]);
                    alert("Image uploaded successfully");
                  }}
                  onUploadError={(error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />

                <div className="flex space-x-5 mt-5">
                  {imageArray?.map((url) => (
                    <div className="relative p-4 shadow-xl border rounded-lg flex justify-center items-center">
                      <img src={url} alt="" width={100} key={url} />
                      <div
                        onClick={() => removeImgFromState(url)}
                        className="h-6 hover:cursor-pointer w-6 flex justify-center items-center rounded-full bg-red-600 absolute -top-3 -right-2"
                      >
                        x
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-[#905353] to-[#935353] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#453227] transition-all hover:shadow-md hover:shadow-[#5f4435] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
