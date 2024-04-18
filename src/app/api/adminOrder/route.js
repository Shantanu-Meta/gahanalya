import UserOrder from "@lib/models/order";
import User from "@lib/models/user";
import { NextResponse } from "next/server";
const { default: connectWithMongo } = require("@lib/db");


export const GET = async (req) => {
    await connectWithMongo();
  
    try {
      const allOrders = await UserOrder.find({});
      const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      const orderObjs = await Promise.all(allOrders.map(async (order) => {
        const user = await User.findById(order.userId);
        const orderObj = {
          ids: order.orders,
          trans_id: order.trans_id,
          date: order.createdAt.toLocaleString("en-IN", options),
          total: order.total,
          user: user
        };
        return orderObj;
      }));
      return new NextResponse(JSON.stringify({ success: true, data: orderObjs, note: "Successfully fetched orders" }, { status: 200 }));
    } catch (e) {
      return new NextResponse(JSON.stringify({ note: "Some error Occured", success: false }, { status: 500 }));
    }
  }