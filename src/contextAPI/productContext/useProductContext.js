"use client";

import React, { useContext, useState } from 'react'
import productContext from './productContetx'
import userContext from '@contextAPI/userContext/userContext';

const UseProductContext = ({children}) => {
    const BASE_URL = process.env.NEXT_BASE_URL; 

    const [wishlist, setWishlist] = useState([]); 
    const [cart, setCart] = useState([]); 
    const [totalPrice, setprice] = useState(0); 
    const {fetchUserProfile} = useContext(userContext); 
    const [order, setOrder] = useState([]); 
    const [loader, setLoader] = useState(0); 

    const addWishlistCart = async (product)=>{    // product = {productId, source}
        try{
            setLoader(1)
            const addedproduct = await fetch(`${BASE_URL}api/product`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body:JSON.stringify(product), 
            cache: 'no-store' 
            }); 

            const response = await addedproduct.json();
            setLoader(0);
            if(!response.success) return response; 

            if(product.source==="cart"){
                let newCart = [...cart]; 
                newCart.push(response.data); 
                setCart(newCart);      
                const addedItem = await getSingleProductInfo(product.productId);
                const tempPrice  =totalPrice + addedItem.price; 
                setprice(tempPrice);
            }else if(product.source === "wishlist"){
                let newWishlist = [...wishlist]; 
                newWishlist.push(response.data);
                setWishlist(newWishlist); 
            }

            return response;
        }catch(e){
            console.log("Failed to add cart or wishlist")
        }
    }

    const fetchWishlistCart = async (source)=>{    // get wishlist / cart
        try{
            setLoader(1);
            const allProducts = await fetch(`${BASE_URL}api/product`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "source": source
            },
            cache: 'no-store' 
            }); 
            const response = await allProducts.json();
            if(!response.success) return response; 
            setLoader(0);
            if(source==="cart"){
                setCart(response.data); 
                let tempPrice = 0; 
                for(let i=0; i<response.data.length; i++){
                    const item = response.data[i]; 
                    const prodId = item.productId; 
                    const resp = await getSingleProductInfo(prodId); 
                    if(resp){
                        tempPrice+= resp.price;
                    }
                }
                setprice(tempPrice); 
            }else if(source === "wishlist"){
                setWishlist(response.data); 
            } 
            return response; 
        }catch(e){
            console.log("error from fetchWishlist " + e)
        }
    }

    const fetchInfo = async (productId, source)=>{
        const resp = await getSingleProductInfo(productId);
        return resp; 
    }

    const getSingleProductInfo = async (id) =>{
        try{
            setLoader(1); 
            const singleeProd = await fetch(`${BASE_URL}api/allproducts`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "productId": id
            },
            cache: 'no-store' 
            }); 
            const response = await singleeProd.json();
            setLoader(0); 
            return response[0]; 
        }catch(e){
            console.log("error from fetchWishlist")
        }
    }

    const removeWishlistCart = async (product)=>{    // remove wishlist / cart
        try{
            setLoader(1); 
            const removedProduct = await fetch(`${BASE_URL}api/product`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body:JSON.stringify(product),
            cache: 'no-store' 
            }); 

            const response = await removedProduct.json();
            setLoader(0); 
            if(!response.success) return response;

            if(product.source==="cart"){
                let newCart = [...cart]; 
                for(let i=0; i<newCart.length; i++){
                    const item = newCart[i]; 
                    if(item.productId === product.productId && item.userId === response.data.userId){
                        newCart.splice(i,1); 
                        const deletedItem = await getSingleProductInfo(item.productId);
                        if(deletedItem){
                            const tempPrice  =totalPrice - deletedItem.price; 
                            setprice(tempPrice)
                        }
                        break; 
                    }
                }
                setCart(newCart); 
            }else{
                let newWishlist = [...wishlist]; 
                for(let i=0; i<newWishlist.length; i++){
                    const item = newWishlist[i]; 
                    if(item.productId === product.productId && item.userId === response.data.userId){
                        newWishlist.splice(i,1); 
                        break; 
                    }
                }
                setWishlist(newWishlist); 
            }
            return response;
        }catch(e){
            console.log("Failed to remove from cart or wishlist")
        }
    }

    const checkWishlistCart = async (source, prodId)=>{    // get wishlist / cart
        try{
            const user = await fetchUserProfile();
            const response = await fetchWishlistCart(source); 

            for(let i=0; i<response.data.length; i++){
                const item = response.data[i]; 
                if(item.userId === user._id && item.productId === prodId && item.source === source){
                  return 1; 
                }
            }
            return 0; 
                
        }catch(e){
            console.log("error from checkWishlistCart")
        }
    }

    const checkout = async ()=>{
        return new Promise(async (resolve) => {
            try{
                setLoader(1);
                const response = await loadScript(
                    "https://checkout.razorpay.com/v1/checkout.js"
                );
        
                if (!response) {
                    alert("Razorpay SDK failed to load. Are you online?");
                    return;
                }

                const order = await fetch(`${BASE_URL}api/razorpay`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body:JSON.stringify({amount:totalPrice}),
                cache: 'no-store'
                }); 

                const res = await order.json();
                if(!res.success) return response; 

                const options = {
                    key: res.data.key_id,
                    amount: res.data.amount,
                    currency: "INR",
                    image: "https://t4.ftcdn.net/jpg/02/50/57/61/360_F_250576190_w8XwVQmucKcdyRkNBR4p2S641hrMkmbX.jpg",
                    order_id: res.data.order_id,
                    handler: function (response) {
                        resolve({ success: true, response }); // Resolve the promise with success status
                    },
                    prefill: {
                        contact: res.data.contact,
                        name: res.data.name,
                        email: res.data.email
                    },
                    notes: {
                        description: "hello from gahanalya"
                    },
                    theme: {
                        color: "#ff9800"
                    }
                };
                const razorpayObject = new window.Razorpay(options);
                razorpayObject.on('payment.failed', function (response) {
                    resolve({ success: false }); // Resolve the promise with success status
                });
                razorpayObject.open();
                setLoader(0);
                
            }catch(e){
                console.log("Failed to create order")
            }
        })
    }
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const placeOrder = async(orders)=>{
        try{
            setLoader(1); 
            const addedOrder = await fetch(`${BASE_URL}api/order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body:JSON.stringify(orders), 
            cache: 'no-store' 
            }); 

            const response = await addedOrder.json();
            setLoader(0); 
            return response; 
        }catch(e){
            console.log("error from" + e)
        }
    }

    const getOrderDetails = async () => {
        try {
            setLoader(1); 
            const getAllOrders = await fetch(`${BASE_URL}api/order`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                cache: 'no-store'
            });
            const response = await getAllOrders.json();
            if (response.success) {
                const newOrders = await Promise.all(response.data.map(async (item) => {
                    const date = item.date;
                    const t_id = item.trans_id;
                    const total = item.total;
                    const newProd = await Promise.all(item.ids.map(async (p_id) => {
                        return await getSingleProductInfo(p_id);
                    }));
                    return {
                        date,
                        t_id,
                        total,
                        orders: newProd
                    };
                }));
                setOrder(newOrders);
            } else {
                console.error("Failed to fetch orders:", response.error);
            }
            setLoader(0);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    }
    
    return (
        <productContext.Provider value={{addWishlistCart, fetchWishlistCart, removeWishlistCart, checkWishlistCart, cart, wishlist, setCart, setWishlist, fetchInfo, totalPrice, checkout, placeOrder, getOrderDetails, order, setOrder, loader}}>
            {children}
        </productContext.Provider>
    )
}

export default UseProductContext;
