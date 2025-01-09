import { FastifyReply, FastifyRequest } from "fastify";
import { DiscordAuth } from "../../utils/auth2Client";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import getUserData from "../../utils/database/getUserData";

dotenv.config()
interface query {
    code: string
}

export default async function callbackRoute(req: FastifyRequest<{Querystring: query}>, res: FastifyReply) {
    const code = req.query?.code;
    if (!code) return res.status(401).send({
        "error": "code is not defined",
        "status": 400
    });

    const token = await DiscordAuth.tokenRequest({
        grantType: 'authorization_code',
        scope: ['identify'],
        code: code
    });

    const user = await DiscordAuth.getUser(token?.access_token)
    const user_token = jwt.sign(user, process.env.SECRET_KEY as string, {
        expiresIn: '7d'
    })

    const userData = await getUserData(user.id, user);
    res
        .setCookie('user_discord', user_token, {
            path: '/',
        })
    
        .redirect('https://kaurds.kauazs.tech/u/' + userData.profileOptions.displayName)
        
}