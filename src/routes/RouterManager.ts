import { FastifyInstance } from "fastify";
import * as botController from '../controllers/profileControler'
/*
    Rotas:
    /profile -> Edita informaçoes do user

*/
export default async function Router(fastify: FastifyInstance) {
    fastify.get('/api/auth/callback', botController.callbackRoute)
    fastify.get('/api/auth', botController.authRoute)
    fastify.post('/api/auth/logout', botController.logoutRoute)

    fastify.get('/api/users/:username', botController.findUserRoute)
    fastify.get('/api/users/@me', botController.getUserRoute)
    fastify.get('/api/users/listHallFame', botController.listHallFame)

    fastify.post('/api/profile/', botController.changeProfile)
}