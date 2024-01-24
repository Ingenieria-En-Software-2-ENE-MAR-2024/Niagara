import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
import  prisma  from "../../../../prisma/prisma"

z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(8)
})


export async function POST(request: NextRequest) {
   const body =  await request.json()

   const newUser = await prisma.userTest.create({
    data : {
        name : body.name,
        email : body.email,
        role : body.password
        }
   })

    return NextResponse.json(newUser, {status:201})
}
