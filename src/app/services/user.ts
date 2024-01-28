
import { user_body_create,filters} from "../interfaces/user";
import prisma from "../../../prisma/prisma";
import { add_property } from "../utils/utils";
import { add_object_to_array } from "../utils/utils";

export const  create_user = async (body:user_body_create)=>{

    try{
        const new_user = await prisma.userTest.create({
            data : {
                name : body.name,
                email : body.email,
                role : body.role,
                password : body.password
                }
           })
        return  new_user
    }catch(error){
        throw error
    }
   
}


export const  read_user = async (id:number)=>{
    try{
        const read_user = await prisma.userTest.findFirst({
            where:{
                id: id}})

        if(!read_user){
            throw new Error("User does not exists")
        } 
        
        return  read_user;
    }catch(error){
        throw error
    }
   
}
export const list_users = async (search_fields?: string[],search_texts?:string[]) =>{
    try{
        let where_clause = {};
        let users;
        if (search_fields!=null && search_texts!=null) {
           if(search_fields.length>1){
            let object_where :any[]= []
            for (let i = 0; i < search_fields.length; i++) {
                object_where  = add_object_to_array(object_where,search_fields[i],search_texts[i])
             }
                 users = await prisma.userTest.findMany({
                 where : {AND: object_where } });
           }else{
                add_property(where_clause,search_fields[0], search_texts[0])
                 users = await prisma.userTest.findMany({
                 where :  where_clause
               });
           
           }
            
            return users

      
          }else{
           const users = await prisma.userTest.findMany({});

            return users
          }
         
  
         
    }catch(error){
        throw error
    }
}


export const  delete_my_user = async (id:number)=>{
   
    try{
        const delete_user = await prisma.userTest.delete({
            where:{
                id: id}})

        if(!delete_user){
            throw new Error("User does not exists")
        } 

        return  delete_user;
    }catch(error){
        throw error
    }
   
}