import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

export const vefiricar_token = async(request:Request,response:Response,next:NextFunction) =>{
    //console.log(request)
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        try{
            const token = request.headers.authorization.split(' ')[1];
            if(!token){
                return response.status(401).json({ message: 'Token ausente' ,token:token});
            }
            const key = process.env.SECRET_KEY as Secret
            const decoded = verify(token,key)
            const {id} = decoded as {id:number}
        //request.user = await prisma.user.findUnique({
        //    where: {
        //        id: id
        //    }
        //})
        //if(!request.user){
        //    return response.status(401).json({ message: 'Token ausente' });
        //}
        return next()
        } catch(error) {
            return response.json({message: error})
        }

    } else {
        return response.status(401).json({ message: 'Token token invalido' });
    }
}

config()

