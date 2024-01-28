import {z} from "zod"

const user_object_body = z.object({
    name : z.string(),
    email : z.string().email(),
    role : z.string(),
    password :z.string().min(8)
})

export const validator_user_create = (body: unknown) =>{
    const its_valdiate = user_object_body.parse(body);
    return its_valdiate;
}