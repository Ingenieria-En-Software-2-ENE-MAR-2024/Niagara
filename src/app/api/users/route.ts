import { NextRequest, NextResponse } from "next/server";
import { get_users,post_user } from "@/app/controllers/user";
import z from 'zod'
z.object({
    name : z.string(),
    email : z.string().email(),
    role : z.string()
})

export async function POST(req: NextRequest) {
    try{
        console.log("LLego al route de post user")
        const new_user = await post_user(req);
        return NextResponse.json(new_user, {status:201})
    }catch(err:any){
        const error_json = {
            "error_message": err.error_message,
            "error_message_detail": err.error_message_detail,
            "error_code":err.error_code
        }
    return NextResponse.json(error_json, {status:err.status})
  }
   
   
}
export async function GET(req: NextRequest) {
    try{
        const list_users  = await get_users(req);
        return NextResponse.json(list_users,{status:200})
    }catch(err:any){
        const error_json = {
            "error_message": err.error_message,
            "error_message_detail": err.error_message_detail,
            "error_code":err.error_code
           }
        return NextResponse.json(error_json, {status:err.status})
    }
 
    
 }
 

