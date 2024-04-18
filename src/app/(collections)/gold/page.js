"use client"
import Loader from '@components/Loader/Loader';
import Card from '@components/Product/Card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);


const Page = () => {
  const [response, setResponse] = useState([]);
  const [loader, setLoader] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(1); 
        const resp = await getData();
        setResponse(resp);
        setLoader(0);
      } catch (error) {
        console.error("Error to fetch");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const targets = gsap.utils.toArray(".individual-card");

    let ctx = gsap.context(() => {
      targets.forEach((obj, i) => {
        gsap.from(obj, {
          scrollTrigger: {
            trigger: obj,
            toggleActions: "restart none restart none",
            start: "top bottom",
          },
          y: 200,
          opacity: 0,
          ease: "power4",
          duration:1
        });
      });
    });
    return () => ctx.revert(); 
  }, [response]); 

  return (
    <section className="text-gray-600 body-font min-h-full">
      {loader ? <Loader/> : ""}
      <div className="container py-24 mx-auto w-[85%] md:w-[90%] lg:w-[80%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 trigger">
          {response.map((product) => (
            <Card data={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

const getData = async () => {
  const BASE_URL = process.env.NEXT_BASE_URL
  try {

    const allProducts = await fetch(`${BASE_URL}api/allproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "tag": "gold"
      },
      cache: 'no-store'
    });
    const response = await allProducts.json();
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default Page;
