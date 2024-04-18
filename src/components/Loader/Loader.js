import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-full flex justify-center flex-col items-center bg-[url(/assets/product_home_bg.png)] bg-cover bg-center bg-[#000000d9] bg-blend-darken absolute top-0 left-0 select-none z-[10]'>
    <div className=' w-[50%] md:w-[20%]'>
    <Image src="/assets/LOGO.png" width={100} height={100} alt='GAHANALYA' unoptimized={true} required/>
    </div>
    <span className='text-yellow-400 drop-shadow-md text-2xl md:text-3xl'>
    Loading...
    </span>
  </div>
  )
}

export default Loader
