import { FastifyInstance } from "fastify";
import * as botController from '../controllers/profileControler'
/*
    Rotas:
    /profile -> Edita informaçoes do user

*/
export default async function Router(fastify: FastifyInstance) {
    fastify.get('/api/profile', botController.changeProfile)
    fastify.get('/api/auth/callback', botController.callbackRoute)
    fastify.get('/api/auth', botController.authRoute)
    fastify.get('/api/auth/user', botController.getUserRoute)
    fastify.get('/api/auth/logout', botController.logoutRoute)
}