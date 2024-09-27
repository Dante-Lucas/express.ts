import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

export const vefiricar_token = async(request:Request,response:Response,next:NextFunction) =>{
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        
        type Token = string | undefined

        const token:Token = request.headers.authorization.split(' ')[1];
        
        if (token === '' || token === undefined) {
            return response.status(401).json({ message: 'Token ausente' ,token:token});
        }

        try{
            
            const key = process.env.SECRET_KEY as Secret

            const decoded = verify(token,key)
            
            const {id} = decoded as {id:number}
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            if(!user){
                return response.status(401).json({ message: 'Token inválido' });
            }
        
            return next()
        } catch(error) {
            return response.json({message: error})
        }

    } else {
        return response.status(401).json({ message: 'Token invalido' });
    }
}

config()

