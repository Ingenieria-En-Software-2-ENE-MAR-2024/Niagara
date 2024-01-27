import {z} from "zod"

export const create_user_validator = z.object({
    name : z.string(),
    email : z.string().email(),
    role : z.string(),
})