import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import getUserData from "../../utils/database/getUserData";
import OAuth from "discord-oauth2";

dotenv.config()
export default async function getUserRoute(req: FastifyRequest, res: FastifyReply) {
    const user_access = req.cookies.user_discord;
    if (!user_access) return res.status(401).send({
        "error": "invalid user",
        "status": 401
    });
    
    try {
        const user = jwt.verify(user_access, process.env.SECRET_KEY as string) as OAuth.User
        const userData = await getUserData(user?.id as string, user)

        const response = {
            discord: user,
            database: userData
        }
        
        return res.status(200).send(response)
    } catch(e: any) {
        return res.status(401).send({
            "error": "not authorized",
            "status": 401
        })
    }
}