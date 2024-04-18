"use client"
import React, { useContext } from 'react'
import CartItem from '@components/CartItem/CartItem';
import productContext from '@contextAPI/productContext/productContetx';
import userContext from '@contextAPI/userContext/userContext';
import { toast } from 'react-toastify';
import Loader from '@components/Loader/Loader';

const Cart = async () => {
  const {user} = useContext(userContext); 
  const {cart, totalPrice, checkout, placeOrder, loader} = useContext(productContext);
  const handleCheckOut = async ()=>{
    const resp = await checkout(); 
    if (resp.success) {

      const productIds = []; 
      cart.map((item)=>productIds.push(item.productId))
      const orderObj = {
        orders:productIds,
        trans_id:resp?.response?.razorpay_payment_id,
        total:totalPrice
      }
      const response = await placeOrder(orderObj); 
      if(response.success){
        toast.success(response.note);
      }else{
        toast.error(response.note)
      }
  } else {
      alert("Payment failed");
  }
  }
  {return user.success ? (
    cart.length > 0 ? 
    <section className="text-gray-600 body-font min-h-full">
    {loader ? <Loader/> : ""}
      <div className="container mx-auto w-[90%] lg:w-[80%]  md:text-xl pt-24 flex sm:items-center justify-between text-black text-[1rem] flex-col sm:flex-row gap-2 sm:gap-0">
        <div className='flex flex-col sm:flex-row gap-2'>
        <h2>Your cart: {cart.length} items</h2>
        <h2>Total ₹: {totalPrice}</h2>
        </div>
        <button className=' p-1 md:p-2 bg-yellow-400 text-black hover:text-yellow-400 hover:bg-black transition-all rounded-md text-[1rem] md:text-xl w-max' onClick={handleCheckOut} disabled={totalPrice===0}>CheckOut</button>
      </div>
      <div className="container py-10 mx-auto w-[90%] lg:w-[80%]">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cart.map((product)=>{
                    return <CartItem data={product} key={product._id}/>
                })}
          </div>
          </div>
    </section>
    : (<div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center pt-[5rem] min-h-[100vh]">
      <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">no item in cart</h1>
      </div>)
      ) : (<div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center pt-[5rem] min-h-[80vh]">
      <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Log in to check cart</h1>
      </div>)
  }
}

export default Cart
