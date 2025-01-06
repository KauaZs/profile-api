import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
export default async function getUserRoute(req: FastifyRequest, res: FastifyReply) {
    const user_access = req.cookies.user_discord;
    if (!user_access) return res.status(401).send({
        "error": "invalid user",
        "status": 401
    });
    
    try {
        const user = jwt.verify(user_access, process.env.SECRET_KEY as string)
        return res.status(200).send(user)
    } catch(e: any) {
        return res.status(403).send({
            "error": "not authorized",
            "status": 403
        })
    }
}