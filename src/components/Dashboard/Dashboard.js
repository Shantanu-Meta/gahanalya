"use client"
import React, { useContext } from 'react'
import Link from 'next/link'; 
import { signOut } from 'firebase/auth';
import auth from '@Firebase/config';
import { useRouter } from 'next/navigation';
import userContext from '@contextAPI/userContext/userContext';
import productContext from '@contextAPI/productContext/productContetx';
import Cookies from 'js-cookie';

const Dashboard = () => {
    const router = useRouter(); 
    const {user, setUser} = useContext(userContext); 
    const {setCart, setWishlist} = useContext(productContext); 
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
        <div className="antialiased bg-[#f2efe9] w-full min-h-screen text-black relative py-4 pt-[2rem]">
            <div className="grid grid-cols-1  md:grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <div id="menu" className="bg-white/30 md:col-span-3 rounded-lg p-4 ">
                    <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent text-yellow-600">Dashboard<span className="text-black">.</span></h1>
                    <hr className="my-2 border-slate-700"/>
                    <div id="menu" className="flex flex-col space-y-2 my-5">
                        <Link href="/admin/products" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div className='text-[2rem]'>
                                    &#x2b;   
                                </div>
                                <div>
                                    <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-yellow-400 drop-shadow-sm">Add Product</p>
                                <p className="text-slate-700 text-sm hidden md:block">New Jewellary</p>
                                </div>
                                
                            </div>
                        </Link>
                        <Link href="/admin/allproducts" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div className='text-[1.5rem]'>
                                <i className="ri-edit-circle-line"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-yellow-400 drop-shadow-sm">All Jewellery</p>
                                <p className="text-slate-700 text-sm hidden md:block">Edit / Delete</p>
                                </div>
                                
                            </div>
                        </Link>
                        <Link href="/admin/users" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>                              
                                </div>
                                <div>
                                    <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-yellow-400 drop-shadow-sm">Customers</p>
                                <p className="text-slate-700 text-sm hidden md:block">Manage customers</p>
                                </div>
                                
                            </div>
                        </Link>

                        <button className='p-2 border text-black bg-yellow-400 rounded-md hover:text-yellow-400 hover:bg-black transition-all shadow-md' onClick={logOut}>Log Out <i className="ri-arrow-right-line"></i></button>

                    </div>
                </div>
                <div id="content" className="bg-white/10 md:col-span-9 rounded-lg p-6">
                    <div id="24h">
                        <h1 className="font-bold py-4 uppercase">Statistics</h1>
                        <div id="stats" className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-yellow-400  p-6 rounded-lg">
                                <div className="flex flex-row space-x-4 items-center">
                                    <div id="stats-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 ">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className=" text-sm font-medium uppercase leading-4">Users</p>
                                        <p className=" font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>+28</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                                </svg>
                                                
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-lg bg-yellow-400">
                                <div className="flex flex-row space-x-4 items-center">
                                    <div id="stats-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 ">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        
                                    </div>
                                    <div>
                                        <p className=" text-sm font-medium uppercase leading-4">Invoices</p>
                                        <p className="font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>+10</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                                </svg>
                                                
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="last-users">
                        <h1 className="font-bold py-4 uppercase">Admin Access</h1>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-black/30">
                                    <tr>
                                    <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                                    <th className="text-left py-3 px-2">Email</th>
                                    <th className="text-left py-3 px-2 rounded-r-lg ">Actions</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                <tr className="border-b border-gray-800">
                                    <td className="py-3 px-2 font-bold">
                                        Shantanu Dutta
                                    </td>
                                    <td className="py-3 px-2">9093446447</td>
                                    <td className="py-3 px-2 text-center">
                                        <div className="inline-flex items-center space-x-3">
                                            <a href="" title="Suspend user" className="hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
      )
}

export default Dashboard
