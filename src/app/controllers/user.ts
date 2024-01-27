import { NextRequest, NextResponse } from "next/server";
import { create_user_validator } from "@/app/validators/user";
import { handle_error_http_response } from "@/app/utils/error_handler";
import { create_user } from "../services/user";

export const post_user = async (req:NextRequest) =>{
    try{
       // const data = create_user_validator.parse(req.body);
        const body = await req.json()
       
   
        const new_user =await create_user(body)

      return new_user
    }catch(error){
        handle_error_http_response(error)
    }
}

export const get_user= async (req:NextRequest) => {

}

export const get_users = async(req:NextRequest) =>{

}

export const update_user = async(req:NextRequest)=>{

}

export const delete_user = async(req:NextRequest)=>{

}