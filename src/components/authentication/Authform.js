"use client"
import React, { useContext } from 'react'
import productContext from '@contextAPI/productContext/productContetx';
import userContext from '@contextAPI/userContext/userContext';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Loader from '@components/Loader/Loader';

const Authform = ({source}) => {
    const router = useRouter(); 
    const {requestToAPI, fetchUserProfile, signUpWithGoogle, loader} = useContext(userContext); 
    const {fetchWishlistCart} = useContext(productContext);

    const handleSubmit = async (e)=>{
        e.preventDefault(); 
        const name = source==="signup" && document.querySelector("#user").value; 
        const email = document.querySelector("#email").value; 
        const password = document.querySelector("#password").value; 
        const user = {
            name, email, password, source
        }
        const response = await requestToAPI(user);

        if(response.success){
            toast.success(response.note);
            localStorage.setItem("auth-token", response.authtoken); 
            fetchUserProfile(); 
            fetchWishlistCart("cart"); 
            fetchWishlistCart("wishlist"); 
            setTimeout(()=>{
                router.push(`${process.env.NEXT_BASE_URL}`)
            },1000)
        }else{
            toast.error(response.note);
        }
    }
    const handleGoogle = async ()=>{
        const response = await signUpWithGoogle(); 
        if(response.success){
            toast.success(response.note);
            fetchUserProfile(); 
            fetchWishlistCart("cart"); 
            fetchWishlistCart("wishlist"); 
            setTimeout(()=>{
                router.push(`${process.env.NEXT_BASE_URL}`)
            },1000)
        }else{
            toast.error(response.note);
        }
    }
  return (
    <section className={`mt-[1rem] w-full h-full min-h-full bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover`}>
        {loader ? <Loader/> : ""}
        <div className="w-full h-full flex flex-col items-center justify-center md:px-6 px-2 py-8 mx-auto  lg:py-0">
            <div className="w-full bg-white rounded-lg shadow-2 shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl flex items-center gap-2">
                        {source==="signup" ? "Create an Account" : `Log in to Gahanalya`} 
                        <Image width={200} height={200} src="/assets/logo-icon.png" className='w-[2rem] h-[2rem]' alt="" />
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        {source==="signup" && <div>
                            <label htmlFor="user" className="block mb-2 text-sm font-medium ">Your Username</label>
                            <input type="text" name="user" id="user" className="border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="enter a username" required="true"/>
                        </div>}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
                            <input type="email" name="email" id="email" className="border border-gray-300  sm:text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5" placeholder="name@gmail.com" required="true" autoComplete='off'/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="true" autoComplete='off'/>
                        </div>

                        <button type="submit" className={`w-full bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all rounded-lg text-sm px-5 py-2.5 text-center font-bold `}>{source==="signup" ? "Sign Up" : "Log In"}</button>
                        <hr />
                        <button className='w-full border-2 p-2 text-[1rem] rounded-md flex items-center gap-2 justify-center' type='button' onClick={handleGoogle}>Sign in with <Image width={200} height={200} src="/assets/google.svg" alt="google-logo" className='w-[1.5rem] h-[1.5rem]' /></button>
                        <p className="text-sm font-light text-black">
                        {source==="signup" ? "Already have account?" : "Don't have an account?"} <Link  href
                            ={source==="signup" ? "/login" : "/signup"} className={`font-bold`}>{source==="signup" ? "Login" : "Signup"}</Link>
                        </p>
                    </form>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default Authform;
