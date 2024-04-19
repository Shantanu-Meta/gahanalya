"use client"
import productContext from '@contextAPI/productContext/productContetx';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee';

const CollectionsGallery = () => {

  const {fetchImages, images} = useContext(productContext); 
  useEffect(()=>{
    fetchImages(); 
  },[])

  return (
    <div className="flex justify-center items-center flex-col collection-fade">
      <Marquee className='mt-[1rem] min-w-[100%]'>
        <div className="flex justify-evenly flex-wrap h-[250px]">
          {
            images.map((img)=>{
              return (
                <div className="h-[100%] mx-[2rem]" key={img?.pathname}>
                  <Image src={img?.url} width={100} height={100} alt="image" unoptimized={true} priority className="h-full rounded-lg drop-shadow-xl" />
                </div>
              )
            })
          }
        </div> 
      </Marquee>
    </div>
  );
}

export default CollectionsGallery



