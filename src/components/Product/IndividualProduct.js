"use client";

import productContext from "@contextAPI/productContext/productContetx";
// import userContext from '@contextAPI/userContext/userContext';
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

const IndividualProduct = ({ searchParams }) => {
  const router = useRouter();
  const { addWishlistCart, removeWishlistCart, checkWishlistCart } =
    useContext(productContext);
  const [wishAdd, setWishAdd] = useState(0);
  const [cartAdd, setCartAdd] = useState(0);

  const callWishlist = async () => {
    return await checkWishlistCart("wishlist", searchParams._id);
  };

  const callCart = async () => {
    return await checkWishlistCart("cart", searchParams._id);
  };

  useEffect(() => {
    callWishlist().then((val) => {
      val ? setWishAdd(1) : setWishAdd(0);
    });
    callCart().then((val) => {
      val ? setCartAdd(1) : setCartAdd(0);
    });
  }, []);

  const addToWishlist = async () => {
    const product = {
      productId: searchParams._id,
      source: "wishlist",
    };
    const response = await addWishlistCart(product);
    if (response.success) {
      toast.success(response.note + " to wishlist");
      setWishAdd(!wishAdd);
    } else {
      toast.error(response.note);
    }
  };

  const removeFromWishlist = async () => {
    const product = {
      productId: searchParams._id,
      source: "wishlist",
    };
    const response = await removeWishlistCart(product);
    if (response.success) {
      toast.success(response.note + " from wishlist");
      setWishAdd(!wishAdd);
    } else {
      toast.error(response.note);
    }
  };

  const addToCart = async () => {
    const product = {
      productId: searchParams._id,
      source: "cart",
    };
    const response = await addWishlistCart(product);
    if (response.success) {
      toast.success(response.note + " to cart");
      setCartAdd(!cartAdd);
    } else {
      toast.error(response.note);
    }
  };

  const goToCart = () => {
    router.push(`${process.env.NEXT_BASE_URL}cart`);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover">
      <div className="container px-5 py-24 mx-auto max-h-full">
        <div className="lg:w-4/5 mx-auto flex flex-wrap h-full">
          <Image
            width={200}
            height={200}
            alt="image"
            unoptimized={true} priority
            className="md:w-1/2 w-full lg:h-[70vh] h-64 object-cover object-center rounded drop-shadow-md border-2 bg-white/30"
            src={`/${searchParams?.image}`}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {searchParams?.name}
            </h1>
            <p className="leading-relaxed">{searchParams?.description}</p>
            <div className="flex mt-6  pb-5 border-b-2 border-gray-800 mb-5 flex-col text-black">
              <div className="flex w-full gap-4 items-center mb-4">
                <span>Size: {searchParams?.size}</span>
                <span>Tag: {(searchParams?.tag).toUpperCase()}</span>
              </div>
              <div className="flex">
                <span>Product Id: {searchParams?._id}</span>
              </div>
            </div>

            <div className="flex md:items-center justify-between flex-col md:flex-row gap-2 md:gap-0">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹ {searchParams.price} INR
              </span>
              <div className="flex items-center justify-between">
                <button
                  className="flex text-black bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-black hover:text-yellow-400 transition-all	rounded"
                  onClick={cartAdd ? goToCart : addToCart}
                >
                  {cartAdd ? "Go to Cart" : "Add to cart"}
                </button>

                <button
                  className={`rounded-full w-10 h-10 ${
                    wishAdd ? "bg-yellow-400 text-red-700" : "bg-gray-200"
                  } p-0 border-2 inline-flex items-center justify-center ml-4`}
                  onClick={wishAdd ? removeFromWishlist : addToWishlist}
                >
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndividualProduct;
