"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import userContext from '@contextAPI/userContext/userContext';
import productContext from '@contextAPI/productContext/productContetx';
import { signOut } from 'firebase/auth';
import auth from '@Firebase/config';
import Cookies from "js-cookie";
import UserOrders from '@components/Userorders/UserOrders';
import Loader from '@components/Loader/Loader';

const Profile = () => {
    const router = useRouter(); 
    const {user, setUser} = useContext(userContext); 
    const {setCart, setWishlist, getOrderDetails, loader} = useContext(productContext); 
    useEffect(()=>{
        getOrderDetails(); 
    },[])

    const logOut = ()=>{
        localStorage.removeItem("auth-token"); 
        localStorage.removeItem("user"); 
        Cookies.remove('auth-token') // removed!
        Cookies.remove('email') // removed!
        setUser({});
        setCart([]); 
        setWishlist([]); 
        signOut(auth); 
        router.push(`${process.env.NEXT_BASE_URL}`);
    }
    return (
        <section className={`mt-[5rem] w-full min-h-full pb-5 bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover`}>
        {loader ? <Loader/> : ""}
            <div className="bg-white/30 w-[90%] mx-auto shadow overflow-hidden sm:rounded-lg pt-5">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-yellow-400 drop-shadow-md">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Details and informations about user.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className=" px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                User name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {user.name}
                            </dd>
                        </div>
                        <div className=" px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.email}
                            </dd>
                        </div>
                        
                    </dl>
                </div>
                <div className='px-4 py-5 sm:px-6 flex justify-between items-center'>
                    <button className='p-2 border bg-yellow-400 text-black rounded-md hover:bg-black hover:text-yellow-400 transition-all' onClick={logOut}>Log Out <i className="ri-arrow-right-line"></i></button>
                </div>
                <div className='mt-2 w-full'>
                    <UserOrders/>
                </div>
            </div>
        </section>
    )
}

export default Profile


