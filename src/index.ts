import fastifyCookie from '@fastify/cookie';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import Router from './routes/RouterManager';
import fastifyCors from '@fastify/cors';
import connectMongo from './utils/connectDatabase';
import dotenv from 'dotenv';

const fastify = Fastify()
dotenv.config()

fastify.register(fastifyCookie)
fastify.register(fastifyCors)

fastify.listen({ port: 44187 }, (err, address) => {
    console.log('[profile-api] [stats] api online ' + address)
    connectMongo(process.env.MONGOSRV as string)
})


Router(fastify);