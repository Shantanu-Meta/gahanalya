"use client";

import React, { useState } from 'react'
import allProductsContetx from './allProductContext';

const UseAllProductsContext = ({children}) => {
    const BASE_URL = process.env.NEXT_BASE_URL
    const [gold, setGold] = useState([]); 
    const [silver, setSilver] = useState([]); 
    const [loader, setLoader] = useState(0);

    const getData = async (tag) => {
        try{
            setLoader(1);
            const allProducts = await fetch(`${BASE_URL}api/allproducts`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "tag":tag
                },
                cache: 'no-store' 
            }); 
            const response = await allProducts.json();
            if(tag==="gold"){
                setGold(response); 
            }else{
                setSilver(response); 
            }
            setLoader(0);
            return response; 
        }catch(e){
            return {success:false, note:"Error Occured"}
        }
      }

    const deleteProduct = async (productId)=>{    
        try{
            setLoader(1); 
            const deletedProduct = await fetch(`${BASE_URL}api/allproducts`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({"productId":productId}),
            cache: 'no-store' 
            }); 
            const response = await deletedProduct.json();

            if(response.success){
                if(response?.prod?.tag==="gold"){
                    const updatedGold = gold.filter(product => product._id !== response.prod._id);
                    setGold(updatedGold); 
                }else if(response?.prod?.tag==="silver"){
                    const updatedSilver = silver.filter(product => product._id !== response.prod._id);
                    setSilver(updatedSilver)
                }
            }
            setLoader(0); 
            return response; 
        }catch(e){
            return {success:false, note:"Error Occured to delete"}
        }
    }

    // const editProduct = async (id) =>{
    //     try{
    //         const singleeProd = await fetch(`${BASE_URL}api/allproducts`, {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "productId": id
    //         },
    //         cache: 'no-store' 
    //         }); 
    //         const response = await singleeProd.json();
    //         return response[0]; 
    //     }catch(e){
    //         console.log("error from fetchWishlist")
    //     }
    // }

    return (
        <allProductsContetx.Provider value={{getData,deleteProduct,gold, silver, loader}}>
            {children}
        </allProductsContetx.Provider>
    )
}

export default UseAllProductsContext;
