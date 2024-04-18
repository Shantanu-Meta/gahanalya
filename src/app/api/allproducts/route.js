import Product from "@lib/models/product";
import { NextResponse } from "next/server";
const { default: connectWithMongo } = require("@lib/db");
import {writeFile} from 'fs/promises'

export const GET = async (req) => {
    await connectWithMongo();
    const getHeader = new Headers(req.headers); // convert a headers to Header obj.
    const tag = getHeader.get("tag"); // access all headers via get() method in Header obj.
    const productId = getHeader.get("productId"); // access all headers via get() method in Header obj.
    try{
        if(tag !== null){
            let data = await Product.find({"tag":tag});
            return new NextResponse(JSON.stringify(data), {status: 200})
        }else{
            let singleProduct = await Product.find({"_id":productId});
            return new NextResponse(JSON.stringify(singleProduct), {status: 200})
        }
    }catch(e){
        return new NextResponse(JSON.stringify({error: "Internal Server error" + e}, {status: 500}))
    }
}

export const POST = async (req) => {    // fully done
    await connectWithMongo();
    const data = await req.formData(); 

    const file = data.get('image'); 
    if(!file){
        return new NextResponse(JSON.stringify({error: "Server error", sucess:false}, {status: 500}))
    }
    const byteData = await file.arrayBuffer(); 
    const buffer = Buffer.from(byteData); 
    const path = `./public/products/${file.name}`; 
    await writeFile(path,buffer); 

    const product = {
        name: '',
        description: '',
        price: '',
        tag: '',
        image: '',
        size: '',
    }
    const newProd = {...product, "name":data.get('name'), "description":data.get('description'),"price":data.get('price'),"tag":data.get('tag'),"size":data.get('size'),"image":file.name}
     try{
        const newProduct = new Product(newProd);
        await newProduct.save(); 
        return new NextResponse(JSON.stringify({data: newProduct, success:true}, {status: 200}))
    }catch(e){
        return new NextResponse(JSON.stringify({error: "Server error", success:false}, {status: 500}))
    }   
}

// export const PUT = async (req) => {
//     await connectWithMongo();
//     req = await req.json();  
//     try{
//         const data =  await Product.findByIdAndUpdate(req.id, {$set: req}, {new: true});
//         return new NextResponse(JSON.stringify(data, {status: 200}))
//     }catch(e){
//         return new NextResponse(JSON.stringify({error: "Internal server error" + e}, {status: 500}))
//     }
// }

export const DELETE = async (req) => {
    await connectWithMongo();
    req = await req.json(); 
    console.log(req.productId)
    try{
        const prod = await Product.findByIdAndDelete(req.productId);
        return new NextResponse(JSON.stringify({success: true, prod}, {status: 200}))
    }catch(e){
        return new NextResponse(JSON.stringify({success:false, error: "Internal server error " + e}, {status: 500}))
    }
}