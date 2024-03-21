"use client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  RESEND_OTP,
  VERIFY_USER,
} from "../../../../apollo/client/mutation/userMutation";

const page = ({ params }) => {
  const router = useRouter();
  const email = (params?.email).replace(/%40/g, "@") || "";
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [verifyUser] = useMutation(VERIFY_USER);
  const [resendOTP] = useMutation(RESEND_OTP);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);
    if (value && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = Number(otpDigits.join("")); // Combine the OTP digits into a single string
    verifyUser({
      variables: {
        input: {
          email,
          otpCode,
        },
      },
    })
      .then((res) => {
        console.log(res);
        router.push("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleResend = async (e) => {
    e.preventDefault();
    resendOTP({
      variables: {
        email,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-2">OTP Verification</h1>
      <h2 className="mb-6">{email}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex justify-center space-x-4">
          {otpDigits?.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              placeholder=""
              className="w-12 h-12 border text-black border-gray-300 rounded-md text-center"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Verify OTP
        </button>
      </form>
      <div>
        <button
          type="button"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleResend}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default page;
