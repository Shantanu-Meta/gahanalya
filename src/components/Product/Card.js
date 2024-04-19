import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Card = (props) => {
  const {_id, name, description, price, image, size, tag} = props.data; 
  return (
    <div className="w-full shadow-md bg-white rounded-md shadow-yellow-600 individual-card">
        <Link href={{
          pathname: `/${tag.toLowerCase()}/${name}`,  // this generates Params that is slug folder name for routing.
          query:props.data  // searchparams : all data passed as props
        }}>
            <div className='block relative lg:h-[40vh] h-48 overflow-hidden rounded-md'>
            <Image  alt={name} className="object-cover object-center w-full h-full block relative" src={image} width={100} height={100} unoptimized={true} priority/>
            </div>
            <div className="p-4 flex flex-col items-between gap-2">
                <h2 className="text-black title-font text-lg font-medium">{name}</h2>
                <h3 className="text-gray-500 text-[0.8rem]">{description}</h3>
                <p className="font-bold text-[1rem] text-black">₹ {price}</p>
                <div className='w-full flex  gap-4 items-center text-[0.8rem]'>
                <p>Size: {size}</p>
                <p>Tag: {tag.toUpperCase()}</p>
                </div>
                <p className="text-sm text-gray-500">Product Id: <br /> {_id}</p>
            </div>
            <div className='w-full px-4 mb-2'>
              <span className='text-[0.7rem] bg-yellow-500 text-black inline-block p-2 rounded-full hover:bg-black hover:text-yellow-400 transition-all	'>SHOP NOW</span>
            </div>
        </Link>
      </div>
  )
}

export default Card; 
