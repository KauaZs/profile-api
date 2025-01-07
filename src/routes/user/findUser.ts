import { FastifyReply, FastifyRequest } from "fastify";
import User from "../../models/User";
interface params {
    username: string
}
export default async function findUserRoute(req: FastifyRequest<{Params: params}>, res: FastifyReply) {
    const username = req.params.username;

    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).send({ "error": "request not authorized", "status": 401})
    if (authorization !== process.env.API_KEY) return res.status(401).send({ "error": "request not authorized", "status": 401})

    if (!username) return res.status(400)
        .send({
            "error": "userId invalid",
            "status": 400
    });

    const userData = await User.findOne({'profileOptions.displayName': username})
    
    if (!userData) return res.status(400)
        .send({
            "error": "user not found",
            "status": 400
        });

    res.status(200)
        .send(userData)
}