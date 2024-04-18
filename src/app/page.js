"use client";

import CollectionsGallery from "@components/Collections/CollectionsGallery";
import Showcase from "@components/Showcase/Showcase";
import Trust from "@components/Trust/Trust";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    gsap.from(".title", {
      opacity: 0,
      y: 200,
      delay: 0.2,
      ease: "power4",
      stagger: 0.5,
    });

    gsap.from(".text-fade", {
      scrollTrigger: {
        trigger: ".text-fade",
        toggleActions: "restart none restart none",
        start: "top bottom",
      },
      opacity: 0,
      y: 200,
      ease: "power4",
      stagger: 0.3,
    });

    gsap.from(".contact-fade", {
      delay: 0.5,
      opacity: 0,
      y: 200,
      ease: "power4",
      stagger: 0.2,
    });

    gsap.from(".collection-fade", {
      scrollTrigger: {
        trigger: ".collection-fade",
        toggleActions: "restart none restart none",
        start: "top 90%",
      },
      opacity: 0,
      y: 200,
      ease: "power4",
      stagger: 0.2,
    });
  }, []);
  const [open, setOpen] = useState(0);
  const [pricing, setPricing] = useState({
    gold: 0,
    silver: 0,
    date:""
  });

  async function getTodayPrice() {
    const url =
      "https://api.metalpriceapi.com/v1/latest?api_key=3cf747da41c7bd25d5a86a432e5b147f&base=INR&currencies=INR,XAU,XAG";
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result)
      const gold = result.rates.XAU * 28.3; 
      const silver = result.rates.XAG * 28.3; 

      const goldPrice = Math.ceil(10/gold); 
      const silverPrice = Math.ceil(10/silver); 

      const date = new Date(result.timestamp * 1000).toLocaleString().split(",")[0]; 
      setPricing({
        ...pricing, gold:goldPrice, silver: silverPrice, date:date
      })
    } catch (error) {
      toast.error("Failed to fetch")
    }
  }
  return (
    <div className="homepage  relative z-[5] min-h-full">
      <div className={`fixed top-[50%] translate-y-[-50%] z-[8] bg-gradient-to-r from-amber-600 to-red-500 bg-yellow-400 p-4 rounded-md text-white text-xl transition-all ${open ? "right-0"  : "right-[-100%]"}`}>
        <h2>Gold Rate: {pricing.gold} Rs</h2>
        <h2>Silver Rate: {pricing.silver} Rs</h2>
        <p className="text-sm">(On 10 gms)</p>
        <p className="text-sm">{pricing.date}</p>
      </div>
      <div
        className="fixed bottom-[5%] right-0 p-2 bg-gradient-to-r from-amber-400 to-red-500 bg-yellow-400 z-[8] font-bold rounded-md shadow-md text-center cursor-pointer text-white"
        onClick={() => {
          setOpen(open ? 0 : 1);
          if (open===0) {
            getTodayPrice();
          }
        }}
      >
        {open === 1 ? (
          <span className="text-xl">Close</span>
        ) : (
          <span >
            <Image src="/assets/pricing.png" width={50} height={50} alt="Price" className="w-[2rem] md:w-[4rem] h-auto"/>
          </span>
        )}
      </div>

      <section className="bg-[url(/assets/home-phone.jpg)] md:bg-[url(/assets/home.jpg)] bg-cover bg-center min-h-[90vh] drop-shadow-sm md:min-h-[85vh] lg:min-h-[100vh] relative opacity-200 bg-[#2d3748]">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30"></div>
        <div className=" text-white animate-title absolute bottom-[10%] left-[50%] translate-x-[-50%] md:top-[30%] md:left-[10%] md:translate-x-0">
          <h1 className=" text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-[Italiana] title bg-gradient-to-r from-[#ffc72c] to-[#ff4200] bg-clip-text text-transparent drop-shadow-md">
            GAHANALYA
          </h1>
          <span className="text-gray-200  text-[1rem] md:text-[1.5rem] title drop-shadow-md">
            Wear the beauty & spread the happiness
          </span>
        </div>

        <div className="absolute bottom-[35%] md:bottom-[10%] left-[10%] text-white">
          <h2 className="text-[1rem] md:text-[1.5rem] mb-2 md:flex items-center gap-4 hidden contact-fade">
            Create bond with us
            <span>
              <Image
                width={30}
                height={30}
                src={"/assets/logo-icon.png"}
                alt="img"
                className="w-full h-full"
              />
            </span>
          </h2>

          <div className="text-[1rem] md:text-[1.5rem] w-full flex items-center justify-start gap-4 md:gap-8 flex-col md:flex-row">
            <Link
              href="#"
              className="text-green-400  rounded-full py-1 px-2 contact-fade shadow-md shadow-green-400 bg-black"
            >
              <i className="ri-whatsapp-line"></i>
            </Link>
            <Link
              href="#"
              className="text-pink-700  rounded-full py-1 px-2 contact-fade shadow-md shadow-pink-700 bg-black"
            >
              <i className="ri-instagram-line"></i>
            </Link>
            <Link
              href="#"
              className="text-blue-400  rounded-full py-1 px-2 contact-fade shadow-md shadow-blue-400 bg-black"
            >
              <i className="ri-phone-line"></i>
            </Link>
            <Link
              href="#"
              className="text-red-800  rounded-full py-1 px-2 contact-fade shadow-md shadow-red-800 bg-black"
            >
              <i className="ri-mail-line"></i>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[url('/assets/product_home_bg.png')] bg-cover bg-center  bg-no-repeat">
        <div className="container px-2 pt-10 md:pt-24 mb-20 md:px-2 mx-auto">
          <div className="flex flex-col text-center w-full mb-[1.5rem]">
            <h2 className="text-md text-yellow-600 tracking-widest font-medium title-font mb-1 drop-shadow-md text-fade">
              GAHANALYA
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-fade">
              Wear the{" "}
              <span className="text-yellow-800 drop-shadow-sm">beauty</span> &
              bring{" "}
              <span className="text-yellow-800 drop-shadow-sm">happiness</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  grid-rows-auto gap-3 lg:w-[90%] mx-auto">
            {[
              {
                name: "Gold jewellery",
                desc: "Explore golden collections",
                img: "assets/gold_neckless.png",
                src: "gold",
              },
              {
                name: "Silver jewellery",
                desc: "Explore Silver collections",
                img: "assets/gold_pendent.png",
                src: "silver",
              },
              {
                name: "Sankha",
                desc: "Explore sankha collections",
                img: "assets/sankha.jpg",
                src: "gold",
              },
              {
                name: "Ear rings",
                desc: "Explore latest collections",
                img: "assets/Ear_ring.jpg",
                src: "gold",
              },
              {
                name: "Nose rings",
                desc: "Explore latest collections",
                img: "assets/nose_ring.png",
                src: "gold",
              },
              {
                name: "Lokets",
                desc: "Explore latest collections",
                img: "assets/locket.png",
                src: "gold",
              },
            ].map((item) => {
              return <Showcase key={item.img} data={item} />;
            })}
          </div>
        </div>
      </section>
      <section className="w-full mb-[2rem] collection-sec">
        <h1 className="text-3xl text-yellow-400 w-full text-center drop-shadow-sm collection-fade">
          Our <span className="text-black drop-shadow-sm">Collections</span>
        </h1>
        <CollectionsGallery />
      </section>
      <section className="w-full py-[2rem]">
        <Trust />
      </section>
    </div>
  );
}
