"use server"
import User from "@lib/models/user";
import { NextResponse } from "next/server";
const { default: connectWithMongo } = require("@lib/db");
const bcrypt = require('bcrypt');
const SECRET_SIGNATURE = 'ABCII78$%'
var jwt = require('jsonwebtoken');

export const GET = async (req) => { // Done
    await connectWithMongo();
    const getHeader = new Headers(req.headers); // convert a headers to Header obj.
    const token = getHeader.get("auth-token"); // access all headers via get() method in Header obj.

    if(!token){
        return new NextResponse(JSON.stringify({error: "Unauthorized access"}, {status: 401}))
    }

    try{
        const data = jwt.verify(token, SECRET_SIGNATURE); 
        const _id =  data.user.id;
        const user = await User.findById(_id).select("-password"); 
        return new NextResponse(JSON.stringify({note: "Successfully fetched user", success:true, user}, {status: 200}))

    }catch(e){
        return new NextResponse(JSON.stringify({error: "Unauthorized access" + e}, {status: 401}))
    }
}

export const POST = async (req) => {    // DONE
    await connectWithMongo();
    req = await req.json(); 
    const {email, name, password} = req; 

    try{
        if(req.source === "signup"){
            const secPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({name, email, password:secPassword});
            await newUser.save(); 
            const data = {
                "user":{
                    id: newUser.id
                }
            }
            var authtoken = jwt.sign(data, SECRET_SIGNATURE, { expiresIn: "2d" });
            return new NextResponse(JSON.stringify({note: "Successfully Signed Up", success:true, authtoken}, {status: 200}))
        }else if(req.source === "login"){
            const user = await User.findOne({"email": email}); 
            const pass = await bcrypt.compare(password, user.password);
            if(user && pass){
                const data = {
                    user:{
                        id: user.id
                    }
                }
                var authtoken = jwt.sign(data, SECRET_SIGNATURE, { expiresIn: "2d" });
                return new NextResponse(JSON.stringify({note: "Successfully logged in", success:true, authtoken}, {status: 200}))
            }else{
                return new NextResponse(JSON.stringify({note: "Invalid credentials", success:false}, {status: 500}))
            }       
        }else{  // from google
            const exists =await User.findOne({"email":email})
            if(exists){
                const data = {
                    user:{
                        id: exists.id
                    }
                }
                var authtoken = jwt.sign(data, SECRET_SIGNATURE, { expiresIn: "2d" });
                return new NextResponse(JSON.stringify({note: "Successfully logged in", success:true, authtoken}, {status: 200}))
            }else{
                const secPassword = bcrypt.hashSync(password, 10);
                const newUser = new User({name, email, password:secPassword});
                await newUser.save(); 
                const data = {
                    "user":{
                        id: newUser.id
                    }
                }
                var authtoken = jwt.sign(data, SECRET_SIGNATURE, { expiresIn: "2d" });
                return new NextResponse(JSON.stringify({note: "Successfully Signed Up", success:true, authtoken}, {status: 200}))
            }
        }
    }catch(e){
        return new NextResponse(JSON.stringify({note: "Internal server error" + e}, {status: 500}))
    }
}

export const PUT = async (req) => {
    await connectWithMongo();
    req = await req.json();  
    try{
        const data =  await User.findByIdAndUpdate(req.id, {$set: req}, {new: true});
        return new NextResponse(JSON.stringify(data, {status: 200}))
    }catch(e){
        return new NextResponse(JSON.stringify({error: "Internal server error" + e}, {status: 500}))
    }
}

export const DELETE = async (req) => {
    await connectWithMongo();
    req = await req.json(); 
    console.log(req)
    try{
        const user = await User.findByIdAndDelete(req.id);
        return new NextResponse(JSON.stringify({success: user}, {status: 200}))
    }catch(e){
        return new NextResponse(JSON.stringify({error: "Internal server error " + e}, {status: 500}))
    }
}

