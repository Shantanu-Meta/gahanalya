import Image from 'next/image';
import React from 'react'
import Marquee from 'react-fast-marquee';

const CollectionsGallery = () => {

  const img = require.context('/public', false);
  const imageList = img.keys().map(image => img(image));
  return (
    <div className="flex justify-center items-center flex-col collection-fade">
      <Marquee className='mt-[1rem] min-w-[100%]'>
        <div className="flex justify-evenly flex-wrap h-[300px]">
          {
            imageList.map((img, index)=>{
              return (
                <div className="h-[250px] mb-4 md:mb-0 mx-[2rem]" key={index}>
                  <Image src={img?.default} width={200} height={200} alt="image" unoptimized={true} priority className="h-full rounded-lg drop-shadow-xl" />
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



