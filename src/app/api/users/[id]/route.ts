
import { NextResponse,NextRequest } from "next/server";

import { get_user,delete_user, update_user } from "@/app/controllers/user";


export async function GET(req: NextRequest, params: {params: {id:string}}) {
    try{
        const read_user  = await get_user(req,params);
        return NextResponse.json(read_user,{status:200})
    }catch(err:any){
        const error_json = {
            "error_message": err.error_message,
            "error_message_detail": err.error_message_detail,
            "error_code":err.error_code
           }
        return NextResponse.json(error_json, {status:err.status})
    }
 
    
 }


 export async function DELETE(req: NextRequest, params: {params: {id:string}}) {
    try{
        const user = await delete_user(req,params);
        return NextResponse.json(user,{status:200})
    }catch(err:any){
        const error_json = {
            "error_message": err.error_message,
            "error_message_detail": err.error_message_detail,
            "error_code":err.error_code
           }
        return NextResponse.json(error_json, {status:err.status})
    }
 
    
 }


 export async function PUT(req: NextRequest, params: {params: {id:string}}) {
    try{
        const list_users  = await update_user(req,params);
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
