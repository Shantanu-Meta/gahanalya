// pages/api/razorpay.js
const Razorpay = require("razorpay");
const shortid = require("shortid");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
import { NextResponse } from "next/server";

// Initialize razorpay object
const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

export const POST = async (req) => {
    req = await req.json(); 

    try {
        const amount = req.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: shortid.generate(),
        }   
    
        const order = await razorpayInstance.orders.create(options); 
        return new NextResponse(JSON.stringify({data: {
            success:true,
            msg:'Order Created',
            order_id:order.id,
            amount:amount,
            key_id:RAZORPAY_ID_KEY,
            contact:"9093446447",
            name: "Shantanu Dutta",
            email: "shantanuofficial07@gmail.com"
        }, success:true}, {status: 200}))                           
    
    } catch (e) {
        return new NextResponse(JSON.stringify({note: e, success:false}, {status: 401}))
    }
}
