
import { NextResponse,NextRequest } from "next/server";
import { get_user,update_user,delete_user } from "@/app/controllers/user";
export default async function handler_http_request(req:NextRequest){
    switch(req.method){
        case 'GET':
            return await get_user(req)
        case 'PUT':
            return await update_user(req)
        case 'DELETE':
            return await delete_user(req)
        default:
           return NextResponse.json({error: `Method ${req.method} not allowed`},{status: 405});
    }   

}
