"use client";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SIGN_UP_USER } from "../../../apollo/client/mutation/userMutation";

const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createUser] = useMutation(SIGN_UP_USER);
  const onSubmit = async (data) => {
    createUser({ variables: { input: data } }).then((res) => {
      router.push(`/verifyemail/${data.email}`);
    });
  };
  return (
    <div className="font-[sans-serif] text-[#333] mt-4 p-4 relative">
      <div className="max-w-md w-full mx-auto relative z-50">
        <div className="border border-gray-300 bg-white rounded-md p-8">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl font-extrabold mb-6">Create an account</h3>
            <div className="space-y-6">
              <div>
                <label className="font-semibold mb-2 block">First Name</label>
                <input
                  type="text"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                  placeholder="Enter First Name"
                  {...register("firstName", { required: true })}
                />
              </div>
              <div>
                <label className="font-semibold mb-2 block">Last Name</label>
                <input
                  type="text"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                  placeholder="Enter Last Name"
                  {...register("lastName", { required: true })}
                />
              </div>
              <div>
                <label className="font-semibold mb-2 block">Email</label>
                <input
                  type="email"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label className="font-semibold block">Gender</label>
                <div>
                  <input
                    type="radio"
                    value={"male"}
                    {...register("gender", { required: true })}
                  />
                  <label className="">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={"female"}
                    {...register("gender", { required: true })}
                  />
                  <label className="">Female</label>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded outline-blue-500"
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <img
        src="https://readymadeui.com/bg-effect.svg"
        className="absolute inset-0 w-full h-full z-0 opacity-40"
      />
    </div>
  );
};

export default page;
