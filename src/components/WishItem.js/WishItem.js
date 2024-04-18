"use client";

import productContext from "@contextAPI/productContext/productContetx";
import Image from "next/image";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

const WishItem = (props) => {
  const { productId } = props.data;
  const { fetchInfo, removeWishlistCart } = useContext(productContext);

  const [item, setItem] = useState({
    _id: "",
    name: "ok",
    description: "ok",
    price: "",
    tag: "",
    image: "",
    size: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchInfo(productId, "wishlist");
      setItem(response);
    };
    fetchData();
  }, []);

  const removeFromWishlist = async () => {
    const product = {
      productId: productId,
      source: "wishlist",
    };
    const response = await removeWishlistCart(product);
    if (response.success) {
      toast.success(response.note + " from wishlist");
    } else {
      toast.error(response.note);
    }
  };

  return (
    <div className="w-full shadow-md bg-white rounded-md shadow-yellow-600">
      <div className="block relative lg:h-[40vh] h-48 overflow-hidden rounded-md">
        <Image
          alt={item?.name}
          className="object-cover object-center w-full h-full block relative"
          unoptimized={true}
          priority
          src={item?.image ? `/${item?.image}`: "/assets/product-not-available-logo.png"  }
          width={100}
          height={100}
        />
        <span
          className="absolute right-2 top-1 text-xl bg-yellow-400 text-black hover:text-yellow-400 hover:bg-black px-3 py-2 rounded-full cursor-pointer transition-all"
          onClick={removeFromWishlist}
        >
          <i className="ri-delete-bin-line"></i>
        </span>
      </div>
      <div className="p-4 flex flex-col items-start">
        <h2 className="text-black title-font text-lg">{item?.name || "Not available"}</h2>
        <h3 className="text-gray-500 text-[1rem]">{item?.description || "Owner has deleted this item"}</h3>
        <p className="font-bold text-[1rem] text-black">₹ {item?.price || "Not applicable"}</p>
        <div className="w-full flex  gap-4 items-center text-[0.8rem]">
          <p>Size: {item?.size || "NA"}</p>
          <p>Tag: {item?.tag.toUpperCase() || "NA"}</p>
        </div>
        <p className="text-sm text-gray-500">
          Product Id: <br /> {productId}
        </p>
      </div>
      {item?.name && <div className="w-full px-4 mb-2">
        <Link
          href={{
            pathname: `/${item?.tag.toLowerCase()}/${item?.name}`,
            query: item,
          }}
          className="text-[0.7rem] bg-yellow-500 text-black inline-block p-2 rounded-full hover:bg-black hover:text-yellow-400 transition-all"
        >
          See Details
        </Link>
      </div>}
    </div>
  );
};

export default WishItem;
