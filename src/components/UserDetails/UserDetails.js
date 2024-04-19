"use client"
import React, { useContext, useState } from "react";
import adminContetx from "@contextAPI/adminContext/adminContetx";
import Image from "next/image";
import Loader from "@components/Loader/Loader";

const Page = () => {
  const { allOrders, loader } = useContext(adminContetx);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="mt-[4rem] w-[95%] mx-auto">
    {loader ? <Loader/> : ""}
      <div className="mb-4">
        <h1 className="font-bold py-4 uppercase text-yellow-600">
          All Orders - {allOrders.length || 0} 
        </h1>
        <div className="overflow-x-scroll">
          <table className="w-full whitespace-nowrap bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover bg-center">
            <thead className="bg-black/60">
              <tr>
                <th className="text-left py-3 px-2 rounded-l-lg">Customers</th>
                <th className="text-left py-3 px-2">Orders</th>
                <th className="text-left py-3 px-2">Price</th>
                <th className="text-left py-3 px-2">Info</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => {
                const { t_id, date, orders, user, total } = order;
                return (
                  <tr className="border-b border-gray-800" key={t_id}>
                    <td className="py-3 px-2 flex flex-col gap-1">
                      <h2>{user.name}</h2>
                      <p>{user.email}</p>
                      <span className="text-[0.7rem]">{user._id}</span>
                    </td>
                    <td className="py-3 px-2">
                          {orders?.map((orderItem)=>{
                            return (
                              <div className='grid mb-2 grid-cols-4' key={orderItem?._id}>
                                <div className=''>
                                <Image width={200} height={200} src={orderItem.image} alt="img" className='w-[5rem] h-[5rem]'/>
                                </div>
                                <div className='h-full '>
                                    <h2>{orderItem?.name}</h2>
                                    <p className='text-gray-500'>{orderItem?.description.slice(0,20)}...</p>
                                </div>
                                <div className='flex flex-col gap-2 flex-wrap'>
                                  <span>₹ : {orderItem?.price}/-</span>
                                  <span className="text-[10px]">{orderItem?._id}</span>
                                </div>
                                <div className='flex flex-col gap-2 '>
                                    <span>Tag: {orderItem?.tag}</span>
                                    <span>Size: {orderItem?.size}</span>
                                </div>
                              </div>
                            )
                          })}
                      </td>
                    <td className="py-3 px-2">{total}</td>
                    <td className="py-3 px-2">{date} <br /> {t_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentItems.length < itemsPerPage}
              className="px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all"
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
