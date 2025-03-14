import fastifyCookie from '@fastify/cookie';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import Router from './routes/RouterManager';
import fastifyCors from '@fastify/cors';
import connectMongo from './utils/connectDatabase';
import dotenv from 'dotenv';

const fastify = Fastify({ trustProxy: 1 })
dotenv.config()


fastify.register(fastifyCors, {
    origin: process.env.WEBSITE_URL,
    credentials: true
})
fastify.register(fastifyCookie)

fastify.listen({ port: process.env.PORT as any, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log('[profile-api] [stats] api online ' + address)
    connectMongo(process.env.MONGOSRV as string)
})


Router(fastify);