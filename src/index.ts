import fastifyCookie from '@fastify/cookie';
import Fastify from 'fastify';
import Router from './routes/RouterManager';
import fastifyCors from '@fastify/cors';

const fastify = Fastify()

fastify.register(fastifyCookie)
fastify.register(fastifyCors)

fastify.listen({ port: 3001 }, () => {
    console.log('[union-api] [stats] api online')
})

Router(fastify);