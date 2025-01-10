import { FastifyReply, FastifyRequest } from "fastify";
import User from "../../models/User";
import getDiscordData from "../../utils/getDiscordData";
import {User as OAuthUser} from "discord-oauth2";
interface params {
    username: string,
    countView: boolean
}
export default async function findUserRoute(req: FastifyRequest<{Params: params}>, res: FastifyReply) {
    const username = req.params.username;
    const countView = req.params.countView;

    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).send({ "error": "request not authorized", "status": 401})
    if (authorization !== process.env.API_KEY) return res.status(401).send({ "error": "request not authorized", "status": 401})

    if (!username) return res.status(400)
        .send({
            "error": "userId invalid",
            "status": 400
    });

    if (!countView || typeof countView !== 'boolean') return res.status(400)
        .send({
            "error": "countView invalid",
            "status": 400
         })

    const userData = await User.findOne({'profileOptions.displayName': username})
    if (!userData) return res.status(400)
        .send({
            "error": "user not found",
            "status": 400
        });

    if (countView) {
        await User.findOneAndUpdate({ 'profileOptions.displayName': username }, {
            $inc: { 'profileOptions.stats.views': 1 }
        });
    }

    const userDiscord = getDiscordData(req.cookies.user_discord as string) as OAuthUser;        
    res.status(200)
        .send(Object.assign(userData, {userId: userDiscord.id as string}))
}