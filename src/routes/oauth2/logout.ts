import { FastifyReply, FastifyRequest } from "fastify";

export default async function logoutRoute(req: FastifyRequest, res: FastifyReply) {
    const user = req.cookies.user_discord;

    if (!user) return res.status(401)
        .send({
            "error": "you are not logged in",
            "status": 400
        })

    res.clearCookie('user_discord', {
        path: '/'
    })
    .status(200)
    .send({
        "message": "account logged out",
        "status": 200
    })
}