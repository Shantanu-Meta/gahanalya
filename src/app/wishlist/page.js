"use client"
import React, { useContext } from 'react'
import WishItem from '@components/WishItem.js/WishItem';
import productContext from '@contextAPI/productContext/productContetx';
import userContext from '@contextAPI/userContext/userContext';
import Loader from '@components/Loader/Loader';


const Wishlist = async () => {
  const {user} = useContext(userContext); 
  const {wishlist, loader} = useContext(productContext);

  {return user.success ? (
    wishlist.length > 0 ? 
    <section className="text-gray-600 body-font min-h-full">
    {loader ? <Loader/> : ""}
      <div className="container mx-auto w-[90%] lg:w-[80%]  text-xl pt-24 flex items-center justify-between text-black ">
        <h2>Your wishlist: {wishlist.length} items</h2>
      </div>
      <div className="container py-10 mx-auto w-[90%] lg:w-[80%]">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {wishlist.map((product)=>{
                    return <WishItem data={product} key={product._id}/>
                })}
        </div>
      </div>
    </section>
    : (<div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center pt-[5rem] min-h-[100vh]">
    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">No wishlist available</h1>
    </div>)
      ) : (<div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center pt-[5rem] min-h-[80vh]">
      <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Log in to check wishlist</h1>
      </div>)
  }
}

export default Wishlist
