import { NextApiRequest, NextApiResponse } from "next";
import { getUserByName } from "../helpers/userService";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "turing0210";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { userName, password } = req.body;
  const user = await getUserByName(userName);

  if (!user) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  if (user.password === null) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const token = jwt.sign({ userName: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Successful login", token });
}
