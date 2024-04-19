"use client";

import React, { useState } from 'react'
import adminContetx from './adminContetx';

const UseAdminContext = ({children}) => {
    const BASE_URL = process.env.NEXT_BASE_URL
    const [allOrders, setAllOrders] = useState([]); 
    const [loader, setLoader] = useState(0); 

    const addProduct = async (product)=>{    // product = new product
        try{
            setLoader(1);
            const addedproduct = await fetch(`${BASE_URL}api/allproducts`, {
            method: "POST",
            body:product, 
            cache: 'no-store' 
            }); 

            setLoader(0);
            const response = await addedproduct.json();
            return response; 
        }catch(e){
            console.log("Failed to upload")
        }
    }

    const getAllOrderforAdmin = async () => {
        try {
            setLoader(1);
            const getAllOrders = await fetch(`${BASE_URL}api/adminOrder`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: 'no-store'
            });
            const response = await getAllOrders.json();
            console.log(response)
            if (response.success) {
                const newOrders = await Promise.all(response.data.map(async (item) => {
                    const date = item.date;
                    const t_id = item.trans_id;
                    const total = item.total;
                    const user =  item.user; 
                    const newProd = await Promise.all(item.ids.map(async (p_id) => {
                        return await getSingleProductInfo(p_id);
                    }));
                    return {
                        date,
                        t_id,
                        total,
                        user,
                        orders: newProd
                    };
                }));
                setAllOrders(newOrders);
            } else {
                console.error("Failed to fetch orders:", response.error);
            }
            setLoader(0);
        } catch (error) {
            return {success:false, note: "Error occured"}
        }
    }

    const getSingleProductInfo = async (id) =>{
        try{
            const singleeProd = await fetch(`${BASE_URL}api/allproducts`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "productId": id
            },
            cache: 'no-store' 
            }); 
            const response = await singleeProd.json();
            return response[0]; 
        }catch(e){
            console.log("error from fetchWishlist")
        }
    }


    return (
        <adminContetx.Provider value={{addProduct, allOrders, getAllOrderforAdmin, loader, setLoader}}>
            {children}
        </adminContetx.Provider>
    )
}

export default UseAdminContext;
