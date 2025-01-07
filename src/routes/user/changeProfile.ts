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
    if (!authorization) return res.status(401).send({ "error": "request not authorized", "status": 401})
    if (authorization !== process.env.API_KEY) return res.status(401).send({ "error": "request not authorized", "status": 401})

    try {
        if (!userId) return res.status(401).send({
            "error": "userid invalid",
            "status": 400
        });

        if (!data) return res.status(401).send({
            "error": "body invalid",
            "status": 400
        })

        const profileOptionsSchema = z.object({
            displayName: z.string().max(50).optional(),
            avatar: z.string().url().optional(),
            banner: z.string().url().optional(),
            aboutme: z.string().max(200).optional(),
            colorBackground: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),  
            colorCard: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
            effectSpace: z.boolean().optional(),
            socials: z.object({
                github: z.string().url().optional(),
                discord: z.string().url().optional(),
            })
         });
        
        const updateUserSchema = z.object({
            profileOptions: profileOptionsSchema.partial().optional(),
        });
        
    
        const validatedData = updateUserSchema.parse(req.body) as any;

        if (validatedData?.profileOptions?.displayName) {
            const findName = await User.findOne({ 'profileOptions.displayName': validatedData?.profileOptions?.displayName });
            if (findName) return res.status(400)
                .send({
                    "error": "This name is already being used",
                    "status": 400
                })
        }

        const updateFields: {[key: string]: any} = {};

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