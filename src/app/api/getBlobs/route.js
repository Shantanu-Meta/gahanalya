import { NextResponse } from "next/server";
import { list } from '@vercel/blob';  
export const GET = async (req) => {
    try{
        const { blobs } = await list();
        return new NextResponse(JSON.stringify({blobs, success:true}, {status: 200}))

    }catch(e){
        return new NextResponse(JSON.stringify({error: "Server error", success:false}, {status: 500}))
    }
}