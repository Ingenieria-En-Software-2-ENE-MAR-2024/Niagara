import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import  { getUserByName } from '../helpers/userService'; 
import jwt from 'jsonwebtoken';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const {userName, password} = req.body;
    const user = await getUserByName(userName);

    if (!user) {
        return res.status(401).json({message: 'Incorrect username or password'});
    }

    const passwordMatches = await bcrypt.compare(password,user.hashedPassword);

    if (!passwordMatches) {
        return res.status(401).json({message: 'Incorrect username or password'});
    }

    const token = jwt.sign({ userName: user.userName}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({ message: "Succesful login", token});

}