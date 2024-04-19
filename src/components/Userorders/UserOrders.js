"use client"
import React, { useContext } from 'react'
import productContext from '@contextAPI/productContext/productContetx';
import Image from 'next/image';
const UserOrders = () => {
    const { order } = useContext(productContext);
  
    return (
      <div className="mt-[2rem] w-full">
        <div className="mb-4">
          <h1 className="font-bold py-4 uppercase px-4">
            Order Placed: {order?.length}
          </h1>
          <div className="overflow-x-scroll bg-white/30">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-black/10">
                <tr>
                <th className="text-center py-3 px-2 rounded-l-lg">Transaction id</th>
                <th className="text-center py-3 px-2 ">Orders</th>
                <th className="text-center py-3 px-2">Total Price</th>
                <th className="text-center py-3 px-2">Date</th>
                </tr>
              </thead>
              {order?.map((product) => {
                const { t_id, date, orders, total } = product;
                return (
                  <>
                    <tr className="border-b border-gray-800" key={t_id}>
                      <td className="py-3 px-2 font-bold flex flex-col gap-1">{t_id}</td>
                      <td className="py-3 px-2">
                          {orders?.map((orderItem)=>{
                            return (
                              <div className='grid mb-2 lg:grid-cols-4 grid-cols-1 md:grid-cols-2' key={orderItem?._id}>
                                <div>
                                <Image width={200} height={200} src={orderItem.image} alt="img" className='w-[5rem] h-[5rem]'/>
                                </div>
                                <div className='h-full'>
                                    <h2>{orderItem?.name}</h2>
                                    <p className='text-gray-500'>{orderItem?.description}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                  <span>₹ : {orderItem?.price}/-</span>
                                  <span className='text-xs'>{orderItem?._id}</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span>Tag: {orderItem?.tag}</span>
                                    <span>Size: {orderItem?.size}</span>
                                </div>
                              </div>
                            )
                          })}
                      </td>
                      <td className="py-3 px-2">{total}</td>
                      <td className="py-3 px-2">{date}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
export default UserOrders
