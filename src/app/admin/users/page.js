"use client"
import React, { useContext, useEffect } from 'react'
import UserDetails from '@components/UserDetails/UserDetails'
import adminContetx from '@contextAPI/adminContext/adminContetx'

const Page = () => {
  const { getAllOrderforAdmin } = useContext(adminContetx); // Corrected typo in useContext argument

    useEffect(()=>{
      async function getData(){
        await getAllOrderforAdmin(); 
      }

      getData();
    },[])

  return (
    <div>
      <UserDetails/>
    </div>
  )
}

export default Page
