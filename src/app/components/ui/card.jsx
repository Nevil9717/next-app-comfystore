import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ product }) => {
  return (
    <div className="rounded-lg bg-white w-72 m-2">
      <Link href={`/products/${product._id}`}>
        <Image
          className="rounded-lg"
          src={product.pictures[0]}
          alt={product.productName}
          width={300}
          height={300}
        />
      </Link>

      <div className="p-2">
        <div className="flex justify-between">
          <h5 className="mb-2 mt-2 text-sm font-bold leading-tight text-neutral-800">
            {product.productName}
          </h5>
          <h5 className="mb-2 mt-2 text-sm font-bold leading-tight text-neutral-800 ">
            $ {product.price}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Card;
