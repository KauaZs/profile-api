import { FastifyReply, FastifyRequest } from "fastify";
import { DiscordAuth } from "../../utils/auth2Client";
import crypto from 'crypto'

export default async function authRoute(req: FastifyRequest, res: FastifyReply) {
    const oauth = DiscordAuth;
    const url = oauth.generateAuthUrl({
        scope: ['identify'],
        state: crypto.randomBytes(16).toString("hex"),
    })

    res.redirect(url)
}