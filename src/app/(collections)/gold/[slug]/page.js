import React from 'react'
import IndividualProduct from '@components/Product/IndividualProduct';

const Page = ({searchParams}) => {
  return (
    <IndividualProduct searchParams={searchParams}/>
  )
}

export default Page
