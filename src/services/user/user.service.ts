import { Iuser } from "../../interface/user.interface";
import { Request, Response } from "express";
import { IsvalidPassword } from "../../utils/validator";
import { randomInt } from "crypto";
import { passwordHash } from "../../utils/hash";
import { prisma } from "../../database/prisma";
import { GetPublicKeyOrSecret, Secret, sign, verify } from "jsonwebtoken";


class UserService {

    constructor() {
        
    }
    public async cadastro(request: Request, response: Response):Promise<Response> {
        
        const {username, email, password, confirmPassword}:Iuser = request.body
        
        if(username === '' || email === '' || password === '') {
            return response.status(400).json({ message: 'Todos os campos devem ser preenchidos!' });
        }
        if(!IsvalidPassword(password,confirmPassword)) {
            return response.status(400).json({ message: 'As senhas são inválidas' });
        }
        const salt:number = randomInt(10,16)
        const senha = await passwordHash(password,salt)
        console.log(senha)
        
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        console.log(user)

        if (user?.email===email) {
            return response.status(400).json({ message: 'Usuário já existe' });
        } 
    
        const newuser:Iuser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: senha
            }
        })
        return response.status(201).json({user: newuser})
         
    }
    public async authentication( request:Request, response: Response ):Promise<Response> {
        const {username, password}:Iuser = request.body

        if(username === '' || password === '') {
            return response.status(400).json({ message: 'Todos os campos devem ser preenchidos!' });
        }
        
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {
            return response.status(400).json({ message: 'Usuário não encontrado' });
        }
        const key = process.env.SECRET_KEY as Secret
        const refreshtoken = sign({id:user.id,email:user.username},key,{expiresIn:'1d'})
        const acesssToken = sign({id:user.id,email:user.username},key,{expiresIn:'1h'})

        
        return response.status(200).json({ refresh:refreshtoken,acess: acesssToken });
    }

    public async refresh( request:Request, response: Response ):Promise<Response> {
        
        const {refresh} = request.body   
        
        if(refresh === '') {
            return response.status(400).json({ message: 'Token não existente' });
        }
        
        const key = process.env.SECRET_KEY as Secret;

        let decodedtoken:any;
        try{
            decodedtoken = verify(refresh,key);
        } catch(error) {
            return response.status(400).json({ message: 'Token de acesso inválido!' });
        }
        const {id,email} = decodedtoken as {id:number,email:string};
        const token = sign({id:id,email:email},key,{expiresIn:'1d'});
        return response.status(200).json({ access:token });
    }
}

const userService = new UserService()

export default userService