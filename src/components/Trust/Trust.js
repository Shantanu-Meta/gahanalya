import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const Trust = () => {
    useGSAP(() => {
        gsap.from(".trust-fade", {
          scrollTrigger: {
            trigger: ".trust-fade",
                toggleActions: "restart none restart none",
            start: "top bottom",
          },
          opacity: 0,
          y: 200,
          ease: "power4",
          stagger: 0.2,
        });
      }, []);  return (
    <div className="w-[80%] mx-auto">
      <h2 className="w-full text-center text-2xl mb-[1rem] trust-title text-yellow-400 trust-fade">Shop with <span className="text-black drop-shadow-sm">Confidence</span></h2>
      <div className="w-full grid grid-col-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 trig-2">
        <div className="flex flex-col justify-center items-center gap-2 text-gray-600 trust-fade">
            <Image width={200} height={200} src="/assets/trust_icon1.png" alt="" className="w-[5rem] h-auto"/>
            <span>Handcrafted Jewellery</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 text-gray-600 trust-fade">
            <Image width={200} height={200} src="/assets/trust_icon2.png" alt="" className="w-[5rem] h-auto"/>
            <span>100% Hallmark</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 text-gray-600 trust-fade">
            <Image width={200} height={200} src="/assets/trust_icon3.png" alt="" className="w-[5rem] h-auto"/>
            <span>Trust of Gahanalya</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 text-gray-600 trust-fade">
            <Image width={200} height={200} src="/assets/trust_icon4.png" alt="" className="w-[5rem] h-auto"/>
            <span>Customer bondings</span>
        </div>
      </div>
    </div>
  );
};

export default Trust;
