import UserProduct from "@lib/models/userProduct";
import { NextResponse } from "next/server";
const { default: connectWithMongo } = require("@lib/db");
const SECRET_SIGNATURE = 'ABCII78$%'
var jwt = require('jsonwebtoken');

export const GET = async (req) => {
    await connectWithMongo();
    const getHeader = new Headers(req.headers); // convert a headers to Header obj.
    const token = getHeader.get("auth-token"); // access all headers via get() method in Header obj.
    const source = getHeader.get("source"); // access all headers via get() method in Header obj.
    if(!token){
        return new NextResponse(JSON.stringify({note: "Unauthorized access", success:false}, {status: 401}))
    }

    try{
        const data = jwt.verify(token, SECRET_SIGNATURE); 
        const _id =  data.user.id;
        const allProducts = await UserProduct.find({"userId":_id, "source":source}); 
        return new NextResponse(JSON.stringify({note: "Successfully fetched Product", success:true, data:allProducts}, {status: 200}))

    }catch(e){
        return new NextResponse(JSON.stringify({note: "Unauthorized access", success:false}, {status: 401}))
    }
}

export const POST = async (req) => {    
    await connectWithMongo();
    const getHeader = new Headers(req.headers); // convert a headers to Header obj.
    const token =  getHeader.get("auth-token"); // access all headers via get() method in Header obj.
    if(!token){
        return new NextResponse(JSON.stringify({note: "Unauthorized access", success:false}, {status: 401}))
    }
    req = await req.json(); 
    try{
        const data = jwt.verify(token, SECRET_SIGNATURE); 
        const _id =  data.user.id;
        const product = {...req, userId:_id}
        const newProduct = new UserProduct(product);
        await newProduct.save(); 
        return new NextResponse(JSON.stringify({success:true, data:newProduct, note:"Successfully added"}, {status: 200}))
    }catch(e){
        console.log(e)
        return new NextResponse(JSON.stringify({note: "Unauthorized access", success:false}, {status: 500}))
    }
}

export const DELETE = async (req) => {
    await connectWithMongo();
    const getHeader = new Headers(req.headers); 
    const token =  getHeader.get("auth-token"); 
    if(!token){
        return new NextResponse(JSON.stringify({note: "Unauthorized access", success:false}, {status: 401}))
    }

    req = await req.json(); 

    try{
        const data = jwt.verify(token, SECRET_SIGNATURE); 
        const _id =  data.user.id;
        const product = {...req, userId:_id};
        const deletedProduct = await UserProduct.deleteOne(product); 
        return new NextResponse(JSON.stringify({success:true, data:{...deletedProduct, userId:_id}, note:"Successfully removed"}, {status: 200}))
    }catch(e){
        return new NextResponse(JSON.stringify({note: "Unauthorized access", success:false}, {status: 401}))
    }
}