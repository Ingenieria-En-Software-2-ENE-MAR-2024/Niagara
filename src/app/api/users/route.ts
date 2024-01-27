import { NextRequest, NextResponse } from "next/server";

import { get_users,post_user } from "@/app/controllers/user";
import z from 'zod'
z.object({
    name : z.string(),
    email : z.string().email(),
    role : z.string()
})

export async function POST(req: NextRequest) {
  
   const new_user = await post_user(req);
   return NextResponse.json(new_user, {status:201})
   
}
export async function GET(req: NextRequest) {
  
    return await get_users(req);
    
 }
 

