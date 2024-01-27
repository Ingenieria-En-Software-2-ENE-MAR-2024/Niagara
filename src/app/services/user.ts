
import { user_body_create } from "../interfaces/user";
import prisma from "../../../prisma/prisma";
import { custon_error } from "../utils/error_handler";
export const  create_user = async (body:user_body_create)=>{

    try{
        const new_user = await prisma.userTest.create({
            data : {
                name : body.name,
                email : body.email,
                role : body.role
                }
           })
        return  new_user
    }catch(error){
        new custon_error('internal server error', 500)
    }
   
}