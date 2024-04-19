"use client"
import React, { useContext, useEffect, useState } from "react";
import allProductsContetx from "@contextAPI/allProductsContext/allProductContext";
import Image from "next/image";
import Loader from "@components/Loader/Loader";

const Page = () => {
    const { getData, gold, silver, deleteProduct, loader} = useContext(allProductsContetx);
    const [goldPage, setGoldPage] = useState(1);
    const [silverPage, setSilverPage] = useState(1);
    const goldProductsPerPage = 3;
    const silverProductsPerPage = 3;

    useEffect(() => {
        getData("gold");
        getData("silver");
    },[]);

    const goldPaginatedProducts = gold.slice(
        (goldPage - 1) * goldProductsPerPage,
        goldPage * goldProductsPerPage
    );

    const silverPaginatedProducts = silver.slice(
        (silverPage - 1) * silverProductsPerPage,
        silverPage * silverProductsPerPage
    );

    const handleGoldNext = () => {
        setGoldPage(goldPage + 1);
    };

    const handleGoldPrev = () => {
        setGoldPage(goldPage - 1);
    };

    const handleSilverNext = () => {
        setSilverPage(silverPage + 1);
    };

    const handleSilverPrev = () => {
        setSilverPage(silverPage - 1);
    };

    const handleDeleteGoldProduct = (productId) => {
      deleteProduct(productId); 
    };

    const handleDeleteSilverProduct = (productId) => {
      deleteProduct(productId); 
    };

    return (
        <div className="mt-[4rem] w-[95%] mx-auto">
            {loader ? <Loader/> : ""}
            <div className="mb-4">
                <h1 className="font-bold py-4 uppercase text-yellow-700 drop-shadow-md">
                    Gold section - {gold.length || 0} items
                </h1>
                <div className="overflow-x-scroll">
                    <table className="w-full whitespace-nowrap
                    bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover bg-center">
                        <thead className="bg-black/30 rounded-md">
                            <tr>
                            <th className="text-center py-3 px-2">
                                Product
                            </th>
                            <th className="text-center py-3 px-2">Description</th>
                            <th className="text-center py-3 px-2">Price</th>
                            <th className="text-center py-3 px-2">
                                Size
                            </th>
                            <th className="text-center py-3 px-2">
                                Edit/Delete
                            </th>
                            </tr>
                        </thead>

                        <tbody>
                        {goldPaginatedProducts.map((product) => {
                            const { _id, name, description, price, image, size } =
                                product;
                            return (
                                <tr className="border-b border-gray-800" key={_id}>
                                    <td className="py-3 px-2 font-bold flex flex-col gap-1">
                                        <Image
                                            src={image}
                                            alt={`${name}`}
                                            width={200}
                                            height={200}
                                            loading="lazy"
                                            className="w-[150px] h-[150px] object-cover object-center"
                                        />
                                        <h1>{name}</h1>
                                    </td>
                                    <td className="py-3 px-2">{description}</td>
                                    <td className="py-3 px-2">{price}</td>
                                    <td className="py-3 px-2">{size}</td>
                                    <td className="py-3 px-2">
                                        <div className="inline-flex items-center space-x-3">
                                            <button
                                                onClick={() => handleDeleteGoldProduct(_id)}
                                                className="hover:text-white bg-transparent border border-red-500 text-red-500 font-semibold p-1 rounded"
                                            >
                                                <i className="ri-delete-bin-5-line"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleGoldPrev}
                            disabled={goldPage === 1}
                            className="px-4 py-2  rounded bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleGoldNext}
                            disabled={goldPaginatedProducts.length < goldProductsPerPage}
                            className="px-4 py-2 bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all rounded "
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="font-bold py-4 uppercase text-yellow-700 drop-shadow-md">
                    Silver section - {silver.length || 0} items
                </h1>
                <div className="overflow-x-scroll bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover bg-centers">
                    <table className="w-full whitespace-nowrap">
                        <thead className="bg-black/30">
                            <tr>
                            <th className="text-center py-3 px-2 ">
                                Product
                            </th>
                            <th className="text-center py-3 px-2">Description</th>
                            <th className="text-center py-3 px-2">Price</th>
                            <th className="text-center py-3 px-2 ">
                                Size
                            </th>
                            <th className="text-center py-3 px-2 ">
                                Edit/Delete
                            </th>
                            </tr>
                        </thead>

                        <tbody>
                        {silverPaginatedProducts.map((product) => {
                            const { _id, name, description, price, image, size } =
                                product;
                            return (
                                <tr className="border-b border-gray-800" key={_id}>
                                    <td className="py-3 px-2 font-bold flex flex-col gap-1">
                                        <Image
                                            src={image}
                                            alt={`${name}`}
                                            width={200}
                                            height={200}
                                            loading="lazy"
                                            className="w-[150px] h-[150px] object-cover object-center"
                                        />
                                        <h1>{name}</h1>
                                    </td>
                                    <td className="py-3 px-2">{description}</td>
                                    <td className="py-3 px-2">{price}</td>
                                    <td className="py-3 px-2">{size}</td>
                                    <td className="py-3 px-2">
                                        <div className="inline-flex items-center space-x-3">
                                            <button
                                                onClick={() => handleDeleteSilverProduct(_id)}
                                                className="hover:text-white bg-transparent border border-red-500 text-red-500 font-semibold p-1 rounded"
                                            >
                                                <i className="ri-delete-bin-5-line"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleSilverPrev}
                            disabled={silverPage === 1}
                            className="px-4 py-2  rounded bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-alls"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleSilverNext}
                            disabled={silverPaginatedProducts.length < silverProductsPerPage}
                            className="px-4 py-2 rounded bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
