"use client"
import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

function Showcase({ data }) {
  const showcaseRef = useRef(null);

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none restart none",
        start: "top bottom",
      },
    });

    tl.fromTo(
      element,
      { opacity: 0, y: 200 },
      { opacity: 1, y: 0, duration: 1, ease: "power4" }
    );
  }, [data]); // Re-run the animation when data changes

  const { name, desc, img, src } = data;

  return (
    <div ref={showcaseRef} className="individual-card">
      <div className="w-full shadow-2 shadow-lg flex justify-between p-3 rounded-md box-fade bg-[#f2efe9]">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-medium title-font mb-2">{name}</h2>
          <p className="leading-relaxed text-base mb-4">{desc}</p>
          <a
            href={`/${src}`}
            className="text-black p-1 bg-yellow-500 hover:text-yellow-400 hover:bg-black transition-all inline-block w-[70%] rounded-full text-center"
          >
            SHOP NOW
          </a>
        </div>
        <div className="thumb">
            <Image width={200} height={200} src={`/${img}`} alt="img"  className="w-[8rem] h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Showcase;
