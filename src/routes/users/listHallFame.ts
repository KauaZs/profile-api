import { FastifyReply, FastifyRequest } from "fastify";
import User from "../../models/User";

interface QueryHall {
    maxItens: number
}

export default async function listHallFame(req: FastifyRequest<{Querystring: QueryHall}>, res: FastifyReply) {
    const maxItems = req.query.maxItens;

    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).send({ "error": "request not authorized", "status": 401})
    if (authorization !== process.env.API_KEY) return res.status(401).send({ "error": "request not authorized", "status": 401})
    
    if (!maxItems) return res.status(400)
        .send({
            "error": "max items invalid",
            "status": 400
        });
    
    const usersDatabase = await User.find();
    const sorted = usersDatabase.sort((a, b) => b.profileOptions.stats.views - a.profileOptions.stats.views).slice(0, maxItems);

    if (sorted.length <= 0) return res.status(400)
        .send({
            "error": "list empty",
            "status": 400
        });

    
    return res.status(200)
        .send(sorted)
}
