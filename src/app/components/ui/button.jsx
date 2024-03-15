import React from "react";

const Button = ({ text }) => {
  return (
    <button className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-[#795744] to-[#936a53] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#453227] transition-all hover:shadow-md hover:shadow-[#5f4435] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
      {text ? text : "Button"}
    </button>
  );
};

export default Button;
