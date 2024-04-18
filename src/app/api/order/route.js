import UserOrder from "@lib/models/order";
import { NextResponse } from "next/server";
const { default: connectWithMongo } = require("@lib/db");
const SECRET_SIGNATURE = 'ABCII78$%'
var jwt = require('jsonwebtoken');

export const POST = async (req) => {
  await connectWithMongo();
  const getHeader = new Headers(req.headers); // convert a headers to Header obj.
  const token = getHeader.get("auth-token"); // access all headers via get() method in Header obj.
  if (!token) {
    return new NextResponse(JSON.stringify({ note: "Unauthorized access", success: false }, { status: 401 }));
  }
  req = await req.json();
  try {
    const data = jwt.verify(token, SECRET_SIGNATURE);
    const _id = data.user.id;
    const newOrderData = {...req, userId: _id};
      const newOrder = new UserOrder(newOrderData);
      await newOrder.save();
      return new NextResponse(JSON.stringify({ success: true, data: newOrder, note: "Order Successfull" }, { status: 200 }));
    
  } catch (e) {
    return new NextResponse(JSON.stringify({ note: "Some error Occured", success: false }, { status: 500 }));
  }
}

export const GET = async (req) => {
  await connectWithMongo();
  const getHeader = new Headers(req.headers); // convert a headers to Header obj.
  const token = getHeader.get("auth-token"); // access all headers via get() method in Header obj.
  if (!token) {
    return new NextResponse(JSON.stringify({ note: "Unauthorized access", success: false }, { status: 401 }));
  }
  try {
    const data = jwt.verify(token, SECRET_SIGNATURE);
    const _id = data.user.id;
    const allOrders = await UserOrder.find({"userId": _id});
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    const arr = []; 
    allOrders.forEach(order => {
      const orderObj = {
        ids:order.orders, 
        trans_id:order.trans_id,
        date:order.createdAt.toLocaleString("en-IN", options),
        total:order.total
      }; 
      arr.push(orderObj)
    });
    return new NextResponse(JSON.stringify({ success: true, data: arr, note: "Successfully fetched orders" }, { status:200 }));
    
  } catch (e) {
    return new NextResponse(JSON.stringify({ note: "Some error Occured", success: false }, { status: 500 }));
  }
}