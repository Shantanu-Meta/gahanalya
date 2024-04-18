"use client";
import productContext from "@contextAPI/productContext/productContetx";
import userContext from "@contextAPI/userContext/userContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";

const Navbar = () => {
  const mainRef = useRef(); 
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const { user } = useContext(userContext);
  const { fetchWishlistCart, cart, wishlist } = useContext(productContext);
  const { fetchUserProfile, setUser } = useContext(userContext);

  const fetchUserData = async () => {
    return await fetchUserProfile();
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      if (!user.success) {
        fetchUserData();
      }
      fetchWishlistCart("cart");
      fetchWishlistCart("wishlist");
    } else {
      setUser({ success: false });
    }
  },[]);

  useGSAP(()=>{
    if (typeof window !== "undefined") {
      gsap.from("#nav-header", {
        y: -200,
        delay: 0.5,
        ease:'power4',
      });
    }
  },[])

  return (
    <section  ref={mainRef}>
      <div className="w-full md:w-[80%] m-auto p-2 md:p-4 rounded-lg shadow-2 fixed top-0 left-0 right-0 z-[10] backdrop-blur-md	bg-black/30 shadow-md text-white " id="nav-header">
      <nav className="flex flex-row w-full justify-between items-center" >
        <div>
          <Link href="/">
          <Image
            src="/assets/LOGO-phone.png"
            width={100} height={100} alt="Gahanalya logo"
            className="h-[2.5rem] rounded-full md:rounded-sm drop-shadow-md"
          />
          </Link>
        </div>
        <div className="flex items-center md:justify-between justify-end w-full md:w-auto">
          <ul
            className={`flex md:static z-30 absolute top-[3.5rem] md:flex flex-col md:flex-row items-center md:justify-evenly gap-5 p-4 md:p-0 ${
              show ? "right-0 w-[40%] rounded-md" : "right-[-100%]"
            } bg-black/80   md:bg-transparent transition-all`}
          >
            <li>
              <Link
                href="/"
                className={`${
                  pathName === "/" ? "text-[#ffac26]" : "text-[white]"
                } hover-[brightness-125]`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/gold"
                className={`${
                  pathName === "/gold" ? "text-[#ffac26]" : "text-[white]"
                } hover:brightness-125`}
              >
                Gold
              </Link>
            </li>
            <li>
              <Link
                href="/silver"
                className={`${
                  pathName === "/silver" ? "text-[#ffac26]" : "text-[white]"
                } hover:brightness-125`}
              >
                Silver
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${
                  pathName === "/about" ? "text-[#ffac26]" : "text-[white]"
                } hover:brightness-125`}
              >
                About
              </Link>
            </li>
          </ul>

          <div className="flex flex-row items-center justify-evenly gap-5 ml-[1.25rem]">
            <Link
              href="/cart"
              className={`${
                pathName === "/cart" ? "text-[#ffac26]" : "text-[white]"
              } text-xl relative`}
            >
              <i className="ri-shopping-cart-line"></i>
              <span className="absolute top-[-10px] right-[-10px] text-sm px-[5px]  text-yellow-400 bg-black rounded-full">
                {cart.length}
              </span>
            </Link>
            <Link
              href="/wishlist"
              className={`${
                pathName === "/wishlist" ? "text-[#ffac26]" : "text-[white]"
              } text-xl relative`}
            >
              <i className="ri-heart-line"></i>
              <span className="absolute top-[-10px] right-[-10px] text-sm px-[5px] text-yellow-400 bg-black rounded-full">
                {wishlist.length}
              </span>
            </Link>

            <Link
              href={
                user.success
                  ? Cookies.get("email") === "shantanubhs1985@gmail.com"
                    ? "/admin"
                    : "/profile"
                  : "/login"
              }
              className={`${
                pathName === "/login" ||
                pathName === "/signup" ||
                pathName === "/profile"
                  ? "text-[#ffac26]"
                  : "text-white"
              } flex items-center gap-1`}
            >
              <Image
                src={
                  user.success &&
                  typeof window !== "undefined" &&
                  localStorage.getItem("user")
                    ? JSON.parse(localStorage.getItem("user"))?.photoURL ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                width={100} height={100} alt=""
                className="w-[2rem] h-[2rem] rounded-full border border-yellow-400 p-[0.5px]"
                referrerPolicy="no-referrer"
              />
              {user.success ? <span className={`hidden md:inline-block`}>{user.name.split(' ')[0]}</span> :  <span className="text-black bg-yellow-400 rounded-md px-2 py-1 hover:text-yellow-400 hover:bg-black transition-all">Login</span>}
              
            </Link>
          </div>

          <div
            className="text-lg cursor-pointer md:hidden mx-[1.25rem] transition-all"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? <i class="ri-close-fill text-2xl text-black"></i> : <i className={`ri-menu-fill text-2xl`}></i>}
          </div>
        </div>
      </nav>
      </div>
    </section>
  );
};

export default Navbar;