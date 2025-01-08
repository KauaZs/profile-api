import { FastifyReply, FastifyRequest } from "fastify";
import dotenv from 'dotenv';
import User from "../../models/User";
import { z } from "zod";


interface query {
    userId: string
}

dotenv.config()
export default async function changeProfile(req: FastifyRequest<{Querystring: query}>, res: FastifyReply) {
    const data = req.body;
    const userId = req.query.userId;

    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).send({ "error": "request notw authorized", "status": 401})
    if (authorization !== process.env.API_KEY) return res.status(401).send({ "error": "request notz authorized", "status": 401})
    try {
        if (!userId) return res.status(401).send({
            "error": "userid invalid",
            "status": 400
        });

        if (!data) return res.status(401).send({
            "error": "body invalid",
            "status": 400
        })
        
        const validatedData = req.body as any
        const userData = await User.findById(userId)
        const updateFields: {[key: string]: any} = {};

        if (userData?.profileOptions.displayName !== validatedData?.profileOptions?.displayName) {
            const cooldown = userData?.cooldowns?.updateUsername as number;
           
            if (cooldown > Date.now()) return res.status(400)
                .send({
                    "error": `you changed your nickname recently, please wait ${Math.floor((userData?.cooldowns?.updateUsername! - Date.now()) / 60000)} minutes`,
                    "status": 400
            });
            
            const findName = await User.findOne({ 'profileOptions.displayName': validatedData?.profileOptions?.displayName });
            if (findName) return res.status(400)
                .send({
                    "error": "This name is already being used",
                    "status": 400
                })

            updateFields['cooldowns.updateUsername'] = Date.now() + (60000 * 30);
        }

        if (validatedData?.profileOptions) {
            for (const key in validatedData?.profileOptions) {
                updateFields[`profileOptions.${key}`] = validatedData.profileOptions[key];
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $set: updateFields }, 
            { runValidators: true }
        );
        
        res.status(200)
            .send({
                "message": "update",
                "status": 200
            })
    } catch(e: any) {
        if (e instanceof z.ZodError) {
            return res.status(400).send({
                error: 'invalid info',
                details: e.errors.map((e) => e.message),
            });
        }
    }
    
}