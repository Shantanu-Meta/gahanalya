import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee';
import { list } from '@vercel/blob';

const CollectionsGallery = () => {

  // const img = require.context('/public', false);
  // const imageList = img.keys().map(image => img(image));
  const [imageList, setImageList] = useState([]); 
  useEffect(()=>{
    async function getAllCollections(){
      const imageList = await list({token:"vercel_blob_rw_3ks5EzDed3LS5wVC_4FU1GGc3U4vvNP3G1q0GlLBJQ2Fnc3"}); 
      console.log("hello")
      console.log(imageList)
      setImageList(imageList); 
    }
    getAllCollections();
  },[])

  return (
    <div className="flex justify-center items-center flex-col collection-fade">
      <Marquee className='mt-[1rem] min-w-[100%]'>
        <div className="flex justify-evenly flex-wrap h-[300px]">
          {
            imageList.map((img)=>{
              return (
                <div className="h-[250px] mb-4 md:mb-0 mx-[2rem]" key={img?.pathname}>
                  <Image src={img?.url} width={200} height={200} alt="image" unoptimized={true} priority className="h-full rounded-lg drop-shadow-xl" />
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



